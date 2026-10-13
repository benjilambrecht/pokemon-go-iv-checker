# Pokémon GO IV Checker

Nederlandstalige statische app zonder afhankelijkheden. Drie aanraakvriendelijke balkjes voor Aanval, Verdediging en HP (0–15), directe berekening met afronding op hele procenten en een overeenkomstige Pokémon GO tag. Groen toont de ingevulde waarde, rood de resterende punten.

## Lokaal gebruiken

Open index.html voor de checker. Voor installatie en offline gebruik: voer vanuit de projectmap `python -m http.server 8000 --directory iv-checker` uit en open http://localhost:8000.

## GitHub Pages

GitHub Pages publiceert automatisch vanaf de branch main, map / (Deploy from a branch). De app staat in iv-checker; de homepage verwijst daarheen. Een optionele Actions-workflow staat als voorbeeld in deployment/publish-iv-checker.yml.example. Relatieve assetpaden ondersteunen hosting onder een repositorypad.

## Beginscherm

Open de HTTPS-website op je telefoon. iPhone: Safari → Delen → Zet op beginscherm. Android: de installatieknop of browsermenu → Installeren/Toevoegen aan startscherm. PNG-iconen van 192×192 en 512×512 en een Apple-touch-icon van 180×180 zijn aanwezig. Na een eerste online bezoek worden de appbestanden opgeslagen voor offline gebruik.

## Controles

`node iv-checker/check.cjs` vanuit de projectmap controleert alle 4.096 IV-combinaties, percentages en weergegeven waarden. Deze controle is geslaagd, net als de manifestassetcontrole en serviceworker-syntaxiscontrole. Voorbeelden: 0/0/0 → 0%; 15/15/15 → 100%; 10/10/10 → 67%; 15/14/13 → 93%.

Live gecontroleerd in Edge met mobiel formaat 390×844: homepageverwijzing, slider- en toetsenbordbediening, geen horizontale overflow, alle appassets HTTP 200, offline herladen en geen JavaScript-fouten. De mobiele screenshot is visueel gecontroleerd. Installatie op een echte telefoon blijft een apparaatgebonden controle.

Onafhankelijke fan-tool, niet verbonden aan Niantic, Nintendo of The Pokémon Company.
