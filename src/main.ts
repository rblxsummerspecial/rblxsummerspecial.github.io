/**
 * Manual implementation of confetti
 */
function createConfetti(): void {
  const confettiContainer = document.getElementById('confetti-container');
  if (!confettiContainer) return;

  const colors = ['#FF0000', '#00A2FF', '#FFC800', '#02b84f', '#FFFFFF'];
  const shapes = ['circle', 'square', 'triangle'];

  // Create 150 pieces of confetti
  for (let i = 0; i < 150; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';

      // Random properties
      const color = colors[Math.floor(Math.random() * colors.length)];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const size = Math.random() * 10 + 5; // 5-15px
      const left = Math.random() * 100; // 0-100%

      // Set styles
      confetti.style.position = 'absolute';
      confetti.style.backgroundColor = color;
      confetti.style.width = `${size}px`;
      confetti.style.height = `${size}px`;
      confetti.style.left = `${left}%`;
      confetti.style.top = '0';

      // Set shape
      if (shape === 'circle') {
        confetti.style.borderRadius = '50%';
      } else if (shape === 'triangle') {
        confetti.style.width = '0';
        confetti.style.height = '0';
        confetti.style.backgroundColor = 'transparent';
        confetti.style.borderLeft = `${size / 2}px solid transparent`;
        confetti.style.borderRight = `${size / 2}px solid transparent`;
        confetti.style.borderBottom = `${size}px solid ${color}`;
      }

      // Add animation
      const duration = Math.random() * 3 + 2; // 2-5s
      const rotationStart = Math.random() * 360;

      confetti.style.animation = `confettiDrop ${duration}s ease-in forwards`;
      confetti.style.transform = `rotate(${rotationStart}deg)`;

      // Add to container
      confettiContainer.appendChild(confetti);

      // Remove after animation
      setTimeout(() => {
        if (confettiContainer.contains(confetti)) {
          confettiContainer.removeChild(confetti);
        }
      }, duration * 1000);
    }, i * 10); // Stagger creation
  }
}

// Countdown timer functionality
class CountdownTimer {
  private endTime: Date;
  private hoursElement: HTMLElement | null;
  private minutesElement: HTMLElement | null;
  private secondsElement: HTMLElement | null;
  private intervalId: number | null = null;

  constructor(hoursId: string, minutesId: string, secondsId: string, hoursToAdd = 24) {
    this.hoursElement = document.getElementById(hoursId);
    this.minutesElement = document.getElementById(minutesId);
    this.secondsElement = document.getElementById(secondsId);

    // Set end time to current time + hoursToAdd
    this.endTime = new Date();
    this.endTime.setHours(this.endTime.getHours() + hoursToAdd);
  }

  start(): void {
    // Initial update
    this.updateDisplay();

    // Update every second
    this.intervalId = window.setInterval(() => {
      this.updateDisplay();
    }, 1000);
  }

  private updateDisplay(): void {
    const now = new Date();
    const diff = Math.max(0, this.endTime.getTime() - now.getTime());

    // Calculate hours, minutes, seconds
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Update elements
    if (this.hoursElement) {
      this.hoursElement.textContent = hours.toString().padStart(2, '0');
    }
    if (this.minutesElement) {
      this.minutesElement.textContent = minutes.toString().padStart(2, '0');
    }
    if (this.secondsElement) {
      this.secondsElement.textContent = seconds.toString().padStart(2, '0');
    }

    // Stop if countdown finished
    if (diff === 0 && this.intervalId !== null) {
      clearInterval(this.intervalId);
    }
  }
}

// FAQ toggle functionality
function initializeFAQ(): void {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const toggle = item.querySelector('.faq-toggle');

    if (question && answer && toggle) {
      // Add click event to each question
      question.addEventListener('click', () => {
        // Check if this item is currently active
        const isActive = item.classList.contains('active');

        // Close all other FAQ items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherToggle = otherItem.querySelector('.faq-toggle');
            if (otherToggle) {
              otherToggle.textContent = '+';
            }
          }
        });

        // Toggle this item
        if (!isActive) {
          item.classList.add('active');
          toggle.textContent = '−';
        } else {
          item.classList.remove('active');
          toggle.textContent = '+';
        }
      });
    }
  });
}

// Add confetti animation styles
const confettiStyles = document.createElement('style');
confettiStyles.textContent = `
  @keyframes confettiDrop {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
    }
    80% {
      opacity: 0.8;
    }
    100% {
      transform: translateY(100vh) rotate(720deg);
      opacity: 0;
    }
  }

  @keyframes float-particle {
    0% {
      transform: translate(0, 0) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translate(100px, -100px) rotate(360deg);
      opacity: 0;
    }
  }

  @keyframes shake {
    0%, 100% { transform: translateY(0); }
    25% { transform: translateY(-5px); }
    50% { transform: translateY(5px); }
    75% { transform: translateY(-5px); }
  }

  @keyframes bounce {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-10px);
    }
  }

  .animate-bounce {
    animation: bounce 0.6s ease infinite alternate;
  }

  .clicked {
    animation: shake 0.3s;
  }

  .particle {
    position: absolute;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    pointer-events: none;
    animation: float-particle linear infinite;
  }
`;
document.head.appendChild(confettiStyles);

// Initialize the particles.js
function initParticles(): void {
  if (typeof window.particlesJS !== 'undefined') {
    window.particlesJS('particles-js', {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: ['#FFC800', '#FF0000', '#00A2FF', '#02b84f']
        },
        shape: {
          type: ['circle', 'triangle', 'polygon'],
          stroke: {
            width: 0,
            color: '#000000'
          },
          polygon: {
            nb_sides: 5
          }
        },
        opacity: {
          value: 0.7,
          random: true,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 6,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: false
        },
        move: {
          enable: true,
          speed: 3,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'repulse'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1
            }
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8
          },
          repulse: {
            distance: 100,
            duration: 0.4
          },
          push: {
            particles_nb: 4
          },
          remove: {
            particles_nb: 2
          }
        }
      },
      retina_detect: true
    });
  }
}

// Function to add floating particles to elements
function addFloatingParticles(element: HTMLElement, count: number = 5): void {
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    // Random size between 5-15px
    const size = Math.floor(Math.random() * 10) + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Random position
    const posX = Math.floor(Math.random() * 100);
    const posY = Math.floor(Math.random() * 100);
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;

    // Random animation duration between 10-20s
    const duration = Math.floor(Math.random() * 10) + 10;
    particle.style.animationDuration = `${duration}s`;

    element.appendChild(particle);
  }
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM loaded, initializing components...");

  // Initialize countdown timer
  const countdownTimer = new CountdownTimer('hours', 'minutes', 'seconds');
  countdownTimer.start();

  // Initialize FAQ
  initializeFAQ();

  // Ensure all FAQ toggles start with '+'
  document.querySelectorAll('.faq-toggle').forEach(toggle => {
    toggle.textContent = '+';
  });

  // Try to initialize particles
  try {
    console.log("Initializing particles...");
    initParticles();
  } catch (error) {
    console.error("Error initializing particles:", error);
  }

  // Add particles to banner
  const banner = document.querySelector('.banner');
  if (banner) {
    addFloatingParticles(banner as HTMLElement, 8);
  }

  // Add click handler to button
  const ctaButton = document.querySelector('.cta-button');
  if (ctaButton) {
    console.log("Adding click handler to button...");
    ctaButton.addEventListener('click', () => {
      // Add animation class
      ctaButton.classList.add('clicked');

      // Create confetti effect
      console.log("Creating confetti...");
      createConfetti();

      // Remove clicked class after animation
      setTimeout(() => {
        ctaButton.classList.remove('clicked');
      }, 300);
    });
  }

  // Add hover effects to features
  const features = document.querySelectorAll('.feature');
  features.forEach(feature => {
    feature.addEventListener('mouseenter', () => {
      const icon = feature.querySelector('.feature-icon');
      if (icon) {
        icon.classList.add('animate-bounce');
      }
    });

    feature.addEventListener('mouseleave', () => {
      const icon = feature.querySelector('.feature-icon');
      if (icon) {
        icon.classList.remove('animate-bounce');
      }
    });
  });
});

// Add the particlesJS type definition
declare global {
  interface Window {
    particlesJS: (id: string, config: any) => void;
  }
}
