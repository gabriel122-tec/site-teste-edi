// script.js

// Seleciona elementos do DOM
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const backToTopButton = document.getElementById('backToTop');

// Alterna menu mobile ao clicar no botão
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const isExpanded = !mobileMenu.classList.contains('hidden');
    mobileMenuButton.setAttribute('aria-expanded', isExpanded);
});

// Fecha menu mobile ao clicar em links
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
    });
});

// Fecha menu mobile ao clicar fora dele
document.addEventListener('click', (event) => {
    if (!mobileMenu.contains(event.target) && !mobileMenuButton.contains(event.target)) {
        mobileMenu.classList.add('hidden');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
    }
});

// Configura IntersectionObserver para botão voltar ao topo
const header = document.querySelector('header');
const backToTopObserver = new IntersectionObserver(
    ([entry]) => {
        if (!entry.isIntersecting) {
            backToTopButton.classList.remove('opacity-0', 'invisible');
            backToTopButton.classList.add('opacity-100', 'visible');
        } else {
            backToTopButton.classList.remove('opacity-100', 'visible');
            backToTopButton.classList.add('opacity-0', 'invisible');
        }
    },
    { threshold: 0 }
);
backToTopObserver.observe(header);

// Rola suavemente para o topo ao clicar no botão
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Rolagem suave para links de âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Configura IntersectionObserver para animações de fade-in
const animateElements = document.querySelectorAll('.animate-fadeIn');
const animationObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                animationObserver.unobserve(entry.target); // Anima apenas uma vez
            }
        });
    },
    { rootMargin: '0px 0px -20% 0px' }
);
animateElements.forEach(element => animationObserver.observe(element));