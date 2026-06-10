import React, { useState } from "react";
import {
  Brain,
  Award,
  Trophy,
  Target,
  Compass,
  HelpCircle,
  CheckCircle2,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  UserCheck,
  TrendingUp,
  ShieldCheck,
  Zap,
  Briefcase
} from "lucide-react";
import { CandidateProfile } from "../types";

// Types for Assessment
interface Question {
  id: number;
  text: string;
  category: "analyst" | "innovator" | "leader" | "developer";
  options: {
    text: string;
    points: {
      analyst: number;
      innovator: number;
      leader: number;
      developer: number;
    };
  }[];
}

interface CareerAssessmentProps {
  profile: CandidateProfile;
  onUpdateSkills: (skills: Record<string, number>) => void;
  onAddSystemBadge?: (title: string, issuer: string) => void;
  onNavigateTab?: (tab: any) => void;
}

export default function CareerAssessment({
  profile,
  onUpdateSkills,
  onAddSystemBadge,
  onNavigateTab
}: CareerAssessmentProps) {
  // Scenario-Based Interactive Questions (Algerian-Context Career & Competency intelligence)
  const questions: Question[] = [
    {
      id: 1,
      text: "عندما تواجه مشكلة رقمية معقدة وغير موثقة في مشروع مهم، كيف تتصرف عادة لعلاجها؟",
      category: "developer",
      options: [
        {
          text: "أقوم بتفكيك المشكلة تجريبياً، وبناء فرضيات واختبارها خطوة بخطوة للبحث عن ثغرات منطقية.",
          points: { analyst: 10, innovator: 3, leader: 2, developer: 8 }
        },
        {
          text: "أبحث عن حلول إبداعية مبتكرة خارج الصندوق واقتراح تقنيات حديثة غير مألوفة لتبسيط العمل.",
          points: { analyst: 4, innovator: 10, leader: 3, developer: 5 }
        },
        {
          text: "أجمع فريق العمل فوراً لتبادل الآراء وتوزيع مهام البحث جماعياً لامتصاص الضغوط.",
          points: { analyst: 2, innovator: 5, leader: 10, developer: 3 }
        },
        {
          text: "أراجع بروتوكولات الأمان والمعايير المكتوبة والمنشورات الرسمية لضمان سلامة واستقرار النظام.",
          points: { analyst: 5, innovator: 2, leader: 1, developer: 10 }
        }
      ]
    },
    {
      id: 2,
      text: "ما هو الأسلوب المفضل والأنسب لديك للترويج لأفكار جديدة أو استراتيجيات داخل بيئة العمل؟",
      category: "analyst",
      options: [
        {
          text: "تقديم تقارير إحصائية دقيقة ورسوم بيانية وبراهين علمية صلبة تدعم صحة الفكرة رقمياً.",
          points: { analyst: 10, innovator: 4, leader: 2, developer: 4 }
        },
        {
          text: "عرض نموذج أولي تفاعلي وعصف ذهني حركي يرسم رؤية عصرية ملهمة ومحفزة للمستقبل.",
          points: { analyst: 3, innovator: 10, leader: 4, developer: 5 }
        },
        {
          text: "إقناع الشركاء وصناع القرار وبناء توافق قيادي رصين يضمن انخراط الجميع بحماس وثقة.",
          points: { analyst: 2, innovator: 5, leader: 10, developer: 1 }
        },
        {
          text: "وضع خطة عمل وجدول زمني دقيق بمراحل ملموسة وخطوات تسليم واضحة تضمن ثبات البناء الفني.",
          points: { analyst: 4, innovator: 2, leader: 3, developer: 10 }
        }
      ]
    },
    {
      id: 3,
      text: "كيف تتعامل مع التغيرات المفاجئة في متطلبات العميل أو الوزارة في منتصف مرحلة التطوير؟",
      category: "innovator",
      options: [
        {
          text: "أدرس وحلل الأثر الهيكلي والمالي والتقني على البنية التحتية بتقرير مفصل قبل إعطاء رد.",
          points: { analyst: 10, innovator: 2, leader: 4, developer: 4 }
        },
        {
          text: "أرحب بذلك كفرصة استثنائية للتطوير الإبداعي وتقديم خصائص ومميزات مدهشة تجعلنا بالمقدمة.",
          points: { analyst: 3, innovator: 10, leader: 5, developer: 3 }
        },
        {
          text: "أتلقى الطلب بمرونة عالية، وأقود حواراً تفاوضياً مع العميل لبلورة حل وسط يرضي كافة الأطراف.",
          points: { analyst: 2, innovator: 4, leader: 10, developer: 2 }
        },
        {
          text: "ألتزم بالمرونة البرمجية الفورية، وأعدل سجل المهام والمعايير الفنية للتطبيق دون المساس بالاستقرار.",
          points: { analyst: 4, innovator: 3, leader: 1, developer: 10 }
        }
      ]
    },
    {
      id: 4,
      text: "ما نوع بيئة العمل التنافسية أو التشغيلية التي تضمن خروج أفضل جودة وعطاء مالي ومهاري منك؟",
      category: "leader",
      options: [
        {
          text: "بيئة تركز على الأبحاث والبيانات الكبيرة، وتقدم تحديات فكرية ولديها بنك معلومات متكامل.",
          points: { analyst: 10, innovator: 5, leader: 2, developer: 4 }
        },
        {
          text: "بيئة حيوية مرنة تشجع الابتكار والتحليق الإبداعي ومكافأة الأفكار غير النمطية والاستكشاف.",
          points: { analyst: 4, innovator: 10, leader: 4, developer: 3 }
        },
        {
          text: "بيئة عمل تشاركية تحتفي بالقيادة والمبادرة والعمل الجماعي وتنمي مهارات التدريب وتأطير الكفاءات.",
          points: { analyst: 2, innovator: 3, leader: 10, developer: 2 }
        },
        {
          text: "بيئة واضحة الحدود والإجراءات، تلتزم بنظم تقنية وجداول تشغيل حازمة وتركز غايتها على دقة التسليم.",
          points: { analyst: 5, innovator: 2, leader: 1, developer: 10 }
        }
      ]
    },
    {
      id: 5,
      text: "في حال حدوث خلاف حاد في وجهات النظر الفنية بين أعضاء الفريق حول معيار تنفيذي، كيف تتصرف عادة؟",
      category: "developer",
      options: [
        {
          text: "الاعتماد على الدراسات الميدانية المحايدة والأرقام والمنطق العلمي كحجر أساس للوصول للصحة الهيكلية.",
          points: { analyst: 10, innovator: 3, leader: 3, developer: 4 }
        },
        {
          text: "اقتراح فكرة هجينة مبتكرة وممتعة تجمع محاسن الطرفين وتعطي قفزة نوعية للمجموعة تتجاوز النزاع.",
          points: { analyst: 4, innovator: 10, leader: 4, developer: 3 }
        },
        {
          text: "تيسير الحوار وتقريب وجهات النظر عبر التفاوض وبناء جسر اتصال يضمن رضا روح الفريق ووحدته.",
          points: { analyst: 2, innovator: 4, leader: 10, developer: 1 }
        },
        {
          text: "تطبيق المعايير القياسية العالمية والممارسات الآمنة المجربة لتقليل المخاطر والمحافظة على سلامة البيئة البرمجية.",
          points: { analyst: 5, innovator: 2, leader: 1, developer: 10 }
        }
      ]
    }
  ];

  // States
  const [currentStep, setCurrentStep] = useState<number>(-1); // -1 is introductory screen
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [scores, setScores] = useState({
    analyst: 0,
    innovator: 0,
    leader: 0,
    developer: 0
  });
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [badgeUnlocked, setBadgeUnlocked] = useState<boolean>(false);

  // Restart assessment
  const handleRestart = () => {
    setCurrentStep(-1);
    setSelectedAnswers({});
    setScores({ analyst: 0, innovator: 0, leader: 0, developer: 0 });
    setShowResults(false);
    setBadgeUnlocked(false);
  };

  // Handle select option
  const handleSelectOption = (qId: number, oIdx: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: oIdx
    }));
  };

  // Move to next step or finish
  const handleNext = () => {
    if (currentStep === -1) {
      setCurrentStep(0);
      return;
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Calculate scores
      let totalAnalyst = 0;
      let totalInnovator = 0;
      let totalLeader = 0;
      let totalDeveloper = 0;

      questions.forEach((q) => {
        const optionIdx = selectedAnswers[q.id];
        if (optionIdx !== undefined) {
          const points = q.options[optionIdx].points;
          totalAnalyst += points.analyst;
          totalInnovator += points.innovator;
          totalLeader += points.leader;
          totalDeveloper += points.developer;
        }
      });

      // Normalize scores out of 100 based on max possible points (50 pts total index)
      const maxPossible = 50;
      const finalScores = {
        analyst: Math.round((totalAnalyst / maxPossible) * 100),
        innovator: Math.round((totalInnovator / maxPossible) * 100),
        leader: Math.round((totalLeader / maxPossible) * 100),
        developer: Math.round((totalDeveloper / maxPossible) * 100)
      };

      setScores(finalScores);
      setShowResults(true);
    }
  };

  // Move to previous screen
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else if (currentStep === 0) {
      setCurrentStep(-1);
    }
  };

  // Save and Sync results back to candidate profile skills
  const handleSyncToProfile = () => {
    setIsSyncing(true);
    
    // Simulate API call to update system data
    setTimeout(() => {
      // Map archetype scores to candidate skills
      const updatedSkills = {
        ...profile.skills,
        "البرمجيات": Math.max(profile.skills["البرمجيات"] || 50, Math.round((scores.developer * 0.7) + (scores.analyst * 0.3))),
        "تحليل البيانات": Math.max(profile.skills["تحليل البيانات"] || 50, scores.analyst),
        "حل المشكلات": Math.max(profile.skills["حل المشكلات"] || 50, Math.round((scores.innovator * 0.5) + (scores.analyst * 0.5))),
        "التواصل": Math.max(profile.skills["التواصل"] || 50, scores.leader),
        "القيادة": Math.max(profile.skills["القيادة"] || 50, scores.leader),
        "الإبداع": Math.max(profile.skills["الإبداع"] || 50, scores.innovator)
      };

      onUpdateSkills(updatedSkills);
      
      // Add Sovereign Certification Badge to Vault if possible
      if (onAddSystemBadge) {
        onAddSystemBadge(
          "وسام جدارة للذكاء المهني والقيادي المستقل",
          "وزارة العمل والتشغيل - مرصد تلمسان الرقمي"
        );
      }
      
      setIsSyncing(false);
      setBadgeUnlocked(true);
    }, 1500);
  };

  // Calculate most suitable archetype
  const getTopArchetype = () => {
    const keys = Object.keys(scores) as Array<keyof typeof scores>;
    let topKey = keys[0];
    keys.forEach((key) => {
      if (scores[key] > scores[topKey]) {
        topKey = key;
      }
    });

    switch (topKey) {
      case "analyst":
        return {
          title: "المحلل الاستراتيجي (Strategic Analyst)",
          color: "sky",
          percent: scores.analyst,
          desc: "أنت تبدع في تفكيك البيانات ورصد الأنماط وتقديم استنتاجات عميقة مبنية على الأدلة والمنطق لخدمة التطوير الذكي.",
          roles: [
            { title: "محلل بيانات إحصائي (Data Analyst)", match: "98%", desc: "هندسة البيانات والتقارير لصنع قرارات الأعمال بسوق تلمسان." },
            { title: "أخصائي ذكاء الأعمال والائتمان", match: "94%", desc: "مسح فجوات الإنتاج المالي وتأطير الموازنة والمخاطر." },
            { title: "مهندس بنية تحتية سحابية ومستودعات", match: "91%", desc: "تنظيم تدفق وقواعد البيانات المؤسسية الكبيرة." }
          ]
        };
      case "innovator":
        return {
          title: "المبتكر الإبداعي (Creative Innovator)",
          color: "violet",
          percent: scores.innovator,
          desc: "لديك فكر ريادي ثوري يعتمد على التخيل والتفكير خارج الصندوق واكتشاف حلول مدهشة تسبق توقعات المستخدم العادي.",
          roles: [
            { title: "مصمم واجهات وتجربة مستخدم (UI/UX Specialist)", match: "96%", desc: "بناء مسارات تفاعلية ذات تناسق لافت وجذاب للشركاء." },
            { title: "أخصائي حلول مبتكرة وريادة أعمال رقمية", match: "93%", desc: "تأسيس نماذج أعمال ذكية تطهى مشكلات الغرب الجزائري." },
            { title: "مطور تطبيقات ذكية ونماذج تفاعلية", match: "90%", desc: "إطلاق الميزات وتصميم واجهات برمجية ديناميكية وبراقة." }
          ]
        };
      case "leader":
        return {
          title: "القائد المؤثر (Empathetic Leader)",
          color: "amber",
          percent: scores.leader,
          desc: "شخصية تباديرية، تتحلى بذكاء اجتماعي وجدارات إنسانية عالية، قادرة على توجيه المجموعات، وتقليل النزاعات واكتساب الولاء.",
          roles: [
            { title: "مدير مشاريع تقنية متكاملة (Tech PM)", match: "95%", desc: "إدارة وتأطير الفرق وصياغة سياقات التعاون وحل الأزمات." },
            { title: "مستشار استقطاب بشري وتوظيف وتدريب رقمي", match: "92%", desc: "رصد وتطوير قدرات الباحثين وتوفير كوادر مجهزة فورا." },
            { title: "أخصائي علاقة شركاء وتطوير أعمال جهوي", match: "89%", desc: "تمثيل الشركات أمام المؤسسات السيادية والوزارية." }
          ]
        };
      case "developer":
        return {
          title: "المطور التقني الدقيق (Precision Tech Builder)",
          color: "emerald",
          percent: scores.developer,
          desc: "أنت تجد شغفك المطلق في التطبيق العملي الفني وبناء أكواد آمنة مستقرة ذات التزام صارم ببروتوكولات الجودة القياسية.",
          roles: [
            { title: "مطور برمجيات متكاملة (Full-Stack Engineer)", match: "97%", desc: "كتابة واجهات أمامية وبنى خلفية متكاملة لولاية تلمسان ومغنية." },
            { title: "خبير أمن سيبراني شبكي وسيادي جمركي", match: "94%", desc: "تأمين تدفقات البيانات وسد الثغرات وحمايتها من الاختراق." },
            { title: "مهندس DevOps وحوسبة سحابية متماسكة", match: "92%", desc: "مراقبة وضمان استمرارية خوادم النظم السحابية السيادية." }
          ]
        };
    }
  };

  const topArchetype = getTopArchetype();

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-xs animate-fade-in text-right" dir="rtl">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-50 pb-5 mb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Brain className="w-5 h-5" />
            </span>
            <h2 className="text-base font-black text-slate-800">اختبار الذكاء المهني والتحليل الشخصي المهاري</h2>
          </div>
          <p className="text-[10px] text-slate-400">أداة قياس الكفاءات المدعومة بالذكاء الاصطناعي لمساعدتك في استكشاف المجالات وفرص المواءمة الرقمية الأنسب لشخصيتك.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-[9.5px] font-mono text-slate-400 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100 font-bold">
            مستوى الفحص: ذكاء تفاعلي 2026
          </span>
        </div>
      </div>

      {/* Intro Screen */}
      {currentStep === -1 && !showResults && (
        <div className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <span className="bg-purple-105 text-purple-700 font-black text-[9px] px-3 py-1 rounded-full border border-purple-200">
                ⭐ اختبار كفاءات مبتكر ومقنن لولاية تلمسان
              </span>
              <h3 className="text-indigo-950 font-black text-lg leading-snug">اكتشف نوع ذكائك المهني ووظيفة المستقبل الملائمة لجداراتك</h3>
              <p className="text-xs text-slate-650 leading-relaxed">
                هل تبحث عن المجال التقني أو القيادي أو الإحصائي الذي يحفز كامل همتك المهنية؟ يعتمد اختبار جدارتي لليقظة والذكاء المهني على تحليل سيناريوهات محاكاة عملية تهدف إلى مسح أدائك ورسم هويتك الرقمية الأنسب وفقاً لـ <strong>4 فئات معتمدة</strong> بسوق التوظيف الوطني.
              </p>

              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span><strong>5 سيناريوهات عملية:</strong> تغطي الإدارة والبرمجة وحل المشكلات والأزمات.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span><strong>توليد ذكي فوري:</strong> تقارير بيانية تفاعلية تحلل نقاط تميزك الفردية.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span><strong>تطابق فوري:</strong> اقتراح الوظائف والجهات الموائمة لك في تلمسان بلمسة نقرة.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span><strong>تحديث بروفايلك:</strong> تكامل النتائج فوراً لرفع رادار جدارتك وفتح شارة سيادية.</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-750 text-white rounded-2xl text-xs font-black transition-all shadow-md shadow-indigo-500/15 flex items-center gap-2"
                >
                  <span>البدء في إجراء الاختبار الآن المهني</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-radial from-indigo-50 to-transparent p-6 rounded-3xl border border-indigo-100/30 space-y-4 text-center">
              <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto text-3xl shadow-lg shadow-indigo-500/20">
                👑
              </div>
              <div>
                <h4 className="text-xs font-black text-indigo-950">مقياس الكفاءات وجودة التوظيف</h4>
                <p className="text-[10px] text-slate-400 mt-1">يتطابق تلقائياً مع معايير ترشيح الشركات في تلمسان والجزائر العاصمة</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[9.5px] font-bold">
                <div className="bg-white border rounded-xl p-2 text-slate-700">🔍 دقة التحليل والاستنباط</div>
                <div className="bg-white border rounded-xl p-2 text-slate-700">🎨 الابتكار وحيوية الفكر</div>
                <div className="bg-white border rounded-xl p-2 text-slate-700">👥 تفوق القيادة والتأطير</div>
                <div className="bg-white border rounded-xl p-2 text-slate-700">⚙️ جودة الأكواد والتطبيق الآمن</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Screen */}
      {currentStep >= 0 && !showResults && (
        <div className="space-y-6">
          {/* Progress Indicator */}
          <div className="flex justify-between items-center bg-slate-50 border border-slate-100 p-3 rounded-2xl">
            <span className="text-[10px] text-slate-500 font-bold">
              السؤال <strong>{currentStep + 1}</strong> من أصل <strong>{questions.length}</strong>
            </span>
            
            {/* Visual step bar */}
            <div className="w-1/2 h-2 bg-slate-200 rounded-full overflow-hidden flex flex-row-reverse gap-0.5">
              {questions.map((_, idx) => (
                <div
                  key={idx}
                  className={`flex-1 h-full rounded transition-all ${
                    idx <= currentStep ? "bg-indigo-600 animate-pulse" : "bg-slate-300"
                  }`}
                />
              ))}
            </div>

            <span className="text-[9.5px] text-indigo-650 bg-indigo-50 px-2 py-0.5 rounded font-black font-mono">
              بناء جدارتي 2026
            </span>
          </div>

          {/* Question Text Card */}
          <div className="bg-indigo-900 text-white rounded-3xl p-6 relative overflow-hidden space-y-2 shadow-xs">
            <div className="absolute top-0 right-0 w-44 h-44 bg-indigo-800/60 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center gap-2 text-indigo-300 text-[10px] font-bold">
              <Compass className="w-3.5 h-3.5" />
              <span>فحص الكفاءة والذكاء المهني العملي</span>
            </div>
            <h3 className="text-sm font-black tracking-tight leading-relaxed relative z-10">{questions[currentStep].text}</h3>
          </div>

          {/* Answer Options */}
          <div className="space-y-3">
            {questions[currentStep].options.map((opt, oIdx) => {
              const isSelected = selectedAnswers[questions[currentStep].id] === oIdx;
              return (
                <button
                  key={oIdx}
                  type="button"
                  onClick={() => handleSelectOption(questions[currentStep].id, oIdx)}
                  className={`w-full text-right p-4 rounded-2xl border transition-all text-xs flex items-start gap-3.5 ${
                    isSelected
                      ? "border-indigo-600 bg-indigo-50/70 text-indigo-950 font-bold shadow-xs scale-[1.005] ring-1 ring-indigo-500/20"
                      : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full border shrink-0 flex items-center justify-center font-mono text-[10px] ${
                    isSelected ? "border-indigo-600 bg-indigo-600 text-white font-black" : "border-slate-350 text-slate-400"
                  }`}>
                    {isSelected ? "✓" : String.fromCharCode(65 + oIdx)}
                  </span>
                  <span className="leading-relaxed">{opt.text}</span>
                </button>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="flex justify-between items-center border-t border-slate-50 pt-4 mt-6">
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 text-slate-505 hover:bg-slate-100 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <ChevronRight className="w-4 h-4" />
              <span>السابق</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={selectedAnswers[questions[currentStep].id] === undefined}
              className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shadow-xs ${
                selectedAnswers[questions[currentStep].id] !== undefined
                  ? "bg-indigo-600 hover:bg-indigo-750 text-white fill-none"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
            >
              <span>{currentStep === questions.length - 1 ? "رؤية التقرير النهائي والتحليل" : "التالي"}</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Results & Analysis Dashboard screen */}
      {showResults && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Top Celebration Congratulatory Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-3xl p-6 sm:p-8 space-y-4 text-right relative overflow-hidden shadow-md">
            <div className="absolute top-0 right-0 w-36 h-36 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-1.5">
                <span className="bg-white/15 backdrop-filter backdrop-blur-md text-white font-black text-[9px] px-3 py-1 rounded-full border border-white/20 inline-block font-mono">
                  COMPETENCIES VERIFIED ✓
                </span>
                <h3 className="text-base sm:text-lg font-black tracking-tight leading-snug">تهانينا! لقد أكملت اختبار الذكاء المهني والملائمة المهارية</h3>
                <p className="text-[10.5px] text-indigo-50/90 leading-relaxed">تم جرد كفاءاتك وخصائص شخصيتك المعاصرة لعام 2026 ومطابقتها بأمان وبصيرة بالقرار الوزاري المعتمد لجامعات الغرب.</p>
              </div>
              <div className="w-14 h-14 bg-white text-indigo-600 rounded-2xl flex items-center justify-center text-3xl font-black shrink-0 shadow-lg animate-pulse">
                🏅
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Col: Analysis results per Categories (Progress Bars) */}
            <div className="lg:col-span-7 bg-slate-50/50 border border-slate-100 rounded-3xl p-5 sm:p-6 space-y-6">
              <div>
                <h4 className="text-xs font-black text-slate-800">توزّع سمات الذكاء المهني والمهارات لديك</h4>
                <p className="text-[9.5px] text-slate-400 mt-1">تحليل شامل لكافة أصناف ومستويات كفاءتك الشخصية</p>
              </div>

              <div className="space-y-4 font-sans text-right">
                {/* 1. Analyst scale */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-slate-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-sky-505 bg-sky-500" />
                      <strong>التحليل والمطابقة الاستراتيجية (Strategic Intellect)</strong>
                    </span>
                    <span className="font-mono text-sky-700 font-bold">{scores.analyst}%</span>
                  </div>
                  <div className="h-2.5 bg-slate-200/80 rounded-full overflow-hidden">
                    <div className="bg-sky-500 h-full rounded-full transition-all duration-1000" style={{ width: `${scores.analyst}%` }} />
                  </div>
                  <p className="text-[8.5px] text-slate-400 leading-normal">يقيس مدى قدرتك على تقييم البدائل البرمجية والاعتماد على براهين البيانات الضخمة لحماية البنى.</p>
                </div>

                {/* 2. Innovator scale */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-slate-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-violet-500" />
                      <strong>الابتكار والإبداع المنهجي (Creative Visionary)</strong>
                    </span>
                    <span className="font-mono text-violet-700 font-bold">{scores.innovator}%</span>
                  </div>
                  <div className="h-2.5 bg-slate-200/80 rounded-full overflow-hidden">
                    <div className="bg-violet-500 h-full rounded-full transition-all duration-1000" style={{ width: `${scores.innovator}%` }} />
                  </div>
                  <p className="text-[8.5px] text-slate-400 leading-normal">يقيس كفاءتك في ابتكار حلول وتجارب مستخدم مرنة ذكية رائدة ومغادرتك للمسارات الروتينية الشائعة.</p>
                </div>

                {/* 3. Leader scale */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-slate-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <strong>القيادة والذكاء الإنساني والاجتماعي (Empathetic Coordinator)</strong>
                    </span>
                    <span className="font-mono text-amber-700 font-bold">{scores.leader}%</span>
                  </div>
                  <div className="h-2.5 bg-slate-200/80 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full transition-all duration-1000" style={{ width: `${scores.leader}%` }} />
                  </div>
                  <p className="text-[8.5px] text-slate-400 leading-normal">يقيس جودتك في تسيير الحوار وإقناع الزملاء وتوزيع الأعباء بطرق ديمقراطية تكسب تماسك دائم للفريق.</p>
                </div>

                {/* 4. Developer scale */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-slate-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <strong>التنفيذ التقني والدقة ومكافحة الأخطار (Technical Precision)</strong>
                    </span>
                    <span className="font-mono text-emerald-700 font-bold">{scores.developer}%</span>
                  </div>
                  <div className="h-2.5 bg-slate-200/80 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full transition-all duration-1000" style={{ width: `${scores.developer}%` }} />
                  </div>
                  <p className="text-[8.5px] text-slate-400 leading-normal">يقيس مدى التزامك بالمعايير الفنية الآمنة وجودة صقل الأكواد ومكافحة الانحراف في الجودة والمواعيد.</p>
                </div>
              </div>

              {/* Action sync to profile */}
              <div className="border-t border-slate-200/50 pt-5 space-y-3.5">
                <div className="bg-amber-50/50 text-amber-950 border border-amber-200 p-4 rounded-2xl text-[10px] space-y-1">
                  <span className="font-black text-xs block">💡 تكامل البيانات والاعتماد الأكاديمي:</span>
                  <p className="leading-relaxed">من خلال تمثيل مخرجاتك، يمكنك الضغط على 'تنشيط وتحديث راداري المهاراتي فوراً' لمزامنة ملفك المهني مع النتائج وفتح <strong>وسام الذكاء المهني والقيادي المستقل</strong> الصادر عن مرصد تلمسان الوطني بمحفظتك الرقمية الموثقة.</p>
                </div>

                {!badgeUnlocked ? (
                  <button
                    type="button"
                    onClick={handleSyncToProfile}
                    disabled={isSyncing}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-755 text-white rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 shadow-md shadow-indigo-500/10"
                  >
                    {isSyncing ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>جاري حفظ وتحفيظ مخرجات كفاءتك في البلوكشين...</span>
                      </>
                    ) : (
                      <>
                        <UserCheck className="w-4 h-4" />
                        <span>تنشيط وتحديث راداري المهاراتي ومحفظتي فوراً 🚀 (Sync Profile)</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="bg-emerald-50 text-emerald-900 border border-emerald-250 p-4 rounded-2xl text-center space-y-2.5">
                    <div className="text-xl">🏆</div>
                    <h5 className="font-black text-xs">تم تحديث ملف الباحث وإلحاق وسام جدارة بنجاح!</h5>
                    <p className="text-[9.5px] text-slate-500 leading-normal">لقد ارتفع مؤشر جدارتك الموثق. تمت مناقلة نقاط الاختبار ومصادقة الشهادة الفدرالية الخاصة بك أمنياً لدى فضاء الأعضاء.</p>
                    {onNavigateTab && (
                      <button
                        onClick={() => onNavigateTab("vault")}
                        className="text-xs text-indigo-700 underline font-bold hover:text-indigo-900"
                      >
                        عرض وسامي المهني الجديد بالخزنة الرقمية ←
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Col: Personality Archetype & Recommended careers */}
            {topArchetype && (
              <div className="lg:col-span-5 space-y-6">
                
                {/* Visual Archetype Card */}
                <div className="bg-radial from-slate-50 to-transparent border border-slate-200/80 rounded-3xl p-5 text-right space-y-4">
                  <div className="space-y-1">
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wide">النمط المهني العام الغالب لك:</span>
                    <h4 className="text-sm font-black text-indigo-950 flex items-center gap-1.5">
                      <span>{topArchetype.title}</span>
                      <span className="bg-indigo-50 text-indigo-700 text-[9px] px-2.5 py-0.5 rounded-full font-black">
                        المطابقة: {topArchetype.percent}%
                      </span>
                    </h4>
                  </div>
                  
                  <p className="text-[10.5px] text-slate-500 leading-relaxed font-sans">{topArchetype.desc}</p>
                </div>

                {/* Recommended Fields & Careers Suitability */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-black text-slate-800">المجالات والمهن الأنسب لك بسوق تلمسان (2026)</h4>
                    <p className="text-[9px] text-slate-400 mt-1">تطابق وثيق بناءً على مؤشرات العبء والجدارة المراد جردها</p>
                  </div>

                  <div className="space-y-3">
                    {topArchetype.roles.map((role, idx) => (
                      <div
                        key={idx}
                        className="bg-white border hover:border-slate-300 p-4 rounded-2xl flex flex-col justify-between text-right space-y-2 transition-all shadow-xs"
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div className="space-y-1">
                            <h5 className="text-[11px] font-black text-slate-800">{role.title}</h5>
                            <p className="text-[9px] text-slate-400 leading-relaxed">{role.desc}</p>
                          </div>
                          <span className="bg-emerald-50 text-emerald-700 font-mono text-[10px] font-black px-2.5 py-1 rounded-xl shrink-0">
                            مطابقة: {role.match}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center border-t border-slate-50 pt-2 text-[9px]">
                          <span className="text-slate-400 font-bold flex items-center gap-1">
                            <TrendingUp className="w-3 h-3 text-emerald-500" />
                            طلب مرتفع بمنطقة تلمسان ومغنية الحدودية
                          </span>
                          
                          {onNavigateTab && (
                            <button
                              onClick={() => onNavigateTab("jobs")}
                              className="text-indigo-600 hover:text-indigo-800 font-black flex items-center gap-1 font-sans"
                            >
                              <span>استكشف الشواغر المطروحة</span>
                              <ChevronLeft className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Re-do Test button */}
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={handleRestart}
                    className="text-[10px] font-black text-slate-400 hover:text-slate-800 inline-flex items-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>إعادة إجراء اختبار الكفاءات والذكاء المهني من البداية</span>
                  </button>
                </div>

              </div>
            )}
          </div>
        </div>
      )}
      
    </div>
  );
}
