# Základní obraz: Node.js
FROM node:21

# Instalace dos2unix pro konverzi konce řádků
RUN apt-get update && apt-get install -y dos2unix tzdata

# Vytvoření adresáře aplikace v kontejneru a nastavení aktuálního adresáře
WORKDIR /usr/src/user-service

# Kopírování souborů definujících závislosti aplikace
COPY ./package*.json ./

# Instalace závislostí
RUN npm install

# Kopírování zbytku zdrojového kódu aplikace do kontejneru
COPY ./ ./
RUN dos2unix ./wait-for-it.sh

# Aplikace běží na portu 3001
EXPOSE 3001

# Definice příkazu, který se spustí při startu kontejneru
CMD ["node", "src/server.js"]
# docker exec -it user-service-db-user-service-1 mysql -u root -p
