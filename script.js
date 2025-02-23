// Loader
window.addEventListener('load', () => {
    document.querySelector('.loader').classList.add('fade-out');
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

// Product Data
const products = [
    {
        name: 'Classic Chronograph',
        price: 299.00,
        rating: 5,
        image: '/placeholder.svg?height=300&width=300'
    },
    {
        name: 'Smart Elite',
        price: 399.00,
        rating: 5,
        image: '/placeholder.svg?height=300&width=300'
    },
    {
        name: 'Vintage Collection',
        price: 499.00,
        rating: 5,
        image: '/placeholder.svg?height=300&width=300'
    },
    {
        name: 'Classic Chronograph',
        price: 299.00,
        rating: 5,
        image: '/placeholder.svg?height=300&width=300'
    },
    {
        name: 'Smart Elite',
        price: 399.00,
        rating: 5,
        image: '/placeholder.svg?height=300&width=300'
    },
    {
        name: 'Vintage Collection',
        price: 499.00,
        rating: 5,
        image: '/placeholder.svg?height=300&width=300'
    }
];

// Reviews Data
const reviews = [
    {
        name: 'James Anderson',
        image: '/placeholder.svg?height=100&width=100',
        text: 'Exceptional quality and stunning design. The attention to detail is remarkable.',
        rating: 5
    },
    {
        name: 'Sarah Mitchell',
        image: '/placeholder.svg?height=100&width=100',
        text: 'The perfect blend of classic style and modern technology. Highly recommended!',
        rating: 5
    },
    {
        name: 'James Anderson',
        image: '/placeholder.svg?height=100&width=100',
        text: 'Exceptional quality and stunning design. The attention to detail is remarkable.',
        rating: 5
    },
    {
        name: 'Sarah Mitchell',
        image: '/placeholder.svg?height=100&width=100',
        text: 'The perfect blend of classic style and modern technology. Highly recommended!',
        rating: 5
    }
];

// Initialize page-specific functionality
function initializeHomePage() {
    // Observe section titles and product cards
    document.querySelectorAll('.section-title').forEach(el => observer.observe(el));

    // Populate Products
    const productGrid = document.querySelector('.product-grid');
    if (productGrid) {
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <div class="rating">${'★'.repeat(product.rating)}</div>
                <p class="price">$${product.price.toFixed(2)}</p>
            `;
            productGrid.appendChild(productCard);
            observer.observe(productCard);
        });
    }

    // Populate Reviews
    const reviewContainer = document.querySelector('.review-container');
    const reviewDots = document.querySelector('.review-dots');
    
    if (reviewContainer && reviewDots) {
        reviews.forEach((review, index) => {
            reviewContainer.innerHTML += `
                <div class="review-slide">
                    <div class="review-card">
                        <div class="review-header">
                            <img src="${review.image}" alt="${review.name}">
                            <div>
                                <h3>${review.name}</h3>
                                <div class="rating">${'★'.repeat(review.rating)}</div>
                            </div>
                        </div>
                        <p>${review.text}</p>
                    </div>
                </div>
            `;
            
            reviewDots.innerHTML += `
                <span class="dot ${index === 0 ? 'active' : ''}" onclick="currentSlide(${index})"></span>
            `;
        });
    }
}

// Update the Reviews Slider initialization
function initializeReviewSlider() {
    const reviewContainer = document.querySelector('.review-container');
    if (!reviewContainer) return;

    // Group reviews into pairs
    const reviewPairs = [];
    for (let i = 0; i < reviews.length; i += 2) {
        reviewPairs.push(reviews.slice(i, i + 2));
    }

    // Clear any existing content
    reviewContainer.innerHTML = `
        <div class="review-wrapper">
            ${reviewPairs.map(pair => `
                <div class="review-slide">
                    ${pair.map(review => `
                        <div class="review-card">
                            <div class="review-header">
                                <img src="${review.image}" alt="${review.name}">
                                <div class="review-author">
                                    <h4>${review.name}</h4>
                                    <div class="review-rating">${'★'.repeat(review.rating)}</div>
                                </div>
                            </div>
                            <p class="review-text">${review.text}</p>
                        </div>
                    `).join('')}
                </div>
            `).join('')}
        </div>
        <div class="review-nav">
            <div class="review-dots">
                ${reviewPairs.map((_, i) => `
                    <span class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>
                `).join('')}
            </div>
        </div>
    `;

    const wrapper = reviewContainer.querySelector('.review-wrapper');
    const dots = reviewContainer.querySelectorAll('.dot');
    let currentSlide = 0;

    function showSlide(index) {
        currentSlide = index;
        wrapper.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Auto slide every 5 seconds
    let autoSlideInterval = setInterval(() => {
        const nextSlide = (currentSlide + 1) % reviewPairs.length;
        showSlide(nextSlide);
    }, 5000);

    // Pause auto-slide on hover
    reviewContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    reviewContainer.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(() => {
            const nextSlide = (currentSlide + 1) % reviewPairs.length;
            showSlide(nextSlide);
        }, 5000);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeReviewSlider();
    // ... (rest of the initialization code)
});

// Newsletter Form
document.addEventListener('DOMContentLoaded', () => {
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = e.target.querySelector('input');
            alert(`Thank you for subscribing with ${input.value}!`);
            input.value = '';
        });
    }

    // Initialize page functionality
    initializeHomePage();
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});