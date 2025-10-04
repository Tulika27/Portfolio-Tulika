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
      if (link.getAttribute("href").includes(current)) {
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

  // --- 2. TYPEWRITER ANIMATION ---
  const words = [
    "Web Developer",
    "Freelancer",
    "UI/UX Designer",
    
  ];
  const typewriterElement = document.getElementById("typewriter");
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    if (!typewriterElement) return; // Exit if element is not found (a common cause of errors)

    const currentWord = words[wordIndex];
    let displayText = currentWord.substring(0, charIndex);
    typewriterElement.textContent = displayText;

    let typingSpeed = 100; // Default typing speed

    if (isDeleting) {
      typingSpeed = 50; // Faster deletion
      charIndex--;
    } else {
      charIndex++;
    }

    // Check if the word is fully typed (charIndex is 1 more than length)
    if (!isDeleting && charIndex === currentWord.length + 1) {
      typingSpeed = 2000; // Pause after typing (2 seconds)
      isDeleting = true;
    }
    // Check if the word is fully deleted (charIndex is 0)
    else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length; // Cycle to the next word
      typingSpeed = 500; // Pause before starting the next word
    }

    // Schedule the next iteration
    setTimeout(type, typingSpeed);
  }

  // Initialize AOS after the DOM content is fully loaded
  AOS.init({
    duration: 1000,
    once: true,
  });

  // Start the Typewriter animation
  type();
});
