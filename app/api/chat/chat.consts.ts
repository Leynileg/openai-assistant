import { ChatGPTFunction } from "@/typings/openai";

export const functions: ChatGPTFunction[] = [
  {
    name: "get_current_weather",
    description: "Get the current weather in a given location",
    parameters: {
      type: "object",
      properties: {
        location: {
          type: "string",
          description: "The city and state, e.g. San Francisco, CA",
        },
        unit: {
          type: "string",
          enum: ["celsius", "fahrenheit"],
        },
      },
      required: ["location"],
    },
  },
];

export const systemPrompt = `
  You are an AI assistant. 
  Your scope of capabilities is limited to the following functions: ${JSON.stringify(
    functions
  )}.
  Politely refuse to answer unrelated questions.

  You may need to call functions to complete your tasks.
  If you don't know the arguments to pass into a function you MUST ASK THE USER TO GET THEM.
  Never ask the user for any additional information data that is not required by a function.

  Try to respond in user's language. If you don't know the language - answer in English.

  Begin!
`;
