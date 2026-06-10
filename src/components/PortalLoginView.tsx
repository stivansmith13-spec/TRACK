import React, { useState } from "react";
import { Mail, User, Building, GraduationCap, Scale, Lock, Settings, ChevronLeft, ShieldCheck } from "lucide-react";

interface PortalLoginViewProps {
  role: "candidate" | "company" | "university" | "sovereign" | "admin";
  onLogin: (name: string, email: string, org: string) => void;
  onCancel?: () => void;
}

export default function PortalLoginView({ role, onLogin, onCancel }: PortalLoginViewProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [error, setError] = useState("");

  // Portal configuration presets for easy testing and high fidelity
  const presets = {
    candidate: {
      title: "فضاء الباحث عن العمل",
      subtitle: "الولوج الآمن عبر الهوية المهنية الذكية الموثقة",
      icon: User,
      color: "blue",
      bgGradient: "from-blue-500/10 to-indigo-500/10",
      presetName: "أحمد بن علي",
      presetEmail: "ahmed@jadarati.dz",
      presetOrg: "ولاية تلمسان",
    },
    company: {
      title: "لوحة تحكم الشريك الاقتصادي والمؤسسة",
      subtitle: "بوابة الشركات المعتمدة للربط والتوظيف الموجه",
      icon: Building,
      color: "indigo",
      bgGradient: "from-indigo-500/10 to-purple-500/10",
      presetName: "د. كامل تواتي",
      presetEmail: "kamel.touati@tlemcen-digital.dz",
      presetOrg: "مؤسسة تلمسان للحلول الرقمية",
    },
    university: {
      title: "بوابة الشريك الأكاديمي والتعليم العالي",
      subtitle: "واجهة الجامعات ومعاهد التكوين لإصدار الشهادات المؤمّنة",
      icon: GraduationCap,
      color: "teal",
      bgGradient: "from-teal-500/10 to-emerald-500/10",
      presetName: "أ.د فوزية بلحاج",
      presetEmail: "f.belhadj@univ-tlemcen.dz",
      presetOrg: "جامعة أبي بكر بلقايد - تلمسان",
    },
    sovereign: {
      title: "مركز القرار السيادي والمتابعة الوطنية",
      subtitle: "بوابة وزارة التشغيل والضمان الاجتماعي وصانعي السياسات",
      icon: Scale,
      color: "emerald",
      bgGradient: "from-emerald-500/10 to-green-500/10",
      presetName: "الأستاذ مراد سي شريف",
      presetEmail: "m.sicherif@ministere-travail.gov.dz",
      presetOrg: "وزارة العمل والتشغيل والضمان الاجتماعي",
    },
    admin: {
      title: "لوحة تحكم المشرف العام وتنسيق الفيدراليات",
      subtitle: "إدارة ومراقبة بروتوكولات حوكمة ربط الملفات وسجلات المنصة",
      icon: Settings,
      color: "amber",
      bgGradient: "from-amber-500/10 to-orange-500/10",
      presetName: "المهندس سمير براهيمي",
      presetEmail: "samir.b@track-admin.dz",
      presetOrg: "المرصد الوطني للتشغيل - إدارة الأنظمة",
    }
  };

  const cfg = presets[role];
  const IconComponent = cfg.icon;

  const handlePresetSelect = () => {
    setName(cfg.presetName);
    setEmail(cfg.presetEmail);
    setOrg(cfg.presetOrg);
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("يرجى إدخال الاسم بالكامل");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("يرجى إدخال بريد إلكتروني صالح");
      return;
    }
    setError("");
    onLogin(name, email, org);
  };

  return (
    <div id="portal-login-card" className="max-w-md mx-auto my-8 bg-white border border-slate-150 rounded-[40px] shadow-2xl overflow-hidden text-right relative">
      {/* Top Graphic Banner with brand accent and subtle grid lines */}
      <div className={`p-8 bg-gradient-to-br ${cfg.bgGradient} border-b border-slate-100 flex flex-col items-center justify-center text-center space-y-4 relative`}>
        {/* Absolute top badge representing Algerian Republic compliance */}
        <div className="absolute top-3 left-4 flex items-center gap-1.5 bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded-full border border-slate-200/50 text-[8px] font-black text-slate-500">
          <span>Compliant</span>
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>المرسوم الوزاري للتشغيل</span>
        </div>

        <div className={`w-16 h-16 rounded-3xl bg-white shadow-md flex items-center justify-center border border-slate-100`}>
          <IconComponent className={`w-8 h-8 text-${cfg.color}-600`} />
        </div>
        <div className="space-y-1">
          <h2 className="text-lg font-black text-slate-800 leading-tight">{cfg.title}</h2>
          <p className="text-[10px] text-slate-500 leading-normal max-w-xs">{cfg.subtitle}</p>
        </div>
      </div>

      {/* Main Login / Credentials form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        
        {/* Preset Bypass Banner - Highly Interactive and Friendly */}
        <div className="bg-slate-50 border border-slate-150 rounded-2xl p-3.5 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[9px] text-slate-400 font-bold block">Preset Test Account compliant</span>
            <span className="text-[10px] font-black text-indigo-650">⚡ تسجيل سريع بنقرة واحدة للتجربة والتقييم</span>
          </div>
          <button
            type="button"
            onClick={handlePresetSelect}
            className="w-full py-2 px-3 bg-white hover:bg-indigo-50/50 border border-slate-200 text-slate-700 hover:text-indigo-700 text-[10px] font-black rounded-xl text-right transition-all flex items-center justify-between shadow-xs"
          >
            <div className="flex items-center gap-2">
              <span className="bg-slate-100 text-slate-600 text-[8.5px] px-2 py-0.5 rounded font-black max-w-[200px] truncate">{cfg.presetEmail}</span>
              <span className="text-slate-850">{cfg.presetName}</span>
            </div>
            <span className="text-indigo-600 text-[9.5px]">تعبئة تلقائية 📋</span>
          </button>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 text-[10.5px] p-3 rounded-xl font-bold flex items-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Input Name */}
        <div className="space-y-1">
          <label className="text-[11px] font-black text-slate-600 block">الاسم واللقب بالكامل:</label>
          <div className="relative">
            <User className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => { setName(e.target.value); setError(""); }}
              placeholder={cfg.presetName}
              className="w-full text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-4 py-3 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all text-right"
            />
          </div>
        </div>

        {/* Input Email */}
        <div className="space-y-1">
          <label className="text-[11px] font-black text-slate-600 block">البريد الإلكتروني المهني:</label>
          <div className="relative">
            <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              placeholder={cfg.presetEmail}
              className="w-full text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-4 py-3 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all text-right"
            />
          </div>
        </div>

        {/* Input Organization / Location */}
        {role !== "candidate" && (
          <div className="space-y-1">
            <label className="text-[11px] font-black text-slate-600 block">المؤسسة / الهيئة / الجامعة:</label>
            <div className="relative">
              <Building className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                value={org}
                onChange={(e) => { setOrg(e.target.value); setError(""); }}
                placeholder={cfg.presetOrg}
                className="w-full text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-4 py-3 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all text-right"
              />
            </div>
          </div>
        )}

        <div className="space-y-3 pt-2">
          {/* Main Action Submit */}
          <button
            type="submit"
            className={`w-full py-3 px-4 bg-slate-900 hover:bg-slate-850 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.01]`}
          >
            <Lock className="w-3.5 h-3.5 text-white/90" />
            <span>تسجيل الدخول الآمن للمنصة</span>
          </button>

          {/* Cancel button to go back */}
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl text-center transition-all"
            >
              الرجوع للرئيسية
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
