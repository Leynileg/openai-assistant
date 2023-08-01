import React from "react";

export const getVariantStyles = (variant: Props["variant"]) => {
  switch (variant) {
    case "error":
      return "bg-red-600 text-white";
    case "user":
      return "bg-slate-200";
    case "system":
      return "bg-cyan-600 text-white";
    case "submitting":
      return "bg-cyan-600 text-white max-w-md animate-pulse";
    default:
      return "";
  }
};

interface Props {
  variant: "user" | "system" | "error" | "submitting";
  children: React.ReactNode;
  className?: string;
}

export const Message: React.FC<Props> = (props) => {
  const isUser = props.variant === "user";

  return (
    <li
      className={`flex w-full h-fit mb-6 ${
        isUser ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className={`flex flex-col py-2 px-4 rounded 
        font-light text-sm max-w[14rem] whitespace-pre-line 
        ${getVariantStyles(props.variant)}
      `}
      >
        {props.children}
      </div>
    </li>
  );
};
