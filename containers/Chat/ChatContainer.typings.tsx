import { Message } from "@/typings/chat";

export interface GetMessageVariantParams {
  role: Exclude<Message["role"], "function">;
  isSubmitting?: boolean;
  isError?: boolean;
}
