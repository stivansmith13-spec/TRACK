import React from "react";
import {
  TrendingUp,
  FileText,
  Award,
  BookOpen,
  Filter,
  CheckCircle2,
  Sliders,
  History,
  TrendingDown,
  Sparkles
} from "lucide-react";
import { CandidateProfile } from "../types";

interface CandidateReportsProps {
  profile: CandidateProfile;
}

export default function CandidateReports({ profile }: CandidateReportsProps) {
  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs font-sans text-right space-y-8" dir="rtl">
      
      {/* Header block */}
      <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
        <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center">
          <FileText className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-sm font-black text-slate-800 font-sans">التقارير التحليلية والخط البياني للمواءمة</h3>
          <p className="text-[10px] text-slate-400 mt-1">تقارير جرد ومواءمة مستمرة مجمعة بالخوارزميات المزدوجة.</p>
        </div>
      </div>

      {/* Grid container with SWOT on one side, history on the other */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left side: SWOT Analysis visual grid mapping */}
        <div className="lg:col-span-7 bg-slate-50/50 border border-slate-100 rounded-3xl p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <h4 className="text-xs font-black text-slate-800">مصفوفة نقاط القوة والضعف والفرص (SWOT Profile Map)</h4>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            {/* Strengths */}
            <div className="bg-emerald-50/20 border border-emerald-100/50 p-3.5 rounded-2xl space-y-1.5 text-right">
              <span className="text-[9.5px] bg-emerald-100 text-emerald-850 px-2 py-0.5 rounded-full font-bold">Strengths | نقاط القوة</span>
              <p className="text-[9px] text-slate-650 leading-relaxed pt-1">• مهارات حل المشكلات المتقدمة (90%)\n• كفاءة برمجية عالية في React وبايثون\n• شهادة موثقة بلوكشين للمشروعات الفعالة</p>
            </div>

            {/* Weaknesses */}
            <div className="bg-red-50/10 border border-red-150/40 p-3.5 rounded-2xl space-y-1.5 text-right">
              <span className="text-[9.5px] bg-red-100 text-red-800 px-2 py-0.5 rounded-full font-bold">Weaknesses | نقاط التطوير</span>
              <p className="text-[9px] text-slate-650 leading-relaxed pt-1">• ضعف مهارات إدارة الوقت والضغط (40%)\n• التواصل القيادي والعمل الجماعي بمرئية أقل</p>
            </div>

            {/* Opportunities */}
            <div className="bg-blue-50/20 border border-blue-105/50 p-3.5 rounded-2xl space-y-1.5 text-right">
              <span className="text-[9.5px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold">Opportunities | الفرص المتاحة</span>
              <p className="text-[9px] text-slate-650 leading-relaxed pt-1">• حاضنة أعمال المركز الجامعي بمغنية\n• التقديم المباشر على قرارات وزارة التشغيل والابتكار\n• الطلب المرتفع على المطورين المتكاملين</p>
            </div>

            {/* Threats */}
            <div className="bg-amber-50/20 border border-amber-105/50 p-3.5 rounded-2xl space-y-1.5 text-right">
              <span className="text-[9.5px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">Threats | التحديات والتهديدات</span>
              <p className="text-[9px] text-slate-650 leading-relaxed pt-1">• تفضيل الشركات للمطورين ذوي المحافظ المعتمدة موثقة\n• الفرز التقليدي بالشهادة العشوائي</p>
            </div>
          </div>
          
          <div className="bg-white p-3 rounded-xl border border-slate-100 text-[9.5px] text-slate-500 leading-normal flex items-start gap-2">
            <span className="text-sm">💡</span>
            <span>نظام التحليل يرشح لك حضور ورشة قيادة وإدارة وقت في حاضنة مغنية لرفع جدارتك الشاملة بنسبة تفوق 10% قبل نهاية الشهر الحالي!</span>
          </div>
        </div>

        {/* Right side: Historical log reports */}
        <div className="lg:col-span-5 bg-white border border-slate-100 rounded-3xl p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-50 pb-2">
            <History className="w-4 h-4 text-blue-600" />
            <h4 className="text-xs font-black text-slate-800">سجل النشاط وحركات الجدارات والأوسمة</h4>
          </div>

          <div className="space-y-3">
            {[
              { title: "تم توثيق شهادة جديدة", detail: "شهادة تطوير تطبيقات الويب - جامعة مغنية", date: "اليوم", type: "success" },
              { title: "تعديل رادار المهارات يدوياً", detail: "تحديث مهارة حل المشكلات إلى %90", date: "منذ يومين", type: "info" },
              { title: "أداء المقابلة التجريبية", detail: "تم اجتياز المقابلة التقنية بدرجة 85/100", date: "منذ أسبوع", type: "success" },
              { title: "إنشاء هوية الباحث بنجاح", detail: "الربط الثنائي للملف مع حاضنة تلمسان الرقمية", date: "منذ أسبوعين", type: "info" }
            ].map((log, idx) => (
              <div key={idx} className="border-b border-slate-50 last:border-0 pb-2.5 flex items-start justify-between gap-3 text-right">
                <div>
                  <h5 className="text-[10px] font-black text-slate-850">{log.title}</h5>
                  <span className="text-[8.5px] text-slate-400 block mt-0.5">{log.detail}</span>
                </div>
                <div className="text-left shrink-0">
                  <span className="text-[8px] text-slate-400 font-mono block">{log.date}</span>
                  <span className={`w-2 h-2 rounded-full inline-block mt-1 ${log.type === "success" ? "bg-emerald-500" : "bg-sky-500"}`}></span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => alert("جاري توليد ملف PDF معتمد وموقع إلكترونياً يحتوي على جدارتك الرقمية المحدثة...")}
            className="w-full py-2.5 mt-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[10px] font-black transition-all text-center shadow-md shadow-blue-500/10"
          >
            تحميل التقرير المعتمد (PDF)
          </button>
        </div>

      </div>

    </div>
  );
}
