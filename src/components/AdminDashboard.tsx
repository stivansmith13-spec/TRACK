import React, { useState, useEffect } from "react";
import { 
  Settings, 
  Database, 
  Users, 
  Sliders, 
  Filter, 
  CheckCircle2, 
  AlertTriangle, 
  Activity, 
  Check, 
  X, 
  FolderSync, 
  Sparkles,
  Search,
  Building,
  GraduationCap,
  Zap,
  ShieldAlert,
  Cpu,
  TrendingUp,
  LineChart,
  Globe,
  RefreshCw,
  SlidersHorizontal,
  Layers,
  BarChart3,
  AlertCircle,
  Briefcase,
  HelpCircle,
  Home,
  FileText
} from "lucide-react";
import TrackArchitecture from "./TrackArchitecture";
import AlgerianMarketIntelligence from "./AlgerianMarketIntelligence";

interface FileLinkage {
  id: number;
  candidateName: string;
  candidateEmail: string;
  academySource: string;
  targetEnterprise: string;
  matchScore: number;
  priority: string;
  status: string;
  timestamp: string;
}

interface AdminDashboardProps {
  sessionUser: { name: string; email: string; org?: string };
  onLogout: () => void;
  fileLinkages: FileLinkage[];
  setFileLinkages: React.Dispatch<React.SetStateAction<FileLinkage[]>>;
  policies: {
    localPriority: boolean;
    academicVerificationRequired: boolean;
    doubleSovereignStampRequired: boolean;
  };
  setPolicies: React.Dispatch<React.SetStateAction<{
    localPriority: boolean;
    academicVerificationRequired: boolean;
    doubleSovereignStampRequired: boolean;
  }>>;
  adminLogs: string[];
  setAdminLogs: React.Dispatch<React.SetStateAction<string[]>>;
}

const AVAILABLE_CANDIDATES = [
  {
    id: "c1",
    name: "أحمد بن علي",
    email: "ahmed@jadarati.dz",
    skills: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    location: "تلمسان",
    academy: "جامعة أبي بكر بلقايد - تلمسان",
    avatar: "👨‍💻",
    gpa: "16.4/20",
    verified: true,
    preferredLocation: "تلمسان",
    expectedMinSalary: 85000,
    preferredMode: "هجين"
  },
  {
    id: "c2",
    name: "سارة بن سعيد",
    email: "s.saida@jadarati.dz",
    skills: ["Python", "SQL", "Power BI", "Data Mining"],
    location: "الجزائر العاصمة",
    academy: "جامعة العلوم والتكنولوجيا وهران (USTO)",
    avatar: "👩‍💼",
    gpa: "15.8/20",
    verified: true,
    preferredLocation: "الجزائر العاصمة",
    expectedMinSalary: 110000,
    preferredMode: "عن بعد"
  },
  {
    id: "c3",
    name: "محمد كمال",
    email: "m.kamal@jadarati.dz",
    skills: ["AWS", "Docker", "Kubernetes", "DevOps"],
    location: "وهران",
    academy: "المركز الجامعي بمغنية",
    avatar: "👨‍🔬",
    gpa: "14.2/20",
    verified: true,
    preferredLocation: "وهران",
    expectedMinSalary: 130000,
    preferredMode: "حضوري"
  },
  {
    id: "c4",
    name: "مريم زروقي",
    email: "m.zerrouki@jadarati.dz",
    skills: ["Figma", "Adobe XD", "UI Design", "Tailwind CSS"],
    location: "تلمسان",
    academy: "جامعة أبي بكر بلقايد - تلمسان",
    avatar: "👩‍🎨",
    gpa: "17.1/20",
    verified: true,
    preferredLocation: "تلمسان",
    expectedMinSalary: 75000,
    preferredMode: "عن بعد"
  },
  {
    id: "c5",
    name: "سليمان قادري",
    email: "s.qadri@outlook.com",
    skills: ["Java", "Spring Boot", "Oracle", "Docker"],
    location: "تلمسان",
    academy: "المركز الجامعي بمغنية",
    avatar: "👨‍💻",
    gpa: "13.9/20",
    verified: true,
    preferredLocation: "تلمسان",
    expectedMinSalary: 95000,
    preferredMode: "حضوري"
  },
  {
    id: "c6",
    name: "فاطمة زهراء بومدين",
    email: "f.boumediene@gmail.com",
    skills: ["Python", "SQL Server", ".NET Core", "React"],
    location: "وهران",
    academy: "جامعة العلوم والتكنولوجيا وهران (USTO)",
    avatar: "👩‍💻",
    gpa: "15.0/20",
    verified: false,
    preferredLocation: "تلمسان",
    expectedMinSalary: 100000,
    preferredMode: "هجين"
  },
];

const AVAILABLE_ENTERPRISES = [
  {
    id: "e1",
    name: "مؤسسة تلمسان للحلول الرقمية",
    location: "تلمسان",
    techStack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Figma"],
    industry: "الخدمات التقنية وتطوير المواقع",
    logo: "💻",
    offeredMaxSalary: 95000,
    workMode: "هجين"
  },
  {
    id: "e2",
    name: "شركة سوناطراك - فرع تلمسان",
    location: "تلمسان",
    techStack: ["Python", "SQL", "DevOps", "Docker", "Java"],
    industry: "الطاقة والمعلوماتية",
    logo: "🛢️",
    offeredMaxSalary: 180000,
    workMode: "حضوري"
  },
  {
    id: "e3",
    name: "بريد الجزائر الوطني",
    location: "وهران",
    techStack: ["Java", "Oracle", "Spring Boot", "SQL Server"],
    industry: "الخدمات المالية البريدية والمصرفية",
    logo: "📬",
    offeredMaxSalary: 120000,
    workMode: "حضوري"
  },
  {
    id: "e4",
    name: "شريك الاتصالات أوريدو",
    location: "الجزائر العاصمة",
    techStack: ["AWS", "Docker", "Kubernetes", "Python"],
    industry: "الاتصالات والخدمات السحابية",
    logo: "📶",
    offeredMaxSalary: 150050,
    workMode: "عن بعد"
  },
  {
    id: "e5",
    name: "ديزاد تيكس (DZ Solutions)",
    location: "تلمسان",
    techStack: ["Java", "Spring Boot", "React", "PostgreSQL"],
    industry: "تطوير الحلول البرمجية الفيدرالية",
    logo: "⚙️",
    offeredMaxSalary: 105000,
    workMode: "حضوري"
  }
];

const JOBS_DEMO = [
  { id: "j1", title: "مطور ويب متكامل", company: "تلمسان الرقمية", salary: "110K دج", location: "تلمسان", matchingScore: 95 },
  { id: "j2", title: "مهندس بيانات كبير", company: "سوناطراك الجزائر", salary: "220K دج", location: "تلمسان", matchingScore: 92 },
  { id: "j3", title: "أخصائي DevOps سحابة", company: "مكتب مغنية السحابي", salary: "140K دج", location: "وهران", matchingScore: 90 },
  { id: "j4", title: "مصمم واجهات UI/UX", company: "ديزاد برود", salary: "90K دج", location: "تلمسان", matchingScore: 88 },
  { id: "j5", title: "مسؤول نظم شبكات", company: "بريد الجزائر", salary: "120K دج", location: "الجزائر العاصمة", matchingScore: 81 },
  { id: "j6", title: "مطور تطبيقات بايثون", company: "الشرق برمجيات", salary: "130K دج", location: "تلمسان", matchingScore: 78 }
];

export default function AdminDashboard({
  sessionUser,
  onLogout,
  fileLinkages,
  setFileLinkages,
  policies,
  setPolicies,
  adminLogs,
  setAdminLogs,
}: AdminDashboardProps) {

  // Selected Active Tab from Sidebar
  const [activeTab, setActiveTab] = useState<string>("overview");

  // Calibrate weights states
  const [skillsWeight, setSkillsWeight] = useState(40);
  const [geoWeight, setGeoWeight] = useState(15);
  const [salaryWeight, setSalaryWeight] = useState(30);
  const [modeWeight, setModeWeight] = useState(15);

  // Filters Controls
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedWilayaFilter, setSelectedWilayaFilter] = useState("all");

  // Interactive Live Matching simulation selector state
  const [selectedCandidateId, setSelectedCandidateId] = useState("c1");
  const [selectedEnterpriseId, setSelectedEnterpriseId] = useState("e1");
  const [priority, setPriority] = useState("medium");
  const [formSuccess, setFormSuccess] = useState("");
  const [formError, setFormError] = useState("");

  // Grid Cell focus click modal
  const [focusedCell, setFocusedCell] = useState<{ candidateIdx: number; jobIdx: number; score: number } | null>(null);

  // New job posting form states
  const [newJobTitle, setNewJobTitle] = useState("");
  const [newJobCompany, setNewJobCompany] = useState("");
  const [newJobLocation, setNewJobLocation] = useState("تلمسان");
  const [newJobSalary, setNewJobSalary] = useState("95,000 دج");
  const [newJobSkills, setNewJobSkills] = useState("React, Tailwind, Node.js");

  // Anomaly warnings simulated feeds
  const [anomalies, setAnomalies] = useState([
    {
      id: "an-1",
      title: "ارتفاع غير طبيعي في طلب مهارة: مطور بايثون",
      description: "طلب مفرط ومرتفع على كفاءات مبرمجي البايثون في ولاية وهران مع تذبذب في معروض الكادر الأكاديمي.",
      severity: "high",
      timestamp: "منذ 5 دقائق",
      resolved: false
    },
    {
      id: "an-2",
      title: "نشاط مشبوه في 3 حسابات، احتمال تلاعب في البيانات",
      description: "تم حجب 3 طلبات ربط مكررة متزامنة في منطقة تلمسان نظراً لعدم ملائمة معارير التوقيع الموحد.",
      severity: "medium",
      timestamp: "منذ 15 دقيقة",
      resolved: false
    },
    {
      id: "an-3",
      title: "مشكلة في مطابقة الهوية، 7 شركات",
      description: "7 من طلبات المؤسسات الاقتصادية الجديدة لم تشفّر بصمات التوطين الخاص بها للفلترة الثنائية السيادية.",
      severity: "high",
      timestamp: "منذ 25 دقيقة",
      resolved: false
    }
  ]);

  const addLog = (message: string) => {
    const time = new Date().toLocaleTimeString("ar-DZ", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    setAdminLogs(prev => [`[${time}] ${message}`, ...prev]);
  };

  const cand = AVAILABLE_CANDIDATES.find(c => c.id === selectedCandidateId) || AVAILABLE_CANDIDATES[0];
  const ent = AVAILABLE_ENTERPRISES.find(e => e.id === selectedEnterpriseId) || AVAILABLE_ENTERPRISES[0];

  // Logic to calculate cosine similarity dynamically based on custom weights
  const calculateDynamicScore = (candidateObj: typeof AVAILABLE_CANDIDATES[0], enterpriseObj: typeof AVAILABLE_ENTERPRISES[0]) => {
    // 1. Technical Skills Overlap Rating
    const overlap = candidateObj.skills.filter(s => enterpriseObj.techStack.includes(s));
    const skillRatio = enterpriseObj.techStack.length > 0 ? overlap.length / enterpriseObj.techStack.length : 0;
    const skillsScoreVal = Math.round(skillRatio * skillsWeight);

    // 2. Geographic Proximity Range Rating
    let geoRatio = 0.2;
    const sameWilaya = candidateObj.location === enterpriseObj.location;
    if (sameWilaya) {
      geoRatio = 1.0;
    } else {
      geoRatio = 0.3;
    }
    let geoScoreVal = geoRatio * geoWeight;
    if (policies.localPriority && sameWilaya) {
      geoScoreVal = Math.min(geoScoreVal * 1.3, geoWeight);
    }

    // 3. Salary Target Matching Rating
    let salaryRatio = 0.1;
    if (enterpriseObj.offeredMaxSalary >= candidateObj.expectedMinSalary) {
      salaryRatio = 1.0;
    } else if (enterpriseObj.offeredMaxSalary >= candidateObj.expectedMinSalary * 0.8) {
      salaryRatio = 0.6;
    } else {
      salaryRatio = 0.2;
    }
    const salaryScoreVal = salaryRatio * salaryWeight;

    // 4. Preferred Work Style Compatibility
    let modeRatio = 0.2;
    if (candidateObj.preferredMode === enterpriseObj.workMode) {
      modeRatio = 1.0;
    } else {
      modeRatio = 0.4;
    }
    const modeScoreVal = modeRatio * modeWeight;

    // 5. Verification status compliance influence
    let academicModifierVal = 0;
    if (policies.academicVerificationRequired && !candidateObj.verified) {
      academicModifierVal = -20; 
    } else if (candidateObj.verified) {
      academicModifierVal = 5; 
    }

    let total = Math.round(skillsScoreVal + geoScoreVal + salaryScoreVal + modeScoreVal + academicModifierVal);
    if (total > 100) total = 100;
    if (total < 15) total = 15;

    return {
      totalMatch: total,
      skillsOverlap: overlap,
      skillsScoreVal: Math.round(skillsScoreVal),
      geoScoreVal: Math.round(geoScoreVal),
      salaryScoreVal: Math.round(salaryScoreVal),
      modeScoreVal: Math.round(modeScoreVal),
      academicModifierVal
    };
  };

  const currentMetrics = calculateDynamicScore(cand, ent);

  // Generate deterministic/quasi-static match matrix elements 6x6 based on active weights
  const getMatrixScore = (cIdx: number, jIdx: number) => {
    const candidateObj = AVAILABLE_CANDIDATES[cIdx % AVAILABLE_CANDIDATES.length];
    const enterpriseObj = AVAILABLE_ENTERPRISES[jIdx % AVAILABLE_ENTERPRISES.length];
    return calculateDynamicScore(candidateObj, enterpriseObj).totalMatch;
  };

  const togglePolicy = (key: "localPriority" | "academicVerificationRequired" | "doubleSovereignStampRequired") => {
    setPolicies(prev => {
      const newVal = !prev[key];
      const labels = {
        localPriority: "أولوية المواءمة الإقليمية المباشرة",
        academicVerificationRequired: "التدقيق الأكاديمي والتحقق الإلزامي من الشهادات",
        doubleSovereignStampRequired: "بروتوكول المصادقة السيادية المزدوجة"
      };
      addLog(`[التحذيرات الأمنية] تمّ تعديل فلتر السيادة الفيدرالية: ${newVal ? "تفعيل" : "تعطيل"} [${labels[key]}]`);
      return { ...prev, [key]: newVal };
    });
  };

  const updateLinkageStatus = (id: number, newStatus: string) => {
    setFileLinkages(prev => prev.map(lnk => {
      if (lnk.id === id) {
        addLog(`[حوكمة الربط] تم تغيير حالة بروتوكول الارتباط #${id} إلى: ${newStatus === "linked" ? "نشط ومعتمد" : "معطل مؤقتاً"}`);
        return { ...lnk, status: newStatus };
      }
      return lnk;
    }));
  };

  const deleteLinkage = (id: number, name: string) => {
    setFileLinkages(prev => prev.filter(lnk => lnk.id !== id));
    addLog(`[إجراء تصفية] تمّ حذف وإحباط ارتباط المترشح: ${name} من قاعدة البيانات.`);
  };

  const resolveAnomaly = (id: string, title: string) => {
    setAnomalies(prev => prev.map(a => a.id === id ? { ...a, resolved: true } : a));
    addLog(`[الأمان اللحظي] تم عزل وحل التحذير: [${title}] بنجاح.`);
  };

  const handleEstablishLinkage = (e: React.FormEvent) => {
    e.preventDefault();

    if (policies.academicVerificationRequired && !cand.verified) {
      setFormError("فشل الربط! سياسة التدقيق الأكاديمي الإلزامية نشطة، وتمنع تصدير الملف لعدم توثيق المصدر الأكاديمي.");
      addLog(`[رفض خوارزمي] تمّ إجهاض المطابقة لملف [${cand.name}] لانتهاكه شروط التوثيق.`);
      return;
    }

    const alreadyExists = fileLinkages.some(lnk => lnk.candidateEmail === cand.email && lnk.targetEnterprise === ent.name);
    if (alreadyExists) {
      setFormError(`بروتوكول المطابقة للباحث [${cand.name}] والمؤسسة الاقتصادية [${ent.name}] منشط مسبقاً.`);
      return;
    }

    setFormError("");
    const newLink: FileLinkage = {
      id: Date.now(),
      candidateName: cand.name,
      candidateEmail: cand.email,
      academySource: cand.academy,
      targetEnterprise: ent.name,
      matchScore: currentMetrics.totalMatch,
      priority,
      status: "linked",
      timestamp: new Date().toLocaleDateString("ar-DZ")
    };

    setFileLinkages(prev => [newLink, ...prev]);
    setFormSuccess(`تمّ تأسيس وتنشيط بروتوكول مواءمة 'TRACK' التلقائي لملف [${cand.name}] مع [${ent.name}] بنسبة ${currentMetrics.totalMatch}%.`);
    addLog(`[مواءمة ذكية] مواءمة آلية ناجحة: [${cand.name}] ➔ [${ent.name}] بنسبة ${currentMetrics.totalMatch}%.`);
    
    setTimeout(() => {
      setFormSuccess("");
    }, 4500);
  };

  // Add a brand new job node automatically with reactive alert triggers!
  const handleAddNewJobNode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJobTitle || !newJobCompany) {
      alert("الرجاء ملء حقول المسمى والشركة.");
      return;
    }

    addLog(`[إعلان الوعاء الوظيفي] تم إضافة منصب جديد: '${newJobTitle}' في شركة '${newJobCompany}'.`);
    
    // Simulate high priority alert automatically!
    const newAlert = {
      id: `an-${Date.now()}`,
      title: `فرصة توظيف جديدة بنسبة مطابقة ممتازة: ${newJobTitle}`,
      description: `لقد وفرت شركة ${newJobCompany} في ${newJobLocation} احتياجاً تقنياً مناسباً للباحثين بتلمسان.`,
      severity: "low",
      timestamp: "الآن",
      resolved: false
    };
    setAnomalies(prev => [newAlert, ...prev]);
    alert(`تم إدراج المناصب بنجاح! تم رصد تطابقات تلقائية قياسية في لوحة التحكم.`);
    
    setNewJobTitle("");
    setNewJobCompany("");
  };

  const handleUpdateCandidateVerification = (cId: string, status: boolean) => {
    AVAILABLE_CANDIDATES.forEach(c => {
      if (c.id === cId) {
        c.verified = status;
      }
    });
    addLog(`[سجل الجامعات] تعديل حالة تدقيق المترشح ليكون [${status ? "موثق معتمد" : "غير مدقق"}].`);
    alert("تم تحديث السجلات وفلترة المطابقة تلقائياً بنجاح!");
  };

  const processedLinkages = fileLinkages.filter(lnk => {
    const query = searchTerm.toLowerCase();
    const matchesSearch = 
      lnk.candidateName.toLowerCase().includes(query) ||
      lnk.targetEnterprise.toLowerCase().includes(query) ||
      lnk.academySource.toLowerCase().includes(query);

    const matchesStatus = statusFilter === "all" || lnk.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div id="track-admin-pro-layout" className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col lg:flex-row text-right selection:bg-cyan-500/20" dir="rtl">
      
      {/* 1. LEFT SIDEBAR (Standard Track style UI) */}
      <aside className="w-full lg:w-72 bg-slate-900 border-l border-slate-800 p-6 flex flex-col justify-between shrink-0 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-[60px]" />
        
        <div className="space-y-8 z-10">
          {/* Logo element */}
          <div className="flex items-center gap-3.5 border-b border-slate-800 pb-5">
            <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
              <Cpu className="w-5.5 h-4.5 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black tracking-wider text-white">TRACK ADMIN</span>
                <span className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[8px] px-1.5 py-0.5 rounded font-black font-mono">PRO v3.8</span>
              </div>
              <p className="text-[10px] text-slate-500 font-bold mt-0.5">لوحة التحكم السحابة المشتركة</p>
            </div>
          </div>

          {/* Nav links stack */}
          <nav className="space-y-1 text-right">
            <span className="text-[10px] font-bold text-slate-400 block px-2.5 mb-2.5 uppercase tracking-wide">التحكم والعمليات</span>
            
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-black transition-all ${
                activeTab === "overview" 
                  ? "bg-cyan-500/10 text-cyan-400 border-r-2 border-cyan-400 bg-opacity-100" 
                  : "text-slate-400 hover:text-white hover:bg-slate-950/40"
              }`}
            >
              <Home className="w-4.5 h-4.5 shrink-0" />
              <span>الرئيسية والعمارة</span>
            </button>

            <button
              onClick={() => setActiveTab("market")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-black transition-all ${
                activeTab === "market" 
                  ? "bg-cyan-500/10 text-cyan-400 border-r-2 border-cyan-400" 
                  : "text-slate-400 hover:text-white hover:bg-slate-950/40"
              }`}
            >
              <TrendingUp className="w-4.5 h-4.5 shrink-0" />
              <span>ذكاء السوق والطلب</span>
            </button>

            <button
              onClick={() => setActiveTab("matching")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-black transition-all ${
                activeTab === "matching" 
                  ? "bg-cyan-500/10 text-cyan-400 border-r-2 border-cyan-400" 
                  : "text-slate-400 hover:text-white hover:bg-slate-950/40"
              }`}
            >
              <FolderSync className="w-4.5 h-4.5 shrink-0" />
              <span>المطابقة ومصفوفة الكشف</span>
            </button>

            <span className="text-[10px] font-bold text-slate-400 block px-2.5 pt-4 mb-2.5 uppercase tracking-wide">السجلات الوطنية</span>

            <button
              onClick={() => setActiveTab("users")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-black transition-all ${
                activeTab === "users" 
                  ? "bg-cyan-500/10 text-cyan-400 border-r-2 border-cyan-400" 
                  : "text-slate-400 hover:text-white hover:bg-slate-950/40"
              }`}
            >
              <Users className="w-4.5 h-4.5 shrink-0" />
              <span>سير الباحثين والخرجين</span>
            </button>

            <button
              onClick={() => setActiveTab("companies")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-black transition-all ${
                activeTab === "companies" 
                  ? "bg-cyan-500/10 text-cyan-400 border-r-2 border-cyan-400" 
                  : "text-slate-400 hover:text-white hover:bg-slate-950/40"
              }`}
            >
              <Building className="w-4.5 h-4.5 shrink-0" />
              <span>الشركاء والمدن الصناعية</span>
            </button>

            <button
              onClick={() => setActiveTab("jobs")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-black transition-all ${
                activeTab === "jobs" 
                  ? "bg-cyan-500/10 text-cyan-400 border-r-2 border-cyan-400" 
                  : "text-slate-400 hover:text-white hover:bg-slate-950/40"
              }`}
            >
              <Briefcase className="w-4.5 h-4.5 shrink-0" />
              <span>الوظائف والوعاء الفني</span>
            </button>

            <button
              onClick={() => setActiveTab("alerts")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-black transition-all relative ${
                activeTab === "alerts" 
                  ? "bg-cyan-500/10 text-cyan-400 border-r-2 border-cyan-400" 
                  : "text-slate-400 hover:text-white hover:bg-slate-950/40"
              }`}
            >
              <ShieldAlert className="w-4.5 h-4.5 shrink-0 text-amber-500" />
              <span>الإنذارات الذكية</span>
              {anomalies.filter(a => !a.resolved).length > 0 && (
                <span className="absolute left-2 top-2.5 px-1.5 py-0.5 bg-rose-500 text-white text-[8px] rounded-full font-black animate-pulse">
                  {anomalies.filter(a => !a.resolved).length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-black transition-all ${
                activeTab === "settings" 
                  ? "bg-cyan-500/10 text-cyan-400 border-r-2 border-cyan-400" 
                  : "text-slate-400 hover:text-white hover:bg-slate-950/40"
              }`}
            >
              <Settings className="w-4.5 h-4.5 shrink-0" />
              <span>السياسات السيادية الموحدة</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer operator controls */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/60 text-right mt-6 shrink-0 relative">
          <div className="flex items-center gap-3">
            <div className="w-8.5 h-8.5 rounded-full bg-cyan-950 border border-cyan-800 flex items-center justify-center font-black text-cyan-400 text-xs relative">
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-950 rounded-full" />
              OP
            </div>
            <div className="min-w-0 flex-1">
              <h5 className="text-[11px] font-black text-slate-100 truncate">مدير النظام (Admin Pro)</h5>
              <span className="text-[9px] text-slate-500 truncate block mt-0.5">stivansmith13@gmail.com</span>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full mt-3 py-1.5 bg-rose-950/30 hover:bg-rose-900/40 text-rose-300 hover:text-white text-[9.5px] font-black rounded-lg border border-rose-500/20 transition-all select-none text-center block"
          >
            تسجيل الخروج من البوابة
          </button>
        </div>
      </aside>

      {/* 2. MAIN SECTION (Header + Content grid) */}
      <main className="flex-1 p-4 lg:p-8 space-y-6 overflow-y-auto max-h-screen">
        
        {/* UPPER SOVEREIGN BANNER */}
        <header className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[9px] font-black px-2 py-0.5 rounded-full tracking-wide">
                لوحة تحكم ذكاء الأعمال الفيدرالية
              </span>
              <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-black px-2 py-0.5 rounded-full tracking-wide">
                بوابة التوطين 🇩🇿
              </span>
            </div>
            <h1 className="text-lg lg:text-xl font-black mt-1.5 text-white flex items-center gap-2">
              <span>لوحة التحكم الذكية - رؤية شاملة لحركة سوق العمل في الزمن الحقيقي</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-400 font-mono font-bold bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl">
              ساعتك الحالية: 10 جوان 2026
            </span>
          </div>
        </header>

        {/* 3. CORE STATISTICS HIGHLIGHTS ROW */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-slate-900/50 border border-slate-800/80 p-4 rounded-xl shadow group hover:border-cyan-500/30 transition-all text-right relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1 bg-cyan-500 h-full" />
            <div className="flex justify-between items-start">
              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-400 block font-black">إجمالي الباحثين</span>
                <span className="text-2xl font-mono font-black text-cyan-400 tracking-tight">12,842</span>
                <span className="text-[8.5px] text-emerald-400 block font-bold font-mono">+18.6% منذ الأسبوع الماضي</span>
              </div>
              <div className="w-9 h-9 rounded bg-cyan-950/50 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-800/30">
                <Users className="w-4.5 h-4.5" />
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800/80 p-4 rounded-xl shadow group hover:border-amber-500/30 transition-all text-right relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1 bg-amber-500 h-full" />
            <div className="flex justify-between items-start">
              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-400 block font-black">إجمالي الوظائف</span>
                <span className="text-2xl font-mono font-black text-amber-500 tracking-tight">3,456</span>
                <span className="text-[8.5px] text-emerald-400 block font-bold font-mono">+24.3% الوعاء الوظيفي</span>
              </div>
              <div className="w-9 h-9 rounded bg-amber-950/50 text-amber-400 flex items-center justify-center shrink-0 border border-amber-800/30">
                <Briefcase className="w-4.5 h-4.5" />
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800/80 p-4 rounded-xl shadow group hover:border-emerald-500/30 transition-all text-right relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1 bg-emerald-500 h-full" />
            <div className="flex justify-between items-start">
              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-400 block font-black">الشركات النشطة</span>
                <span className="text-2xl font-mono font-black text-emerald-450 tracking-tight">1,250</span>
                <span className="text-[8.5px] text-cyan-400 block font-bold font-mono">+15.7% تلمسان ووهران</span>
              </div>
              <div className="w-9 h-9 rounded bg-emerald-950/50 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-800/30">
                <Building className="w-4.5 h-4.5" />
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800/80 p-4 rounded-xl shadow group hover:border-indigo-500/30 transition-all text-right relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1 bg-indigo-500 h-full" />
            <div className="flex justify-between items-start">
              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-400 block font-black">المطابقات الناجحة</span>
                <span className="text-2xl font-mono font-black text-indigo-400 tracking-tight">8,642</span>
                <span className="text-[8.5px] text-emerald-455 block font-bold font-mono">+21.4% نسبة نجاح التشغيل</span>
              </div>
              <div className="w-9 h-9 rounded bg-indigo-950/50 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-805/30">
                <CheckCircle2 className="w-4.5 h-4.5" />
              </div>
            </div>
          </div>

        </section>

        {/* 4. DYNAMIC TAB CONTAINER CONTENT */}
        
        {/* TAB 1: OVERVIEW & SMART ARCHITECTURE INFRASTRUCTURE */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Real-time Architecture upper diagram flow */}
            <TrackArchitecture />

            {/* Quick row combining 2D heatmap matrix preview + alert and daily compliance logs */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Heatmap matrix block (8 cols) */}
              <div className="lg:col-span-8 bg-slate-900/55 p-5 rounded-2xl border border-slate-800/80 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800/50 pb-2.5">
                  <div className="flex items-center gap-2">
                    <Database className="w-5 h-5 text-indigo-400" />
                    <h3 className="text-xs font-black text-slate-200">مصفوفة المطابقة الذكية (2D Match Matrix Grid)</h3>
                  </div>
                  <span className="text-[9px] text-slate-500 font-bold">حساب درجات التوافق الكوسيني الفوري للأطراف</span>
                </div>

                <p className="text-[11px] text-slate-400">
                  تمثيل رياضي للتقارب النقطي بين متجهات الباحثين ومتطلبات الوظائف. انقر فوق أي نقطة أو خلية لفتح مضاهاة الموثوقية التلقائية وتنشيط الارتباط:
                </p>

                {/* 6x6 HEAT GRID ARRAY */}
                <div className="bg-slate-950 rounded-xl p-4 border border-slate-900 overflow-x-auto">
                  <div className="min-w-[480px]">
                    
                    {/* Header Columns: Seeker names */}
                    <div className="grid grid-cols-7 gap-2 pb-2 text-[9.5px] font-black text-slate-400 text-center">
                      <div className="text-right text-[8.5px] text-slate-500 self-center">اسم المنصب ➔</div>
                      {AVAILABLE_CANDIDATES.map((candObj, cIdx) => (
                        <div key={candObj.id} className="truncate bg-slate-900/70 py-1 rounded border border-slate-800/30">
                          {candObj.name.split(" ")[0]} ({candObj.location})
                        </div>
                      ))}
                    </div>

                    {/* Rows */}
                    <div className="space-y-2">
                      {JOBS_DEMO.map((jobObj, jIdx) => (
                        <div key={jobObj.id} className="grid grid-cols-7 gap-2 items-center">
                          {/* Row title */}
                          <div className="text-[9.5px] font-black text-slate-350 truncate pr-1">
                            {jobObj.title}
                          </div>

                          {/* 6 Grid cells */}
                          {AVAILABLE_CANDIDATES.map((candObj, cIdx) => {
                            const score = getMatrixScore(cIdx, jIdx);
                            
                            // Color code based on score
                            let bgClass = "bg-rose-500/10 hover:bg-rose-550/20 text-rose-405 border-rose-950/40";
                            if (score >= 82) {
                              bgClass = "bg-cyan-500/15 hover:bg-cyan-550/20 text-cyan-400 border-cyan-900/40 shadow-xs shadow-cyan-950/20";
                            } else if (score >= 60) {
                              bgClass = "bg-amber-500/10 hover:bg-amber-550/20 text-amber-500 border-amber-955/40";
                            }

                            return (
                              <button
                                key={candObj.id}
                                type="button"
                                onClick={() => setFocusedCell({ candidateIdx: cIdx, jobIdx: jIdx, score })}
                                className={`py-2 px-1 text-center font-mono font-black text-[10.5px] rounded-lg border transition-all ${bgClass}`}
                              >
                                {score}%
                              </button>
                            );
                          })}

                        </div>
                      ))}
                    </div>

                  </div>
                </div>

                <div className="flex justify-between items-center text-[9px] text-slate-500">
                  <span>* محور السينات: الباحثين الأكاديميين المعتمدين</span>
                  <span>* محور العينات: الاحتياجات والوعاء الفني للشركاء</span>
                </div>
              </div>

              {/* Warnings and active compliance alerts feed (4 cols) */}
              <div className="lg:col-span-4 bg-slate-900/55 p-5 rounded-2xl border border-slate-800/80 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800/50 pb-2.5">
                  <span className="text-xs font-black text-rose-450 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4" />
                    <span>الإنذارات الذكية النشطة</span>
                  </span>
                  <button 
                    onClick={() => setActiveTab("alerts")}
                    className="text-[9.5px] text-cyan-400 font-bold hover:underline"
                  >
                    عرض جميع الإنذارات
                  </button>
                </div>

                <div className="space-y-3 max-h-[290px] overflow-y-auto">
                  {anomalies.filter(a => !a.resolved).slice(0, 3).map((an) => (
                    <div key={an.id} className="p-3 bg-slate-950/70 border border-slate-850 rounded-xl space-y-1.5 text-right font-semibold">
                      <div className="flex items-center gap-1.5 justify-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                        <h4 className="text-[10px] text-slate-205 font-black leading-tight">{an.title}</h4>
                      </div>
                      <p className="text-[9.5px]/relaxed text-slate-400">{an.description}</p>
                      <div className="flex justify-between items-center text-[8px] text-slate-500 pt-1">
                        <span>{an.timestamp}</span>
                        <button 
                          onClick={() => resolveAnomaly(an.id, an.title)}
                          className="hover:text-emerald-400 font-black"
                        >
                          معالجة تصفير الإنذار ✓
                        </button>
                      </div>
                    </div>
                  ))}
                  {anomalies.filter(a => !a.resolved).length === 0 && (
                    <div className="p-6 text-center text-[10px] text-slate-500 font-bold border border-dashed border-slate-800 rounded-xl">
                      ✓ لا توجد أي تحذيرات أو عيوب في استقرار النظام حالياً.
                    </div>
                  )}
                </div>

                {/* Weights preview list */}
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/60 text-right space-y-1.5 text-[9px]">
                  <span className="text-slate-400 font-black block border-b border-slate-900 pb-1">عوامل ومعارير الموازنة:</span>
                  <div className="flex justify-between text-slate-400 font-bold">
                    <span>مطابقة المهارات الرأسية:</span>
                    <span className="text-cyan-400 font-mono font-black">{skillsWeight}%</span>
                  </div>
                  <div className="flex justify-between text-slate-400 font-bold">
                    <span>ملاءمة الراتب والمعروض:</span>
                    <span className="text-cyan-400 font-mono font-black">{salaryWeight}%</span>
                  </div>
                  <button 
                    onClick={() => setActiveTab("matching")}
                    className="w-full text-center text-cyan-400 mt-2 hover:underline block font-bold"
                  >
                    معايرة المعايير (Calibration Panel) ⚙️
                  </button>
                </div>
              </div>

            </div>

            {/* Daily Matches table */}
            <div className="bg-slate-900/55 p-5 rounded-2xl border border-slate-800/80 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800/50 pb-2.5">
                <span className="text-xs font-black text-slate-200">أفضل التطابقات اليوم (Top Matches of the Day)</span>
                <span className="text-[9.5px] text-cyan-400 bg-cyan-950/20 px-2 py-0.5 rounded border border-cyan-800/30">نسبة مطابقة &gt;90%</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-850 flex items-center gap-3 text-right">
                  <div className="w-10 h-10 rounded-full bg-cyan-950 border border-cyan-800/40 flex items-center justify-center text-lg shadow-sm">
                    👨‍💻
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-black text-slate-100 truncate">أحمد ب.</span>
                      <span className="text-[10px] text-cyan-400 font-mono font-black">95%</span>
                    </div>
                    <span className="text-[9px] text-slate-400 block mt-0.5 truncate">مطور ويب (TechSolutions)</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-850 flex items-center gap-3 text-right">
                  <div className="w-10 h-10 rounded-full bg-emerald-950 border border-emerald-805/40 flex items-center justify-center text-lg shadow-sm">
                    👩‍💼
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-black text-slate-100 truncate">سارة م.</span>
                      <span className="text-[10px] text-cyan-400 font-mono font-black">92%</span>
                    </div>
                    <span className="text-[9px] text-slate-400 block mt-0.5 truncate">مصممة جرافيك (CreativePro)</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-850 flex items-center gap-3 text-right">
                  <div className="w-10 h-10 rounded-full bg-indigo-950 border border-indigo-805/40 flex items-center justify-center text-lg shadow-sm">
                    👨‍🔬
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-black text-slate-100 truncate">محمد ك.</span>
                      <span className="text-[10px] text-cyan-400 font-mono font-black">90%</span>
                    </div>
                    <span className="text-[9px] text-slate-400 block mt-0.5 truncate">مهندس كهرباء (ElectroDz)</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* TAB 2: MARKET INTELLIGENCE GRAPHICS */}
        {activeTab === "market" && (
          <AlgerianMarketIntelligence />
        )}

        {/* TAB 3: SMART MATCHING DETAILS & WEIGHT REGULATOR */}
        {activeTab === "matching" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Standard Sandbox Connection Simulator Form (5 cols) */}
            <div className="lg:col-span-5 bg-slate-900/60 p-6 rounded-2xl border border-slate-800/85 shadow-xl space-y-5">
              <div className="flex items-center gap-2 border-b border-slate-850 pb-3">
                <Sparkles className="w-5 h-5 text-cyan-400 shrink-0" />
                <h3 className="text-xs font-black text-slate-205">نظام محاكاة ومطابقة الملفات التلقائي</h3>
              </div>

              <p className="text-[10.5px] text-slate-400 leading-normal mb-2">
                قم بمقايسة أي مترشح أكاديمي مقابل فرص التوظيف لدى الشركاء الاقتصاديين. يؤثر التدقيق الأكاديمي والوزن الفيدرالي على الحسبة تلقائياً:
              </p>

              <form onSubmit={handleEstablishLinkage} className="space-y-4">
                
                {formError && (
                  <div className="bg-rose-950/30 border border-rose-800 text-rose-300 text-[10.5px] p-3 rounded-lg font-bold">
                    ⚠️ {formError}
                  </div>
                )}

                {formSuccess && (
                  <div className="bg-emerald-950/35 border border-emerald-800 text-emerald-300 text-[10.5px] p-4 rounded-lg font-black leading-relaxed">
                    ✓ {formSuccess}
                  </div>
                )}

                {/* Candidate Selection */}
                <div className="space-y-1 block">
                  <label className="text-[9.5px] font-black text-slate-450 block mb-1">حدد المترشح المراد مواءمته:</label>
                  <select
                    value={selectedCandidateId}
                    onChange={(e) => setSelectedCandidateId(e.target.value)}
                    className="w-full text-xs font-bold text-slate-200 bg-slate-950 border border-slate-800 rounded-lg p-2.5 focus:border-cyan-500 focus:outline-none"
                  >
                    {AVAILABLE_CANDIDATES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.avatar} {c.name} ({c.location}) — المعدل: {c.gpa}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Enterprise Selection */}
                <div className="space-y-1 block">
                  <label className="text-[9.5px] font-black text-slate-455 block mb-1">حدد الشركة الاقتصادية المستهدفة:</label>
                  <select
                    value={selectedEnterpriseId}
                    onChange={(e) => setSelectedEnterpriseId(e.target.value)}
                    className="w-full text-xs font-bold text-slate-200 bg-slate-950 border border-slate-800 rounded-lg p-2.5 focus:border-cyan-500 focus:outline-none"
                  >
                    {AVAILABLE_ENTERPRISES.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.logo} {e.name} ({e.location})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Live visual result indicator map */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-900 space-y-3.5">
                  <div className="flex justify-between items-center text-[10px] border-b border-slate-900 pb-2.5">
                    <span className="font-extrabold text-slate-400">التطابق التلقائي الخوارزمي المباشر</span>
                    <span className="text-[8px] text-cyan-400 font-mono">FLOW CONNECTOR GRAPH</span>
                  </div>

                  <div className="flex items-center justify-between gap-2 h-14 bg-slate-900 px-3.5 rounded-lg relative overflow-hidden">
                    <div className="z-10 text-center shrink-0 w-20">
                      <span className="text-sm block">{cand.avatar}</span>
                      <span className="text-[8.5px] font-black text-slate-300 block truncate">{cand.name}</span>
                    </div>

                    <div className="flex-1 h-[2px] relative bg-slate-800 mx-1">
                      <div className="absolute inset-0 h-full bg-gradient-to-l from-cyan-400 to-amber-400 animate-pulse" style={{ width: `${currentMetrics.totalMatch}%` }} />
                      <div className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" style={{ left: "50%" }} />
                    </div>

                    <div className="z-10 text-center shrink-0 w-20">
                      <span className="text-sm block">{ent.logo}</span>
                      <span className="text-[8.5px] font-black text-slate-300 block truncate">{ent.name}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-400 font-bold">معدل التلاؤم المحسوب للطرفين:</span>
                    <span className="text-md font-mono font-black text-cyan-400">
                      {currentMetrics.totalMatch}%
                    </span>
                  </div>
                </div>

                {/* Priority */}
                <div className="space-y-1 block">
                  <label className="text-[9.5px] font-black text-slate-455 block mb-1">أولوية بروتوكول الارتباط:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["high", "medium", "low"].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPriority(p)}
                        className={`p-2 rounded-lg text-[9.5px] font-black border text-center transition-all ${
                          priority === p 
                            ? "bg-cyan-500/10 border-cyan-500 text-cyan-405" 
                            : "bg-slate-950 border-slate-800 text-slate-400"
                        }`}
                      >
                        {p === "high" ? "⚡ قصوى" : p === "medium" ? "متوسطة" : "مرنة"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={policies.academicVerificationRequired && !cand.verified}
                  className={`w-full py-2.5 px-4 text-white font-black text-xs rounded-xl shadow transition-all ${
                    policies.academicVerificationRequired && !cand.verified
                      ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-705"
                      : "bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black shadow-lg shadow-cyan-950/20"
                  }`}
                >
                  إدراج وتنشيط بروتوكول الملاءمة المعياري ⚡
                </button>

              </form>
            </div>

            {/* Weights optimization control sliders & Live linkage matrix view (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Sliders card */}
              <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/85 shadow-xl space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-850 pb-3">
                  <Sliders className="w-5 h-5 text-amber-500" />
                  <h3 className="text-xs font-black text-slate-205">التحكم في المعايير الكلية لمخازن الفلترة (Weights Calibration)</h3>
                </div>

                <p className="text-[10.5px] text-slate-400">
                  قم بمعايرة درجات الترشيح وتأثير العوامل. يؤثر تغيير السلايدر على نسب كافة الخلايا التلقائية في مصفوفة المطابقة مَعاً:
                </p>

                <div className="space-y-3.5 pt-2 text-[10px]">
                  
                  <div className="space-y-1 block">
                    <div className="flex justify-between text-[9.5px] font-bold text-slate-400">
                      <span>الوزن النسبي لمطابقة المهارات والمسارات الفنية:</span>
                      <span className="text-cyan-405 font-black">{skillsWeight}%</span>
                    </div>
                    <input 
                      type="range" min="10" max="60" value={skillsWeight}
                      onChange={(e) => setSkillsWeight(parseInt(e.target.value))}
                      className="w-full accent-cyan-400 bg-slate-950 h-1.5 rounded"
                    />
                  </div>

                  <div className="space-y-1 block">
                    <div className="flex justify-between text-[9.5px] font-bold text-slate-400">
                      <span>الوزن النسبي لمخازن ملاءمة الرواتب والمعروض:</span>
                      <span className="text-cyan-405 font-black">{salaryWeight}%</span>
                    </div>
                    <input 
                      type="range" min="10" max="60" value={salaryWeight}
                      onChange={(e) => setSalaryWeight(parseInt(e.target.value))}
                      className="w-full accent-cyan-400 bg-slate-950 h-1.5 rounded"
                    />
                  </div>

                  <div className="space-y-1 block">
                    <div className="flex justify-between text-[9.5px] font-bold text-slate-400">
                      <span>الوزن النسبي لجغرافيا الولاية الإقليمية:</span>
                      <span className="text-cyan-405 font-black">{geoWeight}%</span>
                    </div>
                    <input 
                      type="range" min="5" max="40" value={geoWeight}
                      onChange={(e) => setGeoWeight(parseInt(e.target.value))}
                      className="w-full accent-cyan-400 bg-slate-950 h-1.5 rounded"
                    />
                  </div>

                  <div className="space-y-1 block">
                    <div className="flex justify-between text-[9.5px] font-bold text-slate-400">
                      <span>الوزن النسبي لنوع ونمط التشغيل (هجين / حضوري):</span>
                      <span className="text-cyan-405 font-black">{modeWeight}%</span>
                    </div>
                    <input 
                      type="range" min="5" max="40" value={modeWeight}
                      onChange={(e) => setModeWeight(parseInt(e.target.value))}
                      className="w-full accent-cyan-400 bg-slate-950 h-1.5 rounded"
                    />
                  </div>

                  {/* Save button mockup */}
                  <button
                    type="button"
                    onClick={() => {
                      addLog(`[معايرة الاستوديو] تم تعديل وحفظ أوزان الفلترة لتدفق الموارد البشرية بنجاح.`);
                      alert("تمت المعايرة وحفظ الأوزان في نموذج الذكاء بنجاح!");
                    }}
                    className="w-full mt-2 py-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-cyan-405 rounded-xl font-black text-xs transition-colors"
                  >
                    حفظ التعديلات ومعايرة نموذج الذكاء 💾
                  </button>

                </div>
              </div>

              {/* Active linkages registry table list with status filters */}
              <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/85 shadow-xl space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-3 gap-3">
                  <div className="flex items-center gap-2">
                    <Database className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-xs font-black text-slate-205">سجل بروتوكولات المواءمة والروابط الحية</h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-1">
                    {["all", "linked", "pending"].map((s) => (
                      <button
                        key={s} onClick={() => setStatusFilter(s)}
                        className={`px-2 py-1 text-[8.5px] font-black rounded ${
                          statusFilter === s ? "bg-cyan-500 text-slate-950" : "bg-slate-950 border border-slate-800 text-slate-400"
                        }`}
                      >
                        {s === "all" ? "الكل" : s === "linked" ? "منشط" : "معلق"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3.5 max-h-[300px] overflow-y-auto">
                  {processedLinkages.map((lnk) => (
                    <div key={lnk.id} className="p-4 bg-slate-950/80 border border-slate-850 rounded-xl space-y-3 text-right">
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <div className="space-y-0.5">
                          <h4 className="text-xs font-black text-white">{lnk.candidateName}</h4>
                          <span className="text-[9px] text-slate-500 block truncate">{lnk.academySource}</span>
                        </div>
                        <span className="px-2 py-0.5 bg-cyan-900/20 border border-cyan-550/30 text-cyan-400 text-[9px] rounded font-mono font-bold">
                          المواءمة: {lnk.matchScore}%
                        </span>
                      </div>

                      <div className="text-[10px] text-slate-400 bg-slate-900 px-3 py-1.5 rounded border border-slate-850 truncate">
                        🏢 الشريك المستهدف: <strong>{lnk.targetEnterprise}</strong>
                      </div>

                      <div className="flex items-center justify-end gap-2 border-t border-slate-900 pt-2.5">
                        {lnk.status !== "linked" ? (
                          <button
                            onClick={() => updateLinkageStatus(lnk.id, "linked")}
                            className="px-2 py-1 bg-emerald-950 text-emerald-400 text-[9.5px] font-bold rounded border border-emerald-900"
                          >
                            تحديث للتنشيط 🟢
                          </button>
                        ) : (
                          <button
                            onClick={() => updateLinkageStatus(lnk.id, "paused")}
                            className="px-2 py-1 bg-amber-950/60 text-amber-500 text-[9.5px] font-bold rounded border border-amber-900"
                          >
                            تعليق مؤقت 🟡
                          </button>
                        )}
                        <button
                          onClick={() => deleteLinkage(lnk.id, lnk.candidateName)}
                          className="px-2.5 py-1 bg-rose-955/40 text-rose-400 hover:bg-rose-900 hover:text-white text-[9.5px] font-bold rounded border border-rose-900 transition-colors"
                        >
                          إلغاء الارتباط
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 4: USERS LIST (CV INTEGRATION & DIGITAL EMBEDDINGS) */}
        {activeTab === "users" && (
          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/85 shadow-xl space-y-6">
            <div className="flex justify-between items-center border-b border-slate-805 pb-4">
              <div>
                <h3 className="text-xs font-black text-slate-100 flex items-center gap-1.5">
                  <Users className="w-5 h-5 text-cyan-400" />
                  <span>السجل الوطني الموحد لملفات الخرّيجين والباحثين عن شغل</span>
                </h3>
                <p className="text-[10.5px] text-slate-500 mt-1">تضم هذه البوابة السير الذاتية والأرقام وال GPAs المرتبطة مع وزارة التعليم العالي والبحث العلمي.</p>
              </div>
              <span className="text-[10px] bg-slate-950 px-3 py-1 rounded-lg border border-slate-800 text-slate-400 font-mono">
                TOTAL: {AVAILABLE_CANDIDATES.length} CANDIDATES
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {AVAILABLE_CANDIDATES.map((c) => (
                <div key={c.id} className="bg-slate-950 border border-slate-850 p-5 rounded-xl space-y-4 text-right hover:border-slate-700 transition-all">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-xl">
                        {c.avatar}
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-200">{c.name}</h4>
                        <span className="text-[9.5px] text-slate-500 block">{c.email}</span>
                      </div>
                    </div>

                    <span className={`text-[9px] px-2 py-0.5 rounded font-bold ${
                      c.verified ? "bg-emerald-900/20 border border-emerald-800 text-emerald-400" : "bg-rose-950/20 border border-rose-900 text-rose-450"
                    }`}>
                      {c.verified ? "موثق أكاديمياً ✓" : "قيد التدقيق ⏳"}
                    </span>
                  </div>

                  <div className="space-y-2 text-[10px]/relaxed text-slate-400 border-t border-slate-900 pt-3">
                    <div className="flex justify-between">
                      <span className="text-slate-550">الصرح الجامعي:</span>
                      <span className="text-slate-205 truncate max-w-[170px]">{c.academy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-550">معدل التخرج (GPA):</span>
                      <span className="text-slate-205 font-mono">{c.gpa}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-550">الموقع السكني الحركي:</span>
                      <span className="text-slate-205">{c.location} (يفضل {c.preferredLocation})</span>
                    </div>
                  </div>

                  {/* Skills tags list */}
                  <div className="flex flex-wrap gap-1">
                    {c.skills.map((st, i) => (
                      <span key={i} className="bg-slate-900 text-slate-350 px-2 py-0.5 rounded text-[8.5px] font-mono border border-slate-850">
                        {st}
                      </span>
                    ))}
                  </div>

                  {/* Interactive toggle block */}
                  <div className="border-t border-slate-905 pt-2.5 flex justify-between items-center text-[10px]">
                    <span className="text-slate-500">مرحلة فحص الشهادة:</span>
                    {c.verified ? (
                      <button
                        onClick={() => handleUpdateCandidateVerification(c.id, false)}
                        className="text-rose-405 hover:underline font-bold"
                      >
                        سحب الإقرار السيادي ⚠️
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUpdateCandidateVerification(c.id, true)}
                        className="text-cyan-400 hover:underline font-bold font-black"
                      >
                        إمضاء الإعتماد والتوثيق ✓
                      </button>
                    )}
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 5: COMPANIES LIST */}
        {activeTab === "companies" && (
          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/85 shadow-xl space-y-6">
            <div className="border-b border-slate-805 pb-4">
              <h3 className="text-xs font-black text-slate-100 flex items-center gap-1.5">
                <Building className="w-5 h-5 text-cyan-400" />
                <span>سجل المنشئات والمؤسسات الاقتصادية والشركاء الاقتصاديين</span>
              </h3>
              <p className="text-[10.5px] text-slate-500 mt-1">
                تتبع الرموز الصناعية والاحتياج ونظام العمل الجغرافي المسجل للأوعية الوظيفية.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {AVAILABLE_ENTERPRISES.map((e) => (
                <div key={e.id} className="bg-slate-950 p-5 rounded-xl border border-slate-850 space-y-4 text-right">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-2xl">
                        {e.logo}
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-202">{e.name}</h4>
                        <span className="text-[9.5px] text-slate-500">{e.industry}</span>
                      </div>
                    </div>
                    <span className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[9px] font-mono px-2.5 py-0.5 rounded-full font-bold">
                      {e.workMode}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-[10px] text-slate-400 pt-3 border-t border-slate-900 font-semibold">
                    <div>
                      <span className="text-slate-550 block">مقر النشاط الفعلي:</span>
                      <strong className="text-slate-300 block mt-0.5">{e.location}</strong>
                    </div>
                    <div>
                      <span className="text-slate-550 block">سقف الأجور المعروض:</span>
                      <strong className="text-cyan-400 block mt-0.5 font-mono">{e.offeredMaxSalary.toLocaleString("ar-DZ")} دج</strong>
                    </div>
                  </div>

                  <div className="space-y-1 block">
                    <span className="text-[9.5px] text-slate-500 font-bold block mb-1">بيئة التطوير والوعاء التقني (Tech Stack):</span>
                    <div className="flex flex-wrap gap-1">
                      {e.techStack.map((skill, i) => (
                        <span key={i} className="bg-slate-900 border border-slate-900 text-slate-400 px-2 py-0.5 rounded text-[8.5px] font-mono">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-900/60 p-2 text-center text-[9px] text-slate-500 rounded border border-slate-900">
                    * رمز السجل التجاري الموحد: DZ.COM.{e.id.toUpperCase()}.2026
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 6: JOBS MANAGEMENT & CREATIVE PORT POSTING MAP */}
        {activeTab === "jobs" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Create Job Node Form (5 cols) */}
            <div className="lg:col-span-5 bg-slate-900/60 p-6 rounded-2xl border border-slate-800/85 shadow-xl space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <Briefcase className="w-5 h-5 text-cyan-400" />
                <h3 className="text-xs font-black text-slate-205">نشر منصب وتطعيم الوعاء الوظيفي للمنطقة</h3>
              </div>

              <p className="text-[10.5px] text-slate-400">
                أدخل معارير واحتياج الشريك الاقتصادي. سيتولى المترجم التلقائي للذكاء تفكيك البنية واقتراح مطابقات الباحثين فوراً:
              </p>

              <form onSubmit={handleAddNewJobNode} className="space-y-3.5">
                
                <div className="space-y-1 block">
                  <label className="text-[9.5px] font-black text-slate-450 block">المسمى والرمز المهني المطلوب:</label>
                  <input
                    type="text" value={newJobTitle} onChange={(e) => setNewJobTitle(e.target.value)}
                    placeholder="مثال: مهندس بيانات، مطور بيئات سحابية..."
                    className="w-full text-xs font-bold text-slate-200 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-right"
                  />
                </div>

                <div className="space-y-1 block">
                  <label className="text-[9.5px] font-black text-slate-450 block">المؤسسة الصاحبة (الراعية للشغل):</label>
                  <input
                    type="text" value={newJobCompany} onChange={(e) => setNewJobCompany(e.target.value)}
                    placeholder="مثال: سوناطراك الغربية، برمجيات الغرب الأكاديمية..."
                    className="w-full text-xs font-bold text-slate-200 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-right"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  <div className="space-y-1 block col-span-1">
                    <label className="text-[9.5px] font-black text-slate-450 block">ولاية التوظيف:</label>
                    <select
                      value={newJobLocation} onChange={(e) => setNewJobLocation(e.target.value)}
                      className="w-full text-xs bg-slate-950 border border-slate-805 text-slate-200 p-2.5 rounded-lg text-right"
                    >
                      <option value="تلمسان">ولاية تلمسان</option>
                      <option value="وهران">ولاية وهران</option>
                      <option value="الجزائر العاصمة">الجزائر العاصمة</option>
                    </select>
                  </div>
                  <div className="space-y-1 block col-span-1">
                    <label className="text-[9.5px] font-black text-slate-455 block">الأجر المقدر شهرياً:</label>
                    <input
                      type="text" value={newJobSalary} onChange={(e) => setNewJobSalary(e.target.value)}
                      className="w-full text-xs text-slate-200 bg-slate-950 border border-slate-805 rounded-lg p-2.5 text-right"
                    />
                  </div>
                </div>

                <div className="space-y-1 block">
                  <label className="text-[9.5px] font-black text-slate-450 block">توقيع المهارات والشواهد المطلوبة (بالفاصلة):</label>
                  <input
                    type="text" value={newJobSkills} onChange={(e) => setNewJobSkills(e.target.value)}
                    placeholder="React, SQL, Python"
                    className="w-full text-xs text-slate-200 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-right font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-cyan-505 bg-cyan-500 text-slate-950 text-xs font-black rounded-lg transition-all"
                >
                  حفظ ونشر المناصب تلقائياً ⚡
                </button>

              </form>
            </div>

            {/* Existing jobs list (7 cols) */}
            <div className="lg:col-span-7 bg-slate-900/60 p-6 rounded-2xl border border-slate-800/85 shadow-xl space-y-4">
              <div className="border-b border-slate-850 pb-3 flex justify-between items-center">
                <h3 className="text-xs font-black text-slate-100">سجل الوظائف الفيدرالية المتاحة للباحثين عن شغل</h3>
                <span className="text-[9px] text-slate-500 font-mono">ACTIVE POSITIONS INDEPENDENT</span>
              </div>

              <div className="space-y-3.5 max-h-[420px] overflow-y-auto">
                {JOBS_DEMO.map((j) => (
                  <div key={j.id} className="p-4 bg-slate-950/80 border border-slate-850 rounded-xl space-y-3 text-right">
                    <div className="flex justify-between items-start">
                      <div className="space-y-0.5">
                        <span className="bg-slate-900 border border-slate-850 text-slate-400 text-[8.5px] font-black px-2 py-0.5 rounded font-mono">
                          JOB_ID: {j.id.toUpperCase()}
                        </span>
                        <h4 className="text-xs font-black text-white mt-1">{j.title}</h4>
                        <span className="text-[9.5px] text-slate-500 font-semibold">{j.company} — {j.location}</span>
                      </div>
                      <span className="text-sm font-mono font-black text-cyan-405">
                        {j.salary}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-[10px] pt-1.5 border-t border-slate-900">
                      <span className="text-slate-500 font-bold">معدل مواءمة الباحثين العام للمنصب:</span>
                      <span className="px-2 py-0.5 bg-emerald-900/10 border border-emerald-805/30 text-emerald-400 rounded font-bold font-mono">
                        ملاءمة قصوى {j.matchingScore}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 7: ALERT SYSTEMS LOG (EARLY WARNING) */}
        {activeTab === "alerts" && (
          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/85 shadow-xl space-y-6">
            <div className="flex justify-between items-center border-b border-slate-805 pb-4">
              <div>
                <h3 className="text-xs font-black text-rose-455 flex items-center gap-1.5 animate-pulse">
                  <ShieldAlert className="w-5 h-5" />
                  <span>محرك الكشف والإنذار المبكر واستشعار الشذوذات الجغرافية</span>
                </h3>
                <p className="text-[10.5px] text-slate-500 mt-1">
                  نظام الأمان اللحظي الوقائي لرصد الفروق الهيكلية السكينة، احتيال الشواهد، وتباينات أسقف عرض الأجور.
                </p>
              </div>
              <button
                onClick={() => {
                  const items = [
                    { title: "محاولات مكررة لولوج قواعد البيانات", desc: "تم رصد 12 طلباً ببروتوكولات وصول غير صالحة من ولاية وهران.", severity: "high" },
                    { title: "تباين حاد في الأجور المعروضة ( React)", desc: "سكان تلمسان المؤهلين يطلبون معدلات أجور تتجاوز المعروض بـ 28% لاسيما حديثي التخرج.", severity: "medium" }
                  ];
                  const sel = items[Math.floor(Math.random() * items.length)];
                  setAnomalies(prev => [
                    { id: `an-${Date.now()}`, title: sel.title, description: sel.desc, severity: sel.severity, timestamp: "الآن", resolved: false },
                    ...prev
                  ]);
                  addLog(`[سجل الأمان] تمّ توليد تحذير حركي جديد قيد المراقبة.`);
                }}
                className="px-3.5 py-1.5 bg-rose-950/40 text-rose-300 border border-rose-800 text-[10px] font-black rounded-lg transition-colors"
              >
                اصطناع تحذير جديد للمجرب 🛠️
              </button>
            </div>

            <div className="space-y-4">
              {anomalies.map((an) => {
                let colorClass = "border-slate-800 bg-slate-950/60";
                let badgeNode = null;
                if (an.resolved) {
                  colorClass = "border-slate-900 bg-slate-950/20 opacity-60";
                  badgeNode = <span className="bg-slate-900 text-slate-500 px-2 py-0.5 rounded text-[8.5px] font-bold">تم العزل بنجاح ✓</span>;
                } else {
                  if (an.severity === "high") {
                    colorClass = "border-rose-905 bg-rose-950/5 text-slate-201 animate-hover-pulse";
                    badgeNode = <span className="bg-rose-900/30 border border-rose-500/40 text-rose-450 px-2.5 py-0.5 rounded text-[8.5px] font-black animate-pulse">حظر حرج حتمي 🛑</span>;
                  } else {
                    colorClass = "border-amber-905 bg-amber-950/5";
                    badgeNode = <span className="bg-amber-900/30 border border-amber-500/40 text-amber-400 px-2.5 py-0.5 rounded text-[8.5px] font-black">تحذير متوسط الأهمية ⚠️</span>;
                  }
                }

                return (
                  <div key={an.id} className={`p-5 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-right transition-all ${colorClass}`}>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        {badgeNode}
                        <h4 className={`text-xs font-black ${an.resolved ? "text-slate-500 line-through" : "text-white"}`}>
                          {an.title}
                        </h4>
                        <span className="text-[9.5px] text-slate-500 font-mono font-bold">({an.timestamp})</span>
                      </div>
                      <p className="text-[10.5px]/relaxed text-slate-400/95 max-w-2xl font-semibold">
                        {an.description}
                      </p>
                    </div>

                    {!an.resolved && (
                      <button
                        type="button"
                        onClick={() => resolveAnomaly(an.id, an.title)}
                        className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-cyan-400 text-[10px] font-black rounded-lg border border-slate-800 transition-colors shrink-0"
                      >
                        إجراء تصفير وعزل الخطر
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 8: POLICY SETTINGS & FEDERAL COGNITIVE CONTROLS */}
        {activeTab === "settings" && (
          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/85 shadow-xl space-y-6">
            <div className="border-b border-slate-805 pb-4">
              <h3 className="text-xs font-black text-slate-100 flex items-center gap-1.5">
                <Settings className="w-5 h-5 text-cyan-400" />
                <span>إعدادات سياسة التشغيل الفيدرالية والموثوقية الوطنية</span>
              </h3>
              <p className="text-[10.5px] text-slate-500 mt-1">تعديل لوائح التدقيق الحاكم للربط البيني لحماية البيانات واستمرارية كادر التعليم.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-slate-950 p-6 rounded-xl border border-slate-850 space-y-4 text-right">
                <h4 className="text-xs font-black text-white border-b border-slate-900 pb-2 flex items-center gap-1.5">
                  <Database className="w-4 h-4 text-cyan-400" />
                  <span>معايير أولوية الملاءمة الإقليمية</span>
                </h4>
                
                <p className="text-[10.5px]/relaxed text-slate-400 font-semibold">
                  عند تنشيط هذا المعيار، ستقوم مصفوفة المطابقة تلقائياً بالتحقق من مقر الساق (مثلاً تلمسان أو وهران) ومنح الباحث الساكن في ذات حيز الشبل أفضلية مضافة تبلغ 25% مع تقليص ترتيب المقيمين خارج النطاق الفعلي تعزيزاً للاستقرار.
                </p>

                <div className="flex justify-between items-center pt-3 border-t border-slate-900 text-[10.5px]">
                  <span className="text-slate-350">حالة السياسة الإقليمية:</span>
                  <button
                    type="button" onClick={() => togglePolicy("localPriority")}
                    className={`px-3 py-1.5 rounded-lg text-[9.5px] font-black border transition-all ${
                      policies.localPriority ? "bg-cyan-500/10 border-cyan-500 text-cyan-405" : "bg-slate-900 border-slate-800 text-slate-450"
                    }`}
                  >
                    {policies.localPriority ? "نشط ومفعل" : "معطل حالياً"}
                  </button>
                </div>
              </div>

              <div className="bg-slate-950 p-6 rounded-xl border border-slate-850 space-y-4 text-right">
                <h4 className="text-xs font-black text-white border-b border-slate-900 pb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-450" />
                  <span>سياسة التدقيق الأكاديمي والتحققات الإلزامية</span>
                </h4>
                
                <p className="text-[10.5px]/relaxed text-slate-400 font-semibold">
                  تحمي هذه السياسة الوعاء من ملفات السير الذاتية المشبوهة أو الغير موثقة. تمنع الخوارزمية كلياً إتمام وحفظ أي بروتوكول مطابقة أو ارتباط مع الشركات طالما ظل ملف الباحث يحمل حالة "قيد الفرز التلقائي" للشهادة الجامعية.
                </p>

                <div className="flex justify-between items-center pt-3 border-t border-slate-900 text-[10.5px]">
                  <span className="text-slate-350">حالة التدقيق الأكاديمي الإلزامي:</span>
                  <button
                    type="button" onClick={() => togglePolicy("academicVerificationRequired")}
                    className={`px-3 py-1.5 rounded-lg text-[9.5px] font-black border transition-all ${
                      policies.academicVerificationRequired ? "bg-cyan-500/10 border-cyan-500 text-cyan-405" : "bg-slate-900 border-slate-800 text-slate-450"
                    }`}
                  >
                    {policies.academicVerificationRequired ? "نشط ومفعل" : "معطل حالياً"}
                  </button>
                </div>
              </div>

              <div className="bg-slate-950 p-6 rounded-xl border border-slate-850 space-y-4 text-right md:col-span-2">
                <h4 className="text-xs font-black text-white border-b border-slate-900 pb-2 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-rose-500" />
                  <span>بروتوكول المصادقة السيادية المزدوجة 🇩🇿 (Sovereign Dual Sign)</span>
                </h4>
                
                <p className="text-[10.5px]/relaxed text-slate-405 font-semibold">
                  يؤمن هذا الخيار عمليات الربط وتصدير كشوف كفاءات ومهام الباحثين المواءمة إلى قواعد الوزارة عن طريق تشفير ثنائي الاتجاه بالهوية الوطنية والختم الرقمي الموحد لإثبات النزاهة وحماية البيانات من الاختراقات.
                </p>

                <div className="flex justify-between items-center pt-3 border-t border-slate-900 text-[10.5px]">
                  <span className="text-slate-350">حالة المصادقة الثنائية السيادية:</span>
                  <button
                    type="button" onClick={() => togglePolicy("doubleSovereignStampRequired")}
                    className={`px-3 py-1.5 rounded-lg text-[9.5px] font-black border transition-all ${
                      policies.doubleSovereignStampRequired ? "bg-cyan-500/10 border-cyan-500 text-cyan-405 animate-pulse" : "bg-slate-900 border-slate-800 text-slate-450"
                    }`}
                  >
                    {policies.doubleSovereignStampRequired ? "نشط ومفعل 🔒" : "معطل حالياً"}
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* 5. INTERACTIVE FOCUS CELL DETAIL MODAL Overlay */}
      {focusedCell && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-2xl max-w-md w-full text-right space-y-5 animate-scale-up">
            
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-xs font-black text-cyan-400">تفاصيل مضاهاة مصفوقة المطابقة</h3>
              <button 
                onClick={() => setFocusedCell(null)}
                className="text-slate-450 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Custom info items representation */}
            {(() => {
              const candidate = AVAILABLE_CANDIDATES[focusedCell.candidateIdx % AVAILABLE_CANDIDATES.length];
              const jobNode = JOBS_DEMO[focusedCell.jobIdx % JOBS_DEMO.length];
              const score = focusedCell.score;

              return (
                <div className="space-y-4">
                  <div className="space-y-1 text-xs">
                    <span className="text-[10px] text-slate-500 block">المترشح الأكاديمي الحركي:</span>
                    <strong className="text-white font-black">{candidate.name} ({candidate.location})</strong>
                    <span className="text-[10px] text-slate-400 block truncate font-mono">الجامعة: {candidate.academy}</span>
                  </div>

                  <div className="space-y-1 text-xs">
                    <span className="text-[10px] text-slate-500 block">المنصب الاقتصادي المقابل للشركة:</span>
                    <strong className="text-white font-black">{jobNode.title} — {jobNode.company}</strong>
                    <span className="text-[10px] text-slate-400 block font-mono">الراتب المعروض الصافي: {jobNode.salary}</span>
                  </div>

                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-850 flex justify-between items-center">
                    <span className="text-[10.5px] text-slate-400">درجة التوافق والملاءمة المحسوبة:</span>
                    <span className="text-lg font-mono font-black text-cyan-400">{score}%</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        // Check verification policy
                        if (policies.academicVerificationRequired && !candidate.verified) {
                          alert("فشل تنشيط الربط! شهادة المترشح غير موثقة مع سياسة التدقيق الأكاديمي النشطة.");
                          return;
                        }

                        // Save Linkage
                        const linkExists = fileLinkages.some(lnk => lnk.candidateEmail === candidate.email && lnk.targetEnterprise === jobNode.company);
                        if (linkExists) {
                          alert("هذا الارتباط منشط مسبقاً في مصفوفة النظام.");
                          return;
                        }

                        const newLnk: FileLinkage = {
                          id: Date.now(),
                          candidateName: candidate.name,
                          candidateEmail: candidate.email,
                          academySource: candidate.academy,
                          targetEnterprise: jobNode.company,
                          matchScore: score,
                          priority: "medium",
                          status: "linked",
                          timestamp: new Date().toLocaleDateString("ar-DZ")
                        };
                        setFileLinkages(prev => [newLnk, ...prev]);
                        addLog(`[مواءمة مصفوفية] تم تفعيل المضاهاة لـ [${candidate.name}] بنجاح.`);
                        alert("تم إدراج الارتباط وتنسيق تدفق العمل للأطراف بنجاح!");
                        setFocusedCell(null);
                      }}
                      className="flex-1 py-2 px-3 bg-cyan-500 text-slate-950 font-black text-xs rounded-xl transition-all hover:scale-[1.01]"
                    >
                      تنشيط هذا التوافق والربط المتبادل 🏁
                    </button>
                    <button
                      type="button" onClick={() => setFocusedCell(null)}
                      className="py-2 px-4 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold rounded-xl"
                    >
                      إلغاء النافذة
                    </button>
                  </div>
                </div>
              );
            })()}

          </div>
        </div>
      )}

    </div>
  );
}
