# Pokémon GO IV Checker

Een Nederlandstalige, mobielvriendelijke checker om de IV’s uit de beoordeling in Pokémon GO handmatig over te nemen.

**[Open de IV checker](https://benjilambrecht.github.io/pokemon-go-iv-checker/iv-checker/)**

## Werking

- Stel **Aanval, Verdediging en HP** elk in tussen 0 en 15 met de aparte schuifbalken met horizontale pilhandvatten. Aanraken en toetsenbord worden ondersteund.
- Elke eigenschap toont **15 blokjes in drie groepen van vijf**. Gevulde blokjes zijn oranje bij 1–14; bij 15 wordt die afzonderlijke balk rood. Lege blokjes zijn grijs.
- Het hoofdpercentage wordt direct berekend als `Math.round((Aanval + Verdediging + HP) / 45 * 100)`.
- **Tag** is normaal hetzelfde hele getal zonder procentteken, bijvoorbeeld `98`.
- Bij **Aanval 0–5, Verdediging 10–15 en HP 10–15** wordt de tag **Great League (maximaal 1.500 CP)**. Deze grenzen zijn inclusief. Het hoofdpercentage blijft zichtbaar.

## Eerste PvP-selectie

De Great League-regels zijn algemene richtlijnen, geen soortspecifieke ranking of garantie. Aanval 0–2 en beide andere waarden 13–15 krijgen de aanduiding ‘Ideale marges’; de overige combinaties binnen de selectie ‘Goede marges’. Beste IV’s verschillen per Pokémon; sommige hebben juist 15/15/15 nodig.

**De checker controleert de actuele CP niet.** De vermelding van 1.500 CP verwijst naar de Great League-limiet.

## Op je beginscherm en offline

Open de app eerst online op je telefoon:

- **iPhone:** Safari → Delen → Zet op beginscherm.
- **Android:** gebruik de installatieknop wanneer beschikbaar, of browsermenu → Installeren / Toevoegen aan startscherm.

Na een eerste online bezoek slaat de serviceworker de appbestanden op voor offline gebruik. Open of herlaad de app online om updates binnen te halen.

## Lokaal gebruiken

Geen installatie van appafhankelijkheden nodig. Open `iv-checker/index.html` voor de checker. Voor serviceworker- en offlinefunctionaliteit gebruik je localhost. Met Python, vanuit de repositoryroot:

```sh
python -m http.server 8000 --bind 127.0.0.1 --directory iv-checker
```

Open daarna [localhost:8000](http://localhost:8000/). De bestaande controles kun je met Node.js uitvoeren:

```sh
node iv-checker/check.cjs
```

Ze controleren alle 4.096 IV-combinaties, percentages, tags, grensgevallen en statussen voor maximale stats, plus manifestassets en serviceworker-syntaxis.

## Hosting

GitHub Pages publiceert vanaf **main**, map **/**, met **Deploy from a branch**. De rootpagina verwijst naar de app in `iv-checker/`. Wijzigingen worden na een push automatisch gepubliceerd. De optionele Actions-workflow in `deployment/publish-iv-checker.yml.example` is alleen een voorbeeld en wordt niet uitgevoerd.

[Meer technische informatie en kleurbronnen](iv-checker/README.md).

Onafhankelijke fan-tool, niet verbonden aan Niantic, Nintendo of The Pokémon Company.
