// Od dolu nagore kopce
document.addEventListener("DOMContentLoaded", () => {
    const scrollBtn = document.createElement("button");
    scrollBtn.id = "scrollTopBtn";
    scrollBtn.innerHTML = "&#8679;"; // strelka za nagore
    document.body.appendChild(scrollBtn);

    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        display: none;
        background-color: #fcb045;
        color: #1c1e26;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        transition: background-color 0.3s ease;
    `;
    scrollBtn.onmouseover = () => scrollBtn.style.backgroundColor = "#ff6b6b";
    scrollBtn.onmouseout = () => scrollBtn.style.backgroundColor = "#fcb045";

    window.onscroll = () => {
        if (window.scrollY > 300) {
            scrollBtn.style.display = "block";
        } else {
            scrollBtn.style.display = "none";
        }
    };

    scrollBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
});

// funkcija za da se pojavi porakata dali e true ili false (true = success, false = error)
function showPopup(message, isSuccess) {
  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popup-message");
  
  // Reset na klasi za otstranuvanje na prethodna sodrzina
  const popupContent = document.querySelector(".popup-content");
  popupContent.classList.remove("success", "error");

  // da se ispishe success ili error vo zavisnost od odgovorot
  if (isSuccess) {
      popupContent.classList.add("success");
  } else {
      popupContent.classList.add("error");
  }

  // Popup na porakata
  popupMessage.textContent = message;
  popup.style.display = "flex";

  // Isklucuvanje na porakata koga ke se pritisne potrebnoto kopce
  document.querySelector(".close-btn").onclick = () => popup.style.display = "none";
  popup.onclick = (e) => {
      if (e.target === popup) popup.style.display = "none";
  };
}

// Poraka za validacija
document.querySelector(".contact-form").addEventListener("submit", function(event) {
  event.preventDefault();
  const name = document.querySelector("input[name='name']").value.trim();
  const email = document.querySelector("input[name='email']").value.trim();
  const message = document.querySelector("textarea[name='message']").value.trim();

  if (!name || !email || !message) {
      showPopup("Please fill out all fields.", false);
      return;
  }

  // Email validacija
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
      showPopup("Please enter a valid email address.", false);
      return;
  }

  // Uspeshno
  showPopup(`Thank you, ${name}! We'll get back to you soon.`, true);
  this.reset(); // Clear form
});
