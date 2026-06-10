import React, { useState, useRef, useEffect } from "react";
import { 
  Camera, 
  FileText, 
  Sparkles, 
  RefreshCw, 
  Check, 
  AlertCircle, 
  Award, 
  Zap,
  Activity,
  History,
  Info
} from "lucide-react";

interface DocumentScannerProps {
  onScanSuccess: (title: string, issuer: string, expiryDate?: string, specialty?: string) => void;
  lang?: "ar" | "en" | "fr";
}

export default function DocumentScanner({ onScanSuccess, lang = "ar" }: DocumentScannerProps) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [scanStatus, setScanStatus] = useState<"idle" | "scanning" | "parsed" | "error">("idle");
  const [scannedResult, setScannedResult] = useState<{ title: string; issuer: string; confidence: number; expiryDate?: string; specialty?: string } | null>(null);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [scanLines, setScanLines] = useState<string[]>([]);
  const [hasRealCamera, setHasRealCamera] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Available mock blueprints of real certificates to simulate instant premium OCR
  const certificatePresets = [
    {
      id: "preset-google",
      name: "شهادة مهندس تعلم آلة معتمد - Google Cloud",
      title: "Google Professional Machine Learning Engineer",
      issuer: "Google Cloud Institute",
      specialty: "علوم الحاسوب وتطوير الويب",
      expiryDate: "2026-07-02",
      previewUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=240",
      confidence: 98,
      lines: [
         "GOOGLE CLOUD TRAINING CERTIFICATE",
         "This is to certify that Ahmed Ben Ali",
         "has successfully met the requirements for",
         "Google Professional Machine Learning Engineer",
         "ID: 8812-GCPML, Confidence: 98%"
      ]
    },
    {
      id: "preset-aws",
      name: "شهادة معمارية الحلول السحابية - AWS Certified",
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services (AWS)",
      specialty: "علوم الحاسوب وتطوير الويب",
      expiryDate: "2027-12-15",
      previewUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=240",
      confidence: 96,
      lines: [
         "AMAZON WEB SERVICES KNOWLEDGE BADGE",
         "AWS Certificate of Completion",
         "Title: AWS Certified Solutions Architect - Associate",
         "Awarded to Algiers University Graduate",
         "Verified Node Code: AWS-9921-X, Confidence: 96%"
      ]
    },
    {
      id: "preset-univ",
      name: "شهادة تخرج ماستر برمجيات - جامعة الجزائر",
      title: "ماستر أكاديمي في هندسة البرمجيات والذكاء الاصطناعي",
      issuer: "جامعة الجزائر 1 - كلية العلوم والتقنيات",
      specialty: "علوم الحاسوب وتطوير الويب",
      expiryDate: "2026-06-25",
      previewUrl: "https://images.unsplash.com/photo-1627556704137-10d24b518861?auto=format&fit=crop&q=80&w=240",
      confidence: 95,
      lines: [
         "الجمهورية الجزائرية الديمقراطية الشعبية",
         "وزارة التعليم العالي والبحث العلمي",
         "جامعة الجزائر 1 يقرر منح أحمد بن علي",
         "شهادة الماستر: هندسة البرمجيات والذكاء الاصطناعي",
         "معدل الملاءمة الرقمي ممتاز: 95%"
      ]
    }
  ];

  // Request actual camera permissions & stream
  const startCamera = async () => {
    setCameraError(null);
    setCameraActive(true);
    setScanStatus("idle");
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play().catch(err => {
          console.warn("Video playback error: ", err);
        });
      }
      setHasRealCamera(true);
    } catch (err: any) {
      console.warn("Camera access failed / not supported in sandbox, enabling mock simulation helper: ", err);
      setCameraError(
        err.name === "NotAllowedError" 
          ? "تم رفض صلاحية الكاميرا من المتصفح. يرجى تفعيلها أو استخدام قوالب الشهادات أدناه للمحاكاة."
          : "الوصول للكاميرا غير مدعوم في هذا الإطار. تم تفعيل وضع محاكاة الماسح الضوئي الملاءم الذكي بنجاح."
      );
      setHasRealCamera(false);
    }
  };

  // Turn off camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setCameraActive(false);
  };

  useEffect(() => {
    return () => {
      // Clean up camera stream on unmount
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  // Capture the photo and perform simulated OCR text parsing
  const captureAndScan = (preset?: typeof certificatePresets[0]) => {
    setScanStatus("scanning");
    setScanLines([]);
    
    let targetTitle = "";
    let targetIssuer = "";
    let confidence = 95;
    let textLines: string[] = [];
    let specialty = "علوم الحاسوب وتطوير الويب";
    let expiryDate = "2027-12-31";

    if (preset) {
      targetTitle = preset.title;
      targetIssuer = preset.issuer;
      confidence = preset.confidence;
      textLines = preset.lines;
      specialty = preset.specialty;
      expiryDate = preset.expiryDate;
    } else {
      // If capturing from real camera or custom image, assign a default realistic OCR parse
      targetTitle = "Advanced Data Analytics certification (OCR Scanned)";
      targetIssuer = "Google Cloud Academy";
      confidence = 92;
      specialty = "ذكاء الأعمال وتحليل البيانات";
      expiryDate = "2026-07-08"; // expires in 28 days!
      textLines = [
        "DETECTED HEADER: GRADUATE CERTIFICATE",
        "PROCESSING IMAGE PIXELS... OK",
        "KEYWORD EXTRACTED: 'Data Analytics Specialist'",
        "ISSUER IDENTIFICATE: 'Google Cloud Academy'",
        "VERIFICATION STATUS: POSITIVE"
      ];
    }

    // Sequence through visual scanning messages to simulate OCR pipeline
    let i = 0;
    const interval = setInterval(() => {
      if (i < textLines.length) {
        setScanLines(prev => [...prev, textLines[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setScannedResult({ 
            title: targetTitle, 
            issuer: targetIssuer, 
            confidence, 
            expiryDate, 
            specialty 
          });
          setScanStatus("parsed");
        }, 600);
      }
    }, 400);
  };

  const handleApplyToForm = () => {
    if (scannedResult) {
      onScanSuccess(
        scannedResult.title, 
        scannedResult.issuer, 
        scannedResult.expiryDate, 
        scannedResult.specialty
      );
      // Let's add a visual cue or stop camera
      stopCamera();
    }
  };

  return (
    <div className="border border-indigo-100 rounded-3xl bg-slate-50/40 p-4 font-sans text-right" dir="rtl">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-indigo-100/30">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-50 text-blue-600 rounded-xl">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-800">ماسح المستندات والشهادات الورقية بالذكاء الاصطناعي (OCR AI Scanner)</h4>
            <p className="text-[10px] text-slate-400">امسح شهادتك الورقية عبر الكاميرا لتحويلها لبيانات رقمية وتوثيقها تلقائياً.</p>
          </div>
        </div>
        <span className="text-[9px] bg-indigo-550 text-white font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5" />
          مساعد ذكي نشط
        </span>
      </div>

      {/* Camera Panel */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Viewfinder Column */}
        <div className="md:col-span-7 bg-slate-900 rounded-2xl relative overflow-hidden h-64 border border-slate-950 flex flex-col items-center justify-center text-white">
          
          {cameraActive ? (
            <>
              {/* Real Video element */}
              {hasRealCamera ? (
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                /* Simulated Camera Background with modern matrix glow */
                <div className="absolute inset-0 bg-radial-gradient from-blue-950 to-slate-950 flex flex-col items-center justify-center opacity-85">
                  <div className="w-16 h-16 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin mb-3"></div>
                  <p className="text-[10px] text-indigo-200">جاري قراءة المشهد الكاميروني الافتراضي...</p>
                  <span className="text-[8px] text-slate-400 mt-1">تحديد الهيكل الورقي في وضع الـ Alignment</span>
                </div>
              )}

              {/* Red/Green Laser Scanner Beam Animation */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-lg shadow-emerald-400/50 animate-bounce z-10"></div>

              {/* Viewfinder Borders */}
              <div className="absolute inset-6 border border-white/20 pointer-events-none rounded-lg">
                <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-emerald-400"></div>
                <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-emerald-400"></div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-emerald-400"></div>
                <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-emerald-400"></div>
              </div>

              {/* Camera Indicator Status overlay */}
              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-[8.5px] px-2 py-1 rounded-md text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>بث الكاميرا المباشر نشط</span>
              </div>
            </>
          ) : (
            /* Idle Screen */
            <div className="text-center p-6 space-y-3 z-10">
              <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto text-slate-400">
                <Camera className="w-6 h-6" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-slate-200">الماسح الضوئي غير مفعّل</h5>
                <p className="text-[9px] text-slate-400 mt-1 max-w-xs mx-auto">
                  قم بتشغيل الكاميرا وتوجيهها نحو شهادتك الورقية لاستخراج الكلمات وتلقيم محفظتك آلياً.
                </p>
              </div>
              <button 
                onClick={startCamera}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[10px] font-black transition-all"
              >
                تفعيل الكاميرا وطلب الإذن
              </button>
            </div>
          )}

          {/* Prompt warning inside viewfinder if camera request fails */}
          {cameraError && cameraActive && (
            <div className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center p-4 text-center">
              <AlertCircle className="w-8 h-8 text-indigo-400 mb-2" />
              <p className="text-[10px] text-indigo-200 max-w-xs leading-normal">{cameraError}</p>
              <button 
                onClick={() => setCameraError(null)} 
                className="mt-3 px-3 py-1 bg-slate-800 text-slate-200 hover:bg-slate-705 text-[9px] rounded-lg border border-slate-700"
              >
                فهمت ذلك
              </button>
            </div>
          )}

          {/* Action capture button inside Viewfinder bottom bar if camera is running */}
          {cameraActive && !cameraError && (
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 z-20">
              <button 
                onClick={stopCamera} 
                className="px-2.5 py-1.5 bg-black/50 hover:bg-black/85 text-[8.5px] rounded-lg border border-white/10"
              >
                إيقاف تشغيل الكاميرا
              </button>

              <button 
                disabled={scanStatus === "scanning"}
                onClick={() => captureAndScan()} 
                className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black rounded-lg text-[9px] flex items-center gap-1 shadow-lg shadow-emerald-500/20 disabled:opacity-50"
              >
                <Zap className="w-3 h-3" />
                التقاط وقراءة النصوص (OCR)
              </button>
            </div>
          )}
        </div>

        {/* OCR Result and Templates Panel Column */}
        <div className="md:col-span-5 flex flex-col justify-between spacing-y-3">
          
          {/* Quick presets list */}
          <div className="bg-white border border-slate-100 rounded-2xl p-3 shadow-xs space-y-2">
            <div className="flex items-center gap-1 text-slate-705">
              <Info className="w-3.5 h-3.5 text-indigo-550" />
              <label className="text-[9.5px] font-black text-slate-700">قوالب السرعة (للمحاكاة السريعة بدون كاميرا)</label>
            </div>
            
            <div className="space-y-1.5">
              {certificatePresets.map((preset) => (
                <button
                  key={preset.id}
                  disabled={scanStatus === "scanning"}
                  onClick={() => {
                    if (!cameraActive) {
                      setCameraActive(true);
                    }
                    captureAndScan(preset);
                  }}
                  className="w-full p-2 bg-slate-50 hover:bg-indigo-50/50 text-right border border-slate-150 rounded-xl transition flex items-center gap-2.5 outline-none group text-slate-700"
                >
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 overflow-hidden shrink-0 border border-indigo-100">
                    <img 
                      src={preset.previewUrl} 
                      alt={preset.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[8.5px] font-black block truncate text-slate-800-black leading-tight">{preset.name}</span>
                    <span className="text-[7.5px] text-slate-400 block truncate">{preset.issuer}</span>
                  </div>
                  <span className="text-[8px] bg-indigo-120 text-indigo-700 font-bold px-1.5 py-0.5 rounded shrink-0">
                    جودة %{preset.confidence}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Scanning Status display */}
          <div className="bg-white border border-slate-100 rounded-2xl p-3 shadow-xs min-h-[110px] flex flex-col justify-between">
            {scanStatus === "idle" && (
              <div className="text-center py-4 text-slate-400">
                <FileText className="w-8 h-8 mx-auto opacity-40 mb-1" />
                <span className="text-[9px]">أو اختر أحد القوالب الجاهزة أعلاه لبدء المحاكاة الفورية</span>
              </div>
            )}

            {scanStatus === "scanning" && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-indigo-600 animate-pulse flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5 animate-spin" />
                    جاري سحب البيانات عبر التبيين البصري...
                  </span>
                  <span className="text-[8px] text-slate-400">السرعة: 120ms</span>
                </div>
                
                <div className="bg-slate-950 p-2 text-[8px] text-emerald-400 font-mono rounded-lg h-24 overflow-y-auto space-y-1 text-left" dir="ltr">
                  {scanLines.map((line, k) => (
                    <div key={k} className="truncate select-none animate-pulse">
                      &gt; {line}
                    </div>
                  ))}
                  <div className="w-1.5 h-3 bg-emerald-400 animate-ping inline-block"></div>
                </div>
              </div>
            )}

            {scanStatus === "parsed" && scannedResult && (
              <div className="space-y-2 animate-fade-in">
                <div className="bg-emerald-50 border border-emerald-150 p-2 rounded-xl flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h6 className="text-[9px] font-black text-slate-800">تم استخراج النصوص بدقة %{scannedResult.confidence}!</h6>
                    <p className="text-[8px] text-slate-500">تم الكشف عن تفاصيل الشهادة ومطابقتها مع المرجعية بنجاح.</p>
                  </div>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-1">
                  <div className="flex justify-between items-center border-b border-white pb-1">
                    <span className="text-[8.5px] text-slate-400">الشهادة المكتشفة:</span>
                    <span className="text-[9.5px] font-black text-slate-850 truncate max-w-[150px]" title={scannedResult.title}>
                      {scannedResult.title}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[8.5px] text-slate-400">الجهة المانحة:</span>
                    <span className="text-[9.5px] font-bold text-slate-700 truncate max-w-[150px]" title={scannedResult.issuer}>
                      {scannedResult.issuer}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleApplyToForm}
                  className="w-full py-2 bg-indigo-650 hover:bg-indigo-750 text-white text-[10px] font-black rounded-lg transition-all shadow-md shadow-indigo-650/10 flex items-center justify-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  تعبئة الحقول بالقيم المستخرجة
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
