import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./PhoneFrame.module.css";

export interface PhoneFrameProps {
  children: ReactNode;
  innerHeight?: number;
  label?: ReactNode;
  className?: string;
}

const INNER_WIDTH = 390;

export function PhoneFrame({
  children,
  innerHeight = 780,
  label,
  className,
}: PhoneFrameProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(0.75);

  useEffect(() => {
    const element = viewportRef.current;
    if (!element) return;

    const updateScale = (width: number) => {
      if (width > 0) {
        setScale(width / INNER_WIDTH);
      }
    };

    updateScale(element.clientWidth);

    if (typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        updateScale(entry.contentRect.width);
      }
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const visibleHeight = Math.round(innerHeight * scale);
  const wrapperClass = [styles.wrapper, className ?? ""].filter(Boolean).join(" ");

  return (
    <div className={wrapperClass}>
      <div className={styles.phone}>
        <div className={styles.speaker} aria-hidden="true" />
        <div
          ref={viewportRef}
          className={styles.viewport}
          style={{ height: `${visibleHeight}px` }}
          aria-hidden="true"
          inert={true}
        >
          <div
            className={`${styles.canvas} demo-container`}
            style={{
              width: `${INNER_WIDTH}px`,
              height: `${innerHeight}px`,
              transform: `scale(${scale})`,
            }}
          >
            {children}
          </div>
        </div>
      </div>

      {label && <div className={styles.label}>{label}</div>}
    </div>
  );
}
