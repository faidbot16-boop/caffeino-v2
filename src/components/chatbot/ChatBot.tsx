import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || "";

const SYSTEM_PROMPT = `You are Caffeino's AI assistant. You help customers with:
- Menu information (specialty hot coffee, iced coffee, cold brew, non-coffee drinks, pastries, cakes, all-day brunch, bagels, croissants, salads, toasties)
- Opening hours: Sun-Thu 7am-11pm, Fri-Sat 7am-12am
- Service options: Dine-in, Takeaway, Delivery
- Location info: Marina Al Bateen, Mahawi, Al Bahia, Khalifa City (all in Abu Dhabi)
- Delivery platforms: Talabat, Deliveroo, Noon, caffeino-uae.com
- Merchandise: mugs, tumblers, coffee beans (available in-store)
- Events: workshops, live music, private events
- Careers: barista, chef, supervisor positions
- General coffee and cafe questions

Be warm, friendly, and concise. Use a conversational tone. If asked about something outside your scope, politely redirect to contact info@caffeino.ae or WhatsApp +971 50 9999 712. Never make up information about prices or menu items.`;

function generateSessionId() {
  return "caffeino_" + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

function getSessionId() {
  let sessionId = sessionStorage.getItem("caffeino_chat_session");
  if (!sessionId) {
    sessionId = generateSessionId();
    sessionStorage.setItem("caffeino_chat_session", sessionId);
  }
  return sessionId;
}

async function sendToOpenRouter(messages: { role: string; content: string }[]): Promise<string> {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": window.location.origin,
        "X-Title": "Caffeino Chatbot",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.3-70b-instruct:free",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "I'm sorry, I couldn't process that.";
  } catch (error) {
    console.error("OpenRouter error:", error);
    // Fallback to keyword responses
    return getFallbackResponse(messages[messages.length - 1]?.content || "");
  }
}

function getFallbackResponse(message: string): string {
  const lower = message.toLowerCase();
  
  if (lower.includes("hour") || lower.includes("open") || lower.includes("time")) {
    return "We're open Sunday–Thursday from 7am to 11pm, and Friday–Saturday from 7am to 12am. Perfect for early morning coffee or late evening treats!";
  }
  if (lower.includes("location") || lower.includes("where") || lower.includes("branch")) {
    return "We have 4 locations across Abu Dhabi:\n\n1. **Marina Al Bateen**\n2. **Mahawi**\n3. **Al Bahia**\n4. **Khalifa City**\n\nWhich one is closest to you?";
  }
  if (lower.includes("menu") || lower.includes("coffee") || lower.includes("food")) {
    return "Our menu includes:\n\n☕ **Specialty Coffee**\n🥐 **Croissants & Pastries**\n🍳 **All-Day Breakfast**\n🥯 **Bagels**\n🥗 **Salads**\n🍰 **Cakes**\n\nCheck out our full menu at /menu!";
  }
  if (lower.includes("delivery") || lower.includes("order")) {
    return "You can order via Talabat, Deliveroo, Noon, or directly at caffeino-uae.com. We also offer dine-in and takeaway at all locations!";
  }
  if (lower.includes("price") || lower.includes("cost")) {
    return "Our prices are quite reasonable for specialty coffee in Abu Dhabi! Check our menu page for details, or ask about a specific item.";
  }
  if (lower.includes("event") || lower.includes("workshop")) {
    return "We host coffee cupping workshops every Saturday, latte art masterclasses, and live acoustic nights every Friday. Check our Events page for details!";
  }
  if (lower.includes("career") || lower.includes("job") || lower.includes("work")) {
    return "We're always looking for passionate people! Current openings include Barista, Head Chef, and Shift Supervisor. Check our Careers page to apply.";
  }
  if (lower.includes("merch") || lower.includes("mug") || lower.includes("tumbler")) {
    return "Our merch collection includes ceramic mugs (AED 45), glass tumblers (AED 60), and house coffee beans (AED 70). Available in-store!";
  }
  if (lower.includes("wifi") || lower.includes("laptop")) {
    return "Yes! All our locations have free high-speed WiFi and plenty of seating perfect for working. Grab a coffee and stay as long as you need!";
  }
  
  return "That's a great question! I'd recommend checking with our team directly for the most accurate info. You can WhatsApp us at +971 50 9999 712 or email info@caffeino.ae. Or feel free to ask me about our menu, hours, or locations!";
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm Caffeino's assistant. How can I help you today? Ask me about our menu, locations, or hours!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useRef(getSessionId()); // Initialize session
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const apiMessages = messages
        .filter((m) => m.id !== "welcome")
        .concat(userMessage)
        .map((m) => ({ role: m.role, content: m.content }));

      const response = await sendToOpenRouter(apiMessages);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I'm having trouble connecting right now. Please try again or contact us at info@caffeino.ae.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed bottom-6 right-6 z-[2000] w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all ${
          isOpen ? "bg-text-primary text-bg-dark" : "bg-accent text-bg-dark hover:bg-accent-hover"
        }`}
        style={{ boxShadow: "0 8px 32px rgba(196, 164, 132, 0.3)" }}
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-[1999] w-[380px] max-w-[calc(100vw-48px)]"
          >
            <div
              className="glass-card rounded-2xl overflow-hidden flex flex-col"
              style={{
                height: "520px",
                boxShadow: "0 24px 64px rgba(0, 0, 0, 0.4)",
              }}
            >
              {/* Header */}
              <div className="px-5 py-4 bg-bg-surface border-b border-border flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                  <Bot size={20} className="text-bg-dark" />
                </div>
                <div>
                  <h4 className="font-medium text-sm text-text-primary">Caffeino Assistant</h4>
                  <p className="text-xs text-text-muted">Always here to help</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        msg.role === "user" ? "bg-text-primary" : "bg-accent"
                      }`}
                    >
                      {msg.role === "user" ? (
                        <User size={14} className="text-bg-dark" />
                      ) : (
                        <Bot size={14} className="text-bg-dark" />
                      )}
                    </div>

                    <div
                      className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                        msg.role === "user"
                          ? "bg-accent text-bg-dark rounded-br-sm"
                          : "bg-bg-elevated text-text-primary rounded-bl-sm border border-border"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line leading-relaxed">{msg.content}</p>
                      <p
                        className={`text-[10px] mt-1.5 ${
                          msg.role === "user" ? "text-bg-dark/50" : "text-text-muted"
                        }`}
                      >
                        {formatTime(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                      <Bot size={14} className="text-bg-dark" />
                    </div>
                    <div className="bg-bg-elevated px-4 py-3 rounded-2xl rounded-bl-sm border border-border">
                      <Loader2 size={16} className="text-text-muted animate-spin" />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form
                onSubmit={handleSubmit}
                className="px-4 py-3 border-t border-border bg-bg-surface"
              >
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about menu, hours..."
                    className="flex-1 px-4 py-2.5 rounded-full bg-bg-elevated text-text-primary text-sm focus:outline-none focus:ring-1 focus:ring-accent placeholder:text-text-muted border border-border"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      input.trim() && !isLoading
                        ? "bg-accent text-bg-dark hover:bg-accent-hover"
                        : "bg-bg-elevated text-text-muted border border-border"
                    }`}
                  >
                    <Send size={14} />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
