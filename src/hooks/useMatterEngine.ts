import { useEffect, useRef } from 'react';
import Matter from 'matter-js';

interface UseMatterEngineOptions {
  enabled: boolean;
  onEngineReady?: (engine: Matter.Engine, render: Matter.Render) => void;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export const useMatterEngine = ({ enabled, onEngineReady, canvasRef }: UseMatterEngineOptions) => {
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);

  useEffect(() => {
    if (!enabled || !canvasRef.current) {
      return;
    }

    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0, scale: 0 },
    });

    const render = Matter.Render.create({
      canvas: canvasRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'transparent',
      },
    });

    const runner = Matter.Runner.create();

    engineRef.current = engine;
    renderRef.current = render;
    runnerRef.current = runner;

    Matter.Render.run(render);
    Matter.Runner.run(runner, engine);

    if (onEngineReady) {
      onEngineReady(engine, render);
    }

    const handleResize = () => {
      if (render.canvas) {
        render.canvas.width = window.innerWidth;
        render.canvas.height = window.innerHeight;
        render.options.width = window.innerWidth;
        render.options.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

      if (renderRef.current) {
        Matter.Render.stop(renderRef.current);
        if (renderRef.current.canvas) {
          renderRef.current.canvas.remove();
        }
        renderRef.current.canvas = null as any;
        renderRef.current.context = null as any;
        renderRef.current.textures = {};
      }

      if (runnerRef.current && engineRef.current) {
        Matter.Runner.stop(runnerRef.current);
      }

      if (engineRef.current) {
        Matter.World.clear(engineRef.current.world, false);
        Matter.Engine.clear(engineRef.current);
      }

      engineRef.current = null;
      renderRef.current = null;
      runnerRef.current = null;
    };
  }, [enabled, canvasRef, onEngineReady]);

  return {
    engine: engineRef.current,
    render: renderRef.current,
    runner: runnerRef.current,
  };
};
