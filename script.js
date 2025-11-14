// === Hintergrund-Partikel ===
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
for (let i = 0; i < 60; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 3,
    speed: 0.3 + Math.random() * 0.5,
  });
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.x += Math.sin(Date.now() * 0.001 + p.y) * 0.2;
    p.y += p.speed;
    if (p.y > canvas.height) {
      p.y = 0;
      p.x = Math.random() * canvas.width;
    }
    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
    gradient.addColorStop(0, "rgba(155,76,255,0.8)");
    gradient.addColorStop(1, "rgba(155,76,255,0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// === Maus-Trail / "Sensei Energie" ===
document.addEventListener("mousemove", (e) => {
  const trail = document.createElement("div");
  trail.className = "trail";
  trail.style.left = e.pageX + "px";
  trail.style.top = e.pageY + "px";
  document.body.appendChild(trail);
  setTimeout(() => trail.remove(), 400);
});

// === Live-Daten (Preis, Market Cap) ===
async function updateData() {
  const token = "PLACEHOLDER"; // Später: Token-Adresse hier einfügen

  try {
    const res = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${token}`);
    const data = await res.json();
    const pair = data.pairs?.[0];

    if (pair) {
      document.getElementById("price").innerText =
        "Preis: $" + Number(pair.priceUsd).toFixed(8);
      document.getElementById("marketcap").innerText =
        "Market Cap: $" + pair.fdv.toLocaleString();
    } else {
      document.getElementById("price").innerText = "Preis: (Token noch nicht aktiv)";
      document.getElementById("marketcap").innerText = "";
    }
  } catch (e) {
    document.getElementById("price").innerText = "Preis: Fehler beim Laden";
    document.getElementById("marketcap").innerText = "";
  }
}

updateData();
setInterval(updateData, 15000); // alle 15 Sekunden aktualisieren


