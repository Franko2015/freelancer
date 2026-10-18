"""Genera las portadas SVG de los proyectos que no tienen demo en línea.

Cada portada muestra la arquitectura real del proyecto (capas y tecnologías
confirmadas en el código), no una captura inventada.
Uso: python tools/make_covers.py
"""
from pathlib import Path
from xml.sax.saxutils import escape

OUT = Path(__file__).resolve().parent.parent / "assets" / "img" / "projects"
OUT.mkdir(parents=True, exist_ok=True)

COVERS = {
    "cuaderno-online": {
        "colors": ("#1e1b4b", "#4338ca", "#a78bfa"),
        "nodes": [("Angular 21", "Tailwind 4 · PWA"), ("Google Gemini", "Chatbot de IA"), ("Capacitor 8", "Android · iOS")],
        "chips": ["Cuadernos y hojas", "Editor texto + dibujo", "Vista Markdown", "Tema claro/oscuro", "Docker + nginx", "CI/CD GitHub Actions"],
    },
    "solutio": {
        "colors": ("#0c1a33", "#0369a1", "#38bdf8"),
        "nodes": [("Angular 16", "Material · Chart.js"), ("API Node.js", "Express · JWT"), ("MySQL", "Tickets · Usuarios · Logs")],
        "chips": ["Tickets de soporte", "Chat en la plataforma", "Panel de técnicos", "Dashboards", "Recuperar contraseña", "App Android (Capacitor)"],
    },
    "me-apunto": {
        "colors": ("#2e1065", "#7e22ce", "#f0abfc"),
        "nodes": [("Razor Views", "ASP.NET Core MVC"), ("Controladores", "Auth · Eventos · Usuarios"), ("SQL Server", "Entity Framework Core")],
        "chips": ["Login con cookies", "Roles: usuario / admin / soporte", "Categorías", "Solicitudes de asistencia", "Notificaciones", "Migraciones EF"],
    },
    "informadev": {
        "colors": ("#052e2b", "#0f766e", "#5eead4"),
        "nodes": [("Angular 17", "SSR · Bootstrap"), ("Express", "API REST · JWT"), ("MySQL", "mysql2/promise")],
        "chips": ["Login", "Panel de administración", "Cuenta y ajustes", "Páginas de contenido", "Notificaciones toastr", "Renderizado en servidor"],
    },
    "sistema-pos": {
        "colors": ("#1c1917", "#44403c", "#fbbf24"),
        "nodes": [("Windows Forms", "C# · .NET 6"), ("Capa DAO", "Productos · Ventas · Usuarios"), ("MySQL", "MySql.Data")],
        "chips": ["Login por usuario", "Nueva venta", "Cierre de caja", "Corregir venta", "Productos y almacén", "Gestión de usuarios"],
    },
    "app-novavision": {
        "colors": ("#042f2e", "#0e7490", "#67e8f9"),
        "nodes": [("App Android", "Kotlin"), ("API PHP", "Login · Boletas · Avisos"), ("MySQL", "Clientes y facturas")],
        "chips": ["Inicio de sesión", "Boletas del cliente", "Notificaciones", "Actualizar datos"],
    },
}


def node(y, n, title, sub, accent):
    x, w, h = 90, 1020, 150
    return (
        f'<g><rect x="{x}" y="{y}" width="{w}" height="{h}" rx="30" fill="#ffffff" fill-opacity=".09" stroke="#ffffff" stroke-opacity=".25" stroke-width="2"/>'
        f'<circle cx="{x + 75}" cy="{y + h / 2}" r="42" fill="{accent}" fill-opacity=".22" stroke="{accent}" stroke-width="3"/>'
        f'<text x="{x + 75}" y="{y + h / 2 + 15}" font-size="42" font-weight="800" text-anchor="middle" fill="{accent}">{n}</text>'
        f'<text x="{x + 150}" y="{y + 66}" font-size="54" font-weight="800" fill="#fff">{escape(title)}</text>'
        f'<text x="{x + 150}" y="{y + 114}" font-size="34" fill="#fff" fill-opacity=".78">{escape(sub)}</text></g>'
    )


def build(slug, cfg):
    c1, c2, accent = cfg["colors"]
    parts, y0, step = [], 150, 200
    for i, (t, sub) in enumerate(cfg["nodes"]):
        y = y0 + i * step
        parts.append(node(y, i + 1, t, sub, accent))
        if i < len(cfg["nodes"]) - 1:
            ay = y + 150
            parts.append(
                f'<path d="M600 {ay + 6} V{ay + 38}" stroke="{accent}" stroke-width="5" stroke-linecap="round"/>'
                f'<path d="M586 {ay + 26} L600 {ay + 42} L614 {ay + 26}" fill="none" stroke="{accent}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>'
            )
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 750" font-family="Segoe UI, Inter, Arial, sans-serif" role="img" aria-label="Arquitectura del proyecto">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{c1}"/><stop offset="1" stop-color="{c2}"/></linearGradient>
<radialGradient id="glow" cx=".9" cy=".05" r=".7"><stop offset="0" stop-color="{accent}" stop-opacity=".4"/><stop offset="1" stop-color="{accent}" stop-opacity="0"/></radialGradient>
<pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M50 0H0V50" fill="none" stroke="#fff" stroke-opacity=".06"/></pattern>
</defs>
<rect width="1200" height="750" fill="url(#bg)"/><rect width="1200" height="750" fill="url(#grid)"/><rect width="1200" height="750" fill="url(#glow)"/>
<text x="90" y="100" font-size="30" font-weight="800" letter-spacing="7" fill="{accent}">ARQUITECTURA</text>
{"".join(parts)}
</svg>'''
    (OUT / f"{slug}.svg").write_text(svg, encoding="utf-8")
    print("ok", slug)


for slug, cfg in COVERS.items():
    build(slug, cfg)
