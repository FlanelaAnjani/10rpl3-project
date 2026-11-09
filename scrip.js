/* ============ 1. Bintang bergerak di background ============ */
(function starfield() {
  const canvas = document.getElementById("stars");
  const ctx = canvas.getContext("2d");
  let w, h, stars;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    const count = Math.floor((w * h) / 9000);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.4 + 0.3,
      s: Math.random() * 0.25 + 0.05,
      a: Math.random(),
      d: (Math.random() * 0.02 + 0.005) * (Math.random() < 0.5 ? -1 : 1),
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (const st of stars) {
      st.y -= st.s;
      st.a += st.d;
      if (st.a <= 0.15 || st.a >= 1) st.d *= -1;
      if (st.y < -2) { st.y = h + 2; st.x = Math.random() * w; }
      ctx.beginPath();
      ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(160, 200, 255, ${st.a})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  draw();
})();

/* ============ 2. Teks mengetik ============ */
(function typing() {
  const el = document.getElementById("typing");
  // Ubah kalimat di bawah sesuai keinginanmu
  const words = [
    "Selamat datang di halamanku 👋",
    "Mahasiswa yang suka ngoding 💻",
    "Yuk kenalan lewat sosial media 💙",
  ];
  let w = 0, c = 0, deleting = false;

  function tick() {
    const word = words[w];
    el.textContent = word.slice(0, c);

    if (!deleting && c < word.length) { c++; return setTimeout(tick, 70); }
    if (!deleting && c === word.length) { deleting = true; return setTimeout(tick, 1600); }
    if (deleting && c > 0) { c--; return setTimeout(tick, 35); }

    deleting = false;
    w = (w + 1) % words.length;
    setTimeout(tick, 400);
  }
  tick();
})();

/* ============ 4. Efek ripple saat tombol diklik ============ */
document.querySelectorAll(".menu-card, .social").forEach((btn) => {
  btn.style.position = "relative";
  btn.style.overflow = "hidden";

  btn.addEventListener("click", (e) => {
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const span = document.createElement("span");
    span.className = "ripple";
    span.style.width = span.style.height = `${size}px`;
    span.style.left = `${e.clientX - rect.left - size / 2}px`;
    span.style.top = `${e.clientY - rect.top - size / 2}px`;
    btn.appendChild(span);
    setTimeout(() => span.remove(), 600);
  });
});

/* ============ 5. Efek miring (tilt) pada foto profil ============ */
(function tilt() {
  const avatar = document.querySelector(".avatar");
  if (!avatar || window.matchMedia("(pointer: coarse)").matches) return;

  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 14;
    const y = (e.clientY / window.innerHeight - 0.5) * -14;
    avatar.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${y}deg)`;
  });
})();

/* ============ 6. Tahun otomatis di footer ============ */
document.getElementById("year").textContent = new Date().getFullYear();