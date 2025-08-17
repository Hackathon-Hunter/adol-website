import { Sparkles } from "lucide-react";

export default function GradientSparkles() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24" height="24" viewBox="0 0 24 24"
      fill="none"
      stroke="url(#gradientStroke)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <linearGradient id="gradientStroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a855f7" />   {/* purple-500 */}
          <stop offset="100%" stopColor="#f0abfc" /> {/* fuchsia-400 */}
        </linearGradient>
      </defs>
      <path d="M12 3v5m0 8v5M5.636 6.636l3.536 3.536M14.828 14.828l3.536 3.536M3 12h5m8 0h5M6.636 18.364l3.536-3.536M14.828 9.172l3.536-3.536" />
    </svg>
  );
}
