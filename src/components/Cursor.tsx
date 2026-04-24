import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    let rafId: number;

    const createParticle = (x: number, y: number) => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      document.body.appendChild(particle);
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 50 + 20;
      gsap.to(particle, {
        x: Math.cos(angle) * velocity,
        y: Math.sin(angle) * velocity,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => particle.remove(),
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (Math.random() > 0.7) createParticle(e.clientX, e.clientY);
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      cursor.style.left = cursorX - 10 + 'px';
      cursor.style.top = cursorY - 10 + 'px';
      follower.style.left = followerX - 20 + 'px';
      follower.style.top = followerY - 20 + 'px';
      rafId = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMouseMove);
    rafId = requestAnimationFrame(animate);

    const interactiveEls = document.querySelectorAll('a, button, .project-card, .timeline-content');
    const onEnter = () => {
      cursor.style.transform = 'scale(1.5)';
      follower.style.transform = 'scale(1.5)';
    };
    const onLeave = () => {
      cursor.style.transform = 'scale(1)';
      follower.style.transform = 'scale(1)';
    };
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
      interactiveEls.forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-follower" ref={followerRef} />
    </>
  );
}
