# GymNest
 MOIS semestrální projekt na FIM UHK.

Autoři - Bc. Jan Sakač a Bc. Matěj Boura 

 **Osnova**
 1. Úvod
 2. Návrh mikroslužeb
 3. Technologie
 4. Návrh databáze
 5. Struktura Frontend
 6. Struktura IS
 
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
Vlastní API Gateway pro přesměrování dotazů na mikroslužby.
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
> API Gateway
> Vlastní (nebo existuje rychlé a jednoduché)

### Databáze
MySQL

> [!NOTE]
> Verze: 

### Docker
**Dockerfile**
```
FROM mysql:latest

# Nastavení prostředí pro MySQL (přizpůsobte podle potřeby)
ENV MYSQL_DATABASE=GymNestUserDB
ENV MYSQL_ROOT_PASSWORD=my-secret-pw

# Kopírování inicializačních skriptů do kontejneru
COPY ./1_init_gymnest_user_db.sql /docker-entrypoint-initdb.d/
COPY ./2_init_gymnest_membership_db.sql /docker-entrypoint-initdb.d/
COPY ./3_init_gymnest_booking_db.sql /docker-entrypoint-initdb.d/
```
**Spuštění**
docker build -t gymnest_db

docker run --name gymnest_db_container -e MYSQL_ROOT_PASSWORD=PowerOfMicroservices -d gymnest_db


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
### Uživatelská správa
```
user-management-service/
│
├── database/                           # Adresář pro databázové skripty
│   └── migrations/
│       └── 1_init_gymnest_user_db.sql  # Skript pro inicializaci databáze
│
├── src/
│   ├── controllers/
│   │   ├── AuthController.js          # Logika pro autentizaci a autorizaci
│   │   ├── UserController.js          # Operace nad uživatelskými účty (CRUD)
│   │   └── ProfileController.js       # Nově přidaný, správa uživatelských profilů
│   │
│   ├── models/
│   │   ├── User.js                    # Model uživatele
│   │   ├── Role.js                    # Model role
│   │   └── Profile.js                 # Model pro uživatelské profily
│   │
│   ├── routes/
│   │   ├── authRoutes.js              # Endpointy pro autentizaci
│   │   ├── userRoutes.js              # Endpointy pro správu uživatelů
│   │   └── profileRoutes.js           # Nově přidaný, endpointy pro uživatelské profily
│   │
│   ├── services/
│   │   ├── AuthService.js             # Servisní logika pro autentizaci
│   │   ├── ProfileService.js          # Servisní logika pro profily
│   │   ├── RoleService.js             # Servisní logika pro role
│   │   └── UserService.js             # Nově přidaný, služby pro správu uživatelů
│   │
│   ├── utils/
│   │   ├── hashPassword.js            # Pomocné funkce, např. pro hashování hesel
│   │   └── validateInput.js           # Nově přidaný, validace vstupních dat
│   ├── sequelize.js                   # Soubor s nastavením pro DB 
│   └── app.js                         # Vstupní bod mikroservisy, nastavení Express serveru
│
├── user-management-service/           # složka s Module pro Node.js s Express frameworkem
├── package.json                       # Definice závislostí a skriptů
├── user-management-service.iml        # iml soubor
├── README-user-management-service.md  # MD soubor s postupem vývoje
├── Dockerfile                         # Docker konfigurace pro službu
└── docker-compose.yml                 # Docker Compose konfigurace 
```

### Správa členství 
```
membership-service/
│
├── src/
│   ├── controllers/
│   │   ├── MembershipController.js # Rozšířeno o funkce pro zobrazení členství uživatele
│   │   ├── PaymentController.js    # Rozšířeno o funkce pro historii a potvrzení plateb
│   │   └── SubscriptionController.js# Nově přidaný, správa předplatného a obnova členství
│   │
│   ├── models/
│   │   ├── Membership.js           # Model členství, upraveno pro detailnější správu
│   │   ├── Payment.js              # Model platby, upraveno pro více informací o platbě
│   │   └── Subscription.js         # Nově přidaný, model pro předplatné členství
│   │
│   ├── routes/
│   │   ├── membershipRoutes.js     # Endpointy pro členství, rozšířeno o nové funkce
│   │   ├── paymentRoutes.js        # Endpointy pro platby, rozšířeno o nové funkce
│   │   └── subscriptionRoutes.js   # Nově přidaný, endpointy pro správu předplatného
│   │
│   ├── services/
│   │   ├── MembershipService.js    # Nově přidaný, služba pro logiku členství
│   │   └── PaymentService.js       # Nově přidaný, služba pro logiku plateb
│   │
│   ├── utils/
│   │   ├── paymentProcessing.js    # Nově přidaný, pomocné funkce pro zpracování plateb
│   │   └── validation.js           # Nově přidaný, validace vstupních dat
│   │
│   └── app.js                    # Vstupní bod mikroservisy, nastavení Express serveru
│
├── package.json                    # Definice závislostí a skriptů
└── Dockerfile                      # Docker konfigurace pro službu
```

### Rezervační systém
```
booking-service/
│
├── src/
│   ├── controllers/
│   │   ├── BookingController.js      # Rozšířeno o funkce pro zobrazení a storno rezervací
│   │   ├── ActivityController.js     # Rozšířeno o funkce pro detaily a úpravy aktivit
│   │   └── ScheduleController.js     # Nově přidaný, správa časových harmonogramů aktivit
│   │
│   ├── models/
│   │   ├── Booking.js                # Model rezervace, upraveno pro detailnější správu
│   │   ├── Activity.js               # Model aktivity, upraveno pro více informací o aktivitě
│   │   └── Schedule.js               # Nově přidaný, model pro časové harmonogramy aktivit
│   │
│   ├── routes/
│   │   ├── bookingRoutes.js          # Endpointy pro rezervace, rozšířeno o nové funkce
│   │   ├── activityRoutes.js         # Endpointy pro aktivity, rozšířeno o nové funkce
│   │   └── scheduleRoutes.js         # Nově přidaný, endpointy pro správu časových harmonogramů
│   │
│   ├── services/
│   │   ├── BookingService.js         # Nově přidaný, služba pro logiku rezervací
│   │   └── ActivityService.js        # Nově přidaný, služba pro logiku aktivit
│   │
│   ├── utils/
│   │   ├── scheduleHelpers.js        # Nově přidaný, pomocné funkce pro správu harmonogramů
│   │   └── validation.js             # Nově přidaný, validace vstupních dat
│   │
│   └── app.js                      # Vstupní bod mikroservisy, nastavení Express serveru
│
├── package.json                      # Definice závislostí a skriptů
└── Dockerfile                        # Docker konfigurace pro službu
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
│   └── app.js                    # Vstupní bod React aplikace
│
└── package.json                    # Definice závislostí a skriptů
```
