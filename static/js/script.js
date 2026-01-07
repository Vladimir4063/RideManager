/**
 * RemisApp - Landing Page JavaScript
 * Bootstrap 5 + Vanilla JS
 */

document.addEventListener("DOMContentLoaded", function () {
  // ===================================
  // Navbar scroll effect
  // ===================================
  const navbar = document.querySelector(".navbar");

  function updateNavbarOnScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add("shadow");
    } else {
      navbar.classList.remove("shadow");
    }
  }

  window.addEventListener("scroll", updateNavbarOnScroll);
  updateNavbarOnScroll(); // Check on load

  // ===================================
  // Smooth scroll for anchor links
  // ===================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();

        const navbarHeight = navbar.offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.scrollY -
          navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Close mobile menu if open
        const navbarCollapse = document.querySelector(".navbar-collapse");
        if (navbarCollapse.classList.contains("show")) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) {
            bsCollapse.hide();
          }
        }
      }
    });
  });

  // ===================================
  // Intersection Observer for animations
  // ===================================
  const animateOnScrollElements = document.querySelectorAll("[data-aos]");

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fade-up");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animateOnScrollElements.forEach((el) => {
    el.style.opacity = "0";
    observer.observe(el);
  });

  // ===================================
  // Active nav link on scroll
  // ===================================
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + navbar.offsetHeight + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveNavLink);

  // ===================================
  // Animate elements on scroll
  // ===================================
  const benefitCards = document.querySelectorAll(".benefit-card");
  const stepItems = document.querySelectorAll(".step-item");
  const appFeatureCards = document.querySelectorAll(".app-feature-card");

  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, index * 100);
          cardObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  [...benefitCards, ...stepItems, ...appFeatureCards].forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "all 0.5s ease-out";
    cardObserver.observe(card);
  });

  // ===================================
  // Phone mockups parallax effect
  // ===================================
  const phoneMockups = document.querySelectorAll(".phone-mockup");

  if (phoneMockups.length > 0) {
    window.addEventListener("scroll", () => {
      const scrolled = window.scrollY;
      const appSection = document.getElementById("app-pasajero");

      if (appSection) {
        const sectionTop = appSection.offsetTop;
        const sectionHeight = appSection.offsetHeight;

        if (
          scrolled > sectionTop - window.innerHeight &&
          scrolled < sectionTop + sectionHeight
        ) {
          const progress =
            (scrolled - (sectionTop - window.innerHeight)) /
            (window.innerHeight + sectionHeight);

          phoneMockups.forEach((mockup, index) => {
            const direction = index % 2 === 0 ? 1 : -1;
            const movement = Math.sin(progress * Math.PI) * 10 * direction;
            mockup.style.transform = `translateY(${movement}px)`;
          });
        }
      }
    });
  }

  // ===================================
  // WhatsApp button tracking (optional)
  // ===================================
  const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');

  whatsappLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // You can add analytics tracking here
      console.log("WhatsApp contact clicked");

      // If you have Google Analytics:
      // gtag('event', 'click', {
      //     'event_category': 'Contact',
      //     'event_label': 'WhatsApp'
      // });
    });
  });

  // ===================================
  // Form validation (if you add a form later)
  // ===================================
  const forms = document.querySelectorAll(".needs-validation");

  forms.forEach((form) => {
    form.addEventListener("submit", function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }

      form.classList.add("was-validated");
    });
  });

  // ===================================
  // Console welcome message
  // ===================================
});

// ===================================
// Utility functions
// ===================================

/**
 * Debounce function for performance optimization
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for scroll events
 */
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
