// ====== EDIT THIS: your WhatsApp number, country code first, no + or spaces ======
const WHATSAPP = "2347042127327";

const $ = (s) => document.querySelector(s);

// 3D tilt and glow on product panels
document.querySelectorAll(".pcard").forEach((el) => {
  el.addEventListener("mousemove", (e) => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-6px)`;
    el.style.setProperty("--mx", (x + 0.5) * 100 + "%");
  });
  el.addEventListener("mouseleave", () => (el.style.transform = ""));
});

// Typing effect
const WORDS = ["Coca-Cola products.", "cold beer.", "Fanta and Sprite.", "Coca-Cola products and beer."];
let w = 0, ch = 0, del = false;
(function type() {
  const word = WORDS[w];
  $("#typed").textContent = word.slice(0, ch);
  if (!del && ch === word.length) { del = true; return setTimeout(type, 1500); }
  if (del && ch === 0) { del = false; w = (w + 1) % WORDS.length; }
  ch += del ? -1 : 1;
  setTimeout(type, del ? 35 : 75);
})();

// Floating bubbles in hero
const cv = $("#bubbles"), ctx = cv.getContext("2d");
let bubbles = [];
function size() { cv.width = cv.offsetWidth; cv.height = cv.offsetHeight; }
size(); addEventListener("resize", size);
for (let i = 0; i < 45; i++) bubbles.push({ x: Math.random(), y: Math.random(), r: 2 + Math.random() * 9, s: 0.0006 + Math.random() * 0.0017, d: Math.random() * 6 });
(function loop(t) {
  ctx.clearRect(0, 0, cv.width, cv.height);
  bubbles.forEach((b) => {
    b.y -= b.s; if (b.y < -0.05) { b.y = 1.05; b.x = Math.random(); }
    const x = b.x * cv.width + Math.sin(t / 900 + b.d) * 14, y = b.y * cv.height;
    ctx.beginPath(); ctx.arc(x, y, b.r, 0, 7);
    ctx.strokeStyle = "rgba(255,246,220,.45)"; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = "rgba(240,168,26,.12)"; ctx.fill();
  });
  requestAnimationFrame(loop);
})(0);

// Scroll reveal
const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.15 });
document.querySelectorAll(".rv").forEach((el) => io.observe(el));

// Nav, progress bar, back-to-top
addEventListener("scroll", () => {
  const h = document.documentElement, y = h.scrollTop;
  $("#progress").style.width = (y / (h.scrollHeight - h.clientHeight)) * 100 + "%";
  $("#nav").classList.toggle("solid", y > 60);
  $("#top").classList.toggle("show", y > 500);
});
$("#top").onclick = () => scrollTo({ top: 0, behavior: "smooth" });
$("#burger").onclick = () => {
  const open = $("#menu").classList.toggle("open");
  $("#burger").setAttribute("aria-expanded", open);
};
$("#menu").addEventListener("click", (e) => { if (e.target.tagName === "A") $("#menu").classList.remove("open"); });

// Dark mode (remembered)
function theme(t) { document.documentElement.dataset.theme = t; $("#theme").textContent = t === "dark" ? "☀️" : "🌙"; try { localStorage.setItem("theme", t); } catch (e) {} }
let saved; try { saved = localStorage.getItem("theme"); } catch (e) {}
theme(saved || (matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light"));
$("#theme").onclick = () => theme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");

// Lightbox
document.querySelectorAll(".photo").forEach((p) => (p.onclick = () => { $("#lb img").src = p.dataset.src; $("#lb").classList.add("open"); }));
$("#lb").onclick = () => $("#lb").classList.remove("open");
addEventListener("keydown", (e) => { if (e.key === "Escape") $("#lb").classList.remove("open"); });

// Order form -> WhatsApp
$("#form").addEventListener("submit", (e) => {
  e.preventDefault();
  if (WHATSAPP.includes("X")) { $("#note").textContent = "Owner: add your WhatsApp number in script.js first."; return; }
  const msg = `Hello Bright and Co., I am ${$("#fname").value}. I need: ${$("#fmsg").value}`;
  open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
  $("#note").textContent = "Opening WhatsApp...";
});

$("#yr").textContent = new Date().getFullYear();
