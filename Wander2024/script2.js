document.addEventListener("DOMContentLoaded", () => {
  // Scroll-to-Top kopce
  const scrollBtn = document.createElement("button");
  scrollBtn.id = "scrollTopBtn";
  scrollBtn.innerHTML = "&#11014;";
  document.body.appendChild(scrollBtn);

  scrollBtn.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      display: none;
      background-color: #8ecae6;
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
  scrollBtn.onmouseover = () => scrollBtn.style.backgroundColor = "#219ebc";
  scrollBtn.onmouseout = () => scrollBtn.style.backgroundColor = "#8ecae6";

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
  const splatColors = ["#ff7f50", "#ff6b6b", "#fcb045", "#ffdd59", "#219ebc"];
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

  const splats = []; // Cuvanje aktivni splats

  document.addEventListener("click", (e) => {
      const x = e.pageX;
      const y = e.pageY;
      const color = splatColors[Math.floor(Math.random() * splatColors.length)];
      const fadeDuration = 2000; // Fade traenje vo milisekundi
      const splat = { x, y, color, opacity: 1, timeCreated: Date.now(), fadeDuration };
      splats.push(splat);
  });

  function drawSplat(splat) {
      const { x, y, color, opacity } = splat;
      const splatRadius = 15;

      context.globalAlpha = opacity;

      // Splat centarno topce
      context.beginPath();
      context.arc(x, y, splatRadius, 0, Math.PI * 2, false);
      context.fillStyle = color;
      context.fill();

      // Pomali topcinja od splat
      for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * Math.PI * 2; // ednakvo rasprostranetost na topcinjata
          const distance = 10 + Math.random() * 20; // Random oddalecenost
          const offsetX = Math.cos(angle) * distance;
          const offsetY = Math.sin(angle) * distance;

          context.beginPath();
          context.arc(x + offsetX, y + offsetY, splatRadius / 3, 0, Math.PI * 2, false);
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
              splats.splice(index, 1); // Otstranuvanje na splat po odredenoto vreme
          } else {
              splat.opacity = 1 - timeElapsed / splat.fadeDuration;
              drawSplat(splat);
          }
      });

      context.globalAlpha = 1; // Reset 
      requestAnimationFrame(updateSplats);
  }

  updateSplats(); // Animation loop
});
