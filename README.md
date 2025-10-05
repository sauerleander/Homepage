# Adrian Dylan Wulf – Private Landingpage

Eine ruhige, persönliche Landingpage mit hell/dunkel Modus, klarer Typografie und leichtgewichtigen Abschnitten für Momente,
Gedanken und Kontakt.

## Inhalt

- `index.html` – Startseite mit Intro, Kurznotizen und Kontakt
- `impressum.html`, `datenschutz.html` – rechtliche Einzelseiten im gleichen Look
- `assets/css/styles.css` – globales Stylesheet für Layout, Farben und Komponenten
- `assets/js/main.js` – kleine Helfer für Theme-Umschaltung und Jahreszahl im Footer
- `sitemap.xml` – Sitemap für Suchmaschinen

## Lokale Vorschau

Die Seite ist statisch und benötigt keinen Build-Prozess.

```bash
python -m http.server 8000
```

Danach im Browser `http://localhost:8000` öffnen.

## Anpassung

Die Texte lassen sich direkt in den HTML-Dateien anpassen. Für neue Sektionen können bestehende Karten (z. B. aus dem
`about`-Bereich) dupliziert werden. Assets wie Bilder oder weitere Schriftarten lassen sich unter `assets/` ergänzen.
