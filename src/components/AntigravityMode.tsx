import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { useMatterEngine } from '../hooks/useMatterEngine';

interface PhysicsElement {
  element: HTMLElement;
  body: Matter.Body;
  originalPosition: { x: number; y: number };
  originalStyles: {
    position: string;
    transform: string;
    transition: string;
    zIndex: string;
  };
}

interface AntigravityModeProps {
  isActive: boolean;
}

const AntigravityMode: React.FC<AntigravityModeProps> = ({ isActive }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const physicsElementsRef = useRef<PhysicsElement[]>([]);
  const mouseConstraintRef = useRef<Matter.MouseConstraint | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isInitialized, setIsInitialized] = useState(false);

  const handleEngineReady = (engine: Matter.Engine, canvas: HTMLCanvasElement) => {
    const { World, Bodies, Mouse, MouseConstraint, Events } = Matter;

    const wallThickness = 50;
    const walls = [
      Bodies.rectangle(window.innerWidth / 2, -wallThickness / 2, window.innerWidth, wallThickness, {
        isStatic: true,
      }),
      Bodies.rectangle(window.innerWidth / 2, window.innerHeight + wallThickness / 2, window.innerWidth, wallThickness, {
        isStatic: true,
      }),
      Bodies.rectangle(-wallThickness / 2, window.innerHeight / 2, wallThickness, window.innerHeight, {
        isStatic: true,
      }),
      Bodies.rectangle(window.innerWidth + wallThickness / 2, window.innerHeight / 2, wallThickness, window.innerHeight, {
        isStatic: true,
      }),
    ];

    World.add(engine.world, walls);

    const targetSelectors = [
      '[data-physics="hero-title"]',
      '[data-physics="hero-subtitle"]',
      '[data-physics="cta-button-1"]',
      '[data-physics="cta-button-2"]',
      '[data-physics="stat-card-1"]',
      '[data-physics="stat-card-2"]',
      '[data-physics="stat-card-3"]',
    ];

    const physicsElements: PhysicsElement[] = [];

    targetSelectors.forEach((selector) => {
      const element = document.querySelector(selector) as HTMLElement;
      if (element) {
        const rect = element.getBoundingClientRect();
        const originalPosition = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };

        const originalStyles = {
          position: element.style.position || '',
          transform: element.style.transform || '',
          transition: element.style.transition || '',
          zIndex: element.style.zIndex || '',
        };

        const body = Bodies.rectangle(originalPosition.x, originalPosition.y, rect.width, rect.height, {
          restitution: 0.8,
          friction: 0.001,
          frictionAir: 0.01,
          density: 0.002,
        });

        World.add(engine.world, body);

        element.style.position = 'fixed';
        element.style.zIndex = '1001';
        element.style.transition = 'none';

        physicsElements.push({
          element,
          body,
          originalPosition,
          originalStyles,
        });
      }
    });

    physicsElementsRef.current = physicsElements;

    const mouse = Mouse.create(canvas);
    mouse.element.removeEventListener('mousewheel', mouse.mousewheel as any);
    mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel as any);

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
      },
    });

    mouseConstraintRef.current = mouseConstraint;
    World.add(engine.world, mouseConstraint);

    Events.on(engine, 'beforeUpdate', () => {
      physicsElements.forEach(({ body }) => {
        const dx = mouseRef.current.x - body.position.x;
        const dy = mouseRef.current.y - body.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const repulsionRadius = 150;

        if (distance < repulsionRadius && distance > 0 && !mouseConstraint.body) {
          const forceMagnitude = 0.0005 * (1 - distance / repulsionRadius);
          const forceX = (-dx / distance) * forceMagnitude * body.mass;
          const forceY = (-dy / distance) * forceMagnitude * body.mass;

          Matter.Body.applyForce(body, body.position, {
            x: forceX,
            y: forceY,
          });
        }
      });
    });

    Events.on(engine, 'afterUpdate', () => {
      physicsElements.forEach(({ element, body }) => {
        const angle = body.angle;
        element.style.transform = `translate(${body.position.x - element.offsetWidth / 2}px, ${
          body.position.y - element.offsetHeight / 2
        }px) rotate(${angle}rad)`;
      });
    });

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      Matter.Mouse.setPosition(mouse, { x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = (e: MouseEvent) => {
      Matter.Mouse.setButton(mouse, 0);
    };

    const handleMouseUp = () => {
      Matter.Mouse.clearSourceEvents(mouse);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    setIsInitialized(true);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  };

  const { engine } = useMatterEngine({
    enabled: isActive,
    onEngineReady: handleEngineReady,
    canvasRef,
  });

  useEffect(() => {
    if (!isActive && isInitialized) {
      physicsElementsRef.current.forEach(({ element, originalPosition, originalStyles }) => {
        element.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        element.style.transform = 'none';
        element.style.position = originalStyles.position || 'static';
        element.style.zIndex = originalStyles.zIndex || 'auto';

        setTimeout(() => {
          element.style.transition = originalStyles.transition;
        }, 600);
      });

      physicsElementsRef.current = [];
      setIsInitialized(false);
    }
  }, [isActive, isInitialized]);

  if (!isActive) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full"
      style={{
        zIndex: 1000,
        pointerEvents: 'none',
        background: 'transparent',
        opacity: 0,
      }}
    />
  );
};

export default AntigravityMode;
