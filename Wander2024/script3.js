document.addEventListener("DOMContentLoaded", () => {
  // Scroll-to-Top kopce
  const scrollBtn = document.createElement("button");
  scrollBtn.id = "scrollTopBtn";
  scrollBtn.innerHTML = "&#11014;"; // strelka za nagore
  document.body.appendChild(scrollBtn);

  scrollBtn.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      display: none;
      background-color: #ad694c; /* Marrakech theme color */
      color: white;
      border: none;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      font-size: 28px;
      cursor: pointer;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      z-index: 1000;
      transition: transform 0.3s ease, background-color 0.3s ease;
  `;
  scrollBtn.onmouseover = () => scrollBtn.style.backgroundColor = "#6e3921";
  scrollBtn.onmouseout = () => scrollBtn.style.backgroundColor = "#ad694c";

  window.onscroll = () => {
      if (window.scrollY > 300) {
          scrollBtn.style.display = "block";
      } else {
          scrollBtn.style.display = "none";
      }
  };

  scrollBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Splat efekt
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);

  const context = canvas.getContext("2d");
  const splatColors = ["#ad694c", "#d75a39", "#ffe2ba", "#6e3921", "#f5e0b4"]; // Marrakech color palette
  canvas.style.position = "absolute";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = `${document.body.scrollHeight}px`;
  canvas.width = window.innerWidth;
  canvas.height = document.body.scrollHeight;
  canvas.style.pointerEvents = "none";

  window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = document.body.scrollHeight;
  });

  const splats = []; // Array to hold splats

  document.addEventListener("click", (e) => {
      const x = e.pageX;
      const y = e.pageY;
      const color = splatColors[Math.floor(Math.random() * splatColors.length)];
      const fadeDuration = 2000; 
      const splat = { x, y, color, opacity: 1, timeCreated: Date.now(), fadeDuration };
      splats.push(splat);
  });

  function drawSplat(splat) {
      const { x, y, color, opacity } = splat;
      const splatRadius = 15 + Math.random() * 10;

      context.globalAlpha = opacity;

      // Glavno topcinja vo splat
      context.beginPath();
      context.arc(x, y, splatRadius, 0, Math.PI * 2, false);
      context.fillStyle = color;
      context.fill();

      // Pomali topcinja vo splat
      for (let i = 0; i < 6; i++) {
          const angle = Math.random() * Math.PI * 2;
          const distance = 10 + Math.random() * 30;
          const offsetX = Math.cos(angle) * distance;
          const offsetY = Math.sin(angle) * distance;

          context.beginPath();
          context.arc(x + offsetX, y + offsetY, splatRadius / 2.5, 0, Math.PI * 2, false);
          context.fillStyle = color;
          context.fill();
      }
  }

  function updateSplats() {
      const now = Date.now();
      context.clearRect(0, 0, canvas.width, canvas.height);

      splats.forEach((splat, index) => {
          const timeElapsed = now - splat.timeCreated;
          if (timeElapsed > splat.fadeDuration) {
              splats.splice(index, 1); // Otstranuvanje na splat
          } else {
              splat.opacity = 1 - timeElapsed / splat.fadeDuration;
              drawSplat(splat);
          }
      });

      context.globalAlpha = 1; 
      requestAnimationFrame(updateSplats);
  }

  updateSplats(); // Animation loop
});
