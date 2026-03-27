import { useState } from "react";
import { motion } from "motion/react";
import { HorseIcon } from "./HorseIcon";
import { StarRating } from "./StarRating";

interface Metric {
  label: string;
  value: string;
  stars: number;
  rank?: number;
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

export function HorseCard({ horse, onClick }: HorseCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
    onClick?.();
  };

  const isGPS = horse.mode === "GPS MODE";
  const primaryColor = isGPS ? "#1a3d2b" : "#7f9a5a";
  const accentColor = "#c9a84c";

  return (
    <div
      className={`relative w-full max-w-[340px] mx-auto cursor-pointer ${
        horse.isTopPick ? "ring-2 ring-[#c9a84c] rounded-[20px]" : ""
      }`}
      style={{ perspective: "1000px", height: "540px" }}
      onClick={handleCardClick}
    >
      {horse.isTopPick && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 bg-[#c9a84c] text-[#1a3d2b] text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
          ⭐ Top Pick
        </div>
      )}

      <motion.div
        className="relative w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.55, type: "spring", stiffness: 120 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* ══ FRONT ══ */}
        <div
          className="absolute inset-0 rounded-[20px] overflow-hidden shadow-lg"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          {/* Horse image or pattern */}
          <div className="relative h-[320px] overflow-hidden" style={{ backgroundColor: primaryColor }}>
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-6 gap-4 p-4">
                {Array.from({ length: 24 }).map((_, i) => (
                  <HorseIcon key={i} className="w-6 h-6 text-white" />
                ))}
              </div>
            </div>

            {horse.imageUrl && (
              <img
                src={horse.imageUrl}
                alt={horse.name}
                className="absolute inset-0 w-full h-full object-cover object-top"
                style={{ opacity: 0.85 }}
              />
            )}

            {/* gradient overlay bottom */}
            <div
              className="absolute bottom-0 left-0 right-0 h-24"
              style={{ background: `linear-gradient(to top, ${primaryColor}, transparent)` }}
            />

            {/* Top bar */}
            <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4">
              <div className="w-11 h-11 rounded-full flex items-center justify-center shadow-md"
                   style={{ background: accentColor }}>
                <span className="font-bold text-[#1a3d2b] text-base" style={{ fontFamily: "var(--font-serif)" }}>
                  {horse.postNumber}
                </span>
              </div>
              <div className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide text-white border border-white/30"
                   style={{ backgroundColor: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)" }}>
                {horse.mode}
              </div>
              <div className="text-white px-3 py-1 rounded-lg text-sm font-semibold"
                   style={{ backgroundColor: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)" }}>
                {horse.odds}
              </div>
            </div>
          </div>

          {/* Bottom info */}
          <div className="bg-white px-5 pt-4 pb-3">
            <h2 className="text-xl mb-0.5" style={{ fontFamily: "var(--font-serif)" }}>{horse.name}</h2>
            <p className="text-xs uppercase tracking-wider mb-2" style={{ color: primaryColor, fontWeight: 600 }}>
              {horse.archetype}
            </p>
            <div className="w-full h-px mb-2" style={{ background: `linear-gradient(to right, transparent, ${accentColor}, transparent)` }} />
            <p className="text-xs text-gray-400">{horse.raceInfo}</p>
          </div>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 py-3 flex items-center justify-center gap-3"
               style={{ backgroundColor: primaryColor }}>
            <HorseIcon className="w-5 h-5" style={{ color: accentColor }} />
            <span className="tracking-widest text-sm" style={{ fontFamily: "var(--font-serif)", color: accentColor }}>
              EQUIBASE
            </span>
            <HorseIcon className="w-5 h-5" style={{ color: accentColor }} />
          </div>

          {/* Flip hint */}
          <div className="absolute bottom-11 right-3 text-xs text-white/40 italic">tap to flip →</div>
        </div>

        {/* ══ BACK ══ */}
        <div
          className="absolute inset-0 rounded-[20px] overflow-hidden bg-white shadow-lg"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="h-full overflow-y-auto">
            {/* Header */}
            <div className="p-4 flex items-center gap-3" style={{ backgroundColor: primaryColor }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                   style={{ background: accentColor }}>
                <span className="font-bold text-[#1a3d2b] text-sm" style={{ fontFamily: "var(--font-serif)" }}>
                  {horse.postNumber}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white text-base leading-tight" style={{ fontFamily: "var(--font-serif)" }}>
                  {horse.name}
                </h3>
                <p className="text-xs uppercase tracking-wide" style={{ color: accentColor }}>
                  {horse.archetype} · {horse.mode}
                </p>
              </div>
            </div>

            {/* Metrics */}
            <div className="px-4 pt-3 pb-2 border-b border-gray-100">
              <h4 className="text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">
                {isGPS ? "GPS Performance Metrics" : "Traditional Metrics"}
              </h4>
              <div className="space-y-1.5">
                {horse.metrics.map((m, i) => (
                  <div key={i}
                    className={`flex items-center justify-between py-1.5 px-2 rounded-lg ${
                      m.isHighlighted ? "bg-green-50 border border-green-200" : ""
                    }`}
                  >
                    <div className="flex items-center gap-1.5 flex-1 min-w-0">
                      <span className="text-xs font-medium truncate" style={{ color: m.isHighlighted ? "#1a5c38" : primaryColor }}>
                        {m.label}
                      </span>
                      {m.rank && (
                        <span className="text-xs px-1.5 py-0.5 rounded font-bold flex-shrink-0"
                              style={{ background: accentColor, color: "#1a3d2b" }}>
                          #{m.rank}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
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

            {/* Past races */}
            <div className="px-4 py-3 border-b border-gray-100">
              <h4 className="text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">Recent Performance</h4>
              <div className="flex gap-2 flex-wrap">
                {(horse.pastRaceDetails || horse.pastRaces.map(String)).map((r, i) => {
                  const pos = horse.pastRaces[i];
                  const bg = pos === 1 ? accentColor : pos <= 3 ? primaryColor : "#d1d5db";
                  const fg = pos <= 3 ? "#fff" : "#6b7280";
                  return (
                    <div key={i} className="px-3 py-1 rounded-lg text-xs font-semibold"
                         style={{ backgroundColor: bg, color: fg }}>
                      {r}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Win probability */}
            <div className="px-4 py-3 border-b border-gray-100">
              <h4 className="text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">Win Probability</h4>
              <div className="rounded-xl p-3 text-white" style={{ backgroundColor: primaryColor }}>
                <div className="text-center mb-2">
                  <div className="text-4xl font-bold mb-0.5" style={{ fontFamily: "var(--font-serif)" }}>
                    {horse.winProbability}%
                  </div>
                  <div className="text-xs uppercase tracking-wider" style={{ color: accentColor }}>
                    {isGPS ? "GPS Model" : "Traditional Model"}
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs mt-2">
                  <div>
                    <div className="text-gray-300">Morning Line</div>
                    <div className="font-semibold">{horse.morningLineOdds} = {horse.morningLineProbability}</div>
                  </div>
                  <div className={`px-2.5 py-1 rounded-full font-semibold text-white ${
                    horse.edge.startsWith("+") ? "bg-green-600" : "bg-gray-500"
                  }`}>
                    {horse.edge} edge
                  </div>
                </div>
              </div>
            </div>

            {/* Insight */}
            <div className="px-4 py-3">
              <h4 className="text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">
                {isGPS ? "GPS Insight" : "Race Insight"}
              </h4>
              <p className="text-xs leading-relaxed text-gray-600">{horse.insight}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
