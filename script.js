// Mobile Navigation Toggle
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    navToggle.classList.toggle("active");
  });
}

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    !navMenu.contains(e.target) &&
    !navToggle.contains(e.target) &&
    navMenu.classList.contains("active")
  ) {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#" || href === "") return;

    e.preventDefault();
    const target = document.querySelector(href);

    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Navbar background on scroll
let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.style.boxShadow = "0 4px 20px rgba(59, 47, 47, 0.15)";
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
  } else {
    navbar.style.boxShadow = "0 2px 8px rgba(59, 47, 47, 0.08)";
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
  }

  lastScroll = currentScroll;
});

// Contact Form Handling
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Simple validation
    const requiredFields = this.querySelectorAll("[required]");
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        isValid = false;
        field.style.borderColor = "#d32f2f";
      } else {
        field.style.borderColor = "";
      }
    });

    if (!isValid) {
      alert("Please fill in all required fields.");
      return;
    }

    // Simulate form submission
    const submitButton = this.querySelector(".btn-submit");
    const originalText = submitButton.textContent;
    submitButton.textContent = "Sending...";
    submitButton.disabled = true;

    // Simulate API call
    setTimeout(() => {
      alert(
        "Thank you! Your message has been sent. We'll get back to you within 24 hours."
      );
      this.reset();
      submitButton.textContent = originalText;
      submitButton.disabled = false;

      // Reset border colors
      requiredFields.forEach((field) => {
        field.style.borderColor = "";
      });
    }, 1500);
  });
}

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(
    ".menu-card, .review-card, .faq-item, .gallery-item, .card"
  );

  animateElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
});

// Gallery item click handler (for future lightbox functionality)
const galleryItems = document.querySelectorAll(".gallery-item");

galleryItems.forEach((item) => {
  item.addEventListener("click", function () {
    // Future: Add lightbox functionality here
    console.log("Gallery item clicked");
  });
});

// Add active state to navigation links on scroll
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
});
