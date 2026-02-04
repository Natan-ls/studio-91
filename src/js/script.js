/**
 * Arquivo principal de scripts - Studio 91
 * Organizado por funcionalidades
 */

document.addEventListener('DOMContentLoaded', function() {
    initHeroSlider();
    initContactForm();
});

function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slider li');

    if (slides.length === 0) return;

    const intervalTime = 5000; // 5 segundos
    let currentSlide = 0;

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        
        currentSlide = (currentSlide + 1) % slides.length;
        
        slides[currentSlide].classList.add('active');
    }

    setInterval(nextSlide, intervalTime);
}

function initContactForm() {
    const contactForm = document.querySelector('form');

    if (!contactForm) return;

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const btnSubmit = contactForm.querySelector('button');
        const originalText = btnSubmit.innerText;
        
        btnSubmit.innerText = "Enviando...";
        btnSubmit.disabled = true; 

        setTimeout(() => {
            alert("Mensagem enviada com sucesso!\n\nObrigado pelo contato. Nossa equipe retornará em até 24 horas úteis.");
            
            contactForm.reset();
            btnSubmit.innerText = originalText;
            btnSubmit.disabled = false;
        }, 1000);
    });
}