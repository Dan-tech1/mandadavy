// Initialize AOS
const isMobile = window.innerWidth < 768;

// Sur mobile, supprimer les animations de la section contact
if (isMobile) {
    const contactElements = document.querySelectorAll('#contact [data-aos]');
    contactElements.forEach(el => {
        el.removeAttribute('data-aos');
        el.removeAttribute('data-aos-duration');
    });
}

AOS.init({
    duration: isMobile ? 0 : 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false,
    offset: 0,
    disable: isMobile ? 'mobile' : false
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav')) {
        closeMobileMenu();
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Merci pour votre message! Je vous répondrai bientôt.');
    this.reset();
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-cyan-400');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-cyan-400');
        }
    });
});
