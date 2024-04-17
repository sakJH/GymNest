# Základní obraz: Node.js
FROM node:21

# Instalace dos2unix pro konverzi konce řádků
RUN apt-get update && apt-get install -y dos2unix tzdata

# Vytvoření adresáře aplikace v kontejneru
WORKDIR /usr/src/booking-service

# Kopírování vsech souborů - predesly zpusob vedl k prepsani modules
COPY ./ ./

# Instalace závislostí
RUN npm install
RUN dos2unix ./wait-for-it.sh

# Aplikace běží na portu 3003
EXPOSE 3003

# Definice příkazu, který se spustí při startu kontejneru.
CMD [ "node", "src/server.js" ]
