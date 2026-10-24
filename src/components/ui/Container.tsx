import type { ElementType, HTMLAttributes, ReactNode } from "react";
import styles from "./Container.module.css";

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children: ReactNode;
}

export function Container({
  as: Component = "div",
  className,
  children,
  ...rest
}: ContainerProps) {
  const classes = [styles.container, className ?? ""].filter(Boolean).join(" ");
  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
}
