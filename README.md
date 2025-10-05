# Adrian Dylan-Wulff – Private Homepage

Persönliche, moderne Homepage mit adaptivem Design, Suchfunktion und sanften Micro-Interactions.

## Features

- Responsives, dunkles & helles Design mit automatischer Anpassung an die Systemeinstellungen
- Clientseitige Suche, die Abschnitte hervorhebt und Karten in Projekte-, Journal- und Lieblings-Bereichen filtert
- Persönlicher Journal-Bereich samt Highlights und Favoriten-Galerie
- Sanfte Micro-Interactions, die sich bei reduzierten Bewegungspräferenzen deaktivieren lassen
- Barrierearme Navigation inklusive Keyboard- und Screenreader-Optimierung

## Struktur

- `index.html` – zentrale Startseite mit persönlichen Abschnitten
- `impressum.html`, `datenschutz.html` – rechtliche Einzelseiten im selben Design
- `assets/css/styles.css` – globales Stylesheet
- `assets/js/main.js` – Interaktionen (Theme, Suche, Filter, Motion Preferences)
- `assets/meta/` – Platz für zusätzliche Metadaten (z. B. `manifest.webmanifest` bei Bedarf)
- `sitemap.xml` – Sitemap für bessere Auffindbarkeit in Suchmaschinen

## Entwicklung

Die Seite ist statisch und benötigt keinen Build-Prozess.

```bash
# Lokalen Server starten (z. B. mit Python)
python -m http.server 8000
```

Danach im Browser `http://localhost:8000` öffnen.

## Hinweise

- Um Inhalte anzupassen, bearbeite einfach die HTML-Abschnitte oder ergänze neue Karten.
- Die Suchfunktion basiert auf Textinhalten der Sektionen – relevante Stichwörter können über `data-keywords` hinterlegt werden.
- Für zusätzliche Assets wie Bilder empfiehlt sich der Ordner `assets/` (z. B. `assets/images/`).
