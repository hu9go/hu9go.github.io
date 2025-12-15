// gestione menu mobile
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle"); // bottone per aprire/chiudere il menu
  const navMenu = document.querySelector("nav ul"); // lista del menu di navigazione
  const navLinks = document.querySelectorAll("nav ul li a"); // tutti i link del menu

  // al click sul bottone, mostra/nasconde il menu
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });

  // al click su un link, chiude il menu
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show");
    });
  });
});

// evidenzia voce attiva nel menu
const currentPage = window.location.pathname.split("/").pop().toLowerCase(); // nome della pagina corrente
document.querySelectorAll("#navbar a").forEach(link => {
  const href = link.getAttribute("href").split("/").pop().toLowerCase(); // nome pagina dal link
  if (href === currentPage) link.classList.add("active"); // evidenzia se corrisponde
});

// effetto reveal su scroll
const faders = document.querySelectorAll(".fade-in"); // elementi con effetto fade-in
if (faders.length) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { // quando l’elemento entra nel viewport
        entry.target.classList.add("show"); // aggiunge classe per animazione
        obs.unobserve(entry.target); // smette di osservarlo
      }
    });
  }, { threshold: 0.2, rootMargin: "0px 0px -50px 0px" });

  faders.forEach(fader => observer.observe(fader)); // attiva osservazione
}

// redirect con query string
function redirectWithParams(page, data) {
  const params = new URLSearchParams(data); // converte oggetto in query string
  window.location.href = page + "?" + params.toString(); // reindirizza con parametri
}

// form contatti
function renderContattiForm() {
  const container = document.getElementById("form-contatti"); // contenitore del form
  if (!container) return;

  // genera html del form
  container.innerHTML = `
    <form id="contatti-form">
      <div class="form-floating">
        <input type="text" class="form-control" id="nome" placeholder="Nome" required>
        <label for="nome">Nome*</label>
      </div>
      <div class="form-floating mb-3">
        <input type="email" class="form-control" id="email" placeholder="name@example.com" required>
        <label for="email">Indirizzo email*</label>
      </div>
      <div class="form-floating mb-3">
        <textarea id="messaggio" class="form-control" placeholder="Messaggio" style="height: 150px;" required></textarea>
        <label for="messaggio">Messaggio*</label>
      </div>
      <button type="submit" class="btn">Invia</button>
    </form>
  `;

  // gestione invio form
  document.getElementById("contatti-form").addEventListener("submit", e => {
    e.preventDefault(); // evita refresh
    const data = {
      tipo: "contatti",
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      messaggio: document.getElementById("messaggio").value
    };
    redirectWithParams("conferma.html", data); // reindirizza con dati
  });
}

// form lavoro
function renderLavoroForm() {
  const container = document.getElementById("form-lavoro"); // contenitore del form
  if (!container) return;

  // genera html del form
  container.innerHTML = `
    <form id="lavoro-form">
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="nomecognome" placeholder="Nome e Cognome" required>
        <label for="nomecognome">Nome e Cognome*</label>
      </div>
      <div class="form-floating mb-3">
        <input type="email" class="form-control" id="emailLav" placeholder="email@example.com" required>
        <label for="emailLav">Email*</label>
      </div>
      <div class="form-floating mb-3">
        <select class="form-select" id="ruolo" required>
          <option value="" disabled selected></option>
          <option value="muratore">Muratore</option>
          <option value="carpentiere">Carpentiere</option>
          <option value="ingegnere">Ingegnere</option>
          <option value="architetto">Architetto</option>
          <option value="altro">Altro</option>
        </select>
        <label for="ruolo">Ruolo desiderato*</label>
      </div>
      <div class="form-floating mb-3">
        <textarea class="form-control" id="presentazione" placeholder="Presentati brevemente" style="height: 150px;" required></textarea>
        <label for="presentazione">Presentazione*</label>
      </div>
      <button type="submit" class="btn">Invia candidatura</button>
    </form>
  `;

  // gestione invio form
  document.getElementById("lavoro-form").addEventListener("submit", e => {
    e.preventDefault();
    const data = {
      tipo: "lavoro",
      nomecognome: document.getElementById("nomecognome").value,
      emailLav: document.getElementById("emailLav").value,
      ruolo: document.getElementById("ruolo").value,
      presentazione: document.getElementById("presentazione").value
    };
    redirectWithParams("conferma.html", data); // reindirizza con dati
  });
}

// pagina conferma
function renderConferma() {
  const titolo = document.getElementById("titolo"); // titolo della pagina conferma
  if (!titolo) return;

  const params = new URLSearchParams(window.location.search); // legge parametri url
  const tipo = params.get("tipo");

  if (tipo === "contatti") {
    titolo.textContent = "Richiesta contatto inviata";
    document.getElementById("blocco-contatti").style.display = "block";
    document.getElementById("outputNome").textContent = params.get("nome");
    document.getElementById("outputEmail").textContent = params.get("email");
    document.getElementById("outputMessaggio").textContent = params.get("messaggio");
  } else if (tipo === "lavoro") {
    titolo.textContent = "Candidatura inviata";
    document.getElementById("blocco-lavoro").style.display = "block";
    document.getElementById("outputNomeCognome").textContent = params.get("nomecognome");
    document.getElementById("outputEmailLav").textContent = params.get("emailLav");
    document.getElementById("outputRuolo").textContent = params.get("ruolo");
    document.getElementById("outputPresentazione").textContent = params.get("presentazione");
  } else {
    titolo.textContent = "Dati inviati";
  }
}

// router: decide quale funzione eseguire in base alla pagina
const page = window.location.pathname.split("/").pop().toLowerCase();
if (page === "contatti.html") {
  renderContattiForm();
} else if (page === "lavora-con-noi.html") {
  renderLavoroForm();
} else if (page === "conferma.html") {
  renderConferma();
}

// parallax hero
window.addEventListener("scroll", () => {
  const scrolled = window.scrollY * 0.4; // calcola spostamento proporzionale
  const hero = document.querySelector(".hero");
  if (hero) hero.style.backgroundPosition = `center calc(50% + ${scrolled}px)`; // muove sfondo
});

// nascondi header in scroll down
let lastScroll = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > lastScroll && currentScroll > 100) {
    header.classList.add("hide"); // nasconde header se si scorre giù
  } else {
    header.classList.remove("hide"); // mostra header se si scorre su
  }
  lastScroll = currentScroll; // aggiorna posizione
});
