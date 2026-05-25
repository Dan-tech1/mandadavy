// Initialize AOS
const isMobile = window.innerWidth < 768;

// Sur mobile, supprimer les animations de la section contact
if (isMobile) {
  const contactElements = document.querySelectorAll("#contact [data-aos]");
  contactElements.forEach((el) => {
    el.removeAttribute("data-aos");
    el.removeAttribute("data-aos-duration");
  });
}

AOS.init({
  duration: isMobile ? 0 : 800,
  easing: "ease-in-out",
  once: true,
  mirror: false,
  offset: 0,
  disable: isMobile ? "mobile" : false,
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("active");
    mobileMenuBtn.setAttribute("aria-expanded", String(isOpen));
  });
}

function closeMobileMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.remove("active");
  if (mobileMenuBtn) {
    mobileMenuBtn.setAttribute("aria-expanded", "false");
  }
}

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest("nav")) {
    closeMobileMenu();
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Navbar styles + Active nav link on scroll
const nav = document.getElementById("site-nav");
window.addEventListener("scroll", () => {
  if (nav) {
    nav.classList.toggle("scrolled", window.scrollY > 10);
  }

  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("nav-link-active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("nav-link-active");
    }
  });
});

window.dispatchEvent(new Event("scroll"));
