# README

Klíčová slova: *HTML*, *\&nbsp*, *zalamování českého textu*, *nezlomitelné mezery*

Entity pro nezlomitelné mezery (např. \&nbsp) se skládají nejméně z 5 znaků. Psaní nezlomitelných mezer tak stojí zbytečně mnoho času. Nástroj, který to dělá automaticky, tento čas ušetří. Tady je.

## Funkce

Napíšete text bez starostí se zalamováním a poté necháte nezlomitelné mezery určit automaticky.

Podporované entity pro nezlomitelné mezery jsou: *\&nbsp;*, *\&#160;*, *\&#xA0;* a *\&#xa0;*.

![Nahrazení](https://github.com/username/Nbsp-Corrector/nbsp_showcase.gif)

## Extension Settings

Pokud vám implicitní nastavení vám nevyhovuje, chování si lze přizpůsobit pomocí regulárních výrazů.

V nabídce jsou následující nastavení:

* `nbspcorrector.zápisNezlomitelnýchMezer`: Určete, jakou entitou budou mezery zapisovány.
* `nbspcorrector.přepisPůvodníchNezlomitelnýchMezer`: Povolte aplikaci měnit nezlomitelné mezery na zlomitelné.
* `nbspcorrector.pokročilé.*`: Přizpůsobte si jednotlivá typografická pravidla.

## Známé problémy

Implicitní nastavení není dokonalé. Některá pravidla totiž bohužel nelze snadno implementovat tak, aby to vyhovovalo všem textům.
Speciální znaky obsažené v HTML dokumentu přináší problémy, jelikož je rozhraní DOMParser při parsování dokumentu přepisuje na entity.

## Poznámky k verzím

Updaty budou následovat požadavky uživatelů.

### 0.0.1

Drobné estetické úpravy.

- nezobrazuje zbytečné info o chybách

### 0.0.0

Toto je první vydání.