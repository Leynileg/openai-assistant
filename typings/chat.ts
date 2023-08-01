export interface Message {
  content: string;
  role: "assistant" | "user";
  error?: boolean;
  // name?: FunctionName;
}
