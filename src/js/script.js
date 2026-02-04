/**
 * Arquivo principal de scripts - Studio 91
 * Organizado por funcionalidades
 */

document.addEventListener('DOMContentLoaded', function() {
    initHeroSlider();
    initContactForm();
});

// --- Função 1: Gerencia o Carrossel da Hero Section ---
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slider li');

    // Guard clause: se não tiver slider na página, para a execução aqui
    if (slides.length === 0) return;

    const intervalTime = 5000; // 5 segundos
    let currentSlide = 0;

    function nextSlide() {
        // Remove a classe do slide atual
        slides[currentSlide].classList.remove('active');
        
        // Calcula o próximo (loop circular)
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Ativa o próximo slide
        slides[currentSlide].classList.add('active');
    }

    // Inicia o loop
    setInterval(nextSlide, intervalTime);
}

// --- Função 2: Gerencia o Formulário de Contato ---
function initContactForm() {
    const contactForm = document.querySelector('form');

    // Guard clause: se não tiver formulário, para a execução aqui
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede recarregamento

        // Feedback Visual
        const btnSubmit = contactForm.querySelector('button');
        const originalText = btnSubmit.innerText;
        
        btnSubmit.innerText = "Enviando...";
        btnSubmit.disabled = true; // Evita cliques múltiplos

        // Simulação de envio
        setTimeout(() => {
            alert("Mensagem enviada com sucesso!\n\nObrigado pelo contato. Nossa equipe retornará em até 24 horas úteis.");
            
            contactForm.reset(); // Limpa o formulário
            btnSubmit.innerText = originalText; // Restaura o botão
            btnSubmit.disabled = false;
        }, 1000);
    });
}