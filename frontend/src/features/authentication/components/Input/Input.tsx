import { InputHTMLAttributes } from "react";
import classes from "./Input.module.scss";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function Input({ label, ...others }: InputProps) {
  return (
    <div className={classes.root}>
      <label htmlFor="">{label}</label>
      <input {...others} />
    </div>
  );
}
