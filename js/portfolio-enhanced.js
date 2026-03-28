// Enhanced Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations and interactions
    initTimelineAnimations();
    initSkillBars();
    initSmoothScrolling();
    initNavbarEffects();
    initPortfolioEffects();
});

// Timeline Animation on Scroll
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, observerOptions);
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Skill Bars Animation
function initSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, observerOptions);
    
    skillItems.forEach(item => {
        observer.observe(item);
    });
}

// Enhanced Smooth Scrolling
function initSmoothScrolling() {
    const scrollTriggers = document.querySelectorAll('.js-scroll-trigger');
    
    scrollTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active nav state
                updateActiveNav(targetId);
            }
        });
    });
}

// Update Active Navigation
function updateActiveNav(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

// Navbar Effects on Scroll
function initNavbarEffects() {
    const navbar = document.querySelector('#mainNav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav based on scroll position
        updateNavOnScroll();
    });
}

// Update Navigation based on scroll position
function updateNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = '#' + section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            updateActiveNav(sectionId);
        }
    });
}

// Portfolio Hover Effects
function initPortfolioEffects() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Enhanced Copy to Clipboard Function
function copiar(elemento) {
    let textoACopiar = '';
    
    if (elemento === 'telefono') {
        textoACopiar = '+56954849143';
    } else if (elemento === 'correo') {
        textoACopiar = 'francoding.dev@gmail.com';
    }
    
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textoACopiar).then(() => {
            mostrarAlerta(`${elemento === 'telefono' ? 'Teléfono' : 'Correo'} copiado al portapapeles`, 'success');
        }).catch(err => {
            console.error('Error al copiar:', err);
            fallbackCopy(textoACopiar);
        });
    } else {
        fallbackCopy(textoACopiar);
    }
}

// Fallback copy method
function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        mostrarAlerta('Texto copiado al portapapeles', 'success');
    } catch (err) {
        console.error('Error al copiar:', err);
        mostrarAlerta('No se pudo copiar el texto', 'error');
    }
    
    document.body.removeChild(textArea);
}

// Enhanced Alert System
function mostrarAlerta(mensaje, tipo = 'info') {
    const alertContainer = document.getElementById('alertas-container');
    if (!alertContainer) return;
    
    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo} alert-dismissible fade show`;
    alerta.innerHTML = `
        ${mensaje}
        <button type="button" class="close" data-dismiss="alert">
            <span>&times;</span>
        </button>
    `;
    
    alertContainer.appendChild(alerta);
    
    // Auto dismiss after 3 seconds
    setTimeout(() => {
        if (alerta.parentNode) {
            alerta.classList.remove('show');
            setTimeout(() => {
                if (alerta.parentNode) {
                    alerta.parentNode.removeChild(alerta);
                }
            }, 150);
        }
    }, 3000);
}

// Add typing effect to hero section
function initTypingEffect() {
    const element = document.querySelector('.masthead-subheading');
    if (!element) return;
    
    const text = element.textContent;
    element.textContent = '';
    element.style.borderRight = '3px solid white';
    
    let index = 0;
    const typeInterval = setInterval(() => {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
        } else {
            clearInterval(typeInterval);
            element.style.borderRight = 'none';
        }
    }, 50);
}

// Initialize typing effect when page loads
window.addEventListener('load', initTypingEffect);

// Add parallax effect to hero section
function initParallaxEffect() {
    const hero = document.querySelector('.masthead');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
}

// Initialize parallax effect
initParallaxEffect();

// Add hover effect to skill badges
function initSkillBadgeEffects() {
    const badges = document.querySelectorAll('.badge');
    
    badges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(2deg)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Initialize skill badge effects
initSkillBadgeEffects();

// Enhanced modal animations
document.addEventListener('shown.bs.modal', function (e) {
    const modal = e.target;
    modal.querySelector('.modal-content').style.animation = 'slideInUp 0.3s ease-out';
});

document.addEventListener('hide.bs.modal', function (e) {
    const modal = e.target;
    modal.querySelector('.modal-content').style.animation = 'slideOutDown 0.3s ease-out';
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            transform: translateY(100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(100%);
            opacity: 0;
        }
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98) !important;
        box-shadow: 0 2px 20px rgba(0,0,0,0.1);
        backdrop-filter: blur(10px);
    }
    
    .nav-link.active {
        color: #667eea !important;
        font-weight: 600;
    }
    
    .nav-link.active::after {
        width: 80%;
    }
`;
document.head.appendChild(style);
