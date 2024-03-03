# GymNest
 MOIS semestrální projekt
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

Verze: ...
### Backend
Note.js s frameworkem Express

Verze: ...
### Spojení
REST - Synchronní

> [!NOTE]
> Verze: ...

> [!CAUTION]
> Něco i pro asynchronní komunikaci??? 

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

