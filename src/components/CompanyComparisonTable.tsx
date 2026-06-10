import React from "react";
import {
  Users,
  Award,
  Sparkles,
  TrendingUp,
  BrainCircuit,
  Lock,
  Compass,
  CheckCircle2,
  FileCheck2,
  X
} from "lucide-react";

interface CompanyComparisonTableProps {
  onClearComparison?: () => void;
}

export default function CompanyComparisonTable({ onClearComparison }: CompanyComparisonTableProps) {
  // Candidate data structures to compare side-by-side matching Image 3
  const activeCandidatesToCompare = [
    {
      name: "أحمد ولد علي",
      role: "Full Stack Developer",
      match: "94% مطابقة",
      exp: "3 سنوات",
      techSkill: 94,
      gaps: "0% (مستوفٍ للغاية)",
      leadership: 78,
      certsCount: 5,
      aiEval: 4.8,
      successChance: 92,
      avatar: "👨‍💻",
      bgClass: "bg-emerald-500"
    },
    {
      name: "ياسين قادري",
      role: "مهندس DevOps",
      match: "91% مطابقة",
      exp: "4 سنوات",
      techSkill: 90,
      gaps: "10% (يحتاج تغطية AWS)",
      leadership: 79,
      certsCount: 4,
      aiEval: 4.6,
      successChance: 88,
      avatar: "👨‍🔬",
      bgClass: "bg-blue-650"
    },
    {
      name: "مريم زروقي",
      role: "UI/UX Designer",
      match: "88% مطابقة",
      exp: "5 سنوات",
      techSkill: 86,
      gaps: "15% (تنقص جدارة السحابة)",
      leadership: 75,
      certsCount: 3,
      aiEval: 4.3,
      successChance: 80,
      avatar: "👩‍🎨",
      bgClass: "bg-purple-500"
    }
  ];

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs font-sans text-right space-y-6 animate-fade-in" dir="rtl">
      
      {/* Table Header block */}
      <div className="flex items-center justify-between border-b border-slate-50 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-800">مقارنة المرشحين الذكية (Direct Talent Compare Grid)</h3>
            <p className="text-[10px] text-slate-400 mt-0.5">مقارنة مباشرة لمستويات ذكاء الجدارات والتطابق المهني لتفادي التعيينات العشوائية.</p>
          </div>
        </div>

        {onClearComparison && (
          <button
            onClick={onClearComparison}
            className="text-[10px] text-red-500 font-bold hover:underline"
          >
            إعادة ضبط المقارنة
          </button>
        )}
      </div>

      {/* Comparisons Workspace (Image 3 Grid Style) */}
      <div className="overflow-x-auto rounded-2xl border border-slate-100">
        <table className="w-full text-right border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="p-4 text-[10.5px] font-black text-slate-500 w-1/4">المعايير والجدارات المقارنة</th>
              {activeCandidatesToCompare.map((cand, idx) => (
                <th key={idx} className="p-4 text-center w-1/4 border-r border-slate-100/50">
                  <div className="space-y-1.5">
                    <span className="text-2xl">{cand.avatar}</span>
                    <h4 className="text-xs font-black text-slate-800">{cand.name}</h4>
                    <span className="text-[9px] bg-blue-50 text-blue-800 px-2 py-0.5 rounded-full font-bold">
                      {cand.match}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/60 text-xs text-slate-705">
            
            {/* Experience */}
            <tr>
              <td className="p-4 font-black bg-slate-50/20">سنوات الخبرة الفعلية</td>
              {activeCandidatesToCompare.map((cand, idx) => (
                <td key={idx} className="p-4 text-center border-r border-slate-100/50 font-mono font-bold text-slate-800">
                  {cand.exp}
                </td>
              ))}
            </tr>

            {/* Technical Skill Level */}
            <tr>
              <td className="p-4 font-black bg-slate-50/20">المهارة والكفاءة التقنية</td>
              {activeCandidatesToCompare.map((cand, idx) => (
                <td key={idx} className="p-4 text-center border-r border-slate-100/50">
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-mono font-bold text-emerald-600">% {cand.techSkill}</span>
                    <div className="w-20 bg-slate-105 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${cand.techSkill}%` }}></div>
                    </div>
                  </div>
                </td>
              ))}
            </tr>

            {/* Gaps in Requirements */}
            <tr>
              <td className="p-4 font-black bg-slate-50/20">نقص الاحتياجات والثغرات</td>
              {activeCandidatesToCompare.map((cand, idx) => (
                <td key={idx} className={`p-4 text-center border-r border-slate-100/50 font-bold ${idx === 0 ? "text-emerald-600" : "text-amber-500"}`}>
                  {cand.gaps}
                </td>
              ))}
            </tr>

            {/* Leadership capacity */}
            <tr>
              <td className="p-4 font-black bg-slate-50/20">مستوى اتخاذ القرار (القيادة)</td>
              {activeCandidatesToCompare.map((cand, idx) => (
                <td key={idx} className="p-4 text-center border-r border-slate-100/50">
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-mono font-bold text-blue-600">% {cand.leadership}</span>
                    <div className="w-20 bg-slate-105 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${cand.leadership}%` }}></div>
                    </div>
                  </div>
                </td>
              ))}
            </tr>

            {/* Certifications counter */}
            <tr>
              <td className="p-4 font-black bg-slate-50/20">الشهادات الرقمية الموثوقة</td>
              {activeCandidatesToCompare.map((cand, idx) => (
                <td key={idx} className="p-4 text-center border-r border-slate-100/50 font-bold font-mono">
                  {cand.certsCount} شارات جدارية
                </td>
              ))}
            </tr>

            {/* AI Evaluation */}
            <tr>
              <td className="p-4 font-black bg-slate-50/20">تقييم الذكاء المهني والسمات</td>
              {activeCandidatesToCompare.map((cand, idx) => (
                <td key={idx} className="p-4 text-center border-r border-slate-100/50 font-bold">
                  ⭐ <span className="font-mono text-amber-500 text-sm">{cand.aiEval} / 5.0</span>
                </td>
              ))}
            </tr>

            {/* Success Probability */}
            <tr className="bg-blue-50/10 font-bold">
              <td className="p-4 font-black text-slate-800">احتمالية النجاح في الدور (Success Chance)</td>
              {activeCandidatesToCompare.map((cand, idx) => (
                <td key={idx} className="p-4 text-center border-r border-slate-100/50 text-indigo-750 font-mono text-sm font-black">
                  {cand.successChance}%
                </td>
              ))}
            </tr>

          </tbody>
        </table>
      </div>

      {/* SWOT comparison advisory */}
      <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <div className="space-y-1 text-right">
          <span className="text-[10px] font-black text-slate-800">توصية الخيار الذاتي المزدوج (DZ AI Decision Companion):</span>
          <p className="text-[9.5px] text-slate-500 leading-normal">
            يعبر المرشح <span className="text-slate-800 font-bold">أحمد ولد علي</span> عن جدارة تقنية بنسبة مواءمة تفوق باقي المتسابقين بمساهمة الشارات الموثقة لديه بنظام تلمسان. بينما يعبر المرشح <span className="text-slate-800 font-bold">ياسين قادري</span> عن إمكانيات قيادية ممتازة ولديه ميزة إضافية في سنوات الخدمة الممتدة. ينصح بجدولة مقابلات متفاعلة للاختبار العملي النهائي.
          </p>
        </div>
      </div>

    </div>
  );
}
