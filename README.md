# Fabián & Soffy — Sitio Web de Boda
**22 de Marzo de 2026 · Cúcuta, Colombia**

---

## 📁 Estructura del proyecto

```
boda-fabian-soffy/
│
├── index.html          ← Router (abre/cierra el sitio)
├── wedding.html        ← Página principal de la boda
├── coming-soon.html    ← Prepágina "Muy Pronto"
├── netlify.toml        ← Configuración de Netlify
│
├── css/
│   ├── 01-base.css           Variables · Reset · Tipografía
│   ├── 02-loader-door.css    Loader de carga · Puertas 3D
│   ├── 03-navigation.css     Navbar sticky · Menú móvil
│   ├── 04-hero-countdown.css Hero · Contador regresivo
│   ├── 05-sections-content.css  Quote · Historia · Itinerario
│   ├── 06-sections-events.css   Eventos · Dress Code · Regalos
│   ├── 07-rsvp-footer.css    RSVP · Footer · Partículas
│   └── 08-coming-soon.css    Estilos de coming-soon.html
│
├── js/
│   ├── 01-loader-door.js     Loader · Puertas · Reveal scroll
│   ├── 02-navigation.js      Navbar scroll · Menú móvil
│   ├── 03-countdown.js       Contador regresivo
│   ├── 04-map-interactions.js  Modal mapas · Efecto ripple
│   ├── 05-particles-parallax.js  Partículas doradas · Parallax
│   └── 06-coming-soon.js     Contraseña · Contador coming-soon
│
└── images/
    ├── story-1.jpg     Foto 1 — Nuestra Historia
    ├── story-2.jpg     Foto 2 — Nuestra Historia
    └── story-3.jpg     Foto 3 — Nuestra Historia
```

---

## ✏️ Cambios frecuentes

### Abrir/cerrar el sitio
En `index.html`, cambia:
```javascript
var SITE_OPEN = false;   // ← cerrado (muestra coming-soon)
var SITE_OPEN = true;    // ← abierto (muestra wedding.html)
```

### Cambiar la contraseña de acceso privado
En `js/06-coming-soon.js`, línea 8:
```javascript
var SECRET = 'soffy2026';   // ← cambia esta cadena
```

### Cambiar la fecha de la boda
En `js/03-countdown.js` y `js/06-coming-soon.js`:
```javascript
// new Date(año, mes-1, día)  →  mes 2 = marzo
var WEDDING_DATE = new Date(2026, 2, 22).getTime();
```

### Cambiar el link de RSVP (Luma)
En `wedding.html`, busca el botón de RSVP:
```html
<a href="https://lu.ma" ...>
```
Reemplaza `https://lu.ma` por tu URL real de Luma.

### Cambiar datos bancarios para regalos
En `wedding.html`, sección `#regalos`, edita las filas de `.gifts-bank-row`.

### Reemplazar fotos de "Nuestra Historia"
Reemplaza los archivos en la carpeta `images/`:
- `story-1.jpg`, `story-2.jpg`, `story-3.jpg`
- Tamaño recomendado: **600×600 px** (cuadradas)

---

## 🚀 Subir a GitHub Pages

1. Sube todos los archivos a tu repositorio GitHub
2. Ve a **Settings → Pages**
3. Fuente: **Branch: main** → carpeta **(root)** → **Save**
4. URL: `https://fabiandiaz18.github.io/monsalveydiaz`

Para abrir el sitio después del evento: edita `index.html` → `SITE_OPEN = true` → commit.

---

## 🌐 Desplegar en Netlify

1. Ve a [netlify.com](https://netlify.com) → **Add new site → Deploy manually**
2. Arrastra toda la carpeta del proyecto
3. Tu sitio queda publicado automáticamente

---

*Hecho con amore ♥ para Fabián & Soffy*
