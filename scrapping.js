const puppeteer = require('puppeteer');
const fs = require('fs');

async function fetchAnnonces() {
    const browser = await puppeteer.launch({ headless: false });

    const pages = await Promise.all([
        browser.newPage(),
        browser.newPage(),
        browser.newPage(),
    ]);

    const pageUrls = [
        `https://www.immobilier.notaires.fr/fr/annonces-immobilieres-liste?page=1&parPage=100&departement=73&typeTransaction=VENTE,VNI,VAE,LOCATION`,
        `https://www.immobilier.notaires.fr/fr/annonces-immobilieres-liste?page=2&parPage=100&departement=73&typeTransaction=VENTE,VNI,VAE,LOCATION`,
        `https://www.immobilier.notaires.fr/fr/annonces-immobilieres-liste?page=3&parPage=100&departement=73&typeTransaction=VENTE,VNI,VAE,LOCATION`,
    ];

    const annonces = await Promise.all(
        pageUrls.map(async (pageUrl, index) => {
            const page = pages[index];
            await page.goto(pageUrl);

            // Attendre que le popup de cookies soit visible et le refuser
            try {
                await page.waitForSelector('.tarteaucitronCTAButton.tarteaucitronDeny', { timeout: 10000 });
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
                        img: element.querySelector('.picture img')?.src,
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
    // Essayer de lire les annonces existantes.
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        const existingAnnonces = JSON.parse(data);

        // Comparer les annonces existantes avec les nouvelles.
        if (JSON.stringify(existingAnnonces) !== JSON.stringify(annonces)) {
            // Les données sont différentes, mettre à jour le fichier.
            fs.writeFile(filePath, JSON.stringify(annonces, null, 2), 'utf-8', (err) => {
                if (err) console.error('Erreur lors de l\'écriture du fichier :', err);
                else console.log('Annonces mises à jour dans le fichier.');
            });
        } else {
            console.log('Aucune mise à jour nécessaire.');
        }
    } catch (err) {
        // En cas d'erreur de lecture ou de parsing, écrire les nouvelles annonces.
        console.error('Erreur lors de la lecture du fichier existant, réécriture avec de nouvelles annonces :', err);
        fs.writeFile(filePath, JSON.stringify(annonces, null, 2), 'utf-8', (err) => {
            if (err) console.error('Erreur lors de l\'écriture du fichier :', err);
            else console.log('Annonces sauvegardées dans le fichier.');
        });
    }
}

async function main() {
    const annonces = await fetchAnnonces();
    console.log("Annonces récupérées :", annonces.length, "annonces"); // Ajoutez ceci pour vérifier le nombre d'annonces récupérées
    await saveAnnoncesToFile(annonces);
    fs.writeFileSync('scrapping_done.flag', 'done'); // Marqueur de fin de scrapping
    console.log('Scrapping terminé et fichier mis à jour.');
}

main();
