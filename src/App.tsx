import React, { useState, useEffect } from "react";
import { translations, AutoTranslate } from "./translations";
import {
  Briefcase,
  Bot,
  Brain,
  GraduationCap,
  Scale,
  Sparkles,
  MapPin,
  TrendingUp,
  FileText,
  Search,
  ExternalLink,
  ChevronLeft,
  Sliders,
  Award,
  Globe,
  PlusCircle,
  HelpCircle,
  Users,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Shield,
  Building,
  User,
  Check,
  ChevronRight,
  Database,
  LayoutDashboard,
  BookOpen,
  MessageSquare,
  Trophy,
  Activity,
  History,
  Settings,
  X,
  Folder,
  FolderOpen,
  Clock,
  Bell,
  Calendar,
  QrCode
} from "lucide-react";
import SkillRadar from "./components/SkillRadar";
import CareerAdvisor from "./components/CareerAdvisor";
import MockInterview from "./components/MockInterview";
import UniversityPlanner from "./components/UniversityPlanner";
import SovereignTools from "./components/SovereignTools";
import CandidateDashboard from "./components/CandidateDashboard";
import CandidateRoadmap from "./components/CandidateRoadmap";
import CandidateReports from "./components/CandidateReports";
import CareerAssessment from "./components/CareerAssessment";
import MeritTimeline from "./components/MeritTimeline";
import CompanyDashboardComponent from "./components/CompanyDashboardComponent";
import CompanyCandidatesList from "./components/CompanyCandidatesList";
import CompanyComparisonTable from "./components/CompanyComparisonTable";
import CompanySkillsGaps from "./components/CompanySkillsGaps";
import CompanyHRIntelligence from "./components/CompanyHRIntelligence";
import DocumentScanner from "./components/DocumentScanner";
import PortalLoginView from "./components/PortalLoginView";
import AdminDashboard from "./components/AdminDashboard";
import PortalSideFilter from "./components/PortalSideFilter";
import { CandidateProfile, Job } from "./types";

export function TrackLogo({ className = "w-10 h-10", interactive = false }: { className?: string; interactive?: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className={`${className} ${interactive ? 'hover:scale-105 transition-transform duration-300' : ''}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Search handle - Orange */}
      <rect x="23" y="65" width="10" height="26" rx="5" transform="rotate(-45 23 65)" fill="#c2410c" />
      <rect x="25" y="63" width="8" height="24" rx="4" transform="rotate(-45 25 63)" fill="#e07a1b" />
      <rect x="27" y="61" width="4" height="22" rx="2" transform="rotate(-45 27 61)" fill="#f59e0b" />
      
      {/* Outer magnifying ring - Blue */}
      <circle cx="56" cy="40" r="28" stroke="#0052cc" strokeWidth="6.5" fill="#fcfcfd" />
      {/* Inner dotted highlight ring */}
      <circle cx="56" cy="40" r="24" stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="3 3" />
      
      {/* Orange arrow sweeping up and out */}
      <path d="M 54 48 Q 68 45 84 20" stroke="#f97316" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      <path d="M 84 20 L 72 20 M 84 20 L 84 32" stroke="#ea580c" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* Left blue avatar */}
      <circle cx="44" cy="44" r="4.2" fill="#2563eb" />
      <path d="M 38 55 C 38 50 41 48 44 48 C 47 48 50 50 50 55 Z" fill="#2563eb" />
      
      {/* Right blue avatar */}
      <circle cx="68" cy="44" r="4.2" fill="#2563eb" />
      <path d="M 62 55 C 62 50 65 48 68 48 C 71 48 74 50 74 55 Z" fill="#2563eb" />
      
      {/* Main orange avatar in the center */}
      <circle cx="56" cy="39" r="6" fill="#f97316" />
      <path d="M 48 55 C 48 47 52 44 56 44 C 60 44 64 47 64 55 Z" fill="#f97316" />
      {/* Little white tie */}
      <path d="M 56 44 L 54.5 48 L 56 52 L 57.5 48 Z" fill="#ffffff" />
      
      {/* Building icon block in the top right perspective */}
      <path d="M 72 14 H 78 V 28 H 72 Z" fill="#1e3a8a" />
      <path d="M 78 10 H 84 V 28 H 78 Z" fill="#1e293b" />
      <circle cx="75" cy="18" r="0.7" fill="#ffffff" />
      <circle cx="75" cy="22" r="0.7" fill="#ffffff" />
      <circle cx="81" cy="14" r="0.7" fill="#ffffff" />
      <circle cx="81" cy="18" r="0.7" fill="#ffffff" />
      <circle cx="81" cy="22" r="0.7" fill="#ffffff" />
    </svg>
  );
}

export default function App() {
  const [currentPerspective, setCurrentPerspective] = useState<"landing" | "candidate" | "company" | "university" | "sovereign" | "admin">("landing");
  const [lang, setLang] = useState<"ar" | "en" | "fr">("ar");
  const [theme, setTheme] = useState<"standard" | "dark" | "high-contrast">("standard");
  const [showSettingsDropdown, setShowSettingsDropdown] = useState<boolean>(false);

  // Shared state for smart cross-portal filtering and under-the-hood linkages
  const [selectedSkill, setSelectedSkill] = useState<string>("All");
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [sovereignOnly, setSovereignOnly] = useState<boolean>(false);

  // Unified Multi-Door Login Sessions State
  const [sessions, setSessions] = useState<Record<string, { loggedIn: boolean; name: string; email: string; org?: string }>>({
    candidate: { loggedIn: false, name: "", email: "", org: "" },
    company: { loggedIn: false, name: "", email: "", org: "" },
    university: { loggedIn: false, name: "", email: "", org: "" },
    sovereign: { loggedIn: false, name: "", email: "", org: "" },
    admin: { loggedIn: false, name: "", email: "", org: "" },
  });

  // Dedicated Admin Linking / Bridging Database
  const [fileLinkages, setFileLinkages] = useState([
    {
      id: 1,
      candidateName: "أحمد بن علي",
      candidateEmail: "ahmed@jadarati.dz",
      academySource: "جامعة أبي بكر بلقايد - تلمسان",
      targetEnterprise: "مؤسسة تلمسان للحلول الرقمية",
      matchScore: 96,
      priority: "high",
      status: "linked",
      timestamp: "منذ ساعتين",
    },
    {
      id: 2,
      candidateName: "سليمان قادري",
      candidateEmail: "s.qadri@outlook.com",
      academySource: "المركز الجامعي بمغنية",
      targetEnterprise: "شركة سوناطراك - فرع تلمسان",
      matchScore: 84,
      priority: "medium",
      status: "pending",
      timestamp: "منذ 4 ساعات",
    },
    {
      id: 3,
      candidateName: "فاطمة زهراء بومدين",
      candidateEmail: "f.boumediene@gmail.com",
      academySource: "جامعة العلوم والتكنولوجيا وهران (USTO)",
      targetEnterprise: "بريد الجزائر الوطني",
      matchScore: 78,
      priority: "low",
      status: "paused",
      timestamp: "منذ يوم واحد",
    },
    {
      id: 4,
      candidateName: "ياسين حداد",
      candidateEmail: "y.hadad@esi.dz",
      academySource: "المدرسة العليا للإعلام الآلي (ESI)",
      targetEnterprise: "شريك الاتصالات أوريدو",
      matchScore: 91,
      priority: "high",
      status: "matched",
      timestamp: "منذ يومين",
    }
  ]);

  // Global Linking Policy Toggles for Admin and Sovereign Governance
  const [policies, setPolicies] = useState({
    localPriority: true,
    academicVerificationRequired: true,
    doubleSovereignStampRequired: false,
  });

  // Admin and systemic audit logs
  const [adminLogs, setAdminLogs] = useState<string[]>([
    "النظام نشط وجاهز للربط الفيدرالي الموحد المعزز بمرجع القرار الوزاري.",
    "قامت مؤسسة تلمسان للحلول الرقمية بطلب مزامنة ملف الباحث 'أحمد بن علي'.",
    "تم التحقق بنجاح من الشاهد الأكاديمي الرقمي الرقم #182931 من جامعة تلمسان.",
    "المرصد الوطني للتشغيل بوزارة العمل يدرج مؤشرات الطلب الفورية لمنطقة مغنية وتلمسان الحدودية."
  ]);

  const t = (key: keyof typeof translations["ar"]): string => {
    return translations[lang][key] || translations["ar"][key];
  };

  const [candidateSubTab, setCandidateSubTab] = useState<"dashboard" | "radar" | "jobs" | "vault" | "career" | "advisor" | "learning" | "interview" | "reports" | "assessment" | "timeline">("dashboard");
  const [certTitleInput, setCertTitleInput] = useState("");
  const [certIssuerInput, setCertIssuerInput] = useState("");
  const [certSpecialtyInput, setCertSpecialtyInput] = useState("علوم الحاسوب وتطوير الويب");
  const [certExpiryDateInput, setCertExpiryDateInput] = useState("");
  const [selectedFolder, setSelectedFolder] = useState<string>("all");
  const [verifyingCertId, setVerifyingCertId] = useState<number | null>(null);
  const [expandedCertId, setExpandedCertId] = useState<number | null>(1);
  const [companySubTab, setCompanySubTab] = useState<"dashboard" | "candidates" | "comparison" | "skills" | "intelligence text-right">("dashboard");

  // Certificate Sharing & Employer Portal States
  const [selectedCertsToShare, setSelectedCertsToShare] = useState<number[]>([]);
  const [generatedShareLink, setGeneratedShareLink] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [activeQrCertId, setActiveQrCertId] = useState<number | null>(null);
  const [isEmployerAccessSimulation, setIsEmployerAccessSimulation] = useState<boolean>(false);
  const [simulatedCertsForEmployer, setSimulatedCertsForEmployer] = useState<number[]>([]);

  // Proactive opportunity alert states
  const [isOpportunityAlertActive, setIsOpportunityAlertActive] = useState<boolean>(true);
  const [browserNotificationPermission, setBrowserNotificationPermission] = useState<string>(
    typeof window !== "undefined" && "Notification" in window ? Notification.permission : "default"
  );
  const [activeOpportunityToast, setActiveOpportunityToast] = useState<{
    id: number;
    title: string;
    company: string;
    match: number;
    location: string;
    salary: string;
  } | null>(null);
  const [opportunityAlertLogs, setOpportunityAlertLogs] = useState<Array<{
    id: number;
    title: string;
    company: string;
    match: number;
    location: string;
    timestamp: string;
  }>>([
    {
      id: 1001,
      title: "Senior Full-Stack Developer",
      company: "برمجيات الغرب الأكاديمية",
      location: "تلمسان، الجزائر",
      match: 94,
      timestamp: "منذ دقيقتين"
    }
  ]);

  // Dynamic Profile State
  const [profile, setProfile] = useState<CandidateProfile>({
    name: "أحمد بن علي",
    title: "مطور برمجيات Full-Stack",
    salaryExpectation: "200,000 دج",
    location: "تلمسان، الجزائر",
    education: "ماستر في هندسة البرمجيات - المركز الجامعي بمغنية",
    meritScore: 82,
    tier: "Tier 1",
    skills: {
      "البرمجيات": 85,
      "تحليل البيانات": 78,
      "حل المشكلات": 90,
      "التواصل": 72,
      "العمل الجماعي": 88,
      "إدارة الوقت": 65,
      "القيادة": 60,
      "الإبداع": 75
    },
    certificates: [
      { id: 1, title: "شهادة تحليل البيانات بكفاءة عالية", issuer: "مركز تلمسان الرقمي", date: "2026-02-15", verified: true, specialty: "ذكاء الأعمال وتحليل البيانات", expiryDate: "2026-06-28" },
      { id: 2, title: "شهادة تطوير تطبيقات الويب المتكاملة", issuer: "جامعة مغنية (القرار الوزاري)", date: "2026-03-10", verified: true, specialty: "علوم الحاسوب وتطوير الويب", expiryDate: "2027-03-10" },
      { id: 3, title: "شهادة أساسيات الأمن السيبراني والشبكات", issuer: "مديرية الاتصالات الجزائرية", date: "2026-04-05", verified: true, specialty: "الأمن السيبراني والشبكات", expiryDate: "2026-07-05" }
    ],
    experiences: [
      { id: 1, role: "مطور ويب متدرب", company: "DZ Software (تلمسان)", duration: "6 أشهر", desc: "تطوير واجهات المستخدم وتحسين قواعد البيانات المشتركة" }
    ]
  });

  // Dynamic Jobs list
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: 1,
      title: "Full Stack Developer",
      company: "شركة تكنو الجزائر",
      location: "الجزائر العاصمة / تلمسان",
      type: "دوام كامل",
      salary: "250,000 - 350,000 دج",
      posted: "منذ يومين",
      skills: ["React", "TypeScript", "Node.js", "PostgreSQL"],
      match: 94,
      description: "مطلوب مطور واجهات متكاملة متمكن للعمل على تطوير البنى التحتية لمنصات التشغيل المشترك مع الهيئات الوطنية."
    },
    {
      id: 2,
      title: "مهندس ذكاء اصطناعي وعالم بيانات",
      company: "مؤسسة الذكاء المتقدم",
      location: "وهران",
      type: "دوام كامل",
      salary: "400,000 - 450,000 دج",
      posted: "منذ 3 أيام",
      skills: ["Python", "TensorFlow", "Machine Learning", "PyTorch"],
      match: 82,
      description: "البحث عن مهندس متميز في نماذج التعلم الآلي ومعالجة اللغة الطبيعية لدعم نظام الفرز والتحليل الإحصائي للبيانات."
    },
    {
      id: 3,
      title: "محلل بيانات مالي",
      company: "بنك الجزائر الرقمي",
      location: "قسنطينة",
      type: "دوام كامل",
      salary: "200,000 - 280,000 دج",
      posted: "منذ 5 أيام",
      skills: ["SQL", "Power BI", "Excel", "Data Mining"],
      match: 78,
      description: "العمل على مراقبة مؤشرات الأداء وجرد الثغرات المهارية للباحثين عن العمل وتقديم تقارير استباقية."
    },
    {
      id: 4,
      title: "مهندس DevOps والأنظمة",
      company: "Global Tech Solutions",
      location: "الجزائر العاصمة",
      type: "عقد عمل",
      salary: "220,000 - 320,000 دج",
      posted: "منذ أسبوع",
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
      match: 60,
      description: "إعداد بيئات التطوير المستمر والحوسبة السحابية وحماية منصات التشغيل البيني مع الوزارة."
    }
  ]);

  // Recalculate merit index and job matches dynamically when skills update
  const handleUpdateSkill = (key: string, value: number) => {
    setProfile((prev) => {
      const updatedSkills = { ...prev.skills, [key]: value };
      const vals = Object.values(updatedSkills) as number[];
      const avg = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
      return {
        ...prev,
        skills: updatedSkills,
        meritScore: avg,
        tier: avg >= 80 ? "Tier 1" : avg >= 65 ? "Tier 2" : "Tier 3"
      };
    });
  };

  const handleUpdateAllSkills = (newSkills: Record<string, number>) => {
    setProfile((prev) => {
      const vals = Object.values(newSkills) as number[];
      const avg = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
      return {
        ...prev,
        skills: newSkills,
        meritScore: avg,
        tier: avg >= 80 ? "Tier 1" : avg >= 65 ? "Tier 2" : "Tier 3"
      };
    });
  };

  // Recalculate Job Matches in real-time
  useEffect(() => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => {
        // Simple interactive match calculation based on Candidate's modified skills
        let baseMatch = 50;
        if (job.title.toLowerCase().includes("stack")) {
          // React/Node/TS focus
          baseMatch = Math.round((profile.skills["البرمجيات"] + profile.skills["حل المشكلات"] + profile.skills["العمل الجماعي"]) / 3);
        } else if (job.title.toLowerCase().includes("ذكاء") || job.title.toLowerCase().includes("بيانات")) {
          // Data focus
          baseMatch = Math.round((profile.skills["تحليل البيانات"] + profile.skills["حل المشكلات"] + profile.skills["الإبداع"]) / 3);
        } else if (job.title.toLowerCase().includes("devops")) {
          // Infrastructure focus
          baseMatch = Math.round((profile.skills["البرمجيات"] + profile.skills["إدارة الوقت"] + profile.skills["حل المشكلات"]) / 3);
        }
        return {
          ...job,
          match: Math.min(99, Math.max(45, baseMatch + 8))
        };
      })
    );
  }, [profile.skills]);

  // Check for shared certificates in URL query parameters (Real-time employer verification link parsing)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const sharedCertsParam = params.get("shared_certs");
      if (sharedCertsParam) {
        const certIds = sharedCertsParam.split(",").map(Number).filter(Boolean);
        if (certIds.length > 0) {
          setSimulatedCertsForEmployer(certIds);
          setIsEmployerAccessSimulation(true);
          console.log("Sovereign Verified Employer Link accessed. Loaded certificate IDs:", certIds);
        }
      }
    }
  }, []);

  // Helper for date difference (Intelligent Proactive Archiving Countdown)
  const getDaysUntilExpiry = (expiryStr?: string) => {
    if (!expiryStr) return null;
    const today = new Date("2026-06-10"); // fixed current system date
    const expiry = new Date(expiryStr);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Helper to calculate job match percentage dynamically
  const calculateJobMatch = (title: string, skillsMap: { [key: string]: number }) => {
    let baseMatch = 50;
    const t = title.toLowerCase();
    if (t.includes("stack") || t.includes("برمجيات") || t.includes("ويب") || t.includes("developer") || t.includes("web") || t.includes("برمجة")) {
      baseMatch = Math.round(((skillsMap["البرمجيات"] || 50) + (skillsMap["حل المشكلات"] || 50) + (skillsMap["العمل الجماعي"] || 50)) / 3);
    } else if (t.includes("ذكاء") || t.includes("بيانات") || t.includes("data") || t.includes("ai") || t.includes("analyst") || t.includes("تحليل")) {
      baseMatch = Math.round(((skillsMap["تحليل البيانات"] || 50) + (skillsMap["حل المشكلات"] || 50) + (skillsMap["الإبداع"] || 50)) / 3);
    } else if (t.includes("devops") || t.includes("أنظمة") || t.includes("سحابية") || t.includes("network") || t.includes("system") || t.includes("بنية")) {
      baseMatch = Math.round(((skillsMap["البرمجيات"] || 50) + (skillsMap["إدارة الوقت"] || 50) + (skillsMap["حل المشكلات"] || 50)) / 3);
    } else {
      baseMatch = Math.round(((skillsMap["التواصل"] || 50) + (skillsMap["إدارة الوقت"] || 50) + (skillsMap["العمل الجماعي"] || 50)) / 3);
    }
    return Math.min(99, Math.max(45, baseMatch + 8));
  };

  // Helper to request browser notification permission
  const handleRequestNotificationPermission = async () => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      alert("⚠️ إشعارات المتصفح غير مدعومة في بيئة العرض الحالية أو المتصفح.");
      return;
    }
    try {
      const permission = await Notification.requestPermission();
      setBrowserNotificationPermission(permission);
      if (permission === "granted") {
        new Notification("🔔 تم تفعيل التنبيه الاستباقي للفرص", {
          body: "سيرسل لك نظام جدارة تنبيهات فورية عند نشر وظائف في تلمسان بمطابقة >90%!",
          icon: "/favicon.ico"
        });
      }
    } catch (error) {
      console.warn("Notification permission error inside iframe environment:", error);
      setBrowserNotificationPermission("denied");
      alert("⚠️ تم محاكاة صلاحية الإشعارات وتفعيل النظام داخلياً بنجاح! نلاحظ أنه في بيئات عرض معينة في الإطار (iframe)، قد تطبق قيود أمان للمتصفح.");
    }
  };

  // Handler to trigger the proactive notification alerts
  const triggerProactiveOpportunityAlert = (job: Job) => {
    // 1. Add alert to historical logs
    setOpportunityAlertLogs((prev) => [
      {
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        match: job.match,
        timestamp: "الآن"
      },
      ...prev
    ]);

    // 2. Dispatch native browser Notification if granted
    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
      try {
        new Notification(`💼 فرصة عمل تلمسان المطابقة (${job.match}%)!`, {
          body: `مطلوب فوراً ${job.title} في شركة ${job.company}! نقرة للتقديم.`,
          icon: "/favicon.ico"
        });
      } catch (e) {
        console.warn("Standard push notification blocked by sandbox, falling back to In-App system:", e);
      }
    }

    // 3. Audio notification simulation (Bip-Chime)
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = "sine";
      // Arpeggio sound
      osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.12); // E5
      osc.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.24); // G5
      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
    } catch (e) {
      // Audio autoplay restrictions might block this occasionally, fail silently
    }

    // 4. Set reactive in-app toast notification
    setActiveOpportunityToast({
      id: job.id,
      title: job.title,
      company: job.company,
      match: job.match,
      location: job.location,
      salary: job.salary
    });
  };

  // Simulation handler for the user to test the feature instantly with 1-click
  const handleSimulateNewMatchingJob = () => {
    const randomJobTitles = [
      "مطور برمجيات متكاملة فوري (Full-Stack Engineer)",
      "مهندس حلول ويب متصلة (Expert Web Developer)",
      "أخصائي ذكاء اصطناعي وتحليل جدارة (AI Specialist)"
    ];
    const randomCompanies = [
      "شركة التكنولوجيا الوطنية - فرع تلمسان",
      "مكتب البرمجيات السحابية بمغنية",
      "مجموعة الابتكار الرقمي تلمسان"
    ];
    const randomSalaries = ["240,000 دج", "290,000 دج", "310,000 دج"];
    
    const title = randomJobTitles[Math.floor(Math.random() * randomJobTitles.length)];
    const company = randomCompanies[Math.floor(Math.random() * randomCompanies.length)];
    const salary = randomSalaries[Math.floor(Math.random() * randomSalaries.length)];

    // Force high skills match above 90% for testing
    const matchVal = Math.floor(Math.random() * 8) + 91; // 91% - 98%

    const simulatedJob: Job = {
      id: Date.now(),
      title: title,
      company: company,
      location: "تلمسان، الجزائر (فرصة عمل حيوية بوسط المدينة)",
      type: "دوام كامل",
      salary: salary,
      posted: "الآن",
      skills: ["React", "TypeScript", "Node.js", "حل المشكلات"],
      match: matchVal,
      description: "فرصة توظيف فورية موجهة خصيصاً للمواهب المسجلة بمنصة جدارة بتلمسان. تشمل المشروع الريادي لتأسيس نظم التكامل الوطني المشترك."
    };

    setJobs((prev) => [simulatedJob, ...prev]);

    if (isOpportunityAlertActive) {
      triggerProactiveOpportunityAlert(simulatedJob);
    } else {
      alert(`💡 تم نشر الوظيفة بنجاح (${simulatedJob.title}) بنسبة مطابقة ${simulatedJob.match}% ولكن لم يرسل التنبيه نظراً لتعطيل 'نظام التنبيهات الاستباقية' حالياً.`);
    }
  };

  // Helper to determine Verified Professional badge details dynamically based on verified certificates
  const verifiedCertsCount = profile.certificates.filter(c => c.verified).length;

  const getVerifiedProfessionalBadge = () => {
    if (verifiedCertsCount === 0) {
      return {
        label: lang === "en" ? "Verifying Professional" : lang === "fr" ? "Pro en cours" : "محترف قيد التحقق التلقائي",
        textStyle: "text-slate-500 bg-slate-50 border-slate-200",
        glowClass: "",
        icon: "⏳",
        pct: "0%"
      };
    } else if (verifiedCertsCount === 1) {
      return {
        label: lang === "en" ? "Verified Professional (Bronze)" : lang === "fr" ? "Pro Vérifié (Bronze)" : "محترف موثق (البرونزي النادر)",
        textStyle: "text-amber-805 bg-amber-50 border-amber-200",
        glowClass: "shadow-sm shadow-amber-500/10",
        icon: "🥉",
        pct: "25%"
      };
    } else if (verifiedCertsCount === 2) {
      return {
        label: lang === "en" ? "Verified Professional (Silver)" : lang === "fr" ? "Pro Vérifié (Argent)" : "محترف موثق (الفضي المعتمد)",
        textStyle: "text-slate-800 bg-slate-100 border-slate-300",
        glowClass: "shadow-sm shadow-slate-400/10",
        icon: "🥈",
        pct: "50%"
      };
    } else if (verifiedCertsCount === 3) {
      return {
        label: lang === "en" ? "Verified Professional (Gold)" : lang === "fr" ? "Pro Vérifié (Or)" : "محترف موثق (الذهبي الممتاز)",
        textStyle: "text-amber-950 bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-300",
        glowClass: "shadow-md shadow-yellow-500/10 ring-2 ring-yellow-400/20",
        icon: "🥇",
        pct: "75%"
      };
    } else {
      // 4+ verified certificates
      return {
        label: lang === "en" ? "Sovereign Elite Expert" : lang === "fr" ? "Expert Elite Souverain" : "خبير توثيق سيادي (البلاتيني المطور)",
        textStyle: "text-indigo-950 bg-gradient-to-r from-indigo-50/90 via-cyan-50/90 to-emerald-50/90 border-indigo-300",
        glowClass: "shadow-lg shadow-indigo-500/15 ring-2 ring-indigo-500/30 animate-pulse font-black",
        icon: "💎",
        pct: "100%"
      };
    }
  };

  // Add new dynamic badge issued by Academic Partner
  const handleAddCertificate = (title: string, issuer: string, expiryDate?: string, specialty?: string) => {
    setProfile((prev) => {
      // Determine score boost based on certificate magnitude
      const boostVal = title.includes("الأمن") ? 12 : title.includes("الذكاء") ? 10 : title.includes("إدارة") ? 7 : 8;
      const computedScore = Math.min(100, prev.meritScore + boostVal);
      const computedTier = computedScore >= 95 ? "Platinum Tier" : computedScore >= 80 ? "Tier 1" : "Tier 2";
      
      return {
        ...prev,
        meritScore: computedScore,
        tier: computedTier,
        certificates: [
          {
            id: prev.certificates.length + 1,
            title,
            issuer,
            date: new Date().toISOString().split("T")[0],
            verified: true,
            expiryDate: expiryDate || new Date(Date.now() + 365*24*60*60*1000).toISOString().split("T")[0],
            specialty: specialty || "علوم الحاسوب وتطوير الويب"
          },
          ...prev.certificates
        ]
      };
    });
  };

  // State to simulate listing submission by company
  const [newJobTitle, setNewJobTitle] = useState("");
  const [newJobSalary, setNewJobSalary] = useState("180,000 دج");
  const [newJobDesc, setNewJobDesc] = useState("");
  const [companyCandidateSearch, setCompanyCandidateSearch] = useState("");
  const [isAddingJob, setIsAddingJob] = useState(false);

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJobTitle.trim()) return;

    // Calculate match score dynamically based on candidate's current skills
    const computedMatch = calculateJobMatch(newJobTitle, profile.skills);

    const newJob: Job = {
      id: jobs.length + 1,
      title: newJobTitle,
      company: "المؤسسة الوطنية للخدمات",
      location: "تلمسان، الجزائر",
      type: "دوام كامل",
      salary: newJobSalary,
      posted: "الآن",
      skills: ["React", "Python", "SQL"],
      match: computedMatch,
      description: newJobDesc || "عمل فوري للتحقق من الملاءمة العامة."
    };

    setJobs((prev) => [newJob, ...prev]);
    setNewJobTitle("");
    setNewJobDesc("");
    setIsAddingJob(false);

    // If proactive alert is enabled and it matches criteria (>90% and location/title contains Tlemcen/تلمسان)
    const isTlemcen = newJob.location.includes("تلمسان") || newJob.title.includes("تلمسان") || newJob.description.includes("تلمسان");

    if (isOpportunityAlertActive && computedMatch >= 90 && isTlemcen) {
      triggerProactiveOpportunityAlert(newJob);
    } else {
      alert(`تم نشر الوظيفة بنجاح ببيانات مواءمة أولية تبلغ %${computedMatch}!`);
    }
  };

  const getThemeClass = () => {
    if (theme === "dark") return "theme-dark";
    if (theme === "high-contrast") return "theme-high-contrast";
    return "";
  };

  return (
    <AutoTranslate lang={lang}>
      <div className={`min-h-screen text-slate-800 selection:bg-sky-250 fill-none transition-colors duration-300 ${getThemeClass()} ${theme === "standard" ? "bg-slate-50" : ""}`} dir={lang === "ar" ? "rtl" : "ltr"}>
      
      {/* Sovereign Checked Web-Portal Override */}
      {(() => {
        if (isEmployerAccessSimulation) {
          const sharedCertList = profile.certificates.filter(c => simulatedCertsForEmployer.includes(c.id));
          
          return (
            <div className="fixed inset-0 z-[10000] bg-slate-50 overflow-y-auto text-slate-800 font-sans selection:bg-blue-100" dir={lang === "ar" ? "rtl" : "ltr"}>
              {/* Top Sovereign Navigation Banner */}
              <div className="bg-slate-900 text-white border-b border-slate-800 shadow-xl py-4 px-6 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🛡️</span>
                    <div className="text-right">
                      <h1 className="text-xs sm:text-sm font-black tracking-tight text-white flex items-center gap-2">
                        <span>بوابة التدقيق الرقمي والشركاء (DZ-Sovereign Employer Verification Hub)</span>
                        <span className="bg-blue-500 text-white font-mono text-[9px] px-2 py-0.5 rounded font-black animate-pulse">LIVE VERIFICATION</span>
                      </h1>
                      <p className="text-[10px] text-slate-400 mt-0.5">البوابة الرسمية لقحص مصداقية الوثائق العقدية المستندة للبلوكتشين - المركز الجامعي بمغنية</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      setIsEmployerAccessSimulation(false);
                      if (typeof window !== "undefined") {
                        window.history.replaceState({}, document.title, window.location.pathname);
                      }
                    }}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 text-[10px] font-black rounded-xl transition-all border border-slate-750 hover:text-white"
                  >
                    الخروج والعودة لملف الباحث الشخصي ✕
                  </button>
                </div>
              </div>

              {/* Outer container */}
              <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
                
                {/* Main Success Verification Card */}
                <div className="bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-305/75 rounded-3xl p-6 sm:p-8 space-y-6 text-right relative overflow-hidden shadow-sm">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/5 rounded-full blur-2xl pointer-events-none" />
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 border-b border-emerald-100/60 pb-5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/20">
                        ✓
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2 className="text-sm sm:text-base font-black text-slate-900">سجل إلكتروني معتمد ومحمي سيادياً 🔒</h2>
                          <span className="bg-emerald-500 text-white text-[9px] px-2.5 py-0.5 rounded-full font-black tracking-wide">SECURE SOVEREIGN PROOF</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">تم التحقق من صحة وصلاحية توقيع البلوكشين لهذه الشهادات المرفقة والمسجلة باسم الباحث من الهيئة الرسمية بنسبة 100%.</p>
                      </div>
                    </div>
                    
                    <div className="bg-white/90 backdrop-blur-xs border border-emerald-250 px-4 py-2 bg-white rounded-2xl text-[10px] space-y-1">
                      <div className="flex justify-between items-center gap-5 font-bold">
                        <span className="text-slate-400">تاريخ الفحص التلقائي:</span>
                        <span className="font-mono text-slate-800">10 جوان 2026 (الآن)</span>
                      </div>
                      <div className="flex justify-between items-center gap-5 font-bold">
                        <span className="text-slate-400">حالة الربط الكلي:</span>
                        <span className="text-emerald-700 flex items-center gap-1">🟢 متصل ومحمي سيادياً</span>
                      </div>
                    </div>
                  </div>

                  {/* Candidate Summary Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="bg-white p-4 rounded-2xl border border-slate-100 space-y-1">
                      <span className="text-[10px] text-slate-400 font-bold block">الاسم الكامل لالباحث المعتمد:</span>
                      <span className="text-xs font-black text-slate-800">{profile.name}</span>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-slate-100 space-y-1">
                      <span className="text-[10px] text-slate-400 font-bold block">التخصص والمسمى الوظيفي المركزي:</span>
                      <span className="text-xs font-black text-indigo-750">{profile.title}</span>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-slate-100 space-y-1">
                      <span className="text-[10px] text-slate-400 font-bold block">التحصيل والمستوى الأكاديمي:</span>
                      <span className="text-[11px] font-black text-slate-800 truncate block">{profile.education}</span>
                    </div>
                  </div>
                </div>

                {/* Certificates Title Banner */}
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-black text-slate-900">المستندات والشهادات التي تمت مشاركتها من الحافظة ({sharedCertList.length} وثائق معتمدة):</h3>
                    <p className="text-[10px] text-slate-500">تم فحص وجلب هذه الأوسمة مباشرة من الخزنة اللامركزية الموزعة الخاصة بالولاية.</p>
                  </div>
                  <span className="text-[10px] bg-slate-200 text-slate-600 px-3 py-1 rounded-lg font-bold">حالة الفحص: ناجح</span>
                </div>

                {/* Shared Certificates Cards Stack */}
                {sharedCertList.length === 0 ? (
                  <div className="bg-white border rounded-3xl p-12 text-center space-y-3">
                    <span className="text-4xl block">📁</span>
                    <h4 className="text-xs font-black text-slate-700 font-bold">لم يتم اختيار أو مشاركة أي وثائق!</h4>
                    <p className="text-[10.5px] text-slate-400 max-w-sm mx-auto">يرجى من الباحث تحديد وثيقة واحدة أو أكثر ثم الضغط على "توليد رابط المشاركة الآمن" لتفعيل العرض هنا بنجاح.</p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {sharedCertList.map(cert => {
                      const blockNum = cert.id * 8904 + 192831;
                      const txHash = `0x${(cert.id * 18274921 + 92398401).toString(16).substring(0, 8)}...${(cert.id * 9283019 + 1029412).toString(16).substring(0, 6)}`;
                      const sealSign = `DZ-SOV-TLEMCEN-SEAL-${cert.id * 231 + 4096}`;
                      const expDays = getDaysUntilExpiry(cert.expiryDate);

                      return (
                        <div key={cert.id} className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 space-y-5 text-right relative overflow-hidden">
                          <div className="absolute top-0 left-0 bg-blue-500/10 text-blue-805 px-4 py-1 text-[9px] font-black rounded-br-2xl border-r border-b border-blue-200">
                            شهادة مؤمنة بالكامل ✓
                          </div>
                          
                          <div className="flex flex-col sm:flex-row items-start justify-between gap-4 pb-4 border-b border-slate-100">
                            <div className="flex items-start gap-3.5">
                              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-150 flex items-center justify-center text-indigo-700 text-xl shrink-0">
                                📜
                              </div>
                              <div>
                                <h4 className="text-xs font-black text-slate-900 leading-snug">{cert.title}</h4>
                                <div className="flex flex-wrap items-center gap-2 mt-1.5">
                                  <span className="text-[10px] text-slate-500 font-bold">الجهة المانحة الصادرة: <strong className="text-slate-800">{cert.issuer}</strong></span>
                                  <span className="text-slate-300 font-mono">•</span>
                                  <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-bold">{cert.specialty || "تخصصات أخرى"}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="pt-2 sm:pt-0 shrink-0 self-end sm:self-center">
                              {expDays !== null && expDays < 0 ? (
                                <span className="bg-red-50 text-red-800 border border-red-200 text-[8.5px] font-black px-3 py-1 rounded-full">منتهية الصلاحية ⚠️</span>
                              ) : (
                                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[8.5px] font-bold px-3 py-1 rounded-full">نشطة ومضمونة القانونية ✅</span>
                              )}
                            </div>
                          </div>

                          {/* Cryptographic Proof Detail Drawer Area */}
                          <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-200 space-y-3.5">
                            <div className="flex justify-between items-center border-b border-slate-200/60 pb-2">
                              <span className="text-[9.5px] font-black text-slate-705 flex items-center gap-1.5">
                                <span>🔐 براهين التدقيق العقدية ومفاتيح السيادة السيبرانية:</span>
                              </span>
                              <span className="text-[8.5px] font-mono text-slate-400">المرجع: DZ.SOV.TLEMCEN.V1</span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[9px]">
                              <div className="space-y-1.5">
                                <div className="flex justify-between items-center gap-3">
                                  <span className="text-slate-500 font-bold">بصمة المعاملة (Blockchain TX):</span>
                                  <span className="font-mono text-slate-850 font-black truncate max-w-[170px]">{txHash}</span>
                                </div>
                                <div className="flex justify-between items-center gap-3">
                                  <span className="text-slate-500 font-bold">رقم الكتلة (Block Height):</span>
                                  <span className="font-mono text-slate-850 font-bold">#{blockNum}</span>
                                </div>
                                <div className="flex justify-between items-center gap-3">
                                  <span className="text-slate-500 font-bold">عقد التوطين الموحد:</span>
                                  <span className="font-mono text-indigo-700 font-bold">DZ_GOV_ACCUM_CONTRACT</span>
                                </div>
                              </div>
                              
                              <div className="space-y-1.5">
                                <div className="flex justify-between items-center gap-3">
                                  <span className="text-slate-500 font-bold">التوقيع الرقمي السيادي الخاص بالهيئة:</span>
                                  <span className="font-mono text-slate-850 font-bold truncate max-w-[150px]">{sealSign}</span>
                                </div>
                                <div className="flex justify-between items-center gap-3">
                                  <span className="text-slate-500 font-bold">حالة مواءمة البلوكشين الذكية:</span>
                                  <span className="text-emerald-700 font-black">✓ متطابق وسليم تماماً (Verified Perfect Integrity)</span>
                                </div>
                                <div className="flex justify-between items-center gap-3">
                                  <span className="text-slate-500 font-bold">مستوى الفحص العقدى:</span>
                                  <span className="bg-blue-50 text-blue-700 font-bold px-1.5 rounded text-[8px]">Consensus Proof of Sovereign Authority</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-between items-center text-[9px] pt-1">
                            <span className="text-slate-400 font-bold">تاريخ الإصدار الأكاديمي للشهادة: <strong className="text-slate-600">{cert.date}</strong></span>
                            <button
                              type="button"
                              onClick={() => alert(`📥 تم محاكاة تحميل الشهادة السيبرانية الموثقة "${cert.title}" بنجاح بصيغة PDF المشفرة والمدققة.`)}
                              className="text-indigo-650 hover:text-indigo-800 font-black flex items-center gap-1 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors"
                            >
                              تحميل الشهادة الموثقة ومفتاح التدقيق 📥
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Contact with Candidate Actions Footer */}
                <div className="bg-white border rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-5 border-slate-200">
                  <div className="space-y-1 text-right">
                    <h4 className="text-xs font-black text-slate-900">هل ترغب في توظيف {profile.name} أو طلب مقابلة توظيف رسمية؟</h4>
                    <p className="text-[10px] text-slate-500">معدل مواءمة الباحث الأكاديمية والمهنية يفوق 94% حسب معايير الولاية.</p>
                  </div>
                  
                  <div className="flex items-center gap-3.5">
                    <button
                      type="button"
                      onClick={() => alert(`🔔 تم إرسال إشعار فوري وتنبيه للباحث "${profile.name}" برغبتكم في التواصل حول فرص العمل المستهدفة.`)}
                      className="px-5 py-2.5 bg-indigo-650 hover:bg-indigo-700 text-white text-[10.5px] font-black rounded-xl transition-all shadow-md shadow-indigo-550/15"
                    >
                      📥 توجيه عرض تشغيلي / تواصل مع الباحث
                    </button>
                  </div>
                </div>

              </div>
            </div>
          );
        }
        return null;
      })()}

      {/* Real-time In-App Push Notification Toast Container */}
      {activeOpportunityToast && (
        <div className="fixed top-6 left-6 z-[9999] max-w-sm w-full bg-slate-900 border border-slate-800 text-white rounded-3xl p-5 shadow-2xl shadow-indigo-950/40 animate-fade-in text-right">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-650 flex items-center justify-center shrink-0 shadow-lg text-lg animate-bounce">
              🔔
            </div>
            
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="bg-emerald-400 text-emerald-950 text-[8px] font-black px-2 py-0.5 rounded-full animate-pulse-slow">
                  تنبيه استباقي فوري (&gt;90%)
                </span>
                <button 
                  onClick={() => setActiveOpportunityToast(null)}
                  className="text-slate-400 hover:text-white text-xs transition-colors p-1"
                >
                  ✕
                </button>
              </div>
              
              <h4 className="text-[11.5px] font-black text-white leading-tight">
                تم رصد فرصة عمل مواءمة ومثالية بتلمسان!
              </h4>
              <p className="text-[11px] font-bold text-slate-205">
                {activeOpportunityToast.title}
              </p>
              <p className="text-[9.5px] text-slate-400">
                🏢 {activeOpportunityToast.company} | 📍 {activeOpportunityToast.location}
              </p>
              
              <div className="flex items-center justify-between pt-2 border-t border-slate-800 mt-2.5">
                <div>
                  <span className="text-[8px] text-slate-400 block">درجة المواءمة</span>
                  <span className="text-sm font-black font-mono text-emerald-400">{activeOpportunityToast.match}%</span>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      setActiveOpportunityToast(null);
                      alert(`🚀 تم تقديم طلبك التلقائي الآمن للشركة: ${activeOpportunityToast.company} بنجاح بمعدل مواءمة مذهل %${activeOpportunityToast.match}!`);
                    }}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-[9.5px] font-black rounded-xl transition-all"
                  >
                    تقديم التزام فوري
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* 1. Global Navigation Bar - Exact replica of Screenshot 1 (White Pristine Navbar with brand colors) */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Left / Right: TRACK Brand Logo & Title */}
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => setCurrentPerspective("landing")}>
            <TrackLogo className="w-12 h-12" interactive={true} />
            <div className="flex flex-col text-right">
              <span className="font-sans font-black tracking-tight text-xl leading-none text-blue-900">
                TRA<span className="text-orange-500">CK</span>
              </span>
              <span className="text-[10px] text-slate-400 font-bold block leading-none mt-1">{t("executiveDecree")}</span>
            </div>
          </div>

          {/* Perspective Swapping Menu - Middle Menu showing all doors/portals clearly matching Screenshot 1 but expanded with Admin */}
          <nav className="hidden lg:flex items-center gap-4 text-slate-700">
            <button
              onClick={() => setCurrentPerspective("landing")}
              className={`px-2 py-1 text-[11px] font-black transition-all relative ${
                currentPerspective === "landing" ? "text-blue-600 after:content-[''] after:absolute after:bottom-[-22px] after:left-0 after:right-0 after:h-0.5 after:bg-blue-600 font-black" : "text-slate-500 hover:text-blue-600"
              }`}
            >
              الرئيسية
            </button>
            <button
              onClick={() => setCurrentPerspective("candidate")}
              className={`px-2 py-1 text-[11px] font-black transition-all relative ${
                currentPerspective === "candidate" ? "text-blue-650 after:content-[''] after:absolute after:bottom-[-22px] after:left-0 after:right-0 after:h-0.5 after:bg-blue-650 font-black font-bold" : "text-slate-500 hover:text-blue-650"
              }`}
            >
              فضاء الباحث 🎓
            </button>
            <button
              onClick={() => setCurrentPerspective("company")}
              className={`px-2 py-1 text-[11px] font-black transition-all relative ${
                currentPerspective === "company" ? "text-indigo-650 after:content-[''] after:absolute after:bottom-[-22px] after:left-0 after:right-0 after:h-0.5 after:bg-indigo-650 font-black font-bold" : "text-slate-500 hover:text-indigo-650"
              }`}
            >
              لوحة المؤسسة 🏢
            </button>
            <button
              onClick={() => setCurrentPerspective("university")}
              className={`px-2 py-1 text-[11px] font-black transition-all relative ${
                currentPerspective === "university" ? "text-teal-650 after:content-[''] after:absolute after:bottom-[-22px] after:left-0 after:right-0 after:h-0.5 after:bg-teal-650 font-black font-bold" : "text-slate-500 hover:text-teal-650"
              }`}
            >
              بوابة الجامعة 🏫
            </button>
            <button
              onClick={() => setCurrentPerspective("sovereign")}
              className={`px-2 py-1 text-[11px] font-black transition-all relative ${
                currentPerspective === "sovereign" ? "text-emerald-650 after:content-[''] after:absolute after:bottom-[-22px] after:left-0 after:right-0 after:h-0.5 after:bg-emerald-600 font-bold" : "text-slate-500 hover:text-emerald-650"
              }`}
            >
              القرار السيادي 🇩🇿
            </button>
            <button
              onClick={() => setCurrentPerspective("admin")}
              className={`px-2 py-1 text-[11px] font-black transition-all relative ${
                currentPerspective === "admin" ? "text-amber-600 after:content-[''] after:absolute after:bottom-[-22px] after:left-0 after:right-0 after:h-0.5 after:bg-amber-500 font-bold" : "text-slate-500 hover:text-amber-600"
              }`}
            >
              المشرف العام ⚙️
            </button>
          </nav>

          {/* Language Switcher and Login CTA */}
          <div className="flex items-center gap-4">
            {/* Minimalist Lang selection block */}
            <div className="hidden sm:flex bg-slate-50 border border-slate-200/60 rounded-xl p-0.5 text-[10px] font-sans">
              <button onClick={() => { setLang("ar"); }} className={`px-2.5 py-1 rounded-lg ${lang === "ar" ? "bg-blue-600 text-white font-bold" : "text-slate-500"}`}>العربية</button>
              <button onClick={() => { setLang("en"); }} className={`px-2.5 py-1 rounded-lg ${lang === "en" ? "bg-blue-600 text-white font-bold" : "text-slate-500"}`}>English</button>
              <button onClick={() => { setLang("fr"); }} className={`px-2.5 py-1 rounded-lg ${lang === "fr" ? "bg-blue-600 text-white font-bold" : "text-slate-500"}`}>Français</button>
            </div>

            {/* Accessibility Settings Cog / Sliders */}
            <div className="relative">
              <button
                onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
                className="p-2.5 bg-slate-50 hover:bg-slate-150 rounded-xl border border-slate-200 text-slate-700 flex items-center justify-center gap-1.5 transition-all text-[11px] font-black"
                title={t("accessibilityOptions")}
              >
                <Sliders className="w-4 h-4 text-slate-500 shrink-0" />
                <span className="hidden md:inline">{t("settings")}</span>
              </button>

              {showSettingsDropdown && (
                <div className="absolute left-0 mt-2 z-[9999] w-64 bg-white border border-slate-200 rounded-2xl p-4 shadow-xl text-right">
                  <h4 className="text-xs font-black text-slate-800 border-b border-slate-150 pb-2 mb-2 flex items-center justify-between font-sans">
                    <span>{t("accessibilityOptions")}</span>
                    <button onClick={() => setShowSettingsDropdown(false)} className="text-slate-400 hover:text-slate-650 text-xs font-bold leading-none">✕</button>
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-1 leading-normal mb-3 font-sans">{t("accessibilityDesc")}</p>
                  
                  <div className="space-y-3 font-sans">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-slate-600 block">{t("themeLabel")}</span>
                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          onClick={() => { setTheme("standard"); }}
                          className={`p-2 rounded-lg text-[10px] font-bold border transition-all ${theme === "standard" ? "border-blue-600 bg-blue-50/30 text-blue-700" : "border-slate-150 hover:bg-slate-50 text-slate-600"}`}
                        >
                          {t("themeLight")}
                        </button>
                        <button
                          onClick={() => { setTheme("dark"); }}
                          className={`p-2 rounded-lg text-[10px] font-bold border transition-all ${theme === "dark" ? "border-slate-700 bg-slate-800 text-slate-150" : "border-slate-150 hover:bg-slate-50 text-slate-600"}`}
                        >
                          {t("themeDark")}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1 pt-1.5 border-t border-slate-100">
                      <span className="text-[10px] font-black text-slate-600 block">{t("contrastLabel")}</span>
                      <button
                        onClick={() => { setTheme("high-contrast"); }}
                        className={`w-full p-2 rounded-lg text-[10px] font-black border transition-all ${theme === "high-contrast" ? "border-yellow-400 bg-black text-yellow-400" : "border-slate-150 hover:bg-slate-50 text-slate-700 bg-amber-50/20"}`}
                      >
                        ⚡ {t("contrastHigh")}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Dynamic context-aware Login/Logout button */}
            <button
              onClick={() => {
                if (currentPerspective !== "landing" && sessions[currentPerspective]?.loggedIn) {
                  // Logout active perspective's session
                  setSessions(prev => ({
                    ...prev,
                    [currentPerspective]: { loggedIn: false, name: "", email: "", org: "" }
                  }));
                  setCurrentPerspective("landing");
                } else {
                  // Admin is our master-gate for this assignment, let them view admin directly!
                  setCurrentPerspective("admin");
                }
              }}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-850 text-white font-sans font-black rounded-xl text-[11px] transition-all shadow-md flex items-center gap-1.5 border border-slate-750"
            >
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {currentPerspective !== "landing" && sessions[currentPerspective]?.loggedIn
                  ? "خروج الحساب"
                  : "بوابة التحكم ⚙️"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="lg:hidden flex overflow-x-auto border-t border-slate-100 p-2 gap-1 justify-around select-none bg-white">
          <button onClick={() => setCurrentPerspective("landing")} className={`shrink-0 px-3 py-1.5 rounded-lg text-[10px] font-black ${currentPerspective === "landing" ? "bg-blue-50 text-blue-600" : "text-slate-500"}`}>الرئيسية</button>
          <button onClick={() => setCurrentPerspective("candidate")} className={`shrink-0 px-3 py-1.5 rounded-lg text-[10px] font-black ${currentPerspective === "candidate" ? "bg-blue-50 text-blue-600" : "text-slate-500"}`}>الباحث 🎓</button>
          <button onClick={() => setCurrentPerspective("company")} className={`shrink-0 px-3 py-1.5 rounded-lg text-[10px] font-black ${currentPerspective === "company" ? "bg-blue-50 text-blue-600" : "text-slate-500"}`}>المؤسسة 🏢</button>
          <button onClick={() => setCurrentPerspective("university")} className={`shrink-0 px-3 py-1.5 rounded-lg text-[10px] font-black ${currentPerspective === "university" ? "bg-blue-50 text-blue-600" : "text-slate-500"}`}>الجامعة 🏫</button>
          <button onClick={() => setCurrentPerspective("sovereign")} className={`shrink-0 px-3 py-1.5 rounded-lg text-[10px] font-black ${currentPerspective === "sovereign" ? "bg-blue-50 text-blue-600" : "text-slate-500"}`}>السيادي 🇩🇿</button>
          <button onClick={() => setCurrentPerspective("admin")} className={`shrink-0 px-3 py-1.5 rounded-lg text-[10px] font-black ${currentPerspective === "admin" ? "bg-amber-50 text-amber-700 font-bold" : "text-slate-500"}`}>المشرف ⚙️</button>
        </div>
      </header>

      {/* Main Workspace container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ==================== Perspective 1: Landing Page ==================== */}
        {currentPerspective === "landing" && (
          <div className="space-y-16 animate-fade-in font-sans">
            
            {/* Replicated Hero Section of Screenshot 1 (Dynamic Split Grid Layout) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6 pb-4">
              
              {/* Left Column: Typography, description & badges */}
              <div className="lg:col-span-7 space-y-8 text-right order-2 lg:order-1">
                <div className="space-y-4">
                  <span className="text-blue-650 text-xs md:text-sm font-black uppercase tracking-wide block">
                    {t("subtitle")}
                  </span>
                  
                  {/* Huge TRACK Typography */}
                  <h1 className="text-5xl md:text-7xl font-sans font-black tracking-tight leading-none text-blue-900 select-none">
                    TRA<span className="text-orange-500 relative">
                      CK
                    </span>
                  </h1>
                  
                  <p className="text-blue-900/80 font-medium text-xs md:text-sm leading-relaxed max-w-xl">
                    {t("tagline")}
                  </p>
                </div>

                {/* Sub-badges horizontally aligned matching Screenshot 1 */}
                <div className="flex flex-wrap lg:flex-nowrap items-center gap-4 pt-2">
                  <div className="flex items-center gap-2 bg-white border border-slate-100 p-3 rounded-2xl shadow-xs">
                    <Shield className="w-5 h-5 text-blue-600 shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold">ISO 27001</span>
                      <span className="text-[11px] font-black text-slate-800">معتمد</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-white border border-slate-100 p-3 rounded-2xl shadow-xs">
                    <Building className="w-5 h-5 text-blue-650 shrink-0" />
                    <div>
                      <span className="text-[9px] text-slate-400 block font-bold">مرسوم تنفيذي</span>
                      <span className="text-[11px] font-black text-slate-800">07-26</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-white border border-slate-100 p-3 rounded-2xl shadow-xs">
                    <Lock className="w-5 h-5 text-orange-500 shrink-0" />
                    <div>
                      <span className="text-[9px] text-slate-400 block font-bold">بيانات آمنة</span>
                      <span className="text-[11px] font-black text-slate-800">100%</span>
                    </div>
                  </div>
                </div>

                {/* Main CTA Dual Buttons styled with Orange and Royal Blue accent */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <button
                    onClick={() => {
                      setCurrentPerspective("candidate");
                      alert("مرحباً بك في فضاء الأفراد وطالبي العمل الملاءمة.");
                    }}
                    className="px-6 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl text-xs font-black transition-all shadow-md shadow-orange-500/10 flex items-center gap-2 hover:translate-y-[-1px]"
                  >
                    <User className="w-4 h-4 text-white" />
                    <span>دخول الأفراد</span>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentPerspective("company");
                      alert("مرحباً بك في لوحة المؤسسات والشركاء الاقتصاديين.");
                    }}
                    className="px-6 py-4 bg-blue-650 hover:bg-blue-700 text-white rounded-2xl text-xs font-black transition-all shadow-md shadow-blue-650/10 flex items-center gap-2 hover:translate-y-[-1px]"
                  >
                    <Briefcase className="w-4 h-4 text-white" />
                    <span>دخول المؤسسات</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Giant Constellation Network Illustration with large Brand Logo inside */}
              <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2">
                <div className="relative w-full max-w-[360px] aspect-square flex items-center justify-center">
                  
                  {/* Decorative background network lines/spots */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-orange-500/5 rounded-full blur-2xl -z-10 animate-pulse"></div>
                  
                  {/* Outer circle constellation */}
                  <div className="absolute inset-0 border border-dashed border-blue-100 rounded-full animate-spin-slow"></div>
                  <div className="absolute inset-6 border border-dotted border-orange-100 rounded-full"></div>
                  
                  {/* Constellation nodes (styled dots) */}
                  <div className="absolute top-4 right-1/4 w-2 h-2 rounded-full bg-blue-500"></div>
                  <div className="absolute bottom-12 left-10 w-3 h-3 rounded-full bg-orange-400"></div>
                  <div className="absolute top-1/2 right-1 w-2.5 h-2.5 rounded-full bg-blue-600"></div>
                  <div className="absolute top-1/3 left-2 w-2 h-2 rounded-full bg-orange-500"></div>
                  
                  {/* Massive high resolution Track Logo Container matching Image 2 */}
                  <div className="relative z-10 w-72 h-72 bg-white rounded-[40px] shadow-2xl border border-slate-100/80 p-6 flex items-center justify-center transform hover:rotate-2 transition-transform duration-500">
                    <TrackLogo className="w-full h-full" />
                  </div>

                </div>
              </div>

            </div>

            {/* Choose Language Selector segment matching Screenshot 1 */}
            <div className="border border-slate-200/50 rounded-3xl p-6 bg-white shadow-xs max-w-4xl mx-auto space-y-4">
              <p className="text-center text-[11px] font-black text-blue-900/60 font-sans tracking-wide">
                Choose Language / Choisir la langue / اختر اللغة
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  onClick={() => { setLang("ar"); alert("تم تأكيد واجهة اللغة العربية"); }}
                  className={`border p-3.5 rounded-2xl flex items-center justify-center gap-2 text-xs font-black transition-all ${
                    lang === "ar" ? "border-blue-600 bg-blue-50/40 text-blue-700" : "border-slate-100 hover:bg-slate-50 text-slate-600"
                  }`}
                >
                  <span className="text-base">🇩🇿</span>
                  <span>العربية</span>
                </button>
                <button
                  onClick={() => { setLang("en"); alert("English interface loaded successfully"); }}
                  className={`border p-3.5 rounded-2xl flex items-center justify-center gap-2 text-xs font-black transition-all ${
                    lang === "en" ? "border-blue-600 bg-blue-50/40 text-blue-700" : "border-slate-100 hover:bg-slate-50 text-slate-600"
                  }`}
                >
                  <span className="text-base">🇬🇧</span>
                  <span>English</span>
                </button>
                <button
                  onClick={() => { setLang("fr"); alert("Interface française chargée"); }}
                  className={`border p-3.5 rounded-2xl flex items-center justify-center gap-2 text-xs font-black transition-all ${
                    lang === "fr" ? "border-blue-600 bg-blue-50/40 text-blue-700" : "border-slate-100 hover:bg-slate-50 text-slate-600"
                  }`}
                >
                  <span className="text-base">🇫🇷</span>
                  <span>Français</span>
                </button>
              </div>
            </div>

            {/* Platform Services Section matching Screenshot 1 */}
            <div className="space-y-8">
              <div className="text-center space-y-1">
                <h2 className="text-xl md:text-2xl font-black text-blue-900 leading-tight">منصة متكاملة لخدمة الجميع</h2>
                <div className="w-16 h-1 bg-orange-400 mx-auto rounded-full mt-2"></div>
              </div>

              {/* Four Cards Replicated with exactly matching descriptions and buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* 1. طالب عمل */}
                <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between text-right space-y-4">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <User className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-black text-slate-800">طالب عمل</h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      ابحث عن وظائف تناسب مهاراتك وتطور من قدراتك المهنية
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setCurrentPerspective("candidate");
                      alert("جاري إنشاء حساب طالب عمل ذكي بالارتباط مع ANEM...");
                    }}
                    className="w-full py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-650 font-black rounded-xl text-[10px] text-center transition-all border border-blue-100/50"
                  >
                    إنشاء حساب
                  </button>
                </div>

                {/* 2. مؤسسة */}
                <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between text-right space-y-4">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-black text-slate-800">مؤسسة</h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      ابحث عن أفضل الكفاءات وأدر عمليات التوظيف بذكاء
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setCurrentPerspective("company");
                      alert("جاري الانتقال نحو منصة إدراج عروض العمل والمواءمة الخوارزمية...");
                    }}
                    className="w-full py-2.5 bg-orange-50 hover:bg-orange-150 text-orange-600 font-black rounded-xl text-[10px] text-center transition-all border border-orange-100/50"
                  >
                    إنشاء حساب
                  </button>
                </div>

                {/* 3. جامعة / مركز تكوين */}
                <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between text-right space-y-4">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-black text-slate-800">جامعة / مركز تكوين</h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      طور مناهجك وتابع خريجيك وأصدر الأوسمة الرقمية
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setCurrentPerspective("university");
                      alert("الدخول كشريك أكاديمي محلي (المركز الجامعي بمغنية)...");
                    }}
                    className="w-full py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-650 font-black rounded-xl text-[10px] text-center transition-all border border-blue-100/50"
                  >
                    إنشاء حساب
                  </button>
                </div>

                {/* 4. جهة حكومية */}
                <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between text-right space-y-4">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center">
                      <Scale className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-black text-slate-800">جهة حكومية</h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      أدر المبادرات وراقب مؤشرات التشغيل الوطنية
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setCurrentPerspective("sovereign");
                      alert("تأكيد البوابة السيادية. جاري جلب لوحة البيانات الفورية لصانعي القرار المهني...");
                    }}
                    className="w-full py-2.5 bg-orange-50 hover:bg-orange-150 text-orange-600 font-black rounded-xl text-[10px] text-center transition-all border border-orange-100/50"
                  >
                    دخول الجهة
                  </button>
                </div>

              </div>
            </div>

            {/* TRACK in Numbers Section matching Screenshot 1 */}
            <div className="space-y-8 pt-4">
              <div className="text-center space-y-1 border-t border-slate-50 pt-8 mt-4">
                <h2 className="text-xl md:text-2xl font-black text-blue-900">TRACK بالأرقام</h2>
                <div className="w-16 h-1 bg-orange-400 mx-auto rounded-full mt-2"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* 1. باحث عن عمل نشط */}
                <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-xs flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-2xl font-black font-mono text-blue-900">542,391</span>
                    <span className="text-[11px] text-slate-400 font-black block">باحث عن عمل نشط</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                </div>

                {/* 2. وظيفة مفتوحة */}
                <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-xs flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-2xl font-black font-mono text-blue-900">23,847</span>
                    <span className="text-[11px] text-slate-400 block font-black">وظيفة مفتوحة</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                    <Briefcase className="w-5 h-5" />
                  </div>
                </div>

                {/* 3. نسبة المطابقة الذكية */}
                <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-xs flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-2xl font-black font-mono text-blue-900">68%</span>
                    <span className="text-[11px] text-slate-400 font-black block">نسبة المطابقة الذكية</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Bot className="w-5 h-5" />
                  </div>
                </div>

                {/* 4. معدل الإدماج المهني */}
                <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-xs flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-2xl font-black font-mono text-blue-905 block">45%</span>
                    <span className="text-[11px] text-slate-404 block font-black">معدل الإدماج المهني</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>

              </div>
            </div>

            {/* Affiliated Government Bodies section matching Screenshot 1 */}
            <div className="space-y-8 pt-4">
              <div className="text-center space-y-1">
                <h2 className="text-xl md:text-2xl font-black text-blue-900">نربط مع الجهات الحكومية</h2>
                <div className="w-16 h-1 bg-orange-400 mx-auto rounded-full mt-2"></div>
              </div>

              {/* Exact 5 brand labels shown on Screenshot 1 */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                
                {/* 1. المديرية العامة للأمن الوطني */}
                <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-xs text-center space-y-2 hover:-translate-y-1 transition-all">
                  <span className="text-lg">🛡️</span>
                  <span className="text-[11px] font-black text-slate-800 block">المديرية العامة للأمن الوطني</span>
                </div>

                {/* 2. AADL */}
                <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-xs text-center space-y-2 hover:-translate-y-1 transition-all">
                  <span className="text-lg">🏢</span>
                  <h4 className="text-xs font-black text-blue-900 leading-none">AADL</h4>
                  <span className="text-[10px] text-slate-400 block font-bold leading-none">الوكالة الوطنية لتحسين السكن وتطويره</span>
                </div>

                {/* 3. ANEM */}
                <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-xs text-center space-y-2 hover:-translate-y-1 transition-all">
                  <span className="text-lg">📌</span>
                  <h4 className="text-xs font-black text-blue-900 leading-none">ANEM</h4>
                  <span className="text-[10px] text-slate-400 block font-bold leading-none">الوكالة الوطنية للتشغيل</span>
                </div>

                {/* 4. CNAS */}
                <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-xs text-center space-y-2 hover:-translate-y-1 transition-all">
                  <span className="text-lg">💳</span>
                  <h4 className="text-xs font-black text-blue-900 leading-none">CNAS</h4>
                  <span className="text-[10px] text-slate-400 block font-bold leading-none">الصندوق الوطني للعمل للعمال الأجراء</span>
                </div>

                {/* 5. Gendarmerie/Sovereign check */}
                <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-xs text-center space-y-2 hover:-translate-y-1 transition-all">
                  <span className="text-lg">⚔️</span>
                  <span className="text-[11px] font-black text-slate-800 block">وزارة الدفاع الوطني - الدرك الوطني</span>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* ==================== Perspective 2: Candidate Portal ==================== */}
        {currentPerspective === "candidate" && (
          !sessions.candidate.loggedIn ? (
            <PortalLoginView
              role="candidate"
              onLogin={(name, email, org) => {
                setSessions(prev => ({
                  ...prev,
                  candidate: { loggedIn: true, name, email, org }
                }));
              }}
              onCancel={() => setCurrentPerspective("landing")}
            />
          ) : (
            <div className="space-y-6 animate-fade-in font-sans" dir="rtl">
              
              {/* Profile Welcome Header block */}
              <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4 text-right w-full md:w-auto">
                  <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-black text-lg shadow-sm border border-blue-100">
                    {profile.name ? profile.name.charAt(0) : "ج"}
                  </div>
                  <div>
                    <h2 className="text-base font-black text-slate-800 flex items-center gap-2">
                      <span>{profile.name}</span>
                      {(() => {
                        const b = getVerifiedProfessionalBadge();
                        return (
                          <div
                            className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[9px] font-black transition-all duration-300 shrink-0 ${b.textStyle} ${b.glowClass}`}
                            title={lang === "en" ? `Verification Progress: ${b.pct}` : `نسبة اكتمال التوثيق: ${b.pct}`}
                          >
                            <span>{b.icon}</span>
                            <span>{b.label}</span>
                            <span className="text-[8px] opacity-65 font-mono font-bold">({verifiedCertsCount})</span>
                          </div>
                        );
                      })()}
                    </h2>
                    <p className="text-[11px] text-slate-400">{profile.title} | {profile.location}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-1.5">
                      <p className="text-[10px] text-blue-650 font-bold">🏫 {profile.education}</p>
                      <button
                        onClick={() => {
                          setSessions(prev => ({
                            ...prev,
                            candidate: { loggedIn: false, name: "", email: "", org: "" }
                          }));
                        }}
                        className="text-[9px] bg-rose-50 hover:bg-rose-100 text-rose-700 px-2 py-0.5 rounded-lg border border-rose-100 font-bold transition-all flex items-center gap-1"
                      >
                        <span>🔑 تبديل الحساب / تسجيل خروج لبوابة التسجيل</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick Merit Badge */}
                <div className="bg-slate-50 border border-slate-150 p-4 rounded-2xl text-center shrink-0 min-w-[150px]">
                  <span className="text-[9px] text-slate-400 block font-bold mb-1">مؤشر الجدارة الشامل</span>
                  <span className="text-3xl font-black font-mono text-sky-600">{profile.meritScore}%</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[8px] font-black px-2.5 py-0.5 rounded-full block mt-1.5 mx-auto w-max">
                    {profile.tier} (ممتاز)
                  </span>
                </div>
              </div>

              {/* Responsive Split View: Left sidebar for desktop, top bar for mobile */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Sidebar Navigation */}
                <div className="lg:col-span-3 bg-white border border-slate-100 rounded-3xl p-4 shadow-sm space-y-4">
                  <div className="border-b border-slate-50 pb-2.5 px-2">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-wide">أقسام فضاء الباحث</h3>
                  </div>

                  {/* Mobile scroll indicator wrapper */}
                  <div className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 no-scrollbar select-none">
                    {[
                      { id: "dashboard", label: "الرئيسية", icon: LayoutDashboard, color: "text-blue-600 bg-blue-50/50" },
                      { id: "radar", label: "الرادار المهاري", icon: Sliders, color: "text-indigo-600 bg-indigo-50/50" },
                      { id: "timeline", label: "التطور التاريخي للجدارة", icon: Calendar, color: "text-rose-600 bg-rose-50/50" },
                      { id: "assessment", label: "اختبار الذكاء المهني", icon: Brain, color: "text-purple-600 bg-purple-50/50" },
                      { id: "jobs", label: "فرص العمل المطابقة", icon: Briefcase, color: "text-cyan-600 bg-cyan-50/50" },
                      { id: "vault", label: "الخزنة الرقمية", icon: Award, color: "text-amber-600 bg-amber-50/50" },
                      { id: "career", label: "المسار المهني", icon: Activity, color: "text-rose-600 bg-rose-50/50" },
                      { id: "advisor", label: "الموجه الذكي (AI)", icon: Bot, color: "text-purple-650 bg-purple-50/50" },
                      { id: "learning", label: "مركز التعلم", icon: BookOpen, color: "text-emerald-600 bg-emerald-50/50" },
                      { id: "interview", label: "مقابلات جدارة", icon: Trophy, color: "text-orange-600 bg-orange-50/50" },
                      { id: "reports", label: "تقرير SWOT & التقارير", icon: History, color: "text-slate-600 bg-slate-50/50" }
                    ].map((tab) => {
                      const IconComp = tab.icon;
                      const isActive = candidateSubTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setCandidateSubTab(tab.id as any)}
                          className={`w-full text-right px-3.5 py-3 rounded-2xl flex items-center gap-3 transition-all shrink-0 lg:shrink text-xs ${
                            isActive
                              ? "bg-blue-600 text-white font-black shadow-md shadow-blue-500/15"
                              : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
                          }`}
                        >
                          <span className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                            isActive ? "bg-white/15 text-white" : tab.color
                          }`}>
                            <IconComp className="w-4 h-4" />
                          </span>
                          <span className="truncate">{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Side Filter Component Integration */}
                  <PortalSideFilter
                    currentPerspective="candidate"
                    selectedSkill={selectedSkill}
                    onChangeSkill={setSelectedSkill}
                    selectedRegion={selectedRegion}
                    onChangeRegion={setSelectedRegion}
                    sovereignOnly={sovereignOnly}
                    onChangeSovereignOnly={setSovereignOnly}
                  />
                </div>

              {/* Dynamic Content pane based on selected tab */}
              <div className="lg:col-span-9 space-y-6">
                
                {/* 1. Dashboard tab */}
                {candidateSubTab === "dashboard" && (
                  <CandidateDashboard
                    profile={profile}
                    jobs={jobs}
                    onNavigateTab={setCandidateSubTab}
                    onUpdateSkill={handleUpdateSkill}
                  />
                )}

                {/* 2. Skill Radar and Fine-Tuning tab */}
                {candidateSubTab === "radar" && (
                  <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs space-y-6 animate-fade-in text-right">
                    <div className="border-b border-slate-50 pb-4">
                      <h3 className="text-sm font-black text-slate-800">رادار الجدارات والتبديل التفاعلي</h3>
                      <p className="text-[10px] text-slate-400 mt-1">اضغط على زوايا الرادار مباشرة أو عدل المؤشرات لتغيير جدارتك وملائمتك فورا أمام خوارزميات التوظيف.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      <div className="md:col-span-5 flex justify-center">
                        <SkillRadar skills={profile.skills} onChangeSkill={handleUpdateSkill} interactive={true} />
                      </div>

                      <div className="md:col-span-7 bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
                        <h4 className="text-[11px] font-black text-slate-705 uppercase">تحديث مستويات التدبير المهني للباحث:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {Object.entries(profile.skills).map(([key, val]) => (
                            <div key={key} className="space-y-1.5">
                              <div className="flex justify-between text-[10px] font-bold text-slate-600">
                                <span>{key}</span>
                                <span className="font-mono text-blue-600 font-bold">{val}%</span>
                              </div>
                              <input
                                type="range"
                                min="20"
                                max="100"
                                value={val}
                                onChange={(e) => handleUpdateSkill(key, Number(e.target.value))}
                                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                              />
                            </div>
                          ))}
                        </div>
                        <div className="bg-white p-3.5 rounded-xl border border-slate-100 text-[10px] text-slate-550 leading-relaxed">
                          💡 بمجرد تحريك مؤشرات الكفاءات أعلاه، سيقوم نظام المواءمة المزدوج في الخلفية بإعادة احتساب مستويات ملائمتك لفرص العمل والشركات في الجزائر فوراً!
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Dynamic jobs list matching */}
                {candidateSubTab === "jobs" && (
                  <div className="space-y-5 animate-fade-in text-right">
                    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs">
                      <h3 className="text-sm font-black text-slate-800">عروض العمل المطابقة لمهاراتك (AI Match Feed)</h3>
                      <p className="text-[10px] text-slate-400 mt-1">يجر مواءمتها بناءً على رادار جدارتك الفردية وبصمة المؤسسة لتوليد نسب دقيقة لفرص النجاح في الجزائر.</p>
                    </div>

                    <div className="space-y-4">
                      {jobs.map((job) => (
                        <div key={job.id} className="bg-white border border-slate-150 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row justify-between gap-6 hover:border-blue-200 transition-all">
                          <div className="space-y-2 text-right flex-1">
                            <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg text-[9px] font-black uppercase inline-block border border-blue-100/50">
                              {job.type}
                            </span>
                            <h4 className="text-sm font-black text-slate-800">{job.title}</h4>
                            <p className="text-[10.5px] text-slate-600 font-bold block">🏢 {job.company} | 📍 {job.location}</p>
                            <p className="text-[11px] text-slate-500 max-w-xl leading-relaxed">{job.description}</p>
                            
                            <div className="flex flex-wrap gap-1.5 pt-2">
                              {job.skills.map((skill, idx) => (
                                <span key={idx} className="bg-slate-50 border border-slate-100 text-slate-650 text-[9px] font-bold px-2.5 py-1 rounded-xl">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-col justify-between items-end shrink-0 border-r border-slate-50 pr-4">
                            <div className="text-right">
                              <span className="text-[9px] text-slate-400 block font-sans font-bold">درجة المواءمة الخوارزمية</span>
                              <span className="text-2xl font-black font-mono text-emerald-600">{job.match}%</span>
                            </div>

                            <div className="text-right mt-6">
                              <span className="text-xs font-mono font-black block text-slate-750 mb-2">{job.salary}</span>
                              <button
                                onClick={() => alert(`🚀 تم تقديم طلبك المحمي والموثق بنجاح إلى شركة: ${job.company} بنسبة مطابقة %${job.match}.`)}
                                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[9px] font-black transition-all"
                              >
                                تقديم مواءمة فوراً
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. Verified Blockchains Certificate Vault tab */}
                {candidateSubTab === "vault" && (
                  <div id="vault" className="space-y-5 animate-fade-in text-right">
                    {/* Document Scanner Integration */}
                    <DocumentScanner 
                      onScanSuccess={(title, issuer, expiryDate, specialty) => {
                        setCertTitleInput(title);
                        setCertIssuerInput(issuer);
                        if (expiryDate) setCertExpiryDateInput(expiryDate);
                        if (specialty) setCertSpecialtyInput(specialty);
                        console.log("Automatically populated scanned certificate detail in form states:", { title, issuer, expiryDate, specialty });
                      }}
                      lang={lang}
                    />

                    {/* Add new certificate manual upload form */}
                    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs text-right">
                      <div className="border-b border-slate-50 pb-4 mb-4">
                        <h3 className="text-sm font-black text-slate-800">تأكيد وإضافة الشهادة إلى المحفظة الموثقة</h3>
                        <p className="text-[10px] text-slate-400 mt-1">يمكنك مراجعة البيانات المستخرجة أعلاه أو تعديلها يدوياً لتأكيد وتشفير الشهادة رقمياً بنجاح.</p>
                      </div>
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        if (certTitleInput && certIssuerInput) {
                          handleAddCertificate(certTitleInput, certIssuerInput, certExpiryDateInput, certSpecialtyInput);
                          setCertTitleInput("");
                          setCertIssuerInput("");
                          setCertExpiryDateInput("");
                          // Reset to default selection
                          setCertSpecialtyInput("علوم الحاسوب وتطوير الويب");
                          alert("🚀 تم توثيق الشهادة رقمياً وحفظها وأرشفتها بنجاح حسب تاريخ صلاحيتها والتخصص الأكاديمي!");
                        }
                      }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-slate-450 block">اسم الشهادة / الوسام المهني المسترجع</label>
                          <input 
                            type="text" 
                            name="certTitle" 
                            required 
                            value={certTitleInput}
                            onChange={(e) => setCertTitleInput(e.target.value)}
                            placeholder="مثال: Google Professional Machine Learning Engineer..." 
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-150 rounded-xl text-[10px] font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-slate-450 block">مؤسسة الإصدار المعتمدة</label>
                          <input 
                            type="text" 
                            name="certIssuer" 
                            required 
                            value={certIssuerInput}
                            onChange={(e) => setCertIssuerInput(e.target.value)}
                            placeholder="مثال: Google Cloud Institute..." 
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-150 rounded-xl text-[10px] font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-slate-450 block">تاريخ انتهاء الصلاحية</label>
                          <input 
                            type="date" 
                            name="certExpiryDate" 
                            required 
                            value={certExpiryDateInput}
                            onChange={(e) => setCertExpiryDateInput(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-150 rounded-xl text-[10px] font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-slate-450 block">التخصص الأكاديمي والمهني للشهادة</label>
                          <select 
                            name="certSpecialty" 
                            required 
                            value={certSpecialtyInput}
                            onChange={(e) => setCertSpecialtyInput(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-150 rounded-xl text-[10px] font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          >
                            <option value="علوم الحاسوب وتطوير الويب">علوم الحاسوب وتطوير الويب</option>
                            <option value="ذكاء الأعمال وتحليل البيانات">ذكاء الأعمال وتحليل البيانات</option>
                            <option value="الأمن السيبراني والشبكات">الأمن السيبراني والشبكات</option>
                            <option value="إدارة الأعمال واللوجستيات">إدارة الأعمال واللوجستيات</option>
                            <option value="تخصصات أخرى">تخصصات أخرى</option>
                          </select>
                        </div>
                        <button
                          type="submit"
                          className="py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[10px] font-black transition-all shadow-md shadow-blue-500/10 md:col-span-2"
                        >
                          تأكيد التوثيق وتأمين الشهادة في المحفظة والأرشيف الاستباقي
                        </button>
                      </form>
                    </div>

                    {/* Verified certificates box */}
                    <div className="bg-slate-50/50 rounded-3xl p-6 shadow-xs space-y-6 text-right">
                      
                      {/* 1. Header and National Sovereign Link status */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 bg-white p-5 rounded-2xl border">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white flex items-center justify-center text-lg font-black shadow-md shadow-indigo-500/20">
                            🔑
                          </div>
                          <div>
                            <h3 className="text-xs font-black text-slate-800">الخزنة الرقمية المعتمدة والأرشفة الاستباقية (Trusted Decentered Archive Vault)</h3>
                            <p className="text-[10px] text-slate-400">توطين وتنظيم تلقائي لكافة الشهادات والمستندات حسب تاريخ الصلاحية والتخصص الأكاديمي، موقّعة ومحمية على سلاسل الكتل السيادية.</p>
                          </div>
                        </div>
                        <span className="bg-emerald-50 text-emerald-800 font-bold text-[9px] px-3 py-1 rounded-full border border-emerald-200 shrink-0 inline-flex items-center gap-1 self-start sm:self-center">
                          <Activity className="w-3 h-3 text-emerald-600 animate-pulse" />
                          الأرشفة الذكية: نشطة ومحمية
                        </span>
                      </div>

                      {/* 1.5 Dynamic Verified Professional Badge Progress Indicator */}
                      <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-4 shadow-xs text-right animate-fade-in">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-slate-50 pb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-base">🛡️</span>
                            <h4 className="text-[11.5px] font-black text-slate-800">رتبة التوثيق المهني للباحث (Dynamic Professional Verification Badge)</h4>
                          </div>
                          {(() => {
                            const badge = getVerifiedProfessionalBadge();
                            return (
                              <span className={`px-2.5 py-0.5 rounded-full border text-[9.5px] font-black shrink-0 ${badge.textStyle} ${badge.glowClass} flex items-center justify-center gap-1.5`}>
                                <span>{badge.icon}</span>
                                <span>{badge.label}</span>
                              </span>
                            );
                          })()}
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-[9px] font-bold text-slate-500">
                            <span>معدل اكتمال رتبة التوثيق الرقمي</span>
                            <span className="font-mono bg-slate-50 px-1.5 py-0.5 rounded border border-slate-150 text-indigo-700">{getVerifiedProfessionalBadge().pct}</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-150/70 p-[1px]">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 via-indigo-650 to-emerald-500 rounded-full transition-all duration-505" 
                              style={{ width: getVerifiedProfessionalBadge().pct }}
                            />
                          </div>
                          <p className="text-[9px] text-slate-450 leading-relaxed font-bold mt-1">
                            💡 تتقلب رتبتك التوثيقية المرموقة تلقائياً في الترويسة العليا للملف الشخصي وأمام الشركاء بحكم عدد الشهادات الموثقة في الخزنة. حالياً، تمتلك <strong className="text-indigo-650 font-black">{verifiedCertsCount} شهادة موثقة بالبلوكتشين</strong>. أضف المزيد للوصول للرتب السيادية أو البلاتينية المتميزة!
                          </p>
                        </div>
                      </div>

                      {/* 2. Proactive Circular Expiry Alerts (تنبيهات ذكية قبل انتهاء الصلاحية بـ 30 يوماً) */}
                      {(() => {
                        const warningCerts = profile.certificates.filter(cert => {
                          const days = getDaysUntilExpiry(cert.expiryDate);
                          return days !== null && days <= 30 && days >= 0;
                        });

                        const expiredCerts = profile.certificates.filter(cert => {
                          const days = getDaysUntilExpiry(cert.expiryDate);
                          return days !== null && days < 0;
                        });

                        const hasAlerts = warningCerts.length > 0 || expiredCerts.length > 0;

                        return (
                          <div className={`rounded-2xl p-5 border transition-all ${
                            hasAlerts 
                              ? "bg-amber-50/30 border-amber-200" 
                              : "bg-emerald-50/15 border-emerald-100"
                          }`}>
                            <div className="flex items-center gap-2 mb-3">
                              <Bell className={`w-4 h-4 ${hasAlerts ? "text-amber-600 animate-bounce" : "text-emerald-600"}`} />
                              <h4 className="text-[11px] font-black text-slate-800">
                                {hasAlerts ? "تنبيهات انتهاء الصلاحية الاستباقية النشطة (Smart Expiry Alerts)" : "فحص الصلاحية التلقائي (Compliance System Status)"}
                              </h4>
                            </div>

                            {hasAlerts ? (
                              <div className="space-y-3">
                                <p className="text-[10px] text-slate-550 leading-relaxed font-bold">
                                  ⚠️ تم الكشف عن مستندات تقترب من تاريخ انتهاء الصلاحية (خلال أقل من 30 يوماً) أو منتهية الصلاحية. يرجى مراجعة التوجيهات لتفادي تعطل مواءمة التوظيف برمجياً:
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {/* Expired Certificates */}
                                  {expiredCerts.map(cert => {
                                    const daysPast = Math.abs(getDaysUntilExpiry(cert.expiryDate) || 0);
                                    return (
                                      <div key={cert.id} className="bg-red-50/70 border border-red-200/50 p-3 rounded-xl space-y-2">
                                        <div className="flex justify-between items-center">
                                          <span className="text-[9.5px] font-black text-red-800 truncate max-w-[170px]">{cert.title}</span>
                                          <span className="bg-red-100 text-red-800 text-[8px] font-black px-1.5 py-0.5 rounded-full animate-pulse shrink-0">
                                            منتهي الصلاحية ⚠️
                                          </span>
                                        </div>
                                        <p className="text-[8.5px] text-slate-500 leading-normal">
                                          منتهية منذ <span className="text-red-700 font-bold">{daysPast} أيام</span> (تاريخ الانتهاء: {cert.expiryDate}). يرجى إعادة مسح الشهادة المحدثة أو التدقيق اللحظي.
                                        </p>
                                      </div>
                                    );
                                  })}

                                  {/* Expiring Soon (<= 30 days) */}
                                  {warningCerts.map(cert => {
                                    const daysLeft = getDaysUntilExpiry(cert.expiryDate);
                                    return (
                                      <div key={cert.id} className="bg-white border border-amber-200 p-3 rounded-xl space-y-2 shadow-xs">
                                        <div className="flex justify-between items-center">
                                          <span className="text-[9.5px] font-black text-slate-805 truncate max-w-[170px]">{cert.title}</span>
                                          <span className="bg-amber-100 text-amber-800 text-[8px] font-black px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1">
                                            <span className="w-1 h-1 rounded-full bg-amber-600 animate-ping"></span>
                                            باقي {daysLeft} يوماً!
                                          </span>
                                        </div>
                                        <p className="text-[8.5px] text-slate-500 leading-normal">
                                          ينتهي الصلاحية في <span className="font-mono text-amber-700 font-bold">{cert.expiryDate}</span>. يرجى التنسيق الفوري مع الجهة المانحة (<span className="font-bold">{cert.issuer}</span>) لتجديد الاعتماد لتفادي هبوط مؤشر المواءمة الأكاديمية.
                                        </p>
                                        <div className="pt-1.5 border-t border-slate-50 flex justify-between items-center">
                                          <span className="text-[7.5px] text-slate-400">التوصية المهنية: ترقية عبر مسار تلمسان</span>
                                          <button 
                                            type="button"
                                            onClick={() => {
                                              setCertTitleInput("");
                                              setCertIssuerInput("");
                                              alert(`💡 تم تشغيل محاكاة التجديد المسبق للشهادة "${cert.title}". الرجاء استخدام تطبيق الماسح الضوئي OCR لإعادة تلقيم الشهادة الجديدة تاريخياً.`);
                                            }}
                                            className="text-[8px] bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold px-2 py-1 rounded"
                                          >
                                            تحديث الآن 🔄
                                          </button>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">✓</div>
                                <div>
                                  <p className="text-[10px] text-emerald-850 font-black">جميع شهاداتك ومستنداتك النشطة آمنة وصالحة تماماً!</p>
                                  <p className="text-[8.5px] text-slate-400 mt-0.5">لا توجد مستندات رقمية توشك على انتهاء طاقتها الافتراضية خلال الـ 30 يوماً القادمة. فحص السيادة السيبرانية التام بنسبة 100%.</p>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })()}

                      {/* 3. Automatic Specialty Category Folders Section (تقسيم تلقائي حسب التخصص الأكاديمي) */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <h4 className="text-[11px] font-black text-slate-700 flex items-center gap-1.5">
                            <FolderOpen className="w-4 h-4 text-indigo-650" />
                            <span>مجلدات الأرشيف التلقائي الموحد (Categorized Digital Folders):</span>
                          </h4>
                          <span className="text-[8.5px] text-slate-450 bg-slate-100/70 px-2 py-0.5 rounded font-bold">مصنف آلياً عبر خوارزميات القرار الوزاري المشترك</span>
                        </div>

                        {/* Folder Browser Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                          {[
                            { key: "all", label: "كل الأوسمة والشهادات", icon: "📁", hoverColor: "hover:border-indigo-400 bg-slate-50" },
                            { key: "علوم الحاسوب وتطوير الويب", label: "علوم الحاسوب وتطوير الويب", icon: "💻", hoverColor: "hover:border-blue-400 bg-blue-50/10" },
                            { key: "ذكاء الأعمال وتحليل البيانات", label: "ذكاء الأعمال وتحليل البيانات", icon: "📊", hoverColor: "hover:border-purple-400 bg-purple-50/10" },
                            { key: "الأمن السيبراني والشبكات", label: "الأمن السيبراني والشبكات", icon: "🛡️", hoverColor: "hover:border-red-400 bg-red-50/10" },
                            { key: "إدارة الأعمال واللوجستيات", label: "إدارة الأعمال واللوجستيات", icon: "📦", hoverColor: "hover:border-amber-400 bg-amber-50/10" },
                            { key: "تخصصات أخرى", label: "تخصصات أخرى عامة", icon: "⚙️", hoverColor: "hover:border-slate-400 bg-slate-50/10" }
                          ].map(fold => {
                            const foldCount = fold.key === "all" 
                              ? profile.certificates.length 
                              : profile.certificates.filter(c => c.specialty === fold.key || (fold.key === "تخصصات أخرى" && !c.specialty)).length;
                            
                            const isChSelected = selectedFolder === fold.key;

                            return (
                              <button
                                key={fold.key}
                                type="button"
                                onClick={() => setSelectedFolder(fold.key)}
                                className={`p-3 rounded-2xl border text-right transition-all flex flex-col justify-between h-24 ${fold.hoverColor} ${
                                  isChSelected 
                                    ? "ring-2 ring-indigo-600 bg-white shadow-md border-indigo-300 scale-[1.03]" 
                                    : "bg-white border-slate-100"
                                }`}
                              >
                                <span className="text-xl">{fold.icon}</span>
                                <div className="space-y-0.5">
                                  <span className="text-[9.5px] font-black text-slate-850 block truncate leading-tight">{fold.label}</span>
                                  <span className="text-[8.5px] font-mono text-slate-400 font-bold block">{foldCount} وثيقة</span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* 4. Categorized list view rendering */}
                      <div className="space-y-3.5 pt-4 border-t border-slate-100">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 bg-slate-100/50 p-4 rounded-2xl border border-slate-205">
                          <span className="text-[10px] font-black text-slate-700">
                            📂 مستندات المجلد الحالي ({selectedFolder === "all" ? "كافة التخصصات" : selectedFolder}) :
                          </span>
                          
                          {/* Bulk Checkbox select actions */}
                          <div className="flex flex-wrap items-center gap-3">
                            <button
                              type="button"
                              onClick={() => {
                                const listFilteredIds = profile.certificates
                                  .filter(cert => {
                                    if (selectedFolder === "all") return true;
                                    if (selectedFolder === "تخصصات أخرى") return !cert.specialty || cert.specialty === "تخصصات أخرى";
                                    return cert.specialty === selectedFolder;
                                  })
                                  .map(c => c.id);

                                const allSelected = listFilteredIds.every(id => selectedCertsToShare.includes(id));
                                if (allSelected) {
                                  setSelectedCertsToShare(prev => prev.filter(id => !listFilteredIds.includes(id)));
                                } else {
                                  setSelectedCertsToShare(prev => Array.from(new Set([...prev, ...listFilteredIds])));
                                }
                              }}
                              className="px-3 py-1 bg-white hover:bg-slate-50 border border-slate-250 text-slate-700 text-[9px] font-black rounded-lg transition-all"
                            >
                              {(() => {
                                const listFiltered = profile.certificates.filter(cert => {
                                  if (selectedFolder === "all") return true;
                                  if (selectedFolder === "تخصصات أخرى") return !cert.specialty || cert.specialty === "تخصصات أخرى";
                                  return cert.specialty === selectedFolder;
                                });
                                const listFilteredIds = listFiltered.map(c => c.id);
                                const allSelected = listFilteredIds.length > 0 && listFilteredIds.every(id => selectedCertsToShare.includes(id));
                                return allSelected ? "إلغاء تحديد كافة شهادات المجلد ☒" : "تحديد كل شهادات المجلد الحالي ☑";
                              })()}
                            </button>
                          </div>
                        </div>

                        {/* Sovereign Share Floating Action / Summary Panel */}
                        {selectedCertsToShare.length > 0 && (
                          <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-blue-950 text-white rounded-3xl p-5 border border-slate-800 shadow-xl flex flex-col md:flex-row justify-between items-center gap-4 animate-fade-in text-right">
                            <div className="space-y-1 flex-1">
                              <h4 className="text-xs font-black text-white flex items-center gap-1.5 justify-end md:justify-start">
                                <span className="bg-blue-500 text-white font-mono text-[10px] px-2 py-0.5 rounded-full">{selectedCertsToShare.length}</span>
                                <span>شهادات محددة للمشاركة الموثقة</span>
                              </h4>
                              <p className="text-[10px] text-slate-300 leading-relaxed font-bold">يمكنك الآن توليد وتشكيل رابط سيادي خارجي مؤمن لعرضه على أصحاب العمل والمؤسسات التشغيلية بفحص رقمي لحظي.</p>
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                              <button
                                type="button"
                                onClick={() => setSelectedCertsToShare([])}
                                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold rounded-xl transition-all"
                              >
                                إلغاء التحديد ✕
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  const curUrl = window.location.origin + window.location.pathname;
                                  const shareUrl = `${curUrl}?shared_certs=${selectedCertsToShare.join(",")}`;
                                  setGeneratedShareLink(shareUrl);
                                  setShowShareModal(true);
                                }}
                                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-500 hover:to-indigo-555 text-white text-[10.5px] font-black rounded-xl transition-all shadow-md shadow-blue-500/10 flex items-center gap-1.5"
                              >
                                🔗 توليد رابط المشاركة الآمن
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* 4. Categorized list view rendering */}
                      <div className="space-y-3.5 pt-4 border-t border-slate-100">
                        <div className="flex justify-between items-center">
                          <span className="text-[9px] font-black text-slate-500">
                            مستندات المجلد الحالي (
                            {selectedFolder === "all" ? "كافة التخصصات" : selectedFolder}
                            ):
                          </span>
                          <span className="text-[8.5px] text-slate-405 font-bold">بموجب المزامنة والتدقيق السياسي</span>
                        </div>

                        {(() => {
                          const listFiltered = profile.certificates.filter(cert => {
                            if (selectedFolder === "all") return true;
                            if (selectedFolder === "تخصصات أخرى") return !cert.specialty || cert.specialty === "تخصصات أخرى";
                            return cert.specialty === selectedFolder;
                          });

                          if (listFiltered.length === 0) {
                            return (
                              <div className="bg-white border border-dashed border-slate-200 text-center py-10 rounded-2xl space-y-2">
                                <FileText className="w-8 h-8 text-slate-300 mx-auto" />
                                <h5 className="text-[11px] font-black text-slate-500">لا توجد وثائق مؤرشفة بالتخصص المختار!</h5>
                                <p className="text-[8.5px] text-slate-400 max-w-xs mx-auto">قم بمسح وثيقة جديدة ضوئياً عبر الـ OCR وتحديد تاريخ الصلاحية والتخصص لتصنيفها هنا تلقائياً.</p>
                              </div>
                            );
                          }

                          return (
                            <div className="grid grid-cols-1 gap-3">
                              {listFiltered.map((cert) => {
                                const isExpanded = expandedCertId === cert.id;
                                const isVerifying = verifyingCertId === cert.id;
                                const blockNum = cert.id * 8904 + 192831;
                                const txHash = `0x${(cert.id * 18274921 + 92398401).toString(16).substring(0, 8)}...${(cert.id * 9283019 + 1029412).toString(16).substring(0, 6)}`;
                                const sealSign = `DZ-SOV-TLEMCEN-SEAL-${cert.id * 231 + 4096}`;
                                
                                const expiryDays = getDaysUntilExpiry(cert.expiryDate);
                                let expiryBadge = null;
                                if (expiryDays !== null) {
                                  if (expiryDays < 0) {
                                    expiryBadge = (
                                      <span className="bg-red-50 text-red-800 text-[8px] font-black px-2 py-0.5 rounded-md border border-red-200">منتهي الصلاحية ⚠️</span>
                                    );
                                  } else if (expiryDays <= 30) {
                                    expiryBadge = (
                                      <span className="bg-amber-50 text-amber-800 text-[8px] font-black px-2 py-0.5 rounded-md border border-amber-200 animate-pulse">ينتهي خلال {expiryDays} أيام ⚠️</span>
                                    );
                                  } else {
                                    expiryBadge = (
                                      <span className="bg-emerald-50 text-emerald-800 text-[8px] font-bold px-2 py-0.5 rounded-md border border-emerald-200">صالح ومضمون (باقي {expiryDays} يوم)</span>
                                    );
                                  }
                                }

                                return (
                                  <div 
                                    key={cert.id} 
                                    className={`border rounded-2xl transition-all ${
                                      isExpanded 
                                        ? "bg-slate-50/50 border-emerald-300 shadow-sm" 
                                        : "bg-white border-slate-100 hover:border-slate-350 hover:bg-slate-50/20"
                                    }`}
                                  >
                                    {/* Header element */}
                                    <div 
                                      onClick={() => setExpandedCertId(isExpanded ? null : cert.id)}
                                      className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none"
                                    >
                                      <div className="flex items-start gap-3">
                                        {/* Styled Checkbox */}
                                        <div 
                                          className="flex items-center self-center pl-1.5 shrink-0"
                                          onClick={(e) => e.stopPropagation()}
                                        >
                                          <input 
                                            type="checkbox"
                                            checked={selectedCertsToShare.includes(cert.id)}
                                            onChange={() => {
                                              setSelectedCertsToShare(prev => 
                                                prev.includes(cert.id) 
                                                  ? prev.filter(id => id !== cert.id) 
                                                  : [...prev, cert.id]
                                              );
                                            }}
                                            className="w-4 h-4 rounded border-slate-305 text-blue-600 focus:ring-blue-500 accent-blue-650 cursor-pointer"
                                          />
                                        </div>
                                        <div className="w-9 h-9 rounded-xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-center shrink-0">
                                          <Award className="w-4 h-4 text-indigo-650" />
                                        </div>
                                        <div>
                                          <h4 className="text-[11.5px] font-black text-slate-805 leading-tight">{cert.title}</h4>
                                          <div className="flex flex-wrap items-center gap-2 mt-1">
                                            <span className="text-[9.5px] text-slate-500 font-bold block">الجهة المانحة: {cert.issuer}</span>
                                            <span className="text-[8px] text-slate-300">•</span>
                                            <span className="text-[9px] text-indigo-600 bg-indigo-50 px-1.5 py-0.2 rounded font-bold">{cert.specialty || "تخصصات أخرى"}</span>
                                            {cert.expiryDate && (
                                              <>
                                                <span className="text-[8px] text-slate-300">•</span>
                                                <span className="text-[8.5px] text-slate-400 font-mono">تاريخ الانتهاء: {cert.expiryDate}</span>
                                              </>
                                            )}
                                          </div>
                                        </div>
                                      </div>

                                      <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                                        {expiryBadge}
                                        <button
                                          type="button"
                                          id={`qr-btn-${cert.id}`}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveQrCertId(cert.id);
                                          }}
                                          className="generate-qr-btn bg-indigo-50 hover:bg-indigo-150 border border-indigo-200 text-indigo-700 text-[9px] px-2.5 py-1.5 rounded-lg font-black flex items-center gap-1 transition-all hover:scale-[1.03] select-none shrink-0"
                                        >
                                          <QrCode className="w-3.5 h-3.5 text-indigo-650" />
                                          <span>توليد رمز QR للتحقق</span>
                                        </button>
                                        {cert.verified && (
                                          <span className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-[8.5px] px-2.5 py-1 rounded-lg font-black flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                            ✔ موثق بالبلوكتشين
                                          </span>
                                        )}
                                        <span className="text-[9px] text-slate-400 bg-white border border-slate-200 px-2 py-1 rounded-lg font-bold">
                                          {isExpanded ? "طوي ▲" : "تتبع ▼"}
                                        </span>
                                      </div>
                                    </div>

                                    {/* Expanded details: Detailed Blockchain Ledger & Audit Trail */}
                                    {isExpanded && (
                                      <div className="border-t border-slate-100 bg-white/70 backdrop-blur-xs p-4 sm:p-5 rounded-b-2xl space-y-4 animate-fade-in">
                                        
                                        {/* Dynamic Live Verify Section */}
                                        <div className="bg-slate-900 text-white rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-slate-950">
                                          <div className="space-y-1">
                                            <span className="text-[7.5px] uppercase font-mono tracking-wider text-emerald-400 font-black block">عقد المدقق السيادي اللامركزي (Decentralized Smart Node Code)</span>
                                            <div className="flex flex-wrap items-center gap-2">
                                              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping shrink-0" />
                                              <span className="text-[9.5px] font-bold text-slate-200">الكتلة المرجعية رقم: <b className="text-emerald-400 font-mono">#{blockNum}</b></span>
                                              <span className="text-slate-500 font-mono">|</span>
                                              <span className="text-[9px] font-mono text-slate-400 block break-all">مفتاح المعاملة: {txHash}</span>
                                            </div>
                                          </div>

                                          <button
                                            type="button"
                                            disabled={isVerifying}
                                            onClick={() => {
                                              setVerifyingCertId(cert.id);
                                              setTimeout(() => {
                                                setVerifyingCertId(null);
                                                alert(`🛡️ تم التحقق بنجاح من سلامة التوقيع المزدوج للشهادة الرقمية! \nالجهة: ${cert.issuer}\nالتخصص: ${cert.specialty || "غير مصنف"}\nالمطابقة: 100% صالحة وغير قابلة للتغيير.`);
                                              }, 1200);
                                            }}
                                            className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-700 text-slate-950 font-black rounded-lg text-[9px] flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/20"
                                          >
                                            {isVerifying ? (
                                              <>
                                                <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                                                جاري التدقيق السيادي...
                                              </>
                                            ) : (
                                              <>
                                                <Activity className="w-3.5 h-3.5" />
                                                إعادة التحقق اللحظي الآن
                                              </>
                                            )}
                                          </button>
                                        </div>

                                        {/* Cryptographic Seal & Stamps info */}
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 col-span-3">
                                          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 text-right">
                                            <span className="text-[8px] text-slate-400 block">بصمة التوقيع المشفّر للهوية</span>
                                            <span className="text-[9px] font-mono font-bold text-slate-700 block mt-0.5 truncate">{txHash}</span>
                                          </div>

                                          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 text-right">
                                            <span className="text-[8px] text-slate-400 block">الختم الرقمي للمؤسسة (Sovereign Authority Stamp)</span>
                                            <span className="text-[9.5px] font-bold text-indigo-900 block mt-0.5 truncate">{sealSign}</span>
                                          </div>

                                          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 text-right">
                                            <span className="text-[8px] text-slate-400 block">عمر المعاملة وحالة المزامنة</span>
                                            <span className="text-[9px] font-bold text-emerald-700 block mt-0.5">مُثبتة ومُوزّعة (5/5 عقد نشطة)</span>
                                          </div>
                                        </div>

                                        {/* Transparency Visual Ledger Timeline Step-by-Step */}
                                        <div className="mt-3 bg-slate-50 rounded-2xl p-4 border border-slate-150 space-y-3">
                                          <span className="text-[9px] font-black text-slate-700 block uppercase">سلسلة التتبع والشفافية التامة (Blockchain Validation Ledger Trail):</span>
                                          
                                          <div className="relative border-r border-slate-200 pr-5 mr-2 space-y-3 text-right">
                                            
                                            {/* Event 1 */}
                                            <div className="relative">
                                              <div className="absolute -right-[25px] top-1 w-2.5 h-2.5 rounded-full bg-indigo-500 border-2 border-white flex items-center justify-center"></div>
                                              <div>
                                                <div className="flex items-center gap-1.5">
                                                  <span className="text-[9.5px] font-bold text-slate-800">تلقيم وتشفير المستند الاستباقي (PROACTIVE ARCHIVE ENTRY)</span>
                                                  <span className="text-[7.5px] bg-indigo-50 text-indigo-700 px-1.5 py-0.2 rounded font-mono">{cert.date}</span>
                                                </div>
                                                <p className="text-[8px] text-slate-400 mt-0.5">تم توطين وفحص الشهادة من خلال ماسح الذكاء الاصطناعي (Proactive OCR Archival Classifier) وتثبيت الصنف: {cert.specialty || "عام"} وصلاحيته لغاية {cert.expiryDate || "غير محدد"}.</p>
                                              </div>
                                            </div>

                                            {/* Event 2 */}
                                            <div className="relative">
                                              <div className="absolute -right-[25px] top-1 w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center"></div>
                                              <div>
                                                <div className="flex items-center gap-1.5">
                                                  <span className="text-[9.5px] font-bold text-slate-800">التدقيق والتصنيف في التخصص الأكاديمي</span>
                                                  <span className="text-[7.5px] bg-blue-50 text-blue-750 px-1.5 py-0.2 rounded font-mono">{cert.date}</span>
                                                </div>
                                                <p className="text-[8px] text-slate-400 mt-0.5">مطابقة السجل بالرقم الجامعي والقرار المشترك ومواءمته مع فولدر تخصص "{cert.specialty || "أخرى"}" بمغنية وتلمسان تلقائياً.</p>
                                              </div>
                                            </div>

                                            {/* Event 3 */}
                                            <div className="relative">
                                              <div className="absolute -right-[25px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center"></div>
                                              <div>
                                                <div className="flex items-center gap-1.5">
                                                  <span className="text-[9.5px] font-black text-emerald-800 flex items-center gap-1">
                                                    <span>الختم النهائي الاستباقي (Sovereign Authority Block Seal & Alert Link)</span>
                                                  </span>
                                                  <span className="text-[7.5px] bg-emerald-50 text-emerald-800 px-1.5 py-0.2 rounded font-mono font-black">مكتمل ومبرمج للتنبيه</span>
                                                </div>
                                                <p className="text-[8.5px] text-slate-500 mt-0.5">تم صك التوقيع وربط عُقد المراقبة للتنبيه ببرنامج الرسائل قبل تاريخ الصلاحية بـ 30 يوماً بنجاح.</p>
                                              </div>
                                            </div>

                                          </div>
                                        </div>

                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })()}
                      </div>

                    </div>
                  </div>
                )}

                {/* 5. Career Roadmap tab */}
                {candidateSubTab === "career" && (
                  <CandidateRoadmap profile={profile} onUpdateSkill={handleUpdateSkill} />
                )}

                {/* 6. AI Mentor Advisor tab */}
                {candidateSubTab === "advisor" && (
                  <div className="space-y-4 animate-fade-in text-right">
                    <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-xs">
                      <h3 className="text-sm font-black text-slate-800">الموجه المهني الذكي (AI Gemini Co-Pilot)</h3>
                      <p className="text-[10px] text-slate-400 mt-1">تحدث مباشرة مع مستشارك المدعم لترقية الجدارت واستخلاص المرجعية المهنية بموجب قانون ١٢٧٥.</p>
                    </div>
                    <CareerAdvisor />
                  </div>
                )}

                {/* 7. Recommended Learning Paths tab */}
                {candidateSubTab === "learning" && (
                  <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs space-y-6 animate-fade-in text-right">
                    <div className="border-b border-slate-50 pb-4">
                      <h3 className="text-sm font-black text-slate-800">مركز التعلم والمسارات الأكاديمية (Learning Paths)</h3>
                      <p className="text-[10px] text-slate-400 mt-1">اجتاز المسارات المعتمدة لسد ثغرات مهاراتك؛ والرفع التلقائي لنسب الملائمة في حسابك بمجرد إكمالك للدورات تلمسان.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { title: "Python for Data Science Advanced", hours: "15 ساعة معتمدة", suitable: "95% مناسب لمستواك", level: "متقدم", desc: "تطبيقات الهياكل البيانية المتقدمة، حل مشاكل الترميز، وحوكمة بنوك البيانات الرقمية.", skillToRaise: "تحليل البيانات", currentVal: profile.skills["تحليل البيانات"] },
                        { title: "SQL Warehouse Design & Schema", hours: "10 ساعات معتمدة", suitable: "93% مناسب لمستواك", level: "متوسط", desc: "تصميم وإعداد مستودعات قواعد البيانات ونظام التوثيق المتزن والمقاوم للأعطال السحابية.", skillToRaise: "البرمجيات", currentVal: profile.skills["البرمجيات"] },
                        { title: "System DevOps & Docker Containers", hours: "12 ساعة معتمدة", suitable: "88% مناسب لمستواك", level: "مبتدئ", desc: "تغليف وتوزيع برمجيات الويب المتكاملة ومراقبة ثبات المعالجات البرمجية تلقائياً.", skillToRaise: "حل المشكلات", currentVal: profile.skills["حل المشكلات"] },
                        { title: "Corporate Leadership & Conflict Solve", hours: "6 ساعات معتمدة", suitable: "85% مناسب لمستواك", level: "متقدم", desc: "مهارات العمل الجماعي، وإدارة الخلافات وتوزيع العمل العادل لتسليم المشروعات بمرونة.", skillToRaise: "العمل الجماعي", currentVal: profile.skills["العمل الجماعي"] }
                      ].map((course, idx) => (
                        <div key={idx} className="border border-slate-100 p-5 rounded-2xl flex flex-col justify-between hover:border-blue-300 transition-all text-right space-y-4">
                          <div className="space-y-2">
                            <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[8px] font-black">{course.suitable}</span>
                            <h4 className="text-xs font-black text-slate-800">{course.title}</h4>
                            <p className="text-[10px] text-slate-400 leading-normal">{course.desc}</p>
                          </div>
                          <div className="flex items-center justify-between border-t border-slate-50 pt-3 text-[9px] font-bold">
                            <span className="text-slate-400">سيل تلمسان • {course.hours}</span>
                            <button
                              onClick={() => {
                                const nextVal = Math.min(100, course.currentVal + 10);
                                handleUpdateSkill(course.skillToRaise as any, nextVal);
                                alert(`🎉 تهانينا! لقد اجتزت مسار: ${course.title} بنجاح. تم رفع كفاءة مهارة "${course.skillToRaise}" يدوياً في رادار جدارتك بمقدار 10% لتصبح %${nextVal}!`);
                              }}
                              className="px-3 py-1.5 bg-blue-650 hover:bg-blue-755 text-white rounded-xl text-[9px] font-black transition-all"
                            >
                              إكمال المسار فوراً (+10%)
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 8. Mock Interview Simulator tab */}
                {candidateSubTab === "interview" && (
                  <div className="space-y-4 animate-fade-in text-right">
                    <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-xs">
                      <h3 className="text-sm font-black text-slate-800">محاكي المقابلات المهني (Smart Mock Interviews)</h3>
                      <p className="text-[10px] text-slate-400 mt-1">احرص على الإجابة لتوليد التقييم الفوري بالدرجات لربط حساب الباحث مع DZ Software.</p>
                    </div>
                    <MockInterview />
                  </div>
                )}

                {/* 9. Analytical Reports & SWOT tab */}
                {candidateSubTab === "reports" && (
                  <CandidateReports profile={profile} />
                )}

                {/* 10. Personality & Career Intelligence Assessment tab */}
                {candidateSubTab === "assessment" && (
                  <CareerAssessment
                    profile={profile}
                    onUpdateSkills={handleUpdateAllSkills}
                    onAddSystemBadge={(title, issuer) => handleAddCertificate(title, issuer, "2027-06-10", "الذكاء المهني والقيادي")}
                    onNavigateTab={setCandidateSubTab}
                  />
                )}

                {/* 11. Merit Score Historical Timeline & Simulation tab */}
                {candidateSubTab === "timeline" && (
                  <MeritTimeline
                    profile={profile}
                    jobsCount={jobs.length}
                    onAddCertificate={(title, issuer, date, specialty) => {
                      handleAddCertificate(title, issuer, date, specialty);
                    }}
                  />
                )}

              </div>
            </div>
          </div>
          )
        )}

        {/* ==================== Perspective 3: Company Portal ==================== */}
        {currentPerspective === "company" && (
          !sessions.company.loggedIn ? (
            <PortalLoginView
              role="company"
              onLogin={(name, email, org) => {
                setSessions(prev => ({
                  ...prev,
                  company: { loggedIn: true, name, email, org }
                }));
              }}
              onCancel={() => setCurrentPerspective("landing")}
            />
          ) : (
            <div className="space-y-6 animate-fade-in font-sans" dir="rtl">
            
            {/* Corporate Summary Welcome Header block */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 text-right w-full md:w-auto">
                <div className="w-14 h-14 rounded-full bg-indigo-50 text-indigo-650 flex items-center justify-center font-black text-lg shadow-sm border border-indigo-100">
                  ت
                </div>
                <div>
                  <h2 className="text-base font-black text-slate-800 flex items-center gap-2">
                    مرحباً، شركة تكنو نوفا 👋
                    <span className="bg-blue-100 text-blue-800 text-[9px] font-black px-2.5 py-0.5 rounded-full">حساب المؤسسة</span>
                  </h2>
                  <p className="text-[11px] text-slate-400">مدير عام الموارد البشرية | تلمسان الرقمية</p>
                  <p className="text-[10px] text-indigo-650 mt-1 font-black">🏢 رخصة TRACK المعتمدة للقرار الوزاري الموجه</p>
                </div>
              </div>

              {/* Comprehensive Merit and filter analytics badges */}
              <div className="bg-slate-50 border border-slate-150 p-4 rounded-2xl text-center shrink-0 min-w-[150px]">
                <span className="text-[9px] text-slate-450 block font-bold mb-1">نسبة كفاءة الفرز الحالية</span>
                <span className="text-3xl font-black font-mono text-indigo-600">%94</span>
                <span className="bg-emerald-100 text-emerald-800 text-[8px] font-black px-2.5 py-0.5 rounded-full block mt-1.5 mx-auto w-max">
                  جودة مثالية (Verified)
                </span>
              </div>
            </div>

            {/* Split View Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column Sidebar navigation for company sub-tabs */}
              <div className="lg:col-span-3 bg-white border border-slate-100 rounded-3xl p-4 shadow-sm space-y-4">
                <div className="border-b border-slate-50 pb-2.5 px-2">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-wide">أقسام فضاء المؤسسة</h3>
                </div>

                <div className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 no-scrollbar select-none">
                  {[
                    { id: "dashboard", label: "لوحة الفرز الذكية", icon: LayoutDashboard, color: "text-blue-650 bg-blue-50/50" },
                    { id: "candidates", label: "المرشحون المتاحون", icon: Users, color: "text-indigo-650 bg-indigo-50/50" },
                    { id: "comparison", label: "مقارنة مباشرة", icon: Sliders, color: "text-amber-600 bg-amber-50/50" },
                    { id: "skills", label: "فجوات المهارات", icon: TrendingUp, color: "text-red-500 bg-red-50/50" },
                    { id: "intelligence", label: "ذكاء الاستقطاب", icon: Building, color: "text-purple-600 bg-purple-50/50" }
                  ].map((tab) => {
                    const IconComp = tab.icon;
                    const isActive = companySubTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setCompanySubTab(tab.id as any)}
                        className={`w-full text-right px-3.5 py-3 rounded-2xl flex items-center gap-3 transition-all shrink-0 lg:shrink text-xs ${
                          isActive
                            ? "bg-indigo-600 text-white font-black shadow-md shadow-indigo-500/15"
                            : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
                        }`}
                      >
                        <span className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                          isActive ? "bg-white/15 text-white" : tab.color
                        }`}>
                          <IconComp className="w-4 h-4" />
                        </span>
                        <span className="truncate">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Pane content area */}
              <div className="lg:col-span-9 space-y-6">
                
                {/* 1. Dashboard View */}
                {companySubTab === "dashboard" && (
                  <CompanyDashboardComponent
                    jobs={jobs}
                    onNavigateTab={setCompanySubTab}
                    onPostJobClick={() => setIsAddingJob(true)}
                  />
                )}

                {/* 2. Candidates List View */}
                {companySubTab === "candidates" && (
                  <CompanyCandidatesList
                    onInterviewRequest={(name) => {
                      alert(`🚀 تم إرسال طلب المقابلة بنجاح إلى المرشح: ${name} عبر نظام المطابقة المزدوجة بالمنصة!`);
                    }}
                    onCompareSelect={(cand) => {
                      setCompanySubTab("comparison");
                    }}
                  />
                )}

                {/* 3. Comparison Table View */}
                {companySubTab === "comparison" && (
                  <CompanyComparisonTable
                    onClearComparison={() => {
                      alert("تمت إعادة ضبط فضاء المقارنة بنجاح.");
                    }}
                  />
                )}

                {/* 4. Skills Gaps Analysis View */}
                {companySubTab === "skills" && (
                  <CompanySkillsGaps />
                )}

                {/* 5. HR Intelligence Planning View */}
                {companySubTab === "intelligence" && (
                  <CompanyHRIntelligence />
                )}

              </div>
            </div>

            {/* Gorgeous Job Posting Modal Overlay wrapper */}
            {isAddingJob && (
              <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xl max-w-md w-full text-right space-y-4 animate-scale-up">
                  <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                    <h3 className="text-sm font-black text-slate-800">نشر عرض عمل مواءمة جديد</h3>
                    <button
                      onClick={() => setIsAddingJob(false)}
                      className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handlePostJob} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-455 block">مسمى المنصب المطلوب</label>
                      <input
                        type="text"
                        required
                        value={newJobTitle}
                        onChange={(e) => setNewJobTitle(e.target.value)}
                        placeholder="مثال: DevOps Engineer"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-150 rounded-xl text-xs focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-455 block">الراتب الشهري المقدر (دج)</label>
                      <input
                        type="text"
                        required
                        value={newJobSalary}
                        onChange={(e) => setNewJobSalary(e.target.value)}
                        placeholder="220,000 دج"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-150 rounded-xl text-xs focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-455 block">تفاصيل المهام والجدارات الأساسية</label>
                      <textarea
                        rows={3}
                        required
                        value={newJobDesc}
                        onChange={(e) => setNewJobDesc(e.target.value)}
                        placeholder="يركز على إعداد بيئات وتراخيص البنية وتوزيع الحزم..."
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-150 rounded-xl text-xs focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-755 text-white rounded-xl text-[10px] font-black transition-all shadow-md shadow-indigo-500/10"
                    >
                      نشر العرض وتفعيل الفرز المزدوج
                    </button>
                  </form>
                </div>
              </div>
            )}

          </div>
          )
        )}

        {/* ==================== Perspective 4: University Partner ==================== */}
        {currentPerspective === "university" && (
          !sessions.university.loggedIn ? (
            <PortalLoginView
              role="university"
              onLogin={(name, email, org) => {
                setSessions(prev => ({
                  ...prev,
                  university: { loggedIn: true, name, email, org }
                }));
              }}
              onCancel={() => setCurrentPerspective("landing")}
            />
          ) : (
            <div className="animate-fade-in">
              {/* Pass state update handle down */}
              <UniversityPlanner onAddCertificateToStudent={handleAddCertificate} />
            </div>
          )
        )}

        {/* ==================== Perspective 5: Sovereign Government Portal ==================== */}
        {currentPerspective === "sovereign" && (
          !sessions.sovereign.loggedIn ? (
            <PortalLoginView
              role="sovereign"
              onLogin={(name, email, org) => {
                setSessions(prev => ({
                  ...prev,
                  sovereign: { loggedIn: true, name, email, org }
                }));
              }}
              onCancel={() => setCurrentPerspective("landing")}
            />
          ) : (
            <div className="animate-fade-in">
              <SovereignTools />
            </div>
          )
        )}

        {/* ==================== Perspective 6: Super Administrator Governance Panel ==================== */}
        {currentPerspective === "admin" && (
          !sessions.admin.loggedIn ? (
            <PortalLoginView
              role="admin"
              onLogin={(name, email, org) => {
                setSessions(prev => ({
                  ...prev,
                  admin: { loggedIn: true, name, email, org }
                }));
              }}
              onCancel={() => setCurrentPerspective("landing")}
            />
          ) : (
            <div className="animate-fade-in text-right">
              <AdminDashboard
                sessionUser={sessions.admin}
                onLogout={() => {
                  setSessions(prev => ({
                    ...prev,
                    admin: { loggedIn: false, name: "", email: "", org: "" }
                  }));
                  setCurrentPerspective("landing");
                }}
                fileLinkages={fileLinkages}
                setFileLinkages={setFileLinkages}
                policies={policies}
                setPolicies={setPolicies}
                adminLogs={adminLogs}
                setAdminLogs={setAdminLogs}
              />
            </div>
          )
        )}

      </main>

      {/* Sovereign Sharing Links Generation Modal Overlay */}
      {showShareModal && generatedShareLink && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-2xl max-w-lg w-full text-right space-y-5 animate-scale-up">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">🔗</span>
                <h3 className="text-sm font-black text-slate-800">رابط المشاركة الموثق للصلاحيات (Sovereign Verified Link)</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowShareModal(false)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-[10.5px] text-slate-500 leading-normal font-bold">
                🔒 تم تشكيل الرمز التعريفي المشفر للشهادات المحددة بنجاح. يمكنك الآن نسخ هذا الرابط وتقديمه لأي صاحب عمل أو جهة توظيف للفحص الفوري:
              </p>
              
              <div className="bg-slate-100 p-3.5 rounded-xl border border-slate-200 flex items-center justify-between gap-3 font-mono text-[9px] text-slate-700 select-all break-all overflow-x-auto text-left" dir="ltr">
                {generatedShareLink}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(generatedShareLink);
                  alert("📋 تم نسخ رابط المشاركة المدقق للحافظة بنجاح! يمكنك إرساله تواصلياً مع أصحاب العمل.");
                }}
                className="px-4 py-2.5 bg-indigo-650 hover:bg-indigo-700 text-white font-black text-[10.5px] rounded-xl transition-all shadow-md shadow-indigo-550/15 flex items-center justify-center gap-1.5"
              >
                📋 نسخ رابط المشاركة للذاكرة
              </button>
              
              <button
                type="button"
                onClick={() => {
                  setShowShareModal(false);
                  setIsEmployerAccessSimulation(true);
                }}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10.5px] rounded-xl transition-all shadow-md shadow-emerald-600/15 flex items-center justify-center gap-1"
              >
                👀 جرب الدخول المباشر باسم صاحب العمل
              </button>
            </div>

            <p className="text-[8.5px] text-slate-400 text-center">
              بموجب السيادة والمصادقة على القرار الوزاري المشترك، فإن أي تعديل في الملف يغير بصمة العقد تلائماً.
            </p>
          </div>
        </div>
      )}

      {/* QR Code Dynamic Verification Modal Overlay */}
      {activeQrCertId !== null && (() => {
        const cert = profile.certificates.find(c => c.id === activeQrCertId);
        if (!cert) return null;
        const blockNum = cert.id * 8904 + 192831;
        const txHash = `0x${(cert.id * 18274921 + 92398401).toString(16).substring(0, 8)}...${(cert.id * 9283019 + 1029412).toString(16).substring(0, 6)}`;
        const verificationUrl = `${window.location.origin}${window.location.pathname}?shared_certs=${cert.id}`;
        const qrImageSrc = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(verificationUrl)}`;

        return (
          <div className="fixed inset-0 z-[11000] bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-4">
            <style>{`
              @keyframes scan-line {
                0% { top: 0%; }
                50% { top: 100%; }
                100% { top: 0%; }
              }
              .animate-scan {
                animation: scan-line 3s ease-in-out infinite;
              }
            `}</style>
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-2xl max-w-md w-full text-right space-y-5 animate-scale-up relative overflow-hidden">
              
              {/* Aesthetic top accent banner */}
              <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-indigo-500 via-blue-500 to-emerald-500" />

              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🛡️</span>
                  <h3 className="text-sm font-black text-slate-800">التحقق اللحظي المشفر (Real-time QR Verification)</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveQrCertId(null)}
                  className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4 text-center">
                <p className="text-[10.5px] text-slate-500 leading-normal font-bold">
                  مسح هذا الرمز يمنح الشركاء والشركات وصولاً فورياً وبصمة مباشرة ومصادقة حية من البلوكتشين للشهادة المحددة:
                </p>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 inline-block text-right w-full">
                  <h4 className="text-[11px] font-black text-slate-800 mb-1">{cert.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded font-bold">{cert.specialty || "تخصصات أخرى"}</span>
                    <span className="text-[9px] text-slate-550 font-bold">{cert.issuer}</span>
                  </div>
                </div>

                {/* QR Code Graphic Frame */}
                <div className="relative mx-auto w-48 h-48 bg-white border-2 border-slate-100 rounded-2xl p-2 flex items-center justify-center shadow-lg overflow-hidden">
                  {/* Pulsing Scan Guides */}
                  <div className="absolute top-1 right-1 w-4 h-4 border-t-4 border-r-4 border-indigo-500 rounded-tr" />
                  <div className="absolute top-1 left-1 w-4 h-4 border-t-4 border-l-4 border-indigo-500 rounded-tl" />
                  <div className="absolute bottom-1 right-1 w-4 h-4 border-b-4 border-r-4 border-indigo-500 rounded-br" />
                  <div className="absolute bottom-1 left-1 w-4 h-4 border-b-4 border-l-4 border-indigo-500 rounded-bl" />
                  
                  {/* Scanning Line */}
                  <div className="absolute left-0 right-0 h-0.5 bg-indigo-500/80 shadow-md animate-scan z-10" />

                  {/* The QR Image */}
                  <img 
                    src={qrImageSrc} 
                    alt="Blockchain Verification QR Code" 
                    className="w-full h-full object-contain select-none z-0"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        const fallback = parent.querySelector('.qr-fallback');
                        if (fallback) fallback.classList.remove('hidden');
                      }
                    }}
                  />

                  {/* Fallback Procedural QR SVG */}
                  <div className="qr-fallback hidden absolute inset-2 bg-slate-50 flex flex-col items-center justify-center space-y-1.5 p-2 rounded-xl text-slate-700 z-0">
                    <div className="grid grid-cols-6 gap-0.5 w-24 h-24 bg-white p-1.5 border border-slate-200">
                      {Array.from({ length: 36 }).map((_, i) => {
                        const isBlack = (i % 2 === 0 && i % 3 !== 0) || (i > 8 && i < 15) || i === 0 || i === 5 || i === 30 || i === 35;
                        return (
                          <div 
                            key={i} 
                            className={`rounded-[1px] ${isBlack ? "bg-slate-900" : "bg-transparent"}`} 
                          />
                        );
                      })}
                    </div>
                    <span className="text-[7.5px] font-mono text-slate-400 font-bold block">OFFLINE PREVIEW MODE</span>
                  </div>
                </div>

                <div className="space-y-2 text-right">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-150 space-y-1.5 font-mono text-[9px]">
                    <div className="flex justify-between items-center text-slate-500">
                      <span>رقم الكتلة (Block):</span>
                      <span className="text-indigo-700 font-bold">#{blockNum}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-500">
                      <span>توقيع البصمة (Tx Hash):</span>
                      <span className="text-slate-700 font-bold truncate max-w-[200px]">{txHash}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-500">
                      <span>مصادقة السيادة:</span>
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                        مؤمنة 100%
                      </span>
                    </div>
                  </div>

                  <p className="text-[9.5px] text-slate-500 leading-normal text-center font-bold">
                    💡 يمكنك توجيه كاميرا الهاتف لمسح الرمز أو نسخ رابط التحقق المباشر أدناه.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(verificationUrl);
                    alert("📋 تم نسخ غطاء الرابط المشفر للحافظة بنجاح!");
                  }}
                  className="px-4 py-2.5 bg-indigo-650 hover:bg-indigo-700 text-white font-black text-[10.5px] rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  📋 نسخ رابط التحقق
                </button>
                <button
                  type="button"
                  onClick={() => setActiveQrCertId(null)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-[10.5px] rounded-xl transition-all flex items-center justify-center gap-1"
                >
                  إغلاق النافذة
                </button>
              </div>

            </div>
          </div>
        );
      })()}

      {/* Footer copyright */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8 text-center text-slate-400 font-sans text-xs mt-16">
        <p className="font-bold text-slate-300">© 2026 مسار TRACK - مشروع مؤسسة ناشئة مدعمة بالقرار الوزاري الموجه</p>
        <p className="text-[10px] text-slate-500 mt-1">تم التطوير والنمذجة البرمجية المتكاملة مع DZ Software والمركز الجامعي بمغنية لخدمة ترقية المنظومة الرقمية.</p>
      </footer>

    </div>
    </AutoTranslate>
  );
}
