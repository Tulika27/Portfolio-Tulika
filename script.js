document.addEventListener("DOMContentLoaded", () => {
  // --- 1. SMOOTH SCROLLING AND ACTIVE LINK HIGHLIGHTING ---
  const sections = document.querySelectorAll(".content-section, .hero-section");
  const navLinks = document.querySelectorAll(".nav-links a");

  // Function to update the 'active' class on the navigation links
  const updateActiveLink = () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100; // Offset for better detection
      const sectionHeight = section.clientHeight;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  };

  // Attach smooth scrolling event to navigation links
  document.querySelectorAll('.nav-links a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Attach scroll event listener
  window.addEventListener("scroll", updateActiveLink);
  updateActiveLink();

});
