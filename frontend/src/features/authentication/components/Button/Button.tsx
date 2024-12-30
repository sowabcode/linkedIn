import { ButtonHTMLAttributes, ReactNode } from "react";
import classes from "./Button.module.scss";

type ButtonPropos = ButtonHTMLAttributes<HTMLButtonElement> & {
  outline?: boolean;
  children: ReactNode;
};

export function Button({ outline, children, ...others }: ButtonPropos) {
  return (
    <button
      className={`${classes.root} ${outline ? classes.outline : ""}`}
      {...others}
    >
      {children}
    </button>
  );
}
