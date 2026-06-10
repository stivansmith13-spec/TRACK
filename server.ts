import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

// Custom lightweight CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

const PORT = 3000;

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

// REST Mock DB for Demo Persistence
let candidateProfile = {
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
    { id: 1, title: "شهادة تحليل البيانات بكفاءة عالية", issuer: "مركز تلمسان الرقمي", date: "2026-02-15", verified: true },
    { id: 2, title: "شهادة تطوير تطبيقات الويب المتكاملة", issuer: "جامعة مغنية", date: "2026-03-10", verified: true },
    { id: 3, title: "شهادة أساسيات الأمن السيبراني والشبكات", issuer: "مدرية الاتصالات الجزائرية", date: "2026-04-05", verified: true }
  ],
  experiences: [
    { id: 1, role: "مطور ويب متدرب", company: "DZ Software (تلمسان)", duration: "6 أشهر", desc: "تطوير واجهات المستخدم وتحسين قواعد البيانات المحلية" }
  ]
};

// Candidate mock listings
const mockCandidatesList = [
  {
    name: "أحمد بن علي",
    role: "Full Stack Developer",
    match: 94,
    location: "تلمسان",
    rating: 4.8,
    skills: ["React", "Node.js", "TypeScript", "MongoDB", "PostgreSQL"],
    meritScore: 82,
  },
  {
    name: "سارة بن سعيد",
    role: "Data Analyst",
    match: 91,
    location: "الجزائر العاصمة",
    rating: 4.7,
    skills: ["Python", "SQL", "Power BI", "Excel", "Data Mining"],
    meritScore: 85,
  },
  {
    name: "ياسين قادري",
    role: "DevOps Engineer",
    match: 91,
    location: "وهران",
    rating: 4.6,
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Linux"],
    meritScore: 78,
  },
  {
    name: "مريم زروقي",
    role: "UI/UX Designer",
    match: 88,
    location: "قسنطينة",
    rating: 4.5,
    skills: ["Figma", "Adobe XD", "UI Design", "User Research", "Tailwind CSS"],
    meritScore: 75,
  }
];

// Jobs List
let mockJobs = [
  {
    id: 1,
    title: "Full Stack Developer",
    company: "شركة تكنو الجزائر",
    location: "الجزائر العاصمة / تلمسان",
    type: "دوام كامل",
    salary: "250,000 - 350,000 دج",
    posted: "منذ يومين",
    skills: ["Python", "Django", "JavaScript", "SQL", "React"],
    match: 94,
    description: "مطلوب مطور واجهات متكاملة متمكن للعمل على تطوير البنى التحتية لمنصات التشغيل المشترك مع الهيئات الوطنية."
  },
  {
    id: 2,
    title: "مخرج ذكاء اصطناعي وعالم بيانات",
    company: "مؤسسة الذكاء المتقدم",
    location: "وهران",
    type: "دوام كامل",
    salary: "400,000 - 450,000 دج",
    posted: "منذ 3 أيام",
    skills: ["Python", "TensorFlow", "Machine Learning", "PyTorch"],
    match: 88,
    description: "البحث عن مهندس متميز في نماذج التعلم الآلي ومعالجة اللغة الطبيعية لدعم نظام الفرز والتحليل الإحصائي للبيانات."
  },
  {
    id: 3,
    title: "محلل بيانات",
    company: "بنك الجزائر الرقمي",
    location: "قسنطينة",
    type: "دوام كامل",
    salary: "200,000 - 280,000 دج",
    posted: "منذ 5 أيام",
    skills: ["SQL", "Power BI", "Excel", "Python"],
    match: 82,
    description: "العمل على مراقبة مؤشرات الأداء وجرد الثغرات المهارية للباحثين عن العمل وتقديم تقارير استباقية."
  },
  {
    id: 4,
    title: "مهندس DevOps",
    company: "Global Tech Solutions",
    location: "الجزائر العاصمة",
    type: "عقد عمل",
    salary: "220,000 - 320,000 دج",
    posted: "منذ أسبوع",
    skills: ["Docker", "Kubernetes", "CI/CD", "AWS"],
    match: 78,
    description: "إعداد بيئات التطوير المستمر والحوسبة السحابية وحماية منصات التشغيل البيني مع الوزارة."
  }
];

// University DB variables
let universityCourses = [
  { code: "COMP-401", name: "برمجة كائنية التوجه (OOP)", match: 80, marketDemand: 95, taughtRatio: 80, gap: 15, status: "moderate" },
  { code: "DB-302", name: "قواعد البيانات التقليدية (SQL)", match: 60, marketDemand: 90, taughtRatio: 60, gap: 30, status: "high" },
  { code: "NET-204", name: "شبكات الحاسوب", match: 50, marketDemand: 70, taughtRatio: 40, gap: 30, status: "high" }
];

let universitySkillsGap = [
  { skill: "تعلم الآلة", demand: 85, taught: 50, gap: 35, recommendation: "إدراج مقرر تطبيقي في الفصل الثاني" },
  { skill: "الحوسبة السحابية", demand: 90, taught: 40, gap: 50, recommendation: "إنشاء برنامج توأمة مع مجهزي البنية التحتية" },
  { skill: "الأمن السيبراني", demand: 75, taught: 60, gap: 15, recommendation: "إطلاق ورش عمل تقنية مشتركة مع وزرارة الرقمنة" }
];

// API: Health probe
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", activeApi: !!ai, timestamp: new Date() });
});

// GET profile
app.get("/api/profile", (req, res) => {
  res.json(candidateProfile);
});

// UPDATE skills/profile
app.post("/api/profile/update-skills", (req, res) => {
  const { skills } = req.body;
  if (skills) {
    candidateProfile.skills = { ...candidateProfile.skills, ...skills };
    res.json({ success: true, profile: candidateProfile });
  } else {
    res.status(400).json({ error: "Missing skills input" });
  }
});

// GET jobs
app.get("/api/jobs", (req, res) => {
  res.json(mockJobs);
});

// POST check duplicates (CNAS / ANEM Integration Simulation)
app.post("/api/sovereign/deduplicate", async (req, res) => {
  try {
    const doubleChecker = [
      { id: "DZ-239102", name: "محمد الطيب", statusValue: "مزدوج", location: "مغنية", anId: "ANEM-9283", cnId: "CNAS-0291", savings: "1,200,000 دج" },
      { id: "DZ-881290", name: "أمينة بوشيخ", statusValue: "مزدوج", location: "تلمسان", anId: "ANEM-4412", cnId: "CNAS-6612", savings: "800,000 دج" },
      { id: "DZ-056121", name: "خالد مهدي", statusValue: "منتظم", location: "الجزائر العاصمة", anId: "ANEM-1029", cnId: "CNAS-None", savings: "0 دج" }
    ];

    let summaryText = "التحليل الرقمي التلقائي كشف وجود ٢٤٩٨ حالة ازدواج تسجيلي مالي نشط بين قواعد بيانات الوكالة الوطنية للتشغيل (ANEM) والصندوق الوطني للتأمينات الاجتماعية (CNAS). حسم وإلغاء هذه الازدواجية وفر ميزانية سيادية قدرها ٢.٨ مليار دج سنوياً لصالح الخزينة العمومية.";

    if (ai) {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: "اشرح باختصار شديد باللغة العربية كيف يساهم التشغيل البيني بين منصة ANEM و CNAS في كشف الحالات المزدوجة وتقليل الهدر المالي (٢.٨ مليار دج) وتحقيق الشفافية لمتخذي القرار.",
        config: {
          systemInstruction: "أنت خبير سياسات عامة جزائري ومحلل بيانات سيادي لمشروع مسار TRACK. رد بجواب مقتضب مقنع."
        }
      });
      if (response && response.text) {
        summaryText = response.text;
      }
    }

    res.json({
      success: true,
      recordsAnalyzed: 542391,
      duplicatesFound: 2498,
      savingsAmount: "2.8 مليار دج",
      detailedMatches: doubleChecker,
      aiAnalysisExplanation: summaryText
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST simulate strategic policy
app.post("/api/sovereign/policy-simulate", async (req, res) => {
  const { centerType, count, region } = req.body;
  const simulatedCount = Number(count) || 5;

  let jobsCreated = simulatedCount * 4500;
  let unemploymentReduction = Math.min(25, simulatedCount * 1.8);
  let economicImpact = simulatedCount * 85; // Million DZD

  let aiSummary = `إنشاء عدد ${simulatedCount} مراكز من نوع "${centerType || "مراكز تدريب مهارية ذكية"}" في منطقة ${region || "تلمسان ومغنية"} سيحقق عائداً وطنياً مهماً بقيمة ${economicImpact} مليون دج عبر تزويد الحاصلين على شهادات بجدارات مباشرة تلائم احتياجات السوق المحلية.`;

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `قم بمحاكاة سيناريو سياسي مالي للجزائر: ماذا يحدث لو أنشأنا عدد ${simulatedCount} مجمع تدريب وتطوير من نوع "${centerType}" في منطقة "${region}"؟ ما هو الأثر الاقتصادي على تقليل فجوة المهارات ومعدل البطالة المتوقع؟ لخص الأثر في أرقام وتوقع ذكي وموجز ومبهر.`,
        config: {
          systemInstruction: "أنت الموجه الجغرافي والاقتصادي الوطني لمنصة TRACK الموجهة للوزارة الجزائرية للتشغيل والتعليم العالي. صِف بلغة احترافية الأثر والجدوى."
        }
      });
      if (response && response.text) {
        aiSummary = response.text;
      }
    } catch (err) {
      console.error(err);
    }
  }

  res.json({
    success: true,
    centerType,
    count: simulatedCount,
    region,
    jobsCreated,
    unemploymentReduction: parseFloat(unemploymentReduction.toFixed(1)),
    economicImpact: `${economicImpact} مليون دج`,
    aiSimulationReport: aiSummary
  });
});

// POST general insights explanation for dashboards
app.post("/api/insights/dashboard-explainer", async (req, res) => {
  const { perspective, stats } = req.body;
  let resultText = "شهدت تخصصات التكنولوجيا تزايداً في نسب المطابقة مع عروض العمل المتاحة بمغنية وتلمسان.";

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `كمستشار ذكي لمنصة TRACK، قدّم تفسيراً معبراً باللغة العربية لهذه المؤشرات الإحصائية الموجهة لـ "${perspective}": ${JSON.stringify(stats)}. ركّز على سبل سد الفجوة الرقمية والمهارية وتعزيز الجاهزية العملية في الجزائر.`,
      });
      if (response && response.text) {
        resultText = response.text;
      }
    } catch (err) {
      console.error(err);
    }
  } else {
    // Elegant hardcoded template for local mode
    if (perspective === "جامعة") {
      resultText = "التحليل الإحصائي يظهر فجوة مهارات قدرها %55 في التخصصات التقنية المستهدفة. نوصي فوراً برفع حصص التدريب العملي لتقليص فجوة التعلم التقليدي بنسبة %15 في التخصصات الرقمية المتقدمة.";
    } else if (perspective === "مؤسسة") {
      resultText = "تكامل جدارات المترشحين كشف تحسناً في دقة المطابقة الخوارزمية بنسبة %12 هذا الشهر، مما يقلل بشكل فعال تكاليف الفرز اليدوي واختصار فترات التوظيف.";
    } else {
      resultText = "مؤشر جدارتك الفعلي حالياً هو %82 (Tier 1). لرفع معدل المطابقة إلى أكثر من %90، خوارزمية مسار تقترح تعلم مهارة 'Docker' واستكمال مشروع تطبيقي مشترك مع DZ Software.";
    }
  }

  res.json({ success: true, explanation: resultText });
});

// POST University Curriculum planner recommendation
app.post("/api/university/curriculum-recommender", async (req, res) => {
  const { proposedSkill, gapAmount } = req.body;
  let actionPlan = "رفع معدلات الساعات التطبيقية بنسبة ٣٠٪ وتحديث مخابر العمل السحابي بمغنية وتلمسان.";

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `اقترح خطة عمل أكاديمية عملية وديناميكية لتدريس مهارة "${proposedSkill || "التعلم الآلي"}" التي وجد في السوق فجوة طلب علمية قدرها ${gapAmount || 35}٪ لدى الجامعات الجزائرية. صف المنهج في ٣ نقاط سريعة.`,
        config: {
          systemInstruction: "أنت خبير هندسة جدارات أكاديمية لدى المركز الجامعي بمغنية والقرار الوزاري ١٢٧٥."
        }
      });
      if (response && response.text) {
        actionPlan = response.text;
      }
    } catch (err) {
      console.error(err);
    }
  }

  res.json({
    success: true,
    actionPlanProposed: actionPlan,
    estimatedImpact: "+24% تحسين ملاءمة مع السوق",
    timeframe: "الفصل القادم (خريف 2026)"
  });
});

// POST Career Mentor Chat
app.post("/api/career-mentor/chat", async (req, res) => {
  const { messages } = req.body; // Array of { role: 'user'|'model', text: string }
  const lastMessage = messages && messages.length > 0 ? messages[messages.length - 1].text : "مرحباً";

  let aiReply = "مرحباً بك يا أحمد! أنا رادارك وموجهك المهني الذكي. يمكنني مساعدتك في صياغة هويتك الرقمية، وتحليل أسباب الرفض في المقابلات القادمة، واقتراح الخطوات اللازمة لرفع مؤشر جدارتك المهنية لشغل مناصب مطوري Full Stack بالجزائر.";

  if (ai) {
    try {
      // Formulate system instruction & chat history for Gemini API
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: lastMessage,
        config: {
          systemInstruction: "أنت الموجه المهني الذكي الافتراضي الرائد في منصة TRACK (مسار) الجزائرية الحائزة على التمكين بالقرار الوزاري ١٢٧٥. ركز في ردودك على تقديم الدعم الأكاديمي والمهني للباحثين عن مهارات مثل البرمجة وحل المشكلات في تلمسان والجزائر الغربية. كن إيجابياً ومقنعاً وعملياً ومختصراً وطبيعي اللهجة والمصطلحات."
        }
      });
      if (response && response.text) {
        aiReply = response.text;
      }
    } catch (err: any) {
      aiReply = `مرحباً، يسعدني التحدث إليك! واجهت صعوبة مؤقتة في استخدام خادمي السحابي ولكن نصيحتي لك هي تعزيز مهارات قواعد البيانات لزيادة فرصك بمقدار 18% في تلمسان.`;
    }
  }

  res.json({ reply: aiReply });
});

// POST Mock Interview Simulator
app.post("/api/mock-interview/chat", async (req, res) => {
  const { type, messageHistory } = req.body; // type: 'general' | 'technical' | 'behavioral'
  const lastMessage = messageHistory && messageHistory.length > 0 ? messageHistory[messageHistory.length - 1].text : "جاهز للبدء";

  let systemInstruction = "";
  if (type === "technical") {
    systemInstruction = "أنت مهندس تقني ذو خبرة تختبر مرشحاً جزائرياً لمنصب مطور برمجيات متكاملة (React / Node / Python). اطرح سؤالاً تقنياً واحداً ممتازاً يتناسب مع البيئة الحقيقية للمؤسسات وقيم إجاباته بلغة مهنية محترمة وموجزة.";
  } else if (type === "behavioral") {
    systemInstruction = "أنت مدير موارد بشرية خبير تختبر السلوك القيادي، إدارة الوقت، القدرة على حل المشكلات في الجزائر تحت ضغوط العمل وحرصاً على التكامل المؤسساتي. اطرح سيناريو حقيقي محدد في بيئة Startup.";
  } else {
    systemInstruction = "أنت مخصص للمقابلة العامة والتعريف بالهوية المهنية وجدارة المهارات والمسار التعليمي للباحث عن العمل بأسلوب محفّز.";
  }

  let aiReply = "أهلاً بك في جلسة محاكي مقابلات مسار التفاعلي. كيف تتعامل مع مشكلة تكامل قواعد البيانات والتشغيل البيني البطيء تحت شبكة إنترنت منخفضة السرعة؟";

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: lastMessage,
        config: { systemInstruction }
      });
      if (response && response.text) {
        aiReply = response.text;
      }
    } catch (err) {
      console.error(err);
    }
  }

  res.json({ reply: aiReply });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[TRACK Server] Startup initiated on http://localhost:${PORT}`);
  });
}

startServer();
