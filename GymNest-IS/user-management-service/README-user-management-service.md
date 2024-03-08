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
5. Přidáno userRoutes do app.js 

> [!CAUTION]
> TODO -> User tree je dokončen, ale není otestovaný!


## Profile tree

**Postup**
1. models/Profile.js
2. app.js - asociace mezi User a Profile (1:1)
3. services/ProfileService.js
4. controllers/ProfileController.js
5. routes/profileRoutes.js
6. Přidáno profileRoutes do app.js 

## Role tree

**Postup**
1. models/Profile.js