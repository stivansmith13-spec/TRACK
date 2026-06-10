import React, { useState } from "react";
import {
  TrendingUp,
  Award,
  MapPin,
  Globe,
  Briefcase,
  Layers,
  Sparkles,
  Search,
  DollarSign
} from "lucide-react";

export default function CompanySkillsGaps() {
  const [activeSubTab, setActiveSubTab] = useState<"overview" | "byRole" | "byState">("overview");

  // Mock skills data matching Image 4
  const inDemandSkills = [
    { name: "Python", demand: 1245, status: "الطلب عالي للغاية", trend: "up", percentage: 95 },
    { name: "SQL", demand: 1102, status: "الطلب عالي", trend: "up", percentage: 88 },
    { name: "JavaScript", demand: 987, status: "طلب متوسط", trend: "stable", percentage: 76 },
    { name: "AWS", demand: 876, status: "الطلب عالي", trend: "up", percentage: 70 },
    { name: "React", demand: 765, status: "طلب متوسط", trend: "stable", percentage: 65 }
  ];

  const rareSkills = [
    { name: "Kubernetes", category: "سحابة فائقة", code: "K8S", difficulty: "صعبة الفرز" },
    { name: "Data Engineering", category: "هندسة بيانات", code: "DE", difficulty: "نادرة للغاية" },
    { name: "TensorFlow", category: "التعلم العميق", code: "TF", difficulty: "نادرة" }
  ];

  const averageSalaries = [
    { range: "خبرة 3-5 سنوات", salary: "180,000 دج", description: "مطور متوسط مطور" },
    { range: "خبرة 5-10 سنوات", salary: "280,000 دج", description: "مهندس برمجيات أول" },
    { range: "خبرة +10 سنوات", salary: "400,000 دج", description: "مدير تقني / خبير معمارية" }
  ];

  const statesDistribution = [
    { state: "الجزائر", share: 45, color: "bg-blue-600" },
    { state: "وهران", share: 18, color: "bg-indigo-600" },
    { state: "قسنطينة", share: 12, color: "bg-cyan-500" },
    { state: "عنابة", share: 8, color: "bg-orange-500" },
    { state: "أخرى", share: 17, color: "bg-slate-400" }
  ];

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs font-sans text-right space-y-6 animate-fade-in" dir="rtl">
      
      {/* Title block */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-sm font-black text-slate-800">تحليل فجوات المهارات وعجز السوق (Market Skills Gaps Analytics)</h3>
          <p className="text-[10px] text-slate-400 mt-1">تحديد الاحتياجات المهنية والمهارات الأكثر ندرة لمواءمة تخصصات الخريجين والرواتب.</p>
        </div>

        {/* Local perspective sub-navigation tabs */}
        <div className="bg-slate-100 p-1 rounded-xl flex gap-1 select-none">
          <button
            onClick={() => setActiveSubTab("overview")}
            className={`px-3 py-1.5 rounded-lg text-[9px] font-black transition-all ${
              activeSubTab === "overview" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500"
            }`}
          >
            نظرة عامة
          </button>
          <button
            onClick={() => setActiveSubTab("byRole")}
            className={`px-3 py-1.5 rounded-lg text-[9px] font-black transition-all ${
              activeSubTab === "byRole" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500"
            }`}
          >
            حسب الوظيفة
          </button>
          <button
            onClick={() => setActiveSubTab("byState")}
            className={`px-3 py-1.5 rounded-lg text-[9px] font-black transition-all ${
              activeSubTab === "byState" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500"
            }`}
          >
            حسب الولاية
          </button>
        </div>
      </div>

      {/* Main Grid workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (7 cols): In-demand skills & progress indicators */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-slate-50/55 border border-slate-100 rounded-3xl p-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <h4 className="text-xs font-black text-slate-800">أكثر المهارات التقنية طلباً في السوق الجزائرية</h4>
            </div>

            <div className="space-y-4">
              {inDemandSkills.map((sk, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <span className="font-mono text-slate-800">{sk.name}</span>
                      <span className={`text-[8px] px-2 py-0.5 rounded-full ${
                        sk.trend === "up" ? "bg-red-50 text-red-700" : "bg-slate-100 text-slate-600"
                      }`}>
                        {sk.demand} طلب نشط
                      </span>
                    </span>
                    <span className="text-slate-500">{sk.status}</span>
                  </div>

                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all"
                      style={{ width: `${sk.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Average Salary expectations */}
          <div className="bg-white border border-slate-100 rounded-2xl p-4.5 space-y-3">
            <h4 className="text-xs font-black text-slate-800">متوسط معدلات الأجور والرواتب حسب سنوات الخبرة</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {averageSalaries.map((s, idx) => (
                <div key={idx} className="border border-slate-100 p-3 rounded-xl bg-slate-50/20 text-center space-y-1">
                  <span className="text-[9px] text-slate-400 block font-bold">{s.range}</span>
                  <span className="text-xs font-black font-mono text-indigo-650 block">{s.salary}</span>
                  <span className="text-[8px] text-slate-500 block font-bold">{s.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Rare skills & location distribution details */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Rare/Scarce Skills */}
          <div className="bg-white border border-slate-100 rounded-3xl p-5 space-y-3">
            <h4 className="text-xs font-black text-slate-800">المهارات والخبرات التقنية النادرة جداً (Scarce Talent)</h4>
            
            <div className="space-y-3">
              {rareSkills.map((r, idx) => (
                <div key={idx} className="flex justify-between items-center p-3.5 border border-slate-100 rounded-2xl bg-amber-50/10">
                  <div>
                    <h5 className="text-[10.5px] font-black text-slate-800">{r.name}</h5>
                    <span className="text-[8.5px] text-slate-400 block mt-0.5">{r.category} • {r.difficulty}</span>
                  </div>
                  <span className="bg-amber-100 text-amber-800 text-[8.5px] font-bold px-2 py-0.5 rounded-full">
                    {r.code}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Location distributions */}
          <div className="bg-white border border-slate-100 rounded-3xl p-5 space-y-3.5">
            <h4 className="text-xs font-black text-slate-800">توزيع الكفاءات والكوادر حسب الولايات الجزائرية</h4>
            
            <div className="space-y-2 text-[10px]">
              {statesDistribution.map((st, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-center text-[10px] text-slate-650 font-bold">
                    <span>{st.state}</span>
                    <span className="font-mono">{st.share}%</span>
                  </div>
                  <div className="w-full bg-slate-50 h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full ${st.color} rounded-full`} style={{ width: `${st.share}%` }}></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-[9px] text-slate-400 italic pt-1 text-center font-bold">
              📶 المصدر: الربط اللحظي المزدوج مع سجلات وزارة العمل وحاضنات تلمسان.
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
