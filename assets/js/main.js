/**
 * SQUID GAME x MINECRAFT - JAVASCRIPT AVANZADO
 * Desarrollado para una experiencia interactiva y atractiva
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar todos los componentes
    initNavbar();
    initParallaxEffect();
    initMusicPlayer();
    initTeamModals();
    initQuotesSlider();
    initGallery();
    initAnimations();
    initMinecraftEffects();
});

/**
 * Inicialización de la barra de navegación
 * Maneja el comportamiento responsive y efectos de scroll
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarLinks = document.querySelector('.navbar-links');
    
    // Cambiar estilo de navbar al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Manejar menú móvil
    if (navbarToggle) {
        navbarToggle.addEventListener('click', () => {
            navbarLinks.classList.toggle('active');
        });
    }
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.navbar-link').forEach(link => {
        link.addEventListener('click', () => {
            navbarLinks.classList.remove('active');
        });
    });
}

/**
 * Efecto parallax para el fondo
 * Crea una sensación de profundidad al desplazarse
 */
function initParallaxEffect() {
    const parallaxBg = document.querySelector('.bg-parallax');
    
    if (parallaxBg) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            parallaxBg.style.transform = `translateY(${scrollY * 0.3}px)`;
        });
    }
}

/**
 * Reproductor de música de fondo
 * Permite controlar la reproducción de audio
 */
function initMusicPlayer() {
    const music = document.getElementById('background-music');
    const toggleButton = document.querySelector('.music-button');
    
    if (music && toggleButton) {
        // Establecer volumen inicial
        music.volume = 0.2;
        
        // Manejar reproducción automática
        music.addEventListener('canplaythrough', () => {
            // Intentar reproducir automáticamente (puede ser bloqueado por políticas del navegador)
            const playPromise = music.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    // Auto-play fue prevenido
                    toggleButton.textContent = '🔇';
                });
            }
        });
        
        // Alternar reproducción
        toggleButton.addEventListener('click', () => {
            if (music.paused) {
                music.play();
                toggleButton.textContent = '🔊';
                toggleButton.classList.add('playing');
            } else {
                music.pause();
                toggleButton.textContent = '🔇';
                toggleButton.classList.remove('playing');
            }
        });
    }
}

/**
 * Modales para el equipo
 * Muestra información detallada sobre cada miembro
 */
function initTeamModals() {
    // Configuración de los modales
    const modalConfig = [
        { trigger: '.mahilobito-trigger', modal: 'mahilobito-modal', theme: 'mahilobito-theme' },
        { trigger: '.kryxuss-trigger', modal: 'kryxuss-modal', theme: 'kryxuss-theme' },
        { trigger: '.zinezack-trigger', modal: 'zinezack-modal', theme: 'zinezack-theme' },
        { trigger: '.gooxa-trigger', modal: 'gooxa-modal', theme: 'gooxa-theme' }
    ];
    
    // Inicializar cada modal
    modalConfig.forEach(config => {
        const triggers = document.querySelectorAll(config.trigger);
        const modal = document.getElementById(config.modal);
        
        if (triggers.length && modal) {
            // Abrir modal al hacer clic en el trigger
            triggers.forEach(trigger => {
                trigger.addEventListener('click', () => {
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Prevenir scroll
                });
            });
            
            // Cerrar modal con botón
            const closeButton = modal.querySelector('.modal-close');
            if (closeButton) {
                closeButton.addEventListener('click', () => {
                    modal.classList.remove('active');
                    document.body.style.overflow = ''; // Restaurar scroll
                });
            }
            
            // Cerrar modal al hacer clic fuera
            modal.addEventListener('click', (event) => {
                if (event.target === modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = ''; // Restaurar scroll
                }
            });
        }
    });
}

/**
 * Slider de citas
 * Muestra frases icónicas del Juego del Calamar
 */
function initQuotesSlider() {
    const slider = document.querySelector('.quotes-slider');
    
    if (slider) {
        const items = slider.querySelectorAll('.quote-item');
        let currentIndex = 0;
        
        // Ocultar todos los items excepto el primero
        items.forEach((item, index) => {
            if (index !== 0) {
                item.style.display = 'none';
            }
        });
        
        // Cambiar de cita cada 8 segundos
        setInterval(() => {
            items[currentIndex].style.display = 'none';
            currentIndex = (currentIndex + 1) % items.length;
            items[currentIndex].style.display = 'block';
            
            // Añadir animación
            items[currentIndex].classList.add('fade-in');
            setTimeout(() => {
                items[currentIndex].classList.remove('fade-in');
            }, 1000);
        }, 8000);
    }
}

/**
 * Galería de imágenes
 * Permite ver imágenes en tamaño completo
 */
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            const caption = item.querySelector('.gallery-caption').textContent;
            
            // Crear modal de imagen
            const modal = document.createElement('div');
            modal.classList.add('modal', 'gallery-modal');
            
            modal.innerHTML = `
                <div class="modal-content">
                    <button class="modal-close">&times;</button>
                    <img src="${imgSrc}" alt="${caption}" class="modal-image">
                    <div class="modal-caption">${caption}</div>
                </div>
            `;
            
            // Añadir al DOM
            document.body.appendChild(modal);
            
            // Mostrar modal
            setTimeout(() => {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }, 10);
            
            // Configurar cierre
            const closeButton = modal.querySelector('.modal-close');
            closeButton.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
                
                // Eliminar del DOM después de la animación
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            });
            
            // Cerrar al hacer clic fuera
            modal.addEventListener('click', (event) => {
                if (event.target === modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                    
                    // Eliminar del DOM después de la animación
                    setTimeout(() => {
                        document.body.removeChild(modal);
                    }, 300);
                }
            });
        });
    });
}

/**
 * Animaciones al hacer scroll
 * Activa elementos cuando entran en el viewport
 */
function initAnimations() {
    // Elementos a animar
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // Función para verificar si un elemento está en el viewport
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    };
    
    // Función para animar elementos visibles
    const animateElements = () => {
        animatedElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
            }
        });
    };
    
    // Ejecutar al cargar y al hacer scroll
    animateElements();
    window.addEventListener('scroll', animateElements);
}

/**
 * Efectos visuales de Minecraft
 * Añade elementos visuales inspirados en Minecraft
 */
function initMinecraftEffects() {
    // Crear partículas pixeladas
    const createPixelParticles = () => {
        const container = document.querySelector('.hero');
        if (!container) return;
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.classList.add('pixel-particle');
            
            // Posición aleatoria
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            // Tamaño aleatorio
            const size = Math.random() * 8 + 4;
            
            // Color aleatorio
            const colors = ['#ff0080', '#1dd1a1', '#48dbfb', '#feca57'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            // Aplicar estilos
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.backgroundColor = color;
            
            // Añadir al DOM
            container.appendChild(particle);
            
            // Animación
            setTimeout(() => {
                particle.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`;
                particle.style.opacity = '0';
            }, 100);
            
            // Eliminar después de la animación
            setTimeout(() => {
                container.removeChild(particle);
            }, 5000);
        }
    };
    
    // Crear partículas cada 3 segundos
    setInterval(createPixelParticles, 3000);
    createPixelParticles(); // Ejecutar inmediatamente
}

/**
 * Contador regresivo para eventos
 * @param {string} targetDate - Fecha objetivo en formato 'YYYY-MM-DD'
 * @param {string} elementId - ID del elemento donde mostrar el contador
 */
function initCountdown(targetDate, elementId) {
    const countdownElement = document.getElementById(elementId);
    if (!countdownElement) return;
    
    const targetTime = new Date(targetDate).getTime();
    
    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = targetTime - now;
        
        if (distance < 0) {
            countdownElement.innerHTML = '¡El evento ha comenzado!';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        countdownElement.innerHTML = `
            <div class="countdown-item">
                <span class="countdown-number">${days}</span>
                <span class="countdown-label">Días</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${hours}</span>
                <span class="countdown-label">Horas</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${minutes}</span>
                <span class="countdown-label">Minutos</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${seconds}</span>
                <span class="countdown-label">Segundos</span>
            </div>
        `;
    };
    
    // Actualizar cada segundo
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

/**
 * Efectos de texto tipo máquina de escribir
 * @param {string} elementId - ID del elemento donde aplicar el efecto
 * @param {string[]} texts - Array de textos a mostrar
 * @param {number} speed - Velocidad de escritura en milisegundos
 */
function initTypewriter(elementId, texts, speed = 100) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = speed;
    
    const type = () => {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            // Borrar texto
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = speed / 2; // Borrar más rápido
        } else {
            // Escribir texto
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = speed;
        }
        
        // Cambiar dirección o texto
        if (!isDeleting && charIndex === currentText.length) {
            // Pausa al final del texto
            typingDelay = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            // Pausa antes de escribir nuevo texto
            typingDelay = 500;
        }
        
        setTimeout(type, typingDelay);
    };
    
    // Iniciar efecto
    setTimeout(type, 1000);
}

/**
 * Inicializar efectos de partículas
 * Crea un efecto visual de partículas flotantes
 */
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Ajustar tamaño al redimensionar ventana
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    // Configuración de partículas
    const particlesArray = [];
    const numberOfParticles = 100;
    
    // Colores temáticos
    const colors = [
        'rgba(255, 0, 128, 0.7)',
        'rgba(29, 209, 161, 0.7)',
        'rgba(72, 219, 251, 0.7)',
        'rgba(254, 202, 87, 0.7)'
    ];
    
    // Clase Partícula
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 5 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Rebote en los bordes
            if (this.x > canvas.width || this.x < 0) {
                this.speedX = -this.speedX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.speedY = -this.speedY;
            }
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Crear partículas
    function init() {
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }
    
    // Animar partículas
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        
        // Conectar partículas cercanas
        connect();
        
        requestAnimationFrame(animate);
    }
    
    // Conectar partículas con líneas
    function connect() {
        const maxDistance = 100;
        
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                const dx = particlesArray[a].x - particlesArray[b].x;
                const dy = particlesArray[a].y - particlesArray[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    const opacity = 1 - distance / maxDistance;
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Iniciar animación
    init();
    animate();
}
