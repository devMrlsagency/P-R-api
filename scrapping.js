const puppeteer = require('puppeteer');
const fs = require('fs');
const puppeteerConfig = require('./puppeteer.config.cjs');
const Annonce = require('./models/annonce'); // Assurez-vous que le chemin est correct
const mongoose = require('mongoose');


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
            await page.goto(pageUrl, { timeout: 120000 });


            // Attendre que le popup de cookies soit visible et le refuser
            try {

                await page.waitForSelector('.tarteaucitronCTAButton.tarteaucitronDeny', { timeout: 120000 });
                await page.click('.tarteaucitronCTAButton.tarteaucitronDeny');
                console.log("Popup de cookies géré.");
            } catch (e) {
                console.log("Le popup de cookies n'est pas apparu ou le clic a échoué.");
            }
            await page.waitForSelector('inotr-bloc-annonce', {timeout: 120000}); // Attend jusqu'à 60 secondes.


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

async function saveAnnoncesToDB(annonces) {
    // Vider la collection avant d'ajouter de nouvelles annonces
    await Annonce.deleteMany({});

    try {
        for (const annonceData of annonces) {
            const uniqueIdentifier = { link: annonceData.link };
            // findOneAndUpdate avec upsert:true va mettre à jour l'annonce si elle existe, sinon en créer une nouvelle
            await Annonce.findOneAndUpdate(uniqueIdentifier, annonceData, { upsert: true });
        }
        console.log('Annonces enregistrées ou mises à jour dans la base de données avec succès.');
    } catch (err) {
        // Gérer les erreurs d'enregistrement.
        console.error('Erreur lors de l\'enregistrement des annonces dans la base de données:', err);
    }
}

async function main() {
    console.log("Début du scrapping");
    try {
        const annonces = await fetchAnnonces();
        console.log("Annonces récupérées :", annonces.length, "annonces");
        await saveAnnoncesToDB(annonces); // Sauvegarde dans MongoDB
        console.log('Scrapping terminé et données enregistrées dans la base de données.');
    } catch (error) {
        console.error("Une erreur s'est produite lors du scrapping :", error);
    }
    console.log('Scrapping terminé.');
}


module.exports = {
    fetchAnnonces,
    saveAnnoncesToDB,
    main // Assurez-vous d'inclure main ici si vous voulez l'utiliser en dehors de ce fichier
};


