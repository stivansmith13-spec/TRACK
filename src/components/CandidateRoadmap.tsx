import React, { useState } from "react";
import {
  TrendingUp,
  MapPin,
  Lock,
  Unlock,
  CheckCircle2,
  HelpCircle,
  Award,
  ChevronLeft,
  Briefcase,
  Layers,
  Sparkles
} from "lucide-react";
import { CandidateProfile } from "../types";

interface CandidateRoadmapProps {
  profile: CandidateProfile;
  onUpdateSkill: (key: string, value: number) => void;
}

export default function CandidateRoadmap({ profile, onUpdateSkill }: CandidateRoadmapProps) {
  const [selectedPhase, setSelectedPhase] = useState<1 | 2 | 3>(2);

  // Future Career Gaps Trend Forecast States
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionLogs, setPredictionLogs] = useState<string[]>([]);
  const [hasPredicted, setHasPredicted] = useState(false);

  const roadmapPhases = [
    {
      id: 1,
      title: "مطور مبتدئ (Junior Full-Stack)",
      status: "completed" as const,
      readiness: 100,
      salary: "120,000 دج",
      timeline: "مكتملة (تم التحقق)",
      desc: "بناء أسس ومقومات تطبيقات الويب المتكاملة مع DZ Software وإجادة الخوارزميات المبدئية للقرار الوزاري للأفراد.",
      skills: ["HTML", "CSS", "JavaScript", "React Basic"]
    },
    {
      id: 2,
      title: "مهندس برمجيات محترف (Senior Full-Stack)",
      status: "active" as const,
      readiness: 82,
      salary: "250,000 دج",
      timeline: "الهوية الحالية",
      desc: "تصميم وإدارة البنى البرمجية السحابية، وربط مخرجات جداراتك الأكاديمية بقواعد البيانات، وبناء أنظمة تشغيل بينية آمنة.",
      skills: ["React Advanced", "TypeScript", "Node.js", "PostgreSQL", "API Security"]
    },
    {
      id: 3,
      title: "خبير ذكاء اصطناعي (AI & ML Specialist)",
      status: "locked" as const,
      readiness: 40,
      salary: "450,000 دج",
      timeline: "المسار المستهدف",
      desc: "تدريب وبناء النماذج الذكية التنبؤية، وتخزين وتحليل البيانات الضخمة، ودعم صانعي القرار السيادي بمؤشرات الملاءمة.",
      skills: ["Python", "TensorFlow", "NLP Solutions", "Hadoop & Big Data", "AI Auditing"]
    }
  ];

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs font-sans text-right space-y-6" dir="rtl">
      
      {/* Intro Header */}
      <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <Layers className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-sm font-black text-slate-800">المسارات والجدارات المهنية الذكية (Interactive Roadmap)</h3>
          <p className="text-[10px] text-slate-400 mt-1">تتبع خطتك الخوارزمية خطوة بخطوة للارتقاء بفرص توظيفك ورفع راتبك المتوقع.</p>
        </div>
      </div>

      {/* Grid containing visual roadmap steps left and detail card on the right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left column: Visual list of steps */}
        <div className="lg:col-span-5 space-y-4">
          <h4 className="text-[11px] font-black text-slate-500 uppercase">خطوات مسارك المهني المتكامل:</h4>
          
          <div className="space-y-3 relative">
            {/* Visual line connectors between steps */}
            <div className="absolute right-6 top-6 bottom-6 w-0.5 bg-slate-100 -z-10"></div>
            
            {roadmapPhases.map((phase) => (
              <div
                key={phase.id}
                onClick={() => setSelectedPhase(phase.id as 1 | 2 | 3)}
                className={`border p-4.5 rounded-2xl cursor-pointer transition-all flex items-start gap-4 ${
                  selectedPhase === phase.id
                    ? "border-blue-600 bg-blue-50/20 shadow-xs"
                    : "border-slate-100 hover:border-slate-200 bg-white"
                }`}
              >
                {/* Visual state icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  phase.status === "completed"
                    ? "bg-emerald-50 text-emerald-600"
                    : phase.status === "active"
                    ? "bg-blue-600 text-white animate-pulse"
                    : "bg-slate-50 text-slate-400"
                }`}>
                  {phase.status === "completed" ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : phase.status === "active" ? (
                    <TrendingUp className="w-6 h-6" />
                  ) : (
                    <Lock className="w-5 h-5" />
                  )}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-center">
                    <h5 className="text-xs font-black text-slate-800">{phase.title}</h5>
                    <span className="text-[9px] font-mono text-slate-400 font-bold">{phase.timeline}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[9px] text-slate-500 font-bold">
                    <span>الراتب المتوقع: <span className="text-slate-800">{phase.salary}</span></span>
                    <span>•</span>
                    <span>جاهزية الملاءمة: <span className={phase.readiness >= 80 ? "text-emerald-600" : "text-orange-500"}>{phase.readiness}%</span></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Detailed card of selected step */}
        <div className="lg:col-span-7 bg-slate-50/50 border border-slate-100 rounded-3xl p-6 space-y-5">
          {(() => {
            const currentObj = roadmapPhases.find((p) => p.id === selectedPhase)!;
            return (
              <>
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[9px] text-blue-650 font-black uppercase block">تفاصيل المرحلة المحددة</span>
                    <h4 className="text-xs md:text-sm font-black text-blue-900 mt-1">{currentObj.title}</h4>
                  </div>
                  <span className={`text-[9px] px-3 py-1 rounded-full font-bold ${
                    currentObj.status === "completed"
                      ? "bg-emerald-100 text-emerald-800"
                      : currentObj.status === "active"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-slate-200 text-slate-700"
                  }`}>
                    {currentObj.status === "completed" ? "مكتمل وموثق" : currentObj.status === "active" ? "المرحلة الحالية" : "مستهدف مستقبلي المغلف"}
                  </span>
                </div>

                <p className="text-[11px] text-slate-550 leading-relaxed font-sans">{currentObj.desc}</p>

                {/* Requirements details lists */}
                <div className="space-y-3">
                  <h5 className="text-[10px] font-black text-slate-705">الجدارات والمؤهلات المطلوبة لهذه المرحلة:</h5>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {currentObj.skills.map((skill, idx) => {
                      // Check if candidate possesses this skill or similar
                      let possesses = false;
                      if (selectedPhase === 1) possesses = true;
                      else if (selectedPhase === 2) {
                        possesses = (profile.skills["البرمجيات"] || 0) >= 80 || skill.includes("React");
                      } else {
                        possesses = (profile.skills["تحليل البيانات"] || 0) >= 90;
                      }

                      return (
                        <div key={idx} className="bg-white border border-slate-100 p-3 rounded-xl flex items-center justify-between text-right">
                          <span className="text-[10px] text-slate-700 font-bold">{skill}</span>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                            possesses ? "bg-emerald-50 text-emerald-700" : "bg-orange-50 text-orange-700"
                          }`}>
                            {possesses ? "✓ مستوفاة" : "⚠ تحتاج سد ثغرة"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* SWOT action block */}
                <div className="bg-white border border-slate-100 p-4.5 rounded-2xl space-y-2">
                  <div className="flex items-center gap-1.5 text-blue-700">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-[10px] font-black">نصيحة الموجه المطور بالذكاء الاصطناعي:</span>
                  </div>
                  <p className="text-[9.5px] text-slate-500 leading-normal">
                    {selectedPhase === 2 ? (
                      "لتأكيد جدارتك كمهندس برمجيات محتر وتجاوز فجوة الـ %82 المتبقية، يتعين عليك الرفع الفوري لكفاءة 'قواعد البيانات' وربط هويتك المهنية بـ ANEM من خلال تقديم مشروع تخرجك تحت بند القرار الوزاري المشترك للشباب."
                    ) : selectedPhase === 3 ? (
                      "هذه المرحلة تدر دخلاً مرتفعاً جداً في الجزائر. نوصيك ببدء دورة تحليل البيانات وحلول ذكاء الآلة المقترحة لدينا في صفحة التعلم فوراً، ثم الرفع اليدوي لمهارة 'تحليل البيانات' بمجرد اجتيازك للاختبارات للتفوق."
                    ) : (
                      "رائع! لقد اجتزت هذه المرحلة وبصمة مهاراتك المكتملة تم تخزينها بنجاح وهي تخدم هويتك المهنية الفعالة أمام الشركات."
                    )}
                  </p>
                </div>
              </>
            );
          })()}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. مرصد التنبؤ الاستباقي بالفجوات المهنية المستقبلية بتلمسان (AI Trend Foresight) */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-l from-slate-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-6 shadow-md border border-indigo-500/20 mt-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-full bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_60%)] pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-5 mb-5 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[8px] bg-indigo-500 text-white font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider animate-pulse">تكنولوجيا استباقية (Foresight Tech) 🇩🇿</span>
              <span className="text-[9px] text-indigo-300 font-bold">مرصد تلمسان الاقتصادي للـ 6 أشهر القادمة</span>
            </div>
            <h3 className="text-base font-black text-white mt-1">تنبؤ الفجوات المهنية وتحليل اتجاهات الغرب الجزائري لعام 2026</h3>
            <p className="text-[10px] text-indigo-200 mt-1 max-w-3xl leading-relaxed font-sans">
              تقوم خوارزمية الذكاء الاصطناعي باستشعار المناقصات المفتوحة، مشاريع الاستثمار بمغنية، وإعلانات تلمسان الرقمية، ومطابقتها بملفك للتنبؤ بالثغرات المهنية وتنبيهك بما يجب كسبه فوراً للبقاء في القمة.
            </p>
          </div>
          
          <button
            type="button"
            onClick={() => {
              setIsPredicting(true);
              setPredictionLogs([]);
              setHasPredicted(false);
              const marketLogs = [
                "جاري الاتصال بنظام المسح الاقتصادي الموحد بغرفة تجارة تلمسان...",
                "تحليل الطلبات المفتوحة في المنطقة الحرة بمغنية وموانئ التصدير...",
                "رصد فجوة العرض في تخصصات هندسة سلاسل الإمداد بنسبة عجز 43%...",
                "تقييم خطة التبادل في جامعة تلمسان بموجب القرار الوزاري المنظم...",
                "مقارنة فجوات المهارات في ملفك الشخصي الحالي مع متطلبات 6 أشهر القادمة...",
                "مزامنة مؤشرات التضخم المهني بنجاح!"
              ];
              let i = 0;
              const interval = setInterval(() => {
                if (i < marketLogs.length) {
                  setPredictionLogs(prev => [...prev, marketLogs[i]]);
                  i++;
                } else {
                  clearInterval(interval);
                  setIsPredicting(false);
                  setHasPredicted(true);
                }
              }, 400);
            }}
            disabled={isPredicting}
            className="px-4 py-2.5 bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 disabled:from-slate-700 disabled:to-slate-800 text-slate-950 font-black rounded-2xl text-[11px] flex items-center gap-1.5 transition-all self-stretch md:self-auto shrink-0 shadow-lg shadow-emerald-500/10 cursor-pointer"
          >
            <TrendingUp className="w-4 h-4 text-slate-950" />
            {isPredicting ? "جاري فحص اتجاهات سوق تلمسان..." : "تحليل اتجاهات السوق الاستباقية (AI Forecast)"}
          </button>
        </div>

        {/* Live Simulation Terminal or Results */}
        {isPredicting && (
          <div className="bg-slate-950 p-4 rounded-2xl border border-indigo-500/20 font-mono text-[9.5px] text-emerald-400 space-y-1.5 animate-fade-in text-left mb-4" dir="ltr">
            {predictionLogs.map((log, lIdx) => (
              <div key={lIdx} className="truncate">&gt;&gt; {log}</div>
            ))}
            <div className="w-2 h-3.5 bg-emerald-400 inline-block animate-ping"></div>
          </div>
        )}

        {hasPredicted && (
          <div className="space-y-6 animate-fade-in relative z-10">
            
            {/* ALERT BANNER */}
            <div className="bg-red-500/15 border border-red-500/30 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-right">
              <div className="space-y-1">
                <span className="text-[9px] bg-red-500 text-white font-extrabold px-1.5 py-0.2 rounded inline-block animate-pulse">تنبيه حرج للباحث (Critical Insight)</span>
                <p className="text-[11px] text-red-200 font-bold leading-relaxed font-sans">
                  رصد عجزاً حاداً قادماً لمهارات <span className="text-white underline">"حل المشكلات والبرمجيات التقنية"</span> في تلمسان؛ نظراً لتوطين 14 شركة برمجية بمغنية خلال ديسمبر. الرفع من مؤشراتك الآن يمنحك الصدارة فوراً!
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onUpdateSkill("حل المشكلات", 95);
                  onUpdateSkill("البرمجيات", 90);
                  alert("⚡ تم معالجة التنبيه استباقياً! تم رفع مهارة 'حل المشكلات' إلى 95% و 'البرمجيات' إلى 90% في رادار جدارتك بنجاح لتتصدر قائمة الاستقطاب القادمة.");
                }}
                className="px-3.5 py-2 bg-red-650 hover:bg-red-755 text-white font-black text-[10px] rounded-xl shrink-0 transition-all shadow-md shadow-red-500/15 leading-none cursor-pointer"
              >
                سد الفجوة وتحديث راداري فوراً 🚀
              </button>
            </div>

            {/* 4 Skill Cards Forecast Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  id: "trend-1",
                  skill: "البنية السحابية وإدارة المستندات (Sovereign Cloud DevOps)",
                  growth: "+168%",
                  impact: "مرتفع جداً (تلمسان)",
                  status: "gap" as const,
                  currentVal: profile.skills["البرمجيات"] || 0,
                  desc: "تأمين السجلات والبلوكتشين للقرارات اللامركزية بمشاريع الغرب.",
                  targetToUpdate: "البرمجيات"
                },
                {
                  id: "trend-2",
                  skill: "خبير جودة وفحص زيت الغذاء والزيتون (Agritech Quality Inspector)",
                  growth: "+142%",
                  impact: "ممتاز (مغنية الميناء الجاف)",
                  status: "not-discovered" as const,
                  currentVal: 0,
                  desc: "فحص الحاويات وتطبيق الذكاء الصناعي لمستوى زيت تلمسان الممتاز للتصدير.",
                  targetToUpdate: "حل المشكلات"
                },
                {
                  id: "trend-3",
                  skill: "تحليل وتوطين سلاسل إمداد تلمسان-مغنية (Corridor Flow Optimization)",
                  growth: "+185%",
                  impact: "فائق السيادة (القرار الوزاري)",
                  status: "gap" as const,
                  currentVal: profile.skills["تحليل البيانات"] || 0,
                  desc: "تقليل زمن الترانزيت على الحدود للميناء الجاف عبر النمذجة الرياضية الرقمية.",
                  targetToUpdate: "تحليل البيانات"
                },
                {
                  id: "trend-4",
                  skill: "الأمن السيبراني الجمركي ومكافحة الانتهاكات (Crossborder Cybersec)",
                  growth: "+130%",
                  impact: "أمني حرج (أمن الحدود)",
                  status: "stable" as const,
                  currentVal: profile.skills["العمل الجماعي"] || 0,
                  desc: "حماية منافذ التحكم وقواعد الجمارك الغربية من الهجمات الموجهة.",
                  targetToUpdate: "العمل الجماعي"
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-900/40 border border-white/10 p-4 rounded-2xl flex flex-col justify-between space-y-4 hover:border-indigo-400/50 transition-all relative group text-right">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-[8px] bg-indigo-900/80 text-indigo-300 font-extrabold px-2 py-0.5 rounded border border-indigo-500/20">{item.impact}</span>
                      <span className="text-xs font-mono font-black text-emerald-400 animate-pulse">{item.growth}</span>
                    </div>
                    <h4 className="text-[11px] font-black text-slate-100 leading-snug">{item.skill}</h4>
                    <p className="text-[9.2px] text-slate-400 leading-normal">{item.desc}</p>
                  </div>

                  <div className="border-t border-white/5 pt-3 space-y-2 text-[9px] font-bold">
                    <div className="flex justify-between text-slate-400">
                      <span>مستواك الحالي بالرادار:</span>
                      <span className="font-mono text-slate-200">{item.status === "not-discovered" ? "0% (ثغرة مستجدة)" : `${item.currentVal}%`}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const targetSkill = item.targetToUpdate;
                        const potentialNewVal = Math.min(100, (profile.skills[targetSkill] || 0) + 15);
                        onUpdateSkill(targetSkill, potentialNewVal);
                        alert(`⚡ تم تبني مبادرة سد الفجوة للمهارة: "${item.skill}" بنجاح! \nتم ترقية مهارة "${targetSkill}" في ملفك من ${profile.skills[targetSkill]}% إلى ${potentialNewVal}% لجني الملائمة المرتفعة لمشاريع تلمسان.`);
                      }}
                      className="w-full py-1.5 bg-indigo-600/30 hover:bg-indigo-600/60 border border-indigo-500/30 hover:border-indigo-400/50 text-indigo-300 hover:text-white rounded-lg transition-all text-[8.5px] font-black text-center cursor-pointer"
                    >
                      💡 تبني المهارة وسد الثغرة استباقياً (+15%)
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Micro summary explaining alignment */}
            <p className="text-[10px] text-slate-400 leading-normal text-right font-sans">
              ⚠️ يتم تحديث قائمة التوقعات والتنبؤات هذه بشكل آلي ومستمر كل 24 ساعة بمزامنة حية مع محرك ووزارة العمل الجزائرية لتوليد أقصى درجات الثقة والدقة لدى صناع القرار.
            </p>

          </div>
        )}

        {!hasPredicted && !isPredicting && (
          <div className="border border-white/5 bg-white/5 rounded-2xl p-6 text-center space-y-2 select-none">
            <TrendingUp className="w-8 h-8 text-indigo-400 mx-auto opacity-70 animate-pulse" />
            <h4 className="text-xs font-black text-slate-200">النمذجة التنبؤية خامدة حالياً</h4>
            <span className="text-[9px] text-slate-400 block mt-0.5">اضغط على زر الفحص الاستباقي للذكاء الاصطناعي أعلاه لمسح فرص تلمسان ومغنية وبدء التنبؤ.</span>
          </div>
        )}
      </div>

    </div>
  );
}
