# Návrh SAP
## Přehled
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

## 1. Výchozí / První Stránka
**Funkce:**

Nabídne přehlednou stránku s možností přihlášení.

Zobrazuje veřejné a soukromé týdenní rozvrhy. Soukromé rozvrhy jsou přístupné po přihlášení.

**Komponenty:**

Přihlašovací formulář: Modální dialog nebo vysouvací panel pro přihlášení uživatelů.

Veřejné rozvrhy: Seznam veřejných akcí nebo lekcí plánovaných pro týden, zobrazený pomocí karet nebo tabulky.

Soukromé rozvrhy: Po přihlášení se uživatelům zpřístupní jejich osobní rozvrh lekcí nebo akcí, na které jsou přihlášeni.

## 2. Stránka s Akcemi / Rozvrhy pro Člena
**Funkce:**

Umožňuje členům a trenérům procházet dostupné akce nebo lekce a přihlašovat se na ně.

**Komponenty:**

Filtr akcí: Možnost filtrovat akce podle typu, data nebo dostupnosti.

Seznam akcí: Zobrazení akcí v daném týdnu s možností rezervace. Každá akce by měla obsahovat detailní informace, jako je název, datum a čas, popis a tlačítko pro rezervaci.

Detail akce: Po kliknutí na akci se zobrazí modální okno nebo nová stránka s podrobnostmi o akci a možností přihlášení.

## 3. Stránka se Správou Členství
**Funkce:**

Umožňuje členům prohlížet stav svého členství, historii plateb a obnovovat nebo upravovat své členství.

**Komponenty:**

Stav členství: Informace o aktuálním stavu členství uživatele, včetně typu členství a platnosti.

Historie plateb: Seznam předchozích plateb s datem a částkou.

Obnova členství: Tlačítko nebo formulář pro obnovu členství s možností vybrat typ členství a provést platbu.

## 4. Stránka s Možností Editace Rozvrhů (pro Trenéry)
**Funkce:**

Umožňuje trenérům vytvářet, upravovat a mazat plánované akce nebo lekce.

**Komponenty:**

Plánování akce: Formulář pro vytvoření nové akce s poli pro název, popis, datum, čas a maximální počet účastníků.

Seznam akcí: Přehled všech plánovaných akcí s možnostmi editace nebo odstranění každé akce.

Editace akce: Formulář pro upravení detailů existující akce s možností uložit změny nebo akci zrušit.

