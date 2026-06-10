import React, { useState } from "react";
import {
  TrendingUp,
  Calendar,
  Award,
  BookOpen,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Layers,
  Zap,
  Briefcase,
  HelpCircle,
  FileText
} from "lucide-react";
import { CandidateProfile, Certificate } from "../types";

interface MeritTimelineProps {
  profile: CandidateProfile;
  jobsCount?: number;
  onAddCertificate?: (title: string, issuer: string, date: string, specialty: string) => void;
}

// Available certifications for the simulated career booster
interface SimulatorCert {
  id: string;
  title: string;
  issuer: string;
  specialty: string;
  pointsBoost: number;
  unlockedJobs: number;
  hours: number;
  category: string;
  skillsGained: string[];
}

export default function MeritTimeline({
  profile,
  jobsCount = 14,
  onAddCertificate
}: MeritTimelineProps) {
  // Historical development timeline events
  const timelineMilestones = [
    {
      id: 1,
      date: "01 مارس 2026",
      title: "تأسيس الهوية الرقمية للباحث وبدء التقييم",
      description: "انضمام الباحث إلى فضاء التلمسان الرقمي وصفر شهادات موثقة.",
      baseScore: 50,
      impact: "+50 (الحد الأدنى)",
      changeType: "neutral",
      icon: Layers,
      color: "bg-slate-100 text-slate-500 border-slate-200"
    },
    {
      id: 2,
      date: "14 مارس 2026",
      title: "إتمام رادار المهارات وضبط الكفاءات",
      description: "تحديد وتحميل المهارات الأساسية في البرمجة والتفاعل المعاصر.",
      baseScore: 58,
      impact: "+8 نقاط جدارة",
      changeType: "up",
      icon: TrendingUp,
      color: "bg-indigo-50 text-indigo-600 border-indigo-200"
    },
    {
      id: 3,
      date: "12 أفريل 2026",
      title: "تجاوز المقابلة الفنية التجريبية (AI)",
      description: "إتمام المقابلة الخوارزمية بنجاح والحصول على جودة ثقة معتمدة.",
      baseScore: 70,
      impact: "+12 نقطة جدارة",
      changeType: "up",
      icon: Zap,
      color: "bg-orange-50 text-orange-600 border-orange-200"
    },
    {
      id: 4,
      date: "25 ماي 2026",
      title: "توثيق شهادة تطوير الويب المتكامل",
      description: "تسجيل ومطابقة الشهادة المعتمدة من وحدة تلمسان والجامعة الأكاديمية.",
      baseScore: 85,
      impact: "+15 نقطة جدارة (قفزة نوعية)",
      changeType: "up",
      icon: Award,
      color: "bg-emerald-50 text-emerald-600 border-emerald-200"
    }
  ];

  // Certifications available in the simulator
  const simulatorCerts: SimulatorCert[] = [
    {
      id: "ai_eng",
      title: "شهادة هندسة الملاءمة والذكاء الاصطناعي التوليدي",
      issuer: "جامعة أبي بكر بلقايد - تلمسان",
      specialty: "ذكاء اصطناعي وتحليل جدارات",
      pointsBoost: 10,
      unlockedJobs: 8,
      hours: 45,
      category: "الذكاء الاصطناعي",
      skillsGained: ["هندسة الأوامر", "بايثون المتقدمة", "تعدين البيانات"]
    },
    {
      id: "devops_infra",
      title: "شهادة إدارة خوادم السحاب والتكامل المستمر (DevOps)",
      issuer: "مرصد الغرب الجزائري لليقظة التكنولوجية",
      specialty: "أنظمة وبرمجيات سحابية",
      pointsBoost: 8,
      unlockedJobs: 6,
      hours: 60,
      category: "DevOps & Cloud",
      skillsGained: ["Docker & Kubernetes", "أمن بروتوكولات", "Linux Admin"]
    },
    {
      id: "sec_sov",
      title: "الشهادة الاحترافية للأمن السيبراني والشبكات السيادية",
      issuer: "وزارة الرقمنة والإحصائيات بالجزائر العاصمة",
      specialty: "أمن سيبراني وسيادة رقمية",
      pointsBoost: 12,
      unlockedJobs: 11,
      hours: 80,
      category: "الأمن السيبراني",
      skillsGained: ["تأمين الشبكات", "تشفير بلوكشين", "إدارة ثغرات"]
    },
    {
      id: "agile_pm",
      title: "أخصائي إدارة مشروعات ريادية مرنة وطرق تسيير الفريق (Agile Scrum)",
      issuer: "حاضنة أعمال تلمسان ومغنية",
      specialty: "إدارة مشاريع وتواصل قيادي",
      pointsBoost: 7,
      unlockedJobs: 5,
      hours: 30,
      category: "الإدارة والقيادة",
      skillsGained: ["إدارة الجدارات وسياقات العمل", "Scrum Master", "التواصل المرن"]
    }
  ];

  // States for interactive simulation
  const [selectedSimCerts, setSelectedSimCerts] = useState<string[]>([]);
  const [successMsg, setSuccessMsg] = useState("");

  // Toggle booster certs
  const handleToggleSimCert = (id: string) => {
    setSelectedSimCerts((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calculate simulated merit score and job matches count
  const simulatedScoreBoost = simulatorCerts
    .filter((c) => selectedSimCerts.includes(c.id))
    .reduce((sum, c) => sum + c.pointsBoost, 0);

  const simulatedJobsBoost = simulatorCerts
    .filter((c) => selectedSimCerts.includes(c.id))
    .reduce((sum, c) => sum + c.unlockedJobs, 0);

  const activeMeritScore = profile.meritScore || 85;
  const currentSimScore = Math.min(100, activeMeritScore + simulatedScoreBoost);
  const potentialJobsCount = jobsCount + simulatedJobsBoost;

  // Determine market ranking tier based on new score
  const getTierDetails = (score: number) => {
    if (score >= 95) {
      return {
        label: "النخبة الفنية الاستثنائية - الفئة الأسمى",
        badge: "Platinum Tier",
        desc: "أنت الآن من بين أفضل 2% من الباحثين عن عمل في القطر الوطني، ولديك أسبقية في تصفية وتلقي العقود الصينية/الإيطالية المشتركة بمجال التشييد والتطوير الرقمي.",
        color: "text-purple-650 bg-purple-50 border-purple-200"
      };
    } else if (score >= 85) {
      return {
        label: "الرواد التقنيين - الفئة 1",
        badge: "Tier 1",
        desc: "جودة معاييرك تضمن مقابلة مضمونة فورا في كبرى مؤسسات تلمسان ووهران ومطابقة تفوق 88% من الشواغر الإقليمية.",
        color: "text-blue-650 bg-blue-50 border-blue-200"
      };
    } else if (score >= 70) {
      return {
        label: "الكفاءات الواعدة - الفئة 2",
        badge: "Tier 2",
        desc: "رصيدك محترم ويسد 70% من الثغرات، لكن إضافة شهادة تخصصية تضمن صعودك الفوري للمستوى الذهبي.",
        color: "text-emerald-700 bg-emerald-50 border-emerald-250"
      };
    } else {
      return {
        label: "المنخرطون في البناء المهاري - الفئة 3",
        badge: "Tier 3",
        desc: "تحت التطوير المنهجي، ندعوك للمبادرة وتجربة الاختبارات والدورات المجانية لرفع نقاط استحقاقك.",
        color: "text-slate-650 bg-slate-50 border-slate-200"
      };
    }
  };

  const currentTier = getTierDetails(activeMeritScore);
  const simulatedTier = getTierDetails(currentSimScore);

  // Apply simulated to active: physically adds simulated certificates to the core user profile!
  const handleAdoptSimulation = () => {
    if (selectedSimCerts.length === 0) return;

    // Call the callback for each selected certificate
    if (onAddCertificate) {
      const selectedDetailCerts = simulatorCerts.filter((c) =>
        selectedSimCerts.includes(c.id)
      );
      selectedDetailCerts.forEach((c) => {
        onAddCertificate(
          c.title,
          c.issuer,
          new Date().toISOString().split("T")[0],
          c.specialty
        );
      });

      setSuccessMsg(
        `تهانينا! لقد تم إلحاق عدد (${selectedSimCerts.length}) من الشهادات المختارة إلى ملفك الأكاديمي، وتمت إعادة جدولة مؤشر جدارتك المعتمد فورا!`
      );
      setSelectedSimCerts([]);
      setTimeout(() => setSuccessMsg(""), 4500);
    }
  };

  return (
    <div
      id="merit-timeline-view"
      className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-xs animate-fade-in text-right"
      dir="rtl"
    >
      {/* Upper Title and Overview info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-5 mb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              <Calendar className="w-4 h-4 text-rose-600" />
            </span>
            <h2 className="text-base font-black text-slate-800">التطور التفاعلي لمؤشر الجدارة وأثر الأوسمة (Merit Timeline)</h2>
          </div>
          <p className="text-[10px] text-slate-400">
            خط تمثيلي يرسم ريادتك التاريخية، مع أداة محاكاة ذكية لحساب القفزة النوعية في نسبة ذكائك وفتح الشواغر الإقليمية بتلمسان.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="bg-slate-50 border px-3 py-1.5 rounded-xl text-center">
            <span className="text-[8px] text-slate-400 block font-bold leading-none">مؤشرك الفعلي</span>
            <span className="text-sm font-black font-mono text-indigo-700 leading-normal">{activeMeritScore}%</span>
          </div>
          <div className="bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-xl text-center">
            <span className="text-[8px] text-indigo-700 block font-bold leading-none">المستوى المهني</span>
            <span className="text-[9.5px] font-black text-slate-800 leading-normal">{currentTier.badge}</span>
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-950 p-4 rounded-2xl text-[11px] font-bold leading-normal animate-pulse flex items-center gap-2">
          <span>🏆</span>
          <span>{successMsg}</span>
        </div>
      )}

      {/* Main Content Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Traditional Milestone Path & Graph representation */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-1.5">
            <h3 className="text-xs font-black text-slate-800 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              <span>الخط البياني التاريخي لتراكم نقاط الجدارة والجودة</span>
            </h3>
            <p className="text-[9.5px] text-slate-400">منحنى صاعد يوضح كيف ساهمت مجهوداتك وتحققاتك في لفت انتباه شركات الغرب الجزائري.</p>
          </div>

          {/* Elegant Custom Mini Visual SVG Chart Area */}
          <div className="bg-slate-50/70 border border-slate-100 p-5 rounded-3xl relative overflow-hidden space-y-4">
            <div className="absolute top-0 right-0 p-2.5 text-[8.5px] font-bold bg-indigo-600 text-white rounded-bl-xl font-mono">
              REAL-TIME INSIGHT 2026
            </div>

            <div className="h-44 w-full relative flex items-end pt-6">
              {/* Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between py-2 pointer-events-none">
                <div className="border-t border-slate-200/50 w-full text-[7.5px] text-slate-350 pt-0.5 text-left font-mono">100% (أعلى جدارة)</div>
                <div className="border-t border-slate-200/50 w-full text-[7.5px] text-slate-355 text-left font-mono">80% (فئة الريادة)</div>
                <div className="border-t border-slate-200/50 w-full text-[7.5px] text-slate-355 text-left font-mono">60% (درجة المواءمة)</div>
                <div className="border-t border-slate-200/50 w-full text-[7.5px] text-slate-355 text-left font-mono">40% (تأسيسية)</div>
              </div>

              {/* Pure SVG Linear Line Chart mapping */}
              <svg className="w-full h-full absolute inset-0 text-indigo-600 overflow-visible" preserveAspectRatio="none">
                {/* SVG path connecting milestones */}
                <path
                  d="M 20,110 Q 150,100 240,80 T 430,30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  className="stroke-indigo-600"
                />
                <path
                  d="M 20,110 Q 150,100 240,80 T 430,30 L 430,150 L 20,150 Z"
                  fill="currentColor"
                  fillOpacity="0.04"
                />

                {/* Simulated forecast line if some booster selected */}
                {selectedSimCerts.length > 0 && (
                  <path
                    d="M 430,30 Q 470,20 520,12"
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="3"
                    strokeDasharray="4 3"
                    className="animate-pulse"
                  />
                )}

                {/* Points highlights */}
                <circle cx="20" cy="110" r="5" fill="#6366f1" stroke="#fff" strokeWidth="2" />
                <circle cx="150" cy="100" r="5" fill="#6366f1" stroke="#fff" strokeWidth="2" />
                <circle cx="240" cy="80" r="5" fill="#ea580c" stroke="#fff" strokeWidth="2" />
                <circle cx="430" cy="30" r="6" fill="#10b981" stroke="#fff" strokeWidth="2" />

                {/* Simulated Target node */}
                {selectedSimCerts.length > 0 && (
                  <circle cx="515" cy="12" r="7" fill="#fbbf24" stroke="#fff" strokeWidth="2" className="animate-bounce" />
                )}
              </svg>

              {/* Labels for timeline milestones along graph x-axis */}
              <div className="absolute bottom-1 inset-x-0 flex justify-between px-2 text-[8px] font-mono text-slate-400">
                <span>01 مارس</span>
                <span>14 مارس</span>
                <span>12 أفريل</span>
                <span>25 ماي (الآن)</span>
                {selectedSimCerts.length > 0 && <span className="text-amber-600 font-bold animate-pulse">بعد المحاكاة !</span>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-[9px] pt-1">
              <div className="bg-white/80 p-2.5 rounded-xl border border-slate-100 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block"></span>
                <span>منحنى الاستحقاق الفعلي: <strong>صعود تدريجي</strong></span>
              </div>
              <div className="bg-white/80 p-2.5 rounded-xl border border-slate-100 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block animate-pulse"></span>
                <span>المسار الافتراضي المستقبلي: <strong>+{simulatedScoreBoost}% قفزة</strong></span>
              </div>
            </div>
          </div>

          {/* Sequential Milestone Timeline Card List */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-wider">سجل المحطات التاريخية والأوسمة الملحقة:</h4>

            <div className="border border-slate-100/80 rounded-2xl p-4 bg-white divide-y divide-slate-50">
              {timelineMilestones.map((milestone) => {
                const IconComp = milestone.icon;
                return (
                  <div key={milestone.id} className="py-3 flex items-start gap-4 text-right last:pb-0 first:pt-0">
                    <div className={`w-9 h-9 rounded-xl border shrink-0 flex items-center justify-center ${milestone.color}`}>
                      <IconComp className="w-4 h-4" />
                    </div>

                    <div className="space-y-1 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span className="text-[10px] font-black text-slate-800 leading-tight">{milestone.title}</span>
                        <span className="text-[8px] text-slate-400 font-mono font-bold bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                          {milestone.date}
                        </span>
                      </div>
                      <p className="text-[9px] text-slate-450 leading-relaxed">{milestone.description}</p>
                      
                      <div className="flex items-center gap-3 pt-0.5 text-[8.5px] font-bold">
                        <span className="text-slate-500 font-mono">مؤشر الجدارة آنذاك: <strong className="text-slate-800">{milestone.baseScore}%</strong></span>
                        <span className={`px-1.5 py-0.5 rounded ${
                          milestone.changeType === "up" ? "text-emerald-700 bg-emerald-50/50" : "text-slate-500 bg-slate-50"
                        }`}>
                          الأثر: {milestone.impact}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Certifications & Training Booster / Simulator */}
        <div className="lg:col-span-6 space-y-6 bg-slate-50/40 border border-slate-100 p-6 rounded-3xl">
          <div className="space-y-1.5">
            <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 border border-amber-200 text-[8px] font-black rounded-full inline-block uppercase">
              ⚡ محاكي الأثر المهاراتي والتصنيف
            </span>
            <h3 className="text-xs font-black text-slate-800">جرب وحاكي إضافة الشهادات والدورات التدريبية</h3>
            <p className="text-[9.5px] text-slate-400">
              اختر دورات تخصصية أو شهادات مهنية لترى فوراً كيف ستتحسّن درجة جدارتك وتصنيف استحقاقك وعدد فرص التوظيف المتاحة لك.
            </p>
          </div>

          {/* Interactive Toggle options */}
          <div className="space-y-3">
            {simulatorCerts.map((cert) => {
              const isSelected = selectedSimCerts.includes(cert.id);
              return (
                <div
                  key={cert.id}
                  onClick={() => handleToggleSimCert(cert.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? "bg-amber-50/40 border-amber-500 ring-1 ring-amber-500/20"
                      : "bg-white border-slate-150 hover:border-slate-250 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex gap-3 justify-between items-start">
                    <div className="space-y-1 text-right">
                      <span className="text-[8px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-black">
                        {cert.category} • {cert.hours} ساعة تدريبية
                      </span>
                      <h4 className="text-[10px] font-black text-slate-800 leading-normal pt-1">{cert.title}</h4>
                      <p className="text-[9px] text-slate-400 leading-tight">الجهة المصدرة: <strong>{cert.issuer}</strong></p>
                    </div>

                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected ? "bg-amber-500 border-amber-500 text-white" : "border-slate-300"
                    }`}>
                      {isSelected ? "✓" : ""}
                    </div>
                  </div>

                  {/* Skills tags gained */}
                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {cert.skillsGained.map((skill, sIdx) => (
                      <span key={sIdx} className="text-[8.5px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-lg border border-slate-150 font-bold">
                        +{skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center border-t border-slate-100 mt-3 pt-2 text-[8.5px] font-black text-slate-500">
                    <span className="text-emerald-700 font-bold">🎯 زيادة الجدارة: +{cert.pointsBoost}%</span>
                    <span className="text-indigo-650 font-bold">💼 فرص عمل إضافية: +{cert.unlockedJobs} وظيفة</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Simulated Impact Scoreboard */}
          <div className="bg-indigo-900 text-white p-5 rounded-2xl space-y-4">
            <h4 className="text-[10.5px] font-black tracking-wider text-indigo-200 uppercase border-b border-indigo-800 pb-2">
              لوحة المحاكاة المباشرة والتقدير التقريبي:
            </h4>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-[8.5px] text-indigo-300 block">مؤشر الجدارة بعد المحاكاة</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-mono font-black text-amber-400">{currentSimScore}%</span>
                  <span className="text-[9px] text-emerald-450 font-bold">({activeMeritScore}% حالي)</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[8.5px] text-indigo-300 block">عدد الوظائف المتوافقة الأقصى</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-mono font-black text-amber-400">{potentialJobsCount}</span>
                  <span className="text-[9px] text-slate-300">({jobsCount} وظيفة حالي)</span>
                </div>
              </div>
            </div>

            {/* Simulated Rank description */}
            <div className="bg-indigo-950/60 p-3 rounded-xl border border-indigo-700/50 space-y-1 text-right">
              <div className="flex justify-between items-center text-[10px] font-black">
                <span className="text-amber-400">التصنيف المتوقع بسوق العمل:</span>
                <span className="bg-amber-400 text-indigo-950 px-2 py-0.5 rounded font-mono text-[9px]">
                  {simulatedTier.badge}
                </span>
              </div>
              <p className="text-[9px] text-indigo-100 leading-relaxed font-sans mt-1">
                {simulatedTier.desc}
              </p>
            </div>

            {/* Adopt simulation button */}
            {selectedSimCerts.length > 0 && (
              <button
                type="button"
                onClick={handleAdoptSimulation}
                className="w-full py-2.5 bg-gradient-to-l from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-indigo-950 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/10"
              >
                <span>اعتماد هؤلاء كأهداف أكاديمية وحفظهم بملفي 🚀</span>
                <ArrowUpRight className="w-4 h-4 text-indigo-950" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
