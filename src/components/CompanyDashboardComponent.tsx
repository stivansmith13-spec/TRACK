import React from "react";
import {
  Briefcase,
  Users,
  CheckCircle2,
  TrendingUp,
  PlusCircle,
  TrendingDown,
  Bell,
  Star,
  ChevronRight,
  Sparkles,
  PieChart,
  UserCheck,
  Building
} from "lucide-react";
import { Job } from "../types";

interface CompanyDashboardComponentProps {
  jobs: Job[];
  onNavigateTab: (tab: "dashboard" | "candidates" | "comparison" | "skills" | "intelligence") => void;
  onPostJobClick: () => void;
}

export default function CompanyDashboardComponent({
  jobs,
  onNavigateTab,
  onPostJobClick
}: CompanyDashboardComponentProps) {
  // Mock data matching the UI of Image 1
  const openJobsCount = 24;
  const activeCandidatesCount = 1256;
  const completedPlacements = 18;
  const recruitmentSuccessRate = 78;

  // Top candidates of the week
  const topCandidatesThisWeek = [
    { name: "أحمد ولد علي", role: "Full Stack Developer", match: "94%", rating: 4.8, avatar: "👨‍💻", bg: "bg-blue-50" },
    { name: "سارة بن سعيد", role: "محلل بيانات", match: "91%", rating: 4.7, avatar: "👩‍💼", bg: "bg-orange-50" },
    { name: "ياسين قادري", role: "مهندس DevOps", match: "90%", rating: 4.6, avatar: "👨‍🔬", bg: "bg-purple-50" },
    { name: "مريم زروقي", role: "UI/UX Designer", match: "88%", rating: 4.5, avatar: "👩‍🎨", bg: "bg-emerald-50" }
  ];

  // Smart alerts
  const smartAlerts = [
    {
      id: 1,
      title: "مرشح جديد عالي التطابق",
      desc: "أحمد بن علي يتطابق بنسبة 94% مع منصب Full Stack Developer",
      time: "منذ 10 دقائق",
      color: "bg-blue-500",
      icon: UserCheck
    },
    {
      id: 2,
      title: "تحديث: نقص في المهارات",
      desc: "مهارة DevOps مطلوبة بشدة في 5 عروض جديدة هذا الأسبوع",
      time: "منذ 1 ساعة",
      color: "bg-orange-500",
      icon: TrendingUp
    },
    {
      id: 3,
      title: "اقتراح نظام الموازنة الوزاري",
      desc: "ترشيح 10 خريجين للتدريب بالتوافق مع المادة 5 من القرار الوزاري المشترك",
      time: "منذ 3 ساعات",
      color: "bg-emerald-500",
      icon: Sparkles
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in font-sans text-right" dir="rtl">
      
      {/* 4 Stats Cards matching "Image 1" */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1 */}
        <div className="bg-white border border-slate-100 p-4 rounded-3xl shadow-xs flex flex-col justify-between space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-slate-400 font-bold">الوظائف المفتوحة</span>
            <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Briefcase className="w-4 h-4" />
            </span>
          </div>
          <div>
            <span className="text-2xl font-black font-mono text-slate-800">{openJobsCount}</span>
            <span className="text-[8px] text-emerald-500 block mt-0.5 font-bold">⏱️ +3 وظائف هذا الأسبوع</span>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-white border border-slate-100 p-4 rounded-3xl shadow-xs flex flex-col justify-between space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-slate-400 font-bold">إجمالي المتقدمين</span>
            <span className="w-8 h-8 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div>
            <span className="text-2xl font-black font-mono text-slate-800">{activeCandidatesCount}</span>
            <span className="text-[8px] text-emerald-500 block mt-0.5 font-bold">📈 +18% مقارنة بالشهر السابق</span>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-white border border-slate-100 p-4 rounded-3xl shadow-xs flex flex-col justify-between space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-slate-400 font-bold">التوظيفات المكتملة</span>
            <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div>
            <span className="text-2xl font-black font-mono text-slate-800">{completedPlacements}</span>
            <span className="text-[8px] text-emerald-500 block mt-0.5 font-bold">🌱 +12% معدل اغلاق الوظائف</span>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="bg-white border border-slate-100 p-4 rounded-3xl shadow-xs flex flex-col justify-between space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-slate-400 font-bold">معدل نجاح التوظيف</span>
            <span className="w-8 h-8 rounded-xl bg-purple-50 text-purple-650 flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div>
            <span className="text-2xl font-black font-mono text-slate-800">%{recruitmentSuccessRate}</span>
            <span className="text-[8px] text-emerald-500 block mt-0.5 font-bold">🌟 +9% التوافق مع السوق</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Jobs list & circular gauges / alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (8 cols): Jobs overview & candidates of the week */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Active Job Openings List Card */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs">
            <div className="flex justify-between items-center border-b border-slate-50 pb-4 mb-4">
              <div>
                <h3 className="text-xs font-black text-slate-800">الوظائف المفتوحة حالياً</h3>
                <p className="text-[10px] text-slate-400 mt-0.5">تابع تقدم وظائفك النشطة وطلبات الفرز عليها مباشرة.</p>
              </div>
              <button
                onClick={onPostJobClick}
                className="px-3.5 py-1.5 bg-blue-650 hover:bg-blue-750 text-white rounded-xl text-[9px] font-black transition-all flex items-center gap-1 shadow-md shadow-blue-500/10"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>إضافة وظيفة جديدة</span>
              </button>
            </div>

            <div className="space-y-3">
              {[
                { title: "Full Stack Developer", dept: "قسم التطوير", count: 12, match: 94, salary: "250,000 دج" },
                { title: "محلل بيانات", dept: "قسم الأبحاث", count: 9, match: 91, salary: "180,000 دج" },
                { title: "UI/UX Designer", dept: "قسم التصميم", count: 7, match: 88, salary: "150,000 دج" }
              ].map((role, idx) => (
                <div key={idx} className="border border-slate-50 hover:border-slate-100 p-4 rounded-2xl flex items-center justify-between text-right bg-slate-50/20 hover:bg-slate-50/50 transition-colors">
                  <div>
                    <h4 className="text-[11px] font-black text-slate-800">{role.title}</h4>
                    <span className="text-[9px] text-slate-400 block mt-0.5">{role.dept} • {role.salary}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <span className="text-sm font-black text-blue-600 font-mono">{role.count}</span>
                      <span className="text-[8px] text-slate-400 block font-bold">مرشح متاح</span>
                    </div>
                    <button
                      onClick={() => onNavigateTab("candidates")}
                      className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                    >
                      <ChevronRight className="w-4 h-4 rotate-180" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => onNavigateTab("candidates")}
              className="w-full text-center py-2.5 mt-3 border border-slate-100 hover:bg-slate-50 text-slate-500 text-[10px] font-black rounded-xl transition-all"
            >
              عرض الكل الوظائف
            </button>
          </div>

          {/* Top Candidates of the week */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs">
            <h3 className="text-xs font-black text-slate-800 mb-1">أفضل المرشحين المؤهلين هذا الأسبوع</h3>
            <p className="text-[10px] text-slate-400 mb-4">المرشحون الأكثر ملاءمة بفضل رادار مهاراتهم الموثقة في الجزائر بمغنية.</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
              {topCandidatesThisWeek.map((cand, idx) => (
                <div key={idx} className="border border-slate-100 rounded-2xl p-4 text-center bg-white hover:border-blue-200 transition-all space-y-2">
                  <div className={`w-12 h-12 rounded-full ${cand.bg} flex items-center justify-center text-xl mx-auto shadow-sm`}>
                    {cand.avatar}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-[10.5px] font-black text-slate-800 truncate">{cand.name}</h4>
                    <span className="text-[8.5px] text-slate-400 block truncate">{cand.role}</span>
                  </div>
                  <div className="flex items-center justify-around text-[9px] pt-1.5 border-t border-slate-50">
                    <span className="text-emerald-600 font-black font-mono">{cand.match} مطابقة</span>
                    <span className="text-amber-500 font-bold font-mono">⭐ {cand.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (4 cols): Recruitment Success Pie breakdown & Alerts */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Recruitment success circle chart */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="border-b border-slate-50 pb-3">
              <h3 className="text-xs font-black text-slate-800">معدل الفرز وتوظيف الأداء</h3>
              <p className="text-[10px] text-slate-400">توزيع جودة المرشحين بالفلترة المزدوجة.</p>
            </div>

            <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" stroke="#f1f5f9" strokeWidth="8" fill="none" />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="#2563eb"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="264"
                  strokeDashoffset={264 - (264 * recruitmentSuccessRate) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black font-mono text-slate-850">%{recruitmentSuccessRate}</span>
                <span className="text-[8px] text-emerald-500 font-bold">معدل النجاح العام</span>
              </div>
            </div>

            {/* Breakdown itemize list matching image 1 */}
            <div className="space-y-1.5 text-[9.5px]">
              <div className="flex justify-between items-center bg-slate-50/50 p-2 rounded-xl">
                <span className="flex items-center gap-1.5 text-slate-600 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> مطابقة مثالية لدعم القرار
                </span>
                <span className="font-mono text-emerald-600 font-black">45%</span>
              </div>
              <div className="flex justify-between items-center bg-slate-50/50 p-2 rounded-xl">
                <span className="flex items-center gap-1.5 text-slate-600 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span> في طور الفرز والتقييم
                </span>
                <span className="font-mono text-sky-655 font-black">25%</span>
              </div>
              <div className="flex justify-between items-center bg-slate-50/50 p-2 rounded-xl">
                <span className="flex items-center gap-1.5 text-slate-600 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> عروض عمل مقدمة وموافقة
                </span>
                <span className="font-mono text-orange-500 font-black">10%</span>
              </div>
              <div className="flex justify-between items-center bg-slate-50/50 p-2 rounded-xl">
                <span className="flex items-center gap-1.5 text-slate-600 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span> مرفوض / غير متوافق رقمياً
                </span>
                <span className="font-mono text-red-500 font-black">20%</span>
              </div>
            </div>
          </div>

          {/* Smart Alerts panel */}
          <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-50 pb-3">
              <Bell className="w-4 h-4 text-blue-600 animate-swing" />
              <h3 className="text-xs font-black text-slate-800">تنبيهات ذكية من النظام</h3>
            </div>

            <div className="space-y-3">
              {smartAlerts.map((alert) => {
                const IconComp = alert.icon;
                return (
                  <div key={alert.id} className="border-b border-slate-50 last:border-0 pb-3 flex items-start gap-2.5 text-right">
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${alert.id === 3 ? "bg-amber-50 text-amber-505" : "bg-slate-50 text-slate-600"}`}>
                      <IconComp className="w-4 h-4" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[10px] font-black text-slate-800 block truncate">{alert.title}</h4>
                      <p className="text-[9px] text-slate-455 leading-relaxed mt-0.5">{alert.desc}</p>
                      <span className="text-[8px] text-slate-400 font-mono block mt-1">{alert.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
