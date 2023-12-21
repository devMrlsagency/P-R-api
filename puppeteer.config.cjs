// puppeteer.config.cjs
module.exports = {
  launch: {
    executablePath: process.env.CHROME_BIN || null, // Utilisez CHROME_BIN si disponible, sinon Puppeteer essaiera de trouver un chemin par défaut

    headless: true
  }
};
