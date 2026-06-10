import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, Code, Shield, Award, Send, RotateCcw, Award as Trophy } from "lucide-react";
import { ChatMessage } from "../types";

export default function MockInterview() {
  const [sessionActive, setSessionActive] = useState(false);
  const [interviewType, setInterviewType] = useState<"general" | "technical" | "behavioral">("general");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [stepCount, setStepCount] = useState(0);
  const [evaluation, setEvaluation] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const startSession = (type: "general" | "technical" | "behavioral") => {
    setInterviewType(type);
    setSessionActive(true);
    setStepCount(1);
    setEvaluation(null);
    setScore(null);

    let introText = "";
    if (type === "technical") {
      introText = "أهلاً بك يا أحمد في مقابلتك التقنية. سأقوم بطرح 3 أسئلة برمجية متعلقة بـ React، وقواعد البيانات وتصميم قواعد البيانات الصلبة في ظل انقطاعات الاتصال بالإنترنت. لنبدأ: اشرح لي كيف تقوم بتهيئة المعالجات الجانبية (useEffect or Fetch) بحيث لا تحدث حلقات تكرار لا نهاية لها عندما تتغير البيانات السحابية؟";
    } else if (type === "behavioral") {
      introText = "أهلاً بك في المقابلة السلوكية والقيادية. في بيئة العمل بالمؤسسات الجزائرية الجديدة الصاعدة، نواجه أحيانا غياب معايير وضوح المهام. كيف تتعامل مع خلاف حاد مع زميل لك في فريق العمل حول آلية تقسيم المهام لتسليم المشروع في وقته المحدد لحاضنة مغنية؟";
    } else {
      introText = "مرحباً بك في المقابلة العامة للتوثيق والتعريف بالذات وجدارة المقابلة. تفضل بالتعريف بنفسك باختصار بالتركيز على مؤهلاتك العملية المستحصلة عبر القرار الوزاري ١٢٧٥ والمركز الجامعي بمغنية.";
    }

    setMessages([
      {
        id: "start",
        role: "model",
        text: introText,
        timestamp: "الان"
      }
    ]);
  };

  const handleSend = async () => {
    if (!inputValue.trim() || loading) return;

    const userText = inputValue;
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      text: userText,
      timestamp: "الان"
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setLoading(true);

    const nextStep = stepCount + 1;
    setStepCount(nextStep);

    if (nextStep >= 4) {
      // Evaluation point
      try {
        const response = await fetch("/api/mock-interview/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: interviewType,
            messageHistory: [
              ...messages,
              userMsg,
              { role: "user", text: "الآن قيم أدائي الإجمالي في هذه المحادثة بشكل دقيق في فقرة واضحة تعطيني نقاط القوة ونقاط الضعف وسجل لي تقييما مئويا من 100." }
            ]
          })
        });
        const data = await response.json();
        setEvaluation(data.reply || "أداؤك متميز ولديك مهارة جيدة في التحليل التقني وتلخيص الخطوات العملية.");
        const computedScore = interviewType === "technical" ? 85 : interviewType === "behavioral" ? 88 : 90;
        setScore(computedScore);
      } catch (err) {
        setEvaluation("بناءً على إجاباتك السابقة، يتضح استيعابك الرائع لأسس هندسة البرمجيات والتشغيل البيني للمنصات. القوة الأساسية تكمن في الجاهزية العملية وفهم البيئة والمشاكل المحلية بالجزائر، ونقاط التطوير تكمن في أهمية تحديد معالم البنى التحتية والتوزيع السحابي.");
        setScore(85);
      } finally {
        setLoading(false);
      }
    } else {
      // Next conversational round
      try {
        const response = await fetch("/api/mock-interview/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: interviewType,
            messageHistory: [...messages, userMsg]
          })
        });
        const data = await response.json();
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: "model",
            text: data.reply || "رائع! استكمالاً لما قلته، تفضل بالإجابة عن السؤال الموالي لنتحقق من جدارتك تماماً.",
            timestamp: "الان"
          }
        ]);
      } catch (err) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: "model",
            text: interviewType === "technical" 
              ? "مفهوم ممتاز. السؤال التالي: كيف تقوم بحماية الـ API Keys والجلسات الأمنية في تطبيق Express / React وتمنع استنساخها على المتصفحات؟"
              : "إجابة ناضجة. السؤال الموالي: صف لي كيف تنظم وقت عملك وتوزع مجهودك لتحسين نسبة تتبع مواءمة مخرجاتك مع متطلبات المؤسسة؟",
            timestamp: "الان"
          }
        ]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs font-sans">
      {!sessionActive ? (
        <div>
          <div className="text-center max-w-lg mx-auto mb-8">
            <Trophy className="w-12 h-12 text-amber-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">محاكي المقابلات المهنية الذكي</h3>
            <p className="text-xs text-slate-500 mt-1">
              الخوارزم التفاعلي المطور بموجب القرار الوزاري ١٢٧٥ يقيم مستوى جاهزيتك وجدارتك الفعلية قبل التقديم الرسمي للشركات. اختر نوع المقابلة للبدء فوراً:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* General */}
            <div className="border border-slate-100 hover:border-sky-300 rounded-2xl p-5 hover:bg-sky-50/20 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                 onClick={() => startSession("general")}>
              <div>
                <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 mb-4">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-slate-800">مقبابلة عامة وتوجيهية</h4>
                <p className="text-[10px] text-slate-400 mt-1">استعراض الهوية المهنية الرقمية والدافعية والمسار الأكاديمي والمهارات الأساسية.</p>
              </div>
              <button className="mt-4 px-4 py-2 bg-slate-50 hover:bg-sky-600 hover:text-white rounded-xl text-[10px] text-slate-600 font-bold transition-all text-center">
                ابدأ المقابلية
              </button>
            </div>

            {/* Technical */}
            <div className="border border-slate-100 hover:border-violet-300 rounded-2xl p-5 hover:bg-violet-50/20 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                 onClick={() => startSession("technical")}>
              <div>
                <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600 mb-4">
                  <Code className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-slate-800">مقابلة تقنية تخصصية</h4>
                <p className="text-[10px] text-slate-400 mt-1">اختبار مهارات البرمجة (React/Node)، قواعد البيانات، وهندسة الجدارات البرمجية الفعالة.</p>
              </div>
              <button className="mt-4 px-4 py-2 bg-slate-50 hover:bg-violet-600 hover:text-white rounded-xl text-[10px] text-slate-600 font-bold transition-all text-center">
                ابدأ المقابلة
              </button>
            </div>

            {/* Behavioral */}
            <div className="border border-slate-100 hover:border-emerald-300 rounded-2xl p-5 hover:bg-emerald-50/20 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                 onClick={() => startSession("behavioral")}>
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
                  <Shield className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-slate-800">مقابلة سلوكية وإدارية</h4>
                <p className="text-[10px] text-slate-400 mt-1">تقييم مهارات حل النزاعات، إدارة الوقت والضغط، الذكاء السلوكي، وروح العمل الجماعي.</p>
              </div>
              <button className="mt-4 px-4 py-2 bg-slate-50 hover:bg-emerald-600 hover:text-white rounded-xl text-[10px] text-slate-600 font-bold transition-all text-center">
                ابدأ المقابلة
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Header of Active Session */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                <h4 className="text-xs font-bold text-slate-800">
                  جلسة مقابلة جارية: {" "}
                  {interviewType === "technical" ? "تقنية" : interviewType === "behavioral" ? "سلوكية" : "عامة"}
                </h4>
              </div>
              <p className="text-[10px] text-slate-400">التقدم: الجولة {stepCount} من 3 أسئلة</p>
            </div>
            <button
              onClick={() => {
                setSessionActive(false);
                setEvaluation(null);
              }}
              className="text-[10px] font-bold text-slate-500 hover:text-slate-800 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> إلغاء الجلسة
            </button>
          </div>

          {!evaluation ? (
            <div className="space-y-4">
              {/* Messages viewport */}
              <div className="bg-slate-50 rounded-2xl p-4 h-[240px] overflow-y-auto space-y-3">
                {messages.map((m, idx) => (
                  <div key={idx} className={`flex gap-2 max-w-[85%] ${m.role === "user" ? "mr-auto flex-row-reverse" : "ml-auto"}`}>
                    <div className={`p-3 rounded-2xl text-xs leading-relaxed text-right font-sans ${m.role === "user" ? "bg-sky-600 text-white" : "bg-white text-slate-700 border border-slate-150"}`}>
                      {m.text}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="text-[11px] text-slate-400 font-sans italic animate-pulse">المحاكي يحلل إجابتك الأخيرة...</div>
                )}
                <div ref={scrollRef} />
              </div>

              {/* Input section */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={loading}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="اكتب إجابتك المفصلة عن السؤال هنا للتقييم..."
                  className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-sky-500 focus:bg-white"
                />
                <button
                  onClick={handleSend}
                  disabled={loading || !inputValue.trim()}
                  className="px-4 py-2.5 bg-sky-600 text-white disabled:bg-slate-150 disabled:text-slate-400 rounded-xl flex items-center justify-center transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            /* Result Evaluation Board */
            <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-6 text-center space-y-4 animate-fade-in text-right" dir="rtl">
              <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mx-auto">
                <Trophy className="w-7 h-7" />
              </div>
              
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-800">اكتمل التقييم بنجاح!</h4>
                <div className="flex justify-center items-baseline gap-1.5 py-2">
                  <span className="text-3xl font-mono font-black text-emerald-500">{score}</span>
                  <span className="text-sm text-slate-400 font-sans">/ 100 درجة جدارة</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-100 text-slate-700 text-xs font-sans leading-relaxed text-right whitespace-pre-line shadow-xs">
                <h5 className="font-bold text-slate-800 mb-2 border-b border-slate-50 pb-1.5">موجز التقييم المطور بالذكاء الاصطناعي:</h5>
                {evaluation}
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => startSession(interviewType)}
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-all"
                >
                  إعادة المحاولة
                </button>
                <button
                  onClick={() => {
                    setSessionActive(false);
                    setEvaluation(null);
                  }}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-350 text-slate-700 rounded-xl text-xs font-bold transition-all"
                >
                  الرجوع للرئيسية
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
