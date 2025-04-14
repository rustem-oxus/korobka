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

// Testimonials Slider
let currentTestimonial = 0;
const testimonials = [
    {
        text: "Harmony Academy transformed my singing abilities. The instructors are amazing!",
        author: "Jessica R."
    },
    {
        text: "The personalized attention and expert guidance helped me achieve my goals.",
        author: "Michael S."
    },
    {
        text: "Best decision I've made for my vocal career. Highly recommended!",
        author: "David L."
    }
];

function updateTestimonial() {
    const testimonialContainer = document.querySelector('.testimonial');
    const currentTest = testimonials[currentTestimonial];
    
    testimonialContainer.innerHTML = `
        <p>"${currentTest.text}"</p>
        <cite>- ${currentTest.author}</cite>
    `;
    
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
}

// Change testimonial every 5 seconds
setInterval(updateTestimonial, 5000);

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