// ================================================
// script.js — Havenly Landing Page JavaScript
// ================================================

// ========== NAVBAR HAMBURGER MENU ==========
const hamburgerBtn = document.getElementById('hamburger-btn');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('#navbar nav a');

// Toggle menu on hamburger click
hamburgerBtn.addEventListener('click', function() {
    navbar.classList.toggle('nav-open');
});

// Close menu when a nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navbar.classList.remove('nav-open');
    });
});

// ========== WHAT'S NEW CAROUSEL FUNCTIONALITY ==========
const carouselGrid = document.getElementById('whats-new-grid');
const carouselWrapper = document.getElementById('carousel-wrapper');
const prevBtn = document.getElementById('carousel-prev');
const nextBtn = document.getElementById('carousel-next');
const counterDisplay = document.getElementById('carousel-counter');

let currentSlide = 0;
let displaySlide = 0;
const totalCards = 6;
let cardsPerView = 3;
let maxIndex = 3;
let autoPlayInterval;
let isAutoPlaying = true;
let isWrapping = false;

// Clone and setup carousel for infinite loop
function setupClonedCarousel() {
    const allCards = Array.from(carouselGrid.querySelectorAll('.whats-new-card'));
    
    // Clone first 3 cards and append for infinite forward loop
    allCards.slice(0, 3).forEach(card => {
        carouselGrid.appendChild(card.cloneNode(true));
    });
    
    // Clone last 3 cards and prepend for infinite backward loop
    allCards.slice(-3).forEach(card => {
        carouselGrid.insertBefore(card.cloneNode(true), carouselGrid.firstChild);
    });
    
    // Start from position where first real card is visible
    currentSlide = 3;
    displaySlide = 0;
    
    // Apply initial position without transition
    carouselGrid.style.transition = 'none';
    updateCarousel();
    carouselGrid.offsetHeight;
    carouselGrid.style.transition = 'transform 0.5s ease';
}

// Determine cards per view based on screen size
function updateCardsPerView() {
    if (window.innerWidth <= 480) {
        cardsPerView = 1;
    } else if (window.innerWidth <= 768) {
        cardsPerView = 2;
    } else {
        cardsPerView = 3;
    }
    maxIndex = totalCards - cardsPerView;
}

// Update carousel position
function updateCarousel() {
    const card = document.querySelector('.whats-new-card');
    if (!card) return;
    
    const cardWidth = card.offsetWidth;
    const gap = window.innerWidth <= 480 ? 0 : 20;
    const offset = currentSlide * (cardWidth + gap);
    
    carouselGrid.style.transform = `translateX(-${offset}px)`;
    updateCounter();
}

// Update counter display
function updateCounter() {
    counterDisplay.textContent = `Showing ${displaySlide + 1} of ${totalCards}`;
}

// Move to next slide with seamless infinite loop using cloned slides
function nextSlide() {
    if (isWrapping) return;
    
    currentSlide++;
    displaySlide = (displaySlide + 1) % totalCards;
    
    carouselGrid.style.transition = 'transform 0.5s ease';
    updateCarousel();
    
    // Check if we've reached the cloned section
    if (currentSlide >= totalCards + 3) {
        const handleTransitionEnd = () => {
            isWrapping = true;
            carouselGrid.style.transition = 'none';
            currentSlide = 3;
            updateCarousel();
            carouselGrid.offsetHeight;
            carouselGrid.style.transition = 'transform 0.5s ease';
            isWrapping = false;
            carouselGrid.removeEventListener('transitionend', handleTransitionEnd);
        };
        carouselGrid.addEventListener('transitionend', handleTransitionEnd, {once: true});
    }
    
    resetAutoPlay();
}

// Move to previous slide with seamless infinite loop using cloned slides
function prevSlide() {
    if (isWrapping) return;
    
    currentSlide--;
    displaySlide = (displaySlide - 1 + totalCards) % totalCards;
    
    carouselGrid.style.transition = 'transform 0.5s ease';
    updateCarousel();
    
    // Check if we've gone before the real slides
    if (currentSlide < 3) {
        const handleTransitionEnd = () => {
            isWrapping = true;
            carouselGrid.style.transition = 'none';
            currentSlide = totalCards + 2;
            updateCarousel();
            carouselGrid.offsetHeight;
            carouselGrid.style.transition = 'transform 0.5s ease';
            isWrapping = false;
            carouselGrid.removeEventListener('transitionend', handleTransitionEnd);
        };
        carouselGrid.addEventListener('transitionend', handleTransitionEnd, {once: true});
    }
    
    resetAutoPlay();
}

// Auto-play functionality
function startAutoPlay() {
    if (isAutoPlaying) {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }
}

// Pause auto-play
function pauseAutoPlay() {
    clearInterval(autoPlayInterval);
}

// Reset auto-play when user interacts
function resetAutoPlay() {
    pauseAutoPlay();
    startAutoPlay();
}

// Event listeners for Previous/Next buttons
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Pause on hover
carouselWrapper.addEventListener('mouseenter', pauseAutoPlay);
carouselWrapper.addEventListener('mouseleave', startAutoPlay);

// Handle window resize
window.addEventListener('resize', () => {
    updateCardsPerView();
    updateCarousel();
});

// Initialize carousel
setupClonedCarousel();
updateCardsPerView();
updateCarousel();
startAutoPlay();
