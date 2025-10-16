// Dynamisk årstal
document.getElementById("year").textContent = new Date().getFullYear();

// Mobilmenu toggle
const navToggle = document.getElementById("nav-toggle");
const nav = document.getElementById("main-nav");
navToggle.addEventListener("click", () => nav.classList.toggle("show"));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 60, behavior: "smooth" });
      nav.classList.remove("show");
    }
  });
});

// Fade-in animation med Intersection Observer
const faders = document.querySelectorAll(".fade-in, .fade-in-delay");
const appearOptions = { threshold: 0.2 };
const appearOnScroll = new IntersectionObserver(function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fadeEl => {
  appearOnScroll.observe(fadeEl);
});


// ====== FORM HANDLING ======
const forms = document.querySelectorAll("form");

forms.forEach(form => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const submitButton = form.querySelector("button[type='submit']");

    // Lav statusbesked
    let status = form.querySelector(".form-status");
    if (!status) {
      status = document.createElement("p");
      status.className = "form-status";
      form.appendChild(status);
    }

    // Skift tekst mens der sendes
    submitButton.disabled = true;
    submitButton.textContent = "Sender...";

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        status.textContent = "✅ Din besked er nu sendt. Tak for din henvendelse!";
        status.style.color = "green";
        form.reset();
      } else {
        status.textContent = "❌ Noget gik galt. Prøv igen.";
        status.style.color = "red";
      }
    } catch (error) {
      status.textContent = "⚠️ Der opstod en fejl. Tjek din internetforbindelse.";
      status.style.color = "red";
    }

    // Gendan knappen efter 2 sekunder
    setTimeout(() => {
      submitButton.disabled = false;
      submitButton.textContent = "Send besked";
    }, 2000);
  });
});
