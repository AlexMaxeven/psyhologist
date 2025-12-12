import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const calculateSpotlightValues = radius => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75
});

const updateCardGlowProperties = (card, mouseX, mouseY, glow, radius) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;
  card.style.setProperty('--glow-x', `${relativeX}%`);
  card.style.setProperty('--glow-y', `${relativeY}%`);
  card.style.setProperty('--glow-intensity', glow.toString());
  card.style.setProperty('--glow-radius', `${radius}px`);
};

export const GlobalSpotlight = ({
  gridRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = 300,
  glowColor = '0, 255, 136'
}) => {
  const spotlightRef = useRef(null);
  const isInsideSection = useRef(false);

  useEffect(() => {
    if (disableAnimations || !enabled) return;
    
    // Чекаємо поки gridRef буде готовий
    const checkAndInit = () => {
      if (!gridRef?.current) {
        setTimeout(checkAndInit, 50);
        return;
      }
      
      initializeSpotlight();
    };
    
    checkAndInit();
    
    function initializeSpotlight() {
      if (!gridRef?.current) return;

      const spotlight = document.createElement('div');
      spotlight.className = 'global-spotlight';
      spotlight.style.cssText = `
        position: fixed;
        width: 800px;
        height: 800px;
        border-radius: 50%;
        pointer-events: none;
        background: radial-gradient(circle,
          rgba(${glowColor}, 0.15) 0%,
          rgba(${glowColor}, 0.08) 15%,
          rgba(${glowColor}, 0.04) 25%,
          rgba(${glowColor}, 0.02) 40%,
          rgba(${glowColor}, 0.01) 65%,
          transparent 70%
        );
        z-index: 200;
        opacity: 0;
        transform: translate(-50%, -50%);
        mix-blend-mode: screen;
      `;
      document.body.appendChild(spotlight);
      spotlightRef.current = spotlight;

      let rafId = null;
      const handleMouseMove = e => {
        if (rafId) return;
        
        rafId = requestAnimationFrame(() => {
          rafId = null;
          if (!spotlightRef.current || !gridRef.current) return;

          const section = gridRef.current.closest('.bento-section') || gridRef.current;
          const rect = section?.getBoundingClientRect();
          const mouseInside =
            rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

          isInsideSection.current = mouseInside || false;

          const cards = gridRef.current.querySelectorAll('.borderGlow');

          if (!mouseInside) {
            gsap.to(spotlightRef.current, {
              opacity: 0,
              duration: 0.3,
              ease: 'power2.out'
            });
            cards.forEach(card => {
              card.style.setProperty('--glow-intensity', '0');
            });
            return;
          }

          const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
          let minDistance = Infinity;

          cards.forEach(card => {
            const cardElement = card;
            const cardRect = cardElement.getBoundingClientRect();
            const centerX = cardRect.left + cardRect.width / 2;
            const centerY = cardRect.top + cardRect.height / 2;
            const distance =
              Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
            const effectiveDistance = Math.max(0, distance);
            minDistance = Math.min(minDistance, effectiveDistance);

            let glowIntensity = 0;
            if (effectiveDistance <= proximity) {
              glowIntensity = 1;
            } else if (effectiveDistance <= fadeDistance) {
              glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
            }

            updateCardGlowProperties(cardElement, e.clientX, e.clientY, glowIntensity, spotlightRadius);
          });

          gsap.to(spotlightRef.current, {
            left: e.clientX,
            top: e.clientY,
            duration: 0.1,
            ease: 'power2.out'
          });

          const targetOpacity =
            minDistance <= proximity
              ? 0.8
              : minDistance <= fadeDistance
                ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
                : 0;

          gsap.to(spotlightRef.current, {
            opacity: targetOpacity,
            duration: targetOpacity > 0 ? 0.2 : 0.5,
            ease: 'power2.out'
          });
        });
      };

      const handleMouseLeave = () => {
        isInsideSection.current = false;
        gridRef.current?.querySelectorAll('.borderGlow').forEach(card => {
          card.style.setProperty('--glow-intensity', '0');
        });
        if (spotlightRef.current) {
          gsap.to(spotlightRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      };

      document.addEventListener('mousemove', handleMouseMove, { passive: true });
      document.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseleave', handleMouseLeave);
        spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
      };
    }
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};
