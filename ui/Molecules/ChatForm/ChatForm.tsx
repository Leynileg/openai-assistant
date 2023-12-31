import React, { ChangeEventHandler, FormEventHandler } from "react";

import { Button } from "@/ui/Atoms/Button";
import { Input } from "@/ui/Atoms/Input";

interface Props {
  inputValue: string;
  isSubmitting: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  content: {
    inputPlaceholderText: string;
    buttonText: string;
  };
}

export const ChatForm: React.FC<Props> = (props) => {
  return (
    <form
      className={`h-fit mx-auto flex mb-8 fixed bottom-0 left-0 right-0 bg-white w-fit
        sm:w-full md:w-[48rem] 
      `}
      onSubmit={props.onSubmit}
    >
      <Input
        onChange={props.onChange}
        placeholder={props.content.inputPlaceholderText}
        value={props.inputValue}
        disabled={props.isSubmitting}
      />
      <Button disabled={props.isSubmitting || !props.inputValue} type="submit">
        {props.content.buttonText}
      </Button>
    </form>
  );
};
