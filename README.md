# Pura Artesanías

Webshop für Kunsthandwerk aus Salta (Argentinien). Bestellungen laufen über **WhatsApp** oder **E-Mail**: Der Warenkorb erzeugt automatisch eine fertige Nachricht.

Reine statische Seite (HTML/CSS/JS), kein Build-Schritt, keine Abhängigkeiten.

## Vor dem Veröffentlichen anpassen

In **`js/config.js`**:

| Feld | Bedeutung |
|---|---|
| `whatsapp` | WhatsApp-Nummer international, ohne `+` und Leerzeichen, z. B. `5493871234567` |
| `email` | E-Mail-Adresse für Bestellungen |
| `instagram` | Instagram-Name ohne `@` (leer lassen zum Ausblenden) |
| `mostrarPrecios` | `false` → überall „Consultar precio“ statt Preisen |

> ⚠️ Die Nummer und die E-Mail sind aktuell **Platzhalter**. Auch die **Preise** in `js/products.js` sind nur Beispielwerte.

## Produkte bearbeiten

Alle Produkte stehen in **`js/products.js`**. Für ein neues Produkt einen Block `{ ... }` kopieren und anpassen:

```js
{
  id: "ocarina-grande",               // eindeutig, ohne Leerzeichen
  nombre: "Ocarina grande",
  categoria: "instrumentos",          // eine id aus CATEGORIAS
  precio: 20000,                      // ARS, oder null = "Consultar"
  imagen: "img/productos/ocarina-grande.jpg",
  descripcion: "…",
  opciones: { nombre: "Diseño", valores: ["Espiral", "Sol"] }, // optional
  destacado: true,                    // optional: erscheint zuerst
  agotado: false,                     // optional: ausverkauft
},
```

## Bilder

- Produktfotos: `img/productos/` – ideal **4:3** (z. B. 1200×900 px), als JPG.
- Die aktuellen Bilder sind Ausschnitte aus den Marktfotos und dienen nur als Platzhalter. Einfach mit gleichem Dateinamen überschreiben oder neue Dateien anlegen und den Pfad in `products.js` ändern.
- Fotos vom Stand („Nosotros“): `img/puesto/`.

Tipp für bessere Fotos: im Schatten oder bei bewölktem Himmel fotografieren (kein hartes Sonnenlicht), neutraler Hintergrund (Stoff, Holz, Stein), ein Produkt pro Bild.

## Lokal ansehen

```bash
npx serve .
```

## Auf Vercel deployen

1. Repository auf GitHub pushen.
2. Auf [vercel.com](https://vercel.com) → **Add New… → Project** → Repository importieren.
3. Framework Preset: **Other**, Build Command leer lassen, Output Directory leer lassen (Root).
4. **Deploy**. Jede Änderung auf dem Branch wird danach automatisch neu veröffentlicht.

Alternativ mit der CLI:

```bash
npx vercel --prod
```
