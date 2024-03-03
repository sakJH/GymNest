# GymNest
 MOIS semestrální projekt na FIM UHK
 
**Požadavky na projekt**
```
Funkční Design
- High-level popis řešeného businessu (co za problém se řeší?)
- Big Picture modulu
- Návrh Use Casů a jejich design
Technický Design
- Popis architektury
Implementovaný modul
- Nasazeno v Google Cloud, případně v jakémkoliv jiném cloudu (volitelně), ale stačí také Docker
Prezentace pro business zadavatele
Prototyp může být vytvořen v libovolné technologii
- Doporučená technologie je REACT pro front-end a Java nebo NodeJS pro backend
Front-end musí být vytvořen jako tzv. Single Page aplikace (SPA)
Front-end musí splňovat základní zásady material designu
Prototyp bude pro zajištění autentizace uživatelů komunikovat s jednotnou Autentikační službou 
Součástí každého modulu je integrace na minimálně jednu další službu (např. platební brána, …)
Zdrojové kódy budou předány přes GIT (GitLab / GitHub / …)
```

**Popis projektu**

GymNest je informační systém pro telocvičny a sportovní centra který automatizuje správu uživatelů, členství a rezervace tříd. 

## Návrh mikroslužeb

### 1.	Uživatelská správa (User Management Service):
```
Autentizace a autorizace uživatelů.
Profily členů a zaměstnanců.
Správa rolí a přístupových práv.
```
### 2.	Správa členství (Membership Management Service):
```
Registrace nových členů a obnova členství.
Správa různých typů členství a tarifů.
Sledování platby členství a historie transakcí.
```
### 3.	Rezervační systém (Booking Service):
```
Rezervace skupinových lekcí a osobního tréninku.
Správa časového harmonogramu pro lekce a trenéry.
Notifikace a připomenutí rezervací.
```

## Technologie
> Vyvíjeno v prostředí Idea Ultimate
### Frontend
React

> [!NOTE]
> Verze: ...

MUI - Material Desing

> [!NOTE]
> Verze: ...
### Backend
Note.js s frameworkem Express

> [!NOTE]
> Verze: ...
### Spojení
REST - Synchronní

> [!NOTE]
> Verze: ...

> [!CAUTION]
> API Gateway??? ano -> jaké?

### Databáze
MySQL

> [!NOTE]
> Verze: 

### Docker
Dockerfile
> ...Doplnit

docker-compose.yml
> ...Doplnit

> [!NOTE]
> Verze

### Platební brána
PayPal 
> [!IMPORTANT]
> Pouze jako Sandbox mód

## Návrh databáze
 ### 1.	Databáze Uživatelské správy (User Management Database):
```
Uchovává údaje o účtech, včetně autentizačních údajů (např. uživatelská jména, hashovaná hesla).
Informace o profilech členů a zaměstnanců.
Záznamy o rolích a oprávněních uživatelů.
```

**Tabulka Users**

 - UserID (PK): Unikátní identifikátor uživatele.
 - Username: Uživatelské jméno.
 - PasswordHash: Hash hesla.
 - Email: E-mailová adresa.
 - RoleID: Cizí klíč na tabulku Roles.

**Tabulka Roles**

- RoleID (PK): Unikátní identifikátor role.
- RoleName: Název role (např. člen, trenér, administrátor).

**Tabulka UserProfiles**

- ProfileID (PK): Unikátní identifikátor profilu.
- UserID: Cizí klíč na tabulku Users.
- FirstName: Křestní jméno.
- LastName: Příjmení.
- DateOfBirth: Datum narození.

 ### 2.	Databáze Správy členství (Membership Management Database):
```
Ukládá záznamy o registraci členů a stavu jejich členství.
Detaily o typech členství a tarifech.
Historii plateb členství a transakcí.
```
**Tabulka Memberships**

-	MembershipID (PK): Unikátní identifikátor členství.
-	UserID: Cizí klíč na tabulku Users z Uživatelské správy.
-	MembershipType: Typ členství (např. měsíční, roční).
-	StartDate: Datum začátku členství.
-	EndDate: Datum konce členství.

**Tabulka Payments**

-	PaymentID (PK): Unikátní identifikátor platby.
-	MembershipID: Cizí klíč na tabulku Memberships.
-	Amount: Částka.
-	PaymentDate: Datum platby.
-	Status: Stav platby (např. zaplaceno, nezaplaceno).



 ### 3.	Databáze Rezervačního systému (Booking Service Database):
```
Obsahuje informace o rezervacích skupinových lekcí a osobních tréninků.
Harmonogramy lekcí a dostupnost trenérů.
Notifikace a upozornění související s rezervacemi.
```

**Tabulka Bookings**

-	BookingID (PK): Unikátní identifikátor rezervace.
-	UserID: Cizí klíč na tabulku Users z Uživatelské správy.
-	ScheduleID: Cizí klíč na tabulku Schedules.
-	BookingDate: Datum a čas rezervace.

**Tabulka Schedules**

-	ScheduleID (PK): Unikátní identifikátor harmonogramu.
-	ActivityID: Cizí klíč na tabulku Activities.
-	StartTime: Začátek aktivity.
-	EndTime: Konec aktivity.

**Tabulka Activities**

-	ActivityID (PK): Unikátní identifikátor aktivity (např. jóga, spinning).
-	ActivityName: Název aktivity.

## Struktura IS
### Uživatelská správa
```
user-management-service/
│
├── src/
│   ├── controllers/
│   │   ├── AuthController.js       # Logika pro autentizaci a autorizaci
│   │   └── UserController.js       # Operace nad uživatelskými účty (CRUD)
│   │
│   ├── models/
│   │   ├── User.js                 # Model uživatele
│   │   └── Role.js                 # Model role
│   │
│   ├── routes/
│   │   ├── authRoutes.js           # Endpointy pro autentizaci
│   │   └── userRoutes.js           # Endpointy pro správu uživatelů
│   │
│   ├── services/
│   │   └── AuthService.js          # Servisní logika pro autentizaci
│   │
│   ├── utils/
│   │   └── hashPassword.js         # Pomocné funkce, např. pro hashování hesel
│   │
│   └── index.js                    # Vstupní bod mikroservisy, nastavení Express serveru
│
├── package.json                    # Definice závislostí a skriptů
└── Dockerfile                      # Docker konfigurace pro službu
```

### Správa členství 
```
membership-service/
│
├── src/
│   ├── controllers/
│   │   ├── MembershipController.js # Správa členství (vytváření, aktualizace, ...)
│   │   └── PaymentController.js    # Zpracování plateb členství
│   │
│   ├── models/
│   │   ├── Membership.js           # Model členství
│   │   └── Payment.js              # Model platby
│   │
│   ├── routes/
│   │   ├── membershipRoutes.js     # Endpointy pro členství
│   │   └── paymentRoutes.js        # Endpointy pro platby
│   │
│   └── index.js                    # Vstupní bod mikroservisy
│
├── package.json
└── Dockerfile
```

### Rezervační systém
```
booking-service/
│
├── src/
│   ├── controllers/
│   │   ├── BookingController.js    # Logika pro vytváření a správu rezervací
│   │   └── ActivityController.js   # Správa aktivit (jóga, spinning, ...)
│   │
│   ├── models/
│   │   ├── Booking.js              # Model rezervace
│   │   └── Activity.js             # Model aktivity
│   │
│   ├── routes/
│   │   ├── bookingRoutes.js        # Endpointy pro rezervace
│   │   └── activityRoutes.js       # Endpointy pro aktivity
│   │
│   └── index.js                    # Vstupní bod mikroservisy
│
├── package.json
└── Dockerfile
```

### Frontend
```
frontend/
│
├── public/
│   └── index.html                  # Hlavní HTML soubor
│
├── src/
│   ├── components/                 # Opakovaně použitelné komponenty
│   │   ├── Navbar.js               # Navigační lišta s Material-UI komponentami
│   │   ├── Footer.js               # Patička
│   │   └── CustomButton.js         # Příklad vlastního tlačítka s Material-UI
│   │
│   ├── pages/                      # Stránky aplikace
│   │   ├── HomePage.js             # Domovská stránka s Material-UI layoutem
│   │   ├── UserProfilePage.js      # Stránka uživatelského profilu
│   │   ├── MembershipPage.js       # Stránka pro správu členství
│   │   └── BookingsPage.js         # Stránka rezervací s použitím Material-UI tabulek
│   │
│   ├── App.js                      # Hlavní komponenta aplikace, nastavení routeru
│   ├── theme.js                    # Přizpůsobení Material-UI tématu
│   └── index.js                    # Vstupní bod React aplikace
│
└── package.json                    # Definice závislostí a skriptů
```
