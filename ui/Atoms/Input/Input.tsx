import React, { InputHTMLAttributes } from "react";

type DefaultProps = InputHTMLAttributes<HTMLInputElement>;

interface Props {
  className?: string;
  type?: DefaultProps["type"];
  value: string;
  onChange: DefaultProps["onChange"];
  placeholder?: string;
  disabled?: boolean;
}

const defaultProps = {
  type: "text",
  className: "",
};

export const Input: React.FC<Props> = (props = defaultProps as any) => {
  return (
    <input
      type={props.type}
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
      disabled={props.disabled}
      className={`w-full mx-auto py-2 px-4
        border rounded 
      disabled:bg-slate-50 disabled:border-slate-200 disabled:shadow-none 
        ${props.className}
      `}
    />
  );
};
