import { ButtonHTMLAttributes, ReactNode } from "react";
import classes from "./Button.module.scss";

type ButtonPropos = ButtonHTMLAttributes<HTMLButtonElement> & {
  outline?: boolean;
  children: ReactNode;
  size?: "small" | "medium" | "large";
};

export function Button({
  size = "large",
  outline,
  className,
  children,
  ...others
}: ButtonPropos) {
  return (
    <button
      className={`${classes.root} ${classes[size]} ${className} ${
        outline ? classes.outline : ""
      }`}
      {...others}
    >
      {children}
    </button>
  );
}
