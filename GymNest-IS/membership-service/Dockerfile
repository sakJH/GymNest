# Základní obraz: Node.js
FROM node:21

# Instalace dos2unix pro konverzi konce řádků
RUN apt-get update && apt-get install -y dos2unix

# Vytvoření adresáře aplikace v kontejneru
WORKDIR /usr/src/membership-service

# Definice proměnné prostředí, která určuje, kde se nachází databázová služba
ENV DB_HOST=db-user-management-service

# Kopírování souborů definujících závislosti aplikace
COPY ./package*.json ./

# Instalace závislostí
RUN npm install

# Kopírování zbytku zdrojového kódu aplikace do kontejneru
COPY ./ ./
RUN dos2unix ./wait-for-it.sh

# Aplikace běží na portu 3002
EXPOSE 3002

# Definice příkazu, který se spustí při startu kontejneru.
CMD [ "node", "src/server.js" ]
