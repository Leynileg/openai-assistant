"use client";
import React, { useCallback } from "react";

import type { Message } from "@/typings/chat";
import { fetchFacade } from "@/services/fetchFacade";
import type { MessageVariants } from "@/ui/Atoms/Message";

import type { GetMessageVariantParams } from "./ChatContainer.typings";

const askQuestion = async (messages: Message[]) => {
  const resp = await fetchFacade("http://localhost:3000/api/chat", {
    method: "POST",
    body: JSON.stringify({ messages }),
  });

  return resp as Message;
};

export const useChatContainer = () => {
  const [messages, setMessages] = React.useState<Message[]>([
    { content: "Hello, how can I assist you today?", role: "assistant" },
  ]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [userMessage, setUserMessage] = React.useState("");

  React.useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [messages]);

  const handleSubmit = useCallback(async () => {
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
      },
    ]);

    await new Promise((resolve) => {
      setTimeout(() => {
        setIsSubmitting(true);
        resolve(true);
      }, 1000);
    });

    const resp = await askQuestion([
      ...messages,
      { content: userMessage, role: "user" },
    ]);

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 4000);
    });

    setIsSubmitting(false);
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: resp.content,
        ...(resp.error && { error: resp.error }),
      },
    ]);
  }, [userMessage]);

  const getMessageVariant = ({
    role,
    isError,
    isSubmitting,
  }: GetMessageVariantParams): MessageVariants => {
    if (isError) return "error";
    if (isSubmitting) return "submitting";

    return role;
  };

  return {
    messages,
    isSubmitting,
    handleSubmit,
    getMessageVariant,
    userMessage,
    setUserMessage,
  };
};
