# Základní obraz: Node.js
FROM node:21

# Vytvoření adresáře aplikace v kontejneru
WORKDIR /usr/src/frontend

# Kopírování souborů definujících závislosti aplikace
COPY ./package*.json ./

# Instalace závislostí
RUN npm install

# Kopírování zbytku zdrojového kódu aplikace do kontejneru
COPY ./ ./

# Aplikace běží na portu 3000
EXPOSE 3000

# Spustíme aplikaci
CMD ["npm", "src/App.js"]
