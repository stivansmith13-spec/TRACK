import React, { useState } from "react";
import { 
  Key, 
  Database, 
  Layers, 
  Cpu, 
  Sparkles, 
  Activity, 
  ShieldAlert, 
  TrendingUp, 
  Zap, 
  Wifi, 
  Network
} from "lucide-react";

interface NodeDetail {
  title: string;
  desc: string;
  tech: string;
  status: string;
}

export default function TrackArchitecture() {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<NodeDetail | null>(null);

  const layersInfo: Record<string, { title: string; desc: string; nodes: NodeDetail[] }> = {
    data_collection: {
      title: "1. طبقة جمع البيانات (Data Collection Layer)",
      desc: "تقوم هذه الطبقة باستقبال وتأمين البيانات الواردة من مختلف المنافذ (الطلاب، الباحثين، الشركات، والجامعات).",
      nodes: [
        { title: "API Gateway", desc: "بوابة الدخول الموحدة لإدارة الروابط وتوجيه حركة مرور الطلبات بكفاءة وأمان.", tech: "Nginx / Express", status: "متصل" },
        { title: "Authentication", desc: "نظام التحقق والتوقيع لولوج المنصة بالاعتماد على الهوية الوطنية والمصادقة السيادية.", tech: "Firebase Auth / OAuth / WebAuthn", status: "نشط" },
        { title: "Validation", desc: "التحقق التلقائي والتدقيق الشامل وتطهير المدخلات من الأخطاء والشبهات.", tech: "Zod / TypeScript", status: "مستقر" },
        { title: "Rate Limiting", desc: "حماية الخوادم والواجهات من الإغراق وطلبات الزيادة المفرطة لحفظ استقرار الذاكرة.", tech: "Redis Token-Bucket", status: "أمثل" }
      ]
    },
    smart_processing: {
      title: "2. طبقة المعالجة الذكية (Smart Processing Layer)",
      desc: "محرك المعالجة المتقدم الذي يعتمد على النمذجة الرياضية والذكاء الاصطناعي لتحويل النصوص والمطالب إلى متجهات ومعالم ذكية.",
      nodes: [
        { title: "محرك تحويل المستخدمين", desc: "محلل السير الذاتية الذكي لتحويل مؤهلات المترشحين إلى متجهات رياضية خوارزمية قياسية.", tech: "Gemini Embeddings v1.5", status: "معالجة" },
        { title: "محرك تحويل الوظائف", desc: "صياغة وتفكيك بنية متطلبات الوظائف الاقتصادية وتحويلها إلى متجهات الوعاء التقني للشركاء.", tech: "Text Embeddings v3", status: "مستقر" },
        { title: "محرك فهم المهارات", desc: "استخراج المهارات الفنية، السلوكية والضمنية باستخدام تقنيات فهم اللغة الطبيعية المتطورة (NLP).", tech: "NLP / Named Entity Recognition", status: "أميز" }
      ]
    },
    smart_matching: {
      title: "3. محرك المطابقة الذكي (Smart Matching Engine)",
      desc: "النواة المركزية الكبرى لحساب معاملات الملاءمة ومصفوفات الارتباط لحركة التشغيل.",
      nodes: [
        { title: "مصفوفة المطابقة", desc: "جدولة وحساب درجات التوافق المتبادل بدقة متناهية بناءً على الأوزان الرياضية ومعارير الموقع والراتب.", tech: "Cosine Similarity Matrix", status: "حساب فوري" },
        { title: "أفضل التوافقات", desc: "الترشيح الآلي التلقائي لعرض أفضل الكفاءات المتطابقة مباشرة لأصحاب العمل والباحثين.", tech: "Ranking Optimizer Algorithm", status: "أمثل" }
      ]
    },
    market_intelligence: {
      title: "4. طبقة ذكاء السوق (Market Intelligence Layer)",
      desc: "شاشة استباقية لرصد الفجوات وتحليل معالم العرض والطلب لوضع رؤية تنموية دقيقة.",
      nodes: [
        { title: "محلل إشارات السوق", desc: "مراقبة اتجاهات المهارات والمناصب المطلوبة بكثافة وتصنيف المهن الواعدة والمهددة.", tech: "Regression Forecasting", status: "تحديث مستمر" },
        { title: "نظام الإنذار المبكر", desc: "استشعار المشكلات الهيكلية والفوارق السعرية والتحايل في الوعاء الوظيفي للمناطق الإقليمية.", tech: "Anomaly Detection Engine", status: "نشط وآمن" },
        { title: "تحليل ديناميكية الوعاء", desc: "تتبع استقرار السوق وجودة التوظيف ومستويات المنافسة والمطابقات الناجحة.", tech: "Descriptive Statistics Module", status: "نشط" }
      ]
    },
    data_storage: {
      title: "5. طبقة البيانات والتخزين (Data and Storage Layer)",
      desc: "بنية تحتية متكاملة لضمان دوام وموثوقية الهوية وقدرات الوصول ومعالجة الأطراف.",
      nodes: [
        { title: "PostgreSQL", desc: "قاعدة البيانات العلائقية لتخزين العلاقات والعمليات المسجلة برمز الهوية.", tech: "PostgreSQL / Prisma", status: "متصل" },
        { title: "MongoDB", desc: "قاعدة البيانات غير العلائقية لتخزين السير الذاتية المرنة ووثائق الشهادات الممتدة.", tech: "MongoDB NoSQL Docs", status: "مستقر" },
        { title: "Redis", desc: "التخزين المؤقت السريع للجلسات والتحققات ومحددات حركة النمط.", tech: "Redis In-Memory Key-Value", status: "تخزين مؤقت سريع" },
        { title: "Vector DB", desc: "تخزين متجهات المهارات ومؤهلات الساق لتسريع عمليات المطابقة الكوسينية اللحظية.", tech: "Pinecone / FAISS Indexing", status: "بحث متجهي نشط" }
      ]
    },
    realtime_stream: {
      title: "طبقة الزمن الحقيقي (Real-Time Layer)",
      desc: "القناة العقدية الجانبية لتوصيل التنبيهات والأحداث والاستمارات دون فترات انتظار.",
      nodes: [
        { title: "WebSockets", desc: "تنسيق القنوات الراجعة لنشر الرسائل والإقرارات المباشرة بين المترشح والشركة والوزارة.", tech: "Socket.io Streams", status: "مفتوح" },
        { title: "Stream Processing", desc: "معالجة تدفقات البيانات والأكوام اللحظية للمواءمة بحد أقصى للجهوزية.", tech: "Spark / Kafka Streams", status: "مستنبط" },
        { title: "Real-time Events", desc: "توليد ونشر أحداث التوظيف والمصادقة وإيقاظ مؤشرات الإنذار على الفور.", tech: "Event Broker Pipeline", status: "نشط" }
      ]
    }
  };

  const handleNodeClick = (node: NodeDetail, layerName: string) => {
    setSelectedNode({
      ...node,
      tech: `${layersInfo[layerName].title} • ${node.tech}`
    });
  };

  return (
    <div id="track-smart-architecture" className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 relative overflow-hidden transition-all shadow-xl">
      {/* Glow highlight */}
      <div className="absolute top-0 right-1/3 w-80 h-40 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-60 h-40 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800/60 pb-4 mb-6">
        <div>
          <h2 className="text-base font-black text-cyan-400 flex items-center gap-2">
            <Network className="w-5 h-5 animate-pulse" />
            <span>العمارة الذكية لمنصة TRACK</span>
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            تمثيل هيكلي تفاعلي للطبقات التقنية ومحركات المعالجة والذكاء الموزع للمنصة الوطنية.
          </p>
        </div>
        <div className="flex items-center gap-2 text-[10px] bg-slate-950 p-2 rounded-lg border border-slate-800/60 font-mono text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>حالة التشغيل المركزي: متصل ومؤمن 💯</span>
        </div>
      </div>

      {/* Grid of layers */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
        {/* Animated flow connectors between columns could be simulated visually */}
        
        {/* Layer 1 */}
        <div 
          onClick={() => setActiveLayer(activeLayer === "data_collection" ? null : "data_collection")}
          className={`cursor-pointer border p-4 rounded-xl transition-all space-y-3 shrink-0 text-right ${
            activeLayer === "data_collection" 
              ? "border-cyan-500 bg-cyan-950/15" 
              : "border-slate-800 hover:border-slate-700 bg-slate-950/40 hover:bg-slate-950/60"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-cyan-450 font-bold bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/30">L1</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          </div>
          <div>
            <h3 className="text-xs font-black text-slate-200">1. طبقة جمع البيانات</h3>
            <p className="text-[9.5px] text-slate-400 mt-1 line-clamp-2">بوابة استقبال وتأمين وتدقيق مدخلات الوعاء من الأطراف.</p>
          </div>
          <div className="space-y-1 pt-1 border-t border-slate-800/50">
            {layersInfo.data_collection.nodes.slice(0, 4).map((node, idx) => (
              <div 
                key={idx}
                onClick={(e) => { e.stopPropagation(); handleNodeClick(node, "data_collection"); }}
                className="p-1 px-2 text-[9px] bg-slate-900/60 hover:bg-cyan-950/40 border border-slate-800/50 text-slate-300 hover:text-cyan-300 rounded block transition-all truncate text-right font-medium"
              >
                ■ {node.title}
              </div>
            ))}
          </div>
        </div>

        {/* Layer 2 */}
        <div 
          onClick={() => setActiveLayer(activeLayer === "smart_processing" ? null : "smart_processing")}
          className={`cursor-pointer border p-4 rounded-xl transition-all space-y-3 shrink-0 text-right ${
            activeLayer === "smart_processing" 
              ? "border-amber-500 bg-amber-950/15" 
              : "border-slate-800 hover:border-slate-700 bg-slate-950/40 hover:bg-slate-950/60"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-amber-550 font-bold bg-amber-950 px-2 py-0.5 rounded border border-amber-800/30">L2</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          </div>
          <div>
            <h3 className="text-xs font-black text-slate-200">2. طبقة المعالجة الذكية</h3>
            <p className="text-[9.5px] text-slate-400 mt-1 line-clamp-2">تحويل مؤهلات الساق ومطالب الشركات إلى متجهات رياضية.</p>
          </div>
          <div className="space-y-1 pt-1 border-t border-slate-800/50">
            {layersInfo.smart_processing.nodes.map((node, idx) => (
              <div 
                key={idx}
                onClick={(e) => { e.stopPropagation(); handleNodeClick(node, "smart_processing"); }}
                className="p-1 px-2 text-[9px] bg-slate-900/60 hover:bg-amber-950/40 border border-slate-800/50 text-slate-300 hover:text-amber-300 rounded block transition-all truncate text-right font-medium"
              >
                🧠 {node.title}
              </div>
            ))}
          </div>
        </div>

        {/* Layer 3 */}
        <div 
          onClick={() => setActiveLayer(activeLayer === "smart_matching" ? null : "smart_matching")}
          className={`cursor-pointer border p-4 rounded-xl transition-all space-y-3 shrink-0 text-right ${
            activeLayer === "smart_matching" 
              ? "border-emerald-500 bg-emerald-950/15" 
              : "border-slate-800 hover:border-slate-700 bg-slate-950/40 hover:bg-slate-950/60"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-emerald-555 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800/30">L3</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xs font-black text-slate-200">3. محرك المطابقة الذكي</h3>
            <p className="text-[9.5px] text-slate-400 mt-1 line-clamp-2">حساب معاملات الجيب ومصفوفة مواءمة العرض والطلب.</p>
          </div>
          <div className="space-y-1 pt-1 border-t border-slate-800/50">
            {layersInfo.smart_matching.nodes.map((node, idx) => (
              <div 
                key={idx}
                onClick={(e) => { e.stopPropagation(); handleNodeClick(node, "smart_matching"); }}
                className="p-1 px-2 text-[9px] bg-slate-900/60 hover:bg-emerald-950/40 border border-slate-800/50 text-slate-300 hover:text-emerald-300 rounded block transition-all truncate text-right font-bold"
              >
                ⚖️ {node.title}
              </div>
            ))}
          </div>
        </div>

        {/* Layer 4 */}
        <div 
          onClick={() => setActiveLayer(activeLayer === "market_intelligence" ? null : "market_intelligence")}
          className={`cursor-pointer border p-4 rounded-xl transition-all space-y-3 shrink-0 text-right ${
            activeLayer === "market_intelligence" 
              ? "border-purple-500 bg-purple-950/15" 
              : "border-slate-800 hover:border-slate-700 bg-slate-950/40 hover:bg-slate-950/60"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-purple-555 font-bold bg-purple-950 px-2 py-0.5 rounded border border-purple-800/30">L4</span>
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
          </div>
          <div>
            <h3 className="text-xs font-black text-slate-200">4. طبقة ذكاء السوق</h3>
            <p className="text-[9.5px] text-slate-400 mt-1 line-clamp-2">رصد الثغرات المهارية وتنبيهات الإنذار وتحليل الحركة.</p>
          </div>
          <div className="space-y-1 pt-1 border-t border-slate-800/50">
            {layersInfo.market_intelligence.nodes.map((node, idx) => (
              <div 
                key={idx}
                onClick={(e) => { e.stopPropagation(); handleNodeClick(node, "market_intelligence"); }}
                className="p-1 px-2 text-[9px] bg-slate-900/60 hover:bg-purple-950/40 border border-slate-800/50 text-slate-300 hover:text-purple-300 rounded block transition-all truncate text-right font-medium"
              >
                📊 {node.title}
              </div>
            ))}
          </div>
        </div>

        {/* Layer 5 */}
        <div 
          onClick={() => setActiveLayer(activeLayer === "data_storage" ? null : "data_storage")}
          className={`cursor-pointer border p-4 rounded-xl transition-all space-y-3 shrink-0 text-right ${
            activeLayer === "data_storage" 
              ? "border-indigo-500 bg-indigo-950/15" 
              : "border-slate-800 hover:border-slate-700 bg-slate-950/40 hover:bg-slate-950/60"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-indigo-555 font-bold bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800/30">L5</span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
          </div>
          <div>
            <h3 className="text-xs font-black text-slate-200">5. البيانات والتخزين</h3>
            <p className="text-[9.5px] text-slate-400 mt-1 line-clamp-2">تخزين البيانات العلائقية والغير علائقية والمتجهات.</p>
          </div>
          <div className="space-y-1 pt-1 border-t border-slate-800/50">
            {layersInfo.data_storage.nodes.map((node, idx) => (
              <div 
                key={idx}
                onClick={(e) => { e.stopPropagation(); handleNodeClick(node, "data_storage"); }}
                className="p-1 px-2 text-[9px] bg-slate-900/60 hover:bg-indigo-950/40 border border-slate-800/50 text-slate-300 hover:text-indigo-300 rounded block transition-all truncate text-right font-medium"
              >
                💾 {node.title}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Real-time streaming bar at the bottom */}
      <div 
        onClick={() => setActiveLayer(activeLayer === "realtime_stream" ? null : "realtime_stream")}
        className={`mt-4 border p-3 rounded-xl cursor-pointer flex flex-col md:flex-row items-center justify-between gap-3 text-right bg-slate-950/75 select-none ${
          activeLayer === "realtime_stream" ? "border-sky-500 bg-sky-950/10" : "border-slate-800 hover:border-slate-755"
        }`}
      >
        <div className="flex items-center gap-2">
          <Wifi className="w-4 h-4 text-cyan-400 animate-ping" />
          <span className="text-xs font-black text-slate-200">القناة العصبية للزمن الحقيقي (طبقة الزمن الحقيقي)</span>
        </div>
        <div className="flex gap-4">
          {layersInfo.realtime_stream.nodes.map((node, idx) => (
            <span 
              key={idx} 
              onClick={(e) => { e.stopPropagation(); handleNodeClick(node, "realtime_stream"); }}
              className="px-2.5 py-1 text-[8.5px] bg-slate-900 hover:bg-slate-800 text-cyan-400 rounded-md border border-slate-800 font-mono font-bold transition-all"
            >
              ⚡ {node.title}
            </span>
          ))}
        </div>
      </div>

      {/* Interactive layer explainer overlay or tray */}
      {selectedNode && (
        <div className="mt-4 bg-slate-950 border border-slate-800 p-4 rounded-xl text-right animate-fade-in relative">
          <button 
            onClick={() => setSelectedNode(null)}
            className="absolute top-2 left-2 text-slate-400 hover:text-white text-xs p-1"
          >
            ✕
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shrink-0" />
            <h4 className="text-xs font-black text-cyan-450">{selectedNode.title}</h4>
            <span className="text-[10px] bg-slate-900 border border-slate-800 text-slate-500 px-2 py-0.5 rounded font-mono">{selectedNode.tech}</span>
          </div>
          <p className="text-[11px]/relaxed text-slate-350">{selectedNode.desc}</p>
          <div className="flex items-center gap-1.5 mt-2 text-[9px] text-slate-500 font-bold">
            <span>المرجع المنظومي:</span>
            <span className="text-emerald-400 font-mono">STATUS_{selectedNode.status.toUpperCase()}_ACTIVE</span>
          </div>
        </div>
      )}

      {/* Layer explainer block */}
      {activeLayer && !selectedNode && (
        <div className="mt-4 bg-slate-950 border border-slate-850 p-4 rounded-xl text-right animate-fade-in relative">
          <button 
            onClick={() => setActiveLayer(null)}
            className="absolute top-2 left-2 text-slate-400 hover:text-white text-xs p-1"
          >
            ✕
          </button>
          <h4 className="text-xs font-black text-white">{layersInfo[activeLayer].title}</h4>
          <p className="text-[11px]/relaxed text-slate-400 mt-1">{layersInfo[activeLayer].desc}</p>
        </div>
      )}
    </div>
  );
}
