import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { ChatSnippet } from "@/components/landing/ChatSnippet";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <main className="flex flex-1 flex-col">
        <Hero />
        <ChatSnippet />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}
