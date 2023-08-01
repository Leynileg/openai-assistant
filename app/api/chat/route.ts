import { Message } from "@/typings/chat";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // const { searchParams } = new URL(request.url)
  // const id = searchParams.get('id')
  // const res = await fetch(`https://data.mongodb-api.com/product/${id}`, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'API-Key': process.env.DATA_API_KEY,
  //   },
  // })
  // const product = await res.json()

  return new Response(
    JSON.stringify({ content: "hello!", role: "assistant" } as Message),
    {
      status: 200,
    }
  );
}
