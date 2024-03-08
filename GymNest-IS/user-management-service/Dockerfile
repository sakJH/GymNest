# Základní obraz: Node.js
FROM node:14

# Vytvoření adresáře aplikace v kontejneru
WORKDIR /usr/src/app

# Kopírování souborů definujících závislosti aplikace
COPY package*.json ./

# Instalace závislostí
RUN npm install

# Kopírování zbytku zdrojového kódu aplikace do kontejneru
COPY . .

# Aplikace běží na portu 3000
EXPOSE 3000

# Definice příkazu, který se spustí při startu kontejneru.
# Tento příkaz by měl odpovídat příkazu, který spouští aplikaci.
CMD [ "node", "app.js" ]
