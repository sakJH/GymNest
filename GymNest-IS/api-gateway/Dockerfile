# Základní obraz: Node.js
FROM node:21

# Vytvoření adresáře aplikace v kontejneru a nastavení aktuálního adresáře
WORKDIR /usr/src/api-gateway

# Kopírování souborů definujících závislosti aplikace
COPY ./package*.json ./

# Instalace závislostí
RUN npm install

# Kopírování zbytku zdrojového kódu aplikace do kontejneru
COPY ./ ./

# Aplikace běží na portu 8080
EXPOSE $PORT_API

# Definice příkazu, který se spustí při startu kontejneru
CMD ["node", "server.js"]
