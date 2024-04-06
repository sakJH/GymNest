# Inicializace
**Vytvoření složek pro mikroslužby**

**Vytvoření module pro user-management-service**

**Vytvoření všech souborů ve službě**

## User tree

***Postup**
1. models/User.js
2. services/UserService.js
3. controllers/UserController.js
4. routes/userRoutes.js
5. Přidáno userRoutes do server.js 

> [!CAUTION]
> TODO -> User tree je dokončen, ale není otestovaný!


## Profile tree

**Postup**
1. models/Profile.js
2. server.js - asociace mezi User a Profile (1:1)
3. services/ProfileService.js
4. controllers/ProfileController.js
5. routes/profileRoutes.js
6. Přidáno profileRoutes do server.js 

> [!CAUTION]
> TODO -> Profile tree je dokončen, ale není otestovaný!


## Role tree

**Postup**
1. models/Profile.js
2. services/RoleService.js
3. controllers/RoleController.js
4. routes/roleRoutes.js
5. Přidáno roleRoutes do server.js

> [!CAUTION]
> TODO -> Role tree je dokončen, ale není otestovaný!

**Dockerfile**
Dockerfile

## Auth tree - TODO
**Auth tree - JWT**
1. authJWT.js
2. 

# TODO
1. Auth tree - není správně
2. utils/hashPassword - implementovat
3. utils/validateInput - je potřeba?
4. JWT Tokeny
5. Autentizace přes Google Authentication
6. CurrencyConverter - dodělat ošetření (try/catch) a cachování odpovědí