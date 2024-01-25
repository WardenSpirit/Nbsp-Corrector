# Czech \&nbsp; Corrector

*(English version follows)*

V HTML se entity pro nezlomitelné mezery (např. *\&nbsp*) skládají nejméně z 5 znaků. Psaní nezlomitelných mezer proto stojí zbytečně mnoho času. Nástroj, který to dělá automaticky, tento čas ušetří. Tady je.

## Funkce

Nezlomitelné mezery jsou vkládány podle českých technických norem (ČSN 01 6910). Přehled většiny těchto pravidel lze najít např. v [Internetové jazykové příručce](https://prirucka.ujc.cas.cz/?id=880).

Podporované entity pro nezlomitelné mezery jsou: *\&nbsp;*, *\&#160;*, *\&#xA0;* a *\&#xa0;*.

![Nahrazení](https://raw.githubusercontent.com/WardenSpirit/Nbsp-Corrector/master/assets/nbsp_showcase.gif)

## Ovládání

Napíšete text se standardními mezerami bez starostí se zalamováním a následně necháte nezlomitelné mezery vložit automaticky: v otevřeném editoru HTML dokumentu použijte jeden z těchto způsobů:
- použijte zkratku "**ctrl + alt + n, ctrl + alt + b**" (tzv. chord, akord)
- v paletě příkazů (command palette; zkratka **ctrl + shift + P**) a zvolte **```Oprav nezlomitelné mezery```**

Pokud chcete vrátit opravu mezer, funguje klasické undo (**ctrl + z**) 
          
## Nastavení rozšíření

Pokud Vám implicitní nastavení nevyhovuje, chování si lze přizpůsobit pomocí regulárních výrazů.

V nabídce jsou následující nastavení:

* `nbspcorrector.zápisNezlomitelnýchMezer`: Určete, jakou entitou budou mezery zapisovány.
* `nbspcorrector.přepisPůvodníchNezlomitelnýchMezer`: Povolte aplikaci měnit nezlomitelné mezery na zlomitelné.
* `nbspcorrector.pokročilé.*`: Přizpůsobte si jednotlivá typografická pravidla.

## Známé problémy

Implicitní nastavení není dokonalé. Některá pravidla totiž bohužel nelze snadno implementovat tak, aby to vyhovovalo všem textům.

## Poznámky k verzím

Nová vydání budou následovat podle požadavků uživatelů.

### 0.1.2-0.1.3

Oprava vložení nezlomitelných mezer na nesprávná místa uvnitř značek po odřádkování.

### 0.1.0-0.1.1

Nový název (Korektor nezlomitelných mezer v HTML → Czech \&nbsp; Typography)

Oprava vložení nezlomitelných mezer na nesprávná místa, např. v tabulkách a za nimi.

Nová ikona.

### 0.0.5

Oprava pravidel pro hodnosti a matematické výrazy v závorkách.

### 0.0.4

Změna zprávy v upozornění po skončení běhu programu.

### 0.0.1-0.0.3

Drobné estetické úpravy, bohatší readme.

### 0.0.0

Toto je první vydání.

# Czech \&nbsp; Corrector

Entities for non-breaking spaces (e.g. \&nbsp) consists of at least 5 characters. Typing these spaces thus costs unreasonable amount of time. A tool which can do it automatically saves that time. Here you go.

## Functions

Non-breaking spaces are inputted according to Czech technical standards (ČSN 01 6910). A list of most of them can be found e.g. at [Internet Language Guide page](https://prirucka.ujc.cas.cz/?id=880).

Supported entities for non-breaking spaces are: *\&nbsp;*, *\&#160;*, *\&#xA0;* a *\&#xa0;*.

![Nahrazení](https://raw.githubusercontent.com/WardenSpirit/Nbsp-Corrector/master/assets/nbsp_showcase.gif)

## Controls

Type text with standard spaces without worrying about wrapping and then have non-breaking spaces be inserted automatically: in the opened HTML document editor use one of these methods:
- use keybinding: **ctrl + alt + n** *chord to* **ctrl + alt + b**
- from the command palette (**ctrl + shift + P**) invoke **```Oprav nezlomitelné mezery```**

If you wish to revert space correction, common undo (**ctrl + z**) does the thing.
          
## Extension Settings

If default behaviour does not suit, it can be customized in settings:

* `nbspcorrector.zápisNezlomitelnýchMezer`: Determine, which notation of non-breaking space (which entity) should be used.
* `nbspcorrector.přepisPůvodníchNezlomitelnýchMezer`: Allow to overwriting non-breaking spaces with spaces where they're not considered necessary.
* `nbspcorrector.pokročilé.*`: Customize behavious related to particular typography rules.

## Known Issues


Line breaks can cause complications! Fix in progress (since 4th January).

The default setting is not perfect. Unluckily, it's not feasible to make it perfect with all the rules Czech language has.