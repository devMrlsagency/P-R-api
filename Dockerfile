# Utilisez l'image Puppeteer personnalisée
FROM ghcr.io/puppeteer/puppeteer:21.6.1

# Définissez des variables d'environnement
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Définissez le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copiez les fichiers package.json et package-lock.json pour l'installation des dépendances
COPY package*.json ./
RUN npm ci

# Créez l'utilisateur pptruser si ce dernier n'existe pas
RUN useradd -m pptruser || true

# Définissez l'utilisateur pptruser avant de copier les fichiers
USER pptruser
# Copiez tout le contenu de votre projet dans le conteneur
COPY . .

# Commande par défaut pour exécuter votre script Node.js (remplacez "index.js" par le nom de votre fichier de scrapping)
CMD [ "node", "index.js" ]
