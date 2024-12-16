document.addEventListener("DOMContentLoaded", () => {
  // Scroll-to-Top kopce
  const scrollBtn = document.createElement("button");
  scrollBtn.id = "scrollTopBtn";
  scrollBtn.innerHTML = "&#11014;"; // strelka za nagore
  document.body.appendChild(scrollBtn);

  scrollBtn.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      display: none;
      background-color: #ff7043; 
      color: white;
      border: none;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      font-size: 24px;
      cursor: pointer;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
      z-index: 1000;
      transition: transform 0.3s ease, background-color 0.3s ease;
  `;

  scrollBtn.onmouseover = () => (scrollBtn.style.backgroundColor = "#f4511e");
  scrollBtn.onmouseout = () => (scrollBtn.style.backgroundColor = "#ff7043");

  window.onscroll = () => {
    if (window.scrollY > 200) {
      scrollBtn.style.display = "block";
    } else {
      scrollBtn.style.display = "none";
    }
  };

  scrollBtn.onclick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
});
