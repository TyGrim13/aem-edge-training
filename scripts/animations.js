// Fun animations for the site

export default function initAnimations() {
  // Add confetti effect on button clicks
  const buttons = document.querySelectorAll('a.button, button');
  buttons.forEach(button => {
    button.addEventListener('click', createConfetti);
  });

  // Add scroll animations
  window.addEventListener('scroll', handleScroll);
  
  // Initial check for elements in view
  handleScroll();
}

// Create confetti effect
function createConfetti(e) {
  const button = e.currentTarget;
  const buttonRect = button.getBoundingClientRect();
  
  // Create confetti container
  const confettiContainer = document.createElement('div');
  confettiContainer.className = 'confetti-container';
  confettiContainer.style.position = 'fixed';
  confettiContainer.style.left = `${buttonRect.left + buttonRect.width / 2}px`;
  confettiContainer.style.top = `${buttonRect.top + buttonRect.height / 2}px`;
  confettiContainer.style.pointerEvents = 'none';
  document.body.appendChild(confettiContainer);
  
  // Create confetti pieces
  const colors = ['#3b63fb', '#1d3ecf', '#f8f8f8', '#505050'];
  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.position = 'absolute';
    confetti.style.width = `${Math.random() * 10 + 5}px`;
    confetti.style.height = `${Math.random() * 5 + 5}px`;
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.borderRadius = '2px';
    confetti.style.transformOrigin = 'center';
    confetti.style.opacity = '1';
    
    // Set random position and animation
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 100 + 50;
    const duration = Math.random() * 1 + 1;
    
    confetti.style.transform = 'translate(-50%, -50%)';
    confetti.style.animation = `confetti-fall ${duration}s forwards`;
    
    // Create and add the animation
    const keyframes = `
      @keyframes confetti-fall {
        0% {
          transform: translate(-50%, -50%) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) rotate(${Math.random() * 360}deg);
          opacity: 0;
        }
      }
    `;
    
    const style = document.createElement('style');
    style.textContent = keyframes;
    document.head.appendChild(style);
    
    confettiContainer.appendChild(confetti);
  }
  
  // Remove the container after animation
  setTimeout(() => {
    confettiContainer.remove();
  }, 2000);
}

// Handle scroll animations
function handleScroll() {
  const elements = document.querySelectorAll('.section, img, h2, h3, p');
  
  elements.forEach(element => {
    if (isElementInViewport(element)) {
      if (!element.classList.contains('animate-in')) {
        element.classList.add('animate-in');
      }
    }
  });
}

// Check if element is in viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}