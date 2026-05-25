import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth > 1024 && !('ontouchstart' in window));
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMove = (e: MouseEvent) => {
      cursor.style.transform = `translate3d(${e.clientX - 16}px, ${e.clientY - 16}px, 0)`;
    };

    const addMagnetic = () => {
      document.querySelectorAll("button, a, [data-magnetic]").forEach((el) => {
        const handleMove = (e: Event) => {
          const me = e as MouseEvent;
          const rect = (el as HTMLElement).getBoundingClientRect();
          const x = me.clientX - rect.left - rect.width / 2;
          const y = me.clientY - rect.top - rect.height / 2;
          (el as HTMLElement).style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
          cursor.classList.add("scale-150", "mix-blend-difference", "bg-white");
        };
        const handleLeave = () => {
          (el as HTMLElement).style.transform = "";
          cursor.classList.remove("scale-150", "mix-blend-difference", "bg-white");
        };
        el.addEventListener("mousemove", handleMove);
        el.addEventListener("mouseleave", handleLeave);
      });
    };

    window.addEventListener("mousemove", onMove);
    setTimeout(addMagnetic, 500);

    return () => {
      window.removeEventListener("mousemove", onMove);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-accent pointer-events-none z-[9999] transition-transform duration-75 ease-out hidden lg:block"
      style={{ transition: "transform 0.075s ease-out, width 0.2s, height 0.2s, background 0.2s" }}
    />
  );
}
