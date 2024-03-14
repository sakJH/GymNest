Mikroservisa membership-service je navržena k správě členství, plateb a předplatného pro fitness a wellness aplikaci GymNest. Cílem je poskytnout uživatelům flexibilní a bezpečnou platformu pro správu jejich členství, včetně registrace, obnovy a správy plateb za služby. Zde je detailní přehled funkcionalit a technického návrhu této služby.

## Funkční Přehled

**Členství**

Registrace nových členů: Umožňuje uživatelům registraci a založení nového členství.

Zobrazení členství uživatele: Poskytuje detailní informace o aktuálním stavu členství, včetně typu členství a jeho platnosti.

Obnova a změna členství: Umožňuje členům obnovit nebo změnit svůj typ členství.

**Platby**

Správa plateb: Zpracovávání a evidování plateb za členství, včetně podpory pro různé platební metody.

Historie a potvrzení plateb: Zobrazení historie plateb uživatele a generování potvrzení o platbě.

**Předplatné**

Správa předplatného: Umožňuje uživatelům spravovat své předplatné, včetně možnosti nastavení automatické obnovy.

Notifikace o expiraci: Systém automaticky upozorní uživatele na blížící se konec platnosti jejich členství nebo předplatného.

**Technický Návrh**

**Technologie**

Backend: Node.js s využitím frameworku Express pro RESTful API.

Databáze: MySQL pro ukládání informací o členství, plateb a předplatném.

Autentizace a bezpečnost: JWT (JSON Web Tokens) pro zabezpečení API a ochranu uživatelských dat.

Komunikace s dalšími službami: API Gateway pro komunikaci s jinými mikroservisami v rámci aplikace GymNest.

**Struktura Projektu**

Controllers: Obsahuje logiku pro manipulaci s daty a zpracování požadavků od klientů.

Models: Definuje schémata pro databázi a slouží jako abstrakce pro manipulaci s daty.

Routes: Definuje endpointy API a přiřazuje je k příslušným funkcím v kontrolérech.

Services: Zajišťuje business logiku a abstrahuje komplexnější operace, jako je zpracování plateb.

Utils: Obsahuje pomocné funkce, například pro validaci dat nebo zpracování plateb.

**Deployment**
Docker: Aplikace a závislosti jsou kontejnerizovány pro jednoduchý deployment a škálování.
Docker Compose: Pro lokalní vývoj a testování s více kontejnery (např. aplikace a databáze).

**Bezpečnost**
Ochrana koncových bodů pomocí autentizace a autorizace.
Zabezpečení citlivých dat, jako jsou platební informace, pomocí šifrování.
Opatření proti běžným webovým útokům (např. SQL injection, Cross-Site Scripting).
Tato mikroservisa membership-service je navržena tak, aby byla modulární, snadno rozšiřitelná a integrovatelná s ostatními částmi aplikace GymNest, což umožňuje efektivní správu členství a poskytování hladkého uživatelského zážitku.