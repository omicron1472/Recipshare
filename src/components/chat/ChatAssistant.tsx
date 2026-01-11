import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage, Message } from "./ChatMessage";
import { SuggestionChips } from "./SuggestionChips";
import { ThemeToggle } from "./ThemeToggle";
import { 
  ChefHat, 
  X, 
  Send, 
  Minimize2,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

const mockResponses: Record<string, { content: string; recipes?: Message["recipes"] }> = {
  "suggest recipes with potatoes": {
    content: "Here are some delicious potato recipes for you! 🥔",
    recipes: [
      { id: "1", title: "Crispy Garlic Roasted Potatoes", image: "https://images.unsplash.com/photo-1518977676601-b53f82ber56a?w=300&h=200&fit=crop", cookTime: "45 min" },
      { id: "2", title: "Creamy Mashed Potatoes", image: "https://images.unsplash.com/photo-1631898039984-fd5e236c5529?w=300&h=200&fit=crop", cookTime: "30 min" },
    ]
  },
  "healthy breakfast ideas": {
    content: "Start your day right with these healthy breakfast options! 🌅",
    recipes: [
      { id: "3", title: "Avocado Toast with Eggs", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=300&h=200&fit=crop", cookTime: "10 min" },
      { id: "4", title: "Greek Yogurt Parfait", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&h=200&fit=crop", cookTime: "5 min" },
    ]
  },
  "quick 15-minute dinners": {
    content: "Short on time? Try these quick dinner recipes! ⏰",
    recipes: [
      { id: "5", title: "Garlic Shrimp Pasta", image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=300&h=200&fit=crop", cookTime: "15 min" },
      { id: "6", title: "Chicken Stir-Fry", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300&h=200&fit=crop", cookTime: "12 min" },
    ]
  },
  default: {
    content: "I'd be happy to help! I can suggest recipes, provide ingredient substitutions, or share cooking tips. What would you like to know?",
  }
};

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hi! I'm your recipe assistant 👨‍🍳 I can help you find recipes, suggest ingredient substitutions, and share cooking tips. What are you cooking today?",
    role: "assistant",
    timestamp: new Date(),
  },
];

export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: text,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const key = text.toLowerCase();
      const response = mockResponses[key] || mockResponses.default;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.content,
        role: "assistant",
        timestamp: new Date(),
        recipes: response.recipes,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSuggestionSelect = (suggestion: string) => {
    handleSend(suggestion);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center",
          isOpen && "scale-0 opacity-0"
        )}
        aria-label="Open chat assistant"
      >
        <ChefHat className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-background animate-pulse" />
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 w-[380px] rounded-2xl border bg-background shadow-2xl transition-all duration-300 overflow-hidden",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
          isMinimized ? "h-[60px]" : "h-[580px]"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/50">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center">
              <ChefHat className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Recipe Assistant</h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Online
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Chat Content */}
        {!isMinimized && (
          <>
            {/* Messages */}
            <ScrollArea className="h-[380px] p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}

                {isTyping && (
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <ChefHat className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                      <div className="flex gap-1">
                        <span className="h-2 w-2 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="h-2 w-2 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="h-2 w-2 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Suggestions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-3">
                <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  Quick suggestions
                </p>
                <SuggestionChips onSelect={handleSuggestionSelect} />
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t bg-muted/30">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(input);
                }}
                className="flex gap-2"
              >
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about recipes..."
                  className="flex-1 rounded-full bg-background"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="rounded-full shrink-0"
                  disabled={!input.trim() || isTyping}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
}
