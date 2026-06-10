import React, { useState } from "react";
import { 
  Shield, 
  Database, 
  RefreshCw, 
  BarChart2, 
  CheckCircle2, 
  AlertTriangle, 
  Play, 
  HelpCircle, 
  Map, 
  BookOpen, 
  Bell, 
  Settings, 
  Home, 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Users, 
  ExternalLink,
  Award,
  Clock,
  Layers,
  ChevronRight,
  Globe,
  Truck,
  Sparkles,
  Zap,
  Activity
} from "lucide-react";

export default function SovereignTools() {
  // Navigation states
  // activeSubTab: "national" | "map" | "skills" | "policy" | "forecast" | "maghnia"
  const [activeSubTab, setActiveSubTab] = useState<"national" | "map" | "skills" | "policy" | "forecast" | "maghnia">("national");

  // Secondary sub-tab selections
  const [alertFilter, setAlertFilter] = useState<string>("all");
  const [sectorTab, setSectorTab] = useState<"sectors" | "specialties">("sectors");

  // Maghnia Smart Hub Custom States (Super-advanced Algerian integrated features)
  const [maghniaCargoStatus, setMaghniaCargoStatus] = useState<"idle" | "scanning" | "cleared" | "denied">("idle");
  const [maghniaActiveCardIndex, setMaghniaActiveCardIndex] = useState<number>(0);
  const [maghniaLogs, setMaghniaLogs] = useState<string[]>([]);
  const [maghniaIsMatching, setMaghniaIsMatching] = useState<boolean>(false);
  const [maghniaMatchResults, setMaghniaMatchResults] = useState<any[] | null>(null);

  // Existing Deduplicator State (integrated in skills subtab)
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [dedupResult, setDeduplicateResult] = useState<{
    recordsAnalyzed: number;
    duplicatesFound: number;
    savingsAmount: string;
    detailedMatches: any[];
    aiAnalysisExplanation: string;
  } | null>(null);

  // Existing Policy Simulator State (integrated in policy subtab)
  const [centerType, setCenterType] = useState("مراكز الذكاء الاصطناعي وهندسة البرمجيات");
  const [count, setCount] = useState(10);
  const [region, setRegion] = useState("جهة الغرب (تلمسان ومغنية)");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationReport, setSimulationReport] = useState<any>(null);

  // Map interactive state
  const [selectedRegion, setSelectedRegion] = useState<string>("الولايات الشمالية الغربية");
  const [mapDetail, setMapDetail] = useState<{
    unemployment: string;
    workforce: string;
    gap: string;
    dominantSector: string;
  }>({
    unemployment: "11.2%",
    workforce: "2.4 مليون",
    gap: "متوسط (-12%)",
    dominantSector: "التقنيات والصناعات التحويلية"
  });

  // Quick simulation box state in dashboard
  const [quickScenario, setQuickScenario] = useState("ai_centers");
  const [quickDuration, setQuickDuration] = useState("3");

  const handleQuickScenarioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuickScenario(e.target.value);
  };

  const handleQuickDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuickDuration(e.target.value);
  };

  // Regions data for Algerian interactive map
  const regionsMapData: Record<string, { unemployment: string; workforce: string; gap: string; dominantSector: string }> = {
    "الولايات الشمالية الغربية": { unemployment: "11.2%", workforce: "2.4 مليون", gap: "متوسط (-12%)", dominantSector: "التقنيات والصناعات التحويلية" },
    "الجزائر العاصمة والوسط": { unemployment: "8.5%", workforce: "4.1 مليون", gap: "منخفض (-4%)", dominantSector: "تكنولوجيا المعلومات والمالية" },
    "الولايات الشرقية والساحل": { unemployment: "12.8%", workforce: "3.5 مليون", gap: "شديد (-22%)", dominantSector: "الصناعات البتروكيماوية" },
    "الجنوب والواحات": { unemployment: "14.2%", workforce: "1.2 مليون", gap: "شديد جداً (-34%)", dominantSector: "الطاقة والزراعة الصحراوية" },
    "الهضاب العليا": { unemployment: "13.5%", workforce: "2.8 مليون", gap: "شديد (-18%)", dominantSector: "الزراعة والصناعة الخفيفة" }
  };

  const selectAlgerianRegion = (name: string) => {
    setSelectedRegion(name);
    setMapDetail(regionsMapData[name] || regionsMapData["الولايات الشمالية الغربية"]);
  };

  // Triggering deduplication
  const runDeduplication = () => {
    setIsScanning(true);
    setScanProgress(5);
    setDeduplicateResult(null);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 15;
      });
    }, 200);

    setTimeout(() => {
      setDeduplicateResult({
        recordsAnalyzed: 542391,
        duplicatesFound: 2498,
        savingsAmount: "2.8 مليار دج",
        detailedMatches: [
          { id: "DZ-239102", name: "أحمد كمال بن علي", statusValue: "نشط مزدوج", location: "تلمسان", anId: "ANEM-9283", cnId: "CNAS-0291", savings: "1,200,000 دج" },
          { id: "DZ-881290", name: "فاطمة الزهراء بن سعيد", statusValue: "نشط مزدوج", location: "الجزائر العاصمة", anId: "ANEM-4412", cnId: "CNAS-6612", savings: "800,000 دج" },
          { id: "DZ-056121", name: "ياسين قادري", statusValue: "متطابق مع القانون", location: "وهران", anId: "ANEM-1029", cnId: "CNAS-None", savings: "0 دج" },
          { id: "DZ-119283", name: "مريم زروقي", statusValue: "نشط مزدوج", location: "قسنطينة", anId: "ANEM-3921", cnId: "CNAS-8411", savings: "800,000 دج" }
        ],
        aiAnalysisExplanation: "كشف التدقيق المدمج عن وجود ٢,٤٩٨ حالة تسجيل مزدوج نشط وعقود متقاطعة بين الوكالة الوطنية للتشغيل (ANEM) والصندوق الوطني للتأمينات (CNAS). أسهم تفعيل التشغيل البيني الآمن لحظياً عبر مسار TRACK في تسوية التعويضات غير المشروعة وتوفير ٢.٨ مليار دج سنوياً لصالح التوازنات المالية للدولة."
      });
      setIsScanning(false);
    }, 1500);
  };

  // Run simulation
  const runSimulation = () => {
    setIsSimulating(true);
    setSimulationReport(null);

    setTimeout(() => {
      setSimulationReport({
        success: true,
        jobsCreated: count * 4500,
        unemploymentReduction: (count * 1.8).toFixed(1),
        economicImpact: `${(count * 85).toLocaleString()} مليون دج`,
        growthRate: `+${(count * 0.25).toFixed(2)}%`,
        aiSimulationReport: `بتحليل البيانات الجغرافية والاقتصادية، فإن إنشاء عدد ${count} مركز تدريبي وبحثي في مجال "${centerType}" ببلدية ${region} سيساهم مباشرة في تأهيل الكفاءات لعام 2030. يُقدر بنسبة مطابقة وتوجيه تفاعلي تفوق 93%، مما يقلص معدل البطالة المحلي بـ ${count * 1.8}% ومستقبلاً تجميد جزر البطالة الهيكلية بالتحول نحو الرقمنة.`
      });
      setIsSimulating(false);
    }, 1200);
  };

  return (
    <div className="bg-slate-50 text-slate-800 rounded-3xl overflow-hidden border border-slate-100 shadow-xl font-sans" dir="rtl">
      
      {/* ================================= HEADER SECTION (Matching exact image) ================================= */}
      <div className="bg-gradient-to-l from-slate-900 via-indigo-950 to-slate-900 text-white p-6 border-b border-indigo-900/40 relative">
        <div className="absolute top-0 right-0 w-96 h-full bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_60%)] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-full bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.1),transparent_60%)] pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          
          {/* Logo & Portal Titles */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-400/30 flex items-center justify-center text-indigo-400 shrink-0">
              <span className="text-xl">👑</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-bold">المرحلة الخامسة</span>
                <span className="text-xs text-indigo-200">بوابة صناع القرار السيادي</span>
              </div>
              <h1 className="text-lg lg:text-xl font-black tracking-tight text-white mt-1">بوابة صناع القرار</h1>
              <p className="text-[10px] text-slate-300 mt-1 font-medium font-sans">
                لوحة القيادة الاستراتيجية لصناعة القرار المبني على البيانات والنبؤات الاستشرافية لسوق العمل
              </p>
            </div>
          </div>

          {/* Stepper progress (Decision maker phase tracker) */}
          <div className="flex flex-col items-center shrink-0">
            <div className="flex items-center gap-1.5 mb-2 bg-black/25 px-3 py-1 rounded-full border border-white/5">
              <span className="text-[9px] text-slate-300 font-bold">المرحلة</span>
              <span className="text-xs font-black text-indigo-400">5 من 5</span>
            </div>
            {/* Visual Stepper with connected nodes */}
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((step, idx) => (
                <React.Fragment key={step}>
                  {idx > 0 && <span className="w-4 h-[3px] bg-indigo-500"></span>}
                  <div className="w-5 h-5 rounded-full bg-indigo-600 border border-indigo-400 flex items-center justify-center text-[8px] font-black text-white shadow-lg shadow-indigo-500/25">
                    {step}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* User Welcome Block with Avatar */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-2xl md:min-w-[220px]">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120" 
                alt="Ahmed Mohamed" 
                className="w-10 h-10 rounded-xl object-cover border border-white/20"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-indigo-950"></span>
            </div>
            <div className="text-right">
              <h4 className="text-xs font-black text-white">مرحباً، أ. أحمد محمد</h4>
              <p className="text-[9px] text-indigo-200 mt-0.5 font-sans">مستشار أول للتخطيط الاستراتيجي</p>
              <p className="text-[8px] text-slate-400 mt-0.5">مجلس التخطيط والسياسات العامة</p>
            </div>
          </div>

        </div>
      </div>

      {/* ================================= DASHBOARD MAIN LAYOUT ================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
        
        {/* ======================= LEFT COLUMN: SIDEBAR NAVIGATION ======================= */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Section: Main Tab selector */}
          <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-sm space-y-1.5 text-right">
            <span className="text-[9px] text-slate-400 font-bold uppercase block px-3 mb-2 font-sans tracking-wider">الخصائص والأقسام الرئيسية</span>
            
            <button 
              onClick={() => setActiveSubTab("national")}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-right transition-all font-sans font-bold text-xs ${
                activeSubTab === "national" 
                  ? "bg-indigo-50 text-indigo-700 shadow-sm border-r-4 border-indigo-600" 
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Home className="w-4 h-4" />
                <span>لوحة القيادة الوطنية</span>
              </div>
              <span className={`w-2 h-2 rounded-full ${activeSubTab === "national" ? "bg-indigo-600 animate-pulse" : "bg-transparent"}`}></span>
            </button>

            <button 
              onClick={() => setActiveSubTab("map")}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-right transition-all font-sans font-bold text-xs ${
                activeSubTab === "map" 
                  ? "bg-indigo-50 text-indigo-700 shadow-sm border-r-4 border-indigo-600" 
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Map className="w-4 h-4" />
                <span>خريطة الجزائر الذكية</span>
              </div>
              <span className={`w-2 h-2 rounded-full ${activeSubTab === "map" ? "bg-indigo-600 animate-pulse" : "bg-transparent"}`}></span>
            </button>

            <button 
              onClick={() => setActiveSubTab("skills")}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-right transition-all font-sans font-bold text-xs ${
                activeSubTab === "skills" 
                  ? "bg-indigo-50 text-indigo-700 shadow-sm border-r-4 border-indigo-600" 
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4" />
                <span>مرصد المهارات الوطني</span>
              </div>
              <span className={`w-2 h-2 rounded-full ${activeSubTab === "skills" ? "bg-indigo-600 animate-pulse" : "bg-transparent"}`}></span>
            </button>

            <button 
              onClick={() => setActiveSubTab("policy")}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-right transition-all font-sans font-bold text-xs ${
                activeSubTab === "policy" 
                  ? "bg-indigo-50 text-indigo-700 shadow-sm border-r-4 border-indigo-600" 
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4" />
                <span>محاكاة السياسات</span>
              </div>
              <span className={`w-2 h-2 rounded-full ${activeSubTab === "policy" ? "bg-indigo-600 animate-pulse" : "bg-transparent"}`}></span>
            </button>

            <button 
              onClick={() => setActiveSubTab("forecast")}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-right transition-all font-sans font-bold text-xs ${
                activeSubTab === "forecast" 
                  ? "bg-indigo-50 text-indigo-700 shadow-sm border-r-4 border-indigo-600" 
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BarChart2 className="w-4 h-4" />
                <span>التنبؤ بسوق العمل</span>
              </div>
              <span className={`w-2 h-2 rounded-full ${activeSubTab === "forecast" ? "bg-indigo-600" : "bg-transparent"}`}></span>
            </button>

            <button 
              onClick={() => setActiveSubTab("maghnia")}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-right transition-all font-sans font-bold text-xs ${
                activeSubTab === "maghnia" 
                  ? "bg-emerald-50 text-emerald-700 shadow-sm border-r-4 border-emerald-600" 
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold text-slate-800">مخطط مغنية اللوجستي 2030</span>
              </div>
              <span className="bg-emerald-500 text-white font-black px-1.5 py-0.5 rounded text-[8px] animate-pulse">جديد خارق</span>
            </button>

          </div>

          {/* Section: Secondary Categories */}
          <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-sm space-y-1 text-right">
            <span className="text-[9px] text-slate-400 font-bold uppercase block px-3 mb-2 font-sans tracking-wider">موضوعات استراتيجية أخرى</span>
            
            <div className="flex items-center gap-2.5 p-2 px-3 text-slate-500 text-xs font-medium cursor-pointer hover:bg-slate-50/50 rounded-xl">
              <Layers className="w-3.5 h-3.5" />
              <span>المؤشرات الاقتصادية العامة</span>
            </div>

            <div className="flex items-center gap-2.5 p-2 px-3 text-slate-500 text-xs font-medium cursor-pointer hover:bg-slate-50/50 rounded-xl">
              <BookOpen className="w-3.5 h-3.5" />
              <span>التقارير والدراسات الاستراتيجية</span>
            </div>

            <div className="flex items-center justify-between p-2 px-3 text-slate-500 text-xs font-medium cursor-pointer hover:bg-slate-50/50 rounded-xl">
              <div className="flex items-center gap-2.5">
                <Bell className="w-3.5 h-3.5 text-orange-500" />
                <span>الإنذارات والتنبيهات الفرعية</span>
              </div>
              <span className="bg-amber-100 text-amber-800 text-[8px] px-1.5 py-0.5 rounded-full font-bold">3 إنذارات</span>
            </div>

            <div className="flex items-center gap-2.5 p-2 px-3 text-slate-500 text-xs font-medium cursor-pointer hover:bg-slate-50/50 rounded-xl">
              <Database className="w-3.5 h-3.5" />
              <span>قاعدة البيانات الموحدة للأمة</span>
            </div>

            <div className="flex items-center gap-2.5 p-2 px-3 text-slate-500 text-xs font-medium cursor-pointer hover:bg-slate-50/50 rounded-xl">
              <Settings className="w-3.5 h-3.5" />
              <span>إعدادات النظام والحوكمة</span>
            </div>
          </div>

          {/* Backup & Last Sync Indicator */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 text-slate-300 text-right space-y-3.5 relative overflow-hidden">
            <div className="absolute -top-12 -left-12 w-28 h-28 bg-indigo-500/10 rounded-full blur-xl pointer-events-none"></div>
            
            <div className="flex items-center gap-2 text-[10px] font-sans font-bold text-slate-400">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>آخر تحديث للقواعد الوطنية</span>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-mono font-black text-white">20/05/2024 - 10:30 صباحاً</span>
              </div>
              <p className="text-[9px] text-slate-400">يتم معالجة وتحديث البيانات لحظياً بالتنسيق مع مركز الاعلام الوطني.</p>
            </div>

            <button 
              onClick={() => alert("جاري تصدير وموازنة التقرير الاستراتيجي الشامل الموفر للذكاء الاصطناعي... سيتم تنزيل ملف PDF قريباً.")}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[10px] font-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
            >
              <Download className="w-3.5 h-3.5" /> تصدير التقرير الوطني الشامل
            </button>
          </div>

        </div>

        {/* ================================= RIGHT COLUMN: INTERACTIVE WORKSPACES ================================= */}
        <div className="lg:col-span-3 space-y-6">

          {/* ======================= SUBTAB 1: لوحة القيادة الوطنية (National Cockpit) ======================= */}
          {activeSubTab === "national" && (
            <div className="space-y-6 animate-fade-in text-right">
              
              {/* Macro Indicators row */}
              <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-50">
                  <h3 className="text-xs font-black text-indigo-900">المؤشرات الوطنية الكلية (الربع الثاني لعام 2024)</h3>
                  <span className="text-[10px] text-slate-400 bg-slate-5 text-slate-500 px-2 py-1 rounded-lg">البيانات مجمعة من 58 ولاية</span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                  {/* Indicator 1 */}
                  <div className="bg-slate-50/50 hover:bg-slate-50 border border-slate-150 p-3 rounded-2xl text-center transition-all">
                    <span className="text-[9px] text-slate-400 font-bold block leading-relaxed">مؤشر رأس المال البشري</span>
                    <span className="text-base font-black font-mono text-slate-800 tracking-tight block my-1">0.58</span>
                    <span className="text-[9px] text-emerald-600 font-bold bg-emerald-50 px-1 py-0.5 rounded inline-flex items-center gap-0.5">+0.02 <TrendingUp className="w-2 h-2" /></span>
                  </div>
                  {/* Indicator 2 */}
                  <div className="bg-slate-50/50 hover:bg-slate-50 border border-slate-150 p-3 rounded-2xl text-center transition-all">
                    <span className="text-[9px] text-slate-400 font-bold block leading-relaxed">الوظائف المفتوحة</span>
                    <span className="text-base font-black font-mono text-slate-800 tracking-tight block my-1">125,450</span>
                    <span className="text-[9px] text-emerald-600 font-bold bg-emerald-50 px-1 py-0.5 rounded inline-flex items-center gap-0.5">+2.1% <TrendingUp className="w-2 h-2" /></span>
                  </div>
                  {/* Indicator 3 */}
                  <div className="bg-slate-50/50 hover:bg-slate-50 border border-slate-150 p-3 rounded-2xl text-center transition-all">
                    <span className="text-[9px] text-slate-400 font-bold block leading-relaxed">الناتج المحلي الإجمالي</span>
                    <span className="text-xs font-black text-slate-800 block my-2">3,847 مليار دج</span>
                    <span className="text-[9px] text-emerald-600 font-bold bg-emerald-50 px-1 py-0.5 rounded inline-flex items-center gap-0.5">+3.2% <TrendingUp className="w-2 h-2" /></span>
                  </div>
                  {/* Indicator 4 */}
                  <div className="bg-slate-50/50 hover:bg-slate-50 border border-slate-150 p-3 rounded-2xl text-center transition-all">
                    <span className="text-[9px] text-slate-400 font-bold block leading-relaxed">القوى العاملة</span>
                    <span className="text-base font-black font-mono text-slate-800 tracking-tight block my-1">15.2 مليون</span>
                    <span className="text-[9px] text-emerald-600 font-bold bg-emerald-50 px-1 py-0.5 rounded inline-flex items-center gap-0.5">+2.1% <TrendingUp className="w-2 h-2" /></span>
                  </div>
                  {/* Indicator 5 */}
                  <div className="bg-slate-50/50 hover:bg-slate-50 border border-slate-150 p-3 rounded-2xl text-center transition-all">
                    <span className="text-[9px] text-slate-400 font-bold block leading-relaxed">معدل التشغيل الوطني</span>
                    <span className="text-base font-black font-mono text-slate-800 tracking-tight block my-1">48.7%</span>
                    <span className="text-[9px] text-emerald-600 font-bold bg-emerald-50 px-1 py-0.5 rounded inline-flex items-center gap-0.5">+2.1% <TrendingUp className="w-2 h-2" /></span>
                  </div>
                  {/* Indicator 6 */}
                  <div className="bg-slate-50/50 hover:bg-slate-50 border border-slate-150 p-3 rounded-2xl text-center transition-all relative overflow-hidden">
                    <span className="text-[9px] text-slate-400 font-bold block leading-relaxed text-indigo-950">معدل البطالة الكلي</span>
                    <span className="text-base font-black font-mono text-slate-800 tracking-tight block my-1">11.8%</span>
                    <span className="text-[9px] text-indigo-700 bg-indigo-50 font-bold px-1 py-0.5 rounded inline-flex items-center gap-0.5">-0.6% <TrendingDown className="w-2 h-2" /></span>
                  </div>
                </div>
              </div>

              {/* Grid content Map + Skills Graph + Alerts & quick simulation */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* Block 1: Smart map container */}
                <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-black text-slate-800">خريطة الجزائر الذكية للمؤشرات</h4>
                    <p className="text-[9px] text-slate-400 mt-0.5">اضغط على الأقاليم لتكبير وإظهار إحصائيات القوى العاملة المحلية.</p>
                  </div>
                  
                  {/* Simulated SVG Algeria Map styled cleanly */}
                  <div className="my-4 relative h-48 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center p-3">
                    <svg viewBox="0 0 320 320" className="w-full h-full transform hover:scale-[1.01] transition-transform">
                      {/* Deep Desert South Oasis */}
                      <path 
                        d="M 50 210 Q 140 180 230 200 L 260 290 L 100 310 Z" 
                        fill={selectedRegion === "الجنوب والواحات" ? "#312e81" : "#818cf8"} 
                        className="cursor-pointer transition-colors duration-300 stroke-white stroke-2 hover:opacity-90"
                        onClick={() => selectAlgerianRegion("الجنوب والواحات")}
                      />
                      {/* Highlands */}
                      <path 
                        d="M 60 140 Q 140 135 220 150 Q 200 190 50 210 Z" 
                        fill={selectedRegion === "الهضاب العليا" ? "#312e81" : "#a5b4fc"} 
                        className="cursor-pointer transition-colors duration-300 stroke-white stroke-2 hover:opacity-90"
                        onClick={() => selectAlgerianRegion("الهضاب العليا")}
                      />
                      {/* Eastern Provinces / Coast */}
                      <path 
                        d="M 180 60 Q 230 70 240 135 L 220 150 Q 140 135 180 60 Z" 
                        fill={selectedRegion === "الولايات الشرقية والساحل" ? "#312e81" : "#c7d2fe"} 
                        className="cursor-pointer transition-colors duration-300 stroke-white stroke-2 hover:opacity-90"
                        onClick={() => selectAlgerianRegion("الولايات الشرقية والساحل")}
                      />
                      {/* Northwestern */}
                      <path 
                        d="M 60 140 L 100 80 Q 50 60 40 110 Z" 
                        fill={selectedRegion === "الولايات الشمالية الغربية" ? "#312e81" : "#4f46e5"} 
                        className="cursor-pointer transition-colors duration-300 stroke-white stroke-2 hover:opacity-90"
                        onClick={() => selectAlgerianRegion("الولايات الشمالية الغربية")}
                      />
                      {/* Capital and center */}
                      <path 
                        d="M 100 80 Q 140 70 180 60 L 220 150 Q 140 135 60 140 Z" 
                        fill={selectedRegion === "الجزائر العاصمة والوسط" ? "#312e81" : "#6366f1"} 
                        className="cursor-pointer transition-colors duration-300 stroke-white stroke-2 hover:opacity-90"
                        onClick={() => selectAlgerianRegion("الجزائر العاصمة والوسط")}
                      />
                    </svg>

                    {/* Miniature floating detail card */}
                    <div className="absolute bottom-2 left-2 right-2 bg-slate-900/95 text-white p-2.5 rounded-xl text-[8px] space-y-1 backdrop-blur-xs font-sans">
                      <div className="flex justify-between items-center font-bold">
                        <span className="text-indigo-300">📍 {selectedRegion}</span>
                        <span>بطالة: {mapDetail.unemployment}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>قوى عاملة: {mapDetail.workforce}</span>
                        <span>فجوة العرض والطلب: {mapDetail.gap}</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setActiveSubTab("map")}
                    className="w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-150 rounded-xl text-[9px] font-black text-slate-700 transition"
                  >
                    عرض الخريطة التفاعلية والتحاليل الجغرافية
                  </button>
                </div>

                {/* Block 2: National Skills gap */}
                <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4">
                  <div>
                    <h4 className="text-xs font-black text-slate-800">مرصد المهارات الوطني وفجوة العرض</h4>
                    <p className="text-[9px] text-slate-400 mt-0.5">أعلى المهارات طلباً مقارنة بالحجم الصافي للفجوة المرصودة.</p>
                  </div>

                  {/* Supply and demand gap visual gauge (circular donut styled beautifully) */}
                  <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                    <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="32" cy="32" r="26" stroke="#e2e8f0" strokeWidth="6" fill="transparent" />
                        <circle cx="32" cy="32" r="26" stroke="#ef4444" strokeWidth="6" fill="transparent" strokeDasharray="163" strokeDashoffset="45" />
                        <circle cx="32" cy="32" r="26" stroke="#f97316" strokeWidth="6" fill="transparent" strokeDasharray="163" strokeDashoffset="95" />
                        <circle cx="32" cy="32" r="26" stroke="#10b981" strokeWidth="6" fill="transparent" strokeDasharray="163" strokeDashoffset="135" strokeLinecap="round" />
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className="text-sm font-mono font-black text-slate-800 leading-none">2.8</span>
                        <span className="text-[6px] text-slate-400 mt-0.5">فجوة المهارات</span>
                      </div>
                    </div>

                    <div className="text-[9px] space-y-1 text-slate-700 flex-1">
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>نقص شديد في السوق</span>
                        <span className="font-bold">43% (1.2 مليون)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>نقص متوسط متذبذب</span>
                        <span className="font-bold">32% (0.9 مليون)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>مهارات متوازنة تماماً</span>
                        <span className="font-bold">25% (0.7 مليون)</span>
                      </div>
                    </div>
                  </div>

                  {/* Top 5 demanded skills with bars */}
                  <div className="space-y-2">
                    {[
                      { name: "تحليل البيانات واستخراج النماذج", count: 85230, percent: 90, color: "bg-indigo-600" },
                      { name: "الذكاء الاصطناعي والتعلم العميق", count: 72450, percent: 80, color: "bg-indigo-600" },
                      { name: "تطوير البرمجيات المتكاملة والـ Web", count: 65120, percent: 72, color: "bg-indigo-400" },
                      { name: "إدارة المشاريع الرقمية والـ Agile", count: 48760, percent: 54, color: "bg-slate-400" },
                      { name: "التسويق الرقمي وإدارة المحتوى", count: 41890, percent: 45, color: "bg-slate-300" }
                    ].map((skill, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-[8px] font-bold text-slate-700">
                          <span>{skill.name}</span>
                          <span className="font-mono">{skill.count.toLocaleString()} طلب</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${skill.color}`} style={{ width: `${skill.percent}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => setActiveSubTab("skills")}
                    className="w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-150 rounded-xl text-[9px] font-black text-indigo-700 transition"
                  >
                    عرض تقرير فجوة المهارات والربط والتحاليل
                  </button>
                </div>

                {/* Block 3: Strategic alerts & Quick simulator */}
                <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-black text-slate-800">الإنذارات الاستراتيجية المفتوحة</h4>
                        <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px] font-black">4</span>
                      </div>
                      <p className="text-[9px] text-slate-400 mt-0.5">توقعات العجز والفجوات في قوى قطاع الأعمال المعزز بالذكاء الاصطناعي.</p>
                    </div>

                    {/* Alerts feed */}
                    <div className="space-y-2 text-[9.5px]">
                      <div className="p-2 bg-red-50/50 border border-red-100 rounded-xl flex items-start justify-between gap-2">
                        <div>
                          <p className="font-black text-slate-800">نقص حاد متوقع في كادر مهندسي الـ AI</p>
                          <span className="text-[8px] text-slate-400 mt-0.5 block">المشكلة تبدأ من الربع الرابع 2024</span>
                        </div>
                        <span className="bg-red-150 text-red-800 font-bold px-2 py-0.5 rounded text-[8px] shrink-0">حرج</span>
                      </div>

                      <div className="p-2 bg-orange-50/50 border border-orange-100 rounded-xl flex items-start justify-between gap-2">
                        <div>
                          <p className="font-black text-slate-800">ارتفاع معدل البطالة لخريجي العلوم الإنسانية</p>
                          <span className="text-[8px] text-slate-400 mt-0.5 block">مؤشر سلبي مستمر منذ 3 أرباع متتالية</span>
                        </div>
                        <span className="bg-orange-100 text-orange-850 font-bold px-2 py-0.5 rounded text-[8px] shrink-0">مرتفع</span>
                      </div>

                      <div className="p-2 bg-amber-50/50 border border-amber-100 rounded-xl flex items-start justify-between gap-2">
                        <div>
                          <p className="font-black text-slate-800">تباطؤ طفيف في قطاع الصناعة التحويلية</p>
                          <span className="text-[8px] text-slate-400 mt-0.5 block">نمو سنوي مقدر بأقل من 2%</span>
                        </div>
                        <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded text-[8px] shrink-0">متوسط</span>
                      </div>

                      <div className="p-2 bg-emerald-50/50 border border-emerald-100 rounded-xl flex items-start justify-between gap-2">
                        <div>
                          <p className="font-black text-emerald-900">تحسن إيجابي في تشغيل الشباب في ولايات الجنوب</p>
                          <span className="text-[8px] text-emerald-600 mt-0.5 block">بنسق متفائل (+8% عن الربع المنصرم)</span>
                        </div>
                        <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[8px] shrink-0">منخفض</span>
                      </div>
                    </div>
                  </div>

                  {/* Mini simulator quick widget on dashboard */}
                  <div className="mt-4 border-t border-slate-100 pt-4 space-y-2">
                    <span className="text-[9px] text-slate-400 font-bold block">مساعد اختبار القرار المصغر المباشر:</span>
                    <div className="grid grid-cols-2 gap-2 text-[9px]">
                      <div>
                        <select 
                          value={quickScenario} 
                          onChange={handleQuickScenarioChange}
                          className="w-full px-2 py-1.5 bg-slate-50 border border-slate-205 rounded-lg focus:outline-none"
                        >
                          <option value="ai_centers">تأسيس 10 مراكز للذكاء الاصطناعي</option>
                          <option value="tech_accelerators">حاضنات دعم القرار الجامعي</option>
                          <option value="southern_grants">حوافز مالية لتشغيل الجنوب</option>
                        </select>
                      </div>
                      <div>
                        <select 
                          value={quickDuration} 
                          onChange={handleQuickDurationChange}
                          className="w-full px-2 py-1.5 bg-slate-50 border border-slate-205 rounded-lg focus:outline-none"
                        >
                          <option value="3">على مدى 3 سنوات</option>
                          <option value="5">على مدى 5 سنوات</option>
                        </select>
                      </div>
                    </div>

                    <div className="bg-sky-50 p-2.5 rounded-xl border border-sky-100 flex items-center justify-between text-[8px] text-sky-950">
                      <div>
                        <span className="block font-bold">فرص العمل المتوقعة: <span className="text-xs font-black text-indigo-700 font-mono">+45,000</span></span>
                        <span className="block text-slate-500">حركة التنمية الإضافية: <span className="font-bold text-emerald-600">+2.6%</span></span>
                      </div>
                      <div className="text-left font-bold text-sky-800">
                        عائد اقتصادي: <br />
                        <span className="text-xs font-black font-mono">850 مليون دج</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          alert(`تم معالجة التوجيه! سيتم نقلك لمحاكي السياسات لتنفيذ سيناريو: ${quickScenario === "ai_centers" ? "تأسيس 10 مراكز للذكاء الاصطناعي" : "تفعيل المبادرة تزامناً"}.`);
                          setActiveSubTab("policy");
                        }} 
                        className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[9px] font-black transition-all shadow-md shadow-indigo-600/10"
                      >
                        تشغيل معايير المحاكاة التفصيلية
                      </button>
                    </div>
                  </div>

                </div>

              </div>

              {/* Deep timeline Forecast + Future sectors */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* Panel 1: Timeline chart for Labor Market converged with supply/demand */}
                <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm xl:col-span-2 space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                    <div>
                      <h4 className="text-xs font-black text-slate-800">التنبؤ بسوق العمل ومعدلات الفجوة العامة حتى 2029</h4>
                      <p className="text-[9px] text-slate-400 mt-0.5">خطوات موازنة الفجوة التقنية بالربط الاستباقي للرأس الحركي العام.</p>
                    </div>
                    {/* Legenda */}
                    <div className="flex gap-3 text-[8px] text-slate-500 font-bold">
                      <div className="flex items-center gap-1">
                        <span className="w-2.5 h-0.5 bg-blue-600"></span>
                        <span>الطلب المتوقع</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-2.5 h-0.5 bg-emerald-500"></span>
                        <span>العرض الكلي المتوقع</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-2.5 h-1 border-t border-dashed border-red-500"></span>
                        <span>الفجوة السنوية</span>
                      </div>
                    </div>
                  </div>

                  {/* Responsive line chart in SVG */}
                  <div className="h-44 bg-slate-50 rounded-2xl relative p-4 border border-slate-100 flex items-center justify-center">
                    <svg viewBox="0 0 500 150" className="w-full h-full">
                      {/* Grid lines */}
                      <line x1="40" y1="20" x2="480" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="40" y1="50" x2="480" y2="50" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="40" y1="85" x2="480" y2="85" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="40" y1="120" x2="480" y2="120" stroke="#f1f5f9" strokeWidth="1" />

                      {/* X and Y axis labels */}
                      <text x="35" y="125" className="text-[7.5px] fill-slate-400 font-mono" textAnchor="end">0.5M</text>
                      <text x="35" y="90" className="text-[7.5px] fill-slate-400 font-mono" textAnchor="end">1.0M</text>
                      <text x="35" y="55" className="text-[7.5px] fill-slate-400 font-mono" textAnchor="end">1.5M</text>
                      <text x="35" y="25" className="text-[7.5px] fill-slate-400 font-mono" textAnchor="end">2.0M</text>

                      {/* Years */}
                      <text x="45" y="142" className="text-[8px] fill-slate-400 font-mono" textAnchor="middle">2024</text>
                      <text x="130" y="142" className="text-[8px] fill-slate-400 font-mono" textAnchor="middle">2025</text>
                      <text x="215" y="142" className="text-[8px] fill-slate-400 font-mono" textAnchor="middle">2026</text>
                      <text x="300" y="142" className="text-[8px] fill-slate-400 font-mono" textAnchor="middle">2027</text>
                      <text x="385" y="142" className="text-[8px] fill-slate-400 font-mono" textAnchor="middle">2028</text>
                      <text x="470" y="142" className="text-[8px] fill-slate-400 font-mono" textAnchor="middle">2029</text>

                      {/* Demand Line Plot (Blue) */}
                      <path 
                        d="M 45 110 L 130 95 L 215 80 L 300 70 L 385 58 L 470 50" 
                        fill="none" 
                        stroke="#2563eb" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      <circle cx="45" cy="110" r="3.5" fill="#2563eb" />
                      <circle cx="130" cy="95" r="3.5" fill="#2563eb" />
                      <circle cx="215" cy="80" r="3.5" fill="#2563eb" />
                      <circle cx="300" cy="70" r="3.5" fill="#2563eb" />
                      <circle cx="385" cy="58" r="3.5" fill="#2563eb" />
                      <circle cx="470" cy="50" r="3.5" fill="#2563eb" />

                      {/* Supply Line Plot (Green) */}
                      <path 
                        d="M 45 125 L 130 115 L 215 105 L 300 95 L 385 85 L 470 75" 
                        fill="none" 
                        stroke="#10b981" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      <circle cx="45" cy="125" r="3.5" fill="#10b981" />
                      <circle cx="130" cy="115" r="3.5" fill="#10b981" />
                      <circle cx="215" cy="105" r="3.5" fill="#10b981" />
                      <circle cx="300" cy="95" r="3.5" fill="#10b981" />
                      <circle cx="385" cy="85" r="3.5" fill="#10b981" />
                      <circle cx="470" cy="75" r="3.5" fill="#10b981" />

                      {/* Gap Line Plot (Red Dashed) */}
                      <path 
                        d="M 45 135 L 130 130 L 215 120 L 300 115 L 385 108 L 470 102" 
                        fill="none" 
                        stroke="#ef4444" 
                        strokeWidth="2" 
                        strokeDasharray="4,4"
                      />
                    </svg>

                    {/* Floating year 2029 target breakdown */}
                    <div className="absolute right-3 top-3 bg-white border border-slate-150 p-2 rounded-xl text-[8px] space-y-1 font-sans shadow-xs">
                      <span className="font-black text-slate-800 block border-b border-slate-100 pb-0.5">مؤشرات آفاق 2029</span>
                      <div className="flex gap-4 font-mono justify-between text-slate-650">
                        <span>الطلب الكلي: <b>1.80 مليون</b></span>
                        <span className="text-emerald-600">العرض: <b>1.35 مليون</b></span>
                        <span className="text-red-500">الفجوة: <b>450 ألف</b></span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[10px]">
                    <p className="text-slate-450 font-sans">تشير حسابات الفجوة التقارب بين مخرجات التكوين المهني الوطني وحاجات السوق النشط.</p>
                    <button 
                      onClick={() => setActiveSubTab("forecast")}
                      className="text-xs font-black text-indigo-700 hover:underline flex items-center gap-0.5"
                    >
                      عرض التقرير الزمني المفصل <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Panel 2: Table of prospective sectors 2030 */}
                <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-black text-slate-800">التخصصات والقطاعات حتى 2030</h4>
                    </div>

                    {/* Sub tabs in widget */}
                    <div className="flex bg-slate-50 border border-slate-205 rounded-xl p-0.5 mt-2 text-[8px] font-bold">
                      <button 
                        onClick={() => setSectorTab("sectors")} 
                        className={`flex-1 py-1.5 rounded-lg ${sectorTab === "sectors" ? "bg-white text-indigo-700 shadow-xs" : "text-slate-500"}`}
                      >
                        أعلى القطاعات نمواً
                      </button>
                      <button 
                        onClick={() => setSectorTab("specialties")} 
                        className={`flex-1 py-1.5 rounded-lg ${sectorTab === "specialties" ? "bg-white text-indigo-700 shadow-xs" : "text-slate-500"}`}
                      >
                        أعلى التخصصات طلباً
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2.5 my-2">
                    {sectorTab === "sectors" ? (
                      [
                        { name: "الذكاء الاصطناعي والتقنيات الرقمية", jobs: "120,000", growth: "15.2%" },
                        { name: "الطاقات المتجددة والنظيفة", jobs: "85,000", growth: "12.8%" },
                        { name: "الصناعات التحويلية والطبية المتقدمة", jobs: "75,000", growth: "9.7%" },
                        { name: "القطاع اللوجستي وخدمات البنية التحتية", jobs: "65,000", growth: "8.3%" },
                        { name: "الصحة الرقمية وتقنيات الحوسبة الحيوية", jobs: "55,000", growth: "7.6%" }
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center border-b border-slate-50 pb-1.5 last:border-0 last:pb-0 text-[9.5px]">
                          <span className="font-bold text-slate-700">{i+1}. {item.name}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-slate-400 font-mono">{item.jobs} وظيفة</span>
                            <span className="text-emerald-600 font-black font-mono">{item.growth}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      [
                        { name: "مهندس تعلم آلي وذكاء اصطناعي", jobs: "42,000", growth: "22.5%" },
                        { name: "محلل بيانات وحوسبة سحابية", jobs: "31,500", growth: "18.3%" },
                        { name: "أخصائي حماية الأمن السيبراني", jobs: "26,000", growth: "14.1%" },
                        { name: "مصمم تجربة مستخدم وتأصيل رقمي", jobs: "18,200", growth: "11.5%" },
                        { name: "مطور تطبيقات البلوكشين والتحقق", jobs: "15,400", growth: "9.8%" }
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center border-b border-slate-50 pb-1.5 last:border-0 last:pb-0 text-[9.5px]">
                          <span className="font-bold text-slate-700">{i+1}. {item.name}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-slate-400 font-mono">{item.jobs} وظيفة</span>
                            <span className="text-emerald-600 font-black font-mono">{item.growth}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <button 
                    onClick={() => {
                      alert("جاري تحويلك للملف الكامل لتوقعات 2030 من الذكاء الاصطناعي.");
                      setActiveSubTab("forecast");
                    }}
                    className="w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-150 rounded-xl text-[9px] font-black text-slate-700 transition text-center"
                  >
                    عرض جميع القطاعات والتخصصات الصاعدة
                  </button>
                </div>

              </div>

              {/* Recommendations component */}
              <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4">
                <div>
                  <h4 className="text-xs font-black text-slate-800">التوصيات الاستراتيجية الذكية المطورة (Gemini Engine)</h4>
                  <p className="text-[9px] text-slate-400 mt-0.5">تعليمات وسياسات فورية مبنية على البيانات لتقليل نسب العجز التكويني والوطني.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-right">
                  {/* Rec 1 */}
                  <div className="bg-gradient-to-br from-indigo-50/50 to-indigo-50/10 border border-indigo-100 p-4 rounded-2xl flex gap-3 items-start">
                    <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0">1</span>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-850">زيادة معايير ومقاعد التكوين الرقمي</p>
                      <p className="text-[9px] text-slate-500 leading-relaxed">توسيع فوري للتخصصات في هندسة الذكاء والبيانات بالمركز الجامعي للتغلب على فجوة العرض المهني لعام 2026.</p>
                    </div>
                  </div>
                  {/* Rec 2 */}
                  <div className="bg-gradient-to-br from-indigo-50/50 to-indigo-50/10 border border-indigo-100 p-4 rounded-2xl flex gap-3 items-start">
                    <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0">2</span>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-850">توجيه الدعم الفوري لولايات الجنوب</p>
                      <p className="text-[9px] text-slate-500 leading-relaxed">تحفيز مادي وحاضنات أعمال تعتمد على القرار الوزاري الموجه لمعالجة البطالة الجغرافية الصامتة ورفع جودة الإنتاج.</p>
                    </div>
                  </div>
                  {/* Rec 3 */}
                  <div className="bg-gradient-to-br from-indigo-50/50 to-indigo-50/10 border border-indigo-100 p-4 rounded-2xl flex gap-3 items-start">
                    <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0">3</span>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-850">شراكات استباقية مع قطاع الأعمال</p>
                      <p className="text-[9px] text-slate-500 leading-relaxed">ربط فوري ومتحقق لتبني الشارات المهنية وبلوكهين التحقق لتوفير زمن المواءمة من 4 أشهر إلى 48 ساعة فقط.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vision Banner Footer of dashboard */}
              <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white p-6 rounded-3xl relative overflow-hidden text-right border border-indigo-850">
                <div className="absolute top-0 right-0 w-80 h-full bg-radial-gradient(circle,rgba(99,102,241,0.2),transparent_60%) pointer-events-none"></div>
                
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">⭐</span>
                      <h4 className="text-xs font-black text-indigo-300 uppercase tracking-widest font-mono">رؤية الجزائر الرامية لعام 2030</h4>
                    </div>
                    <p className="text-base font-black text-white">سوق عمل تنافسي بنسبة رقمنة تامة وكفاءات وطنية مستدامة</p>
                    <p className="text-[10px] text-slate-300">تحليل استباقي متطور لسياسات الأمة وتحصين التوازنات المالية العامة والخاصة بالمنظومة.</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center md:min-w-[480px]">
                    <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl">
                      <span className="text-[8px] text-slate-400 block font-bold leading-normal">تحقيق الأهداف</span>
                      <span className="text-sm font-mono font-black text-indigo-300">78%</span>
                      <span className="text-[7.5px] text-emerald-400 block font-bold mt-1">+6% الربع الحالي</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl">
                      <span className="text-[8px] text-slate-400 block font-bold leading-normal">تحسن الترتيب العالمي</span>
                      <span className="text-sm font-mono font-black text-indigo-300">12+ مركز</span>
                      <span className="text-[7.5px] text-slate-450 block font-bold mt-1">مؤشر رأس المال البشري</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl">
                      <span className="text-[8px] text-slate-400 block font-bold leading-normal">العائد الاستثماري البشري</span>
                      <span className="text-sm font-mono font-black text-indigo-300">2.4 دج</span>
                      <span className="text-[7.5px] text-slate-450 block font-bold mt-1">لكل دينار في التكوين</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl">
                      <span className="text-[8px] text-slate-400 block font-bold leading-normal">الأثر الاجتماعي</span>
                      <span className="text-sm font-mono font-black text-indigo-300">-25%</span>
                      <span className="text-[7.5px] text-slate-450 block font-bold mt-1">تقليص الفقر بحلول 2029</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ======================= SUBTAB 2: خريطة الجزائر الذكية (Interactive Map Workspace) ======================= */}
          {activeSubTab === "map" && (
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6 text-right animate-fade-in">
              <div className="border-b border-slate-50 pb-4">
                <h3 className="text-base font-black text-slate-800">خريطة الجزائر للمؤشرات وسوق العمل الجيوبرمجي</h3>
                <p className="text-[10px] text-slate-400 mt-1">تحليل جيو-استراتيجي لمعدل الفراغ التكويني والعملي وفق التوزيع الوطني الدقيق للولايات الـ 58.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                
                {/* Right col: Table list of provinces */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <span className="text-[9px] text-slate-400 font-bold block mb-2 font-sans tracking-wider">اختيار الإقليم أو الولاية للتحليل</span>
                    <div className="space-y-1.5 max-h-[320px] overflow-y-auto">
                      {Object.keys(regionsMapData).map((regionName) => (
                        <button
                          key={regionName}
                          onClick={() => selectAlgerianRegion(regionName)}
                          className={`w-full text-right p-3 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                            selectedRegion === regionName 
                              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10" 
                              : "bg-white border border-slate-150 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <span>{regionName}</span>
                          <span className={`${selectedRegion === regionName ? "text-indigo-200" : "text-indigo-600"}`}>
                            {regionsMapData[regionName].unemployment} بطالة
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Regional quick summary card */}
                  <div className="border border-indigo-100 bg-indigo-50/30 p-4 rounded-2xl space-y-2.5">
                    <h4 className="text-xs font-black text-indigo-900">التقرير الجيوبرمجي للأمن المهني:</h4>
                    <div className="grid grid-cols-2 gap-2 text-[9.5px]">
                      <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                        <span className="text-[8px] text-slate-400 block leading-relaxed">القوى العاملة</span>
                        <span className="font-bold text-slate-800">{mapDetail.workforce}</span>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                        <span className="text-[8px] text-slate-400 block leading-relaxed">القطاع المهيمن</span>
                        <span className="font-bold text-slate-800">{mapDetail.dominantSector}</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-normal">
                      تواجه ولايات <b>{selectedRegion}</b> فجوة مهارية مقدرة بـ <b>{mapDetail.gap}</b>. يوصي النظام بدعم حاضنات مخرجات القرار الوزاري المشترك وخاصة في تخصصات التوليد البرمجي واللوجستيات لرفع مستويات المطابقة الفورية.
                    </p>
                  </div>
                </div>

                {/* Left col: Full interactive dynamic SVG Map */}
                <div className="lg:col-span-3 bg-slate-50 border border-slate-100 rounded-3xl p-6 flex flex-col justify-between min-h-[400px]">
                  <div className="text-center">
                    <span className="text-[10px] bg-slate-200 text-slate-600 font-bold px-2.5 py-1 rounded-full inline-block">
                      الخريطة التفاعلية والتحكم بالأقاليم
                    </span>
                    <h4 className="text-xs font-black text-indigo-950 mt-2">انقر على الخريطة لتحديث البيانات فورياً:</h4>
                  </div>

                  <div className="my-6 flex items-center justify-center">
                    <svg viewBox="0 0 320 320" className="w-[300px] h-[300px] transform hover:scale-[1.01] transition-transform">
                      {/* Deep Desert South Oasis */}
                      <path 
                        d="M 50 210 Q 140 180 230 200 L 260 290 L 100 310 Z" 
                        fill={selectedRegion === "الجنوب والواحات" ? "#312e81" : "#a5b4fc"} 
                        className="cursor-pointer transition-all stroke-white stroke-2 hover:fill-indigo-800"
                        onClick={() => selectAlgerianRegion("الجنوب والواحات")}
                      />
                      {/* Highlands */}
                      <path 
                        d="M 60 140 Q 140 135 220 150 Q 200 190 50 210 Z" 
                        fill={selectedRegion === "الهضاب العليا" ? "#312e81" : "#c7d2fe"} 
                        className="cursor-pointer transition-all stroke-white stroke-2 hover:fill-indigo-800"
                        onClick={() => selectAlgerianRegion("الهضاب العليا")}
                      />
                      {/* Eastern Provinces */}
                      <path 
                        d="M 180 60 Q 230 70 240 135 L 220 150 Q 140 135 180 60 Z" 
                        fill={selectedRegion === "الولايات الشرقية والساحل" ? "#312e81" : "#e0e7ff"} 
                        className="cursor-pointer transition-all stroke-white stroke-2 hover:fill-indigo-800"
                        onClick={() => selectAlgerianRegion("الولايات الشرقية والساحل")}
                      />
                      {/* Northwestern */}
                      <path 
                        d="M 60 140 L 100 80 Q 50 60 40 110 Z" 
                        fill={selectedRegion === "الولايات الشمالية الغربية" ? "#4f46e5" : "#6366f1"} 
                        className="cursor-pointer transition-all stroke-white stroke-2 hover:fill-indigo-800"
                        onClick={() => selectAlgerianRegion("الولايات الشمالية الغربية")}
                      />
                      {/* Capital of Algeria and Central Area */}
                      <path 
                        d="M 100 80 Q 140 70 180 60 L 220 150 Q 140 135 60 140 Z" 
                        fill={selectedRegion === "الجزائر العاصمة والوسط" ? "#312e81" : "#818cf8"} 
                        className="cursor-pointer transition-all stroke-white stroke-2 hover:fill-indigo-910"
                        onClick={() => selectAlgerianRegion("الجزائر العاصمة والوسط")}
                      />
                    </svg>
                  </div>

                  <div className="bg-slate-900 text-white p-3.5 rounded-2xl text-[9.5px] space-y-1 text-center font-sans">
                    <span className="font-extrabold text-indigo-400 block">منطقة التموضع المحددة: {selectedRegion}</span>
                    <p className="text-slate-350 leading-relaxed">
                      تتلقى هذه المنطقة حالياً دعماً رقمياً متكاملاً من مسار لتعويض نقص المهارات في سوق العمل وتوسيع قنوات التشغيل المباشر.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ======================= SUBTAB 3: مرصد المهارات الوطني (Includes Integrated Deduplication) ======================= */}
          {activeSubTab === "skills" && (
            <div className="space-y-6 text-right animate-fade-in font-sans">
              
              <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
                <div className="border-b border-slate-50 pb-4 mb-4">
                  <h3 className="text-base font-black text-slate-800">مرصد المهارات والحلول الفائقة لكشف الازدواجية الرقمية</h3>
                  <p className="text-[10px] text-slate-400 mt-1">تحديد الفوارق بين المعطيات وقواعد التأمين للحد من هدر موارد الخزينة العمومية.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-50/50 p-4 rounded-2xl text-center border border-slate-100">
                    <span className="text-[9px] text-slate-450 font-bold block mb-1">الربط والتشغيل البيني</span>
                    <span className="text-xs font-bold text-slate-700">وكالة ANEM + صندوق CNAS</span>
                  </div>
                  <div className="bg-slate-50/50 p-4 rounded-2xl text-center border border-slate-100">
                    <span className="text-[9px] text-slate-450 font-bold block mb-1">صلاحية المعالجة</span>
                    <span className="text-xs font-bold text-indigo-600">بث فوري مؤمن بالكامل</span>
                  </div>
                  <div className="bg-slate-50/50 p-4 rounded-2xl text-center border border-slate-100">
                    <span className="text-[9px] text-slate-450 font-bold block mb-1">التوجيه المالي السيادي</span>
                    <span className="text-xs font-bold text-emerald-600">هدف الكفاءة والاستقرار لـ 2030</span>
                  </div>
                </div>
              </div>

              {/* INTEGRATING ORIGINAL DEDUPLICATOR ENGINE COMPANION */}
              <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs">
                <div className="flex items-center gap-3 mb-5 border-b border-slate-50 pb-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-800">طلب التشغيل البيني وكشف الازدواجية (ANEM & CNAS)</h3>
                    <p className="text-[10px] text-slate-400 font-sans">فحص فوري لقاعدة الدعم الوطني وملفات المؤمنين لوقف الهدر السنوي.</p>
                  </div>
                </div>

                {!dedupResult && !isScanning ? (
                  <div className="bg-slate-50/70 p-8 rounded-2xl text-center border border-slate-150 space-y-4">
                    <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
                    <p className="text-xs text-slate-650 max-w-md mx-auto leading-relaxed">
                      المرصد مبرمج للمقارنة اللحظية بين سجلات كشوف المؤمنين والمنضمين لصندوق الضمان الاجتماعي (CNAS) مع قوائم الباحثين وطالبي الدعم بالمنظومة للوكالة الوطنية للتشغيل (ANEM). انقر للمطابقة والتوثيق.
                    </p>
                    <button
                      onClick={runDeduplication}
                      className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black transition-all inline-flex items-center gap-2 shadow-lg shadow-indigo-600/15"
                    >
                      <Play className="w-4 h-4 rtl:rotate-180" /> تشغيل تدقيق ومطابقة الأمن المالي
                    </button>
                  </div>
                ) : isScanning ? (
                  <div className="bg-slate-50 border border-slate-100 rounded-3xl p-10 text-center space-y-4">
                    <RefreshCw className="w-10 h-10 text-indigo-600 animate-spin mx-auto" />
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-700">يجري فحص ومقارنة وحصر 542,391 سجل عمومي بالدولة...</p>
                      <p className="text-[10px] text-slate-450">التقدم الفني: {scanProgress}%</p>
                    </div>
                    <div className="w-48 bg-slate-200 h-1.5 rounded-full mx-auto overflow-hidden">
                      <div className="bg-indigo-600 h-full rounded-full transition-all duration-350" style={{ width: `${scanProgress}%` }}></div>
                    </div>
                  </div>
                ) : (
                  dedupResult && (
                    <div className="space-y-6 animate-fade-in text-right font-sans">
                      {/* Highlight Metrics */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-center">
                          <span className="text-[10px] text-slate-400 font-bold block mb-1">إجمالي المدققين</span>
                          <span className="text-sm font-mono font-black text-slate-800">542,391 ملف وطني</span>
                        </div>
                        <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl text-center">
                          <span className="text-[10px] text-orange-600 font-bold block mb-1">الازدواجية المكتشفة</span>
                          <span className="text-sm font-mono font-black text-orange-600">{dedupResult.duplicatesFound} حالة مزدوجة</span>
                        </div>
                        <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-center">
                          <span className="text-[10px] text-emerald-600 font-bold block mb-1">الوفر المالي السنوي المقدر</span>
                          <span className="text-sm font-mono font-black text-emerald-600">{dedupResult.savingsAmount}</span>
                        </div>
                      </div>

                      {/* Explaining Insights by AI */}
                      <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-2xl">
                        <h4 className="text-xs font-black text-indigo-900 mb-2">تقرير الأمن المالي السيادي المطور بـ (Gemini Engine):</h4>
                        <p className="text-[11px] text-slate-700 font-sans leading-relaxed whitespace-pre-line">
                          {dedupResult.aiAnalysisExplanation}
                        </p>
                      </div>

                      {/* Duplicate List */}
                      <div className="overflow-x-auto border border-slate-100 rounded-2xl">
                        <table className="w-full text-right text-xs">
                          <thead>
                            <tr className="bg-slate-50 border-b border-slate-100 text-[9px] text-slate-400">
                              <th className="py-3 px-4 font-black">رقم التعريف الوطني</th>
                              <th className="py-3 px-4 font-black">الاسم واللقب</th>
                              <th className="py-3 px-4 text-center font-black">حالة التماثل والتحقق</th>
                              <th className="py-3 px-4 font-mono font-black">سجل ANEM</th>
                              <th className="py-3 px-4 font-mono font-black">سجل CNAS</th>
                              <th className="py-3 px-4 text-left font-black">مجموع التعويض المالي</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dedupResult.detailedMatches.map((record, i) => (
                              <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/40">
                                <td className="py-3 px-4 font-mono text-[10px] text-slate-400">{record.id}</td>
                                <td className="py-3 px-4 font-bold text-slate-700">{record.name}</td>
                                <td className="py-3 px-4 text-center">
                                  <span className={`px-2 py-0.5 rounded text-[8.5px] font-bold ${
                                    record.statusValue.includes("مزدوج") ? "bg-orange-100 text-orange-650" : "bg-emerald-100 text-emerald-600"
                                  }`}>
                                    {record.statusValue}
                                  </span>
                                </td>
                                <td className="py-3 px-4 font-mono text-slate-500">{record.anId}</td>
                                <td className="py-3 px-4 font-mono text-slate-500">{record.cnId}</td>
                                <td className="py-3 px-4 font-bold text-slate-800 text-left font-mono">{record.savings}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={runDeduplication}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-650 rounded-xl text-[10px] font-black transition-all"
                        >
                          إعادة تشغيل فحص ومواءمة السجلات المفتوحة
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>

            </div>
          )}

          {/* ======================= SUBTAB 4: محاكاة السياسات (Policy Simulator Workspace) ======================= */}
          {activeSubTab === "policy" && (
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6 text-right animate-fade-in font-sans">
              <div className="border-b border-slate-50 pb-4">
                <h3 className="text-base font-black text-slate-800">محاكي سياسات سوق العمل الاستباقية للرئيسية</h3>
                <p className="text-[10px] text-slate-400 mt-1">اختبار جدوى المبادرات قبل تفعيلها رسمياً وتجنب الفراغ التكويني عبر خوادم القرار لـ مسار TRACK.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-150">
                  <span className="text-[9.5px] text-indigo-700 font-extrabold block">تكوين وتصميم المبادرة للتنفيذ:</span>
                  
                  {/* Input 1 */}
                  <div className="space-y-1">
                    <label className="text-[9.5px] font-extrabold text-slate-500 block">نوع المبادرة الاستثمارية والتعليمية المقترحة</label>
                    <select
                      value={centerType}
                      onChange={(e) => setCenterType(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-indigo-600"
                    >
                      <option value="مراكز الذكاء الاصطناعي وهندسة البرمجيات">مراكز الذكاء الاصطناعي والتعلم الذاتي التوليدي</option>
                      <option value="أقطاب الحوسبة ومختبرات معالجة البيانات الفائقة">أقطاب الحوسبة ومختبرات معالجة البيانات الفائقة</option>
                      <option value="أكاديميات جودة وتوجيه المهارات الشاملة">أكاديميات جودة وتوجيه المهارات المفتوحة</option>
                      <option value="مسرعات وحاضنات تفعيل القرار الوزاري">مسرعات وحاضنات تفعيل القرار الوزاري بالجامعات</option>
                    </select>
                  </div>

                  {/* Input 2 */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[9.5px] font-extrabold text-slate-500 mb-1">
                      <span>العدد الكلي المقترح للمراكز المستهدفة</span>
                      <span className="font-mono text-indigo-600">{count} مراكز جهوية</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      value={count}
                      onChange={(e) => setCount(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>

                  {/* Input 3 */}
                  <div className="space-y-1">
                    <label className="text-[9.5px] font-extrabold text-slate-500 block">الإقليم أو الولاية الجزائرية الموجهة للدعم</label>
                    <select
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-indigo-600"
                    >
                      <option value="جهة الغرب (تلمسان ومغنية ومستغانم)">جهة الغرب (تلمسان ومغنية ومستغانم)</option>
                      <option value="جهة الوسط (الجزائر العاصمة والبليدة)">جهة الوسط (الجزائر العاصمة والبليدة)</option>
                      <option value="جهة الشرق (قسنطينة وعنابة وسطيف)">جهة الشرق (قسنطينة وعنابة وسطيف)</option>
                      <option value="جهة الجنوب (ورقلة وحاسي مسعود وتمنراست)">جهة الجنوب (ورقلة والواحات وحاسي مسعود)</option>
                    </select>
                  </div>

                  <button
                    onClick={runSimulation}
                    disabled={isSimulating}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 text-white disabled:text-slate-400 rounded-xl text-xs font-black transition-all shadow-md shadow-indigo-600/10"
                  >
                    {isSimulating ? "جار تنظيم وحساب الأثر الاستباقي عبر Gemini..." : "تشغيل سيناريو المحاكاة بمسار TRACK 🚀"}
                  </button>
                </div>

                {/* Simulation Output Dashboard */}
                <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-5 min-h-[300px] flex flex-col justify-between">
                  {isSimulating ? (
                    <div className="space-y-3 flex-1 flex flex-col items-center justify-center p-8">
                      <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin" />
                      <p className="text-[10px] text-slate-500 font-bold font-sans">يجري فحص واستقصاء معطيات التقرير لولاية {region} باستخدام خادم الذكاء الاصطناعي...</p>
                    </div>
                  ) : simulationReport ? (
                    <div className="space-y-4 animate-fade-in font-sans">
                      <div className="border-b border-slate-150 pb-2 flex justify-between items-center text-[9.5px] font-bold text-indigo-900">
                        <span>نتائج الدراسة والتحصيل الاستباقي</span>
                        <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[8px] font-black">محاكى بالكامل</span>
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                        <div className="bg-white p-2 rounded-lg border border-slate-150 text-center">
                          <span className="text-[7.5px] text-slate-400 font-bold block leading-normal">فرص العمل المستهدفة</span>
                          <span className="text-xs font-mono font-black text-slate-800">{simulationReport.jobsCreated.toLocaleString()} وظيفة</span>
                        </div>
                        <div className="bg-white p-2 rounded-lg border border-slate-150 text-center">
                          <span className="text-[7.5px] text-slate-400 font-bold block leading-normal">خفض البطالة المحلية</span>
                          <span className="text-xs font-mono font-black text-emerald-600">-{simulationReport.unemploymentReduction}%</span>
                        </div>
                        <div className="bg-white p-2 rounded-lg border border-slate-150 text-center">
                          <span className="text-[7.5px] text-slate-400 font-bold block leading-normal">مردود السوق المقدر</span>
                          <span className="text-xs font-mono font-black text-slate-800">{simulationReport.economicImpact}</span>
                        </div>
                        <div className="bg-white p-2 rounded-lg border border-slate-150 text-center">
                          <span className="text-[7.5px] text-slate-400 font-bold block leading-normal">نسبة نمو القطاع</span>
                          <span className="text-xs font-mono font-black text-indigo-600">{simulationReport.growthRate}</span>
                        </div>
                      </div>

                      {/* AI text */}
                      <div className="bg-white p-3.5 rounded-2xl border border-slate-150">
                        <p className="text-[10px] text-indigo-950 font-black mb-1.5 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span> التقرير التفسيري للقرار (Gemini Engine):
                        </p>
                        <p className="text-[10.5px] text-slate-650 leading-relaxed font-sans">{simulationReport.aiSimulationReport}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400 space-y-2">
                      <HelpCircle className="w-10 h-10 text-slate-350" />
                      <p className="text-xs font-sans">حدد المعطيات والمبادرات في اللوحة الجانبية ثم اضغط 'تشغيل سيناريو المحاكاة' لحساب الأثر الاقتصادي العام.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ======================= SUBTAB 5: التنبؤ بسوق العمل (Labor Market Forecasting) ======================= */}
          {activeSubTab === "forecast" && (
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6 text-right animate-fade-in font-sans">
              <div className="border-b border-slate-50 pb-4">
                <h3 className="text-base font-black text-slate-800">دراسات ونماذج التنبؤ وتوقع أنماط العرض المادي</h3>
                <p className="text-[10px] text-slate-400 mt-1">النمذجة الرياضية والتقييم الدوري لنقص المهارات المتوقعة بالجزائر حتى عام 2030.</p>
              </div>

              {/* Forecast graph with deeper details */}
              <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <h4 className="font-black text-indigo-950">مخطط توقعات تطور فجوة التوطين لعام 2030:</h4>
                  <span className="text-[9px] text-slate-450 bg-white border border-slate-150 px-2 py-0.5 rounded">معدل الفجوة المقدر: فجوة مهارية تنازلية</span>
                </div>

                <div className="h-48 bg-white border border-slate-150 rounded-2xl p-4 flex items-center justify-center relative">
                  <svg viewBox="0 0 500 150" className="w-full h-full">
                    {/* Paths to draw Supply and Demand Converging by 2030 */}
                    <path 
                      d="M 40 120 L 120 100 L 200 80 L 280 65 L 360 52 L 440 45" 
                      fill="none" 
                      stroke="#4f46e5" 
                      strokeWidth="3.5" 
                      strokeLinecap="round"
                    />
                    <path 
                      d="M 40 135 L 120 125 L 200 115 L 280 102 L 360 88 L 440 78" 
                      fill="none" 
                      stroke="#10b981" 
                      strokeWidth="3.5" 
                      strokeLinecap="round"
                    />
                    {/* Dashed background lines */}
                    <line x1="40" y1="30" x2="440" y2="30" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="40" y1="75" x2="440" y2="75" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="40" y1="110" x2="440" y2="110" stroke="#f1f5f9" strokeWidth="1" />

                    {/* Nodes custom */}
                    <circle cx="440" cy="45" r="4.5" fill="#4f46e5" />
                    <circle cx="440" cy="78" r="4.5" fill="#10b981" />
                  </svg>
                  <span className="absolute bottom-2 right-4 text-[8px] text-slate-400 font-mono">نقطة الالتقاء والاعتدال لـ 2030 بالتقارب %92</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Block 1 */}
                <div className="border border-slate-100 rounded-3xl p-5 space-y-3 bg-white shadow-xs">
                  <span className="text-[10px] bg-red-105 text-red-750 font-bold px-2.5 py-0.5 rounded-full inline-block">حرج</span>
                  <h4 className="text-xs font-black text-slate-800">التراكم السلبي بالفجوة لـ 2026:</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-sans">
                    إذا لم يتم توسيع مخرجات تفعيل الشارات المهنية والتبني الفوري بجامعات الجزائر، ستتسع الفجوة المهارية في قطاع التقنيات التوليدية والبرمجية بمعدل <b>28%</b> إضافي، مما يخلق عجزاً بنحو <b>85,000 طالب عمل</b> غير مؤهلين لتبوء مناصب العمل المفتوحة حالياً.
                  </p>
                </div>
                {/* Block 2 */}
                <div className="border border-slate-100 rounded-3xl p-5 space-y-3 bg-white shadow-xs">
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full inline-block">توصية حاسمة</span>
                  <h4 className="text-xs font-black text-slate-800">السياسة التنموية العاجلة الموصى بها:</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-sans">
                    توليد وموازنة الشراكة بين المؤسسات الناشئة وقطاعات الأعمال الحيوية، مع تنظيم دورات مكثفة بدعم القرار الوزاري المبرم بالولايات لإحلال العمالة في المجالات الاقتصادية الرقمية ومراقبة جودتها.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ======================= SUBTAB 6: مخطط مغنية اللوجستي الاستراتيجي لعام 2030 ======================= */}
          {activeSubTab === "maghnia" && (
            <div className="space-y-6 text-right animate-fade-in font-sans">
              
              {/* Grand Banner */}
              <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-indigo-950 text-white p-6 rounded-3xl border border-emerald-500/20 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-full bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.2),transparent_50%)] pointer-events-none"></div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <span className="text-[9px] bg-emerald-500 text-slate-900 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-2 animate-pulse">رؤية الجزائر الاستراتيجية 2026 - 2030 🇩🇿</span>
                    <h3 className="text-lg font-black text-white leading-tight">بوابة مغنية الذكية للتبادل التجاري وتوطين كفاءات الغرب</h3>
                    <p className="text-[10px] text-emerald-100 max-w-2xl mt-1.5 leading-relaxed">
                      المنظومة القومية المتكاملة لربط خريجي جامعة أبي بكر بلقايد بتلمسان بالفرص الاقتصادية وحوكمة المنافذ الحدودية ومصانع التصدير بمغنية تكنولوجياً بنسبة أمان %100 وبدون تدخلات بيروقراطية.
                    </p>
                  </div>
                  <div className="bg-emerald-900/40 backdrop-blur-md border border-emerald-500/20 p-3 rounded-2xl text-center shrink-0">
                    <span className="text-[9px] text-emerald-400 block font-bold leading-none">مؤشر الاستقرار التجاري</span>
                    <span className="text-xl font-mono font-black text-emerald-400 mt-1 block">99.98%</span>
                    <span className="text-[8px] text-slate-300 block">حوكمة مشفرة (Sovereign Ledger)</span>
                  </div>
                </div>
              </div>

              {/* Grid 1: Regional Key Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
                <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-xs space-y-1">
                  <span className="text-[8px] font-bold text-slate-400 block">تسريع التخليص الجمركي بمغنية</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-mono font-black text-emerald-600">45 ثانية</span>
                    <span className="text-[8px] text-emerald-700 bg-emerald-50 px-1 rounded font-bold">بدل 4 أيام</span>
                  </div>
                  <p className="text-[8.5px] text-slate-400">بفضل فحص الحاويات ومطابقة البيانات بالذكاء الاصطناعي.</p>
                </div>

                <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-xs space-y-1">
                  <span className="text-[8px] font-bold text-slate-400 block">فرص عمل تكنولوجية مستحدثة</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-mono font-black text-slate-800">+14,200</span>
                    <span className="text-[8px] text-emerald-700 bg-emerald-50 px-1 rounded font-bold">مهن المستقبل</span>
                  </div>
                  <p className="text-[8.5px] text-slate-400">لوجستيون، مبرمجو سلاسل إمداد، ومحللو جودة زيتون وأغذية.</p>
                </div>

                <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-xs space-y-1">
                  <span className="text-[8px] font-bold text-slate-400 block">حجم الصادرات غير النفطية المغذاة</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-mono font-black text-slate-800">42.8 مليار دج</span>
                    <span className="text-[8px] text-indigo-700 bg-indigo-50 px-1 rounded font-bold">+189%</span>
                  </div>
                  <p className="text-[8.5px] text-slate-400">تصدير الفخار، معجون الطماطم، الخزف، والآلات الفلاحية بمغنية.</p>
                </div>

                <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-xs space-y-1">
                  <span className="text-[8px] font-bold text-slate-400 block">الترابط الجامعي - الصناعي</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-mono font-black text-emerald-600">98.4%</span>
                    <span className="text-[8px] text-emerald-700 bg-emerald-50 px-1 rounded font-bold">نشط بالكامل</span>
                  </div>
                  <p className="text-[8.5px] text-slate-400">توظيف فوري وتأطير مباشر تحت القرار الوزاري للتشغيل.</p>
                </div>
              </div>

              {/* Grid 2: Smart customs simulator & Matchmaker */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                
                {/* Right Column (Spanish-like Border Scanner Mock) */}
                <div className="md:col-span-7 bg-white border border-slate-100 rounded-3xl p-5 shadow-xs space-y-4">
                  <div className="border-b border-slate-50 pb-3 flex justify-between items-center">
                    <div>
                      <h4 className="text-xs font-black text-slate-800">1. محاكي النقل والجمارك الذكية بمغنية (AI Border Guard Scanner)</h4>
                      <p className="text-[9px] text-slate-400">تطبيق رؤية الكاميرات والـ OCR على حدود مغنية بإشراف الكفاءات الجزائرية للتحقق الرقمي الفوري.</p>
                    </div>
                    <span className="bg-indigo-50 text-indigo-700 text-[8px] px-2 py-0.5 rounded-full font-black">الميناء الجاف بمغنية</span>
                  </div>

                  {/* Cargo Selection Carousel */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { title: "شحنة زيتون وتوابل مغنية", desc: "مصنع الوفاق للأغذية", type: "غذائي" },
                      { title: "صادرات الخزف الفني تلمسان", desc: "حرفيو قلعة بني حماد / الغرب", type: "صناعي" },
                      { title: "أجهزة كهرومنزلية مجمعة", desc: "مجمع الغرب للإلكترونيات", type: "تكنولوجي" }
                    ].map((item, idx) => (
                      <button 
                        key={idx}
                        onClick={() => {
                          setMaghniaActiveCardIndex(idx);
                          setMaghniaCargoStatus("idle");
                          setMaghniaLogs([]);
                        }}
                        className={`p-2.5 rounded-2xl border text-right transition-all text-slate-755 ${
                          maghniaActiveCardIndex === idx 
                            ? "bg-indigo-50/70 border-indigo-200 shadow-xs" 
                            : "bg-slate-50 border-slate-150 hover:bg-slate-100/50"
                        }`}
                      >
                        <span className="text-[8px] bg-white border border-slate-200 text-slate-500 font-bold px-1.5 py-0.5 rounded block w-max mb-1">{item.type}</span>
                        <h4 className="text-[9.5px] font-black text-slate-800 truncate leading-tight">{item.title}</h4>
                        <p className="text-[8px] text-slate-450 truncate mt-0.5">{item.desc}</p>
                      </button>
                    ))}
                  </div>

                  {/* Inspect Camera Viewfinder */}
                  <div className="bg-slate-900 border border-slate-950 rounded-2xl p-4 text-white relative overflow-hidden h-56 flex flex-col justify-between">
                    
                    {/* Viewfinder borders */}
                    <div className="absolute inset-4 border border-emerald-400/20 pointer-events-none rounded-lg">
                      <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-emerald-500"></div>
                      <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-emerald-500"></div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-emerald-500"></div>
                      <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-emerald-500"></div>
                    </div>

                    {/* Beam scan animation only when scanning */}
                    {maghniaCargoStatus === "scanning" && (
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-emerald-400 shadow-md shadow-emerald-400/50 animate-bounce"></div>
                    )}

                    <div className="flex justify-between items-center z-10">
                      <span className="text-[7.5px] bg-emerald-500 text-slate-950 font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-emerald-900 animate-ping"></span> كاميرا الحدود الغربية نشطة
                      </span>
                      <span className="text-[8px] font-mono text-slate-400">CAM-ID: DZ-MAGH-03</span>
                    </div>

                    {/* Simulation output logs screen */}
                    <div className="my-2 flex-1 flex flex-col justify-center">
                      {maghniaCargoStatus === "idle" && (
                        <div className="text-center space-y-1">
                          <Truck className="w-8 h-8 text-slate-500 mx-auto opacity-70 animate-pulse" />
                          <p className="text-[9.5px] text-slate-300 font-bold">الحمولة المحددة: {
                            maghniaActiveCardIndex === 0 ? "زيتون وتوابل مغنية المصدرة" :
                            maghniaActiveCardIndex === 1 ? "فخار وخزف فني تلمساني معتمد" : "أجهزة تكنولوجية مكثفة"
                          }</p>
                          <p className="text-[8px] text-slate-500">تنتظر إشارة المسح والتدقيق في قاعدة TRACK السيادية.</p>
                        </div>
                      )}

                      {maghniaCargoStatus === "scanning" && (
                        <div className="space-y-1 p-2 bg-black/60 rounded-lg text-[8px] text-emerald-400 font-mono text-left" dir="ltr">
                          {maghniaLogs.map((log, l) => (
                            <div key={l} className="truncate">&gt; {log}</div>
                          ))}
                          <div className="w-1.5 h-3 bg-emerald-400 animate-ping inline-block"></div>
                        </div>
                      )}

                      {maghniaCargoStatus === "cleared" && (
                        <div className="text-center space-y-1.5 animate-fade-in">
                          <div className="w-7 h-7 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <div>
                            <h5 className="text-[10px] text-emerald-400 font-black">تم الإفراج الجمركي والمواصفات الأمنية بالكامل بنجاح!</h5>
                            <p className="text-[8.5px] text-slate-350 leading-relaxed font-sans mt-1">المهندس الفاحص الموثق: <b className="text-white">طه بن يعقوب</b> (رقم جامعي: DZ-TL-273 / خريج تلمسان)</p>
                            <span className="text-[7.5px] text-slate-400 font-mono mt-0.5 block">التوقيع الرقمي المسجل على البلوكشاين: 0xe92b...a912</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom action controls */}
                    <div className="flex justify-between items-center z-10 pt-2 border-t border-slate-800">
                      <span className="text-[7.5px] text-slate-500">السرعة المقدرة: 4.8s</span>
                      <button 
                        onClick={() => {
                          setMaghniaCargoStatus("scanning");
                          setMaghniaLogs([]);
                          const texts = [
                            "CONNECTING TO GHAZAOUET DRY PORT CENTRAL DATABASE...",
                            "LOADING VISUAL MULTI-ANGLE SENSOR PIXELS...",
                            "EXTRACTING EXPORT DECLARATION CERTIFICATE #DZ-9921",
                            "MATCHING TRUCK WEIGHT: 14.5 TONS... MATCHED",
                            "VALIDATING SANITARY & ORIGIN SIGNATURE... SUCCESS",
                            "DEPLOYING DECISION LEDGER VERIFIED BY TLEMCEN GRADUATES...",
                            "FINAL STATUS: APPROVED - ZERO DISCREPANCIES DETECTED"
                          ];
                          let i = 0;
                          const interval = setInterval(() => {
                            if (i < texts.length) {
                              setMaghniaLogs(prev => [...prev, texts[i]]);
                              i++;
                            } else {
                              clearInterval(interval);
                              setMaghniaCargoStatus("cleared");
                            }
                          }, 300);
                        }}
                        disabled={maghniaCargoStatus === "scanning"}
                        className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-700 text-slate-950 font-black rounded-lg text-[9px] flex items-center gap-1 transition-all"
                      >
                        <Zap className="w-3 h-3" />
                        بدء الفحص الآلي الذكي (AI scan)
                      </button>
                    </div>

                  </div>
                </div>

                {/* Left Column (Matchmaker Talent-Exporter) */}
                <div className="md:col-span-5 bg-white border border-slate-100 rounded-3xl p-5 shadow-xs space-y-4">
                  <div className="border-b border-slate-50 pb-3 flex justify-between items-center">
                    <div>
                      <h4 className="text-xs font-black text-slate-800">2. موفق التدفقات والولوجيات المهنية (Talent-Corridor Matchmaker)</h4>
                      <p className="text-[9px] text-slate-400">توجيه ذكاء الطلاب مباشرة للقطاع الاقتصادي والاستيراد بمغنية.</p>
                    </div>
                    <span className="bg-emerald-50 text-emerald-700 text-[8px] px-2 py-0.5 rounded-full font-black">نشط وزارياً</span>
                  </div>

                  <p className="text-[9.5px] text-slate-500 leading-relaxed font-sans">
                    تقوم هذه الميزة بالتحليل الجغرافي الذكي لمسار مهارات خريجي جامعة تلمسان وتوزيعهم الفوري على شركات التصدير والاستيراد، والصوامع المبردة بمغنية لدحض مشكلة البطالة تماماً.
                  </p>

                  <button 
                    onClick={() => {
                      setMaghniaIsMatching(true);
                      setMaghniaMatchResults(null);
                      setTimeout(() => {
                        setMaghniaMatchResults([
                          { name: "أمير بلعربي", spec: "ماستر هندسة أنظمة لوجستية ذكية", target: "مجمع النقل الجاف - مغنية", rate: "99.4%", salary: "128,000 دج" },
                          { name: "نهاد تلمساني", spec: "ماستر جودة الأغذية الفلاحية والتبادل", rate: "98.2%", target: "شراكة مزارعي الزيتون بمغنية", salary: "115,000 دج" },
                          { name: "عبد القادر ولد علي", spec: "ليسانس تكنولوجيا المعامِلات الدولية وتأمين حدود", rate: "97.5%", target: "المؤسسة الوطنية لتطوير البناء بمغنية", salary: "105,000 دج" }
                        ]);
                        setMaghniaIsMatching(false);
                      }, 1000);
                    }}
                    disabled={maghniaIsMatching}
                    className="w-full py-2.5 bg-gradient-to-l from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-600/10"
                  >
                    {maghniaIsMatching ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        يجري ملاءمة كفاءات تلمسان مع مصانع مغنية...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        تشغيل موفق الكفاءات والقرار الوزاري للغرب الجزائري ⚡
                      </>
                    )}
                  </button>

                  {/* Matchmaking results display */}
                  {maghniaMatchResults ? (
                    <div className="space-y-2 animate-fade-in font-sans">
                      <span className="text-[8px] font-bold text-slate-400 block uppercase">نتائج التوجيه الفوري المسجلة:</span>
                      
                      {maghniaMatchResults.map((candidate, ci) => (
                        <div key={ci} className="bg-slate-50 p-2.5 rounded-xl border border-slate-150 relative overflow-hidden group">
                          <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-emerald-500"></div>
                          
                          <div className="flex justify-between items-start">
                            <div className="min-w-0">
                              <h5 className="text-[10px] font-black text-slate-800 flex items-center gap-1">
                                {candidate.name}
                                <span className="bg-emerald-100 text-emerald-800 text-[6.5px] px-1 py-0.2 rounded font-black font-mono">{candidate.rate} مطابقة</span>
                              </h5>
                              <p className="text-[8.5px] text-indigo-900 font-bold mt-0.5 truncate">{candidate.spec}</p>
                              <div className="text-[8px] text-slate-450 mt-1 flex items-center gap-1">
                                <span className="w-1 h-1 rounded-full bg-slate-300"></span> جهة التشغيل: <b>{candidate.target}</b>
                              </div>
                            </div>

                            <div className="text-left select-none">
                              <span className="text-[7px] text-slate-400 block uppercase">الراتب الموصى به</span>
                              <span className="text-[9.5px] font-mono font-black text-emerald-755 block">{candidate.salary}</span>
                              <span className="text-[6.5px] bg-slate-200 text-slate-500 font-bold px-1 rounded inline-block mt-0.5 font-sans">توجيه فوري</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : !maghniaIsMatching && (
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-150 text-center text-slate-400 py-6">
                      <Users className="w-6 h-6 mx-auto opacity-55 mb-1.5 text-slate-400" />
                      <span className="text-[9px] font-bold block">موفق الكوادر جاهز للبدء</span>
                      <span className="text-[8px] text-slate-400 block mt-0.5">اضغط على زر التوجيه أعلاه لمسح كفاءات تلمسان وتلقين مصانع مغنية.</span>
                    </div>
                  )}

                </div>
              </div>

              {/* Grid 3: Corridor Logistics Map Visual */}
              <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-xs space-y-4">
                <div className="border-b border-slate-50 pb-3 flex justify-between items-center">
                  <div>
                    <h4 className="text-xs font-black text-slate-800">3. المخطط البياني التفاعلي لمسارات تلمسان-مغنية-الغزوات الفائق (Corridor Flowchart)</h4>
                    <p className="text-[9px] text-slate-400">تدفق الكفاءات والمنتجات اللوجستية وتأثيرها على السيادة الاقتصادية للوطن بين 2026 و 2030.</p>
                  </div>
                  <span className="text-[8px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full font-bold">نمذجة الجغرافيا الاقتصادية</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center animate-fade-in">
                  
                  {/* Miniature SVG Roadmap corridor mapping */}
                  <div className="md:col-span-8 bg-slate-950 p-4 rounded-2xl border border-slate-900 h-44 flex flex-col justify-between text-white relative">
                    <span className="text-[7px] bg-white/10 text-slate-300 font-mono px-1.5 py-0.5 rounded-md inline-block w-max">مخطط تدفق المسار (Corridor Route Map 2030)</span>
                    
                    {/* SVG map representation */}
                    <div className="flex-1 flex items-center justify-around relative mt-2">
                      
                      {/* Interactive dotted connectors */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 60">
                        <path 
                          d="M 50 30 Q 150 10 200 30 T 350 30" 
                          fill="none" 
                          stroke="#10b981" 
                          strokeWidth="2" 
                          strokeDasharray="6,4" 
                          className="animate-[dash_10s_linear_infinite]"
                        />
                        <style>{`
                          @keyframes dash {
                            to {
                              stroke-dashoffset: -100;
                            }
                          }
                        `}</style>
                      </svg>

                      <div className="z-10 text-center bg-slate-900/90 border border-slate-800 p-2 rounded-xl w-24">
                        <span className="text-[7.5px] text-indigo-400 font-bold block leading-none">جامعة تلمسان</span>
                        <span className="text-[9.5px] font-black text-white mt-1 block">توليد الكفاءات</span>
                        <span className="text-[6.5px] text-slate-400 leading-none">موالاة مهارات المستقبل</span>
                      </div>

                      <div className="z-10 text-center bg-slate-900/90 border border-emerald-500/20 p-2 rounded-xl w-24 relative">
                        <div className="absolute -top-1 right-1/2 translate-x-1/2 w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-[7.5px] text-emerald-400 font-bold block leading-none">مدينة مغنية</span>
                        <span className="text-[9.5px] font-black text-white mt-1 block">التصنيع والتصدير</span>
                        <span className="text-[6.5px] text-slate-400 leading-none">ميناء جاف جمركي ذكي</span>
                      </div>

                      <div className="z-10 text-center bg-slate-900/90 border border-slate-800 p-2 rounded-xl w-24">
                        <span className="text-[7.5px] text-teal-400 font-bold block leading-none">ميناء الغزوات</span>
                        <span className="text-[9.5px] font-black text-white mt-1 block">السيادة البحرية</span>
                        <span className="text-[6.5px] text-slate-400 leading-none">تصدير عالمي حر %100</span>
                      </div>

                    </div>

                    <div className="flex justify-between items-center text-[7.5px] text-slate-450 mt-1 border-t border-slate-900 pt-1">
                      <span>إحداثيات إلكترونية: 34.8491° N, 1.7305° W (مغنية تلمسان)</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1 animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 block"></span> النظام متصل ومؤمن بالبلوكشاين الوطني
                      </span>
                    </div>
                  </div>

                  {/* Descriptive bullet points for Sovereign */}
                  <div className="md:col-span-4 bg-slate-55 border border-slate-150 rounded-2xl p-4 space-y-3 h-44 flex flex-col justify-between">
                    <div>
                      <h5 className="text-[9.5px] font-black text-slate-800">لماذا تجعل هذه الخاصية مسار TRACK متفوقاً عالمياً؟</h5>
                      <ul className="text-[8px] text-slate-550 space-y-1.5 mt-2 list-disc pr-3 leading-relaxed">
                        <li className="leading-tight"><b className="text-slate-700">السيادة الاقتصادية المحلية:</b> تحويل المدن الحدودية كمغنية من حيز الاستهلاك أو التهريب سابقاً إلى مسارات تصدير رقمية مشفرة بالكامل.</li>
                        <li className="leading-tight"><b className="text-slate-700">تصفير وقت المعاملات:</b> ربط التقييم الأكاديمي والتحقق الفوري للشواهد يضمن خلو المستندات للشركات من أي تدليس وبسرعة البرق.</li>
                        <li className="leading-tight"><b className="text-slate-700">تطبيق القرار الوزاري المشترك:</b> حصد براءات الاختراع والشركاء الاقتصاديين مباشرة دون انتظار الإعلانات التقليدية.</li>
                      </ul>
                    </div>
                    <span className="text-[8px] font-black text-emerald-800 self-end">مسار دائم نحو السيادة الرقمية والابتكار 🇩🇿</span>
                  </div>

                </div>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
