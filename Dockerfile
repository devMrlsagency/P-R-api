# Utilisez l'image Puppeteer personnalisée
FROM ghcr.io/puppeteer/puppeteer:21.6.1

# Définissez des variables d'environnement
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Définissez le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copiez les fichiers package.json et package-lock.json pour l'installation des dépendances
COPY package*.json ./

# Installez les dépendances, y compris PM2 globalement
RUN npm ci && npm install pm2 -g

# Copiez tout le contenu de votre projet dans le conteneur
COPY . .

# Exposez le port sur lequel votre application va s'exécuter
EXPOSE 3000

# Commande pour exécuter votre application Node.js via PM2
CMD [ "pm2-runtime", "start", "index.js" ]
