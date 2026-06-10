import React, { useState } from "react";
import {
  Search,
  Filter,
  MapPin,
  Award,
  Sparkles,
  Sliders,
  CheckCircle2,
  Calendar,
  X,
  UserCheck,
  ChevronDown
} from "lucide-react";

interface CompanyCandidate {
  name: string;
  role: string;
  match: number;
  location: string;
  rating: number;
  skills: string[];
  meritScore: number;
  tier: string;
  verified: boolean;
  avatar: string;
  bg: string;
}

interface CompanyCandidatesListProps {
  onInterviewRequest: (name: string) => void;
  onCompareSelect: (candidate: CompanyCandidate) => void;
  selectedSkill?: string;
  selectedRegion?: string;
  sovereignOnly?: boolean;
}

export default function CompanyCandidatesList({
  onInterviewRequest,
  onCompareSelect,
  selectedSkill = "All",
  selectedRegion = "All",
  sovereignOnly = false
}: CompanyCandidatesListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoleFilter, setSelectedRoleFilter] = useState("الكل");
  const [selectedLocationFilter, setSelectedLocationFilter] = useState("الكل");

  const candidatesList: CompanyCandidate[] = [
    {
      name: "أحمد ولد علي",
      role: "Full Stack Developer",
      match: 94,
      location: "تلمسان",
      rating: 4.8,
      skills: ["React", "TypeScript", "Node.js", "MongoDB", "PostgreSQL"],
      meritScore: 82,
      tier: "Tier 1",
      verified: true,
      avatar: "👨‍💻",
      bg: "bg-blue-50"
    },
    {
      name: "سارة بن سعيد",
      role: "محلل بيانات",
      match: 91,
      location: "الجزائر العاصمة",
      rating: 4.7,
      skills: ["Python", "SQL", "Power BI", "Excel", "Data Mining"],
      meritScore: 85,
      tier: "Tier 1",
      verified: true,
      avatar: "👩‍💼",
      bg: "bg-orange-50"
    },
    {
      name: "ياسين قادري",
      role: "مهندس DevOps",
      match: 91,
      location: "وهران",
      rating: 4.6,
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
      meritScore: 78,
      tier: "Tier 2",
      verified: false,
      avatar: "👨‍🔬",
      bg: "bg-purple-50"
    },
    {
      name: "مريم زروقي",
      role: "UI/UX Designer",
      match: 88,
      location: "قسنطينة",
      rating: 4.5,
      skills: ["Figma", "Adobe XD", "UI Design", "UX Research", "Tailwind CSS"],
      meritScore: 75,
      tier: "Tier 2",
      verified: true,
      avatar: "👩‍🎨",
      bg: "bg-emerald-50"
    }
  ];

  // Filtering candidates
  const filteredCandidates = candidatesList.filter((cand) => {
    const matchesSearch =
      cand.name.includes(searchQuery) ||
      cand.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cand.skills.some((sk) => sk.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Check global skill filter
    let matchesGlobalSkill = true;
    if (selectedSkill && selectedSkill !== "All") {
      if (selectedSkill === "البرمجيات") {
        matchesGlobalSkill = cand.role === "Full Stack Developer" || cand.role === "مهندس DevOps";
      } else if (selectedSkill === "تحليل البيانات") {
        matchesGlobalSkill = cand.role === "محلل بيانات";
      } else if (selectedSkill === "حل المشكلات") {
        matchesGlobalSkill = cand.role === "مهندس DevOps" || cand.role === "Full Stack Developer";
      }
    }

    // Check global region/location filter
    let matchesGlobalRegion = true;
    if (selectedRegion && selectedRegion !== "All") {
      // Support matching region locations like "تلمسان" or "مغنية" or "وهران"
      matchesGlobalRegion = cand.location.includes(selectedRegion) || selectedRegion.includes(cand.location);
    }

    // Check global sovereign verification filter (only show verified candidates)
    let matchesGlobalSovereign = true;
    if (sovereignOnly) {
      matchesGlobalSovereign = cand.verified;
    }

    const matchesRole =
      selectedRoleFilter === "الكل" || cand.role === selectedRoleFilter;
      
    const matchesLocation =
      selectedLocationFilter === "الكل" || cand.location === selectedLocationFilter;

    return matchesSearch && matchesRole && matchesLocation && matchesGlobalSkill && matchesGlobalRegion && matchesGlobalSovereign;
  });

  return (
    <div className="space-y-6 animate-fade-in text-right font-sans" dir="rtl">
      
      {/* Filters & Search Header */}
      <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div>
            <h3 className="text-xs font-black text-slate-800">البحث الذكي عن المرشحين</h3>
            <p className="text-[10px] text-slate-400 mt-1">البحث بناء على بصمة المهارات والجدارات المطلوبة بموجب قرار الوزارة المشترك.</p>
          </div>
          <span className="text-[9.5px] bg-blue-50 text-blue-800 font-bold px-3 py-1 rounded-full font-mono">
            عدد المرشحين الإجمالي: {candidatesList.length}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
          {/* Search bar */}
          <div className="md:col-span-6 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="البحث بالاسم، المهارة أو المنصب المطلوب..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-150 rounded-2xl text-xs focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          </div>

          {/* Role Filter dropdown */}
          <div className="md:col-span-3 relative">
            <select
              value={selectedRoleFilter}
              onChange={(e) => setSelectedRoleFilter(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-150 rounded-2xl text-xs focus:outline-none appearance-none"
            >
              <option value="الكل">كل التخصصات</option>
              <option value="Full Stack Developer">Full Stack Developer</option>
              <option value="محلل بيانات">محلل بيانات</option>
              <option value="مهندس DevOps">مهندس DevOps</option>
              <option value="UI/UX Designer">UI/UX Designer</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-450 absolute left-3 top-3.5 pointer-events-none" />
          </div>

          {/* Location Filter dropdown */}
          <div className="md:col-span-3 relative">
            <select
              value={selectedLocationFilter}
              onChange={(e) => setSelectedLocationFilter(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-150 rounded-2xl text-xs focus:outline-none appearance-none"
            >
              <option value="الكل">كل الولايات</option>
              <option value="تلمسان">تلمسان</option>
              <option value="الجزائر العاصمة">الجزائر العاصمة</option>
              <option value="وهران">وهران</option>
              <option value="قسنطينة">قسنطينة</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-450 absolute left-3 top-3.5 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Candidates Feed Cards */}
      <div className="space-y-4">
        {filteredCandidates.length > 0 ? (
          filteredCandidates.map((cand, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row justify-between gap-6 hover:border-blue-200 hover:shadow-md transition-all"
            >
              
              {/* Primary Info */}
              <div className="flex items-start gap-4 flex-1">
                <div className={`w-14 h-14 rounded-full ${cand.bg} flex items-center justify-center text-3xl shrink-0 border border-slate-100`}>
                  {cand.avatar}
                </div>

                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm font-black text-slate-800">{cand.name}</h4>
                    {cand.verified && (
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-100/40 text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>موثق جدارة ونمذجة</span>
                      </span>
                    )}
                    <span className="bg-slate-50 border border-slate-100 text-[9px] font-black text-slate-650 px-2 py-0.5 rounded-full">
                      {cand.tier}
                    </span>
                  </div>

                  <p className="text-[10.5px] text-slate-500 font-bold block">
                    {cand.role} | 📍 {cand.location}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cand.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="bg-slate-50 border border-slate-100/60 text-slate-600 text-[8.5px] font-bold px-2 py-1 rounded-xl"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recruitment Right Action bar */}
              <div className="flex flex-col justify-between items-end border-r border-slate-50 pr-4 shrink-0 min-w-[170px]">
                <div className="text-right">
                  <span className="text-[9px] text-slate-400 block font-black uppercase text-left">التطابق الخوارزمي</span>
                  <span className="text-2xl font-black font-mono text-indigo-650 text-left block leading-tight">
                    {cand.match}%
                  </span>
                </div>

                <div className="space-y-2 w-full mt-4 text-left">
                  <div className="text-[9px] text-slate-450 block font-bold text-left">
                    معدل الأداء: ⭐ <span className="font-mono text-slate-700">{cand.rating} / 5</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onCompareSelect(cand)}
                      className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-[9.5px] font-black transition-all border border-slate-200/55"
                    >
                      مقارنة
                    </button>
                    <button
                      onClick={() => onInterviewRequest(cand.name)}
                      className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-750 text-white rounded-xl text-[9.5px] font-black transition-all shadow-md shadow-blue-500/10"
                    >
                      دعوة مقابلة
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ))
        ) : (
          <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center text-slate-400 space-y-2">
            <span className="text-3xl block">🔍</span>
            <p className="text-xs font-black">لم يتم العثور على أي مرشحين يطابقون هذه الفلاتر.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedRoleFilter("الكل");
                setSelectedLocationFilter("الكل");
              }}
              className="text-[10px] text-blue-650 font-bold"
            >
              إلغاء الفرز وإعادة ضبط الفلاتر
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
