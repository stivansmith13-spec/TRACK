import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, MessageCircle, RefreshCw } from "lucide-react";
import { ChatMessage } from "../types";

export default function CareerAdvisor() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      role: "model",
      text: "مرحباً يا أحمد! أنا موجّه مسار المهني الذكي 🤖. كيف يمكنني إرشادك اليوم في سياق سوق العمل الجزائري ومخرجات جداراتك الأكاديمية؟",
      timestamp: "10:30 ص"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    "كيف أرفع نسبة مطابقتي لوظيفة مطور متكامل إلى %90؟",
    "اقترح دورات تدريبية محلية مجانية لسد ثغرة مهارات قواعد البيانات",
    "اشرح لي كيفية الاستفادة من القرار الوزاري للمشاريع الابتكارية وبراءة الاختراع"
  ];

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString("ar-DZ", { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setLoading(true);

    try {
      const response = await fetch("/api/career-mentor/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, text: m.text }))
        })
      });

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "model",
        text: data.reply || "نشكرك على رسالتك. لتفصيل مسارك ينصح الخوارزم بزيادة شارات التحقق الرقمية.",
        timestamp: new Date().toLocaleTimeString("ar-DZ", { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "model",
        text: "عذراً، أواجه مشكلة مؤقتة في خادم الذكاء الاصطناعي السحابي. لكن كقاعدة عامة في الجزائر، يمكنك رفع جدارتك بتحميل كود مشاريعك على GitHub وربطه بالمنصة ليتم التحقق منه تلقائياً.",
        timestamp: new Date().toLocaleTimeString("ar-DZ", { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[520px] bg-slate-50 border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
      {/* Bot Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center text-sky-500 animate-pulse">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-sans font-bold text-slate-800 text-sm">الموجه المهني الذكي</h4>
            <p className="text-[11px] text-emerald-500 font-sans flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> متصل بالذكاء الاصطناعي (Gemini)
            </p>
          </div>
        </div>
        <button
          onClick={() => setMessages([messages[0]])}
          className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-xl hover:bg-slate-50"
          title="إعادة ضبط المحادثة"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages list */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-3 max-w-[85%] ${m.role === "user" ? "mr-auto flex-row-reverse" : "ml-auto"}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 ${
                m.role === "user" ? "bg-slate-200 text-slate-600" : "bg-sky-50 text-sky-600"
              }`}
            >
              {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            <div>
              <div
                className={`p-3.5 rounded-2xl text-xs font-sans leading-relaxed text-right rtl ${
                  m.role === "user"
                    ? "bg-sky-600 text-white rounded-tr-none"
                    : "bg-white text-slate-700 shadow-xs border border-slate-100 rounded-tl-none"
                }`}
              >
                {m.text}
              </div>
              <p className="text-[10px] text-slate-400 font-mono mt-1 text-left px-1">{m.timestamp}</p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 max-w-[85%] ml-auto">
            <div className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center text-xs">
              <Bot className="w-4 h-4 text-sky-600 animate-spin" />
            </div>
            <div className="p-3 bg-white text-slate-500 border border-slate-100 rounded-2xl rounded-tl-none flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-bounce delay-75"></span>
              <span className="w-1.5 h-1.5 bg-sky-600 rounded-full animate-bounce delay-150"></span>
              <span className="text-[11px] font-sans">الموجه يكتب لك الآن...</span>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Suggested prompts helper */}
      <div className="px-6 py-2 bg-white border-t border-slate-50 flex gap-2 overflow-x-auto select-none no-scrollbar">
        {suggestedPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(p)}
            className="shrink-0 text-[10px] font-sans text-sky-700 bg-sky-50/50 hover:bg-sky-50 px-3 py-1.5 rounded-full border border-sky-100/50 transition-colors"
          >
            <Sparkles className="w-3 h-3 inline-block ml-1" />
            {p}
          </button>
        ))}
      </div>

      {/* Input panel */}
      <div className="p-4 bg-white border-t border-slate-100">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputValue);
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="اكتب رسالتك للموجه المهني هنا..."
            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-sans text-xs focus:outline-none focus:ring-1 focus:ring-sky-500 bg-white"
          />
          <button
            type="submit"
            disabled={loading || !inputValue.trim()}
            className="p-3 bg-sky-600 hover:bg-sky-700 disabled:bg-slate-100 text-white disabled:text-slate-300 rounded-xl transition-all duration-200"
          >
            <Send className="w-4 h-4 rtl:rotate-180" />
          </button>
        </form>
      </div>
    </div>
  );
}
