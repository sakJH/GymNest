# Základní obraz: Node.js
FROM node:21

# Vytvoření adresáře aplikace v kontejneru
WORKDIR /usr/src/membership-service

# Kopírování souborů definujících závislosti aplikace
COPY /membership-service/package*.json ./

# Instalace závislostí
RUN npm install

# Kopírování zbytku zdrojového kódu aplikace do kontejneru
COPY . .

# Aplikace běží na portu 3002
EXPOSE 3002

# Definice příkazu, který se spustí při startu kontejneru.
CMD [ "node", "src/app.js" ]
