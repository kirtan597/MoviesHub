import React, { useEffect, useRef } from 'react';

const StarCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let animationId: number;

    const updateCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      if (cursorRef.current) {
        cursorRef.current.style.left = mouseX + 'px';
        cursorRef.current.style.top = mouseY + 'px';
      }
      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', updateCursor, { passive: true });
    animate();

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <div ref={cursorRef} className="star-cursor" />;
};

export default StarCursor;