import { useEffect, useState, useRef, RefObject } from 'react';

interface UseIntersectionObserverProps {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver<T extends Element>({
  root = null,
  rootMargin = '0px',
  threshold = 0,
  freezeOnceVisible = false,
}: UseIntersectionObserverProps = {}): {
  ref: RefObject<T>;
  isIntersecting: boolean;
} {
  const ref = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    
    const hasIOSupport = !!window.IntersectionObserver;
    if (!hasIOSupport) {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        
        if (freezeOnceVisible && entry.isIntersecting) {
          observer.unobserve(node);
        }
      },
      { root, rootMargin, threshold }
    );
    
    observer.observe(node);
    
    return () => {
      observer.disconnect();
    };
  }, [root, rootMargin, threshold, freezeOnceVisible]);

  return { ref, isIntersecting };
}
