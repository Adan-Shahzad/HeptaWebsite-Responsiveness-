function scrollToNext() {
    // Scroll down by one viewport height
    window.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth'
    });
}
// Hide button when scrolling starts
window.addEventListener('scroll', function() {
    const scrollContainer = document.querySelector('.scroll-down-container');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 100) {
        scrollContainer.style.opacity = '0';
        scrollContainer.style.transform = 'translateX(-50%) translateY(20px)';
    } else {
        scrollContainer.style.opacity = '1';
        scrollContainer.style.transform = 'translateX(-50%) translateY(0)';
    }
});
// Wait for DOM to be fully loaded
        document.addEventListener('DOMContentLoaded', function() {
            const videoBtn = document.getElementById('video-btn');
            const videoModal = document.getElementById('video-modal');
            const videoModalClose = document.getElementById('video-modal-close');
            const modalVideo = document.getElementById('modal-video');

// Check if all elements exist
            if (!videoBtn || !videoModal || !videoModalClose || !modalVideo) {
                console.error('One or more required elements not found');
                return;
            }
        videoBtn.addEventListener('click', function() {
                videoModal.classList.add('active');
// Small delay to ensure modal is visible before playing
                setTimeout(() => {
                    modalVideo.play().catch(e => {
                        console.error('Error playing video:', e);
                    });
                }, 100);
            });
        videoModalClose.addEventListener('click', function() {
                videoModal.classList.remove('active');
                modalVideo.pause();
                modalVideo.currentTime = 0;
            });
// Close if user clicks outside the video content
            videoModal.addEventListener('click', function(e) {
                if (e.target === videoModal) {
                    videoModal.classList.remove('active');
                    modalVideo.pause();
                    modalVideo.currentTime = 0;
                }
            });
// Close on Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && videoModal.classList.contains('active')) {
                    videoModal.classList.remove('active');
                    modalVideo.pause();
                    modalVideo.currentTime = 0;
                }
            });
// Handle video loading errors
            modalVideo.addEventListener('error', function(e) {
                console.error('Video loading error:', e);
                alert('Sorry, there was an error loading the video.');
            });
// Log when video is ready to play
            modalVideo.addEventListener('loadeddata', function() {
                console.log('Video loaded successfully');
            });
        });
// Add interactive hover effects top destinatin
        document.querySelectorAll('.destination-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px)';
            });            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
// Add click functionality top destination
        document.querySelectorAll('.destination-card').forEach(card => {
            card.addEventListener('click', function() {
                const title = this.querySelector('.card-title').textContent;
                const reviews = this.querySelector('.review-count').textContent;
                alert(`You clicked on ${title} with ${reviews}!`);
            });
        });
// gallery moving
      class ImageGallery {
            constructor() {
                this.track = document.getElementById('galleryTrack');
                this.prevBtn = document.getElementById('prevBtn');
                this.nextBtn = document.getElementById('nextBtn');
                this.currentImageSpan = document.getElementById('currentImage');
                this.totalImagesSpan = document.getElementById('totalImages');
                this.indicators = document.querySelectorAll('.indicator');
                
                this.currentIndex = 0;
                this.totalImages = document.querySelectorAll('.gallery-item').length;
                
                this.init();
            } 
            init() {
                this.prevBtn.addEventListener('click', () => this.moveLeft());
                this.nextBtn.addEventListener('click', () => this.moveRight());
                
                this.indicators.forEach((indicator, index) => {
                    indicator.addEventListener('click', () => this.goToImage(index));
                });               
                // Keyboard navigation
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowLeft') this.moveLeft();
                    if (e.key === 'ArrowRight') this.moveRight();
                });
                // Touch/swipe support
                let startX = 0;
                let endX = 0;
                this.track.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                });
                this.track.addEventListener('touchend', (e) => {
                    endX = e.changedTouches[0].clientX;
                    const diff = startX - endX; 
                    if (Math.abs(diff) > 50) { // Minimum swipe distance
                        if (diff > 0) {
                            this.moveRight();
                        } else {
                            this.moveLeft();
                        }
                    }
                });
                this.updateGallery();
            }
            moveLeft() {
                if (this.currentIndex > 0) {
                    this.currentIndex--;
                    this.updateGallery();
                }
            }         
            moveRight() {
                if (this.currentIndex < this.totalImages - 1) {
                    this.currentIndex++;
                    this.updateGallery();
                }
            }
            goToImage(index) {
                this.currentIndex = index;
                this.updateGallery();
            }
            updateGallery() {
// Move the track
                const translateX = -this.currentIndex * 100;
                this.track.style.transform = `translateX(${translateX}%)`;
                
// Update counter
                this.currentImageSpan.textContent = this.currentIndex + 1;
                
// Update button states
                this.prevBtn.disabled = this.currentIndex === 0;
                this.nextBtn.disabled = this.currentIndex === this.totalImages - 1;
                
// Update indicators
                this.indicators.forEach((indicator, index) => {
                    indicator.classList.toggle('active', index === this.currentIndex);
                });
            }
        }
// Initialize gallery when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new ImageGallery();
        });     
// Create floating particles
        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 8) + 's';
            document.body.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 18000);
        }
// Create particles periodically
        setInterval(createParticle, 800);
// Add scroll-triggered animations for better UX
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, observerOptions);
// Observe all experience cards
        document.querySelectorAll('.experience-card').forEach(card => {
            observer.observe(card);
        });
// Add subtle mouse interaction
        document.addEventListener('mousemove', (e) => {
            const cards = document.querySelectorAll('.experience-card');
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = (y - centerY) / 10;
                    const rotateY = (centerX - x) / 10;
                    
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
                } else {
                    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
                }
            });
        });
        // division experience     

// Scroll-triggered animations
function createIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

// Elements to animate
    const elementsToAnimate = [
        '.welcome-section',
        '.containerrr',
        '.experience-card',
        '.image-gallery',
        '.gallery-container',
        '.containerr',
        '.destination-card',
        '.footer'
    ];
    elementsToAnimate.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    });
}
// Initialize on page load
document.addEventListener('DOMContentLoaded', createIntersectionObserver);