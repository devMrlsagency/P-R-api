const puppeteer = require('puppeteer');
const fs = require('fs');

async function fetchAnnonces() {
 const browser = await puppeteer.launch({
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
 headless: 'new',
    
});



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
            await page.waitForSelector('inotr-bloc-annonce', { visible: true });

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
    fs.writeFile(filePath, JSON.stringify(annonces, null, 2), 'utf-8', (err) => {
        if (err) console.error('Erreur lors de l\'écriture du fichier :', err);
        else console.log('Annonces sauvegardées dans le fichier.');
    });
}

async function main() {
    const annonces = await fetchAnnonces();
    await saveAnnoncesToFile(annonces);
}

main();