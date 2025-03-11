// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Testimonial Carousel (Only for Mobile)
const testimonialCards = document.querySelectorAll('.testimonial-card');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
let currentIndex = 0;

function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
        card.classList.remove('active', 'prev', 'next');
        if (i === index) {
            card.classList.add('active');
        } else if (i === (index - 1 + testimonialCards.length) % testimonialCards.length) {
            card.classList.add('prev');
        } else if (i === (index + 1) % testimonialCards.length) {
            card.classList.add('next');
        }
    });
}

// Initialize carousel only on mobile
if (window.innerWidth <= 768) {
    showTestimonial(currentIndex);
    let autoSlide = setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonialCards.length;
        showTestimonial(currentIndex);
    }, 5000);

    prevBtn.addEventListener('click', () => {
        clearInterval(autoSlide);
        currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
        showTestimonial(currentIndex);
        autoSlide = setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonialCards.length;
            showTestimonial(currentIndex);
        }, 5000);
    });

    nextBtn.addEventListener('click', () => {
        clearInterval(autoSlide);
        currentIndex = (currentIndex + 1) % testimonialCards.length;
        showTestimonial(currentIndex);
        autoSlide = setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonialCards.length;
            showTestimonial(currentIndex);
        }, 5000);
    });
}

// Button Redirects
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-dark').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'contact.html';
    });
});

// Form Validation and Submission
const contactForm = document.getElementById('contact-form');
const successMessage = document.createElement('div');
successMessage.className = 'success-message';
successMessage.style.display = 'none';
successMessage.innerHTML = 'Thank you! Your message has been sent successfully. We’ll get back to you soon.';
contactForm.insertAdjacentElement('afterend', successMessage);

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation
    if (name === '') {
        alert('Please enter your name.');
        return;
    }

    if (email === '' || !isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (message === '') {
        alert('Please enter your message.');
        return;
    }

    // Submit to Formspree via Fetch
    fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Show success message
            contactForm.style.display = 'none';
            successMessage.style.display = 'block';
            contactForm.reset(); // Clear the form
        } else {
            throw new Error('Form submission failed.');
        }
    })
    .catch(error => {
        alert('There was an error submitting your form. Please try again later.');
        console.error('Form submission error:', error);
    });
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Back-to-Top Button
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});