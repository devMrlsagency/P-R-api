const puppeteer = require('puppeteer');
const fs = require('fs');
const puppeteerConfig = require('./puppeteer.config.cjs');

async function fetchAnnonces() {


  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });

    const pages = await Promise.all([
        browser.newPage(),
        
    ]);

    const pageUrls = [
        `https://www.immobilier.notaires.fr/fr/annonces-immobilieres-liste?page=1&parPage=10&departement=73&typeTransaction=VENTE,VNI,VAE,LOCATION`,
     
    ];

    const annonces = await Promise.all(
        pageUrls.map(async (pageUrl, index) => {
            const page = pages[index];
           await page.goto(pageUrl, { timeout: 60000 });


            // Attendre que le popup de cookies soit visible et le refuser
            try {
                await page.waitForSelector('.tarteaucitronCTAButton.tarteaucitronDeny', { timeout: 60000 });
                await page.click('.tarteaucitronCTAButton.tarteaucitronDeny');
                console.log("Popup de cookies géré.");
            } catch (e) {
                console.log("Le popup de cookies n'est pas apparu ou le clic a échoué.");
            }
            await page.waitForSelector('inotr-bloc-annonce', {timeout: 60000}); // Attend jusqu'à 60 secondes.


            const annoncesPage = await page.evaluate(() => {
                let annonces = [];
                document.querySelectorAll('inotr-bloc-annonce').forEach(element => {
                    const criteres = element.querySelectorAll('inotr-criteres-icones .critere_icone');
                    let surfaceCarrez = '';
                    let nbPieces = '';
                    criteres.forEach(critere => {
                      const label = critere.querySelector('.label_critere')?.textContent.trim();
                      const valeur = critere.querySelector('.Valeur')?.textContent.trim();
                      if (label.startsWith('Su')) {
                          surfaceCarrez = valeur;
                      } else if (label === 'Pièces') {
                          nbPieces = valeur;
                      }
                  });

                    annonces.push({
                        img: element.querySelector('.photo img')?.src,
                        title: element.querySelector('.type_bien').textContent,
                        smallTitle: element.querySelector('.pieces')?.textContent.trim(),
                        localisation: element.querySelector('.localisation')?.textContent.trim(),
                        price: element.querySelector('.valeur')?.textContent,
                        piece: nbPieces,
                        surface: surfaceCarrez,
                        link: element.querySelector('.container_photo a').href,
                        transaction: element.dataset.transaction,
                    });
                });
                return annonces;
            });

            return annoncesPage;
        })
    );

    await Promise.all(pages.map(page => page.close()));
    await browser.close();

    // Flatten the array of arrays
    return annonces.flat();
}

module.exports = fetchAnnonces;

async function saveAnnoncesToFile(annonces) {
    const filePath = './annonces.json';
    
    try {
        let existingAnnonces = [];

        // Si le fichier n'existe pas, créez-le avec les annonces actuelles.
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, JSON.stringify(annonces, null, 2), 'utf-8');
            console.log('Fichier annonces.json créé avec les annonces actuelles.');
        } else {
            // Le fichier existe, lisez-le et comparez les annonces existantes avec les nouvelles.
            const data = fs.readFileSync(filePath, 'utf-8');
            existingAnnonces = JSON.parse(data);

            if (JSON.stringify(existingAnnonces) !== JSON.stringify(annonces)) {
                fs.writeFileSync(filePath, JSON.stringify(annonces, null, 2), 'utf-8');
                console.log('Annonces mises à jour dans le fichier.');
            } else {
                console.log('Aucune mise à jour nécessaire.');
            }
        }
    } catch (err) {
        // Gérer les erreurs d'écriture/lecture.
        console.error('Erreur lors de la manipulation du fichier:', err);
    }
}
async function main() {
    try {
        const annonces = await fetchAnnonces();
        console.log("Annonces récupérées :", annonces.length, "annonces");
        await saveAnnoncesToFile(annonces); // Assurez-vous que cette opération est complétée avant de continuer
        console.log('Scrapping terminé et fichier mis à jour.');
    } catch (error) {
        console.error("Une erreur s'est produite lors du scrapping :", error);
    } finally {
        fs.writeFileSync('scrapping_done.flag', 'done'); // Marqueur de fin de scrapping
    }
}

module.exports = {
    fetchAnnonces,
    saveAnnoncesToFile,
    main
};
