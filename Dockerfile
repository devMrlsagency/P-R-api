# Utilisez l'image Puppeteer personnalisée
FROM ghcr.io/puppeteer/puppeteer:21.6.1

# Définissez des variables d'environnement pour Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Définissez le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copiez les fichiers package.json et package-lock.json pour l'installation des dépendances
COPY package*.json ./

# Installez les dépendances de votre projet
RUN npm ci

# Changez d'utilisateur à root pour installer PM2 globalement
USER root
RUN npm install pm2 -g

# Revenez à l'utilisateur pptruser pour les opérations normales
USER pptruser

# Copiez tout le contenu de votre projet dans le conteneur
COPY . .

# Exposez le port sur lequel votre application va s'exécuter
EXPOSE 3000

# Commande pour exécuter votre application Node.js via PM2
CMD [ "pm2-runtime", "start", "index.js" ]
