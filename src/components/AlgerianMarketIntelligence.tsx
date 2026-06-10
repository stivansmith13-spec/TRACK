import React, { useState } from "react";
import { 
  TrendingUp, 
  MapPin, 
  Layers, 
  Sparkles, 
  Activity, 
  Globe
} from "lucide-react";

export default function AlgerianMarketIntelligence() {
  const [selectedRegion, setSelectedRegion] = useState<string>("tlemcen");
  const [activeSkillFilter, setActiveSkillFilter] = useState<string>("all");

  const regionsData: Record<string, { name: string; demand: string; growth: string; topSkills: string; color: string; desc: string }> = {
    tlemcen: {
      name: "تلمسان - مغنية",
      demand: "مرتفع جداً",
      growth: "+28.4%",
      topSkills: "برمجة، كهرباء، ميكانيك، أمن سيبراني",
      color: "text-cyan-400",
      desc: "تمركز نمو حيوي مدعوم بالشراكة مع هيئات التكوين الأكاديمي والمركز الجامعي بمغنية."
    },
    oran: {
      name: "ولاية وهران الباهية",
      demand: "مرتفع",
      growth: "+21.2%",
      topSkills: "تحليل بيانات، بايثون، DevOps، هندسة برمجيات",
      color: "text-emerald-400",
      desc: "نشاط مالي وصناعي متسارع مع طلب متزايد لخدمات الرقمنة والحلول المؤسساتية."
    },
    algiers: {
      name: "الجزائر العاصمة الموحدة",
      demand: "أقصى مستويات الطلب",
      growth: "+32.8%",
      topSkills: "سحابة حاسوبية، أتمتة الأنظمة، React، ذكاء الأعمال",
      color: "text-indigo-400",
      desc: "البؤرة المركزية لتوظيف الكفاءات بفضل المكاتب العليا للهيئات والشركات الدولية."
    },
    constantine: {
      name: "ولاية قسنطينة الكبرى",
      demand: "متوسط الفاعلية",
      growth: "+14.5%",
      topSkills: "هندسة شبكات، مبرمج قواعد بيانات، إدارة الوقت",
      color: "text-amber-400",
      desc: "نشاط علمي وأكاديمي مرموق مع تطلع مستمر لتوطين مهارات الأنظمة المدمجة."
    }
  };

  const region = regionsData[selectedRegion] || regionsData.tlemcen;

  // Donut chart segments
  const donutSlices = [
    { label: "برمجة", pct: 32, value: "5,079", color: "bg-cyan-500", stroke: "#22d3ee" },
    { label: "تصميم", pct: 21, value: "3,333", color: "bg-emerald-500", stroke: "#10b981" },
    { label: "تسويق", pct: 18, value: "2,857", color: "bg-rose-500", stroke: "#f43f5e" },
    { label: "هندسة", pct: 15, value: "2,381", color: "bg-amber-500", stroke: "#f59e0b" },
    { label: "أخرى", pct: 14, value: "2,222", color: "bg-indigo-500", stroke: "#6366f1" }
  ];

  return (
    <div id="algerian-market-intelligence" className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-right" dir="rtl">
      
      {/* 1. Demand trend chart (7 cols on desktop) */}
      <div className="lg:col-span-8 bg-slate-900/60 backdrop-blur-md border border-slate-800/80 p-6 rounded-2xl shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800/60 pb-3 gap-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan-455" />
            <h3 className="text-sm font-black text-slate-100">اتجاه الطلب على المهارات الكلية</h3>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {["all", "tech", "design", "marketing"].map((f) => (
              <button
                key={f}
                onClick={() => setActiveSkillFilter(f)}
                className={`px-2.5 py-1 text-[9.5px] font-black rounded-md ${
                  activeSkillFilter === f 
                    ? "bg-cyan-500 text-slate-950" 
                    : "bg-slate-950 border border-slate-850 text-slate-400 hover:text-white"
                }`}
              >
                {f === "all" ? "كل المساقات" : f === "tech" ? "تقني" : f === "design" ? "تصميم" : "تسويق"}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic visual High-Density curves chart */}
        <div className="h-56 bg-slate-950 rounded-xl border border-slate-800/50 p-4 relative overflow-hidden flex flex-col justify-between">
          
          {/* Legend row */}
          <div className="flex flex-wrap items-center gap-4 text-[9px] font-mono text-slate-400 z-10">
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-[2px] bg-cyan-400" />
              <span>البرمجة (32%)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-[2px] bg-emerald-400" />
              <span>التصميم (21%)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-[2px] bg-rose-400" />
              <span>التسويق (18%)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-[2px] bg-amber-400" />
              <span>المحاسبة (15%)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-[2px] bg-indigo-400" />
              <span>الهندسة (14%)</span>
            </div>
          </div>

          {/* Grid lines */}
          <div className="absolute inset-y-10 inset-x-8 flex flex-col justify-between pointer-events-none">
            <div className="border-t border-slate-900 border-dashed w-full" />
            <div className="border-t border-slate-900 border-dashed w-full" />
            <div className="border-t border-slate-900 border-dashed w-full" />
            <div className="border-t border-slate-900 border-dashed w-full" />
          </div>

          {/* Actual SVG Curves */}
          <div className="w-full h-36 relative">
            <svg className="w-full h-full" viewBox="0 0 600 120" preserveAspectRatio="none">
              {/* Programming line - Cyan */}
              <path 
                d="M 0 110 Q 100 80 200 40 T 400 30 T 600 10" 
                fill="none" 
                stroke="#22d3ee" 
                strokeWidth={activeSkillFilter === "all" || activeSkillFilter === "tech" ? "2.5" : "0.75"} 
                strokeOpacity={activeSkillFilter === "all" || activeSkillFilter === "tech" ? "1" : "0.25"}
              />
              
              {/* Design line - Emerald */}
              <path 
                d="M 0 105 Q 100 90 200 65 T 400 45 T 600 35" 
                fill="none" 
                stroke="#10b981" 
                strokeWidth={activeSkillFilter === "all" || activeSkillFilter === "design" ? "2.2" : "0.75"} 
                strokeOpacity={activeSkillFilter === "all" || activeSkillFilter === "design" ? "1" : "0.25"}
              />

              {/* Marketing line - Rose */}
              <path 
                d="M 0 100 Q 100 95 200 85 T 400 70 T 600 55" 
                fill="none" 
                stroke="#f43f5e" 
                strokeWidth={activeSkillFilter === "all" || activeSkillFilter === "marketing" ? "2.2" : "0.75"} 
                strokeOpacity={activeSkillFilter === "all" || activeSkillFilter === "marketing" ? "1" : "0.25"}
              />

              {/* Accounting Line - Amber */}
              <path 
                d="M 0 115 Q 100 105 200 90 T 400 85 T 600 80" 
                fill="none" 
                stroke="#f59e0b" 
                strokeWidth="1.5" 
                strokeOpacity={activeSkillFilter === "all" ? "0.8" : "0.15"}
              />

              {/* Engineering Line - Indigo */}
              <path 
                d="M 0 118 Q 100 112 200 100 T 400 95 T 600 90" 
                fill="none" 
                stroke="#6366f1" 
                strokeWidth="1.5" 
                strokeOpacity={activeSkillFilter === "all" ? "0.8" : "0.15"}
              />

              {/* Active dots */}
              <circle cx="200" cy="40" r="4" fill="#22d3ee" className="animate-pulse" />
              <circle cx="400" cy="45" r="4" fill="#10b981" />
            </svg>
          </div>

          {/* X axis */}
          <div className="flex justify-between items-center text-[8px] text-slate-500 font-mono border-t border-slate-900 pt-1.5 px-4">
            <span>الأسبوع 1</span>
            <span>الأسبوع 2</span>
            <span>الأسبوع 3</span>
            <span>الأسبوع 4</span>
            <span>الأسبوع 5</span>
            <span>الأسبوع 6 (الآن)</span>
          </div>
        </div>

        {/* High performance dynamic index sliders at bottom */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/50 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-450 block font-bold">مؤشر النشاط العام</span>
              <span className="text-xl font-mono text-cyan-400 font-black">78/100</span>
              <span className="text-[9px] text-emerald-450 block font-bold">🟢 مرتفع ونشط</span>
            </div>
            {/* Tiny sparkline SVG */}
            <svg className="w-16 h-8 text-cyan-400" viewBox="0 0 50 20">
              <path d="M0,15 L10,12 L20,17 L30,5 L40,10 L50,2" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/50 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-450 block font-bold">مؤشر المنافسة الكلية</span>
              <span className="text-xl font-mono text-amber-500 font-black">62/100</span>
              <span className="text-[9px] text-amber-400 block font-bold">🟡 متوسط التوزيع</span>
            </div>
            <svg className="w-16 h-8 text-amber-500" viewBox="0 0 50 20">
              <path d="M0,10 L10,14 L20,8 L30,12 L40,9 L50,15" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/50 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-450 block font-bold">مؤشر استقرار السوق</span>
              <span className="text-xl font-mono text-emerald-400 font-black">85/100</span>
              <span className="text-[9px] text-emerald-555 block font-bold">🟢 مستقر تماماً</span>
            </div>
            <svg className="w-16 h-8 text-emerald-400" viewBox="0 0 50 20">
              <path d="M0,18 L10,15 L20,12 L30,14 L40,8 L50,3" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>

      {/* 2. Donut Skill mix & Interactive Map (4 cols on desktop) */}
      <div className="lg:col-span-4 bg-slate-900/60 backdrop-blur-md border border-slate-800/80 p-6 rounded-2xl shadow-xl flex flex-col justify-between space-y-6">
        
        {/* Skill distribution Donut part */}
        <div className="space-y-3.5">
          <div className="flex items-center gap-1.5 border-b border-slate-800/60 pb-2">
            <Layers className="w-4.5 h-4.5 text-amber-500" />
            <h3 className="text-xs font-black text-slate-100">توزيع المهارات المطلوبة (إجمالي 15,872)</h3>
          </div>
          
          <div className="flex items-center gap-4 justify-between bg-slate-950 p-3.5 rounded-xl border border-slate-850">
            {/* Custom SVG Donut Chart */}
            <div className="w-16 h-16 relative shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.91" fill="none" stroke="#10172a" strokeWidth="4" />
                {/* 32% Blue segment */}
                <circle cx="18" cy="18" r="15.91" fill="none" stroke="#22d3ee" strokeWidth="4.5" strokeDasharray="32 100" strokeDashoffset="0" />
                {/* 21% Emerald segment */}
                <circle cx="18" cy="18" r="15.91" fill="none" stroke="#10b981" strokeWidth="4.5" strokeDasharray="21 100" strokeDashoffset="-32" />
                {/* 18% Rose segment */}
                <circle cx="18" cy="18" r="15.91" fill="none" stroke="#f43f5e" strokeWidth="4.5" strokeDasharray="18 100" strokeDashoffset="-53" />
                {/* 15% Amber segment */}
                <circle cx="18" cy="18" r="15.91" fill="none" stroke="#f59e0b" strokeWidth="4.5" strokeDasharray="15 100" strokeDashoffset="-71" />
                {/* 14% Indigo segment */}
                <circle cx="18" cy="18" r="15.91" fill="none" stroke="#6366f1" strokeWidth="4.5" strokeDasharray="14 100" strokeDashoffset="-86" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-[9px] font-mono font-black text-slate-350">
                15,872
              </div>
            </div>

            <div className="flex-1 space-y-1 text-right text-[9px]">
              {donutSlices.map((slice, i) => (
                <div key={i} className="flex justify-between items-center font-bold">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${slice.color}`} />
                    <span className="text-slate-400">{slice.label}</span>
                  </div>
                  <span className="text-slate-200 font-mono">{slice.pct}% ({slice.value})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Algerian Interactive Abstract Map Block */}
        <div className="space-y-3.5 pt-2">
          <div className="flex items-center gap-1.5 border-b border-slate-800/60 pb-2">
            <MapPin className="w-4.5 h-4.5 text-rose-500" />
            <h3 className="text-xs font-black text-slate-100">توزيع الطلب جغرافياً (الخارطة التفاعلية)</h3>
          </div>

          {/* Visual Algeria Map Area */}
          <div className="bg-slate-950 border border-slate-800/60 rounded-xl p-3.5 relative overflow-hidden h-40 flex items-center justify-center">
            {/* Animated scope circles for scanning effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-cyan-500/10 rounded-full animate-ping pointer-events-none" />
            
            {/* Abstract Styled SVG representing Algeria containing interactive hot zones */}
            <svg className="w-full h-full text-slate-800" viewBox="0 0 200 160" fill="none">
              {/* Simplified contour of North Algeria */}
              <path 
                d="M10,95 Q40,65 80,70 T150,55 T190,75 L180,120 Q145,145 95,140 Q40,135 10,95 Z" 
                fill="#0f172a" 
                stroke="#1e293b" 
                strokeWidth="1.5" 
              />
              
              {/* Highlight scanning arcs */}
              <path d="M10,95 Q40,65 80,70" stroke="#06b6d4" strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="3 3" />

              {/* Tlemcen / Maghnia hot zone indicator (West) */}
              <g 
                onClick={() => setSelectedRegion("tlemcen")}
                className="cursor-pointer group"
              >
                <circle cx="35" cy="85" r="8" fill="#22d3ee" fillOpacity={selectedRegion === "tlemcen" ? "0.3" : "0.1"} className="animate-pulse" />
                <circle cx="35" cy="85" r="4.5" fill="#22d3ee" stroke="#ffffff" strokeWidth="1" />
                <text x="35" y="73" fill="#ffffff" fontSize="7" fontWeight="black" textAnchor="middle">تلمسان</text>
              </g>

              {/* Oran hot zone indicator */}
              <g 
                onClick={() => setSelectedRegion("oran")}
                className="cursor-pointer group"
              >
                <circle cx="65" cy="74" r="8" fill="#10b981" fillOpacity={selectedRegion === "oran" ? "0.3" : "0.1"} />
                <circle cx="65" cy="74" r="4.5" fill="#10b981" stroke="#ffffff" strokeWidth="1" />
                <text x="65" y="63" fill="#10b981" fontSize="7" fontWeight="black" textAnchor="middle">وهران</text>
              </g>

              {/* Algiers hot zone indicator */}
              <g 
                onClick={() => setSelectedRegion("algiers")}
                className="cursor-pointer group"
              >
                <circle cx="105" cy="65" r="8" fill="#6366f1" fillOpacity={selectedRegion === "algiers" ? "0.3" : "0.1"} />
                <circle cx="105" cy="65" r="4.5" fill="#6366f1" stroke="#ffffff" strokeWidth="1" />
                <text x="105" y="54" fill="#818cf8" fontSize="7" fontWeight="black" textAnchor="middle">العاصمة</text>
              </g>

              {/* Constantine hot zone indicator */}
              <g 
                onClick={() => setSelectedRegion("constantine")}
                className="cursor-pointer group"
              >
                <circle cx="150" cy="62" r="8" fill="#f59e0b" fillOpacity={selectedRegion === "constantine" ? "0.3" : "0.1"} />
                <circle cx="150" cy="62" r="4.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1" />
                <text x="150" y="51" fill="#f59e0b" fontSize="7" fontWeight="black" textAnchor="middle">قسنطينة</text>
              </g>

              {/* Radar Sweeper Line Animation simulation */}
              <line x1="100" y1="50" x2="100" y2="150" stroke="#22d3ee" strokeWidth="0.5" strokeOpacity="0.2" className="animate-pulse" />
            </svg>
            
            {/* Quick tips label */}
            <span className="absolute bottom-1 right-2 text-[8px] text-slate-500 font-mono">
              * انقر فوق أي ولاية في الخارطة لتحديث تفاصيل طلب العمل.
            </span>
          </div>

          {/* Selected dynamic region info box */}
          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/70 text-[10px] space-y-1.5 animate-scale-up">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">الولاية المحددة:</span>
              <span className={`font-black ${region.color} text-xs`}>{region.name}</span>
            </div>
            <div className="flex justify-between items-center text-[9.5px]">
              <span className="text-slate-500">حركة الطلب:</span>
              <span className="text-slate-200 font-bold">{region.demand} ({region.growth})</span>
            </div>
            <div className="flex justify-between items-start text-[9.5px]">
              <span className="text-slate-500 shrink-0 ml-4">أكثر المهارات طلباً:</span>
              <span className="text-cyan-400 font-semibold">{region.topSkills}</span>
            </div>
            <p className="text-[9px] text-slate-400/90 leading-relaxed pt-1.5 border-t border-slate-850">{region.desc}</p>
          </div>

        </div>

      </div>

    </div>
  );
}
