// Mobile menu functionality
const menuToggle = document.querySelector('.menu-toggle');
const navContainer = document.querySelector('.nav-container');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navContainer.classList.toggle('active');
    document.body.style.overflow = navContainer.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking a link
document.querySelectorAll('.main-nav a, .cta-button').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navContainer.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Clock animation
const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');

function updateClockHands() {
    const now = new Date();
    
    // Get milliseconds for smoother second hand movement
    const milliseconds = now.getMilliseconds();
    const seconds = now.getSeconds() + milliseconds / 1000;
    const minutes = now.getMinutes() + seconds / 60;
    const hours = now.getHours() % 12 + minutes / 60;
    
    // Convert time to degrees with smoother transitions
    const secondDegrees = (seconds / 60) * 360;
    const minuteDegrees = (minutes / 60) * 360;
    const hourDegrees = (hours / 12) * 360;
    
    // Apply rotations with hardware acceleration
    if (secondHand) secondHand.style.transform = `rotate(${secondDegrees}deg) translateZ(0)`;
    if (minuteHand) minuteHand.style.transform = `rotate(${minuteDegrees}deg) translateZ(0)`;
    if (hourHand) hourHand.style.transform = `rotate(${hourDegrees}deg) translateZ(0)`;
    
    requestAnimationFrame(updateClockHands);
}

// Start the clock animation only if the elements exist
if (hourHand && minuteHand && secondHand) {
    updateClockHands();
}

// Header visibility on scroll
const header = document.querySelector('.main-header');
let lastScrollY = window.scrollY;
const scrollThreshold = 100;

function handleScroll() {
    if (!header) return;
    
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > scrollThreshold) {
        header.classList.add('visible');
    } else {
        header.classList.remove('visible');
    }
    
    lastScrollY = currentScrollY;
}

window.addEventListener('scroll', handleScroll);

// Smooth scroll for "Explore our pricing" link
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Content Loaded");
    const exploreButton = document.getElementById('explore-plans-btn');
    
    if (exploreButton) {
        console.log("Found explore button:", exploreButton);
        
        // Add a pulse animation to the arrow when the page loads
        function addPulseToArrow() {
            console.log("Adding pulse to arrow");
            // Get the arrow (::before pseudo-element can't be directly accessed, so we animate the parent)
            const textLink = document.querySelector('.text-link');
            if (textLink) {
                console.log("Found text link:", textLink);
                // Add a class to enable CSS animations
                textLink.classList.add('pulse-arrow');
            } else {
                console.log("Text link not found");
            }
        }
        
        // Call the function to start the pulse animation immediately
        addPulseToArrow();
        
        exploreButton.addEventListener('click', function(e) {
            console.log("Button clicked");
            e.preventDefault(); // Prevent default anchor behavior
            
            // Add a visual feedback when clicked
            const textLink = document.querySelector('.text-link');
            if (textLink) {
                console.log("Adding clicked class");
                textLink.classList.add('clicked');
                textLink.classList.remove('pulse-arrow');
                
                // Remove the class after the animation completes
                setTimeout(() => {
                    textLink.classList.remove('clicked');
                    // Re-add the pulse class after the click animation is done
                    setTimeout(() => {
                        textLink.classList.add('pulse-arrow');
                    }, 100);
                }, 1000);
            }
            
            const pricingPlansSection = document.getElementById('pricing-plans');
            
            if (pricingPlansSection) {
                console.log("Scrolling to pricing plans section");
                // Improved smooth scrolling with custom timing
                const startPosition = window.pageYOffset;
                const targetPosition = pricingPlansSection.getBoundingClientRect().top + window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 1500; // Longer duration for more dramatic animation
                let startTime = null;
                
                function animation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const progress = Math.min(timeElapsed / duration, 1);
                    
                    // Easing function for smoother animation
                    const ease = function(t) {
                        // Enhanced cubic bezier for more dramatic effect
                        return t < 0.5 ? 4 * t * t * t : 
                               (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
                    };
                    
                    window.scrollTo(0, startPosition + distance * ease(progress));
                    
                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    }
                }
                
                requestAnimationFrame(animation);
            }
        });
    } else {
        console.log("Explore button not found");
    }
}); 