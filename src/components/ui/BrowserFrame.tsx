import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./BrowserFrame.module.css";

export interface BrowserFrameProps {
  children: ReactNode;
  urlLabel?: string;
  className?: string;
}

const INNER_WIDTH = 1200;
const INNER_HEIGHT = 900;

export function BrowserFrame({
  children,
  urlLabel = "seunegocio.com.br",
  className,
}: BrowserFrameProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(0.28);
  const [isVisible, setIsVisible] = useState(false);

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

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        updateScale(entry.contentRect.width);
      }
    });

    resizeObserver.observe(element);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) return;
    const element = viewportRef.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsVisible(true);
          intersectionObserver.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    intersectionObserver.observe(element);
    return () => intersectionObserver.disconnect();
  }, [isVisible]);

  const classes = [styles.browser, className ?? ""].filter(Boolean).join(" ");

  return (
    <div className={classes} aria-hidden="true" inert={true}>
      <div className={styles.toolbar}>
        <div className={styles.dots}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
        <div className={styles.addressBar}>{urlLabel}</div>
      </div>

      <div ref={viewportRef} className={styles.viewport}>
        {isVisible ? (
          <div
            className={`${styles.canvas} demo-container`}
            style={{
              width: `${INNER_WIDTH}px`,
              height: `${INNER_HEIGHT}px`,
              transform: `scale(${scale})`,
            }}
          >
            {children}
          </div>
        ) : (
          <div className={styles.placeholder} />
        )}
      </div>
    </div>
  );
}
