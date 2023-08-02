import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

import type { Message } from "@/typings/chat";

import { systemPrompt, functions } from "./chat.consts";
import { getCurrentWeather } from "./chat.helpers";

const fetchChatData = async (openai: OpenAIApi, messages: Message[]) => {
  const { data } = await openai.createChatCompletion({
    model: "gpt-4-0613",
    messages: [{ role: "system", content: systemPrompt }, ...messages],
    functions,
    function_call: "auto",
    temperature: 0.7,
    max_tokens: 1000,
  });

  return data;
};

export async function POST(request: Request) {
  const { messages: messagesString } = await request.json();

  const messagesArr = messagesString;

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  try {
    const dataResp = await fetchChatData(openai, messagesArr);

    const respMessage = dataResp.choices[0].message?.content as string;
    const functionCall = dataResp.choices[0].message?.function_call;

    if (functionCall) {
      // only one function is defined, so it can be only the get_current_weather one
      // in case of more functions another layer of ifology would be necessary
      const weatherData = await getCurrentWeather(
        functionCall.arguments as string
      );

      const functionCallResp = await fetchChatData(openai, [
        ...messagesArr,
        {
          role: "function",
          name: "get_current_weather",
          content: JSON.stringify(weatherData),
        },
      ]);

      return NextResponse.json<Message>({
        content: functionCallResp.choices[0].message?.content as string,
        role: "assistant",
      });
    }

    return NextResponse.json<Message>({
      content: respMessage,
      role: "assistant",
    });
  } catch (error) {
    return NextResponse.json<Message>(
      {
        content: "Ooops! Something went wrong. Please try again later",
        error: true,
        role: "assistant",
      },
      {
        status: 500,
      }
    );
  }
}
