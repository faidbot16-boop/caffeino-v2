import type { VercelRequest, VercelResponse } from "@vercel/node";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

const SYSTEM_PROMPT = `You are Caffeino's AI assistant. You help customers with:
- Menu information (specialty hot coffee, iced coffee, cold brew, non-coffee drinks, pastries, cakes, all-day brunch, bagels, croissants, salads, toasties)
- Opening hours: Sun-Thu 7am-11pm, Fri-Sat 7am-12am
- Service options: Dine-in, Takeaway, Delivery
- Location info: Al Bateen Marina, Mahawi, Al Bahia, Khalifa City, Al Falah (all in Abu Dhabi)
- Delivery platforms: Talabat, Noon Food, caffeino-uae.com
- Merchandise: mugs, tumblers, coffee beans (available in-store)
- Events: workshops, live music, private events
- Careers: barista, chef, supervisor positions
- General coffee and cafe questions

Be warm, friendly, and concise. Use a conversational tone. If asked about something outside your scope, politely redirect to contact info@caffeino.ae or WhatsApp +971 50 9999 712. Never make up information about prices or menu items.`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array required" });
    }

    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: { maxOutputTokens: 500, temperature: 0.7 },
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini error:", errorText);
      return res.status(500).json({
        error: "Failed to get response from AI",
        fallback: getFallbackResponse(messages[messages.length - 1]?.content || ""),
      });
    }

    const data = await response.json();
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm sorry, I couldn't process that.";

    return res.status(200).json({ response: reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return res.status(500).json({
      error: "Internal server error",
      fallback: getFallbackResponse(
        req.body?.messages?.[req.body.messages.length - 1]?.content || "",
      ),
    });
  }
}

function getFallbackResponse(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("hour") || lower.includes("open") || lower.includes("time")) {
    return "We're open Sunday–Thursday from 7am to 11pm, and Friday–Saturday from 7am to 12am. Perfect for early morning coffee or late evening treats!";
  }
  if (lower.includes("location") || lower.includes("where") || lower.includes("branch")) {
    return "We have 5 locations across Abu Dhabi:\n\n1. **Al Bateen Marina**\n2. **Mahawi**\n3. **Khalifa City**\n4. **Al Falah**\n5. **Al Bahia**\n\nWhich one is closest to you?";
  }
  if (lower.includes("menu") || lower.includes("coffee") || lower.includes("food")) {
    return "Our menu includes:\n\n☕ **Specialty Coffee**\n🥐 **Croissants & Pastries**\n🍳 **All-Day Breakfast**\n🥯 **Bagels**\n🥗 **Salads**\n🍰 **Cakes**\n\nCheck out our full menu at /menu!";
  }
  if (lower.includes("delivery") || lower.includes("order")) {
    return "You can order via Talabat, Noon Food, or directly at caffeino-uae.com. We also offer dine-in and takeaway at all locations!";
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

  return "That's a great question! I'd recommend checking with our team directly for the most accurate info. You can WhatsApp us at +971 50 9999 712 or email info@caffeino.ae. Or feel free to ask me about our menu, hours, or locations!";
}
