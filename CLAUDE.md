# Portafolio de Franco Millanes Araya

Sitio estático (HTML + CSS + JS sin build) publicado con GitHub Pages en https://franko2015.github.io/freelancer/.

## Estructura

- `index.html`: página principal (portada, proyectos, sobre mí, habilidades, experiencia, contacto).
- `cv.html`: CV imprimible. Los Word descargables están en `assets/cv/`.
- `css/main.css`, `js/main.js`: estilos y lógica. Los proyectos destacados se definen en el arreglo `FEATURED` de `js/main.js`.
- `assets/img/projects/`: capturas reales (`.webp`) y portadas de arquitectura (`.svg`).
- `tools/make_covers.py`: genera las portadas SVG de proyectos sin demo en línea.
- `docs/referencias.md`: portafolios de referencia y principios de diseño.
- `.claude/skills/`: skills de diseño instaladas (taste-skill, redesign-skill, ui-ux-pro-max, impeccable).
- `.claude/agents/`: subagentes del proyecto.

## Reglas

1. **No inventar.** Cada afirmación sobre un proyecto debe poder comprobarse en su repo (README, `package.json`, código). Si no se puede comprobar, no se escribe.
2. **Datos reales de contacto:** correo `francoding.dev@gmail.com`, teléfono +56 9 9811 0665, Romeral, Curicó (Maule).
3. **Nada de datos de terceros** en capturas o textos (correos, nombres de clientes, números). Revisar cada captura antes de publicarla.
4. **Solo enlaces vivos.** Antes de agregar una demo, comprobar que responde con 200. Si deja de funcionar, quitar el enlace.
5. **Idioma:** español de Chile, tono cercano y profesional.
6. **Accesibilidad:** contraste AA, navegación con teclado, `alt` en imágenes, respetar `prefers-reduced-motion`.
7. **Rendimiento:** imágenes en WebP o SVG, `loading="lazy"` bajo el primer pliegue, sin librerías innecesarias.

## Cómo probar

```bash
python -m http.server 8000
```

Luego abrir http://localhost:8000. Para capturas de verificación se puede usar Edge en modo headless (`msedge --headless=new --screenshot=...`).

## Para agregar un proyecto

1. Leer el repo y anotar lo comprobable (stack, funciones, despliegue).
2. Conseguir una captura real de la demo o generar una portada con `tools/make_covers.py`.
3. Agregar la entrada en `FEATURED` (`js/main.js`) con `tagline`, `desc`, 3 `points`, `tags` y enlaces.
4. Probar en escritorio y móvil.
