const $ = (q) => document.querySelector(q);
const $$ = (q) => document.querySelectorAll(q);

const projects = [
  {
    title: "Libro de Programación en C (con gráficos)",
    type: "c",
    year: "2025-2026",
    desc: "Libro/documentación propia para aprender C, incluyendo ejemplos y programas con enfoque práctico.",
    tags: ["C", "Algoritmos", "Estructuras", "Gráficos"],
    links: { demo: "#", code: "#" }
  },
  {
    title: "Cajeros Automáticos (Simulador en C)",
    type: "c",
    year: "2026",
    desc: "Sistema tipo ATM: usuarios, saldo, depósitos, retiros, historial y validaciones.",
    tags: ["C", "Archivos", "Validaciones", "Consola"],
    links: { demo: "#", code: "#" }
  },
  {
    title: "Casino en C (Cartas, Carreras, Billar)",
    type: "c",
    year: "2026",
    desc: "Proyecto tipo casino con mini-juegos: cartas, carreras, billar y más, con lógica y puntuación.",
    tags: ["C", "Juegos", "Lógica", "Puntuación"],
    links: { demo: "#", code: "#" }
  },
  {
    title: "App Familiar (Kotlin)",
    type: "android",
    year: "2026",
    desc: "App móvil donde familiares guardan perfiles y datos organizados.",
    tags: ["Kotlin", "Android", "CRUD", "UI básica"],
    links: { demo: "#", code: "#" }
  },
  {
    title: "Bloc de Notas (Android básico)",
    type: "android",
    year: "2026",
    desc: "Aplicación simple de notas: crear, editar y guardar contenido.",
    tags: ["Kotlin", "Android", "Notas"],
    links: { demo: "#", code: "#" }
  },
  {
    title: "App Familiar Web (Flask)",
    type: "backend",
    year: "2026",
    desc: "Sistema web con login, perfiles y panel admin. UI moderna + BD.",
    tags: ["Flask", "SQLite", "Auth", "UI"],
    links: { demo: "#", code: "#" }
  }
];

// Theme
const themeBtn = $("#themeBtn");
const savedTheme = localStorage.getItem("theme");
if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);

themeBtn?.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "light" ? "" : "light";
  if (next) document.documentElement.setAttribute("data-theme", next);
  else document.documentElement.removeAttribute("data-theme");
  localStorage.setItem("theme", next);
  themeBtn.textContent = next === "light" ? "☀️" : "🌙";
});
themeBtn && (themeBtn.textContent = (document.documentElement.getAttribute("data-theme") === "light") ? "☀️" : "🌙");

// Mobile menu
const menuBtn = $("#menuBtn");
const mobileMenu = $("#mobileMenu");
menuBtn?.addEventListener("click", () => {
  const open = mobileMenu.style.display === "block";
  mobileMenu.style.display = open ? "none" : "block";
});
$$(".mobile-menu a").forEach(a => {
  a.addEventListener("click", () => mobileMenu.style.display = "none");
});

// Footer year
$("#year").textContent = new Date().getFullYear();

// Render projects
const grid = $("#projectsGrid");
const searchInput = $("#searchInput");
let activeFilter = "all";

function makeProjectCard(p){
  const el = document.createElement("article");
  el.className = "card project";
  el.dataset.type = p.type;

  el.innerHTML = `
    <div class="top">
      <div>
        <div class="title">${p.title}</div>
        <div class="meta">${p.year} • ${labelType(p.type)}</div>
      </div>
      <span class="badge">${p.type.toUpperCase()}</span>
    </div>

    <div class="desc">${p.desc}</div>

    <div class="p-tags">
      ${p.tags.map(t => `<span>${t}</span>`).join("")}
    </div>

    <div class="links">
      <a class="btn ghost" href="${p.links.demo}" target="_blank" rel="noreferrer">Demo</a>
      <a class="btn" href="${p.links.code}" target="_blank" rel="noreferrer">Código</a>
    </div>
  `;
  return el;
}

function labelType(t){
  if (t === "c") return "C";
  if (t === "android") return "Android";
  if (t === "backend") return "Backend";
  if (t === "ui") return "UI";
  if (t === "web") return "Web";
  return "Proyecto";
}

function render(){
  const q = (searchInput?.value || "").toLowerCase().trim();

  grid.innerHTML = "";
  projects
    .filter(p => activeFilter === "all" ? true : p.type === activeFilter)
    .filter(p => {
      if (!q) return true;
      const hay = `${p.title} ${p.desc} ${p.tags.join(" ")}`.toLowerCase();
      return hay.includes(q);
    })
    .forEach(p => grid.appendChild(makeProjectCard(p)));

  if (!grid.children.length){
    const empty = document.createElement("div");
    empty.className = "card";
    empty.innerHTML = `<strong>No hay resultados</strong><p class="muted">Probá otro filtro o búsqueda.</p>`;
    grid.appendChild(empty);
  }
}

searchInput?.addEventListener("input", render);

$$("#filters .pill").forEach(btn => {
  btn.addEventListener("click", () => {
    $$("#filters .pill").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    render();
  });
});

// Copy email
const copyBtn = $("#copyEmail");
const toast = $("#toast");
copyBtn?.addEventListener("click", async () => {
  const email = $("#emailLink").textContent.trim();
  try{
    await navigator.clipboard.writeText(email);
    toast.classList.add("show");
    setTimeout(()=>toast.classList.remove("show"), 1200);
  }catch(e){
    alert("No se pudo copiar. Copialo manual: " + email);
  }
});

// Counter animation
function animateCounters(){
  const counters = document.querySelectorAll("[data-counter]");
  counters.forEach(el => {
    const target = Number(el.getAttribute("data-counter")) || 0;
    let cur = 0;
    const step = Math.max(1, Math.round(target / 40));
    const timer = setInterval(() => {
      cur += step;
      if (cur >= target){ cur = target; clearInterval(timer); }
      el.textContent = String(cur);
    }, 18);
  });
}

// Modal Contrátame
const hireBtn = document.getElementById("hireBtn");
const hireModal = document.getElementById("hireModal");
const closeHire = document.getElementById("closeHire");

function openHire(){
  hireModal.classList.add("show");
  hireModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeHireModal(){
  hireModal.classList.remove("show");
  hireModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

hireBtn?.addEventListener("click", openHire);
closeHire?.addEventListener("click", closeHireModal);

// cerrar clic afuera
hireModal?.addEventListener("click", (e) => {
  if (e.target?.dataset?.close === "true") closeHireModal();
});

// cerrar con ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && hireModal?.classList.contains("show")) closeHireModal();
});

render();
animateCounters();