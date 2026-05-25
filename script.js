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

// Hero matrix effect
const matrixCanvas = document.getElementById("heroMatrix");

if (matrixCanvas) {
  const matrixContext = matrixCanvas.getContext("2d");
  const matrixSymbols = ["0","1","2","3","4","5","6","7","8","9","{","}","<",">","/","\\","☣","☠","⚠","#","@","%","$","&"];
  let matrixColumns = [];
  let matrixFontSize = 14; // plus discret
  let matrixStarted = false;
  let matrixIntervalId = null;

  const resizeMatrix = () => {
    const { width, height } = matrixCanvas.getBoundingClientRect();
    matrixCanvas.width = Math.floor(width * window.devicePixelRatio);
    matrixCanvas.height = Math.floor(height * window.devicePixelRatio);
    matrixContext.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    matrixContext.font = `${matrixFontSize}px monospace`;
    matrixContext.textBaseline = "top";
    matrixColumns = Array.from({ length: Math.ceil(width / matrixFontSize) }, () => Math.random() * height);
  };

  const drawMatrix = () => {
    const { width, height } = matrixCanvas.getBoundingClientRect();

    // semi-transparent black background to create trailing effect
    matrixContext.fillStyle = "rgba(4,6,8,0.12)";
    matrixContext.fillRect(0, 0, width, height);

    matrixContext.font = `${matrixFontSize}px monospace`;

    matrixColumns.forEach((dropY, index) => {
      const char = matrixSymbols[Math.floor(Math.random() * matrixSymbols.length)];
      const x = index * matrixFontSize;
      const y = dropY;
      // style virus rouge, mais plus subtil
      matrixContext.fillStyle = Math.random() > 0.88 ? "rgba(255,210,210,0.95)" : "rgba(255,60,60,0.9)";
      matrixContext.shadowBlur = 6;
      matrixContext.shadowColor = "rgba(255,60,60,0.6)";
      matrixContext.fillText(char, x, y);

      // velocity varies slightly for natural, moins agressif
      const velocity = 8 + Math.floor(Math.random() * 5); // 8..12
      matrixColumns[index] = y > height + Math.random() * 200 ? -Math.random() * 120 : y + velocity;
    });

    matrixContext.shadowBlur = 0;
  };

  const startMatrix = () => {
    if (matrixStarted) return;
    matrixStarted = true;
    resizeMatrix();
    if (!matrixIntervalId) {
      matrixIntervalId = setInterval(drawMatrix, 5);
    }
  };

  window.addEventListener("resize", resizeMatrix);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startMatrix, { once: true });
  } else {
    startMatrix();
  }
}

// Skills hacker background effect
const skillsCanvas = document.getElementById("skillsHackerBg");

if (skillsCanvas) {
  const skillsContext = skillsCanvas.getContext("2d");
  const skillsSymbols = ["☠", "☣", "⚠", "⌘", "0", "1", "{", "}", "<", ">", "/", "\\", "#", "@", "%"];
  let skillsColumns = [];
  let skillsStarted = false;
  let skillsFontSize = 18;

  const resizeSkillsBackground = () => {
    const { width, height } = skillsCanvas.getBoundingClientRect();
    skillsCanvas.width = Math.floor(width * window.devicePixelRatio);
    skillsCanvas.height = Math.floor(height * window.devicePixelRatio);
    skillsContext.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    skillsContext.font = `${skillsFontSize}px monospace`;
    skillsContext.textBaseline = "top";
    skillsColumns = Array.from({ length: Math.ceil(width / skillsFontSize) }, () => Math.random() * height);
  };

  const drawSkillsBackground = () => {
    const { width, height } = skillsCanvas.getBoundingClientRect();

    skillsContext.fillStyle = "rgba(4, 8, 12, 0.11)";
    skillsContext.fillRect(0, 0, width, height);

    skillsContext.font = `${skillsFontSize}px monospace`;

    skillsColumns.forEach((dropY, index) => {
      const symbol = skillsSymbols[Math.floor(Math.random() * skillsSymbols.length)];
      const x = index * skillsFontSize;
      const isRed = Math.random() > 0.6;
      const velocity = isRed ? 13 : 9;

      skillsContext.fillStyle = isRed ? "rgba(255, 48, 48, 0.95)" : "rgba(0, 255, 128, 0.9)";
      skillsContext.shadowBlur = isRed ? 14 : 10;
      skillsContext.shadowColor = isRed ? "rgba(255, 48, 48, 0.8)" : "rgba(0, 255, 128, 0.75)";
      skillsContext.fillText(symbol, x, dropY);

      skillsColumns[index] = dropY > height + Math.random() * 160 ? -Math.random() * 120 : dropY + velocity;
    });

    skillsContext.shadowBlur = 0;
  };

  const startSkillsBackground = () => {
    if (skillsStarted) return;
    skillsStarted = true;
    resizeSkillsBackground();
    setInterval(drawSkillsBackground, 5);
  };

  window.addEventListener("resize", resizeSkillsBackground);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startSkillsBackground, { once: true });
  } else {
    startSkillsBackground();
  }
}

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
