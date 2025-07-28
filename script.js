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

// Rolagem suave para links de âncora, incluindo redirecionamento para FAQ e Redes Sociais
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
            // Garante que o menu mobile feche ao clicar em links
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
            }
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

// Função para alternar o accordion FAQ
function toggleAccordion(element) {
    const answer = element.nextElementSibling; // Seleciona o <p> da resposta
    const toggleIcon = element.querySelector('.faq-toggle'); // Seleciona o ícone de toggle
    const isOpen = answer.classList.contains('open'); // Verifica se já está aberto

    // Fecha todos os outros accordions
    document.querySelectorAll('.faq-answer').forEach(item => {
        item.classList.remove('open');
        item.style.maxHeight = '0';
        item.parentElement.querySelector('.faq-toggle').textContent = '+';
    });

    // Alterna o accordion clicado
    if (!isOpen) {
        answer.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px'; // Expande para a altura do conteúdo
        toggleIcon.textContent = '-'; // Altera o ícone para indicar aberto
    } else {
        answer.classList.remove('open');
        answer.style.maxHeight = '0';
        toggleIcon.textContent = '+'; // Retorna o ícone para indicar fechado
    }
}