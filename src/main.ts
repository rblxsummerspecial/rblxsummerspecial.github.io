function createConfetti() {
  const confettiContainer = document.getElementById("confetti-container");
  if (!confettiContainer) return;
  const colors = ["#FF0000", "#00A2FF", "#FFC800", "#02b84f", "#FFFFFF"];
  const shapes = ["circle", "square", "triangle"];
  for (let i = 0; i < 150; i++) {
    setTimeout(() => {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      const color = colors[Math.floor(Math.random() * colors.length)];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const size = Math.random() * 10 + 5;
      const left = Math.random() * 100;
      confetti.style.position = "absolute";
      confetti.style.backgroundColor = color;
      confetti.style.width = `${size}px`;
      confetti.style.height = `${size}px`;
      confetti.style.left = `${left}%`;
      confetti.style.top = "0";
      if (shape === "circle") {
        confetti.style.borderRadius = "50%";
      } else if (shape === "triangle") {
        confetti.style.width = "0";
        confetti.style.height = "0";
        confetti.style.backgroundColor = "transparent";
        confetti.style.borderLeft = `${size / 2}px solid transparent`;
        confetti.style.borderRight = `${size / 2}px solid transparent`;
        confetti.style.borderBottom = `${size}px solid ${color}`;
      }
      const duration = Math.random() * 3 + 2;
      const rotationStart = Math.random() * 360;
      confetti.style.animation = `confettiDrop ${duration}s ease-in forwards`;
      confetti.style.transform = `rotate(${rotationStart}deg)`;
      confettiContainer.appendChild(confetti);
      setTimeout(() => {
        if (confettiContainer.contains(confetti)) {
          confettiContainer.removeChild(confetti);
        }
      }, duration * 1e3);
    }, i * 10);
  }
}
class CountdownTimer {
  endTime;
  hoursElement;
  minutesElement;
  secondsElement;
  intervalId = null;
  constructor(hoursId, minutesId, secondsId, hoursToAdd = 24) {
    this.hoursElement = document.getElementById(hoursId);
    this.minutesElement = document.getElementById(minutesId);
    this.secondsElement = document.getElementById(secondsId);
    this.endTime = /* @__PURE__ */ new Date();
    this.endTime.setHours(this.endTime.getHours() + hoursToAdd);
  }
  start() {
    this.updateDisplay();
    this.intervalId = window.setInterval(() => {
      this.updateDisplay();
    }, 1e3);
  }
  updateDisplay() {
    const now = /* @__PURE__ */ new Date();
    const diff = Math.max(0, this.endTime.getTime() - now.getTime());
    const hours = Math.floor(diff / (1e3 * 60 * 60));
    const minutes = Math.floor(diff % (1e3 * 60 * 60) / (1e3 * 60));
    const seconds = Math.floor(diff % (1e3 * 60) / 1e3);
    if (this.hoursElement) {
      this.hoursElement.textContent = hours.toString().padStart(2, "0");
    }
    if (this.minutesElement) {
      this.minutesElement.textContent = minutes.toString().padStart(2, "0");
    }
    if (this.secondsElement) {
      this.secondsElement.textContent = seconds.toString().padStart(2, "0");
    }
    if (diff === 0 && this.intervalId !== null) {
      clearInterval(this.intervalId);
    }
  }
}
function initializeFAQ() {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    if (question) {
      question.addEventListener("click", () => {
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("active");
          }
        });
        item.classList.toggle("active");
      });
    }
  });
}
const confettiStyles = document.createElement("style");
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
function initParticles() {
  if (typeof window.particlesJS !== "undefined") {
    window.particlesJS("particles-js", {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: ["#FFC800", "#FF0000", "#00A2FF", "#02b84f"]
        },
        shape: {
          type: ["circle", "triangle", "polygon"],
          stroke: {
            width: 0,
            color: "#000000"
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
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "repulse"
          },
          onclick: {
            enable: true,
            mode: "push"
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
function addFloatingParticles(element, count = 5) {
  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    const size = Math.floor(Math.random() * 10) + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    const posX = Math.floor(Math.random() * 100);
    const posY = Math.floor(Math.random() * 100);
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    const duration = Math.floor(Math.random() * 10) + 10;
    particle.style.animationDuration = `${duration}s`;
    element.appendChild(particle);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, initializing components...");
  const countdownTimer = new CountdownTimer("hours", "minutes", "seconds");
  countdownTimer.start();
  initializeFAQ();
  try {
    console.log("Initializing particles...");
    initParticles();
  } catch (error) {
    console.error("Error initializing particles:", error);
  }
  const banner = document.querySelector(".banner");
  if (banner) {
    addFloatingParticles(banner, 8);
  }
  const ctaButton = document.querySelector(".cta-button");
  if (ctaButton) {
    console.log("Adding click handler to button...");
    ctaButton.addEventListener("click", () => {
      ctaButton.classList.add("clicked");
      console.log("Creating confetti...");
      createConfetti();
      setTimeout(() => {
        ctaButton.classList.remove("clicked");
      }, 300);
    });
  }
  const features = document.querySelectorAll(".feature");
  features.forEach((feature) => {
    feature.addEventListener("mouseenter", () => {
      const icon = feature.querySelector(".feature-icon");
      if (icon) {
        icon.classList.add("animate-bounce");
      }
    });
    feature.addEventListener("mouseleave", () => {
      const icon = feature.querySelector(".feature-icon");
      if (icon) {
        icon.classList.remove("animate-bounce");
      }
    });
  });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBNYW51YWwgaW1wbGVtZW50YXRpb24gb2YgY29uZmV0dGlcbiAqL1xuZnVuY3Rpb24gY3JlYXRlQ29uZmV0dGkoKTogdm9pZCB7XG4gIGNvbnN0IGNvbmZldHRpQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbmZldHRpLWNvbnRhaW5lcicpO1xuICBpZiAoIWNvbmZldHRpQ29udGFpbmVyKSByZXR1cm47XG5cbiAgY29uc3QgY29sb3JzID0gWycjRkYwMDAwJywgJyMwMEEyRkYnLCAnI0ZGQzgwMCcsICcjMDJiODRmJywgJyNGRkZGRkYnXTtcbiAgY29uc3Qgc2hhcGVzID0gWydjaXJjbGUnLCAnc3F1YXJlJywgJ3RyaWFuZ2xlJ107XG5cbiAgLy8gQ3JlYXRlIDE1MCBwaWVjZXMgb2YgY29uZmV0dGlcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNTA7IGkrKykge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29uc3QgY29uZmV0dGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNvbmZldHRpLmNsYXNzTmFtZSA9ICdjb25mZXR0aSc7XG5cbiAgICAgIC8vIFJhbmRvbSBwcm9wZXJ0aWVzXG4gICAgICBjb25zdCBjb2xvciA9IGNvbG9yc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjb2xvcnMubGVuZ3RoKV07XG4gICAgICBjb25zdCBzaGFwZSA9IHNoYXBlc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzaGFwZXMubGVuZ3RoKV07XG4gICAgICBjb25zdCBzaXplID0gTWF0aC5yYW5kb20oKSAqIDEwICsgNTsgLy8gNS0xNXB4XG4gICAgICBjb25zdCBsZWZ0ID0gTWF0aC5yYW5kb20oKSAqIDEwMDsgLy8gMC0xMDAlXG5cbiAgICAgIC8vIFNldCBzdHlsZXNcbiAgICAgIGNvbmZldHRpLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgIGNvbmZldHRpLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yO1xuICAgICAgY29uZmV0dGkuc3R5bGUud2lkdGggPSBgJHtzaXplfXB4YDtcbiAgICAgIGNvbmZldHRpLnN0eWxlLmhlaWdodCA9IGAke3NpemV9cHhgO1xuICAgICAgY29uZmV0dGkuc3R5bGUubGVmdCA9IGAke2xlZnR9JWA7XG4gICAgICBjb25mZXR0aS5zdHlsZS50b3AgPSAnMCc7XG5cbiAgICAgIC8vIFNldCBzaGFwZVxuICAgICAgaWYgKHNoYXBlID09PSAnY2lyY2xlJykge1xuICAgICAgICBjb25mZXR0aS5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnNTAlJztcbiAgICAgIH0gZWxzZSBpZiAoc2hhcGUgPT09ICd0cmlhbmdsZScpIHtcbiAgICAgICAgY29uZmV0dGkuc3R5bGUud2lkdGggPSAnMCc7XG4gICAgICAgIGNvbmZldHRpLnN0eWxlLmhlaWdodCA9ICcwJztcbiAgICAgICAgY29uZmV0dGkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3RyYW5zcGFyZW50JztcbiAgICAgICAgY29uZmV0dGkuc3R5bGUuYm9yZGVyTGVmdCA9IGAke3NpemUgLyAyfXB4IHNvbGlkIHRyYW5zcGFyZW50YDtcbiAgICAgICAgY29uZmV0dGkuc3R5bGUuYm9yZGVyUmlnaHQgPSBgJHtzaXplIC8gMn1weCBzb2xpZCB0cmFuc3BhcmVudGA7XG4gICAgICAgIGNvbmZldHRpLnN0eWxlLmJvcmRlckJvdHRvbSA9IGAke3NpemV9cHggc29saWQgJHtjb2xvcn1gO1xuICAgICAgfVxuXG4gICAgICAvLyBBZGQgYW5pbWF0aW9uXG4gICAgICBjb25zdCBkdXJhdGlvbiA9IE1hdGgucmFuZG9tKCkgKiAzICsgMjsgLy8gMi01c1xuICAgICAgY29uc3Qgcm90YXRpb25TdGFydCA9IE1hdGgucmFuZG9tKCkgKiAzNjA7XG5cbiAgICAgIGNvbmZldHRpLnN0eWxlLmFuaW1hdGlvbiA9IGBjb25mZXR0aURyb3AgJHtkdXJhdGlvbn1zIGVhc2UtaW4gZm9yd2FyZHNgO1xuICAgICAgY29uZmV0dGkuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZSgke3JvdGF0aW9uU3RhcnR9ZGVnKWA7XG5cbiAgICAgIC8vIEFkZCB0byBjb250YWluZXJcbiAgICAgIGNvbmZldHRpQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbmZldHRpKTtcblxuICAgICAgLy8gUmVtb3ZlIGFmdGVyIGFuaW1hdGlvblxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmIChjb25mZXR0aUNvbnRhaW5lci5jb250YWlucyhjb25mZXR0aSkpIHtcbiAgICAgICAgICBjb25mZXR0aUNvbnRhaW5lci5yZW1vdmVDaGlsZChjb25mZXR0aSk7XG4gICAgICAgIH1cbiAgICAgIH0sIGR1cmF0aW9uICogMTAwMCk7XG4gICAgfSwgaSAqIDEwKTsgLy8gU3RhZ2dlciBjcmVhdGlvblxuICB9XG59XG5cbi8vIENvdW50ZG93biB0aW1lciBmdW5jdGlvbmFsaXR5XG5jbGFzcyBDb3VudGRvd25UaW1lciB7XG4gIHByaXZhdGUgZW5kVGltZTogRGF0ZTtcbiAgcHJpdmF0ZSBob3Vyc0VsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgcHJpdmF0ZSBtaW51dGVzRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsO1xuICBwcml2YXRlIHNlY29uZHNFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGw7XG4gIHByaXZhdGUgaW50ZXJ2YWxJZDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoaG91cnNJZDogc3RyaW5nLCBtaW51dGVzSWQ6IHN0cmluZywgc2Vjb25kc0lkOiBzdHJpbmcsIGhvdXJzVG9BZGQgPSAyNCkge1xuICAgIHRoaXMuaG91cnNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaG91cnNJZCk7XG4gICAgdGhpcy5taW51dGVzRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG1pbnV0ZXNJZCk7XG4gICAgdGhpcy5zZWNvbmRzRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlY29uZHNJZCk7XG5cbiAgICAvLyBTZXQgZW5kIHRpbWUgdG8gY3VycmVudCB0aW1lICsgaG91cnNUb0FkZFxuICAgIHRoaXMuZW5kVGltZSA9IG5ldyBEYXRlKCk7XG4gICAgdGhpcy5lbmRUaW1lLnNldEhvdXJzKHRoaXMuZW5kVGltZS5nZXRIb3VycygpICsgaG91cnNUb0FkZCk7XG4gIH1cblxuICBzdGFydCgpOiB2b2lkIHtcbiAgICAvLyBJbml0aWFsIHVwZGF0ZVxuICAgIHRoaXMudXBkYXRlRGlzcGxheSgpO1xuXG4gICAgLy8gVXBkYXRlIGV2ZXJ5IHNlY29uZFxuICAgIHRoaXMuaW50ZXJ2YWxJZCA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICB0aGlzLnVwZGF0ZURpc3BsYXkoKTtcbiAgICB9LCAxMDAwKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlRGlzcGxheSgpOiB2b2lkIHtcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IGRpZmYgPSBNYXRoLm1heCgwLCB0aGlzLmVuZFRpbWUuZ2V0VGltZSgpIC0gbm93LmdldFRpbWUoKSk7XG5cbiAgICAvLyBDYWxjdWxhdGUgaG91cnMsIG1pbnV0ZXMsIHNlY29uZHNcbiAgICBjb25zdCBob3VycyA9IE1hdGguZmxvb3IoZGlmZiAvICgxMDAwICogNjAgKiA2MCkpO1xuICAgIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKChkaWZmICUgKDEwMDAgKiA2MCAqIDYwKSkgLyAoMTAwMCAqIDYwKSk7XG4gICAgY29uc3Qgc2Vjb25kcyA9IE1hdGguZmxvb3IoKGRpZmYgJSAoMTAwMCAqIDYwKSkgLyAxMDAwKTtcblxuICAgIC8vIFVwZGF0ZSBlbGVtZW50c1xuICAgIGlmICh0aGlzLmhvdXJzRWxlbWVudCkge1xuICAgICAgdGhpcy5ob3Vyc0VsZW1lbnQudGV4dENvbnRlbnQgPSBob3Vycy50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLm1pbnV0ZXNFbGVtZW50KSB7XG4gICAgICB0aGlzLm1pbnV0ZXNFbGVtZW50LnRleHRDb250ZW50ID0gbWludXRlcy50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLnNlY29uZHNFbGVtZW50KSB7XG4gICAgICB0aGlzLnNlY29uZHNFbGVtZW50LnRleHRDb250ZW50ID0gc2Vjb25kcy50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyk7XG4gICAgfVxuXG4gICAgLy8gU3RvcCBpZiBjb3VudGRvd24gZmluaXNoZWRcbiAgICBpZiAoZGlmZiA9PT0gMCAmJiB0aGlzLmludGVydmFsSWQgIT09IG51bGwpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbElkKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gRkFRIHRvZ2dsZSBmdW5jdGlvbmFsaXR5XG5mdW5jdGlvbiBpbml0aWFsaXplRkFRKCk6IHZvaWQge1xuICBjb25zdCBmYXFJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5mYXEtaXRlbScpO1xuXG4gIGZhcUl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgY29uc3QgcXVlc3Rpb24gPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5mYXEtcXVlc3Rpb24nKTtcbiAgICBpZiAocXVlc3Rpb24pIHtcbiAgICAgIHF1ZXN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAvLyBDbG9zZSBhbGwgb3RoZXIgRkFRIGl0ZW1zXG4gICAgICAgIGZhcUl0ZW1zLmZvckVhY2gob3RoZXJJdGVtID0+IHtcbiAgICAgICAgICBpZiAob3RoZXJJdGVtICE9PSBpdGVtKSB7XG4gICAgICAgICAgICBvdGhlckl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBUb2dnbGUgY3VycmVudCBpdGVtXG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xufVxuXG4vLyBBZGQgY29uZmV0dGkgYW5pbWF0aW9uIHN0eWxlc1xuY29uc3QgY29uZmV0dGlTdHlsZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuY29uZmV0dGlTdHlsZXMudGV4dENvbnRlbnQgPSBgXG4gIEBrZXlmcmFtZXMgY29uZmV0dGlEcm9wIHtcbiAgICAwJSB7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCkgcm90YXRlKDBkZWcpO1xuICAgICAgb3BhY2l0eTogMTtcbiAgICB9XG4gICAgODAlIHtcbiAgICAgIG9wYWNpdHk6IDAuODtcbiAgICB9XG4gICAgMTAwJSB7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMTAwdmgpIHJvdGF0ZSg3MjBkZWcpO1xuICAgICAgb3BhY2l0eTogMDtcbiAgICB9XG4gIH1cblxuICBAa2V5ZnJhbWVzIGZsb2F0LXBhcnRpY2xlIHtcbiAgICAwJSB7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAwKSByb3RhdGUoMGRlZyk7XG4gICAgICBvcGFjaXR5OiAwO1xuICAgIH1cbiAgICAxMCUge1xuICAgICAgb3BhY2l0eTogMTtcbiAgICB9XG4gICAgOTAlIHtcbiAgICAgIG9wYWNpdHk6IDE7XG4gICAgfVxuICAgIDEwMCUge1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMTAwcHgsIC0xMDBweCkgcm90YXRlKDM2MGRlZyk7XG4gICAgICBvcGFjaXR5OiAwO1xuICAgIH1cbiAgfVxuXG4gIEBrZXlmcmFtZXMgc2hha2Uge1xuICAgIDAlLCAxMDAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApOyB9XG4gICAgMjUlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01cHgpOyB9XG4gICAgNTAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDVweCk7IH1cbiAgICA3NSUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTVweCk7IH1cbiAgfVxuXG4gIEBrZXlmcmFtZXMgYm91bmNlIHtcbiAgICAwJSB7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gICAgfVxuICAgIDEwMCUge1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMHB4KTtcbiAgICB9XG4gIH1cblxuICAuYW5pbWF0ZS1ib3VuY2Uge1xuICAgIGFuaW1hdGlvbjogYm91bmNlIDAuNnMgZWFzZSBpbmZpbml0ZSBhbHRlcm5hdGU7XG4gIH1cblxuICAuY2xpY2tlZCB7XG4gICAgYW5pbWF0aW9uOiBzaGFrZSAwLjNzO1xuICB9XG5cbiAgLnBhcnRpY2xlIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjgpO1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICBhbmltYXRpb246IGZsb2F0LXBhcnRpY2xlIGxpbmVhciBpbmZpbml0ZTtcbiAgfVxuYDtcbmRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoY29uZmV0dGlTdHlsZXMpO1xuXG4vLyBJbml0aWFsaXplIHRoZSBwYXJ0aWNsZXMuanNcbmZ1bmN0aW9uIGluaXRQYXJ0aWNsZXMoKTogdm9pZCB7XG4gIGlmICh0eXBlb2Ygd2luZG93LnBhcnRpY2xlc0pTICE9PSAndW5kZWZpbmVkJykge1xuICAgIHdpbmRvdy5wYXJ0aWNsZXNKUygncGFydGljbGVzLWpzJywge1xuICAgICAgcGFydGljbGVzOiB7XG4gICAgICAgIG51bWJlcjoge1xuICAgICAgICAgIHZhbHVlOiA4MCxcbiAgICAgICAgICBkZW5zaXR5OiB7XG4gICAgICAgICAgICBlbmFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZV9hcmVhOiA4MDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNvbG9yOiB7XG4gICAgICAgICAgdmFsdWU6IFsnI0ZGQzgwMCcsICcjRkYwMDAwJywgJyMwMEEyRkYnLCAnIzAyYjg0ZiddXG4gICAgICAgIH0sXG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgdHlwZTogWydjaXJjbGUnLCAndHJpYW5nbGUnLCAncG9seWdvbiddLFxuICAgICAgICAgIHN0cm9rZToge1xuICAgICAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgICAgICBjb2xvcjogJyMwMDAwMDAnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBwb2x5Z29uOiB7XG4gICAgICAgICAgICBuYl9zaWRlczogNVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb3BhY2l0eToge1xuICAgICAgICAgIHZhbHVlOiAwLjcsXG4gICAgICAgICAgcmFuZG9tOiB0cnVlLFxuICAgICAgICAgIGFuaW06IHtcbiAgICAgICAgICAgIGVuYWJsZTogZmFsc2UsXG4gICAgICAgICAgICBzcGVlZDogMSxcbiAgICAgICAgICAgIG9wYWNpdHlfbWluOiAwLjEsXG4gICAgICAgICAgICBzeW5jOiBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc2l6ZToge1xuICAgICAgICAgIHZhbHVlOiA2LFxuICAgICAgICAgIHJhbmRvbTogdHJ1ZSxcbiAgICAgICAgICBhbmltOiB7XG4gICAgICAgICAgICBlbmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgc3BlZWQ6IDQwLFxuICAgICAgICAgICAgc2l6ZV9taW46IDAuMSxcbiAgICAgICAgICAgIHN5bmM6IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBsaW5lX2xpbmtlZDoge1xuICAgICAgICAgIGVuYWJsZTogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAgbW92ZToge1xuICAgICAgICAgIGVuYWJsZTogdHJ1ZSxcbiAgICAgICAgICBzcGVlZDogMyxcbiAgICAgICAgICBkaXJlY3Rpb246ICdub25lJyxcbiAgICAgICAgICByYW5kb206IHRydWUsXG4gICAgICAgICAgc3RyYWlnaHQ6IGZhbHNlLFxuICAgICAgICAgIG91dF9tb2RlOiAnb3V0JyxcbiAgICAgICAgICBib3VuY2U6IGZhbHNlLFxuICAgICAgICAgIGF0dHJhY3Q6IHtcbiAgICAgICAgICAgIGVuYWJsZTogZmFsc2UsXG4gICAgICAgICAgICByb3RhdGVYOiA2MDAsXG4gICAgICAgICAgICByb3RhdGVZOiAxMjAwXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaW50ZXJhY3Rpdml0eToge1xuICAgICAgICBkZXRlY3Rfb246ICdjYW52YXMnLFxuICAgICAgICBldmVudHM6IHtcbiAgICAgICAgICBvbmhvdmVyOiB7XG4gICAgICAgICAgICBlbmFibGU6IHRydWUsXG4gICAgICAgICAgICBtb2RlOiAncmVwdWxzZSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uY2xpY2s6IHtcbiAgICAgICAgICAgIGVuYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIG1vZGU6ICdwdXNoJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVzaXplOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIG1vZGVzOiB7XG4gICAgICAgICAgZ3JhYjoge1xuICAgICAgICAgICAgZGlzdGFuY2U6IDQwMCxcbiAgICAgICAgICAgIGxpbmVfbGlua2VkOiB7XG4gICAgICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGJ1YmJsZToge1xuICAgICAgICAgICAgZGlzdGFuY2U6IDQwMCxcbiAgICAgICAgICAgIHNpemU6IDQwLFxuICAgICAgICAgICAgZHVyYXRpb246IDIsXG4gICAgICAgICAgICBvcGFjaXR5OiA4XG4gICAgICAgICAgfSxcbiAgICAgICAgICByZXB1bHNlOiB7XG4gICAgICAgICAgICBkaXN0YW5jZTogMTAwLFxuICAgICAgICAgICAgZHVyYXRpb246IDAuNFxuICAgICAgICAgIH0sXG4gICAgICAgICAgcHVzaDoge1xuICAgICAgICAgICAgcGFydGljbGVzX25iOiA0XG4gICAgICAgICAgfSxcbiAgICAgICAgICByZW1vdmU6IHtcbiAgICAgICAgICAgIHBhcnRpY2xlc19uYjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHJldGluYV9kZXRlY3Q6IHRydWVcbiAgICB9KTtcbiAgfVxufVxuXG4vLyBGdW5jdGlvbiB0byBhZGQgZmxvYXRpbmcgcGFydGljbGVzIHRvIGVsZW1lbnRzXG5mdW5jdGlvbiBhZGRGbG9hdGluZ1BhcnRpY2xlcyhlbGVtZW50OiBIVE1MRWxlbWVudCwgY291bnQ6IG51bWJlciA9IDUpOiB2b2lkIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgY29uc3QgcGFydGljbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwYXJ0aWNsZS5jbGFzc0xpc3QuYWRkKCdwYXJ0aWNsZScpO1xuXG4gICAgLy8gUmFuZG9tIHNpemUgYmV0d2VlbiA1LTE1cHhcbiAgICBjb25zdCBzaXplID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgNTtcbiAgICBwYXJ0aWNsZS5zdHlsZS53aWR0aCA9IGAke3NpemV9cHhgO1xuICAgIHBhcnRpY2xlLnN0eWxlLmhlaWdodCA9IGAke3NpemV9cHhgO1xuXG4gICAgLy8gUmFuZG9tIHBvc2l0aW9uXG4gICAgY29uc3QgcG9zWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCk7XG4gICAgY29uc3QgcG9zWSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCk7XG4gICAgcGFydGljbGUuc3R5bGUubGVmdCA9IGAke3Bvc1h9JWA7XG4gICAgcGFydGljbGUuc3R5bGUudG9wID0gYCR7cG9zWX0lYDtcblxuICAgIC8vIFJhbmRvbSBhbmltYXRpb24gZHVyYXRpb24gYmV0d2VlbiAxMC0yMHNcbiAgICBjb25zdCBkdXJhdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDEwO1xuICAgIHBhcnRpY2xlLnN0eWxlLmFuaW1hdGlvbkR1cmF0aW9uID0gYCR7ZHVyYXRpb259c2A7XG5cbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKHBhcnRpY2xlKTtcbiAgfVxufVxuXG4vLyBXYWl0IGZvciB0aGUgRE9NIHRvIGJlIGZ1bGx5IGxvYWRlZFxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgY29uc29sZS5sb2coXCJET00gbG9hZGVkLCBpbml0aWFsaXppbmcgY29tcG9uZW50cy4uLlwiKTtcblxuICAvLyBJbml0aWFsaXplIGNvdW50ZG93biB0aW1lclxuICBjb25zdCBjb3VudGRvd25UaW1lciA9IG5ldyBDb3VudGRvd25UaW1lcignaG91cnMnLCAnbWludXRlcycsICdzZWNvbmRzJyk7XG4gIGNvdW50ZG93blRpbWVyLnN0YXJ0KCk7XG5cbiAgLy8gSW5pdGlhbGl6ZSBGQVFcbiAgaW5pdGlhbGl6ZUZBUSgpO1xuXG4gIC8vIFRyeSB0byBpbml0aWFsaXplIHBhcnRpY2xlc1xuICB0cnkge1xuICAgIGNvbnNvbGUubG9nKFwiSW5pdGlhbGl6aW5nIHBhcnRpY2xlcy4uLlwiKTtcbiAgICBpbml0UGFydGljbGVzKCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGluaXRpYWxpemluZyBwYXJ0aWNsZXM6XCIsIGVycm9yKTtcbiAgfVxuXG4gIC8vIEFkZCBwYXJ0aWNsZXMgdG8gYmFubmVyXG4gIGNvbnN0IGJhbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYW5uZXInKTtcbiAgaWYgKGJhbm5lcikge1xuICAgIGFkZEZsb2F0aW5nUGFydGljbGVzKGJhbm5lciBhcyBIVE1MRWxlbWVudCwgOCk7XG4gIH1cblxuICAvLyBBZGQgY2xpY2sgaGFuZGxlciB0byBidXR0b25cbiAgY29uc3QgY3RhQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmN0YS1idXR0b24nKTtcbiAgaWYgKGN0YUJ1dHRvbikge1xuICAgIGNvbnNvbGUubG9nKFwiQWRkaW5nIGNsaWNrIGhhbmRsZXIgdG8gYnV0dG9uLi4uXCIpO1xuICAgIGN0YUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIC8vIEFkZCBhbmltYXRpb24gY2xhc3NcbiAgICAgIGN0YUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdjbGlja2VkJyk7XG5cbiAgICAgIC8vIENyZWF0ZSBjb25mZXR0aSBlZmZlY3RcbiAgICAgIGNvbnNvbGUubG9nKFwiQ3JlYXRpbmcgY29uZmV0dGkuLi5cIik7XG4gICAgICBjcmVhdGVDb25mZXR0aSgpO1xuXG4gICAgICAvLyBSZW1vdmUgY2xpY2tlZCBjbGFzcyBhZnRlciBhbmltYXRpb25cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjdGFCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnY2xpY2tlZCcpO1xuICAgICAgfSwgMzAwKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIEFkZCBob3ZlciBlZmZlY3RzIHRvIGZlYXR1cmVzXG4gIGNvbnN0IGZlYXR1cmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZlYXR1cmUnKTtcbiAgZmVhdHVyZXMuZm9yRWFjaChmZWF0dXJlID0+IHtcbiAgICBmZWF0dXJlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoKSA9PiB7XG4gICAgICBjb25zdCBpY29uID0gZmVhdHVyZS5xdWVyeVNlbGVjdG9yKCcuZmVhdHVyZS1pY29uJyk7XG4gICAgICBpZiAoaWNvbikge1xuICAgICAgICBpY29uLmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGUtYm91bmNlJyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBmZWF0dXJlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgICBjb25zdCBpY29uID0gZmVhdHVyZS5xdWVyeVNlbGVjdG9yKCcuZmVhdHVyZS1pY29uJyk7XG4gICAgICBpZiAoaWNvbikge1xuICAgICAgICBpY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2FuaW1hdGUtYm91bmNlJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufSk7XG5cbi8vIEFkZCB0aGUgcGFydGljbGVzSlMgdHlwZSBkZWZpbml0aW9uXG5kZWNsYXJlIGdsb2JhbCB7XG4gIGludGVyZmFjZSBXaW5kb3cge1xuICAgIHBhcnRpY2xlc0pTOiAoaWQ6IHN0cmluZywgY29uZmlnOiBhbnkpID0+IHZvaWQ7XG4gIH1cbn1cbiJdLCJtYXBwaW5ncyI6IkFBR0EsU0FBUyxpQkFBdUI7QUFDOUIsUUFBTSxvQkFBb0IsU0FBUyxlQUFlLG9CQUFvQjtBQUN0RSxNQUFJLENBQUMsa0JBQW1CO0FBRXhCLFFBQU0sU0FBUyxDQUFDLFdBQVcsV0FBVyxXQUFXLFdBQVcsU0FBUztBQUNyRSxRQUFNLFNBQVMsQ0FBQyxVQUFVLFVBQVUsVUFBVTtBQUc5QyxXQUFTLElBQUksR0FBRyxJQUFJLEtBQUssS0FBSztBQUM1QixlQUFXLE1BQU07QUFDZixZQUFNLFdBQVcsU0FBUyxjQUFjLEtBQUs7QUFDN0MsZUFBUyxZQUFZO0FBR3JCLFlBQU0sUUFBUSxPQUFPLEtBQUssTUFBTSxLQUFLLE9BQU8sSUFBSSxPQUFPLE1BQU0sQ0FBQztBQUM5RCxZQUFNLFFBQVEsT0FBTyxLQUFLLE1BQU0sS0FBSyxPQUFPLElBQUksT0FBTyxNQUFNLENBQUM7QUFDOUQsWUFBTSxPQUFPLEtBQUssT0FBTyxJQUFJLEtBQUs7QUFDbEMsWUFBTSxPQUFPLEtBQUssT0FBTyxJQUFJO0FBRzdCLGVBQVMsTUFBTSxXQUFXO0FBQzFCLGVBQVMsTUFBTSxrQkFBa0I7QUFDakMsZUFBUyxNQUFNLFFBQVEsR0FBRyxJQUFJO0FBQzlCLGVBQVMsTUFBTSxTQUFTLEdBQUcsSUFBSTtBQUMvQixlQUFTLE1BQU0sT0FBTyxHQUFHLElBQUk7QUFDN0IsZUFB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