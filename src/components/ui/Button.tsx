import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { Link } from "react-router";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary" | "ghost";

interface BaseProps {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
}

type ButtonAsLink = BaseProps & {
  to: string;
  href?: never;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children">;

type ButtonAsAnchor = BaseProps & {
  href: string;
  to?: never;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children">;

type ButtonAsButton = BaseProps & {
  to?: never;
  href?: never;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export type ButtonProps = ButtonAsLink | ButtonAsAnchor | ButtonAsButton;

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    fullWidth = false,
    className,
    children,
  } = props;

  const classes = [
    styles.button,
    styles[variant],
    fullWidth ? styles.fullWidth : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  if ("to" in props && typeof props.to === "string") {
    const {
      to,
      variant: _v,
      fullWidth: _fw,
      className: _cn,
      children: _ch,
      ...rest
    } = props;
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if ("href" in props && typeof props.href === "string") {
    const {
      href,
      variant: _v,
      fullWidth: _fw,
      className: _cn,
      children: _ch,
      ...rest
    } = props;
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  const {
    variant: _v,
    fullWidth: _fw,
    className: _cn,
    children: _ch,
    type = "button",
    ...rest
  } = props as ButtonAsButton;

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
