// Back-to-Top kopce
const backToTopBtn = document.getElementById("back-to-top-btn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
});

backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});

// Smooth dvizenje vrz sodrzinata
document.querySelectorAll('.nav-list a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Feedback za subskripcijata 
document.getElementById("newsletter-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Da ne vnesuva formata sama podatoci

    const emailInput = document.querySelector(".newsletter-form input[type='email']");
    const emailValue = emailInput.value.trim();
    const messageDiv = document.createElement("div"); // feedback poraka
    
    // Otstranuvanje na minati poraki
    const existingMessage = document.querySelector(".newsletter-form .message");
    if (existingMessage) existingMessage.remove();

    // Email forma za validacija
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(emailValue)) {
        messageDiv.textContent = "Thank you for subscribing!";
        messageDiv.style.color = "#4CAF50"; // Zelena boja za uspeshno
        emailInput.value = ""; // Otstranuvanje na inputot
    } else {
        messageDiv.textContent = "Please enter a valid email address.";
        messageDiv.style.color = "#FF5722"; // Crvena boja za neuspeshno
    }

    // Dodavanje na poraka vo formata
    messageDiv.classList.add("message"); // For future styling or removal
    document.querySelector(".newsletter-form").appendChild(messageDiv);
});
