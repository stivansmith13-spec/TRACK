import React from "react";
import {
  Briefcase,
  Bot,
  Trophy,
  Award,
  TrendingUp,
  User,
  BookOpen,
  Sliders,
  MessageSquare,
  Sparkles,
  Shield,
  Lock,
  ChevronRight,
  Activity,
  CheckCircle2,
  Settings,
  HelpCircle,
  Coins,
  MapPin,
  SlidersHorizontal,
  Copy,
  Check,
  RotateCcw,
  Calculator,
  CornerDownLeft
} from "lucide-react";
import { CandidateProfile, Job } from "../types";

interface CandidateDashboardProps {
  profile: CandidateProfile;
  jobs: Job[];
  onNavigateTab: (tab: "dashboard" | "radar" | "jobs" | "vault" | "career" | "advisor" | "learning" | "interview" | "reports" | "assessment" | "timeline") => void;
  onUpdateSkill: (key: string, value: number) => void;
}

export default function CandidateDashboard({
  profile,
  jobs,
  onNavigateTab,
  onUpdateSkill
}: CandidateDashboardProps) {
  // AI Smart Negotiation Simulator States
  const [selectedRole, setSelectedRole] = React.useState<string>("software-dev");
  const [locationType, setLocationType] = React.useState<"tlemcen" | "algiers">("tlemcen");
  const [simulatedMerit, setSimulatedMerit] = React.useState<number>(profile.meritScore || 82);
  const [userOffer, setUserOffer] = React.useState<string>("95000");
  const [simStep, setSimStep] = React.useState<"idle" | "running" | "done">("idle");
  const [simLog, setSimLog] = React.useState<string[]>([]);
  const [copied, setCopied] = React.useState<boolean>(false);
  const [simOutcome, setSimOutcome] = React.useState<{
    recRate: number;
    decision: string;
    recruiterReply: string;
    feedbackColor: string;
  } | null>(null);

  // Gamified Badges & Active Heroic Challenges States
  const [earnedBadges, setEarnedBadges] = React.useState<string[]>(["welcome-badge"]);
  const [selectedChallengeId, setSelectedChallengeId] = React.useState<string | null>(null);
  const [challengeTimer, setChallengeTimer] = React.useState<number>(30);
  const [challengeStatus, setChallengeStatus] = React.useState<"idle" | "playing" | "success" | "failed">("idle");
  const [selectedAnswer, setSelectedAnswer] = React.useState<string | null>(null);
  const [badgeSuccessMessage, setBadgeSuccessMessage] = React.useState<string | null>(null);

  // Countdown timer effect
  React.useEffect(() => {
    let interval: any = null;
    if (challengeStatus === "playing" && challengeTimer > 0) {
      interval = setInterval(() => {
        setChallengeTimer((prev) => {
          if (prev <= 1) {
            setChallengeStatus("failed");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [challengeStatus, challengeTimer]);

  const negotiationRoles = [
    { id: "software-dev", name: "مطور برمجيات كامل وويب (Full-Stack)", tlemcenBase: 95000, algiersBase: 130000, desc: "توطين النظم البرمجية للشركات وإنشاء النظم المتكاملة سحابياً." },
    { id: "data-analyst", name: "محلل بيانات إحصائي (Data Analyst)", tlemcenBase: 82000, algiersBase: 110000, desc: "هندسة التقارير والتحليلات وقرارات الأعمال في تلمسان وغرف التجارة." },
    { id: "cloud-engineer", name: "مهندس بنية سحابية (Cloud Architect)", tlemcenBase: 110000, algiersBase: 155000, desc: "إدارة الخواديم والشبكات السحابية السيادية ونشاطات DevOps." },
    { id: "supply-chain", name: "أخصائي سلاسل الإمداد وموانئ (Supply Chain)", tlemcenBase: 75000, algiersBase: 95000, desc: "تحسين اللوجستيات بموانئ الغزوات والميناء الجاف بمغنية." },
    { id: "cybersec", name: "خبير أمن سيبراني جمركي (Cybersecurity)", tlemcenBase: 120000, algiersBase: 160000, desc: "تأمين المعابر الحدودية وشبكات البيانات لمكافحة الهجمات الرقمية." }
  ];

  const activeRole = negotiationRoles.find(r => r.id === selectedRole) || negotiationRoles[0];
  const baseSalary = locationType === "tlemcen" ? activeRole.tlemcenBase : activeRole.algiersBase;

  // Multipliers based on simulatedMerit
  let meritMultiplier = 1.0;
  if (simulatedMerit >= 95) meritMultiplier = 1.65;
  else if (simulatedMerit >= 85) meritMultiplier = 1.48;
  else if (simulatedMerit >= 75) meritMultiplier = 1.30;
  else if (simulatedMerit >= 60) meritMultiplier = 1.15;

  const minSalary = Math.round(baseSalary * meritMultiplier * 0.9);
  const maxSalary = Math.round(baseSalary * meritMultiplier * 1.3);
  const recommendedSalary = Math.round(baseSalary * meritMultiplier * 1.15);

  const getPitchText = () => {
    return `السلام عليكم ورحمة الله وبركاته،

بناءً على مخرجات مرصد التقييم الرقمي وجدارتي المهنية المعتمدة بمعدل (${simulatedMerit}%) لدى فضاء الباحث بوزارة العمل للغرب الجزائري، وتماشياً مع متوسط الأجور بمحافظة ${locationType === "tlemcen" ? "تلمسان" : "الجزائر العاصمة"} لوظيفة "${activeRole.name}"؛ يسرني أن أطلب بكل تقدير احتساب المرجعية المالية لمهاراتي في حدود ${recommendedSalary.toLocaleString()} د.ج شهرياً.

هذا المقترح مدعوم بالبيانات ومؤشرات الجودة ومؤهل بموجب القرار الوزاري للجامعات لولاية تلمسان والتحققات الرقمية في رادار جدارتي. وافر احترامي وتقديري.`;
  };

  const runSimulation = () => {
    setSimStep("running");
    setSimLog([]);
    setSimOutcome(null);
    let i = 0;
    const logs = [
      `جاري استدعاء محرك مسح الرواتب المقارن للغرب الجزائري لعام 2026...`,
      `فحص مؤشر جدارتك (${simulatedMerit}%) المسجل في تلمسان...`,
      `مقارنة العرض المقدم (${Number(userOffer).toLocaleString()} د.ج) مع القيمة الاسمية الموصى بها (${recommendedSalary.toLocaleString()} د.ج)...`,
      `صياغة سيناريوهات التفاوض المحتملة مع مسؤول التوظيف (HR)...`,
      `توليد القرار النهائي المدعوم بالذكاء الاصطناعي...`
    ];

    const timer = setInterval(() => {
      if (i < logs.length) {
        setSimLog(prev => [...prev, logs[i]]);
        i++;
      } else {
        clearInterval(timer);
        setSimStep("done");
        
        // Calculate counter offer reaction
        const offerNum = Number(userOffer);
        const ratio = offerNum / recommendedSalary;
        let decision = "";
        let recruiterReply = "";
        let feedbackColor = "";
        
        if (simulatedMerit >= 85) {
          if (ratio < 0.8) {
            decision = "مقبول مع تعديل فوري (Counter-Offer Approved) 🥇";
            recruiterReply = `لقد أبهرنا مؤشر جدارتك المرتفع جداً (${simulatedMerit}%). ندرك ندرة مهاراتك في تلمسان ومغنية. نعلن موافقتنا الفورية على إعادة مساواة العرض ورفعه إلى ${recommendedSalary.toLocaleString()} د.ج مع حزمة تأمين صحي معززة وسجل تدريبي مجاني!`;
            feedbackColor = "border-emerald-500 bg-emerald-50 text-emerald-900";
          } else {
            decision = "قبول مطلق ومباشر (Direct Salary Acceptance) 👑";
            recruiterReply = `بالنظر لشهاداتك الموثقة على البلوكشين وتفوق رادار جدارتك، نود إتمام التعاقد فوراً بالراتب المطلوب بقيمة ${recommendedSalary.toLocaleString()} د.ج مع دمجك ببرنامج الاستقطاب الاستراتيجي.`;
            feedbackColor = "border-teal-500 bg-teal-50 text-teal-900";
          }
        } else if (simulatedMerit >= 70) {
          if (ratio < 0.82) {
            decision = "تسوية تفاوضية ناصعة (Successful Balanced Counter-Offer) ⚖️";
            recruiterReply = `عرضك رائع ومبرر كلياً بمهاراتك وسجل المواءمة الخاص بك. نود تقديم حل وسط: راتب أساسي قدره ${(Math.round(recommendedSalary * 0.95)).toLocaleString()} د.ج، مع إعادة تقييم ترقية 5% بعد انقضاء 3 أشهر من العمل الفعلي في موانئ الغرب.`;
            feedbackColor = "border-blue-500 bg-blue-50 text-blue-900";
          } else {
            decision = "قبول مرن (Flexible Standard Acceptance) ✅";
            recruiterReply = `نوافق على مستواك التنافسي ونريد الإمضاء معك بقيمة ${(Math.round(recommendedSalary * 0.98)).toLocaleString()} د.ج. أنت رصيد ممتاز لفريقنا التقني في الجزائر.`;
            feedbackColor = "border-indigo-500 bg-indigo-50 text-indigo-900";
          }
        } else {
          decision = "تحفظ مبرر مع اقتراح مواءمة (Pending Skill Upgrade) ⚠️";
          recruiterReply = `عرض الراتب مقبول لكن ميزانيتنا محدودة بالدرجة الحالية لجدارتك (${simulatedMerit}%). نقترح البدء بـ ${(Math.round(baseSalary * 0.9)).toLocaleString()} د.ج وإلحاقك بمسارات التعلم وسد الفجوة في المنصة، وعند رفع رادارك إلى 75%، سيتم ترقية الأجر تلقائياً للمعدل المطلوب.`;
          feedbackColor = "border-amber-500 bg-amber-50 text-amber-950";
        }

        setSimOutcome({
          recRate: Math.round(ratio * 100),
          decision,
          recruiterReply,
          feedbackColor
        });
      }
    }, 400);
  };

  // Mock data for chronological line chart
  const timelineMonths = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"];
  const timelineMatchPoints = [40, 55, 68, 75, 78, 82];
  const timelineSkillPoints = [35, 48, 55, 62, 70, 78];

  return (
    <div className="space-y-8 animate-fade-in font-sans pb-12" dir="rtl">
      
      {/* Dynamic Grid matching Screenshot 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Widget 1: المسار المهني الذكي */}
        <div className="lg:col-span-4 bg-white border border-slate-100 rounded-3xl p-5 shadow-xs flex flex-col justify-between text-right space-y-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">1</span>
              <h3 className="text-xs font-black text-slate-800">المسار المهني الذكي</h3>
            </div>
            <p className="text-[10px] text-slate-400">اكتشف طريقك المهني خطوة بخطوة</p>
            
            {/* Visual Steps Timeline Horizontal scroll */}
            <div className="flex items-center justify-between gap-1 py-2 overflow-x-auto no-scrollbar">
              <div className="border border-blue-200 bg-blue-50/50 p-2.5 rounded-xl text-center flex-1 min-w-[85px] relative">
                <span className="text-[9px] text-blue-650 font-black block">محلل بيانات</span>
                <span className="text-[8px] bg-emerald-100 text-emerald-800 px-1 py-0.5 rounded-full block mt-1 font-bold">أنت هنا (82%)</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-350 shrink-0" />
              <div className="border border-slate-100 p-2.5 rounded-xl text-center flex-1 min-w-[85px] opacity-75">
                <span className="text-[9px] text-slate-700 font-bold block">عالم بيانات</span>
                <span className="text-[8px] text-slate-400 block mt-1 font-mono">65% جاهزية</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-350 shrink-0" />
              <div className="border border-slate-100 p-2.5 rounded-xl text-center flex-1 min-w-[85px] opacity-60">
                <span className="text-[9px] text-slate-700 font-bold block">مهندس ذكاء</span>
                <span className="text-[8px] text-slate-400 block mt-1 font-mono">40% جاهزية</span>
              </div>
            </div>

            {/* Target Skills to Transition */}
            <div className="space-y-2 pt-1 border-t border-slate-50">
              <span className="text-[9px] text-slate-450 block font-bold">المهارات التي تحتاجها للانتقال:</span>
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {["Python", "SQL", "Machine Learning", "Deep Learning", "Statistics"].map((sk) => (
                  <span key={sk} className="bg-slate-50 text-slate-600 text-[8px] font-bold px-2.5 py-1 rounded-lg border border-slate-100/50">
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab("career")}
            className="w-full py-2.5 mt-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[10px] font-black transition-all shadow-md shadow-blue-500/10 text-center"
          >
            عرض الخطة التفصيلية
          </button>
        </div>

        {/* Widget 2: الموجه المهني الذكي Mini Widget */}
        <div className="lg:col-span-4 bg-white border border-slate-100 rounded-3xl p-5 shadow-xs flex flex-col justify-between text-right space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center font-bold text-xs">2</span>
              <h3 className="text-xs font-black text-slate-800">الموجه المهني الذكي</h3>
            </div>
            
            {/* Friendly Avatar Greeting */}
            <div className="flex items-center gap-3 bg-slate-50/50 border border-slate-100/85 p-3 rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <Bot className="w-5 h-5 animate-bounce" />
              </div>
              <div className="text-right">
                <h4 className="text-[10px] font-black text-slate-800">مرحباً أحمد! 👋</h4>
                <p className="text-[9px] text-slate-400 leading-relaxed">أنا هنا لمساعدتك في تطوير جدارتك وصياغة هويتك المهنية الذكية.</p>
              </div>
            </div>

            {/* AI Action helpers */}
            <div className="space-y-1 pt-1 text-[9px] text-slate-500 font-bold">
              <button
                onClick={() => onNavigateTab("assessment")}
                className="w-full text-right p-2 hover:bg-slate-50 rounded-xl transition-all border border-transparent hover:border-slate-100 flex items-center justify-between text-indigo-700 bg-indigo-50/20 hover:bg-indigo-50"
              >
                <span>🧠 إجراء اختبار الذكاء المهني وتحليل الكفاءات</span>
                <ChevronRight className="w-3 h-3 text-indigo-700 rotate-180" />
              </button>
              <button
                onClick={() => onNavigateTab("timeline")}
                className="w-full text-right p-2 hover:bg-emerald-50 rounded-xl transition-all border border-transparent hover:border-slate-100 flex items-center justify-between text-emerald-800 bg-emerald-50/20 hover:bg-emerald-50"
              >
                <span>📅 خط جدارة التاريخي ومحاكي الأوسمة المكتسبة</span>
                <ChevronRight className="w-3 h-3 text-emerald-800 rotate-180" />
              </button>
              <button
                onClick={() => alert("جاري الاتصال بخوارزمي براءة الاختراع والابتكار لتحليل السيرة الحالية...")}
                className="w-full text-right p-2 hover:bg-slate-50 rounded-xl transition-all border border-transparent hover:border-slate-100 flex items-center justify-between"
              >
                <span>✨ تحسين سيرتك الذاتية واحترافيتك</span>
                <ChevronRight className="w-3 h-3 text-slate-400 rotate-180" />
              </button>
              <button
                onClick={() => alert("لم يتم تقديم أي رفض إلى حد الآن لمستواك الرقمي!")}
                className="w-full text-right p-2 hover:bg-slate-50 rounded-xl transition-all border border-transparent hover:border-slate-100 flex items-center justify-between"
              >
                <span>🔍 تحليل أسباب رفض طلباتك السابقة</span>
                <ChevronRight className="w-3 h-3 text-slate-400 rotate-180" />
              </button>
              <button
                onClick={() => onNavigateTab("learning")}
                className="w-full text-right p-2 hover:bg-slate-50 rounded-xl transition-all border border-transparent hover:border-slate-100 flex items-center justify-between"
              >
                <span>🎓 اقتراح دورات لسد فجوات المهارات</span>
                <ChevronRight className="w-3 h-3 text-slate-400 rotate-180" />
              </button>
              <button
                onClick={() => onNavigateTab("interview")}
                className="w-full text-right p-2 hover:bg-slate-50 rounded-xl transition-all border border-transparent hover:border-slate-100 flex items-center justify-between"
              >
                <span>👔 تجهيز للمقابلات الذكية المباشرة</span>
                <ChevronRight className="w-3 h-3 text-slate-400 rotate-180" />
              </button>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab("advisor")}
            className="w-full py-2.5 mt-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-[10px] font-black transition-all flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>تحدث مع الموجه المهني الذكي</span>
          </button>
        </div>

        {/* Widget 3: الشارات والإنجازات */}
        <div className="lg:col-span-4 bg-white border border-slate-100 rounded-3xl p-5 shadow-xs flex flex-col justify-between text-right space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">3</span>
                <h3 className="text-xs font-black text-slate-800">الشارات والإنجازات</h3>
              </div>
              <span className="text-[8px] bg-amber-50 text-amber-700 border border-amber-100 px-2 py-0.5 rounded-full font-bold">مهاراتك.. تميزك</span>
            </div>
            
            {/* Badges container */}
            <div className="grid grid-cols-2 gap-2">
              <div className="border border-slate-100 p-2.5 rounded-2xl flex items-center gap-2 bg-slate-50/20">
                <span className="text-xl shrink-0">🐍</span>
                <div>
                  <h4 className="text-[9px] font-black text-slate-800">مطور بايثون</h4>
                  <span className="text-[8px] text-emerald-600 font-bold block">مستوى متقدم</span>
                </div>
              </div>

              <div className="border border-slate-100 p-2.5 rounded-2xl flex items-center gap-2 bg-slate-50/20">
                <span className="text-xl shrink-0">📊</span>
                <div>
                  <h4 className="text-[9px] font-black text-slate-800">تحليل البيانات</h4>
                  <span className="text-[8px] text-emerald-600 font-bold block">مستوى متقدم</span>
                </div>
              </div>

              <div className="border border-slate-100 p-2.5 rounded-2xl flex items-center gap-2 bg-slate-50/20">
                <span className="text-xl shrink-0">💡</span>
                <div>
                  <h4 className="text-[9px] font-black text-slate-800">حل المشكلات</h4>
                  <span className="text-[8px] text-emerald-600 font-bold block">مستوى متقدم</span>
                </div>
              </div>

              <div className="border border-slate-100 p-2.5 rounded-2xl flex items-center gap-2 bg-slate-50/20">
                <span className="text-xl shrink-0">👥</span>
                <div>
                  <h4 className="text-[9px] font-black text-slate-800">قائد فريق</h4>
                  <span className="text-[8px] text-orange-500 font-bold block">مستوى متوسط</span>
                </div>
              </div>
            </div>

            {/* Mini Totals details */}
            <div className="flex items-center justify-around border-t border-slate-50 pt-3">
              <div className="text-center">
                <span className="text-[9px] text-slate-400 block font-bold">إجمالي الشارات</span>
                <span className="text-lg font-black font-mono text-blue-900">12 شارة</span>
              </div>
              <div className="w-[1px] h-8 bg-slate-100/80"></div>
              <div className="text-center">
                <span className="text-[9px] text-slate-400 block font-bold">النقاط مجمعة</span>
                <span className="text-lg font-black font-mono text-orange-500">2,450 نقطة</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab("vault")}
            className="w-full py-2.5 mt-2 bg-blue-50 hover:bg-blue-100 text-blue-650 font-black rounded-xl text-[10px] transition-all border border-blue-100/40 text-center"
          >
            عرض جميع الشارات الرقمية
          </button>
        </div>

        {/* Widget 4: تتبع التطور الزمني (Dynamic Vector Chart) */}
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-3xl p-6 shadow-xs flex flex-col justify-between text-right space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">4</span>
                <h3 className="text-xs font-black text-slate-800">تتبع التطور الزمني للجدارات</h3>
              </div>
              <div className="flex gap-4 text-[9px] font-bold">
                <span className="flex items-center gap-1 text-blue-600">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span> الشهادات المتراكمة
                </span>
                <span className="flex items-center gap-1 text-emerald-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> نسبة المطابقة العامة
                </span>
              </div>
            </div>
            
            <p className="text-[10px] text-slate-400">تطور جداراتك ومعدل قبولك الخوارزمي خلال الـ 6 أشهر الماضية</p>

            {/* Custom SVG Line Chart */}
            <div className="w-full h-44 bg-slate-50/50 rounded-2xl border border-slate-100 p-2 relative flex items-center justify-center font-mono select-none">
              <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradBlue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="chartGradGreen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                
                {/* Horizontal reference grid lines */}
                <line x1="10" y1="30" x2="490" y2="30" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3,3" />
                <line x1="10" y1="75" x2="490" y2="75" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3,3" />
                <line x1="10" y1="120" x2="490" y2="120" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3,3" />

                {/* Path 1: Match points (Green) */}
                <path
                  d="M 20 120 Q 110 110 200 70 T 380 40 T 480 30 L 480 140 L 20 140 Z"
                  fill="url(#chartGradGreen)"
                />
                <path
                  d="M 20 120 Q 110 110 200 70 T 380 40 T 480 30"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Path 2: Skill scores (Blue) */}
                <path
                  d="M 20 135 Q 110 125 200 95 T 380 65 T 480 50 L 480 140 L 20 140 Z"
                  fill="url(#chartGradBlue)"
                />
                <path
                  d="M 20 135 Q 110 125 200 95 T 380 65 T 480 50"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Small indicator dots */}
                <circle cx="200" cy="70" r="4" fill="#10b981" stroke="#fff" strokeWidth="1.5" />
                <circle cx="380" cy="40" r="4" fill="#10b981" stroke="#fff" strokeWidth="1.5" />
                <circle cx="480" cy="30" r="5" fill="#10b981" stroke="#fff" strokeWidth="2" />

                <circle cx="200" cy="95" r="4" fill="#2563eb" stroke="#fff" strokeWidth="1.5" />
                <circle cx="380" cy="65" r="4" fill="#2563eb" stroke="#fff" strokeWidth="1.5" />
                <circle cx="480" cy="50" r="5" fill="#2563eb" stroke="#fff" strokeWidth="2" />
              </svg>

              {/* Grid vertical markers overlay labels */}
              <div className="absolute bottom-1.5 left-2 right-2 flex justify-between px-3 text-[8px] font-sans text-slate-400">
                {timelineMonths.map((m, idx) => (
                  <span key={idx}>{m}</span>
                ))}
              </div>

              {/* Grid Y labels */}
              <div className="absolute top-2 right-2 flex flex-col justify-between h-[80%] text-[7px] text-slate-400 font-sans text-[right]">
                <span>100% جدارة</span>
                <span>50% تطابق</span>
                <span>0% بداية</span>
              </div>
            </div>

            {/* Progress indicators items */}
            <div className="grid grid-cols-3 gap-2 text-right pt-2">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100/50">
                <span className="text-[8px] text-slate-400 block font-black">المهارات المضافة</span>
                <span className="text-xs font-black text-slate-800">+3 مهارات جديد</span>
                <span className="text-[7px] text-emerald-500 block mt-0.5 font-bold">منذ الشهر الماضي</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100/50">
                <span className="text-[8px] text-slate-400 block font-black">الساعات الأكاديمية</span>
                <span className="text-xs font-black text-slate-800">45 ساعة معتمدة</span>
                <span className="text-[7px] text-emerald-500 block mt-0.5 font-bold">بموجب قرار وزاري</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100/50">
                <span className="text-[8px] text-slate-400 block font-black">الشهادات والتحقق</span>
                <span className="text-xs font-black text-slate-800">+1 موثقة بلوكشين</span>
                <span className="text-[7px] text-sky-500 block mt-0.5 font-bold">مركز تلمسان الرقمي</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab("reports")}
            className="w-full py-2.5 mt-2 bg-slate-100 hover:bg-slate-200 text-slate-705 font-black rounded-xl text-[10px] text-center transition-all border border-slate-200/50"
          >
            عرض تقرير التطور الشامل والتحليلي
          </button>
        </div>

        {/* Widget 5: محاكي المقابلات المهنية */}
        <div className="lg:col-span-4 bg-white border border-slate-100 rounded-3xl p-5 shadow-xs flex flex-col justify-between text-right space-y-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">5</span>
              <h3 className="text-xs font-black text-slate-800">محاكي المقابلات الذكي</h3>
            </div>
            
            <p className="text-[10px] text-slate-400 mb-2 leading-relaxed">تدرب بدقة، وتجاوز خوفك واجتز أي مقبلة حقيقية بالذكاء الاصطناعي:</p>

            <div className="space-y-2">
              <div className="border border-slate-50 hover:bg-slate-50/50 p-3 rounded-2xl flex items-center justify-between transition-colors">
                <div className="text-right">
                  <h4 className="text-[10px] font-black text-slate-800">المقابلة السلوكية والقيادية</h4>
                  <span className="text-[8px] text-slate-400 block mt-0.5">⏱️ 15 دقيقة • تقييم الردود والذكاء الاجتماعي</span>
                </div>
                <button
                  onClick={() => onNavigateTab("interview")}
                  className="px-3.5 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-xl text-[9px] font-bold transition-all border border-sky-100/30"
                >
                  ابدأ التدريب
                </button>
              </div>

              <div className="border border-slate-50 hover:bg-slate-50/50 p-3 rounded-2xl flex items-center justify-between transition-colors">
                <div className="text-right">
                  <h4 className="text-[10px] font-black text-slate-800">المقابلة التقنية المفصلة</h4>
                  <span className="text-[8px] text-slate-400 block mt-0.5">⏱️ 20 دقيقة • اختبار البرمجة (React/Databases)</span>
                </div>
                <button
                  onClick={() => onNavigateTab("interview")}
                  className="px-3.5 py-1.5 bg-violet-50 hover:bg-violet-105 text-violet-700 rounded-xl text-[9px] font-bold transition-all border border-violet-100/30"
                >
                  ابدأ التدريب
                </button>
              </div>

              <div className="border border-slate-50 hover:bg-slate-50/50 p-3 rounded-2xl flex items-center justify-between transition-colors">
                <div className="text-right">
                  <h4 className="text-[10px] font-black text-slate-800">المقابلة العامة والتجريبية</h4>
                  <span className="text-[8px] text-slate-400 block mt-0.5">⏱️ 10 دقائق • التعريف بالذات ومسار الدراسات</span>
                </div>
                <button
                  onClick={() => onNavigateTab("interview")}
                  className="px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-[9px] font-bold transition-all border border-emerald-100/30"
                >
                  ابدأ التدريب
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              onNavigateTab("interview");
              alert("تم فتح محاكي المقابلات؛ اختر نو المقابلة التي تفضلها للبدء في تلمسان ومغنية.");
            }}
            className="w-full py-2.5 mt-2 bg-blue-50 hover:bg-blue-105 text-blue-660 font-black rounded-xl text-[10px] text-center transition-all border border-blue-100/30"
          >
            عرض سجل درجات المقابلات السابقة
          </button>
        </div>

        {/* Widget 6: مؤشر قابلية التوظيف Circular Score Gauges */}
        <div className="lg:col-span-4 bg-white border border-slate-100 rounded-3xl p-6 shadow-xs flex flex-col justify-between text-right space-y-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">6</span>
              <h3 className="text-xs font-black text-slate-800">مؤشر قابلية التوظيف</h3>
            </div>
            
            <p className="text-[10px] text-slate-400">مدى جاهزية هويتك الرقمية لسوق العمل</p>

            {/* Circular SVG Gauge matching image 2 */}
            <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background Ring */}
                <circle cx="50" cy="50" r="42" stroke="#f1f5f9" strokeWidth="8" fill="none" />
                {/* Rating Fill Color */}
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="#10b981"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="264"
                  strokeDashoffset={264 - (264 * 87) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black font-mono text-slate-800">87</span>
                <span className="text-[9px] font-sans text-emerald-500 font-bold">من 100 (ممتاز)</span>
              </div>
            </div>

            {/* Score sub categories details */}
            <div className="space-y-2 text-[10px] pt-1">
              <div className="flex justify-between items-center bg-slate-50/50 p-2 rounded-xl">
                <span className="text-slate-500 font-bold">المهارات والخبرة المتراكمة</span>
                <span className="font-mono text-emerald-600 font-black">90/100</span>
              </div>
              <div className="flex justify-between items-center bg-slate-50/50 p-2 rounded-xl">
                <span className="text-slate-500 font-bold">سنوات الخبرة والمشاريع</span>
                <span className="font-mono text-emerald-600 font-black">85/100</span>
              </div>
              <div className="flex justify-between items-center bg-slate-50/50 p-2 rounded-xl">
                <span className="text-slate-500 font-bold">الشهادات الموثقة المضافة</span>
                <span className="font-mono text-emerald-600 font-black">88/100</span>
              </div>
              <div className="flex justify-between items-center bg-slate-50/50 p-2 rounded-xl">
                <span className="text-slate-500 font-bold">تفاعل حساب الباحث والنشاط</span>
                <span className="font-mono text-emerald-600 font-black">80/100</span>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 text-emerald-800 text-[9px] font-black p-3.5 rounded-2xl border border-emerald-100/60 block text-center">
            👑 أنت ضمن أفضل 15% من المرشحين الفاعلين على المنصة!
          </div>
        </div>

        {/* Widget 7: مركز التعلم الموصى به */}
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-3xl p-6 shadow-xs flex flex-col justify-between text-right space-y-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">7</span>
                <h3 className="text-xs font-black text-slate-800">دورات المواءمة الموصى بها</h3>
              </div>
              <span className="text-[8px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-bold">سد فجوات المهارات</span>
            </div>
            
            <p className="text-[10px] text-slate-400">دورات تدريبية تم اختيارها خصيصاً لسد ثغراتك وزيادة فرص مطابقتك لوظيفة العمر</p>

            {/* Courses horizontal structure */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50/20 hover:bg-slate-50 transition-colors flex flex-col justify-between text-right space-y-3">
                <div className="space-y-2">
                  <span className="text-base">🐍</span>
                  <h4 className="text-[11px] font-black text-slate-800">Python للمبتدئين برمجياً</h4>
                  <p className="text-[8px] text-slate-400 leading-normal">مسار مقدم عبر Udemy يركز على التطبيقات الرياضية وقواعد البيانات.</p>
                </div>
                <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-[9px]">
                  <span className="text-slate-400">⏱️ 12 ساعة</span>
                  <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-bold font-mono">95% مناسب</span>
                </div>
              </div>

              <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50/20 hover:bg-slate-50 transition-colors flex flex-col justify-between text-right space-y-3">
                <div className="space-y-2">
                  <span className="text-base">🗄️</span>
                  <h4 className="text-[11px] font-black text-slate-800">تحليل البيانات وبنى SQL</h4>
                  <p className="text-[8px] text-slate-400 leading-normal">تنظيم وإدارة المستودعات وتحليل البيانات الضخمة المستقرة سحابياً.</p>
                </div>
                <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-[9px]">
                  <span className="text-slate-400">⏱️ 8 ساعات</span>
                  <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-bold font-mono">93% مناسب</span>
                </div>
              </div>

              <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50/20 hover:bg-slate-50 transition-colors flex flex-col justify-between text-right space-y-3">
                <div className="space-y-2">
                  <span className="text-base">🤖</span>
                  <h4 className="text-[11px] font-black text-slate-800">Machine learning في 2026</h4>
                  <p className="text-[8px] text-slate-400 leading-normal">تخطيط وبناء نماذج الذكاء الاصطناعي ومعالجة البيانات المتغيرة.</p>
                </div>
                <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-[9px]">
                  <span className="text-slate-400">⏱️ 22 ساعة</span>
                  <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-bold font-mono">92% مناسب</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab("learning")}
            className="w-full py-2.5 mt-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[10px] font-black transition-all shadow-md shadow-blue-500/10 text-center"
          >
            عرض جميع المسارات التدريبية والتعليمية المدعمة
          </button>
        </div>

        {/* Widget 8: مقارنة مهاراتك مع متطلبات السوق */}
        <div className="lg:col-span-12 bg-white border border-slate-100 rounded-3xl p-6 shadow-xs text-right space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">8</span>
            <h3 className="text-xs font-black text-slate-800">مقارنة مهاراتك مع متطلبات السوق الفورية</h3>
          </div>
          <p className="text-[10px] text-slate-400">رصد مقارن لجداراتك الفردية المزدوجة مقارنة مع متوسط طلب التوظيف في الجزائر</p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Visual Progress Bar grids */}
            <div className="lg:col-span-8 space-y-3 font-sans">
              
              {/* Python */}
              <div className="space-y-1">
                <div className="flex justify-between text-[9px] font-bold">
                  <span>Python البرمجية</span>
                  <span className="text-slate-400">أنت: <span className="text-emerald-500">85%</span> | متوسط السوق: 65%</span>
                </div>
                <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden flex">
                  <div className="bg-emerald-500 h-full rounded" style={{ width: "85%" }}></div>
                  <div className="absolute right-0 top-0 bottom-0 border-l border-slate-700 w-[65%]" style={{ width: "65%" }}></div>
                </div>
                <span className="text-[8px] text-emerald-600 block font-bold">أفضل من 70% من المرشحين المنافسين</span>
              </div>

              {/* SQL */}
              <div className="space-y-1">
                <div className="flex justify-between text-[9px] font-bold">
                  <span>قواعد بيانات SQL</span>
                  <span className="text-slate-400">أنت: <span className="text-emerald-500">80%</span> | متوسط السوق: 60%</span>
                </div>
                <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden flex">
                  <div className="bg-emerald-500 h-full rounded" style={{ width: "80%" }}></div>
                  <div className="absolute right-0 top-0 bottom-0 border-l border-slate-700" style={{ width: "60%" }}></div>
                </div>
                <span className="text-[8px] text-emerald-600 block font-bold">أفضل من 65% من المرشحين المنافسين</span>
              </div>

              {/* Data analysis */}
              <div className="space-y-1">
                <div className="flex justify-between text-[9px] font-bold">
                  <span>تحليل البيانات والذكاء الإحصائي</span>
                  <span className="text-slate-400">أنت: <span className="text-emerald-500">75%</span> | متوسط السوق: 55%</span>
                </div>
                <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden flex">
                  <div className="bg-emerald-500 h-full rounded" style={{ width: "75%" }}></div>
                  <div className="absolute right-0 top-0 bottom-0 border-l border-slate-700" style={{ width: "55%" }}></div>
                </div>
                <span className="text-[8px] text-emerald-600 block font-bold">أفضل من 60% من المرشحين المنافسين</span>
              </div>

              {/* Communication */}
              <div className="space-y-1 border-t border-slate-50 pt-2">
                <div className="flex justify-between text-[9px] font-bold">
                  <span>التواصل والعمل الجماعي</span>
                  <span className="text-slate-455 hover:text-orange-600">أنت: <span className="text-orange-500">60%</span> | متوسط السوق: 75%</span>
                </div>
                <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden flex">
                  <div className="bg-orange-400 h-full rounded" style={{ width: "60%" }}></div>
                  <div className="absolute right-0 top-0 bottom-0 border-l border-slate-700" style={{ width: "75%" }}></div>
                </div>
                <span className="text-[8px] text-orange-600 block font-bold">أقل من المطلوب في السوق بـ 15%</span>
              </div>

              {/* Time management */}
              <div className="space-y-1">
                <div className="flex justify-between text-[9px] font-bold">
                  <span>إدارة الوقت والضغط</span>
                  <span className="text-slate-455 hover:text-orange-600">أنت: <span className="text-orange-500">40%</span> | متوسط السوق: 55%</span>
                </div>
                <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden flex">
                  <div className="bg-orange-400 h-full rounded" style={{ width: "40%" }}></div>
                  <div className="absolute right-0 top-0 bottom-0 border-l border-slate-700" style={{ width: "55%" }}></div>
                </div>
                <span className="text-[8px] text-orange-600 block font-bold">أقل من المطلوب في السوق بـ 15%</span>
              </div>

            </div>

            {/* SWOT Summary report */}
            <div className="lg:col-span-4 bg-slate-50 border border-slate-100 p-4.5 rounded-2xl space-y-3">
              <h4 className="text-[10px] font-black text-slate-800">ملخص المقارنة العام</h4>
              <p className="text-[9px] text-slate-455 leading-relaxed">
                أظهر الفرز المزدوج بالذكاء الاصطناعي تفوقاً رائعاً في مهاراتك البرمجية والتحليلي مقارنة بمتسابقين آخرين (%65 أفضل).
              </p>
              <div className="space-y-1.5 text-[8.5px] text-slate-650 font-bold leading-normal">
                <div className="flex items-center gap-1.5 text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                  <span>نقاط القوة: بايثون، التحليل الرياضي، التوافق السلي مع قواعد البيانات.</span>
                </div>
                <div className="flex items-center gap-1.5 text-orange-650">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0"></span>
                  <span>نقاط التطوير: تحتاج لزيادة جدارتك اللفظية، ومهارة إدارة الوقت.</span>
                </div>
              </div>
              <button
                onClick={() => {
                  onNavigateTab("radar");
                  alert("لتعديل الكفاءات، قم بسحب مؤشرات مهاراتك من قائمة رادار الجسيمات مباشرة لترى التحول.");
                }}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[9px] font-black transition-all shadow-md shadow-blue-500/10 text-center"
              >
                تطوير مهاراتي الآن (خطة مخصصة)
              </button>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 9. محاكي التفاوض الذكي بالذكاء الاصطناعي (AI Smart Negotiation Simulator) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-12 bg-white border border-slate-100 rounded-3xl p-6 shadow-xs text-right space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-full bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.04),transparent_60%)] pointer-events-none"></div>
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-50 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] bg-blue-600 text-white font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">الذكاء المالي الموحد (Salary Intelligence)</span>
                <span className="text-[9px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-md">مؤهل استباقياً لعام 2026</span>
              </div>
              <h3 className="text-sm font-black text-slate-800 mt-1">محاكي التفاوض الذكي على الأجور (AI Smart Negotiation Simulator)</h3>
              <p className="text-[10px] text-slate-400 mt-1">
                حلل متوسطات رواتب الشركات في تلمسان والجزائر، وحدّد أفضليتك المالية وقوتك التفاوضية المبرهنة بموجب رادار جدارتك الفردية.
              </p>
            </div>
            <div className="flex items-center gap-1 bg-amber-50 text-amber-800 text-[10px] font-black px-3 py-1.5 rounded-xl border border-amber-100/60 shrink-0">
              <Coins className="w-3.5 h-3.5" />
              <span>المرجعية الأكاديمية والقرار الوزاري</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* RIGHT SIDE: Parameters Adjusters */}
            <div className="lg:col-span-7 bg-slate-50/50 border border-slate-100 p-5 rounded-2xl space-y-4">
              <h4 className="text-[11px] font-black text-slate-800 flex items-center gap-1.5 pb-2 border-b border-slate-100/70">
                <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
                <span>إعداد معايير التفاوض والشركة</span>
              </h4>

              {/* Selector 1: Role */}
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-500 block">اختر المهنة المقارنة في الجزائر:</label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full bg-white border border-slate-150 rounded-xl p-2.5 text-[11px] font-bold text-slate-700 outline-none focus:border-blue-500 hover:border-blue-400 transition-colors"
                >
                  {negotiationRoles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
                <span className="text-[8.5px] text-slate-400 block pr-1 leading-normal">{activeRole.desc}</span>
              </div>

              {/* Selector 2: Location Switch */}
              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-slate-500 block">نطاق الشركة الاقتصادي والجغرافي:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setLocationType("tlemcen")}
                    className={`py-2 px-3 rounded-xl text-[10.5px] font-black border transition-all flex items-center justify-center gap-1.5 relative ${
                      locationType === "tlemcen"
                        ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50/80"
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>ولاية تلمسان (الغرب الجزائري)</span>
                    {locationType === "tlemcen" && (
                      <span className="absolute top-0.5 left-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setLocationType("algiers")}
                    className={`py-2 px-3 rounded-xl text-[10.5px] font-black border transition-all flex items-center justify-center gap-1.5 relative ${
                      locationType === "algiers"
                        ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50/80"
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>الجزائر العاصمة والشركات الكبرى</span>
                    {locationType === "algiers" && (
                      <span className="absolute top-0.5 left-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    )}
                  </button>
                </div>
              </div>

              {/* Selector 3: Adjust Merit Score */}
              <div className="space-y-1 pb-1 pt-1 bg-white/40 border border-slate-100 p-3 rounded-xl">
                <div className="flex justify-between items-center text-[9px] font-bold">
                  <span className="text-slate-500">مؤشر الجدارة المهني الافتراضي للتفاوض:</span>
                  <span className="font-mono text-blue-600 text-[11px] font-black bg-blue-50 px-2 py-0.5 rounded-md">{simulatedMerit}%</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="100"
                  value={simulatedMerit}
                  onChange={(e) => setSimulatedMerit(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[8px] text-slate-400 font-bold pt-0.5">
                  <span>جدارة متوسطة (40%)</span>
                  <span className="text-emerald-605 font-black text-emerald-600">جدارتك الحالية ({profile.meritScore}%)</span>
                  <span>جدارة مطلقة (100%)</span>
                </div>
              </div>

              {/* Selector 4: Recruiter Current Proposed Offer */}
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-500 block">عرض الراتب المالي لتجربته (د.ج شهرياً):</label>
                <div className="relative">
                  <input
                    type="number"
                    value={userOffer}
                    onChange={(e) => setUserOffer(e.target.value)}
                    placeholder="مثال: 95000"
                    className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-[11px] font-black text-slate-700 outline-none focus:border-blue-500 pl-12 text-left"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[9px] font-black text-slate-400">د.ج / شهر</div>
                </div>
                <span className="text-[8px] text-slate-400 block pr-1 font-medium">أدخل تقدير الراتب الذي عرضه عليك مسؤول الموارد البشرية لترى سيناريو الرد.</span>
              </div>

            </div>

            {/* LEFT SIDE: Salary Results Dashboard */}
            <div className="lg:col-span-12 xl:col-span-5 flex flex-col justify-between space-y-4">
              
              {/* Target Salary display Card */}
              <div className="bg-gradient-to-br from-blue-950 to-slate-900 text-white rounded-2xl p-5 shadow-md text-center relative overflow-hidden border border-blue-550/10">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_60%)] pointer-events-none"></div>
                
                <span className="text-[8.5px] bg-emerald-500 text-slate-950 font-black px-1.5 py-0.5 rounded uppercase">الراتب المستحق والمطابق لجدارتك</span>
                
                <div className="mt-3">
                  <h4 className="text-xl font-black font-mono text-emerald-300">
                    {recommendedSalary.toLocaleString()} د.ج
                  </h4>
                  <p className="text-[8px] text-slate-300 mt-1">نوصي بالتفاوض على هذه القيمة كعرض مضاد بناءً على قوتك التنافسية</p>
                </div>

                <div className="grid grid-cols-2 gap-2 border-t border-white/5 pt-3 mt-3 text-[9px] font-bold text-slate-200">
                  <div className="text-right">
                    <span className="text-[8px] text-slate-400 block">الحد الأقصى (الهدف)</span>
                    <span className="font-mono text-slate-100">{maxSalary.toLocaleString()} د.ج</span>
                  </div>
                  <div className="text-left border-r border-white/5 pr-2">
                    <span className="text-[8px] text-slate-400 block">الحد الأدنى المقبول</span>
                    <span className="font-mono text-slate-100">{minSalary.toLocaleString()} د.ج</span>
                  </div>
                </div>
              </div>

              {/* Negotiation Power Level card */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-2 text-right">
                <h4 className="text-[9.5px] font-black text-slate-700">قوتك التفاوضية الحالية:</h4>
                {simulatedMerit >= 85 ? (
                  <div className="space-y-1">
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 font-black px-2 py-0.5 rounded">👑 درجة النخبة (Elite Merit Tier)</span>
                    <p className="text-[8.5px] text-slate-500 leading-normal">
                      مؤهلاتك مبرهنة وشهاداتك موثقة رقمياً. ننصح برفض العروض دون {minSalary.toLocaleString()} د.ج بقوة، فالشركات مستعدة لدعم طلبك كأولوية بموجب قانون ١٢٧٥.
                    </p>
                  </div>
                ) : simulatedMerit >= 75 ? (
                  <div className="space-y-1">
                    <span className="text-[9px] bg-blue-100 text-blue-800 font-black px-2 py-0.5 rounded">🛡️ المستوى المتقدم الفضي (Advanced Silver)</span>
                    <p className="text-[8.5px] text-slate-500 leading-normal">
                      جدارتك المهنية أعلى من 75% من المتقدمين بنطاق الغرب. المقترح المالي المفضل في حدود {recommendedSalary.toLocaleString()} د.ج مقبول جداً وقابل للحيازة التامة.
                    </p>
                  </div>
                ) : simulatedMerit >= 60 ? (
                  <div className="space-y-1">
                    <span className="text-[9px] bg-orange-100 text-orange-850 font-black px-2 py-0.5 rounded">⚡ مواءمة مقبولة (Stable Merit Tier)</span>
                    <p className="text-[8.5px] text-slate-500 leading-normal">
                      تتساوى مهاراتك مع معدل السوق بتلمسان. يمكنك التفاوض برفق بحدود {recommendedSalary.toLocaleString()} د.ج، ورفع رادارك بمهارات البرمجة يرفع قوتك فوراً.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <span className="text-[9px] bg-red-100 text-red-800 font-black px-2 py-0.5 rounded">⚠️ نطاق بحاجة للترقية المهنية (Needs Upgrades)</span>
                    <p className="text-[8.5px] text-slate-500 leading-normal">
                      جدارتك في رادار الباحث دون 60%. التفاوض المالي المباشر بمبالغ كبيرة قد يقلص من استدعائك. ننصح أولاً بالضغط على زر "تطوير طرقي" لتجاوز الفجوات.
                    </p>
                  </div>
                )}
              </div>

              {/* Simulation Trigger button */}
              <button
                type="button"
                onClick={runSimulation}
                disabled={simStep === "running" || !userOffer}
                className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-350 disabled:to-slate-400 text-white rounded-xl text-[10.5px] font-black transition-all flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/10 cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-white" />
                {simStep === "running" ? "جاري تشغيل الخوارزم المحاكي المالي..." : "بدء محاكاة ردود مسؤول التوظيف (Simulate Recruiter Reaction)"}
              </button>

            </div>

          </div>

          {/* SIMULATION REALTIME DISCUSSIONS DISPLAY */}
          {simStep !== "idle" && (
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 animate-fade-in text-left font-mono" dir="ltr">
              <span className="text-[8px] bg-slate-800 text-slate-200 px-2 py-0.5 rounded block w-fit font-bold">Recruiter Negotiation Terminal - AI V1</span>
              
              {/* Sequential Logs */}
              <div className="space-y-1.5 text-[9.5px] text-emerald-400">
                {simLog.map((log, index) => (
                  <div key={index} className="flex items-start gap-1">
                    <span className="text-blue-400 shrink-0">&gt;&gt;</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>

              {/* Loading blinking prompt */}
              {simStep === "running" && (
                <div className="w-2 h-3.5 bg-emerald-400 inline-block animate-ping ml-5"></div>
              )}

              {/* Simulation Outcome results */}
              {simStep === "done" && simOutcome && (
                <div className={`mt-4 p-4 rounded-xl border text-right transition-all animate-fade-in ${simOutcome.feedbackColor}`} dir="rtl">
                  <div className="flex justify-between items-center pb-2 border-b border-black/5 mb-2 text-[10.5px] font-black">
                    <span className="flex items-center gap-1 text-slate-850">
                      <Bot className="w-3.5 h-3.5" />
                      <span>سيناريو رد مسؤول التوظيف (HR Representative):</span>
                    </span>
                    <span className="underline text-blue-900">{simOutcome.decision}</span>
                  </div>
                  <p className="text-[10px] leading-relaxed font-sans font-bold whitespace-pre-wrap">
                    "{simOutcome.recruiterReply}"
                  </p>
                </div>
              )}
            </div>
          )}

          {/* NEGOTIATION EMAIL PITCH DOCUMENT GENERATOR */}
          <div className="border border-slate-150 rounded-2xl p-5 space-y-3 bg-slate-50/30">
            <div className="flex justify-between items-center">
              <h4 className="text-[10px] font-black text-slate-800 flex items-center gap-1.5">
                <Bot className="w-4 h-4 text-emerald-600" />
                <span>مستند الرد والتفاوض الجاهز للمراسلة (AI Pitch Script):</span>
              </h4>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(getPitchText());
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className={`px-3 py-1.5 rounded-xl text-[9px] font-black transition-all flex items-center gap-1 cursor-pointer select-none ${
                  copied
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-200 hover:bg-slate-350 text-slate-700"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white animate-scale-up" />
                    <span>تم النسخ بنجاح! ⚡</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-600" />
                    <span>انسخ المستند للتقديم 📋</span>
                  </>
                )}
              </button>
            </div>

            <textarea
              readOnly
              value={getPitchText()}
              rows={6}
              className="w-full bg-white border border-slate-150 rounded-xl p-3.5 text-[9.5px] font-bold text-slate-600 font-mono outline-none resize-none leading-relaxed text-right select-all"
            />
            <div className="flex items-start gap-1 text-[8.5px] text-slate-400">
              <span className="text-blue-500 font-bold shrink-0">💡 نصيحة الخبراء:</span>
              <p className="leading-normal">
                يمكنك إرسال الرسالة السابقة المعتمدة مباشرة بالبريد الإلكتروني للشركة الموظفة في الجزائر العاصمة أو تلمسان رداً على عرض أجورهم، لتوثيق جدارتك بدراسات علم المواءمة المعتمد.
              </p>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 10. نظام الأوسمة والجوائز الرقمية المعتمدة (Verifiable Digital Badges & Challenges) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-12 bg-white border border-slate-100 rounded-3xl p-6 shadow-xs text-right space-y-6 relative overflow-hidden mt-6">
          <div className="absolute top-0 right-0 w-80 h-full bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.04),transparent_60%)] pointer-events-none"></div>

          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-50 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] bg-purple-600 text-white font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider animate-pulse">شرف التميز (Merit Excellence) 🏅</span>
                <span className="text-[9px] text-purple-600 font-bold bg-purple-50 px-2 py-0.5 rounded-md">الأوسمة والجوائز الرقمية الموثقة</span>
              </div>
              <h3 className="text-sm font-black text-slate-800 mt-1">مرصد الأوسمة والجوائز الرقمية المانحة للتميز المهني</h3>
              <p className="text-[10px] text-slate-400 mt-1 pb-1">
                اجتاز التحديات المهنية الصعبة والبرمجة في وقت قياسي لإظهار أوسمتك اللامعة في ملفك الشخصي أمام أصحاب العمل.
              </p>
            </div>
            <div className="flex items-center gap-1.5 bg-purple-50 text-purple-800 text-[10px] font-black px-3 py-1.5 rounded-xl border border-purple-100/60 shrink-0">
              <Trophy className="w-3.5 h-3.5" />
              <span>جدارتك المهنية: {profile.meritScore}%</span>
            </div>
          </div>

          {/* 1. MY BADGES EXPANSION VAULT */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-black text-slate-700 flex items-center gap-1.5 justify-start">
              <Award className="w-4 h-4 text-purple-500" />
              <span>خزانة أوسمتي الرقمية النشطة بالملف الشخصي (My Digital Badge Vault):</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  id: "welcome-badge",
                  title: "رواد التأسيس والابتكار (Pioneer Beacon)",
                  desc: "ممنوح كشرف للانضمام الأولي لمنظومة فضاء الباحث وجدارته.",
                  unlocked: earnedBadges.includes("welcome-badge"),
                  color: "from-blue-500 to-indigo-600",
                  textColor: "text-blue-300"
                },
                {
                  id: "speed-code",
                  title: "نخبة بطل الخوارزميات (Speed Loop Champion)",
                  desc: "استشعار وحل ثغرة التكرار ومعالجة I/O في تلمسان بالوقت القياسي.",
                  unlocked: earnedBadges.includes("speed-code"),
                  color: "from-emerald-500 to-teal-600",
                  textColor: "text-emerald-300"
                },
                {
                  id: "cyber-defense",
                  title: "درع السيادة السيبرانية (CyberShield Guardian)",
                  desc: "تحصين وحقن الاستعلامات وحجب هجمات المنافذ الحدودية لجمارك مغنية.",
                  unlocked: earnedBadges.includes("cyber-defense"),
                  color: "from-pink-500 to-rose-600",
                  textColor: "text-rose-300"
                },
                {
                  id: "supply-optimal",
                  title: "مهندس تدفق المعابر الغربية (Dryport Flow Master)",
                  desc: "حل معضلة تفريغ الزيتون والميناء الجاف استناداً للهياكل الرياضية.",
                  unlocked: earnedBadges.includes("supply-optimal"),
                  color: "from-amber-500 to-orange-600",
                  textColor: "text-amber-300"
                }
              ].map((badge) => (
                <div
                  key={badge.id}
                  className={`border rounded-2xl p-4 flex flex-col items-center text-center transition-all relative overflow-hidden ${
                    badge.unlocked
                      ? "bg-gradient-to-br from-slate-900 to-purple-950 border-purple-500/40 shadow-md shadow-purple-500/5 scale-102"
                      : "bg-slate-50 border-slate-200 opacity-60 select-none"
                  }`}
                >
                  {/* Badge Lock Frame Overlay */}
                  {!badge.unlocked && (
                    <div className="absolute inset-0 bg-slate-100/40 backdrop-blur-[0.5px] flex items-center justify-center z-10">
                      <div className="bg-slate-900 text-white p-2 rounded-xl border border-white/10 flex items-center gap-1 text-[8.5px] font-black">
                        <Lock className="w-3 h-3 text-red-400" />
                        <span>مغلق - اجتز التحدي</span>
                      </div>
                    </div>
                  )}

                  <div className={`w-12 h-12 rounded-full bg-gradient-to-tr ${badge.color} text-white flex items-center justify-center shadow-lg relative mb-3 shrink-0`}>
                    <Trophy className="w-6 h-6 text-white" />
                    {badge.unlocked && (
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-950 flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-slate-950 stroke-[3]" />
                      </span>
                    )}
                  </div>

                  <h5 className={`text-[11px] font-black ${badge.unlocked ? "text-purple-250 text-white" : "text-slate-700"}`}>
                    {badge.title}
                  </h5>
                  <p className={`text-[9px] mt-1 line-clamp-3 leading-relaxed ${badge.unlocked ? "text-slate-300" : "text-slate-400"}`}>
                    {badge.desc}
                  </p>

                  <div className="mt-3.5 border-t border-slate-200/50 w-full pt-2 flex justify-between items-center text-[8.2px] font-bold">
                    <span className={badge.unlocked ? "text-purple-300" : "text-slate-400"}>الحالة:</span>
                    <span className={badge.unlocked ? "text-emerald-400 font-extrabold" : "text-slate-405"}>
                      {badge.unlocked ? "✓ موثق بالملف" : "قيد الهجوم والانتظار"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. CHOOSE ACTIVE CAREER CHALLENGE SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2 border-t border-slate-100">
            
            {/* Left Col: Challenges List */}
            <div className="lg:col-span-6 space-y-4">
              <h4 className="text-[11px] font-black text-slate-700 flex items-center gap-1.5 justify-start">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>اختر تحدياً صعباً للتكامل المهني:</span>
              </h4>

              <div className="space-y-3">
                {[
                  {
                    id: "challenge-speed-code",
                    title: "تحدي البرمجة السريعة ومعالجة الـ I/O ⚡",
                    badgeId: "speed-code",
                    category: "هندسة الخوارزميات والبرمجيات",
                    difficulty: "درجة الصعوبة: فائق (Hard)",
                    duration: "30 ثانية",
                    rewardDesc: "وسام بطل الخوارزميات +12% في جدارة البرمجيات"
                  },
                  {
                    id: "challenge-cyber-defense",
                    title: "تحدي اختراق وحقن جمارك مغنية 🛡️",
                    badgeId: "cyber-defense",
                    category: "الأمن السيبراني وبنية الحوارث",
                    difficulty: "درجة الصعوبة: مبرر أمنياً (Critical)",
                    duration: "35 ثانية",
                    rewardDesc: "درع السيادة السيبرانية +15% في جدارة حل المشكلات"
                  },
                  {
                    id: "challenge-supply-optimal",
                    title: "تحدي التفريغ والميناء الرياضي بميناء الغزوات ⚓",
                    badgeId: "supply-optimal",
                    category: "سلاسل الإمداد وموانئ الغرب",
                    difficulty: "درجة الصعوبة: تحليلي لوجستي",
                    duration: "40 ثانية",
                    rewardDesc: "وسام مهندس تدفق الموانئ +10% في جدارة تحليل البيانات"
                  }
                ].map((ch) => {
                  const challengeEarned = earnedBadges.includes(ch.badgeId);
                  const isChPlaying = selectedChallengeId === ch.id;

                  return (
                    <div
                      key={ch.id}
                      className={`border rounded-2xl p-4 text-right transition-all flex flex-col justify-between space-y-3 ${
                        isChPlaying
                          ? "border-purple-500 bg-purple-50/40 shadow-md"
                          : challengeEarned
                          ? "border-emerald-100 bg-emerald-50/15 opacity-85"
                          : "border-slate-150 bg-white hover:border-purple-300"
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-start">
                          <span className={`text-[8.5px] px-2 py-0.5 rounded font-black ${
                            challengeEarned
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-purple-100 text-purple-800"
                          }`}>
                            {ch.category}
                          </span>
                          <span className="text-[8.5px] font-mono text-slate-400 font-bold">{ch.difficulty}</span>
                        </div>
                        <h4 className="text-[11px] font-black text-slate-800">{ch.title}</h4>
                        <p className="text-[9.2px] text-slate-450 font-bold">
                          المكافأة: <span className="text-purple-700 underline">{ch.rewardDesc}</span>
                        </p>
                      </div>

                      <div className="flex justify-between items-center border-t border-slate-100/60 pt-2.5">
                        <span className="text-[9px] text-slate-400 font-bold">الوقت المتاح: {ch.duration}</span>
                        {challengeEarned ? (
                          <span className="text-[8.5px] bg-emerald-100 text-emerald-800 font-extrabold px-3 py-1.5 rounded-xl flex items-center gap-1">
                            <Check className="w-3 h-3 text-emerald-700" />
                            <span>مكتمل وموثق ✓</span>
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedChallengeId(ch.id);
                              setChallengeStatus("playing");
                              setSelectedAnswer(null);
                              setBadgeSuccessMessage(null);
                              if (ch.id === "challenge-speed-code") setChallengeTimer(30);
                              else if (ch.id === "challenge-cyber-defense") setChallengeTimer(35);
                              else setChallengeTimer(40);
                            }}
                            disabled={challengeStatus === "playing"}
                            className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-750 disabled:bg-slate-350 text-white font-black text-[9.5px] rounded-xl transition-all cursor-pointer shadow-sm shadow-purple-500/10 hover:shadow-md"
                          >
                            {isChPlaying ? "جاري حل التحدي..." : "ابدأ التحدي فوراً ⚡"}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Col: Interactive Simulation Terminal Console */}
            <div className="lg:col-span-6 flex flex-col justify-start">
              <h4 className="text-[11px] font-black text-slate-700 flex items-center gap-1.5 justify-start mb-4">
                <Bot className="w-4 h-4 text-purple-600" />
                <span>منصة اختبار النخبة الفورية (AI Cyber Sandbox):</span>
              </h4>

              {/* Terminal Box */}
              <div className="bg-slate-950 text-white rounded-2xl border border-slate-805 p-5 min-h-[340px] flex flex-col justify-between relative overflow-hidden font-mono shadow-inner shadow-black/80">
                <div className="absolute top-0 left-0 w-24 h-full bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.1),transparent_70%)] pointer-events-none"></div>

                {/* Simulated Screen */}
                {challengeStatus === "idle" && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 p-4">
                    <Trophy className="w-12 h-12 text-purple-400 opacity-60 animate-bounce" />
                    <div className="space-y-1.5">
                      <h4 className="text-[11.5px] font-black text-purple-300">منصة كسر القيود بالوقت الحقيقي</h4>
                      <p className="text-[9.5px] text-slate-400 font-sans leading-relaxed max-w-sm">
                        اختر أحد اختبارات التميز من القائمة الجانبية. ستقوم لوحة التحكم ببدء عد تنازلي فوري لقياس ضغط العمل وإيجاد الحلول.
                      </p>
                    </div>
                    <span className="text-[8px] bg-white/5 border border-white/10 text-slate-400 font-mono px-3 py-1 rounded-md">
                      AI_EXCELLENCE_MODULE_STANDBY // PROD 2026
                    </span>
                  </div>
                )}

                {challengeStatus === "playing" && (
                  <div className="flex-1 flex flex-col justify-between space-y-4 text-left" dir="ltr">
                    
                    {/* Header values */}
                    <div className="flex justify-between items-center border-b border-white/10 pb-2 text-[9px] font-bold">
                      <span className="text-purple-400 animate-pulse">&gt;&gt; ACTIVE EXCELLENCE EXPERIMENT</span>
                      <span className={`px-2 py-0.5 rounded text-white bg-red-650 animate-ping`}>
                        TIME REMAINING: {challengeTimer}s ⏱️
                      </span>
                    </div>

                    {/* Question representation */}
                    <div className="space-y-3">
                      <div className="bg-slate-900 border border-purple-500/10 p-3 rounded-lg text-[9.5px] text-indigo-200 whitespace-pre-wrap leading-relaxed">
                        {selectedChallengeId === "challenge-speed-code" && (
                          challengeTimer > 0 ? (
                            `while (index < salesList.length) {
    if (salesList[index].isValid) {
      processOrder(salesList[index]);
    }
    // MISING CODE_STATEMENT IN SPEED_LOOP
  }`
                          ) : ""
                        )}
                        {selectedChallengeId === "challenge-cyber-defense" && (
                          `SELECT * FROM shipments WHERE id = '' OR '1'='1';
                          
[ALERT]: SQL Parameter Bypass Detected at Wilaya Tlemcen Port Database!`
                        )}
                        {selectedChallengeId === "challenge-supply-optimal" && (
                          `Optimize transit and wait-tariffs at Ghazaouet harbor:
                          
- Cargo A: 3h, Cost: 400.000 dzd.
- Cargo B: 2h, Cost: 600.000 dzd (Double revenue on quick clearance).`
                        )}
                      </div>

                      <p className="text-[9.2px] text-slate-400 text-right leading-relaxed font-sans font-bold" dir="rtl">
                        {selectedChallengeId === "challenge-speed-code" && "أين يكمن الخلل المسبب للبطء والانهيار الفوري؟"}
                        {selectedChallengeId === "challenge-cyber-defense" && "ما هو الأسلوب البرمجي الصارم والسيادي لحماية جمارك مغنية من هجمات حقن البيانات؟"}
                        {selectedChallengeId === "challenge-supply-optimal" && "ما هو القرار التسلسلي الأمثل لتفادي تكدس الحاويات وتقليل رسوم الانتظار؟"}
                      </p>
                    </div>

                    {/* Interactive Multiple Choice options */}
                    <div className="space-y-2 pt-2 text-right" dir="rtl">
                      {(selectedChallengeId === "challenge-speed-code"
                        ? [
                            { key: "a", text: "أ) عدم تعديل وتحديث العداد (index++) داخل التكرار مما ينشئ حلقة لا نهائية." },
                            { key: "b", text: "ب) محاولة استخدام مصفوفة فارغة تماماً دون توقيع." },
                            { key: "c", text: "ج) استدعاء الدالة processOrder عدة مرات بالتوازي." }
                          ]
                        : selectedChallengeId === "challenge-cyber-defense"
                        ? [
                            { key: "a", text: "أ) زيادة سعة خادم الجمرك وتشفير العناوين اليدوية." },
                            { key: "b", text: "ب) استخدام الاستعلامات المجهزة والمُعلمة (Parameterized Queries) لفصل البيانات عن الأوامر." },
                            { key: "c", text: "ج) تعطيل منافذ الاسترجاع وحجب الرموز النصية برمجياً بالكامل." }
                          ]
                        : [
                            { key: "a", text: "أ) إعطاء الأولوية للشحنة (أ) تلقائياً والتأمل في توقف الخسارة." },
                            { key: "b", text: "ب) بدء تفريغ السفينة (ب) أولاً لأنها توفر أسرع وقت وأعلى عائد مالي للشركة والدولة." },
                            { key: "c", text: "ج) تأجيل التفريق اللوجستي ريثما تمر شاحنات الحدود البرية يدوياً." }
                          ]
                      ).map((opt) => (
                        <button
                          key={opt.key}
                          type="button"
                          onClick={() => setSelectedAnswer(opt.key)}
                          className={`w-full p-2 rounded-xl border text-[9.5px] font-sans font-black flex items-center justify-between text-right leading-relaxed transition-all cursor-pointer ${
                            selectedAnswer === opt.key
                              ? "bg-purple-900/50 border-purple-400 text-purple-200"
                              : "bg-slate-900 border-white/5 text-slate-300 hover:border-white/10"
                          }`}
                        >
                          <span className="flex-1 shrink-0">{opt.text}</span>
                          <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                            selectedAnswer === opt.key
                              ? "border-purple-400 bg-purple-500 text-slate-950"
                              : "border-slate-600"
                          }`}>
                            {selectedAnswer === opt.key && <span className="w-2 h-2 rounded-full bg-slate-950"></span>}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Submit Actions */}
                    <div className="flex gap-2 justify-end pt-3 text-right">
                      <button
                        type="button"
                        onClick={() => setChallengeStatus("idle")}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-[9px] font-black cursor-pointer"
                      >
                        إلغاء التحدي ⏎
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (!selectedAnswer) {
                            alert("الرجاء اختيار إجابة أولاً!");
                            return;
                          }
                          const correctMap: { [key: string]: string } = {
                            "challenge-speed-code": "a",
                            "challenge-cyber-defense": "b",
                            "challenge-supply-optimal": "b"
                          };
                          const selectedChallengeObj = [
                            { id: "challenge-speed-code", badgeId: "speed-code", skillToUpgrade: "البرمجيات", upgradeAmount: 12 },
                            { id: "challenge-cyber-defense", badgeId: "cyber-defense", skillToUpgrade: "حل المشكلات", upgradeAmount: 15 },
                            { id: "challenge-supply-optimal", badgeId: "supply-optimal", skillToUpgrade: "تحليل البيانات", upgradeAmount: 10 }
                          ].find(o => o.id === selectedChallengeId);

                          if (selectedAnswer === correctMap[selectedChallengeId || ""]) {
                            setChallengeStatus("success");
                            // Add badge (ensure unique)
                            if (selectedChallengeObj && !earnedBadges.includes(selectedChallengeObj.badgeId)) {
                              setEarnedBadges(prev => [...prev, selectedChallengeObj.badgeId]);
                              onUpdateSkill(selectedChallengeObj.skillToUpgrade, Math.min(100, (profile.skills[selectedChallengeObj.skillToUpgrade] || 0) + selectedChallengeObj.upgradeAmount));
                            }
                          } else {
                            setChallengeStatus("failed");
                          }
                        }}
                        className="px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-[9.5px] font-black cursor-pointer flex items-center gap-1"
                      >
                        <span>تحقق برمجياً وقم بحقن الحل 🧪</span>
                      </button>
                    </div>

                  </div>
                )}

                {/* Success Screen */}
                {challengeStatus === "success" && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 p-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center animate-bounce border border-emerald-400/30">
                      <Trophy className="w-10 h-10 text-emerald-400" />
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="text-xs font-black text-emerald-400">تم فك المعضلة وحل التحدي في وقت قياسي! 👑</h4>
                      <p className="text-[10px] text-slate-350 font-sans leading-relaxed max-w-sm" dir="rtl">
                        تهانينا الحارة! لقد أثبت درجاتك الاستثنائية في حل مشكلات الغرب الجزائري. جرى منحك الوسام بنجاح، وترقية مهارات ملفك بمعدل جبهي لتوفير موثوقية مثالية أمام صانع القرار في تلمسان.
                      </p>
                    </div>

                    <div className="bg-emerald-900/20 border border-emerald-500/20 p-3 rounded-xl max-w-sm">
                      <p className="text-[9.5px] text-emerald-300 font-bold leading-normal font-sans" dir="rtl">
                        {selectedChallengeId === "challenge-speed-code" && "✓ تم ترقية مهارة 'البرمجيات' بملفك بنسبة +12% تلقائياً وتوثيق وسام 'بطل الخوارزميات'!"}
                        {selectedChallengeId === "challenge-cyber-defense" && "✓ تم ترقية مهارة 'حل المشكلات' بملفك بنسبة +15% تلقائياً وتوثيق وسام 'درع حماية السيادة السيبرانية'!"}
                        {selectedChallengeId === "challenge-supply-optimal" && "✓ تم ترقية مهارة 'تحليل البيانات' بملفك بنسبة +10% تلقائياً وتوثيق وسام 'مبدع سلاسل تدفق الغرب'!"}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setChallengeStatus("idle")}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-[9.5px] font-black cursor-pointer transition-all"
                    >
                      متابعة واستكشاف الأوسمة 🚀
                    </button>
                  </div>
                )}

                {/* Failure screen */}
                {challengeStatus === "failed" && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 p-4">
                    <div className="w-16 h-16 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center border border-red-500/30">
                      <Lock className="w-8 h-8 text-red-400" />
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="text-xs font-black text-red-400">انتهى الوقت أو وقع انهيار خادم الفحص (System Crash) ⚠️</h4>
                      <p className="text-[9.5px] text-slate-350 font-sans leading-relaxed max-w-sm" dir="rtl">
                        لم تنجح المحاولة هذه المرة. خوارزميات الذكاء المهني تقترح مراجعة المسارات الأكاديمية ومركز التعلم في تلمسان للوقوف التام على نقاط ومصادر القوة.
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setChallengeStatus("playing");
                          setSelectedAnswer(null);
                          if (selectedChallengeId === "challenge-speed-code") setChallengeTimer(30);
                          else if (selectedChallengeId === "challenge-cyber-defense") setChallengeTimer(35);
                          else setChallengeTimer(40);
                        }}
                        className="px-4 py-1.5 bg-red-650 hover:bg-red-750 text-white rounded-lg text-[9.5px] font-black cursor-pointer transition-all"
                      >
                        محاولة التحدي مجدداً ⚡
                      </button>

                      <button
                        type="button"
                        onClick={() => setChallengeStatus("idle")}
                        className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-[9.5px] font-black cursor-pointer transition-all"
                      >
                        العودة للخلف
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
