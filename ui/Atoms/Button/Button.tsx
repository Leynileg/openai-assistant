import React, { ButtonHTMLAttributes } from "react";

type DefaultProps = ButtonHTMLAttributes<HTMLButtonElement>;

interface Props {
  children: React.ReactNode;
  onSubmit: () => void;
  disabled?: boolean;
  className?: string;
  type?: DefaultProps["type"];
}

const defaultProps = {
  type: "button",
  className: "",
};

export const Button: React.FC<Props> = (props = defaultProps as any) => {
  return (
    <button
      type={props.type}
      onSubmit={props.onSubmit}
      disabled={props.disabled}
      className={`py-2 px-4 rounded ml-4 bg-cyan-600 hover:bg-cyan-900 text-white font-bold cursor-pointer 
        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-sate-200 disabled:shadow-none
      `}
    >
      {props.children}
    </button>
  );
};
