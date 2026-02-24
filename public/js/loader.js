/*
 * Page Loader V1 - Counter
 * Customized for LEARNORA
 */

const loader = document.querySelector('#loader');
const counterElement = document.querySelector('#counter');
const progressBar = document.querySelector('#progress-bar');

function startLoader() {
    let counter = { value: 0 };
    
    // Animate the counter value from 0 to 100
    gsap.to(counter, {
        value: 100,
        duration: 3,
        ease: "power2.inOut",
        onUpdate: () => {
            const val = Math.floor(counter.value);
            counterElement.textContent = val;
            progressBar.style.width = val + '%';
        },
        onComplete: () => {
            revealApp();
        }
    });
}

function revealApp() {
    // Smoothly slide the loader up to reveal the content
    gsap.to(loader, {
        y: "-100%",
        duration: 1,
        ease: "power4.inOut"
    });
}

// Initialize the loader once the window is fully loaded
window.addEventListener('load', () => {
    startLoader();
});
