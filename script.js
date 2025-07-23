// script.js

// Seleciona o botão do menu mobile
const mobileMenuButton = document.getElementById('mobile-menu-button');
// Seleciona o container do menu mobile
const mobileMenu = document.getElementById('mobile-menu');

// Adiciona um evento de clique ao botão do menu mobile
mobileMenuButton.addEventListener('click', () => {
    // Alterna a classe 'open' para exibir ou ocultar o menu
    mobileMenu.classList.toggle('open');
    // Alterna a classe 'hidden' do Tailwind para compatibilidade
    mobileMenu.classList.toggle('hidden');
});

// Fecha o menu mobile ao clicar em um link
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Remove a classe 'open' para fechar o menu
        mobileMenu.classList.remove('open');
        // Adiciona a classe 'hidden' para ocultar o menu
        mobileMenu.classList.add('hidden');
    });
});

// Seleciona o botão de voltar ao topo
const backToTopButton = document.getElementById('backToTop');

// Adiciona um evento de scroll à janela
window.addEventListener('scroll', () => {
    // Verifica se a página foi rolada mais de 300px
    if (window.pageYOffset > 300) {
        // Torna o botão visível
        backToTopButton.classList.remove('opacity-0', 'invisible');
        backToTopButton.classList.add('opacity-100', 'visible');
    } else {
        // Oculta o botão
        backToTopButton.classList.remove('opacity-100', 'visible');
        backToTopButton.classList.add('opacity-0', 'invisible');
    }
});

// Adiciona um evento de clique ao botão de voltar ao topo
backToTopButton.addEventListener('click', () => {
    // Rola suavemente para o topo da página
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Adiciona rolagem suave para links de âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        // Impede o comportamento padrão do link
        e.preventDefault();
        
        // Obtém o ID do elemento alvo
        const targetId = this.getAttribute('href');
        // Seleciona o elemento alvo
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Rola suavemente para o elemento com ajuste para o header fixo
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Função para animar elementos ao entrar na visão
const animateOnScroll = () => {
    // Seleciona todos os elementos com a classe 'animate-fadeIn'
    const elements = document.querySelectorAll('.animate-fadeIn');
    
    elements.forEach(element => {
        // Obtém a posição do elemento em relação ao topo da janela
        const elementPosition = element.getBoundingClientRect().top;
        // Define a posição da tela para disparar a animação (80% da altura da janela)
        const screenPosition = window.innerHeight / 1.2;
        
        // Verifica se o elemento está visível na tela
        if (elementPosition < screenPosition) {
            // Adiciona a classe 'visible' para ativar a animação
            element.classList.add('visible');
        }
    });
};

// Adiciona eventos de scroll e load para disparar as animações
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);