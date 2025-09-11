import { useEffect, useRef } from "react";

interface AnalogClockProps {
  time: Date;
  faceColor: string;
  borderColor: string;
  lineColor: string;
  largeColor: string;
  secondColor: string;
  setAnalogSettings: () => void;
}

export default function AnalogClock(props: AnalogClockProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawClock = () => {
      const { time, faceColor, borderColor, lineColor, largeColor, secondColor } = props;
      const width = canvas.width;
      const height = canvas.height;
      const radius = width / 2;

      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.translate(radius, radius);
      ctx.rotate(-Math.PI / 2);

      // Clock face
      ctx.beginPath();
      ctx.arc(0, 0, radius - 10, 0, Math.PI * 2);
      ctx.fillStyle = faceColor;
      ctx.fill();
      ctx.lineWidth = 8;
      ctx.strokeStyle = borderColor;
      ctx.stroke();

      // Hour markers
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 4;
      for (let i = 0; i < 12; i++) {
        ctx.beginPath();
        ctx.rotate(Math.PI / 6);
        ctx.moveTo(radius - 30, 0);
        ctx.lineTo(radius - 10, 0);
        ctx.stroke();
      }

      // Minute markers
      ctx.lineWidth = 2;
      for (let i = 0; i < 60; i++) {
        if (i % 5 !== 0) {
          ctx.beginPath();
          ctx.moveTo(radius - 20, 0);
          ctx.lineTo(radius - 10, 0);
          ctx.stroke();
        }
        ctx.rotate(Math.PI / 30);
      }

      // Time values
      const hours = time.getHours() % 12;
      const minutes = time.getMinutes();
      const seconds = time.getSeconds();

      // Hour hand
      ctx.save();
      ctx.rotate((Math.PI / 6) * hours + (Math.PI / 360) * minutes);
      ctx.strokeStyle = largeColor;
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(-10, 0);
      ctx.lineTo(radius - 60, 0);
      ctx.stroke();
      ctx.restore();

      // Minute hand
      ctx.save();
      ctx.rotate((Math.PI / 30) * minutes + (Math.PI / 1800) * seconds);
      ctx.strokeStyle = largeColor;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(-15, 0);
      ctx.lineTo(radius - 40, 0);
      ctx.stroke();
      ctx.restore();

      // Second hand
      ctx.save();
      ctx.rotate((Math.PI / 30) * seconds);
      ctx.strokeStyle = secondColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-20, 0);
      ctx.lineTo(radius - 20, 0);
      ctx.stroke();
      ctx.restore();

      // Center dot
      ctx.beginPath();
      ctx.arc(0, 0, 5, 0, Math.PI * 2);
      ctx.fillStyle = secondColor;
      ctx.fill();

      ctx.restore();
    };

    drawClock();
    const interval = setInterval(drawClock, 1000);
    return () => clearInterval(interval);
  }, [props.time]);

  return (
    <div className="flex justify-center items-center">
      <canvas ref={canvasRef} width={200} height={200} />
    </div>
  );
}
