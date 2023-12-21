// puppeteer.config.cjs
module.exports = {
  launch: {
    executablePath: process.env.CHROME_BIN || null, // Utilisez CHROME_BIN si disponible, sinon Puppeteer essaiera de trouver un chemin par défaut
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
  
      '--disable-gpu'
    ],
    headless: true
  }
};
