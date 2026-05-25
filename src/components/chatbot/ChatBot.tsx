import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

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
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize session (unused variable warning fix)
  useState(getSessionId());

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
      // Call serverless API
      const apiMessages = messages
        .filter((m) => m.id !== "welcome")
        .concat(userMessage)
        .map((m) => ({ role: m.role, content: m.content }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      let reply: string;

      if (response.ok) {
        const data = await response.json();
        reply = data.response || data.fallback || "I'm sorry, I couldn't process that.";
      } else {
        // Fallback if API fails
        reply = getFallbackResponse(userMessage.content);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: reply,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const fallbackReply = getFallbackResponse(userMessage.content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: fallbackReply,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const getFallbackResponse = (message: string): string => {
    const lower = message.toLowerCase();
    
    if (lower.includes("hour") || lower.includes("open") || lower.includes("time")) {
      return "We're open Sunday–Thursday from 7am to 11pm, and Friday–Saturday from 7am to 12am. Perfect for early morning coffee or late evening treats!";
    }
    if (lower.includes("location") || lower.includes("where") || lower.includes("branch")) {
      return "We have 5 locations across Abu Dhabi:\n\n1. **Al Bateen**\n2. **Mahawi**\n3. **Khalifa City**\n4. **Al Falah**\n5. **Al Bahia**\n\nWhich one is closest to you?";
    }
    if (lower.includes("menu") || lower.includes("coffee") || lower.includes("food")) {
      return "Our menu includes:\n\n☕ **Specialty Coffee**\n🥐 **Croissants & Pastries**\n🍳 **All-Day Breakfast**\n🥯 **Bagels**\n🥗 **Salads**\n🍰 **Cakes**\n\nCheck out our full menu at /menu!";
    }
    if (lower.includes("delivery") || lower.includes("order")) {
      return "You can order via Talabat, Deliveroo, Noon, or directly at caffeino-uae.com. We also offer dine-in and takeaway at all locations!";
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
    if (lower.includes("price") || lower.includes("cost") || lower.includes("how much")) {
      return "Our prices are quite reasonable for specialty coffee in Abu Dhabi! Coffee starts from around AED 20, brunch items from AED 45. For exact pricing, check our menu or ask at the counter.";
    }
    if (lower.includes("hi") || lower.includes("hello") || lower.includes("hey")) {
      return "Hello! Welcome to Caffeino! I'm here to help with anything about our coffee, menu, locations, or services. What can I do for you? ☕";
    }
    if (lower.includes("thank")) {
      return "You're so welcome! Enjoy your Caffeino experience. If you need anything else, I'm right here! ☕";
    }
    
    return "That's a great question! I'd recommend checking with our team directly for the most accurate info. You can WhatsApp us at +971 50 9999 712 or email info@caffeino.ae. Or feel free to ask me about our menu, hours, or locations!";
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
          isOpen ? "bg-text-primary text-white" : "bg-accent text-white hover:bg-accent-hover"
        }`}
        style={{ boxShadow: "0 8px 32px rgba(162, 58, 45, 0.3)" }}
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
              className="rounded-2xl overflow-hidden flex flex-col border border-border shadow-2xl"
              style={{
                height: "520px",
                boxShadow: "0 24px 64px rgba(0, 0, 0, 0.15)",
                background: "#FAF8F3",
              }}
            >
              {/* Header */}
              <div className="px-5 py-4 bg-bg-warm border-b border-border flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                  <Bot size={20} className="text-white" />
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
                        <User size={14} className="text-white" />
                      ) : (
                        <Bot size={14} className="text-white" />
                      )}
                    </div>

                    <div
                      className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                        msg.role === "user"
                          ? "bg-accent text-white rounded-br-sm"
                          : "bg-white text-text-primary rounded-bl-sm border border-border"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line leading-relaxed">{msg.content}</p>
                      <p
                        className={`text-[10px] mt-1.5 ${
                          msg.role === "user" ? "text-white/70" : "text-text-muted"
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
                      <Bot size={14} className="text-white" />
                    </div>
                    <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm border border-border">
                      <Loader2 size={16} className="text-text-muted animate-spin" />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form
                onSubmit={handleSubmit}
                className="px-4 py-3 border-t border-border bg-bg-warm"
              >
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about menu, hours..."
                    className="flex-1 px-4 py-2.5 rounded-full bg-white text-text-primary text-sm focus:outline-none focus:ring-1 focus:ring-accent placeholder:text-text-muted border border-border"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      input.trim() && !isLoading
                        ? "bg-accent text-white hover:bg-accent-hover"
                        : "bg-bg-card text-text-muted border border-border"
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
