import { useEffect, useRef, useState } from 'react';

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [isAtTop, setIsAtTop] = useState(true);
  // Use a ref to track last scroll Y without triggering effect re-runs.
  // Using useState for lastScrollY caused the effect to re-run on every
  // scroll event (since lastScrollY changes every scroll), creating a
  // stale-closure bug where handleScroll always read the old value.
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsAtTop(currentScrollY < 10);

      if (currentScrollY > lastScrollYRef.current) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollDirection, isAtTop };
};
