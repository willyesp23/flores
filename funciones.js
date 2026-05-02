// ============================================================
// CARRUSEL — DOTS
// ============================================================
const track = document.querySelector('.carousel-track');
const dotsContainer = document.querySelector('.dots');
const eventos = document.querySelectorAll('.evento');

eventos.forEach((_, i) => {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  if (i === 0) dot.classList.add('active');
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

track.addEventListener('scroll', () => {
  const index = Math.round(track.scrollLeft / track.clientWidth);
  dots.forEach(dot => dot.classList.remove('active'));
  if (dots[index]) dots[index].classList.add('active');
});

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    track.scrollTo({ left: track.clientWidth * i, behavior: 'smooth' });
  });
});

// ============================================================
// REPRODUCTOR DE AUDIO
// ============================================================
const audio    = document.getElementById("audio");
const btn      = document.getElementById("playBtn");
const cover    = document.getElementById("cover");
const progress = document.getElementById("progress");
const current  = document.getElementById("current");
const duration = document.getElementById("duration");
const line     = document.getElementById("line");

function togglePlay() {
  if (audio.paused) {
    audio.play();
    btn.innerHTML = "❚❚";
    cover.parentElement.classList.add("spin");
  } else {
    audio.pause();
    btn.innerHTML = "▶";
    cover.parentElement.classList.remove("spin");
  }
}

audio.addEventListener('loadedmetadata', () => {
  duration.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
  if (!isNaN(audio.duration) && audio.duration > 0) {
    progress.value = (audio.currentTime / audio.duration) * 100;
  }
  current.textContent = formatTime(audio.currentTime);
  updateLyrics(audio.currentTime);
});

progress.addEventListener('input', () => {
  if (!isNaN(audio.duration)) {
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
});

audio.addEventListener('ended', () => {
  btn.innerHTML = "▶";
  cover.parentElement.classList.remove("spin");
  progress.value = 0;
  current.textContent = "0:00";
  currentIndex = -1;
  line.textContent = "♪ ... ♪";
  line.style.opacity = 1;
  line.style.transform = "translateY(0)";
});

function formatTime(sec) {
  if (isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return m + ":" + (s < 10 ? "0" + s : s);
}

// ============================================================
// LETRA SINCRONIZADA
// ============================================================
const lyrics = [
  { time: 1,   text: "💞 TE AMO MI AMORCITO 💕" },
  { time: 12,  text: "♪ Green was the color of the grass ♪" },
  { time: 13,  text: "♪ Where I used to read ♪" },
  { time: 15,  text: "♪ At Centennial Park ♪" },
  { time: 17,  text: "♪ I used to think ♪" },
  { time: 18,  text: "♪ I would meet somebody there ♪" },
  { time: 23,  text: "♪ Teal was the color of your shirt ♪" },
  { time: 25,  text: "♪ When you were sixteen ♪" },
  { time: 26,  text: "♪ At the yogurt shop ♪" },
  { time: 29,  text: "♪ You used to work at ♪" },
  { time: 30,  text: "♪ To make a little money ♪" },
  { time: 35,  text: "♪ Time, curious time ♪" },
  { time: 37,  text: "♪ Gave me no compasses, gave me no signs ♪" },
  { time: 40,  text: "♪ Were there clues I didn't see? ♪" },
  { time: 47,  text: "♪ And isn't it just so pretty to think ♪" },
  { time: 51,  text: "♪ All along there was some ♪" },
  { time: 54,  text: "🪡 Invisible string 🪡" },
  { time: 57,  text: "💝 Tying you to me? 💝" },
  { time: 63,  text: "♪ Ooh-ooh-ooh-ooh ♪" },
  { time: 69,  text: "♪ Of the song in the cab ♪" },
  { time: 70,  text: "♪ Bad was the blood ♪" },
  { time: 72,  text: "♪ On your first trip to L.A. ♪" },
  { time: 75,  text: "♪ You ate at my favorite spot for dinner ♪" },
  { time: 81,  text: "♪ Bold was the waitress ♪" },
  { time: 82,  text: "♪ On our three-year trip ♪" },
  { time: 83,  text: "♪ Getting lunch down by the lakes ♪" },
  { time: 86,  text: "♪ She said I looked like ♪" },
  { time: 88,  text: "♪ An American singer ♪" },
  { time: 92,  text: "♪ Time, mystical time ♪" },
  { time: 94,  text: "♪ Cutting me open, then healing me fine ♪" },
  { time: 97,  text: "♪ Were there clues I didn't see? ♪" },
  { time: 104, text: "♪ And isn't it just so pretty to think ♪" },
  { time: 108, text: "♪ All along there was some ♪" },
  { time: 111, text: "🪡 Invisible string 🪡" },
  { time: 115, text: "💝 Tying you to me? 💝" },
  { time: 121, text: "♪ Ooh-ooh-ooh-ooh ♪" },
  { time: 125, text: "♪ A string that pulled me ♪" },
  { time: 128, text: "♪ Out of all the wrong arms ♪" },
  { time: 130, text: "♪ Right into that dive bar ♪" },
  { time: 134, text: "♪ Something wrapped all of my ♪" },
  { time: 136, text: "♪ Past mistakes in barbed wire ♪" },
  { time: 139, text: "♪ Chains around my demons ♪" },
  { time: 142, text: "♪ Wool to brave the seasons ♪" },
  { time: 146, text: "♪ One single thread of gold ♪" },
  { time: 149, text: "♪ Tied me to you ♪" },
  { time: 156, text: "♪ Cold was the steel ♪" },
  { time: 157, text: "♪ Of my axe to grind ♪" },
  { time: 158, text: "♪ For the boys who broke my heart ♪" },
  { time: 161, text: "♪ Now I send their babies presents ♪" },
  { time: 167, text: "♪ Gold was the color of the leaves ♪" },
  { time: 169, text: "♪ When I showed you ♪" },
  { time: 170, text: "♪ Around Centennial Park ♪" },
  { time: 172, text: "♪ Hell was the journey ♪" },
  { time: 174, text: "♪ But it brought me heaven ♪" },
  { time: 178, text: "♪ Time, wondrous time ♪" },
  { time: 180, text: "♪ Gave me the blues and then ♪" },
  { time: 182, text: "♪ Purple-pink skies ♪" },
  { time: 184, text: "♪ And it's cool ♪" },
  { time: 185, text: "♪ Baby, with me ♪" },
  { time: 190, text: "♪ And isn't it just so pretty to think ♪" },
  { time: 194, text: "♪ All along there was some ♪" },
  { time: 197, text: "🪡 Invisible string 🪡" },
  { time: 201, text: "💝 Tying you to me? 💝" },
  { time: 207, text: "♪ Ooh-ooh-ooh-ooh ♪" },
  { time: 213, text: "♪ Me.. ♪" },
  { time: 219, text: "♪ Ooh-ooh-ooh-ooh ♪" },
  { time: 224, text: "♪ (ah-ah-ah) ♪" },
  { time: 230, text: "♪ (ah-ah-ah) ♪" },
];

let currentIndex = -1;

function updateLyrics(time) {
  for (let i = lyrics.length - 1; i >= 0; i--) {
    if (time >= lyrics[i].time) {
      if (currentIndex !== i) {
        currentIndex = i;
        line.style.opacity = 0;
        line.style.transform = "translateY(10px)";
        setTimeout(() => {
          line.textContent = lyrics[i].text;
          line.style.opacity = 1;
          line.style.transform = "translateY(0)";
        }, 200);
      }
      return;
    }
  }
}

audio.addEventListener('play', () => {
  currentIndex = -1;
  line.textContent = "♪ ... ♪";
  line.style.opacity = 1;
  line.style.transform = "translateY(0)";
});

// ============================================================
// CONTADOR DE DÍAS
// ============================================================
const inicio = new Date("2025-12-10T00:00:00");

function actualizarContador() {
  const diff = new Date() - inicio;
  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  document.getElementById("contador").textContent = `Llevamos ${dias} días juntitos 💞`;
}
actualizarContador();
setInterval(actualizarContador, 1000);

// ============================================================
// GALERÍA — LIGHTBOX
// ============================================================
const fotoItems   = document.querySelectorAll('.foto-item img');
const lightbox    = document.getElementById('lightbox');
const lbImg       = document.getElementById('lbImg');
const lbClose     = document.getElementById('lbClose');
const lbPrev      = document.getElementById('lbPrev');
const lbNext      = document.getElementById('lbNext');
let lbIndex = 0;

const fotos = Array.from(fotoItems);

fotos.forEach((img, i) => {
  img.addEventListener('click', () => abrirLightbox(i));
});

function abrirLightbox(i) {
  lbIndex = i;
  lbImg.src = fotos[i].src;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function cerrarLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

lbClose.addEventListener('click', cerrarLightbox);

lbPrev.addEventListener('click', () => {
  lbIndex = (lbIndex - 1 + fotos.length) % fotos.length;
  lbImg.src = fotos[lbIndex].src;
});

lbNext.addEventListener('click', () => {
  lbIndex = (lbIndex + 1) % fotos.length;
  lbImg.src = fotos[lbIndex].src;
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) cerrarLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape')    cerrarLightbox();
  if (e.key === 'ArrowLeft') lbPrev.click();
  if (e.key === 'ArrowRight') lbNext.click();
});

// ============================================================
// RAZONES POR LAS QUE TE AMO
// ============================================================
const todasLasRazones = [
  { emoji: "😍", texto: "Porque tu sonrisa ilumina cualquier lugar" },
  { emoji: "🧠", texto: "Porque eres inteligente y siempre me sorprendes" },
  { emoji: "🤣", texto: "Porque me haces reír como nadie más" },
  { emoji: "🤝", texto: "Porque puedo ser yo mismo contigo" },
  { emoji: "💪", texto: "Porque eres fuerte aunque no siempre lo notes" },
  { emoji: "🌸", texto: "Porque tienes un corazón enorme y hermoso" },
  { emoji: "👀", texto: "Porque tus ojos me dicen todo sin hablar" },
  { emoji: "🎯", texto: "Porque cuando te propones algo, lo logras" },
  { emoji: "🫂", texto: "Porque un abrazo tuyo me arregla el día" },
  { emoji: "🌙", texto: "Porque hasta en los días difíciles me alegras" },
  { emoji: "✨", texto: "Porque eres única en todo sentido" },
  { emoji: "🎶", texto: "Porque compartimos canciones que ya son nuestras" },
  { emoji: "🥺", texto: "Porque cuando me miras así, el mundo se detiene" },
  { emoji: "🍀", texto: "Porque tenerte es la mejor suerte de mi vida" },
  { emoji: "💜", texto: "Porque cada día me enamoro un poco más de ti" },
];

const RAZONES_POR_PAGINA = 5;
let razonesVisibles = 0;
const listaEl  = document.getElementById('razonesLista');
const btnMas   = document.getElementById('btnMasRazones');

function mostrarRazones() {
  const siguiente = Math.min(razonesVisibles + RAZONES_POR_PAGINA, todasLasRazones.length);

  for (let i = razonesVisibles; i < siguiente; i++) {
    const r   = todasLasRazones[i];
    const div = document.createElement('div');
    div.classList.add('razon-item');
    div.style.animationDelay = ((i - razonesVisibles) * 0.1) + 's';
    div.innerHTML = `<span class="razon-emoji">${r.emoji}</span><span>${r.texto}</span>`;
    listaEl.appendChild(div);
  }

  razonesVisibles = siguiente;

  if (razonesVisibles >= todasLasRazones.length) {
    btnMas.classList.add('oculto');
  }
}

// Mostrar las primeras al cargar
mostrarRazones();
btnMas.addEventListener('click', mostrarRazones);

// ============================================================
// CARTAS EMOCIONALES
// ============================================================
function mostrarCarta(tipo) {
  const textos = {
    triste:   "Oye… si estás triste, recuerda que no estás sola. Aquí estoy para ti siempre, para escucharte, para abrazarte y para recordarte que te amo muchísimo. ❤️",
    feliz:    "¡Me alegra tanto que estés feliz! Tu alegría también es la mía, y me encanta verte brillar. Eres lo más bonito de mis días. 💕",
    extrañes: "Yo también te extraño, más de lo que crees. Pero eso me recuerda lo mucho que significa lo nuestro. Pronto nos vemos 😔💖"
  };
  const el = document.getElementById("cartaTexto");
  el.classList.remove('visible');
  setTimeout(() => {
    el.textContent = textos[tipo] || "";
    el.classList.add('visible');
  }, 200);
}

// ============================================================
// CARTA SECRETA CON CONTRASEÑA
// ============================================================
// 🔑 CAMBIA ESTA CLAVE por la que quieras que ella escriba
const CLAVE_SECRETA = "lidice";

// Mensaje que verá cuando acierte
const MENSAJE_SECRETO = `
Mi amor… si estás leyendo esto es porque encontraste la clave 🥺

Quiero que sepas algo que a veces no sé cómo decirte en persona:
eres la persona más especial que ha llegado a mi vida.
No me imagino mis días sin ti.

Cada vez que te veo, me recuerdo que soy el más afortunado del mundo
por tenerte a mi lado. Te amo con todo, mi niña preciosa. 💜

— William
`;

function verificarClave() {
  const input = document.getElementById("claveInput");
  const msg   = document.getElementById("cartaSecretaMsg");

  if (input.value.trim().toLowerCase() === CLAVE_SECRETA.toLowerCase()) {
    msg.innerHTML = MENSAJE_SECRETO.trim().replace(/\n/g, '<br>');
    msg.classList.add('visible');
    input.value = "";
    lanzarCorazones(); // celebración extra
  } else {
    msg.innerHTML = "❌ Esa no es la clave… ¡inténtalo de nuevo! 😉";
    msg.classList.add('visible');
    input.value = "";
    setTimeout(() => {
      msg.classList.remove('visible');
    }, 2500);
  }
}

// Permitir Enter en el input
document.getElementById("claveInput").addEventListener('keydown', (e) => {
  if (e.key === 'Enter') verificarClave();
});

// ============================================================
// BOTÓN QUE HUYE
// ============================================================
const noBtn = document.getElementById("no");

function escapar() {
  const maxX = window.innerWidth  - noBtn.offsetWidth  - 10;
  const maxY = window.innerHeight - noBtn.offsetHeight - 10;
  noBtn.style.position = "fixed";
  noBtn.style.left     = Math.max(0, Math.random() * maxX) + "px";
  noBtn.style.top      = Math.max(0, Math.random() * maxY) + "px";
  noBtn.style.zIndex   = "9999";
}

noBtn.addEventListener('mouseover', escapar);
noBtn.addEventListener('touchstart', (e) => {
  e.preventDefault();
  escapar();
}, { passive: false });

// ============================================================
// BOTÓN SÍ — lluvia de corazones
// ============================================================
const siBtn = document.getElementById("si");
siBtn.addEventListener('click', () => {
  lanzarCorazones();
});

// ============================================================
// LLUVIA DE CORAZONES (Canvas)
// ============================================================
const canvas = document.getElementById("corazonesCanvas");
const ctx    = canvas.getContext("2d");
let particulas = [];
let animFrameId = null;

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
});

class Corazon {
  constructor() { this.reset(); }
  reset() {
    this.x     = Math.random() * canvas.width;
    this.y     = canvas.height + 20;
    this.size  = 14 + Math.random() * 22;
    this.speed = 2 + Math.random() * 3;
    this.drift = (Math.random() - 0.5) * 1.5;
    this.alpha = 0.7 + Math.random() * 0.3;
    this.color = ['#ff4d8d','#ff7eb3','#c86bff','#e040fb','#f48fb1'][Math.floor(Math.random()*5)];
  }
  update() {
    this.y     -= this.speed;
    this.x     += this.drift;
    this.alpha -= 0.008;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.fillStyle   = this.color;
    ctx.font        = this.size + "px serif";
    ctx.fillText("💖", this.x, this.y);
    ctx.restore();
  }
  isDead() { return this.alpha <= 0 || this.y < -30; }
}

function lanzarCorazones() {
  // Crear 60 corazones
  for (let i = 0; i < 60; i++) {
    const c = new Corazon();
    c.y = canvas.height + Math.random() * 100; // escalonados
    particulas.push(c);
  }

  if (!animFrameId) animarCorazones();
}

function animarCorazones() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particulas = particulas.filter(p => !p.isDead());
  particulas.forEach(p => { p.update(); p.draw(); });

  if (particulas.length > 0) {
    animFrameId = requestAnimationFrame(animarCorazones);
  } else {
    animFrameId = null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

// ============================================================
// SORPRESA FINAL
// ============================================================
function sorpresa() {
  const msg = document.getElementById("sorpresaMensaje");
  msg.style.display = "block";
  msg.style.animation = "none";
  // forzar reflow para reiniciar animación
  void msg.offsetWidth;
  msg.style.animation = "fadeIn 0.6s ease forwards";
  lanzarCorazones();
}
