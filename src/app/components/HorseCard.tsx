import { useState } from "react";
import { motion } from "motion/react";
import { StarRating } from "./StarRating";

const logoSrc = "/equibase-logo.png";
const footerLogoSrc = "/footer-logo.png";
interface Metric {
  label: string;
  value: string;
  stars: number;
  percentile?: string;
  isHighlighted?: boolean;
}

interface HorseData {
  id: number;
  name: string;
  archetype: string;
  postNumber: number;
  odds: string;
  mode: "GPS MODE" | "PROXY MODE";
  track: string;
  raceDistance: string;
  raceInfo: string;
  imageUrl?: string;
  metrics: Metric[];
  pastRaces: number[];
  pastRaceDetails?: string[];
  winProbability: number;
  morningLineOdds: string;
  morningLineProbability: string;
  edge: string;
  insight: string;
  isTopPick?: boolean;
}

interface HorseCardProps {
  horse: HorseData;
  onClick?: () => void;
}

// GPS back card order: Stride → Early → Late → Speed Change → Extra Dist
const GPS_ORDER = ["Stride", "Early", "Late", "Speed Change", "Extra"];

export function HorseCard({ horse, onClick }: HorseCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const isGPS = horse.mode === "GPS MODE";
  const primaryColor = isGPS ? "#1a3d2b" : "#7f9a5a";
  const accentColor = "#c9a84c";

  const sortedMetrics = isGPS
    ? [...horse.metrics].sort((a, b) => {
        const ai = GPS_ORDER.findIndex(k => a.label.startsWith(k));
        const bi = GPS_ORDER.findIndex(k => b.label.startsWith(k));
        return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
      })
    : horse.metrics;

  return (
    <div
      className="relative w-full cursor-pointer"
      style={{ perspective: "1000px", height: "560px" }}
      onClick={() => { setIsFlipped(!isFlipped); onClick?.(); }}
    >
      <motion.div
        className="relative w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.55, type: "spring", stiffness: 120 }}
        style={{ transformStyle: "preserve-3d" }}
      >

        {/* ══ FRONT ══ */}
        <div
          className="absolute inset-0 rounded-[20px] overflow-hidden shadow-lg flex flex-col"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          {/* Horse photo */}
          <div className="relative flex-shrink-0" style={{ height: "300px", backgroundColor: primaryColor }}>
            <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
              {Array.from({ length: 20 }).map((_, i) => (
                <span key={i} className="inline-block w-6 h-6 m-2">🐴</span>
              ))}
            </div>
            {horse.imageUrl && (
              <img
                src={horse.imageUrl}
                alt={horse.name}
                className="absolute inset-0 w-full h-full object-cover object-top"
                style={{ opacity: 0.88 }}
              />
            )}
            <div
              className="absolute bottom-0 left-0 right-0 h-20"
              style={{ background: `linear-gradient(to top, ${primaryColor}, transparent)` }}
            />
            {/* Post # and odds */}
            <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
                style={{ background: accentColor }}
              >
                <span className="font-bold text-[#1a3d2b] text-base" style={{ fontFamily: "Georgia, serif" }}>
                  {horse.postNumber}
                </span>
              </div>
              <div
                className="text-white px-2 py-1 rounded-lg text-sm font-bold"
                style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
              >
                {horse.odds}
              </div>
            </div>
          </div>

          {/* White info area */}
          <div className="bg-white px-4 pt-3 pb-2 flex flex-col flex-grow">
            <h2 className="text-lg font-bold leading-tight mb-2 text-gray-900" style={{ fontFamily: "Georgia, serif" }}>
              {horse.name}
            </h2>
            <div
              className="w-full h-px mb-2"
              style={{ background: `linear-gradient(to right, transparent, ${accentColor}, transparent)` }}
            />
            <p className="text-xs text-gray-400 flex-grow">{horse.raceInfo}</p>
          </div>

          {/* Footer with logo */}
          <div
            className="flex-shrink-0 py-3 flex items-center justify-center gap-3"
            style={{ backgroundColor: primaryColor }}
          >
            <img src={footerLogoSrc} alt="Equibase" className="w-9 h-9 object-contain" style={{ mixBlendMode: "luminosity", opacity: 0.9 }} />
            <span className="tracking-widest text-sm" style={{ fontFamily: "Georgia, serif", color: accentColor }}>
              EQUIBASE
            </span>
            <img src={footerLogoSrc} alt="" className="w-9 h-9 object-contain" style={{ mixBlendMode: "luminosity", opacity: 0.9 }} />
          </div>
          <div className="absolute bottom-12 right-3 text-xs text-white/40 italic">tap to flip →</div>
        </div>

        {/* ══ BACK ══ */}
        <div
          className="absolute inset-0 rounded-[20px] overflow-hidden bg-white shadow-lg flex flex-col"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {/* Back header */}
          <div className="flex-shrink-0 p-4 flex items-center gap-3" style={{ backgroundColor: primaryColor }}>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: accentColor }}
            >
              <span className="font-bold text-[#1a3d2b] text-sm" style={{ fontFamily: "Georgia, serif" }}>
                {horse.postNumber}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white text-base font-bold truncate" style={{ fontFamily: "Georgia, serif" }}>
                {horse.name}
              </h3>
              <p className="text-xs uppercase tracking-wide" style={{ color: accentColor }}>
                {horse.odds} · Post {horse.postNumber}
              </p>
            </div>
          </div>

          {/* Scrollable body */}
          <div className="flex-grow overflow-y-auto">

            {/* METRICS */}
            <div className="px-4 pt-3 pb-2 border-b border-gray-100">
              <h4 className="text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">
                Performance Metrics
              </h4>
              <div className="space-y-1.5">
                {sortedMetrics.map((m, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between py-1 px-2 rounded-lg${m.isHighlighted ? " bg-green-50 border border-green-200" : ""}`}
                  >
                    <span
                      className="text-xs font-medium flex-1 truncate"
                      style={{ color: m.isHighlighted ? "#1a5c38" : primaryColor }}
                    >
                      {m.label}
                    </span>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                      <span className="text-xs font-bold" style={{ color: m.isHighlighted ? "#1a5c38" : primaryColor }}>
                        {m.value}
                      </span>
                      {m.percentile && (
                        <span className="text-xs text-gray-400 w-8 text-right">{m.percentile}</span>
                      )}
                      <StarRating rating={m.stars} size={11} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PAST RACES */}
            <div className="px-4 py-3 border-b border-gray-100">
              <h4 className="text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">
                Recent Performance
              </h4>
              <div className="flex gap-2 flex-wrap">
                {(horse.pastRaceDetails || horse.pastRaces.map(String)).map((r, i) => {
                  const pos = horse.pastRaces[i];
                  const bg = pos === 1 ? accentColor : pos <= 3 ? primaryColor : "#d1d5db";
                  const fg = pos <= 3 ? "#fff" : "#6b7280";
                  return (
                    <div
                      key={i}
                      className="px-3 py-1 rounded-lg text-xs font-semibold"
                      style={{ backgroundColor: bg, color: fg }}
                    >
                      {r}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* WIN PROBABILITY */}
            <div className="px-4 py-3 border-b border-gray-100">
              <h4 className="text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">
                Win Probability
              </h4>
              <div className="rounded-xl p-3 text-white" style={{ backgroundColor: primaryColor }}>
                <div className="text-center mb-2">
                  <div className="text-4xl font-bold mb-0.5" style={{ fontFamily: "Georgia, serif" }}>
                    {horse.winProbability}%
                  </div>
                  <div className="text-xs uppercase tracking-wider" style={{ color: accentColor }}>
                    Model Estimate
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs mt-2">
                  <div>
                    <div className="text-gray-300">Morning Line</div>
                    <div className="font-semibold">{horse.morningLineOdds} = {horse.morningLineProbability}</div>
                  </div>
                  <div
                    className={`px-2.5 py-1 rounded-full font-semibold text-white${horse.edge.startsWith("+") ? " bg-green-600" : " bg-gray-500"}`}
                  >
                    {horse.edge} edge
                  </div>
                </div>
              </div>
            </div>

            {/* RACE INSIGHT */}
            <div className="px-4 py-3">
              <h4 className="text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">
                Race Insight
              </h4>
              <p className="text-xs leading-relaxed text-gray-600">{horse.insight}</p>
            </div>

          </div>

          {/* Back footer with logo */}
          <div
            className="flex-shrink-0 py-2.5 flex items-center justify-center gap-3"
            style={{ backgroundColor: primaryColor }}
          >
            <img src={footerLogoSrc} alt="Equibase" className="w-8 h-8 object-contain" style={{ mixBlendMode: "luminosity", opacity: 0.9 }} />
            <span className="tracking-widest text-xs" style={{ fontFamily: "Georgia, serif", color: accentColor }}>
              EQUIBASE
            </span>
            <img src={footerLogoSrc} alt="" className="w-8 h-8 object-contain" style={{ mixBlendMode: "luminosity", opacity: 0.9 }} />
          </div>
        </div>

      </motion.div>
    </div>
  );
}