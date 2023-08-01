import { ChatContainer } from "@/containers/Chat";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white p-0">
      <ChatContainer />
    </main>
  );
}
