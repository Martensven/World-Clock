import type { AnalogClockProps } from '../../interfaces/AnalogClock';
import { useEffect, useRef } from 'react';

import clockAnimation from './utils/clockAnimation';

export default function AnalogClock(props: AnalogClockProps) {

  const canvasRef = useRef(null);


  useEffect(() => {
    const requestAnimationFrameHolder =
      clockAnimation({
        canvas: canvasRef.current as unknown as HTMLCanvasElement,
        ...props
      });
    return () => cancelAnimationFrame(requestAnimationFrameHolder.latest);
  });

  return <>

    <div className="clock-container-outer">
      <div className="clock-container">
        <canvas ref={canvasRef} width="500" height="500"></canvas>
      </div>
    </div>
  </>;
}