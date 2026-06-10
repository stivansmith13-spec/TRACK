import React, { useState } from "react";
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  User, 
  RefreshCw, 
  Send, 
  CheckCircle2, 
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Bell,
  Settings,
  Calendar,
  Briefcase,
  Layers,
  MapPin,
  Plus,
  ShieldAlert,
  Search,
  Check,
  Eye
} from "lucide-react";

interface UniversityPlannerProps {
  onAddCertificateToStudent: (title: string, issuer: string) => void;
}

export default function UniversityPlanner({ onAddCertificateToStudent }: UniversityPlannerProps) {
  // Main Sub-Tab selection matching the Phase 2 options
  // 1: "dashboard" (لوحة الجامعة الذكية)
  // 2: "tracking" (تتبع الخريجين)
  // 3: "gap" (فجوة المهارات التعليمية)
  // 4: "certifications" (الشهادات الرقمية والاعتمادات)
  // 5: "curriculum" (تطوير المناهج بالبيانات)
  const [activeSubTab, setActiveSubTab] = useState<"dashboard" | "tracking" | "gap" | "certifications" | "curriculum">("dashboard");

  // Selected cohort/year states
  const [academicYear, setAcademicYear] = useState("2023/2024");
  const [cohortYear, setCohortYear] = useState("2023");
  const [selectedMajor, setSelectedMajor] = useState("الإعلام الآلي");

  // Multi-Step issue state in certifications tab
  const [studentName, setStudentName] = useState("");
  const [badgeTitle, setBadgeTitle] = useState("شهادة تحليل البيانات");
  const [customIssuer, setCustomIssuer] = useState("جامعة الجزائر 1");
  const [isIssuing, setIsIssuing] = useState(false);
  const [issuedCerts, setIssuedCerts] = useState([
    { id: "CERT-9921", name: "أحمد بن علي", title: "شهادة تحليل البيانات", date: "20/05/2024", verified: true },
    { id: "CERT-8812", name: "سارة قادري", title: "شهادة تطوير ويب", date: "16/05/2024", verified: true },
    { id: "CERT-7411", name: "يونس بلقاسم", title: "شهادة الأمن السيبراني", date: "15/05/2024", verified: true }
  ]);

  // Curriculum updates state
  const [enabledSkills, setEnabledSkills] = useState({
    ml: true,
    bigData: true,
    cloud: false,
    security: false,
    mobile: false
  });
  const [customSkillInput, setCustomSkillInput] = useState("");
  const [curriculumStatus, setCurriculumStatus] = useState<"idle" | "applying" | "success">("idle");

  const toggleSkill = (key: keyof typeof enabledSkills) => {
    setEnabledSkills(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleIssueBadge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !badgeTitle) return;

    setIsIssuing(true);
    setTimeout(() => {
      // Append to local state list
      const newCert = {
        id: `CERT-${Math.floor(1000 + Math.random() * 9000)}`,
        name: studentName,
        title: badgeTitle,
        date: new Date().toLocaleDateString("ar-EG"),
        verified: true
      };
      setIssuedCerts(prev => [newCert, ...prev]);

      // Call parent action
      onAddCertificateToStudent(badgeTitle, customIssuer);

      setIsIssuing(false);
      setStudentName("");
      alert(`🚀 تم بث الشارة وتوثيقها بنجاح للطالب: ${studentName}! متاح الآن على محفظته الإلكترونية في جدارة.`);
    }, 1200);
  };

  const applyCurriculumChanges = () => {
    setCurriculumStatus("applying");
    setTimeout(() => {
      setCurriculumStatus("success");
      setTimeout(() => setCurriculumStatus("idle"), 4000);
    }, 1500);
  };

  // Partnerships state
  const [partners, setPartners] = useState([
    { name: "Microsoft", role: "شراكة برامج التقنية والحوسبة" },
    { name: "Google", role: "مسار مطوري الأندرويد والذكاء الاصطناعي" },
    { name: "Cisco", role: "أكاديمية الشبكات والأمن المتطورة" },
    { name: "IBM", role: "مبادرة الحوسبة الكمية للجامعات" },
    { name: "Oracle", role: "قواعد البيانات وهندسة النظم المشتركة" },
    { name: "AWS", role: "تعليم مهارات السحابة وتطبيقات الخوادم" }
  ]);

  const handleAddPartner = () => {
    const pName = prompt("أدخل اسم الشريك الأكاديمي الجديد (على سبيل المثال: RedHat, Meta, Huawei):");
    const pRole = prompt("أدخل دور الشراكة أو المبادرة:");
    if (pName && pRole) {
      setPartners(prev => [...prev, { name: pName, role: pRole }]);
    }
  };

  return (
    <div className="bg-slate-50 text-slate-800 rounded-3xl overflow-hidden border border-slate-100 shadow-xl font-sans" dir="rtl">
      
      {/* ================================= HEADER SECTION (Matching exact university image metadata) ================================= */}
      <div className="bg-gradient-to-l from-slate-900 via-indigo-950 to-slate-900 text-white p-6 border-b border-indigo-900/40 relative">
        <div className="absolute top-0 right-0 w-96 h-full bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_60%)] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-full bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.1),transparent_60%)] pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          
          {/* Logo & Portal Titles */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-400/30 flex items-center justify-center text-indigo-400 shrink-0">
              <span className="text-xl">🎓</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-bold">المرحلة الثانية</span>
                <span className="text-xs text-indigo-200">بوابة الجامعة ومراكز التكوين</span>
              </div>
              <h1 className="text-lg lg:text-xl font-black tracking-tight text-white mt-1">جامعة الجزائر</h1>
              <p className="text-[10px] text-slate-300 mt-1 font-medium font-sans">
                ربط التعليم بسوق العمل عبر بيانات دقيقة وتحليل ذكي لمنع الفجوة الأكاديمية
              </p>
            </div>
          </div>

          {/* Stepper progress */}
          <div className="flex flex-col items-center shrink-0">
            <div className="flex items-center gap-1.5 mb-2 bg-black/25 px-3 py-1 rounded-full border border-white/5">
              <span className="text-[9px] text-slate-300 font-bold">المرحلة</span>
              <span className="text-xs font-black text-indigo-400">2 من 5</span>
            </div>
            {/* Visual Stepper */}
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((step, idx) => (
                <React.Fragment key={step}>
                  {idx > 0 && <span className={`w-4 h-[3px] ${step <= 2 ? "bg-indigo-500" : "bg-slate-700"}`}></span>}
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-black text-white shadow-lg ${
                    step <= 2 ? "bg-indigo-600 border border-indigo-400 font-bold shadow-indigo-500/25" : "bg-slate-800 border border-slate-700 text-slate-400"
                  }`}>
                    {step}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* User Welcome Block */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-2xl md:min-w-[220px]">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=120" 
                alt="University Director" 
                className="w-10 h-10 rounded-xl object-cover border border-white/20"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-indigo-950"></span>
            </div>
            <div className="text-right">
              <h4 className="text-xs font-black text-white">مرحباً، د. أحمد محمد</h4>
              <p className="text-[9px] text-indigo-200 mt-0.5 font-sans">مدير الجامعة ومخطط المناهج</p>
              <p className="text-[8px] text-slate-400 mt-0.5">عمادة الربط الأكاديمي والتوظيف</p>
            </div>
          </div>

        </div>
      </div>

      {/* ================================= STEPPER TABS (Horizontal Grid exactly matching the design style of Screenshot 2) ================================= */}
      <div className="bg-white border-b border-slate-100 p-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-6xl mx-auto">
          
          {/* Subtab 1 */}
          <button 
            onClick={() => setActiveSubTab("dashboard")}
            className={`p-3 rounded-2xl text-right transition-all border outline-none ${
              activeSubTab === "dashboard" 
                ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/10" 
                : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-100"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs p-1 bg-white/20 rounded-lg">1</span>
              <span className="text-[10px] font-black block">لوحة الجامعة الذكية</span>
            </div>
            <span className={`text-[8px] font-medium leading-tight block ${activeSubTab === "dashboard" ? "text-indigo-100" : "text-slate-400"}`}>نظرة شاملة على أداء الجامعة ومخرجاتها</span>
          </button>

          {/* Subtab 2 */}
          <button 
            onClick={() => setActiveSubTab("tracking")}
            className={`p-3 rounded-2xl text-right transition-all border outline-none ${
              activeSubTab === "tracking" 
                ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/10" 
                : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-100"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs p-1 bg-white/20 rounded-lg">2</span>
              <span className="text-[10px] font-black block">تتبع الخريجين</span>
            </div>
            <span className={`text-[8px] font-medium leading-tight block ${activeSubTab === "tracking" ? "text-indigo-100" : "text-slate-400"}`}>تحليل مسار الخريجين واندماجهم المهني</span>
          </button>

          {/* Subtab 3 */}
          <button 
            onClick={() => setActiveSubTab("gap")}
            className={`p-3 rounded-2xl text-right transition-all border outline-none ${
              activeSubTab === "gap" 
                ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/10" 
                : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-100"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs p-1 bg-white/20 rounded-lg">3</span>
              <span className="text-[10px] font-black block">فجوة المهارات التعليمية</span>
            </div>
            <span className={`text-[8px] font-medium leading-tight block ${activeSubTab === "gap" ? "text-indigo-100" : "text-slate-400"}`}>مقارنة بين ما يدرّس وما يطلبه السوق</span>
          </button>

          {/* Subtab 4 */}
          <button 
            onClick={() => setActiveSubTab("certifications")}
            className={`p-3 rounded-2xl text-right transition-all border outline-none ${
              activeSubTab === "certifications" 
                ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/10" 
                : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-100"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs p-1 bg-white/20 rounded-lg">4</span>
              <span className="text-[10px] font-black block">الشهادات الرقمية والاعتمادات</span>
            </div>
            <span className={`text-[8px] font-medium leading-tight block ${activeSubTab === "certifications" ? "text-indigo-100" : "text-slate-400"}`}>إصدار وتوثيق الشهادات رقمياً بموثوقية</span>
          </button>

          {/* Subtab 5 */}
          <button 
            onClick={() => setActiveSubTab("curriculum")}
            className={`p-3 rounded-2xl text-right transition-all border outline-none md:col-span-1 col-span-2 ${
              activeSubTab === "curriculum" 
                ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/10" 
                : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-100"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs p-1 bg-white/20 rounded-lg">5</span>
              <span className="text-[10px] font-black block">تطوير المناهج بالبيانات</span>
            </div>
            <span className={`text-[8px] font-medium leading-tight block ${activeSubTab === "curriculum" ? "text-indigo-100" : "text-slate-400"}`}>تعديل وتحديث المناهج تدفقياً للقرار الوزاري</span>
          </button>

        </div>
      </div>

      {/* ================================= MAIN INTERACTIVE TAB WORKSPACES ================================= */}
      <div className="p-6">
        
        {/* ================================= TAB 1: لوحة الجامعة الذكية (University Smart Dashboard) ================================= */}
        {activeSubTab === "dashboard" && (
          <div className="space-y-6 animate-fade-in text-right">
            
            {/* Top key performance statistics row */}
            <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm">
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-50 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse"></span>
                  <h3 className="text-xs font-black text-slate-800">مؤشرات الأداء الكلية وعجلة الملاءمة للجامعة</h3>
                </div>
                
                {/* Academic Year Selection dropdown matching visual mock */}
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-slate-400">السنة الأكاديمية:</span>
                  <select 
                    value={academicYear} 
                    onChange={(e) => setAcademicYear(e.target.value)}
                    className="px-2.5 py-1 text-[10px] bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-bold focus:outline-none"
                  >
                    <option value="2023/2024">الدفعة الجديدة 2023/2024</option>
                    <option value="2022/2023">الدفعة المنقضية 2022/2023</option>
                  </select>
                </div>
              </div>

              {/* 4 Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Stat 1 */}
                <div className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100 p-4 rounded-2xl text-center transition-all relative">
                  <span className="text-[9px] text-slate-400 font-black block leading-relaxed">إجمالي الطلاب والطلبة المنتسبين</span>
                  <span className="text-xl font-black font-mono text-indigo-950 tracking-tight block my-1">24,568</span>
                  <span className="text-[9px] text-emerald-600 font-bold bg-emerald-50 px-1 py-0.5 rounded inline-flex items-center gap-0.5">+5.2% عن الربع السابق</span>
                </div>
                {/* Stat 2 */}
                <div className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100 p-4 rounded-2xl text-center transition-all">
                  <span className="text-[9px] text-slate-400 font-black block leading-relaxed">الخريجون هذا العام</span>
                  <span className="text-xl font-black font-mono text-indigo-950 tracking-tight block my-1">5,432</span>
                  <span className="text-[9px] text-emerald-600 font-bold bg-emerald-50 px-1 py-0.5 rounded inline-flex items-center gap-0.5">+8.1% نمو المخرجات</span>
                </div>
                {/* Stat 3 */}
                <div className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100 p-4 rounded-2xl text-center transition-all">
                  <span className="text-[9px] text-slate-400 font-black block leading-relaxed">معدل الإدماج والتشغيل الفعلي</span>
                  <span className="text-xl font-black font-mono text-indigo-950 tracking-tight block my-1">68%</span>
                  <span className="text-[9px] text-emerald-600 font-bold bg-emerald-50 px-1 py-0.5 rounded inline-flex items-center gap-0.5">+6.3% الملاءمة التقنية</span>
                </div>
                {/* Stat 4 */}
                <div className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100 p-4 rounded-2xl text-center transition-all">
                  <span className="text-[9px] text-slate-400 font-black block leading-relaxed">نسبة الرضا عن المناهج المحدثة</span>
                  <span className="text-xl font-black font-mono text-indigo-950 tracking-tight block my-1">86%</span>
                  <span className="text-[9px] text-indigo-700 bg-indigo-50 font-bold px-1 py-0.5 rounded inline-flex items-center gap-0.5">+4.7% قياس القرار الوزاري</span>
                </div>
              </div>
            </div>

            {/* Main content grid: Top Requested Specialties + Faculty performance  */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Box 1: Most requested specialties */}
              <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-indigo-50/40">
                  <h4 className="text-xs font-black text-slate-800">أكثر التخصصات طلباً في سوق العمل</h4>
                  <span className="text-[8px] bg-red-50 text-red-650 px-2 py-0.5 rounded-full font-bold">عالي الطلب</span>
                </div>

                <div className="space-y-3">
                  {[
                    { id: 1, name: "الذكاء الاصطناعي وهندسة البيانات", score: "92%", color: "bg-indigo-600" },
                    { id: 2, name: "تحليل البيانات واستخراج الأنماط", score: "89%", color: "bg-indigo-550" },
                    { id: 3, name: "الأمن السيبراني وسلاسل الكتل", score: "85%", color: "bg-sky-500" },
                    { id: 4, name: "تطوير البرمجيات والنظم السحابية", score: "83%", color: "bg-slate-500" },
                    { id: 5, name: "التسويق الرقمي وإحصاء الأعمال", score: "78%", color: "bg-slate-400" },
                  ].map((major) => (
                    <div key={major.id} className="space-y-1.5 hover:bg-slate-50/30 p-1.5 rounded-xl transition">
                      <div className="flex justify-between items-center text-[9px] font-bold text-slate-700">
                        <span className="flex items-center gap-1.5">
                          <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-[8px] font-black">{major.id}</span>
                          <span>{major.name}</span>
                        </span>
                        <span className="font-mono text-indigo-700">{autoMark(major.score)}</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${major.color}`} style={{ width: major.score }}></div>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => alert("جاري فتح تقرير الاحتياجات والتخصصات الكلية وتفاصيل الطلب في 58 ولاية...")}
                  className="w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-150 rounded-xl text-[9px] font-black text-slate-700 transition"
                >
                  عرض جميع التخصصات المقترحة
                </button>
              </div>

              {/* Box 2: Faculty Placement Performance (أداء الكليات) */}
              <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4">
                <div>
                  <h4 className="text-xs font-black text-slate-800">أداء الكليات ومعدل التوظيف</h4>
                  <p className="text-[9px] text-slate-400 mt-0.5">نسبة خريجي الكليات الذين حصلوا على فرصة في أول 6 أشهر.</p>
                </div>

                {/* Vertical Bar Chart visualization matching visual elegance requested */}
                <div className="h-44 bg-slate-50 rounded-2xl relative p-4 border border-slate-100 flex items-end justify-between gap-2">
                  {[
                    { label: "الإعلام الآلي", val: 92, color: "bg-indigo-600" },
                    { label: "الهندسة", val: 88, color: "bg-indigo-550" },
                    { label: "الع. الاقتصادية", val: 85, color: "bg-indigo-500" },
                    { label: "علوم الأرض", val: 82, color: "bg-indigo-400" },
                    { label: "الحقوق", val: 78, color: "bg-slate-400" },
                    { label: "الع. الاجتماعية", val: 75, color: "bg-slate-300" }
                  ].map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                      <span className="text-[7.5px] font-mono font-black text-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity">{bar.val}%</span>
                      <div className="w-full bg-slate-200 rounded-t-lg relative flex items-end" style={{ height: `${bar.val - 30}%` }}>
                        <div className={`w-full rounded-t-lg transition-all duration-500 ${bar.color} group-hover:brightness-95`} style={{ height: "100%" }}></div>
                      </div>
                      <span className="text-[7px] text-slate-500 font-bold block text-center truncate max-w-full leading-tight" title={bar.label}>{bar.label}</span>
                    </div>
                  ))}
                </div>

                <div className="text-[8.5px] text-slate-400 font-medium">
                  💡 تظهر كليات الإعلام الآلي والذكاء الاصطناعي معدل توظيف متقدم بفضل حزمة الشارات الرقمية المشتركة.
                </div>
              </div>

              {/* Box 3: Live Alerts Panel */}
              <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                    <h4 className="text-xs font-black text-slate-800">أحدث التنبيهات الملاءمة</h4>
                    <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping"></span>
                  </div>

                  <div className="space-y-2.5 text-[9.5px]">
                    <div className="p-2.5 bg-sky-50/50 border border-sky-100 rounded-xl flex items-start justify-between gap-1.5">
                      <div>
                        <p className="font-black text-slate-800">ارتفاع لافت لطلب سوق العمل على خريجي تصميم البرمجيات</p>
                        <span className="text-[8px] text-slate-400 mt-1 block">مؤشر في ولاية الجزائر ووهران وتلمسان - منذ 3 ساعات</span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-amber-50/50 border border-amber-100 rounded-xl flex items-start justify-between gap-1.5">
                      <div>
                        <p className="font-black text-amber-900">نقص محتمل في مهارات إدارة قواعد البيانات الكبيرة</p>
                        <span className="text-[8px] text-amber-600 mt-1 block">توصيات مستعجلة للمناهج دفعة 2024 - منذ يومين</span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-slate-50/70 border border-slate-100 rounded-xl flex items-start justify-between gap-1.5">
                      <div>
                        <p className="font-bold text-slate-700">اعتماد شراكة جديدة مع Google لمهارات الكلاود</p>
                        <span className="text-[8px] text-slate-400 mt-1 block">تم تفعيل شهادات جدارة والتوثيق التلقائي - منذ 4 أيام</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 border-t border-slate-100 pt-3 flex items-center justify-between text-[9px]">
                  <span className="text-slate-400">التحديثات تتكامل مع مرصد المهارات والمقاييس.</span>
                  <button 
                    onClick={() => setActiveSubTab("gap")}
                    className="font-black text-indigo-700 hover:underline flex items-center gap-0.5"
                  >
                    مراجعة الفجوة <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ================================= TAB 2: تتبع الخريجين (Graduate Tracking) ================================= */}
        {activeSubTab === "tracking" && (
          <div className="space-y-6 animate-fade-in text-right">
            
            <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-50 flex-wrap gap-2">
                <div>
                  <h3 className="text-xs font-black text-slate-800">تتبع الخريجين والاندماج المهني للطلبة</h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">دراسة مآل خريجي جامعة الجزائر ومدة الحصول على منصب شغل.</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-slate-400 font-bold">تحديد الدفعة للتتبع:</span>
                  <select 
                    value={cohortYear} 
                    onChange={(e) => setCohortYear(e.target.value)}
                    className="px-2.5 py-1 text-[10px] bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-bold focus:outline-none"
                  >
                    <option value="2023">دفعة العام المنصرم 2023</option>
                    <option value="2022">دفعة 2022 (تتبع 24 شهراً)</option>
                    <option value="2021">دفعة 2021 (تتبع 36 شهراً)</option>
                  </select>
                </div>
              </div>

              {/* Stat figures Specific to tracking */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-2xl text-center">
                  <span className="text-[9px] text-indigo-950 font-bold block">إجمالي خريجي الدفعة المتابعين</span>
                  <span className="text-base font-black font-mono text-indigo-900 block my-1">5,432 خريج</span>
                  <span className="text-[8.5px] text-slate-400">ممن تم بث وتوقيع هوياتهم عبر TRACK</span>
                </div>
                
                <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-2xl text-center">
                  <span className="text-[9px] text-emerald-950 font-bold block">نسبة التوظيف والإدماج في السوق</span>
                  <span className="text-base font-black font-mono text-emerald-700 block my-1">68%</span>
                  <span className="text-[8.5px] text-emerald-600 font-medium">معدل مواءمة متميز مقارنة بالأعوام المنصرمة</span>
                </div>

                <div className="bg-sky-50/50 border border-sky-100 p-4 rounded-2xl text-center">
                  <span className="text-[9px] text-sky-950 font-bold block">متوسط مدة الحصول على العمل</span>
                  <span className="text-base font-black font-mono text-sky-700 block my-1">3 أشهر</span>
                  <span className="text-[8.5px] text-slate-400">بعد توثيق المهارات بالشارات الرقمية</span>
                </div>
              </div>
            </div>

            {/* Sub content: Job placements by major vs Work sectors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Placements chart */}
              <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4">
                <div>
                  <h4 className="text-xs font-black text-slate-800">نسبة التوظيف حسب التخصص الفصلي</h4>
                  <p className="text-[9px] text-slate-400 mt-0.5">درجة الإدماج المستقل للخريجين في كل ميدان علمي.</p>
                </div>

                <div className="space-y-3">
                  {[
                    { name: "الإعلام الآلي وتطوير النظم", score: "82%", barCol: "bg-indigo-600" },
                    { name: "الهندسة المعمارية والتقنية", score: "75%", barCol: "bg-indigo-500" },
                    { name: "العلوم الاقتصادية والتسيير", score: "63%", barCol: "bg-indigo-400" },
                    { name: "الحقوق والعلوم الإدارية والسياسية", score: "45%", barCol: "bg-slate-450" },
                    { name: "علوم التسيير والملفات الإحصائية", score: "60%", barCol: "bg-sky-550" },
                    { name: "العلوم الاجتماعية والإنسانية الأكاديمية", score: "40%", barCol: "bg-slate-350" }
                  ].map((field, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between items-center text-[8.5px] font-bold text-slate-700">
                        <span>{field.name}</span>
                        <span className="font-mono text-slate-850 font-bold">{field.score}</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${field.barCol}`} style={{ width: field.score }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* sector pie representation */}
              <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-black text-slate-800">أين يعمل خريجونا؟</h4>
                  <p className="text-[9px] text-slate-400 mt-0.5">توزيع قوى العمل المدمجة على شرايين المؤسسات والقطاعات.</p>
                </div>

                {/* Simulated Donut visual */}
                <div className="flex justify-center items-center h-28 my-2 relative">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle cx="48" cy="48" r="38" stroke="#f1f5f9" strokeWidth="10" fill="transparent" />
                    {/* Private sector 58% */}
                    <circle cx="48" cy="48" r="38" stroke="#4f46e5" strokeWidth="10" fill="transparent" strokeDasharray="238" strokeDashoffset="100" strokeLinecap="round" />
                    {/* Public 24% */}
                    <circle cx="48" cy="48" r="38" stroke="#10b981" strokeWidth="10" fill="transparent" strokeDasharray="238" strokeDashoffset="180" strokeLinecap="round" />
                    {/* Startups 12% */}
                    <circle cx="48" cy="48" r="38" stroke="#eab308" strokeWidth="10" fill="transparent" strokeDasharray="238" strokeDashoffset="210" strokeLinecap="round" />
                    {/* Freelancers 6% */}
                    <circle cx="48" cy="48" r="38" stroke="#64748b" strokeWidth="10" fill="transparent" strokeDasharray="238" strokeDashoffset="225" strokeLinecap="round" />
                  </svg>
                  <div className="absolute text-center flex flex-col">
                    <span className="text-xs font-mono font-black text-slate-800">68%</span>
                    <span className="text-[6.5px] text-slate-400">إدماج موائم</span>
                  </div>
                </div>

                <div className="text-[9px] space-y-1.5 text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>القطاع الخاص ومجمعات الأعمال</span>
                    <span className="font-bold">58%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>المؤسسات والوزارات والقطاع العام</span>
                    <span className="font-bold">24%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>المؤسسات الناشئة والمبتكرة</span>
                    <span className="font-bold">12%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>العمل الحر والمستقلين</span>
                    <span className="font-bold">6%</span>
                  </div>
                </div>
              </div>

              {/* Trend development timeline (تطور التوظيف خلال السنوات) */}
              <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4">
                <div>
                  <h4 className="text-xs font-black text-slate-800">تطور التوظيف وحركته التاريخية</h4>
                  <p className="text-[9px] text-slate-400 mt-0.5">دراسة وتتبع وتنبؤ حركة الإدماج الوظيفي عبر الـ 6 سنوات الماضية.</p>
                </div>

                <div className="h-32 bg-slate-50 rounded-2xl relative p-3 border border-slate-100 flex items-center justify-center">
                  <svg viewBox="0 0 350 100" className="w-full h-full">
                    {/* Grid lines */}
                    <line x1="30" y1="10" x2="330" y2="10" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="30" y1="40" x2="330" y2="40" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="30" y1="70" x2="330" y2="70" stroke="#f1f5f9" strokeWidth="1" />

                    {/* Timeline Line */}
                    <path 
                      d="M 40 75 Q 90 68 140 54 T 240 35 T 320 22" 
                      fill="none" 
                      stroke="#4f46e5" 
                      strokeWidth="2.5" 
                      strokeLinecap="round"
                    />
                    
                    {/* Nodes representing years key points */}
                    <circle cx="40" cy="75" r="3.5" fill="#4f46e5" className="cursor-pointer" title="2019: 45%" />
                    <circle cx="90" cy="68" r="3.5" fill="#4f46e5" className="cursor-pointer" title="2020: 50%" />
                    <circle cx="140" cy="54" r="3.5" fill="#4f46e5" className="cursor-pointer" title="2021: 55%" />
                    <circle cx="240" cy="35" r="3.5" fill="#4f46e5" className="cursor-pointer" title="2022: 60%" />
                    <circle cx="320" cy="22" r="3.5" fill="#4f46e5" className="cursor-pointer" title="2023: 65% - 2024: 68%" />

                    {/* Year Labels */}
                    <text x="40" y="90" className="text-[7px] fill-slate-400 font-mono" textAnchor="middle">2019</text>
                    <text x="90" y="90" className="text-[7px] fill-slate-400 font-mono" textAnchor="middle">2020</text>
                    <text x="140" y="90" className="text-[7px] fill-slate-400 font-mono" textAnchor="middle">2021</text>
                    <text x="240" y="90" className="text-[7px] fill-slate-400 font-mono" textAnchor="middle">2022</text>
                    <text x="320" y="90" className="text-[7px] fill-slate-400 font-mono" textAnchor="middle">2023/2024</text>

                    {/* Peak Dot tooltip */}
                    <rect x="290" y="3" width="38" height="10" rx="2" fill="#1e1b4b" />
                    <text x="309" y="10" className="text-[6px] fill-white font-black font-mono">الذروة: 68%</text>
                  </svg>
                </div>

                <div className="bg-indigo-50/40 p-2 border border-indigo-100 rounded-xl text-[8px] text-indigo-900 font-medium">
                  📈 نلاحظ تسارع المنحنى التصاعدي مع بدء تطبيق برامج الشراكة وتوثيق الكفاءات بشكل مستدام ومربوط.
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ================================= TAB 3: فجوة المهارات التعليمية (Educational Skills Gap) ================================= */}
        {activeSubTab === "gap" && (
          <div className="space-y-6 animate-fade-in text-right">

            <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-50 flex-wrap gap-2">
                <div>
                  <h3 className="text-xs font-black text-slate-800">فجوة المهارات التعليمية لجامعة الجزائر</h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">دراسة الفجوة الدقيقة بين الكفاءات التي تدرّس ومقترحات سوق العمل الحركي الفعلي.</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-slate-400 font-bold">تخصّص الدراسة:</span>
                  <select 
                    value={selectedMajor} 
                    onChange={(e) => setSelectedMajor(e.target.value)}
                    className="px-2.5 py-1 text-[10px] bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-bold focus:outline-none"
                  >
                    <option value="الإعلام الآلي">كلية الإعلام الآلي والذكاء الاصطناعي</option>
                    <option value="الهندسة">شعبة علوم وتقنيات الهندسة</option>
                    <option value="العلوم الاقتصادية">تخصص العلوم الاقتصادية والتسيير</option>
                  </select>
                </div>
              </div>

              {/* Main Gauge matching visual mock */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                
                {/* Visual Gauge widget */}
                <div className="bg-slate-50/70 border border-slate-100 p-4 rounded-2xl flex flex-col items-center justify-center">
                  <span className="text-[9.5px] font-black text-indigo-950 mb-2">مستوى ملاءمة التخصص</span>
                  
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="48" cy="48" r="40" stroke="#f1f5f9" strokeWidth="8" fill="transparent" />
                      <circle cx="48" cy="48" r="40" stroke="#4f46e5" strokeWidth="8" fill="transparent" strokeDasharray="251" strokeDashoffset="80" strokeLinecap="round" />
                    </svg>
                    <div className="absolute text-center flex flex-col">
                      <span className="text-lg font-mono font-black text-slate-800">68%</span>
                      <span className="text-[7.5px] text-emerald-650 font-bold">مستوى ملاءمة</span>
                    </div>
                  </div>

                  <div className="mt-3 text-[9px] space-y-1 text-slate-700 w-full px-2">
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>مطابقة عالية كافية:</span>
                      <span className="font-bold">68%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>فجوة متوسطة متبقية:</span>
                      <span className="font-bold">22%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>فجوة كبيرة خطيرة:</span>
                      <span className="font-bold">10%</span>
                    </div>
                  </div>
                </div>

                {/* Specific comparisons of top features (Most Demanded vs Currently Taught) */}
                <div className="bg-slate-50/70 border border-slate-100 p-4 rounded-2xl md:col-span-2 space-y-3">
                  <div className="grid grid-cols-3 text-[10px] font-black text-slate-800 border-b border-slate-205 pb-1.5 mb-1 text-right">
                    <span>المهارات المطلوبة بالسوق</span>
                    <span className="text-center">الطلب vs التدريس الحالي</span>
                    <span className="text-left font-mono">مستوى الفجوة</span>
                  </div>

                  {[
                    { name: "برمجة الـ Python وتقنيات الذكاء", demand: 95, taught: 80, gap: 15, isRed: false },
                    { name: "تحليل وتوصيف البيانات الكبيرة", demand: 90, taught: 60, gap: 30, isRed: false },
                    { name: "تقنيات تعلم الآلة والتعلم العميق", demand: 90, taught: 35, gap: 55, isRed: true },
                    { name: "قواعد البيانات الحديثة SQL / NoSQL", demand: 90, taught: 70, gap: 20, isRed: false },
                    { name: "أمن الشبكات والحوسبة السحابية AWS", demand: 95, taught: 40, gap: 55, isRed: true }
                  ].map((skill, index) => (
                    <div key={index} className="grid grid-cols-3 items-center text-[9px] text-slate-700 my-1 py-1 border-b border-slate-150/40 last:border-0">
                      <span className="font-bold">{skill.name}</span>
                      
                      {/* Bar graph comparison widget */}
                      <div className="flex flex-col items-center justify-center gap-0.5 px-3">
                        <div className="w-full bg-slate-200 h-1 rounded-full relative">
                          <div className="bg-indigo-600 h-1 rounded-full absolute" style={{ width: `${skill.demand}%` }}></div>
                          <div className="bg-emerald-500 h-1.5 rounded-full absolute -top-0.25 opacity-75" style={{ width: `${skill.taught}%` }}></div>
                        </div>
                        <span className="text-[7.5px] text-slate-400">مطلوب: {skill.demand}% | يدرس: {skill.taught}%</span>
                      </div>

                      <div className="text-left font-mono font-black">
                        <span className={`px-2 py-0.5 rounded text-[8px] ${skill.isRed ? "bg-red-50 text-red-650" : "bg-amber-50 text-amber-650"}`}>
                          {skill.gap}% فجوة
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

              {/* Recommendations list to close gap */}
              <div className="border-t border-slate-100 pt-4">
                <span className="text-[9.5px] font-black text-slate-800 block mb-2">توصيات إجرائية مستعجلة لسد الفجوة:</span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 bg-indigo-50/40 border border-indigo-100 rounded-xl">
                    <span className="text-[9px] font-black text-indigo-950 block">🔧 تحديث عاجل للقرار الوزاري:</span>
                    <p className="text-[8.5px] text-slate-600 mt-1 leading-relaxed">إدراج وإضافة مادة "تعلم الآلة والذكاء الاصطناعي" كمقرر أساسي معتمد للمستوى الثالث الفصل الدراسي الأول.</p>
                  </div>
                  
                  <div className="p-3 bg-emerald-50/40 border border-emerald-100 rounded-xl">
                    <span className="text-[9px] font-black text-emerald-950 block">📈 تعميق ساعات التطبيق العملي:</span>
                    <p className="text-[8.5px] text-slate-600 mt-1 leading-relaxed">توصية بزيادة عدد ساعات برمجة الحاسوب والحلول السحابية بمعدل 4 ساعات أسبوعية بنظام المختبر المفتوح.</p>
                  </div>

                  <div className="p-3 bg-sky-50/40 border border-sky-100 rounded-xl">
                    <span className="text-[9px] font-black text-sky-950 block">💼 مشاريع التخرج بالذكاء الاصطناعي:</span>
                    <p className="text-[8.5px] text-slate-600 mt-1 leading-relaxed">تحفيز دمج مشاريع حقيقية مبنية على البيانات بالتعاون مع حاضنات الأعمال والشركات التقنية الحقيقية.</p>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <button 
                    onClick={() => alert("تم موازنة وتصدير ملف التوصيات الأكاديمية وصحائف مقارنات الفجوة للأمانة العلمية.")}
                    className="py-2 px-6 bg-slate-50 hover:bg-slate-100 border border-slate-150 rounded-xl text-[9.5px] font-black text-indigo-700 transition"
                  >
                    عرض وتصدير جميع التوصيات للأقسام الأكاديمية
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ================================= TAB 4: الشهادات الرقمية والاعتمادات (Digital Credentials & Accreditations) ================================= */}
        {activeSubTab === "certifications" && (
          <div className="space-y-6 animate-fade-in text-right">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              
              {/* Form and Metrics: Issue a trusted micro-credential badge */}
              <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4 md:col-span-1">
                <div>
                  <h3 className="text-xs font-black text-slate-800">إصدار وتوقيع شهادة جدارة</h3>
                  <p className="text-[9px] text-slate-400 mt-0.5">بث الشارات الرقمية المعتمدة وتوقيعها على شبكة TRACK لتظهر مباشرة بمحفظة الطالب.</p>
                </div>

                {/* Metrics boxes inside tab */}
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-2 text-center text-indigo-950">
                  <div className="flex justify-between border-b border-slate-205/60 pb-1.5">
                    <span className="text-[9px] text-slate-500 font-bold">نسبة دقة التحقق:</span>
                    <span className="text-[10px] font-black text-indigo-700">98% ميكرو</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-205/60 pb-1.5">
                    <span className="text-[9px] text-slate-500 font-bold">المهارات المصدقة والنشطة:</span>
                    <span className="text-[10px] font-black text-indigo-700">4,782 مهارة</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[9px] text-slate-500 font-bold">إجمالي الشهادات الموزعة:</span>
                    <span className="text-[10px] font-black text-indigo-700">12,458 شهادة</span>
                  </div>
                </div>

                {/* Form element */}
                <form onSubmit={handleIssueBadge} className="space-y-3 border-t border-slate-100 pt-3">
                  <div className="space-y-1">
                    <label className="text-[8px] font-black text-slate-500 block">اسم الطالب (مسجل ببوابات الجزائر)</label>
                    <input 
                      type="text" 
                      required
                      placeholder="مثال: يونس بلقاسم / محمد بن سعيد..." 
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full px-3 py-2 text-[10.5px] bg-slate-50 border border-slate-150 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[8px] font-black text-slate-500 block">العنوان أو الجدارة المهارية</label>
                    <select 
                      value={badgeTitle}
                      onChange={(e) => setBadgeTitle(e.target.value)}
                      className="w-full px-3 py-2 text-[10.5px] bg-slate-50 border border-slate-150 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-bold text-slate-700"
                    >
                      <option value="شهادة تحليل البيانات">شهادة تحليل وتوصيف البيانات</option>
                      <option value="شهادة تطوير وتصميم الـ Web">شهادة تطوير وتوصيل الـ Web المتقدم</option>
                      <option value="شهادة أمان النظم وحوكمة المعلومات">شهادة الأمن السيبراني وسلاسل الكتل</option>
                      <option value="شهادة هندسة وتطبيقات تعلم الآلة">شارة جدارة: تعلم الآلة والذكاء الاصطناعي</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[8px] font-black text-slate-500 block">عمادة الإصدار الحاكمة</label>
                    <input 
                      type="text" 
                      required 
                      value={customIssuer}
                      onChange={(e) => setCustomIssuer(e.target.value)}
                      placeholder="الأكاديمية الوطنية للرقمنة..." 
                      className="w-full px-3 py-2 text-[10.5px] bg-slate-50 border border-slate-150 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isIssuing}
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[10px] font-black transition-all flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/10"
                  >
                    {isIssuing ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>جارٍ التوقيع والبث الرقمي...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>إصدار شهادة موثقة فورياً</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* List of Recent Certificates issued */}
              <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4 md:col-span-2">
                <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                  <div>
                    <h4 className="text-xs font-black text-slate-800">أحدث الشهادات الرقمية الصادرة بالبوابة</h4>
                    <p className="text-[9px] text-slate-400 mt-0.5">قائمة الهويات الأكاديمية والمهارات المصدقة والمنشورة لحظياً.</p>
                  </div>
                  <span className="text-[8px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded">نظام مأمون</span>
                </div>

                <div className="space-y-3.5">
                  {issuedCerts.map((cert) => (
                    <div key={cert.id} className="p-3 bg-slate-50 hover:bg-slate-100/50 border border-slate-150 rounded-2xl flex items-center justify-between gap-3 transition">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm font-bold shrink-0">
                          🎖️
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="text-[10px] font-black text-slate-800">{cert.title}</h5>
                            <span className="text-[7.5px] bg-slate-205 text-slate-500 font-mono font-bold px-1 rounded">{cert.id}</span>
                          </div>
                          <p className="text-[9px] text-slate-400 mt-0.5">المرسل إليه الطالب: <b className="text-slate-700">{cert.name}</b> • تاريخ الإصدار: {cert.date}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[8px] bg-emerald-50 text-emerald-600 font-black px-2 py-1 rounded inline-flex items-center gap-1">
                          <Check className="w-3 h-3" /> موثقة ومطابقة
                        </span>
                        <button 
                          onClick={() => alert(`رمز التحقق الحشوي والرياضي المسجل بالبلوكشين للشهادة ${cert.id}: \n sha256_sig: 0x9a8f4c2e...8b3c\nتم تفعيلها وبثها لمسار التوظيف جدارة.`)}
                          className="w-7 h-7 hover:bg-slate-200 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 transition"
                          title="عرض كود التشفير"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Partners grid matching visual layout in Screenshot 2 */}
                <div className="border-t border-slate-100 pt-4 mt-2">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[9.5px] font-black text-slate-800 block">شراكات الاعتماد والتحقق مع مجمعات الأعمال الكبرى:</span>
                    <button 
                      onClick={handleAddPartner}
                      className="py-1 px-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-[8.5px] font-black transition flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> إضافة مبادرة شريك جديد
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                    {partners.map((pt, index) => (
                      <div key={index} className="bg-slate-50 border border-slate-150 p-2.5 rounded-xl text-center hover:bg-indigo-50/20 transition cursor-pointer" title={pt.role}>
                        <span className="text-[10px] font-black text-indigo-950 block">{pt.name}</span>
                        <span className="text-[7px] text-slate-400 block mt-0.5 truncate">{pt.role}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ================================= TAB 5: تطوير المناهج بالبيانات (Data-driven Curriculum Development) ================================= */}
        {activeSubTab === "curriculum" && (
          <div className="space-y-6 animate-fade-in text-right">

            <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4">
              <div>
                <h3 className="text-xs font-black text-slate-800">تحديث وتطوير المناهج التعليمية تدفقياً (القرار الوزاري للجامعات)</h3>
                <p className="text-[10px] text-slate-400 mt-0.5">دراسة مصفوفة فجوة المهارات واقتراح مواد مستعجلة لترقية الجدارة وتصميم خطط تدريب معتمدة.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                
                {/* Panel 1: Curricula needing updates */}
                <div className="bg-slate-50/70 border border-slate-100 p-4 rounded-2xl space-y-4">
                  <div>
                    <h4 className="text-[10.5px] font-black text-slate-800">المناهج المعلقة التي توجب التعديل بالتوصية</h4>
                    <p className="text-[8.5px] text-slate-400 mt-0.5">مناهج جامعية معرّضة لعزلة أكاديمية لتراجع طلبها العملي.</p>
                  </div>

                  <div className="space-y-2 text-[9px]">
                    <div className="p-2.5 bg-white border border-slate-150 rounded-xl flex items-center justify-between gap-2 shadow-xs">
                      <div>
                        <p className="font-black text-slate-800">برمجة ثنائية وكأنينية التوجّه (Java)</p>
                        <span className="text-[7.5px] text-slate-400 block mt-0.5">الفجوة: تراجع لطلبات النظم المستقلة</span>
                      </div>
                      <span className="bg-red-50 text-red-650 font-bold px-1.5 py-0.5 rounded text-[8px] shrink-0">حرج عالية</span>
                    </div>

                    <div className="p-2.5 bg-white border border-slate-150 rounded-xl flex items-center justify-between gap-2 shadow-xs">
                      <div>
                        <p className="font-black text-slate-800">قواعد البيانات العلائقية والملفات التقليدية</p>
                        <span className="text-[7.5px] text-slate-400 block mt-0.5">الفجوة: عدم مواءمة الحوسبة السحابية والـ NoSQL</span>
                      </div>
                      <span className="bg-amber-50 text-amber-650 font-bold px-1.5 py-0.5 rounded text-[8px] shrink-0">متوسطة</span>
                    </div>

                    <div className="p-2.5 bg-white border border-slate-150 rounded-xl flex items-center justify-between gap-2 shadow-xs">
                      <div>
                        <p className="font-black text-slate-800">شبكات الحاسوب والطبقات المتداولة (CCNA)</p>
                        <span className="text-[7.5px] text-slate-400 block mt-0.5">الفجوة: استبدال وتجهيز كبريات مجمعات الـ DevOps</span>
                      </div>
                      <span className="bg-amber-50 text-amber-650 font-bold px-1.5 py-0.5 rounded text-[8px] shrink-0">متوسطة</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => alert("استدعاء قائمة المقررات والمصفوفة الكاملة...")}
                    className="w-full py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[9px] font-black rounded-lg transition"
                  >
                    عرض جميع المناهج والمقررات
                  </button>
                </div>

                {/* Panel 2: Interactive suggested additions (Checkbox checklist matching screenshot 2) */}
                <div className="bg-slate-50/70 border border-slate-100 p-4 rounded-2xl space-y-4">
                  <div>
                    <h4 className="text-[10.5px] font-black text-slate-800">المهارات الموصى إضافتها وإدراجها</h4>
                    <p className="text-[8.5px] text-slate-400 mt-0.5">حدد المهارات الجاهزة لبث خطة العمل الذكية ومحاكاتها.</p>
                  </div>

                  <div className="space-y-2">
                    {[
                      { key: "ml" as const, label: "مقرر أساسي: تعلم الآلة والتعلم العميق" },
                      { key: "bigData" as const, label: "مقرر تطبيقي: تحليل البيانات الضخمة (Spark)" },
                      { key: "cloud" as const, label: "مهارات السحابة والتحول الرقمي (AWS)" },
                      { key: "security" as const, label: "مبادئ الأمن السيبراني واختراق النظم" },
                      { key: "mobile" as const, label: "برمجة تطبيقات الهاتف النقال (Flutter)" }
                    ].map((entry) => (
                      <div 
                        key={entry.key} 
                        onClick={() => toggleSkill(entry.key)}
                        className={`p-2 rounded-xl border transition cursor-pointer flex items-center justify-between text-[9px] font-bold ${
                          enabledSkills[entry.key] 
                            ? "bg-indigo-50 border-indigo-200 text-indigo-900" 
                            : "bg-white border-slate-150 text-slate-550 hover:bg-slate-100/50"
                        }`}
                      >
                        <span>{entry.label}</span>
                        <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                          enabledSkills[entry.key] ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-300"
                        }`}>
                          {enabledSkills[entry.key] && <Check className="w-3 h-3" />}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-1">
                    <input 
                      type="text" 
                      placeholder="مهارة أخرى مقترحة..." 
                      value={customSkillInput}
                      onChange={(e) => setCustomSkillInput(e.target.value)}
                      className="flex-1 px-2 py-1 bg-white border border-slate-205 rounded-lg text-[9px] focus:outline-none focus:ring-1 focus:ring-indigo-500" 
                    />
                    <button 
                      type="button" 
                      onClick={() => {
                        if (customSkillInput) {
                          alert(`تم تقديم المهارة المقترحة "${customSkillInput}" للأمانة العلمية للدراسة.`);
                          setCustomSkillInput("");
                        }
                      }}
                      className="px-2.5 py-1 bg-indigo-600 text-white font-black text-[9px] rounded-lg hover:bg-indigo-700"
                    >
                      + إقترح
                    </button>
                  </div>
                </div>

                {/* Panel 3: Projected Impact stats and Apply changes */}
                <div className="bg-slate-50/70 border border-slate-100 p-4 rounded-2xl flex flex-col justify-between h-full space-y-4">
                  <div>
                    <h4 className="text-[10.5px] font-black text-slate-800">الأثر المقدر مسبقاً للتحديث</h4>
                    <p className="text-[8.5px] text-slate-400 mt-0.5">دراسة الفارق وتوقعه بنماذج ملاءمة الذكاء الاصطناعي.</p>
                  </div>

                  {/* Visual progress meters */}
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[8px] font-bold">
                        <span className="text-slate-500">تقليص الفجوة المهارية الأكاديمية:</span>
                        <span className="text-emerald-600 font-mono">-15% فجوة</span>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: "65%" }}></div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[8px] font-bold">
                        <span className="text-slate-500">معدل تحسين مواءمة السوق:</span>
                        <span className="text-indigo-600 font-mono">+24% ملاءمة</span>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-indigo-650 h-full rounded-full" style={{ width: "80%" }}></div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[8px] font-bold">
                        <span className="text-slate-500">القابلية المباشرة للتوظيف بالشركات:</span>
                        <span className="text-sky-600 font-mono">+18% جدارة</span>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-sky-500 h-full rounded-full" style={{ width: "74%" }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-150/40 pt-4">
                    {curriculumStatus === "idle" && (
                      <button 
                        onClick={applyCurriculumChanges}
                        className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[9.5px] font-black transition-all shadow-md shadow-indigo-600/10"
                      >
                        تطبيق المنهج المحدث وحفظ القرار الوزاري
                      </button>
                    )}
                    {curriculumStatus === "applying" && (
                      <div className="p-2 bg-indigo-50 text-indigo-700 text-[9px] font-black rounded-xl text-center flex items-center justify-center gap-1.5">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>جاري بث الفجوة وحفظ التغييرات تدفقياً...</span>
                      </div>
                    )}
                    {curriculumStatus === "success" && (
                      <div className="p-2.5 bg-emerald-50 border border-emerald-100 text-emerald-800 text-[9px] font-bold rounded-xl space-y-1 text-center animate-fade-in">
                        <p className="font-black">✔️ تم تحديث المناهج ومخططات القرار بنجاح!</p>
                        <p className="text-[8px] text-slate-500 font-medium font-sans">تم إخطار الطلبة والمعلمبن بالتعديلات، وسينعكس ذلك على شارات التحقق.</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>

      {/* ================================= FOOTER INFO SECTION ================================= */}
      <div className="bg-slate-900 border-t border-slate-800 p-4 text-center">
        <p className="text-[9px] text-slate-400 font-sans tracking-wide">
          بوابة الربط الجامعي ومراكز التكوين والمواءمة المهنية المباشرة • وزارة التعليم العالي والبحث العلمي • الجمهورية الجزائرية الديمقراطية الشعبية
        </p>
      </div>

    </div>
  );
}

// Inline Helper to automatically apply beautiful visual marks in Arabic
function autoMark(text: string): string {
  return text;
}
