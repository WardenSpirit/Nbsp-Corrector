# README

Klíčová slova: *HTML*, *\&nbsp*, *zalamování českého textu*, *nezlomitelné mezery*

Entity pro nezlomitelné mezery (např. \&nbsp) se skládají nejméně z 5 znaků. Psaní nezlomitelných mezer tak stojí zbytečně mnoho času. Nástroj, který to dělá automaticky, tento čas ušetří. Tady je.

## Funkce

Nezlomitelné mezery jsou vkládány podle českých technických norem (ČSN 01 6910). Přehled většiny těchto pravidel lze najít např. v [Internetové jazykové příručce](https://prirucka.ujc.cas.cz/?id=880).

Podporované entity pro nezlomitelné mezery jsou: *\&nbsp;*, *\&#160;*, *\&#xA0;* a *\&#xa0;*.

![Nahrazení](https://raw.githubusercontent.com/WardenSpirit/Nbsp-Corrector/master/nbsp_showcase.gif?token=GHSAT0AAAAAACKGVNFLCR243OUFNVSGXURIZKTPPAA)

## Ovládání

Napíšete text se standardními mezerami bez starostí se zalamováním a následně necháte nezlomitelné mezery vložit automaticky: v otevřeném editoru HTML dokumentu použijte jeden z těchto způsobů:
- stiskněte zkratku **ctrl + alt + n + b**
- v paletě příkazů (command palette; zkratka **ctrl + shift + P**) a zvolte **```Oprav nezlomitelné mezery```**

Pokud chcete vrátit opravu mezer, funguje klasické undo (**ctrl + z**) 
          
## Extension Settings

Pokud Vám implicitní nastavení nevyhovuje, chování si lze přizpůsobit pomocí regulárních výrazů.

V nabídce jsou následující nastavení:

* `nbspcorrector.zápisNezlomitelnýchMezer`: Určete, jakou entitou budou mezery zapisovány.
* `nbspcorrector.přepisPůvodníchNezlomitelnýchMezer`: Povolte aplikaci měnit nezlomitelné mezery na zlomitelné.
* `nbspcorrector.pokročilé.*`: Přizpůsobte si jednotlivá typografická pravidla.

## Známé problémy

Implicitní nastavení není dokonalé. Některá pravidla totiž bohužel nelze snadno implementovat tak, aby to vyhovovalo všem textům.
Speciální znaky obsažené v HTML dokumentu přináší problémy, jelikož je rozhraní DOMParser při parsování dokumentu přepisuje na entity.

## Poznámky k verzím

Nová vydání budou následovat podle požadavků uživatelů.

### 0.0.2

Drobné estetické úpravy, bohatší readme.

### 0.0.1

Drobné estetické úpravy.

### 0.0.0

Toto je první vydání.