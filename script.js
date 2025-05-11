// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollTop = 0;
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = '#fff';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.boxShadow = 'none';
    }
});

// Form Submission Handler
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.2
}; 


const container = document.querySelector('.videos-container');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const videoItems = document.querySelectorAll('.video-item');

        // Настройки прокрутки
    let currentIndex = 0;
    const scrollAmount = () => {
        const styles = window.getComputedStyle(container);
        const gap = parseInt(styles.gap);
        return videoItems[0].offsetWidth + gap;
        };

        // Обработчики кнопок
    nextButton.addEventListener('click', () => {
        container.scrollBy({
            left: scrollAmount(),
            behavior: 'smooth'
        });
    });

    prevButton.addEventListener('click', () => {
        container.scrollBy({
            left: -scrollAmount(),
            behavior: 'smooth'
        });
    });

        // Автопауза при скролле
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target.querySelector('video');
            if (entry.isIntersecting) {
                video.play();
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.8 });

    videoItems.forEach(item => observer.observe(item));

        // Адаптация при ресайзе
    window.addEventListener('resize', () => {
        container.scrollTo({
            left: currentIndex * scrollAmount(),
            behavior: 'auto'
        });
    });


//Video carousel

/*document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.getElementById('next-button');
    const prevButton = document.getElementById('prev-button');
    const dotIndicatorsContainer = document.getElementById('dot-indicators');
    
    if (!track || !nextButton || !prevButton || slides.length === 0) {
        console.warn('Carousel elements not found. Carousel will not initialize.');
        if (nextButton) nextButton.style.display = 'none';
        if (prevButton) prevButton.style.display = 'none';
        return;
    }

    const slideWidth = slides[0].getBoundingClientRect().width; // Assumes all slides are same width
    let currentIndex = 0;

    // --- Helper Functions ---
    // Function to move to a specific slide
    const moveToSlide = (targetIndex) => {
        if (!track) return;
        track.style.transform = 'translateX(-' + slideWidth * targetIndex + 'px)';
        currentIndex = targetIndex;
        updateNavButtons();
        updateDotIndicators();
        pauseAllVideosExcept(targetIndex);
    };

    // Function to update navigation button states (disabled at ends)
    const updateNavButtons = () => {
        if (!prevButton || !nextButton) return;
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === slides.length - 1;
    };

    // Function to create and update dot indicators
    const setupDotIndicators = () => {
        if (!dotIndicatorsContainer) return;
        dotIndicatorsContainer.innerHTML = ''; // Clear existing dots
        slides.forEach((_, index) => {
            const button = document.createElement('button');
            button.setAttribute('aria-label', `Go to slide ${index + 1}`);
            button.classList.add('w-3', 'h-3', 'rounded-full', 'bg-gray-500', 'hover:bg-sky-400', 'transition-colors');
            if (index === currentIndex) {
                button.classList.replace('bg-gray-500', 'bg-sky-400');
                button.classList.add('ring-2', 'ring-sky-300', 'ring-offset-2', 'ring-offset-gray-800');
            }
            button.addEventListener('click', () => moveToSlide(index));
            dotIndicatorsContainer.appendChild(button);
        });
    };
    
    const updateDotIndicators = () => {
        if (!dotIndicatorsContainer) return;
        const dots = Array.from(dotIndicatorsContainer.children);
        dots.forEach((dot, index) => {
            dot.classList.toggle('bg-sky-400', index === currentIndex);
            dot.classList.toggle('bg-gray-500', index !== currentIndex);
            dot.classList.toggle('ring-2', index === currentIndex);
            dot.classList.toggle('ring-sky-300', index === currentIndex);
            dot.classList.toggle('ring-offset-2', index === currentIndex);
            dot.classList.toggle('ring-offset-gray-800', index === currentIndex);
        });
    };

    // Function to pause all videos except the current one
    const pauseAllVideosExcept = (activeIndex) => {
        slides.forEach((slide, index) => {
            const video = slide.querySelector('video');
            if (video && index !== activeIndex) {
                video.pause();
            }
        });
    };
    
    // --- Event Listeners ---
    // Next button
    nextButton.addEventListener('click', () => {
        if (currentIndex < slides.length - 1) {
            moveToSlide(currentIndex + 1);
        }
    });

    // Previous button
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            moveToSlide(currentIndex - 1);
        }
    });
let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (slides.length > 0) {
                const newSlideWidth = slides[0].getBoundingClientRect().width;
                
                const newContainerWidth = track.parentElement.getBoundingClientRect().width;
                
                const updatedSlideWidth = slides[0].getBoundingClientRect().width;
                
                track.style.transform = 'translateX(-' + updatedSlideWidth * currentIndex + 'px)';
                const currentDynamicSlideWidth = slides[0].getBoundingClientRect().width;
                
                track.style.transform = 'translateX(-' + currentDynamicSlideWidth * currentIndex + 'px)';

            }
        }, 250); // Debounce for 250ms
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            nextButton.click();
        } else if (event.key === 'ArrowLeft') {
            prevButton.click();
        }
    });

    // --- Initialization ---
    if (slides.length > 0) {
        setupDotIndicators();
        updateNavButtons();
        pauseAllVideosExcept(currentIndex); // Pause non-active videos on load

        // Initial positioning (especially if slideWidth was 0 initially)
        // This ensures the carousel is correctly positioned on load after elements are rendered.
        const initialSlideWidth = slides[0].getBoundingClientRect().width;
        if (initialSlideWidth > 0) {
             track.style.transform = 'translateX(-' + initialSlideWidth * currentIndex + 'px)';
        } else {
            // Fallback or warning if width is still 0 (e.g. display:none parent)
            console.warn("Carousel slide width is 0 on init. Ensure container is visible.");
        }
    }
  
});*/