document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const button = document.getElementById("submitBtn");
    const successMessage = document.getElementById("successMessage");
    const errorMessage = document.getElementById("errorMessage");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      // Nulstil beskeder
      successMessage.classList.remove("show");
      errorMessage.classList.remove("show");
  
      // Skift knapstatus
      button.textContent = "Sender...";
      button.classList.add("sending");
  
      const formData = new FormData(form);
  
      try {
        const response = await fetch("https://formspree.io/f/xyznonba", {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" },
        });
  
        if (response.ok) {
          // Skift til succes
          button.textContent = "Sendt!";
          button.classList.remove("sending");
          button.classList.add("sent");
  
          successMessage.classList.add("show");
          form.reset();
  
          setTimeout(() => {
            button.textContent = "Send besked";
            button.classList.remove("sent");
            successMessage.classList.remove("show");
          }, 4000);
        } else {
          // Fejl fra server
          throw new Error("Formspree returnerede fejl");
        }
      } catch (error) {
        console.error("Fejl ved afsendelse:", error);
        button.textContent = "Fejl – prøv igen";
        button.classList.remove("sending");
        errorMessage.classList.add("show");
  
        setTimeout(() => {
          button.textContent = "Send besked";
          errorMessage.classList.remove("show");
        }, 4000);
      }
    });
  });
  