import type { AnchorHTMLAttributes, ReactNode } from "react";
import { buildMessage, buildWhatsAppUrl, type MessageInput } from "../../lib/whatsapp";
import { Button, type ButtonVariant } from "./Button";
import { WhatsAppIcon } from "./WhatsAppIcon";

export interface WhatsAppLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children"> {
  message?: MessageInput | string;
  label?: string;
  children?: ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  showIcon?: boolean;
}

export function WhatsAppLink({
  message = { source: "generic" },
  label,
  children,
  variant = "primary",
  fullWidth = false,
  showIcon = true,
  "aria-label": ariaLabelProp,
  ...rest
}: WhatsAppLinkProps) {
  const textMessage =
    typeof message === "string" ? message : buildMessage(message);
  const url = buildWhatsAppUrl(textMessage);

  const visibleText =
    label ?? (typeof children === "string" ? children : "Conversar no WhatsApp");

  const baseAria = ariaLabelProp ?? visibleText;
  const ariaLabel = baseAria.endsWith("(abre o WhatsApp)")
    ? baseAria
    : `${baseAria} (abre o WhatsApp)`;

  return (
    <Button
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      variant={variant}
      fullWidth={fullWidth}
      aria-label={ariaLabel}
      {...rest}
    >
      {showIcon && <WhatsAppIcon />}
      <span>{children ?? visibleText}</span>
    </Button>
  );
}
