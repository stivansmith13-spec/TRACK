import React, { useState } from "react";
import { 
  Filter, 
  Link2, 
  Sparkles, 
  MapPin, 
  CheckCircle2, 
  RefreshCw, 
  Workflow, 
  Radio, 
  ShieldCheck, 
  Cpu, 
  HelpCircle,
  HelpCircle as QuestionIcon
} from "lucide-react";

interface PortalSideFilterProps {
  currentPerspective: "candidate" | "company" | "university" | "sovereign" | "admin";
  selectedSkill: string;
  onChangeSkill: (skill: string) => void;
  selectedRegion: string;
  onChangeRegion: (region: string) => void;
  sovereignOnly: boolean;
  onChangeSovereignOnly: (val: boolean) => void;
}

export default function PortalSideFilter({
  currentPerspective,
  selectedSkill,
  onChangeSkill,
  selectedRegion,
  onChangeRegion,
  sovereignOnly,
  onChangeSovereignOnly
}: PortalSideFilterProps) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [showHelper, setShowHelper] = useState(false);

  const skills = [
    { value: "All", label: "جميع التخصصات 💼" },
    { value: "البرمجيات", label: "تطوير الويب والسحابة (React/Node) 💻" },
    { value: "تحليل البيانات", label: "الذكاء الاصطناعي وبصمة البيانات 📊" },
    { value: "حل المشكلات", label: "أمن الشبكات وحماية المعطيات 🛡️" }
  ];

  const regions = [
    { value: "All", label: "كل الولايات 🇩🇿" },
    { value: "تلمسان", label: "ولاية تلمسان 🏞️" },
    { value: "مغنية", label: "منطقة مغنية الحدودية 🏢" },
    { value: "وهران", label: "ولاية وهران 🏖️" },
    { value: "الجزائر العاصمة", label: "الجزائر العاصمة 🏛️" }
  ];

  // Under-the-hood metrics simulation based on the active selection
  const getFederatedBridges = () => {
    let connectedPortalsCount = 4;
    let matchingJobs = 4;
    let targetGraduates = 1455;
    let integrityScore = 98.4;

    if (selectedSkill !== "All") {
      connectedPortalsCount += 1;
      integrityScore += 0.8;
      matchingJobs = selectedSkill === "البرمجيات" ? 1 : selectedSkill === "تحليل البيانات" ? 2 : 1;
    }

    if (selectedRegion !== "All") {
      integrityScore = 99.1;
      targetGraduates = selectedRegion === "تلمسان" ? 420 : selectedRegion === "مغنية" ? 180 : 610;
    }

    if (sovereignOnly) {
      integrityScore = 100;
      connectedPortalsCount = 5;
    }

    return {
      connectedPortalsCount,
      matchingJobs,
      targetGraduates,
      integrityScore: integrityScore.toFixed(1)
    };
  };

  const bridges = getFederatedBridges();

  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 850);
  };

  // Switch labels based on current active view
  const getPerspectiveLabel = () => {
    switch (currentPerspective) {
      case "candidate": return "الباحث عن عمل 🎓";
      case "company": return "المؤسسة والتوظيف 🏢";
      case "university": return "الجامعة الأكاديمية 🏫";
      case "sovereign": return "الجهة السيادية 🇩🇿";
      case "admin": return "المشرف العام ⚙️";
    }
  };

  return (
    <div 
      className="bg-white border border-slate-150 rounded-3xl p-5 shadow-sm space-y-5 text-right font-sans relative overflow-hidden" 
      dir="rtl"
      id="portal-side-federated-filter"
    >
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-0 w-20 h-20 bg-blue-500/5 rounded-full blur-2xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Filter className="w-4 h-4 text-blue-600" />
          </span>
          <div>
            <h3 className="text-xs font-black text-slate-800">تصفية ومواءمة ذكية بينية</h3>
            <span className="text-[8px] bg-sky-50 text-sky-600 px-1.5 py-0.5 rounded-md font-bold uppercase">
              Implicit Federated Mesh
            </span>
          </div>
        </div>

        <button 
          onClick={() => setShowHelper(!showHelper)}
          className="text-slate-400 hover:text-blue-500 transition-colors"
          title="معلومات الربط الخفي"
          type="button"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
      </div>

      {showHelper && (
        <div className="bg-sky-50 border border-sky-100 p-3 rounded-xl text-[9.5px] text-sky-950 leading-relaxed animate-fade-in space-y-1">
          <strong className="block text-sky-900">🔗 الترابط المرن في الخلفية:</strong>
          <p>بمجرد تغيير الفلاتر هنا، تتحدث الصفحة الحالية تلقائياً، وفي نفس الوقت يتم في الخلفية مواءمة كفاءاتك مع شواغر الشركات، ترشيحات التعديل للجامعة، وسجلات التدقيق للبلوكشين السيادي وتأكيد الرابط.</p>
        </div>
      )}

      {/* Active Perspective Indicator */}
      <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl flex items-center justify-between">
        <span className="text-[9px] text-slate-400 font-bold">تحكم نشط لبوابة:</span>
        <span className="text-[10px] font-black text-blue-900 mr-2 flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
          {getPerspectiveLabel()}
        </span>
      </div>

      {/* Specialty Filter */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold text-slate-500 block">مجال المهارات المستهدف:</label>
        <div className="space-y-1">
          {skills.map((skill) => (
            <button
              key={skill.value}
              type="button"
              onClick={() => onChangeSkill(skill.value)}
              className={`w-full text-right p-2 rounded-xl text-[10px] font-bold border transition-all flex items-center justify-between ${
                selectedSkill === skill.value
                  ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/10"
                  : "bg-white text-slate-650 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
              }`}
            >
              <span>{skill.label}</span>
              {selectedSkill === skill.value && (
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Region Filter */}
      <div className="space-y-1.5 pt-1">
        <label className="text-[10px] font-bold text-slate-500 block font-sans">توزيع التوطين الإقليمي:</label>
        <select
          value={selectedRegion}
          onChange={(e) => onChangeRegion(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[10.5px] font-bold text-slate-850 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {regions.map((reg) => (
            <option key={reg.value} value={reg.value}>
              {reg.label}
            </option>
          ))}
        </select>
      </div>

      {/* Sovereignty / Blockchain only Verification */}
      <div className="pt-1">
        <button
          type="button"
          onClick={() => onChangeSovereignOnly(!sovereignOnly)}
          className={`w-full p-2.5 rounded-xl border text-[10px] font-bold flex items-center justify-between transition-all ${
            sovereignOnly
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-white border-slate-200 text-slate-550 hover:bg-slate-50"
          }`}
        >
          <div className="flex items-center gap-1.5">
            <ShieldCheck className={`w-4 h-4 ${sovereignOnly ? "text-emerald-600" : "text-slate-400"}`} />
            <span>تدقيق البلوكشين السيادي الحصري</span>
          </div>
          <span className={`w-4 h-4 rounded-full border flex items-center justify-center p-0.5 ${
            sovereignOnly ? "bg-emerald-500 border-emerald-600 text-white" : "border-slate-300 bg-white"
          }`}>
            {sovereignOnly && "✓"}
          </span>
        </button>
      </div>

      {/* Simulated Background Mesh / Implicit Bridges status update */}
      <div className="bg-slate-900 text-slate-200 p-3.5 rounded-2xl border border-slate-800 space-y-2.5">
        <div className="flex items-center justify-between text-[9px] text-blue-300 font-bold border-b border-slate-800 pb-1.5">
          <span className="flex items-center gap-1">
            <Workflow className="w-3 h-3 text-blue-400 animate-spin" />
            <span>الترابط الخفي النشط الفوري:</span>
          </span>
          <span className="font-mono text-emerald-400">ONLINE</span>
        </div>

        <div className="space-y-1.5 text-[9px] leading-relaxed">
          <div className="flex justify-between">
            <span className="text-slate-400">القنوات المتزامنة من المنصة:</span>
            <span className="font-mono text-blue-400 font-bold">{bridges.connectedPortalsCount} بوابات نشطة</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">عروض متلائمة بالمستودع:</span>
            <span className="font-mono text-amber-400 font-bold">{bridges.matchingJobs} فرص معتمدة</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">كفاءات في المدى الإقليمي:</span>
            <span className="font-mono text-cyan-400 font-bold">{bridges.targetGraduates} خريج</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">مؤشر موثوقية الأرقام (السيادة):</span>
            <span className="font-mono text-emerald-400 font-bold">%{bridges.integrityScore}</span>
          </div>
        </div>

        <div className="border-t border-slate-850 pt-2 flex justify-between items-center text-[8.5px]">
          <span className="text-slate-500">مزامنة العقد فوري:</span>
          <button
            type="button"
            onClick={handleManualSync}
            disabled={isSyncing}
            className="flex items-center gap-1 text-blue-400 hover:text-blue-300 font-bold"
          >
            <RefreshCw className={`w-2.5 h-2.5 ${isSyncing ? "animate-spin" : ""}`} />
            <span>{isSyncing ? "جاري التحديث..." : "موافقة يدوية وتحديث العقد"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
