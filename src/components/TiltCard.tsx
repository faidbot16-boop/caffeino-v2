import { useRef, type ReactNode, useCallback } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltAmount?: number;
}

export default function TiltCard({ children, className = "", tiltAmount = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateY = ((x - centerX) / centerX) * tiltAmount;
      const rotateX = -((y - centerY) / centerY) * tiltAmount;
      const glareX = 50 + ((x - centerX) / centerX) * 40;
      const glareY = 50 + ((y - centerY) / centerY) * 40;
      ref.current.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      ref.current.style.backgroundImage = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.18) 0%, transparent 60%)`;
    },
    [tiltAmount],
  );

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    ref.current.style.backgroundImage = "";
    ref.current.style.transition = "transform 0.5s ease-out, background-image 0.5s ease-out";
    setTimeout(() => {
      if (ref.current) ref.current.style.transition = "transform 0.1s ease-out, background-image 0.1s ease-out";
    }, 500);
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.1s ease-out, background-image 0.1s ease-out",
      }}
    >
      {children}
    </div>
  );
}
