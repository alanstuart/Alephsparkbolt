import { useEffect, useRef } from 'react';
import Matter from 'matter-js';

interface UseMatterEngineOptions {
  enabled: boolean;
  onEngineReady?: (engine: Matter.Engine, canvas: HTMLCanvasElement) => void;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export const useMatterEngine = ({ enabled, onEngineReady, canvasRef }: UseMatterEngineOptions) => {
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);

  useEffect(() => {
    if (!enabled || !canvasRef.current) {
      return;
    }

    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0, scale: 0 },
    });

    const runner = Matter.Runner.create();

    engineRef.current = engine;
    runnerRef.current = runner;

    Matter.Runner.run(runner, engine);

    if (onEngineReady) {
      onEngineReady(engine, canvasRef.current);
    }

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

      if (runnerRef.current && engineRef.current) {
        Matter.Runner.stop(runnerRef.current);
      }

      if (engineRef.current) {
        Matter.World.clear(engineRef.current.world, false);
        Matter.Engine.clear(engineRef.current);
      }

      engineRef.current = null;
      runnerRef.current = null;
    };
  }, [enabled, canvasRef, onEngineReady]);

  return {
    engine: engineRef.current,
    runner: runnerRef.current,
  };
};
