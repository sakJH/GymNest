# Základní obraz: Node.js
FROM node:21

# Vytvoření adresáře aplikace v kontejneru a nastavení aktuálního adresáře
WORKDIR /usr/src/user-management-service

# Definice proměnné prostředí, která určuje, kde se nachází databázová služba
ENV DB_HOST=db-user-management-service

# Kopírování souborů definujících závislosti aplikace
COPY ./package*.json ./

# Instalace závislostí
RUN npm install

# Kopírování zbytku zdrojového kódu aplikace do kontejneru
COPY ./ ./

# Aplikace běží na portu 3001
EXPOSE 3001

# Definice příkazu, který se spustí při startu kontejneru
CMD ["node", "src/app.js"]
