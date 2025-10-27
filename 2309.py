# Fix the floating chat icon not showing up on the landing page

import React from "react";
import ChatWidget from "./ChatWidget";
import { motion } from "framer-motion";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800">
      <header className="text-center py-16 px-6">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4 text-blue-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: "easeInOut" }}
        >
          AI-Powered Public Health Chatbot
        </motion.h1>
        <motion.p
          className="text-lg text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.26, ease: "easeInOut" }}
        >
          Multilingual chatbot for disease awareness, vaccination schedules, and real-time outbreak alerts. Accessible via WhatsApp and SMS.
        </motion.p>
      </header>

      <main className="px-6 md:px-12">
        <section className="grid md:grid-cols-4 gap-6 py-8 max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18, ease: "easeInOut" }}>
            <div className="p-6 bg-white rounded-2xl shadow">Multilingual Support</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.20, ease: "easeInOut" }}>
            <div className="p-6 bg-white rounded-2xl shadow">Accessible via WhatsApp & SMS</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22, ease: "easeInOut" }}>
            <div className="p-6 bg-white rounded-2xl shadow">Real-time Outbreak Alerts</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.24, ease: "easeInOut" }}>
            <div className="p-6 bg-white rounded-2xl shadow">Safe & Verified Info</div>
          </motion.div>
        </section>

        <section className="text-center py-12">
          <motion.div initial={{ scale: 0.99 }} animate={{ scale: 1 }} transition={{ duration: 0.2, ease: "easeInOut" }}>
            <h2 className="text-2xl font-semibold">Impact You Can Measure</h2>
            <p className="text-gray-600 mt-2">80% answer accuracy • +20% awareness growth</p>
          </motion.div>
        </section>
      </main>

      <ChatWidget />
    </div>
  );
}

// ChatWidget.jsx
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || process.env.REACT_APP_API_URL || "";
  const CHAT_ENDPOINT = API_BASE ? `${API_BASE.replace(/\/$/, "")}/chat` : `/chat`;

  useEffect(() => {
    const t = setTimeout(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, 50);
    return () => clearTimeout(t);
  }, [messages, isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const text = input.trim();
    setInput("");
    setLoading(true);

    setMessages((prev) => [...prev, { id: Date.now() + Math.random(), sender: "user", text }]);

    try {
      const res = await fetch(CHAT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      const botText = data && data.response ? data.response : "Sorry, no reply from server.";
      setMessages((prev) => [...prev, { id: Date.now() + Math.random(), sender: "bot", text: botText }]);
    } catch (err) {
      setMessages((prev) => [...prev, { id: Date.now() + Math.random(), sender: "bot", text: "Error connecting to server." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div>
      {isOpen ? (
        <motion.div
          className="fixed bottom-20 right-6 w-80 bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, ease: "easeInOut" }}
        >
          <div className="flex justify-between items-center bg-blue-600 text-white px-4 py-2">
            <span>Health Chatbot</span>
            <X className="cursor-pointer" onClick={() => setIsOpen(false)} />
          </div>
          <div ref={scrollRef} className="h-64 overflow-y-auto p-4 space-y-2 text-sm flex-1">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-2 rounded-lg max-w-[75%] ${msg.sender === "user" ? "bg-blue-100 ml-auto text-right" : "bg-gray-100 mr-auto text-left"}`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex p-2 border-t">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 border rounded-l px-2 py-1 resize-none h-10"
              placeholder="Type your message..."
              disabled={loading}
            />
            <button onClick={sendMessage} className="bg-blue-600 text-white px-4 rounded-r" disabled={loading}>
              {loading ? "..." : "Send"}
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg cursor-pointer hover:scale-105"
          onClick={() => setIsOpen(true)}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.14, ease: "easeInOut" }}
          whileHover={{ scale: 1.06 }}
        >
          <MessageCircle className="h-6 w-6" />
        </motion.div>
      )}
    </div>
  );
}

// Landing page
import React from "react";
import ChatWidget from "./ChatWidget";
import { motion } from "framer-motion";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800">
      <header className="text-center py-16 px-6">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4 text-blue-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: "easeInOut" }}
        >
          AI-Powered Public Health Chatbot
        </motion.h1>
        <motion.p
          className="text-lg text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.26, ease: "easeInOut" }}
        >
          Multilingual chatbot for disease awareness, vaccination schedules, and real-time outbreak alerts. Accessible via WhatsApp and SMS.
        </motion.p>
      </header>

      <main className="px-6 md:px-12">
        <section className="grid md:grid-cols-4 gap-6 py-8 max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18, ease: "easeInOut" }}>
            <div className="p-6 bg-white rounded-2xl shadow">Multilingual Support</div>
