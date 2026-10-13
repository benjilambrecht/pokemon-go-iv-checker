# Pokémon GO IV Checker

Nederlandstalige statische app zonder afhankelijkheden. Drie aanraakvriendelijke balkjes voor Aanval, Verdediging en HP (0–15), directe berekening en Nederlandse getalnotatie. Groen toont de ingevulde waarde, rood de resterende punten.

## Lokaal gebruiken

Open index.html voor de checker. Voor installatie en offline gebruik: voer vanuit de projectmap `python -m http.server 8000 --directory iv-checker` uit en open http://localhost:8000.

## GitHub Pages

De workflow .github/workflows/publish-iv-checker.yml publiceert uitsluitend deze appmap. Stel in GitHub Settings → Pages de bron in op GitHub Actions. De workflow start bij een push naar main en kan handmatig worden gestart. Relatieve assetpaden ondersteunen hosting onder een repositorypad.

## Beginscherm

Open de HTTPS-website op je telefoon. iPhone: Safari → Delen → Zet op beginscherm. Android: de installatieknop of browsermenu → Installeren/Toevoegen aan startscherm. PNG-iconen van 192×192 en 512×512 en een Apple-touch-icon van 180×180 zijn aanwezig. Na een eerste online bezoek worden de appbestanden opgeslagen voor offline gebruik.

## Controles

`node iv-checker/check.cjs` vanuit de projectmap controleert alle 4.096 IV-combinaties, percentages en weergegeven waarden. Deze controle is geslaagd, net als de manifestassetcontrole en serviceworker-syntaxiscontrole. Voorbeelden: 0/0/0 → 0%; 15/15/15 → 100%; 10/10/10 → 66,7%; 15/14/13 → 93,3%.

Visuele browsercontrole en installatie op een echte telefoon zijn nog niet uitgevoerd doordat de browserruntime niet startte. Test op de telefoon ook offline herladen na het eerste online bezoek.

Onafhankelijke fan-tool, niet verbonden aan Niantic, Nintendo of The Pokémon Company.
