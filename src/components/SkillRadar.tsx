import React from "react";

interface SkillRadarProps {
  skills: { [key: string]: number };
  onChangeSkill?: (key: string, val: number) => void;
  interactive?: boolean;
}

export default function SkillRadar({ skills, onChangeSkill, interactive = false }: SkillRadarProps) {
  const skillList = Object.entries(skills);
  const totalGridCircles = 5;
  const radius = 100;
  const center = 130;

  // Compute radar coordinates
  const points = skillList.map(([key, value], i) => {
    const angle = (i * 2 * Math.PI) / skillList.length - Math.PI / 2;
    const distance = (value / 100) * radius;
    const x = center + distance * Math.cos(angle);
    const y = center + distance * Math.sin(angle);
    return { key, value, x, y, angle };
  });

  const polygonPointsString = points.map((p) => `${p.x},${p.y}`).join(" ");

  // Grid circles for radar scope mapping
  const gridCircles = Array.from({ length: totalGridCircles }).map((_, i) => {
    const r = ((i + 1) / totalGridCircles) * radius;
    return (
      <circle
        key={i}
        cx={center}
        cy={center}
        r={r}
        className="stroke-slate-200 fill-none"
        strokeWidth="0.8"
        strokeDasharray={i === totalGridCircles - 1 ? "" : "3,3"}
      />
    );
  });

  // Polyline for radial grid axes
  const gridLines = points.map((p, i) => {
    const endX = center + radius * Math.cos(p.angle);
    const endY = center + radius * Math.sin(p.angle);
    return (
      <line
        key={i}
        x1={center}
        y1={center}
        x2={endX}
        y2={endY}
        className="stroke-slate-200"
        strokeWidth="1"
      />
    );
  });

  return (
    <div className="flex flex-col items-center p-2 bg-white rounded-2xl border border-slate-100 shadow-sm">
      <div className="relative w-[270px] h-[275px]">
        <svg className="w-full h-full" viewBox="0 0 260 270">
          {/* Inner scope circles */}
          {gridCircles}
          {gridLines}

          {/* Solid fill for candidate capability footprint */}
          <polygon
            points={polygonPointsString}
            className="fill-sky-500/20 stroke-sky-500"
            strokeWidth="2.5"
          />

          {/* Circular markers & text nodes */}
          {points.map((p, i) => {
            // Label placement logic
            const labelDist = radius + 22;
            const labelX = center + labelDist * Math.cos(p.angle);
            const labelY = center + labelDist * Math.sin(p.angle);

            return (
              <g key={i}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={interactive ? "6" : "4.5"}
                  className={`fill-sky-600 stroke-white stroke-2 ${
                    interactive ? "cursor-pointer hover:scale-130 transition-transform" : ""
                  }`}
                  onClick={() => {
                    if (interactive && onChangeSkill) {
                      const nextVal = p.value >= 100 ? 40 : p.value + 10;
                      onChangeSkill(p.key, nextVal);
                    }
                  }}
                />
                
                {/* Score badge at vertex */}
                <text
                  x={p.x}
                  y={p.y - 8}
                  textAnchor="middle"
                  className="fill-sky-800 text-[10px] font-mono font-bold"
                >
                  {p.value}%
                </text>

                {/* Axis label text in Arabic */}
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-slate-600 text-[10px] font-sans font-medium"
                >
                  {p.key}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {interactive && (
        <div className="mt-2 w-full text-center">
          <p className="text-[11px] text-slate-400 font-sans">
            👋 يمكنك الضغط على نقاط الرادار أعلاه لتعديل نسب الكفاءة الحالية يدوياً ورؤية تباين نسب مواءمة التوظيف تلقائياً!
          </p>
        </div>
      )}
    </div>
  );
}
