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

> [!CAUTION]
> TODO -> Profile tree je dokončen, ale není otestovaný!


## Role tree

**Postup**
1. models/Profile.js
2. services/RoleService.js
3. controllers/RoleController.js
4. routes/roleRoutes.js
5. Přidáno roleRoutes do app.js

> [!CAUTION]
> TODO -> Role tree je dokončen, ale není otestovaný!

## Auth tree
1. utils/passport.js
2. routes/authRoutes.js
3. controllers/AuthController.js
4. routes/userRoutes.js

**Dockerfile**

# TODO
Auth tree

Docker

utils/hashPassword.

utils/validateInput - je potřeba?

