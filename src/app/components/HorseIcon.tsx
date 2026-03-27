interface HorseIconProps {
  className?: string;
}

export function HorseIcon({ className = "" }: HorseIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Horse head profile */}
      <path d="M4 14c0-3 2-6 4-8 1-1 2-2 3-2s2 1 2 2c0 1 1 2 2 2h1c1 0 2-1 2-2V4c0-1 1-2 2-2" />
      <path d="M4 14c0 1 0 2 1 3s2 2 3 2h2" />
      {/* Mane */}
      <path d="M11 4c1 0 1.5 1 2 2" />
      <path d="M13 6c.5 1 1 2 2 2" />
      <path d="M15 8c.5.5 1 1 2 1" />
      {/* Nose/mouth */}
      <path d="M4 14c-.5 0-1 .5-1 1v1c0 .5.5 1 1 1" />
      {/* Eye */}
      <circle cx="8" cy="10" r="1" fill="currentColor" />
      {/* Ear */}
      <path d="M14 4l1-1 1 1" />
    </svg>
  );
}
