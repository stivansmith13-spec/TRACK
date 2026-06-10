import React from "react";
import {
  TrendingUp,
  Sliders,
  DollarSign,
  Calendar,
  LineChart as ChartIcon,
  HelpCircle,
  HelpCircle as QuestionIcon,
  CheckCircle,
  Sparkles,
  PieChart as PieIcon,
  Building
} from "lucide-react";

export default function CompanyHRIntelligence() {
  // Key state indicators matching Image 5
  const employeeTurnoverRate = "12.5%";
  const averageTimeToHire = "24 يوم";
  const offerAcceptanceRate = "86%";
  const recruitmentCostPerPerson = "45,000 دج";

  // Recruitment sources distribution matching Image 5
  const sourcesPerformance = [
    { source: "TRACK (المنصة الذكية)", value: 79, color: "bg-blue-600" },
    { source: "الوكالات المعيارية", value: 12, color: "bg-indigo-600" },
    { source: "مواقع التوظيف العشوائية", value: 7, color: "bg-cyan-500" },
    { source: "أخرى خارجية", value: 2, color: "bg-slate-400" }
  ];

  // Predictive future demand matching the list style or simple graph coordinates
  const prospectiveTalentsDemand = [
    { month: "أكتوبر", developers: 12, analysts: 4 },
    { month: "نوفمبر", developers: 15, analysts: 6 },
    { month: "ديسمبر", developers: 18, analysts: 9 },
    { month: "جانفي", developers: 22, analysts: 11 },
    { month: "فيفري", developers: 25, analysts: 13 }
  ];

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs font-sans text-right space-y-6 animate-fade-in" dir="rtl">
      
      {/* Title Header */}
      <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
        <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-650 flex items-center justify-center">
          <Building className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-sm font-black text-slate-800">ذكاء الموارد البشرية والتخطيط الاستراتيجي (HR Intelligence Console)</h3>
          <p className="text-[10px] text-slate-400 mt-0.5">لوحة ذكية مخصصة لمدراء الموارد البشرية والتخطيط الاستباقي للفرق والرواتب بالتعاون مع حاضنة مغنية.</p>
        </div>
      </div>

      {/* Overview Stats Block (matching top-left of image 5 layout) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Stat Item 1 */}
        <div className="bg-slate-50/50 border border-slate-100 p-4.5 rounded-2xl space-y-2">
          <span className="text-[9.5px] text-slate-400 block font-bold">معدل الدوران الوظيفي العام</span>
          <div className="flex items-baseline gap-2 justify-end">
            <span className="text-2xl font-black font-mono text-slate-800">{employeeTurnoverRate}</span>
            <span className="text-[8.5px] text-emerald-600 font-bold font-mono">▼ -2.5% من الفترة السابقة</span>
          </div>
          <p className="text-[8px] text-slate-400">انخفاض ملحوظ نتيجة دقة تتبع مهارات الجدارة.</p>
        </div>

        {/* Stat Item 2 */}
        <div className="bg-slate-50/50 border border-slate-105 p-4.5 rounded-2xl space-y-2">
          <span className="text-[9.5px] text-slate-400 block font-bold">متوسط مدة التوظيف الفعلية</span>
          <div className="flex items-baseline gap-2 justify-end">
            <span className="text-2xl font-black font-mono text-slate-800">{averageTimeToHire}</span>
            <span className="text-[8.5px] text-emerald-600 font-bold font-mono">▼ -6 أيام تسريع الفرز</span>
          </div>
          <p className="text-[8px] text-slate-400">تحول الفرز الخوارزمي المزدوج يسرع استقطاب الكفاءات.</p>
        </div>

        {/* Stat Item 3 */}
        <div className="bg-slate-50/50 border border-slate-100 p-4.5 rounded-2xl space-y-2">
          <span className="text-[9.5px] text-slate-400 block font-bold">معدل قبول العروض الوظيفية</span>
          <div className="flex items-baseline gap-2 justify-end">
            <span className="text-2xl font-black font-mono text-slate-800">{offerAcceptanceRate}</span>
            <span className="text-[8.5px] text-emerald-600 font-bold font-mono">▲ +5% توافق مع التوقعات</span>
          </div>
          <p className="text-[8px] text-slate-400">ملاءمة الرواتب المقترحة مع جدارات الكوادر الواقعية.</p>
        </div>

      </div>

      {/* Main double column container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left column (7 cols): Future talent forecast visual chart */}
        <div className="lg:col-span-7 bg-slate-50/50 border border-slate-100 rounded-3xl p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2 justify-between">
            <div className="flex items-center gap-1.5">
              <ChartIcon className="w-4 h-4 text-blue-600" />
              <h4 className="text-xs font-black text-slate-800">توقعات الاحتياجات المستهدفة للمستقبل (Predictive Line)</h4>
            </div>
            <span className="text-[8px] bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full font-bold">نموذج ذكي تنبؤي</span>
          </div>

          <p className="text-[9.5px] text-slate-500 leading-normal">
            بناءً على طلب السوق وحاضنة جامعة مغنية، نعرض لكم الخط التنبؤي المتوقع لاحتياجات التوظيف في الجزائر للأشهر القادمة:
          </p>

          <div className="space-y-3.5">
            {prospectiveTalentsDemand.map((d, idx) => (
              <div key={idx} className="bg-white border border-slate-100/50 p-3 rounded-xl flex items-center justify-between text-right">
                <span className="text-[10px] font-black text-slate-700">{d.month}</span>
                
                <div className="flex items-center gap-4 text-[9.5px] font-bold">
                  <span className="text-blue-600">مهندسي الويب المطورين: <strong className="font-mono text-xs">{d.developers}</strong></span>
                  <span className="text-slate-350">•</span>
                  <span className="text-indigo-600">محللي البيانات: <strong className="font-mono text-xs">{d.analysts}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column (5 cols): Recruitment costs & performance by source */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Cost of recruitment */}
          <div className="bg-white border border-slate-100 rounded-3xl p-5 space-y-3">
            <span className="text-[9px] text-slate-400 block font-bold">تكلفة الاستقطاب لكل موظف متكامل</span>
            <div className="bg-blue-600 text-white p-4 rounded-2xl text-center space-y-1">
              <span className="text-2xl font-black font-mono block">{recruitmentCostPerPerson}</span>
              <p className="text-[9px] text-white/80">توفر ما يقارب %45 من الميزانية مقارنة بالفرز الخارجي التقليدي.</p>
            </div>
          </div>

          {/* Source distribution tracker */}
          <div className="bg-white border border-slate-100 rounded-3xl p-5 space-y-4">
            <div className="border-b border-slate-50 pb-2">
              <h4 className="text-xs font-black text-slate-800">أداء التوظيف حسب المصدر (Source Distribution)</h4>
            </div>

            <div className="space-y-2.5">
              {sourcesPerformance.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-[9px] font-black text-slate-650">
                    <span>{item.source}</span>
                    <span className="font-mono text-slate-800">{item.value}%</span>
                  </div>
                  <div className="w-full bg-slate-50 h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
