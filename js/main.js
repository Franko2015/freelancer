(function () {
  "use strict";
  var USER = "Franko2015";
  var G = "https://github.com/" + USER + "/";
  var IMG = "assets/img/projects/";

  var FEATURED = [
    { title: "NutriCom", cat: "fullstack", img: IMG + "nutricom.webp", imgAlt: "Pantalla de configuración inicial de NutriCom",
      tagline: "Sistema de gestión para nutricionistas",
      desc: "Aplicación para llevar la consulta nutricional completa: fichas de pacientes, consultas, evaluaciones, medidas corporales, planes de alimentación y agenda, con reportes exportables a PDF.",
      points: ["Panel con gráficos (Chart.js) y calendario de citas", "Calculadora nutricional, base de alimentos y plantillas de dieta", "Sesión protegida con guards, datos guardados en el navegador y exportación a PDF"],
      tags: ["Angular 22", "TypeScript", "Tailwind 4", "SSR", "Chart.js", "jsPDF"],
      code: [["Código", G + "nutricom"]], demo: "https://franko2015.github.io/nutricom/" },
    { title: "Romayor", cat: "web", img: IMG + "mitienda.webp", imgAlt: "Portada de la tienda Romayor",
      tagline: "Tienda online de productos de aseo con pedidos por WhatsApp",
      desc: "Sitio de venta para un negocio local de Romeral: catálogo con carrito, cálculo de despacho urbano o rural, pedido mínimo y envío del pedido listo por WhatsApp, además de pago por transferencia.",
      points: ["JavaScript puro, sin frameworks: rápido y ligero", "SEO, accesibilidad (salto al contenido, ARIA) y carga diferida de imágenes", "Sorteo mensual y métricas propias guardadas en el navegador"],
      tags: ["JavaScript", "HTML", "CSS", "Vercel", "SEO"],
      code: [["Código", G + "mitienda"]], demo: "https://mitienda-iota.vercel.app" },
    { title: "Shooter 2D", cat: "web", img: IMG + "totown.webp", imgAlt: "Menú principal del juego Shooter 2D",
      tagline: "Videojuego de supervivencia en el navegador",
      desc: "Juego de disparos con vista cenital: sobrevive a oleadas de enemigos, sube de nivel, mejora tus habilidades y enfrenta al jefe final en el nivel 10. Programado desde cero, sin motor de juegos.",
      points: ["Motor propio modular: bucle de juego, cámara, colisiones y entrada", "Mapa generado proceduralmente con biomas, oleadas, mini-jefes y sistema de mejoras", "Audio, partículas, partida guardada y tabla de clasificación"],
      tags: ["JavaScript ES6", "Canvas 2D", "Vercel"],
      code: [["Código", G + "totown"]], demo: "https://totown.vercel.app" }
  ];
  var KINDS = { fullstack: "Full-Stack", web: "Web", otros: "Móvil / Escritorio" };

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  /* Projects */
  var grid = document.getElementById("featured");
  FEATURED.forEach(function (p, i) {
    var c = el("article", "card");
    c.dataset.cat = p.cat;
    var th = el("div", "thumb");
    var img = el("img");
    img.src = p.img; img.alt = p.imgAlt; img.width = 1200; img.height = 750;
    img.loading = i < 3 ? "eager" : "lazy"; img.decoding = "async";
    th.appendChild(img);
    th.appendChild(el("span", "kind", KINDS[p.cat]));
    c.appendChild(th);
    var b = el("div", "body");
    b.appendChild(el("h3", null, p.title));
    b.appendChild(el("p", "tagline", p.tagline));
    b.appendChild(el("p", "desc", p.desc));
    var pts = el("ul", "points");
    p.points.forEach(function (t) { pts.appendChild(el("li", null, t)); });
    b.appendChild(pts);
    var ul = el("ul", "tags");
    p.tags.forEach(function (t) { ul.appendChild(el("li", null, t)); });
    b.appendChild(ul);
    var l = el("div", "links");
    if (p.demo) {
      var d = el("a", "live", "Ver demo");
      d.href = p.demo; d.target = "_blank"; d.rel = "noopener";
      l.appendChild(d);
    }
    p.code.forEach(function (k) {
      var a = el("a", null, k[0]);
      a.href = k[1]; a.target = "_blank"; a.rel = "noopener";
      l.appendChild(a);
    });
    b.appendChild(l);
    c.appendChild(b);
    grid.appendChild(c);
  });

  /* Theme */
  var root = document.documentElement;
  var themeBtn = document.getElementById("theme");
  function applyTheme(t) {
    root.setAttribute("data-theme", t);
    themeBtn.textContent = t === "dark" ? "☀️" : "🌙";
    themeBtn.setAttribute("aria-label", t === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro");
  }
  var saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  applyTheme(saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  themeBtn.addEventListener("click", function () {
    var t = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(t);
    try { localStorage.setItem("theme", t); } catch (e) {}
  });

  /* Mobile menu */
  var menu = document.getElementById("menu");
  var menuBtn = document.getElementById("menu-btn");
  menuBtn.addEventListener("click", function () {
    var open = menu.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
  });
  menu.addEventListener("click", function (e) {
    if (e.target.tagName === "A") { menu.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); }
  });

  /* Reveal + active nav */
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("reveal-in"); io.unobserve(e.target); } });
  }, { threshold: 0.08 });
  document.querySelectorAll(".reveal").forEach(function (n) { io.observe(n); });

  var links = document.querySelectorAll("#menu a");
  var spy = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) {
        links.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id); });
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("main section[id]").forEach(function (s) { spy.observe(s); });

  /* Photo with fallback */
  var photo = document.getElementById("photo");
  var test = new Image();
  test.onload = function () { photo.src = "assets/img/foto.jpg"; };
  test.src = "assets/img/foto.jpg";

  /* Copy */
  var toast = document.getElementById("toast");
  document.querySelectorAll("[data-copy]").forEach(function (b) {
    b.addEventListener("click", function () {
      var txt = b.dataset.copy;
      var done = function () {
        toast.textContent = "Copiado: " + txt;
        toast.classList.add("show");
        setTimeout(function () { toast.classList.remove("show"); }, 2200);
      };
      if (navigator.clipboard) navigator.clipboard.writeText(txt).then(done, done); else done();
    });
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
