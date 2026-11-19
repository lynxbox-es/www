# Lynx Box Training Center — Sitio Web Estático

Sitio web estático, ligero, accesible y *mobile-first* para **Lynx Box Training Center** (`@lynxbox.center` · C. Ages, 11, C, Fuencarral-El Pardo, 28050 Madrid · Tel. `634 249 847`).

Construido exclusivamente con **HTML5 semántico**, **CSS moderno** (variables CSS, Flexbox/Grid, contraste WCAG AA+) y **JavaScript vanilla mínimo**, sin frameworks ni herramientas de compilación (*zero build step*), listo para alojarse directamente desde GitHub.

---

## Estructura del Proyecto

```text
lynxbox/
├── index.html                  # Página principal (Hero, Programas, Horarios, Tarifas, Coaches, Galería y Contacto)
├── aviso-legal.html            # Plantilla de Aviso Legal (LSSI-CE) con marcadores TODO:
├── privacidad.html             # Plantilla de Política de Privacidad (RGPD) con marcadores TODO:
├── css/
│   └── styles.css              # Estilos monocromáticos de alto contraste (Negro, Blanco y Acero)
├── js/
│   └── main.js                 # Menú móvil accesible, filtro de horarios/días y controles de vídeo
├── assets/
│   ├── images/
│   │   ├── favicon.png                 # Favicon extraído del emblema oficial
│   │   ├── logo-white.png              # Logo oficial en blanco con fondo transparente
│   │   ├── logo-black.png              # Logo oficial en negro con fondo transparente
│   │   ├── logo-card.jpg               # Imagen original del logo (@lynxbox.center)
│   │   ├── coach-nacho.jpg             # Retrato de Nacho (Coach de Hybrid y Fuerza)
│   │   ├── coach-agus.jpg              # Retrato de Agus (Coach de Fuerza)
│   │   ├── coach-ruben.jpg             # Retrato de Rubén (Coach de WOD)
│   │   ├── coach-*-card.jpg            # Tarjetas originales de Instagram de los coaches
│   │   ├── box-disciplina-fuerza.jpg   # Foto real de entrenamiento con mancuernas en Lynx Box
│   │   ├── box-wallballs.jpg           # Fotograma real de entrenamiento en Lynx Box
│   │   ├── box-rope-climb.jpg          # Fotograma real de subida de cuerda en Lynx Box
│   │   ├── box-airbike.jpg             # Fotograma real de Air Bike en Lynx Box
│   │   ├── box-fuerza-stepup.jpg       # Fotograma real de sesión de fuerza en Lynx Box
│   │   └── replace-hero-box.jpg        # [OPCIONAL REEMPLAZAR] Imagen panorámica de fondo del Hero
│   └── videos/
│       ├── reel-wod-box.mp4            # Reel real de sesión WOD optimizado para web (+faststart)
│       └── reel-fuerza-comunidad.mp4   # Reel real de Fuerza y Comunidad optimizado para web (+faststart)
├── .gitignore
├── .nojekyll
└── README.md
```

---

## 1. Cómo Previsualizar en Local

Al no requerir compilación ni dependencias de Node, puedes levantar un servidor local ligero desde la carpeta del proyecto:

```bash
python3 -m http.server 8000 --directory /home/pgarevalo/Projects/lynxbox
```

Después abre **`http://localhost:8000`** en tu navegador.

---

## 2. Cómo Revisar Detalles Pendientes (`TODO:`)

Para localizar todos los comentarios `TODO:` restantes (como datos fiscales en las páginas legales, plataforma de reservas opcional o biografías extendidas de los coaches):

```bash
grep -rn "TODO:" index.html aviso-legal.html privacidad.html
```

- **WhatsApp y Teléfono:** Ya están conectados directamente al **`+34 634 249 847`** (`wa.me/34634249847` y `tel:+34634249847`). Si más adelante quieres redirigir los botones a una plataforma de reservas externa (AimHarder, Resawod, etc.), basta con actualizar los `href` señalados con `TODO:` en `index.html`.
- **Imagen de fondo del Hero (`assets/images/replace-hero-box.jpg`):** Puedes mantenerla o sustituirla por cualquier fotografía horizontal propia del interior de Lynx Box conservando el mismo nombre de archivo.
- **Textos Legales:** Completa la razón social, NIF/CIF y correo electrónico en `aviso-legal.html` y `privacidad.html` antes de publicar en producción.

---

## 3. Cómo Publicar Gratis desde GitHub

### Subir el repositorio a GitHub
```bash
cd /home/pgarevalo/Projects/lynxbox
git add .
git commit -m "Initial static website for Lynx Box Training Center"
git remote add origin git@github.com:TU_USUARIO/lynxbox.git
git push -u origin main
```

### Opción A: GitHub Pages
1. Entra en tu repositorio en GitHub → **Settings** → **Pages**.
2. En **Build and deployment → Source**, elige **Deploy from a branch**.
3. Selecciona la rama `main` y la carpeta `/ (root)` y pulsa **Save**.
4. En ~1 minuto tu web estará activa en `https://TU_USUARIO.github.io/lynxbox/` (o en tu dominio propio añadiendo un archivo `CNAME`).

### Opción B: Cloudflare Pages
1. Entra en el panel de Cloudflare → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Selecciona el repositorio `lynxbox`.
3. Deja **Framework preset** en `None`, **Build command** vacío y **Build output directory** en `/`.
4. Pulsa **Save and Deploy** para obtener CDN global, HTTPS automático y despliegues instantáneos en cada `git push`.
