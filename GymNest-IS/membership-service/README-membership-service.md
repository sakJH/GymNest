# Inicializace
**Vytvoření složek pro mikroslužby**

**Vytvoření module pro membership-service**

**Vytvoření všech souborů ve službě**

## Membership tree

***Postup**
1. models/Membership.js
2. services/MembershipService.js
3. controllers/MembershipController.js
4. routes/membershipRoutes.js
5. Přidáno membershipRoutes do server.js
6. vytvoření sequelize migration pro Membership

> [!CAUTION]
> TODO -> Membership tree je dokončen, ale není otestovaný!

TODO -> Validace Membership

## Subsciption tree

1. models/Subscription.js
2. services/SubscriptionService.js
3. controllers/SubscriptionController.js
4. routes/subscriptionRoutes.js
5. Přidáno subscriptionRoutes do server.js

> [!CAUTION]
> TODO -> Subsciption tree je dokončen, ale není otestovaný!

TODO -> Validace Subscription 

## Payment tree

1. models/Payment.js
2. services/PaymentService.js
3. controllers/PaymentController.js
4. routes/paymentRoutes.js
5. Přidáno paymentRoutes do server.js

> [!CAUTION]
> TODO -> Payment tree je dokončen, ale není otestovaný!


# TODO úkoly
1. Implementace utils/paymentProcessing.js
2. Implementace utils/validation.js
3. TODO úkoly
4. Správa různých typů členství a tarifů (tiers)
5. Platební brána PayPal (Sandbox mod)
6. Různé měny
7. Výběr barevných schémat