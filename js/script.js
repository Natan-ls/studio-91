document.addEventListener('DOMContentLoaded', function() {
    
    // Seleciona todos os slides (as <li> dentro de .hero-slider)
    const slides = document.querySelectorAll('.hero-slider li');
    
    // Define o tempo de troca (5000ms = 5 segundos)
    const intervalTime = 5000;
    
    let currentSlide = 0;

    function nextSlide() {
        // Remove a classe 'active' do slide atual (ele desaparece suavemente pelo CSS)
        slides[currentSlide].classList.remove('active');

        // Calcula qual é o próximo (se for o último, volta para o 0 com o operador %)
        currentSlide = (currentSlide + 1) % slides.length;

        // Adiciona a classe 'active' no novo slide (ele aparece)
        slides[currentSlide].classList.add('active');
    }

    // Inicia o loop automático
    setInterval(nextSlide, intervalTime);
});