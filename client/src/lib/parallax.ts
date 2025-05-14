import { useRef } from 'react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

export function useParallax<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const { isIntersecting } = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 0,
  });

  if (typeof window !== 'undefined' && ref.current && isIntersecting) {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const scrollPosition = window.scrollY;
      const elementTop = ref.current.offsetTop;
      const elementHeight = ref.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Only apply parallax if the element is in the viewport
      if (
        scrollPosition + viewportHeight > elementTop &&
        scrollPosition < elementTop + elementHeight
      ) {
        // Calculate how far the element is from the top of the viewport
        const distanceFromTop = scrollPosition + viewportHeight - elementTop;
        // Calculate the parallax offset (slower movement than normal scroll)
        const parallaxOffset = distanceFromTop * 0.3;
        
        ref.current.style.backgroundPositionY = `calc(50% + ${parallaxOffset}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial positioning
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }

  return { ref };
}
