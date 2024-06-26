# GymNest

## MOIS semestrální projekt na FIM UHK.

Autoři - Bc. Jan Sakač a Bc. Matěj Boura

 **Osnova**
 1. [Úvod](#úvod)
 2. [Návrh mikroslužeb](#návrh-mikroslužeb)
 3. [Technologie](#technologie)
 4. [Návrh databáze](#návrh-databáze)
 5. [Struktura Frontend](#struktura-frontend)
 6. [Struktura IS](#struktura-is)
 7. [Use Case](#use-case)
 8. [Autentizace a Autorizace v Mikroslužbách](#autentizace-a-autorizace-v-mikroslužbách)

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

GymNest je informační systém pro tělocvičny a sportovní centra který automatizuje správu uživatelů, členství a rezervace tříd.

## Návrh mikroslužeb

### 1.	Uživatelská správa (User Management Service):
```
Autentizace a autorizace uživatelů.
- Přes Google Authentication
- V rámci tokenů se budou přenášet i jeho oprávnění
Profily členů a zaměstnanců.
Správa rolí a přístupových práv.
```
### 2.	Správa členství (Membership Management Service):
```
Registrace nových členů a obnova členství.
Správa různých typů členství a tarifů.
- Správa měny z platební brány a převod na GymNest měnu "kredity"
- Převodní systém zvolené měny na kredity
Sledování platby členství a historie transakcí.
- Výpis historie transakcí
```
### 3.	Rezervační systém (Booking Service):
```
Rezervace skupinových lekcí a osobního tréninku.
Správa časového harmonogramu pro lekce a trenéry.
- Základ je nastavení a správa rozvrhů na jednotlivé týdny po 45 minutách od 8:00 do 19:00
```
### API Gateway
```
API Gateway pro přesměrování dotazů na mikroslužby. Podpora logování 'routes'
```
### Další funkce
```
Možnosti změny měny (CZK, EUR, POL).
Možnosti změnit barevné schéma (3x barevné vzory).
```

## Technologie
> Vyvíjeno v prostředí Idea Ultimate
### Frontend
React

> [!NOTE]
> Verze: 18.2.0

MUI - Material Desing

> [!NOTE]
> Verze: ...

### Backend
Note.js s frameworkem Express

> [!NOTE]
> Verze: 21

### Spojení
REST - Synchronní

> [!NOTE]
> Verze: ...

### API-Gateway
Express Gateway

> [!NOTE]
> Verze: 1.16.10

### Databáze
MySQL

> [!NOTE]
> Verze: 8.3.0

### Docker
**Dockerfile**
Kompletní spuštění přes API-Gateway **docker-compose.yml**

### Platební brána
PayPal
> [!IMPORTANT]
> Pouze jako Sandbox mód

### Dokumentace
**Swagger**
Dokumentace 'routes' v rámci celého projektu

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


## Struktura Frontend
```
Na vrchu stránky přepínač- se 4. body (nebo podle oprávnění)

1. Výchozí / první stránka
Nabídka přihlášení
Týdenní (veřejné! a soukromé) rozvrhy

Po přihlášení - dle oprávnění (člen / trenér / admin)
--------------------
2. Stránka s akcemi (rozvrhy) pro člena (oprávnění člen a trenér)
3. Stránka se správou členství (oprávnění člen a trenér)
4. Stránka s možností editací rozvrhů (oprávnění trenér)
```

### 1. Výchozí / První Stránka
**Funkce:**

Nabídne přehlednou stránku s možností přihlášení.

Zobrazuje veřejné a soukromé týdenní rozvrhy. Soukromé rozvrhy jsou přístupné po přihlášení.

**Komponenty:**

Přihlašovací formulář: Modální dialog nebo vysouvací panel pro přihlášení uživatelů.

Veřejné rozvrhy: Seznam veřejných akcí nebo lekcí plánovaných pro týden, zobrazený pomocí karet nebo tabulky.

Soukromé rozvrhy: Po přihlášení se uživatelům zpřístupní jejich osobní rozvrh lekcí nebo akcí, na které jsou přihlášeni.

### 2. Stránka s Akcemi / Rozvrhy pro Člena
**Funkce:**

Umožňuje členům a trenérům procházet dostupné akce nebo lekce a přihlašovat se na ně.

**Komponenty:**

Filtr akcí: Možnost filtrovat akce podle typu, data nebo dostupnosti.

Seznam akcí: Zobrazení akcí v daném týdnu s možností rezervace. Každá akce by měla obsahovat detailní informace, jako je název, datum a čas, popis a tlačítko pro rezervaci.

Detail akce: Po kliknutí na akci se zobrazí modální okno nebo nová stránka s podrobnostmi o akci a možností přihlášení.

### 3. Stránka se Správou Členství
**Funkce:**

Umožňuje členům prohlížet stav svého členství, historii plateb a obnovovat nebo upravovat své členství.

**Komponenty:**

Stav členství: Informace o aktuálním stavu členství uživatele, včetně typu členství a platnosti.

Historie plateb: Seznam předchozích plateb s datem a částkou.

Obnova členství: Tlačítko nebo formulář pro obnovu členství s možností vybrat typ členství a provést platbu.

### 4. Stránka s Možností Editace Rozvrhů (pro Trenéry)
**Funkce:**

Umožňuje trenérům vytvářet, upravovat a mazat plánované akce nebo lekce.

**Komponenty:**

Plánování akce: Formulář pro vytvoření nové akce s poli pro název, popis, datum, čas a maximální počet účastníků.

Seznam akcí: Přehled všech plánovaných akcí s možnostmi editace nebo odstranění každé akce.

Editace akce: Formulář pro upravení detailů existující akce s možností uložit změny nebo akci zrušit.

## Struktura IS

### GymNest-IS
```
GymNest-IS/
│── api-gateway/
│── booking-service/
│── frontend/
│── membership-service/
│── user-management-service/
│
└── README.md
```

#### Uživatelská správa
```
user-service/
│
│   ├── auth/
│   │   ├── passportConfig.js          # Konfigurace pro autentizaci
│
├── database/                          # Adresář pro databázové skripty
│   └── migrations/
│       └── init_gymnest_user_db.sql   # Skript pro inicializaci databáze
│
├── node_modules/                      # Adresář pro závislosti Node.js
│
├── src/
│   ├── controllers/
│   │   ├── AuthController.js          # Logika pro autentizaci a autorizaci
│   │   ├── RoleController.js          # Operace nad rolemi
│   │   ├── ProfileController.js       # Správa uživatelských profilů
│   │   └── UserController.js          # Operace nad uživatelskými účty
│   │
│   ├── models/
│   │   ├── Auth.js                    # Model pro autentizaci
│   │   ├── User.js                    # Model uživatele
│   │   ├── Role.js                    # Model role
│   │   └── Profile.js                 # Model pro uživatelské profily
│   │
│   ├── routes/
│   │   ├── authRoutes.js              # Endpointy pro autentizaci
│   │   ├── profileRoutes.js           # Endpointy pro uživatelské profily
│   │   ├── roleRoutes.js              # Endpointy pro role
│   │   └── userRoutes.js              # Endpointy pro správu uživatelů
│   │
│   ├── services/
│   │   ├── AuthService.js             # Servisní logika pro autentizaci
│   │   ├── ProfileService.js          # Servisní logika pro profily
│   │   ├── RoleService.js             # Servisní logika pro role
│   │   └── UserService.js             # Nově přidaný, služby pro správu uživatelů
│   │
│   ├── utils/
│   │   ├── CurrencyConvertor.js       # Pomocné funkce pro konverzi měn
│   │   ├── hashPassword.js            # Pomocné funkce, např. pro hashování hesel
│   │   ├── swaggerDefinition.js       # Definice Swagger dokumentace
│   │   └── validateInput.js           # Nově přidaný, validace vstupních dat
│   │
│   ├── sequelize.js                   # Soubor s nastavením pro DB
│   └── server.js                      # Vstupní bod mikroservisy, nastavení Express serveru
│
├── tests/                             # Adresář pro testy
│   ├── controllers/
│   │   ├── AuthController.test.js     # Testy pro AuthController
│   │   ├── RoleController.test.js     # Testy pro RoleController
│   │   ├── UserController.test.js     # Testy pro UserController
│   ├── models/
│   │   ├── Auth.test.js               # Testy pro model Auth
│   │   ├── Role.test.js               # Testy pro model Role
│   │   ├── User.test.js               # Testy pro model User
│   └── services/
│       ├── AuthService.test.js        # Testy pro AuthService
│       ├── RoleService.test.js        # Testy pro RoleService
│       └── UserService.test.js        # Testy pro UserService
│
├── .env                               # Konfigurace pro připojení k databázi, JWT tokeny a Google auth
├── .gitignore                         # Ignorované soubory pro Git
├── user-service.iml                   # iml soubor
├── README-user-management-service.md  # MD soubor s postupem vývoje
├── Dockerfile                         # Docker konfigurace pro službu
└── docker-compose.yml                 # Docker Compose konfigurace
```

#### Správa členství
```
membership-service/
│
├── database/                           # Adresář pro databázové skripty
│   └── migrations/
│       └── init_gymnest_membership_db.sql  # Skript pro inicializaci databáze
│
├── membership-service/               # Složka s Module pro Node.js s Express frameworkem
│
├── src/
│   ├── controllers/
│   │   ├── MembershipController.js   # Rozšířeno o funkce pro zobrazení členství uživatele
│   │   ├── PaymentController.js      # Rozšířeno o funkce pro historii a potvrzení plateb
│   │   └── SubscriptionController.js # Správa předplatného a obnova členství
│   │
│   ├── models/
│   │   ├── Membership.js           # Model členství, upraveno pro detailnější správu
│   │   ├── Payment.js              # Model platby, upraveno pro více informací o platbě
│   │   └── Subscription.js         # Model pro předplatné členství
│   │
│   ├── routes/
│   │   ├── membershipRoutes.js     # Endpointy pro členství, rozšířeno o nové funkce
│   │   ├── paymentRoutes.js        # Endpointy pro platby, rozšířeno o nové funkce
│   │   └── subscriptionRoutes.js   # Endpointy pro správu předplatného
│   │
│   ├── services/
│   │   ├── MembershipService.js    # Služba pro logiku členství
│   │   ├── PaymentService.js       # Služba pro logiku plateb
│   │   └── SubscriptionService.js  # Služba pro logiku předplatného
│   │
│   ├── utils/                      # Adresář pro pomocné funkce, zatím nic neobsahuje
│   │   ├── swaggerDefinition.js    # Definice Swagger dokumentace
│   │   └── paypalClient.js         # Pomocné funkce pro PayPal API
│   │
│   └── server.js                   # Vstupní bod mikroservisy, nastavení Express serveru
│
├── tests/                           # Adresář pro testy
│   ├── controllers/
│   │   ├── MembershipController.test.js   # Testy pro MembershipController
│   │   ├── PaymentController.test.js      # Testy pro PaymentController
│   ├── models/
│   │   ├── Membership.test.js             # Testy pro model Membership
│   │   ├── Payment.test.js                # Testy pro model Payment
│   ├── services/
│   │   ├── MembershipService.test.js      # Testy pro MembershipService
│   │   ├── PaymentService.test.js         # Testy pro PaymentService
│
│
├── .env                            # Konfigurace pro připojení k databázi
├── package.json                    # Definice závislostí a skriptů
├── docker-compose.yml              # Docker Compose konfigurace
├── Dockerfile                      # Docker konfigurace pro službu
├── membership-service.iml          # iml soubor
├── README-membership-service.md    # MD soubor s postupem vývoje
└── README-představa.md             # MD soubor s představou
```

#### Rezervační systém
```
booking-service/
│
├── database/                           # Adresář pro databázové skripty
│   └── migrations/
│       └── init_gymnest_booking_db.sql  # Skript pro inicializaci databáze
│
├── booking-service/                   # Složka s Module pro Node.js s Express frameworkem
│
├── src/
│   ├── controllers/
│   │   ├── BookingController.js        # Logika pro správu rezervací
│   │   ├── ActivityController.js       # Operace s aktivitami (lekce, kurzy atd.)
│   │   ├── ScheduleController.js       # Operace nad harmonogramem aktivit
│   │   └── NotificationController.js   # Správa notifikací a upozornění
│   │
│   ├── models/
│   │   ├── Booking.js                  # Model pro rezervace
│   │   ├── Activity.js                 # Model pro aktivity (lekce, kurzy atd.)
│   │   ├── Schedule.js                 # Model pro harmonogram aktivit
│   │   └── Notification.js             # Model pro notifikace
│   │
│   ├── routes/
│   │   ├── bookingRoutes.test.js            # Endpointy pro správu rezervací
│   │   ├── activityRoutes.test.js           # Endpointy pro správu aktivit
│   │   ├── scheduleRoutes.test.js           # Endpointy pro správu harmonogramu
│   │   └── notificationRoutes.test.js       # Endpointy pro notifikace
│   │
│   ├── services/
│   │   ├── BookingService.js           # Servisní logika pro rezervace
│   │   ├── ActivityService.js          # Servisní logika pro aktivity
│   │   ├── ScheduleService.js          # Servisní logika pro harmonogram
│   │   ├── NotificationService.js      # Servisní logika pro notifikace
│   │   └── AuthService.js              # Servisní logika pro autentizaci (pokud potřeba)
│   │
│   ├── utils/
│   │   ├── validateInput.js            # Pomocné funkce pro validaci vstupů
│   │   ├── dateUtils.js                # Pomocné funkce pro práci s daty
│   │   └── swaggerDefinition.js        # Definice Swagger dokumentace
│   │
│   ├── sequelize.js                    # Soubor s nastavením pro DB (pro SQL databáze)
│   └── server.js                       # Vstupní bod mikroservisy, nastavení Express serveru

├── tests/                              # Adresář pro testy
│   ├── controllers/
│   │   ├── ActivityController.test.js  # Testy pro BookingController
│   │   ├── BookingController.test.js   # Testy pro BookingController
│   ├── models/
│   │   ├── Activity.test.js            # Testy pro model Activity
│   │   ├── Booking.test.js             # Testy pro model Booking
│   │   ├── Notification.test.js        # Testy pro model Notification
│   │   ├── Schedule.test.js            # Testy pro model Schedule
│   ├── services/
│   │   ├── ActivityService.test.js     # Testy pro ActivityService
│   │   ├── BookingService.test.js      # Testy pro BookingService
│   │   ├── NotificationService.test.js # Testy pro NotificationService
│   │   └── ScheduleService.test.js     # Testy pro ScheduleService
│
├── .env                                # Soubor s proměnnými prostředí
├── package.json                        # Definice závislostí a skriptů
├── README.md                           # README soubor s dokumentací
├── Dockerfile                          # Docker konfigurace pro službu
└── docker-compose.yml                  # Docker Compose konfigurace pro orchestraci kontejnerů

```

#### Frontend
```
frontend/
│
├── frontend/                       # Složka s Module pro React aplikaci
│
├── public/
│   ├── favicon.ico                 # Ikona pro záložku
│   ├── index.html                  # Hlavní HTML soubor
│   ├── logo.png                    # Logo aplikace
│   ├── manifest.json               # Konfigurace pro PWA
│   └── robots.txt                  # Soubor pro blokování robotů
│
├── src/
│   ├── components/                 # Opakovaně použitelné komponenty
│   │   ├── ActivityCreate.js       # Formulář pro vytvoření aktivity
│   │   ├── ActivityDetail.js       # Detail aktivity
│   │   ├── ActivityFilter.js       # Filtr aktivit
│   │   ├── ActivityList.js         # Seznam aktivit
│   │   ├── AuthContent.js          # Obsah pro přihlášení a registraci
│   │   ├── AuthForm.js             # Formulář pro přihlášení a registraci
│   │   ├── DataList.js             # Seznam dat
│   │   ├── Footer.js               # Patička
│   │   ├── MembershipsStatus.js    # Stav členství
│   │   ├── NavBar.js               # Navigační lišta
│   │   ├── PaymentHistory.js       # Historie plateb
│   │   ├── PayPalButton.js         # Tlačítko pro PayPal platbu
│   │   ├── PrivateSchedule.js      # Soukromý rozvrh
│   │   ├── PublicSchedule.js       # Veřejný rozvrh
│   │   ├── UserList.js             # Seznam uživatelů
│   │
│   ├── pages/                      # Stránky aplikace
│   │   ├── ActivityPage.js         # Stránka s aktivitami
│   │   ├── HomePage.js             # Úvodní stránka
│   │   ├── MembershipPage.js       # Stránka s členstvím
│   │   ├── SchedulePage.js         # Stránka s rozvrhem
│   │
│   ├── themes/                     # Přizpůsobení Material-UI tématu
│   │   └── getLPTheme.js           # Téma pro úvodní stránku
│   │
│   ├── App.css                     # Styly pro komponenty
│   ├── App.js                      # Hlavní komponenta aplikace, nastavení routeru
│   ├── App.test.js                 # Testy pro hlavní komponentu
│   ├── index.css                   # Globální styly
│   ├── index.js                    # Vstupní bod React aplikace
│   ├── reportWebVitals.js          # Sledování výkonu aplikace
│   └── setupTests.js               # Konfigurace pro testy
│
├── docker-compose.yml              # Docker Compose konfigurace
├── Dockerfile                      # Docker konfigurace pro službu
├── frontend.iml                    # iml soubor
├── package.json                    # Definice závislostí a skriptů
├── package-lock.json               # Definice závislostí a skriptů
└── README.md                       # README soubor s dokumentací
```

### API Gateway
```
api-gateway/
│
├── node_modules/                   # Složka s Module pro Node.js s Express frameworkem
│
├── config/                         # Adresář pro konfigurační soubory Express Gateway
│   ├── models/                     # Modely pro konfiguraci
│   ├── gateway.config.yml          # Konfigurace API Gateway
│   ├── system.config.yml           # Konfigurace API Gateway
│
├── utils/                          # Adresář pro pomocné funkce
│   ├── swaggerDefinition.js        # Definice Swagger dokumentace
│
├── .env                            #
├── server.js                       # Vstupní bod mikroservisy, nastavení Express serveru
├── docker-compose.yml              # Docker Compose konfigurace
├── Dockerfile                      # Docker konfigurace pro službu
├── full-docker-compose.yml.txt     # Docker Compose konfigurace pro orchestraci kontejnerů
├── package.json                    # Definice závislostí a skriptů
├── package-lock.json               # Definice závislostí a skriptů
└── wait-for-it.sh                  # Skript pro čekání na spuštění služeb
```

## Use Case

### 1. Přihlášení a registrace s nákupem členství

#### Popis:
Nový uživatel chce vstoupit do systému GymNest a zakoupit si členství.

#### Aktoři:
Nový uživatel

#### Předpoklady:
Uživatel má přístup k internetu a webovému prohlížeči.

#### Postup:
1. Uživatel přistupuje k domovské stránce systému GymNest.
2. Uživatel klikne na možnost "Přihlásit se" nebo "Registrovat se".
3. Pokud uživatel ještě nemá účet, vyplní registrační formulář s potřebnými informacemi (jako je jméno, e-mail a heslo).
4. Po vyplnění formuláře uživatel klikne na tlačítko "Registrovat se".
5. Systém ověří zadané údaje a vytvoří nový účet pro uživatele.
6. Uživatel je automaticky přihlášen do systému a přesměrován na stránku pro nákup členství.
7. Uživatel vybere požadovaný typ členství a klikne na možnost "Zakoupit".
8. Systém přesměruje uživatele na platební bránu, kde provede platbu za vybrané členství.
9. Po úspěšné platbě je uživateli automaticky přiděleno zakoupené členství a potvrzení o platbě je zasláno na jeho e-mail, zároveň mu systém přiřadí oprávnění: člen.

#### Alternativní průběh:
- Pokud uživatel již má účet, přihlásí se pomocí svých přihlašovacích údajů a pokračuje od kroku 6.
- Pokud se uživatel rozhodne nezakoupit členství okamžitě, může zvolit možnost prohlížení rozvrhu lekcí nebo jiných funkcí aplikace.
- Pokud platba za členství selže, systém uživatele o tom informuje a nabízí možnost opakování platby.


### 2. Zobrazení rozvrhu a rezervace lekce

#### Popis:
Registrovaný uživatel si chce zobrazit rozvrh skupinových lekcí a rezervovat si místo na vybrané lekci.

#### Aktoři:
Registrovaný uživatel

#### Předpoklady:
Uživatel je registrován do systému.

#### Postup:
1. Uživatel se přihlásí do systému pomocí svého uživatelského jména a hesla.
2. Po úspěšném přihlášení uživatel se nachází na domovské stránce aplikace GymNest.
3. Uživatel vybere možnost "Zobrazit rozvrh" z hlavního menu.
4. Systém zobrazí rozvrh skupinových lekcí pro daný týden, který obsahuje informace jako datum, čas, typ lekce a instruktora.
5. Uživatel prochází dostupné lekce a vybírá tu, na kterou se chce zúčastnit.
6. Po výběru konkrétní lekce uživatel klikne na možnost "Rezervovat místo".
7. Systém ověří dostupnost místa na lekci a potvrdí rezervaci.
8. Uživatel obdrží potvrzení o rezervaci a má místo na vybrané lekci zajištěno.

#### Alternativní průběh:
- Pokud uživatel nenajde vhodnou lekci v aktuálním týdnu, může se podívat na rozvrh následujících týdnů.
- Pokud je lekce již plně obsazena, uživatel nemůže provést rezervaci a musí vybrat jinou lekci.
- Uživatel může také procházet rozvrh lekcí podle typu (např. aerobic, spinning) nebo instruktora.

### 3. Zobrazení historie plateb a transakcí

#### Popis:
Registrovaný uživatel si chce zobrazit historii svých plateb za členství a transakcí spojených s aplikací GymNest.

#### Aktoři:
Registrovaný uživatel

#### Předpoklady:
Uživatel je registrován do systému.

#### Postup:
1. Uživatel se přihlásí do systému pomocí svého uživatelského jména a hesla.
2. Po úspěšném přihlášení uživatel se nachází na domovské stránce aplikace GymNest.
3. Uživatel vybere možnost "Historie plateb" nebo "Transakce" z hlavního menu.
4. Systém zobrazí seznam všech plateb za členství a transakcí, které uživatel provedl v minulosti.
5. Uživatel může procházet seznam a prohlížet detaily každé platby nebo transakce, jako je částka, datum a stav platby.
6. Po skončení prohlížení uživatel klikne na možnost "Zavřít" nebo se vrátí zpět na domovskou stránku.

#### Alternativní průběh:
- Pokud uživatel nemá žádné platby nebo transakce v historii, systém zobrazí odpovídající zprávu, že historie je prázdná.
- Pokud systém není schopen načíst historii platby nebo transakcí z databáze, uživatel obdrží chybové hlášení a může to zkusit znovu později.

### 4. Správa Aktivit a Rozvrhů

#### Popis:
Vlastník posilovny může jednoduše spravovat aktivity a rozvrhy lekcí a tréninků v posilovně pomocí aplikace GymNest.

#### Aktoři:
Vlastník posilovny

#### Předpoklady:
Uživatel je registrován do systému s oprávněním admin nebo alespoň trenér.

#### Postup:
1. Vlastník posilovny se přihlásí do systému pomocí svých přihlašovacích údajů.
2. Po úspěšném přihlášení je vlastník posilovny přesměrován na domovskou stránku aplikace GymNest.
3. Vlastník posilovny klikne na možnost "Správa Aktivit" nebo "Rozvrhy" z hlavního menu.
4. Systém zobrazí seznam aktuálně nabízených aktivit nebo rozvrh lekcí a tréninků v posilovně.
5. Vlastník posilovny může provádět následující činnosti:
   - **Přidání Nové Aktivity:**
     - Klikne na tlačítko "Přidat Aktivitu".
     - Vyplní formulář s informacemi o nové aktivitě.
     - Potvrdí přidání aktivity do systému.
   - **Úprava Aktivity:**
     - Vybere existující aktivitu ze seznamu.
     - Klikne na tlačítko "Upravit".
     - Upraví požadované údaje aktivity.
     - Potvrdí provedené změny.
   - **Mazání Aktivity:**
     - Vybere aktivitu, kterou chce odstranit.
     - Klikne na tlačítko "Smazat".
     - Potvrdí smazání aktivity ze systému.
   - **Správa Rozvrhů:**
     - Prochází seznam lekcí a tréninků v rozvrhu.
     - Může provádět úpravy, jako jsou změny časů a lokalit nebo přiřazování trenérů k jednotlivým aktivitám.

#### Alternativní průběh:
- Pokud vlastník posilovny nemá žádné aktivity v nabídce, systém zobrazí odpovídající zprávu, že seznam je prázdný.
- Pokud systém není schopen načíst aktivity nebo rozvrh z databáze, vlastník posilovny obdrží chybové hlášení a může to zkusit znovu později.


## Autentizace a Autorizace v Mikroslužbách
Google Authentication a JWT Tokeny.

### Přehled
Tento projekt využívá mikroslužby pro autentizaci a autorizaci uživatelů, včetně integrace s Google Auth pro umožnění přihlašování přes Google účty. Hlavní mikroslužba, User Management Service, je zodpovědná za správu uživatelských účtů, generování JWT tokenů a autentizaci.

### Integrace s Google Auth
Autentizace přes Google je realizována pomocí OAuth2.0 flow. Uživatel je přesměrován na přihlašovací stránku Google, kde udělí přístup aplikaci. Po úspěšné autentizaci Google pošle zpět autorizační kód, který lze vyměnit za access token a ID token.

### JWT Tokeny
Po úspěšném přihlášení se vygeneruje JWT token obsahující identifikaci uživatele a jeho oprávnění. Token slouží klientovi pro autorizaci požadavků na server.

### Propagace Tokenů
Požadavky od klienta obsahují JWT token v Authorization headeru. API Gateway nebo jednotlivé mikroslužby validují token před předáním požadavku na cílovou mikroslužbu. Pro interní komunikaci mezi mikroslužbami může být použit stejný JWT token nebo specifický systém pro autentizaci a autorizaci.

### Bezpečnost
Při implementaci je kladen důraz na bezpečné uložení tokenů na straně klienta a ochranu proti běžným útokům. Je doporučeno používat httpOnly cookies pro uložení tokenů a implementovat ochranu proti CSRF útokům.

### Implementace
- **JWT Generování a Validace**: V projektu jsou využity knihovny `jsonwebtoken` a `passport-jwt` pro práci s JWT.
- **Google Auth**: Pro integraci přihlášení přes Google je využita knihovna `passport-google-oauth20`.

### Schéma kominikace
1. Uživatel se pokusí přihlásit přes Google Auth nebo standardním způsobem.
2. Po úspěšné autentizaci user-management-service vygeneruje JWT token a odešle ho zpět klientovi.
3. Klient přiloží tento token jako Bearer token v Authorization headeru každého požadavku.
4. API Gateway nebo mikroslužby validují token a případně extrahují z něj informace o uživateli.
5. Po validaci a autorizaci je požadavek předán na cílovou mikroslužbu.
