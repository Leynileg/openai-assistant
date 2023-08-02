"use client";
import React from "react";

import { Message } from "@/ui/Atoms/Message";
import { ChatForm } from "@/ui/Molecules/ChatForm";

import { useChatContainer } from "./ChatContainer.hooks";

export const ChatContainer = () => {
  const {
    messages,
    isSubmitting,
    handleSubmit,
    getMessageVariant,
    userMessage,
    setUserMessage,
  } = useChatContainer();

  return (
    <div
      className={`flex flex-col justify-between py-4 lg:px-40 px-4 w-screen min-h-[calc(100vh - 250px)]`}
    >
      <ul className="h-fit flex flex-col mb-12">
        {messages.map((message, ind) => (
          <Message
            key={ind}
            variant={getMessageVariant({
              role: message.role,
              isError: message.error,
            })}
          >
            {message.content}
          </Message>
        ))}
        {isSubmitting && (
          <Message
            variant={getMessageVariant({
              role: "assistant",
              isSubmitting: true,
            })}
          >
            ...
          </Message>
        )}
      </ul>
      <ChatForm
        isSubmitting={isSubmitting}
        content={{
          buttonText: "Submit",
          inputPlaceholderText: "type a message...",
        }}
        inputValue={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      />
    </div>
  );
};
