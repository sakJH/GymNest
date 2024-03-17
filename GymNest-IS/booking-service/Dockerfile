# Základní obraz: Node.js
FROM node:21

# Vytvoření adresáře aplikace v kontejneru
WORKDIR /usr/src/booking-service

# Kopírování souborů definujících závislosti aplikace
COPY */package*.json ./

# Instalace závislostí
RUN npm install

# Kopírování zbytku zdrojového kódu aplikace do kontejneru
COPY ./ ./

# Aplikace běží na portu 3003
EXPOSE 3003

# Definice příkazu, který se spustí při startu kontejneru.
CMD [ "node", "src/app.js" ]
