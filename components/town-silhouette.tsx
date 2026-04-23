export function TownSilhouette({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1600 320"
      preserveAspectRatio="xMidYEnd meet"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="far-bldg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#2a1828" />
          <stop offset="1" stopColor="#140814" />
        </linearGradient>
        <linearGradient id="mid-bldg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#1a0e16" />
          <stop offset="1" stopColor="#0a0509" />
        </linearGradient>
        <linearGradient id="near-bldg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#0d0710" />
          <stop offset="1" stopColor="#050306" />
        </linearGradient>
        <radialGradient id="lamp" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#ffd48a" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#ff9a4d" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ff9a4d" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="window-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#ffd48a" />
          <stop offset="100%" stopColor="#d9833a" />
        </radialGradient>
      </defs>

      {/* ── FAR LAYER ─────────────────────────────────────────── */}
      <g fill="url(#far-bldg)" opacity="0.85">
        <rect x="40" y="170" width="80" height="150" />
        <rect x="130" y="140" width="110" height="180" />
        <rect x="260" y="160" width="70" height="160" />
        <polygon points="260,160 295,130 330,160" />
        <rect x="350" y="175" width="90" height="145" />
        <rect x="470" y="150" width="100" height="170" />
        <rect x="600" y="165" width="70" height="155" />
        <rect x="700" y="130" width="85" height="190" />
        <rect x="820" y="155" width="100" height="165" />
        <rect x="950" y="170" width="80" height="150" />
        <rect x="1060" y="145" width="105" height="175" />
        <rect x="1200" y="160" width="90" height="160" />
        <rect x="1320" y="140" width="110" height="180" />
        <rect x="1460" y="170" width="100" height="150" />
      </g>
      {/* Far windows (tiny warm dots) */}
      <g fill="url(#window-glow)" opacity="0.75">
        {[
          [60, 210], [70, 240], [160, 180], [175, 205], [190, 230], [200, 260],
          [380, 220], [500, 200], [520, 240], [610, 210], [725, 170],
          [745, 210], [760, 250], [850, 200], [880, 230], [980, 210],
          [1080, 190], [1110, 220], [1220, 200], [1340, 180], [1360, 215],
          [1480, 200], [1510, 240],
        ].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="4" height="5" rx="0.5" />
        ))}
      </g>

      {/* ── MID LAYER (church + clock tower + shops) ─────────── */}
      <g fill="url(#mid-bldg)">
        {/* Shop 1 */}
        <rect x="150" y="215" width="160" height="105" />
        {/* Shop 2 */}
        <rect x="330" y="225" width="140" height="95" />

        {/* Church */}
        <rect x="520" y="200" width="110" height="120" />
        <polygon points="520,200 575,145 630,200" />
        <rect x="572" y="130" width="6" height="25" />
        <rect x="566" y="142" width="18" height="4" />

        {/* Shops middle */}
        <rect x="660" y="230" width="120" height="90" />
        <rect x="800" y="210" width="140" height="110" />

        {/* Clock tower */}
        <rect x="970" y="170" width="80" height="150" />
        <rect x="960" y="160" width="100" height="14" />
        <polygon points="970,160 1010,118 1050,160" />
        <circle cx="1010" cy="210" r="20" fill="#f6efdd" />
        <circle cx="1010" cy="210" r="17" fill="#1a0e16" />
        {/* Clock hands at ~10:10 */}
        <line x1="1010" y1="210" x2="997" y2="199" stroke="#e3c27a" strokeWidth="2" strokeLinecap="round" />
        <line x1="1010" y1="210" x2="1023" y2="201" stroke="#e3c27a" strokeWidth="2" strokeLinecap="round" />
        <circle cx="1010" cy="210" r="1.8" fill="#e3c27a" />

        {/* Shop row right */}
        <rect x="1080" y="220" width="150" height="100" />
        <rect x="1250" y="205" width="120" height="115" />
        <rect x="1390" y="230" width="130" height="90" />
      </g>

      {/* Mid-layer windows (more visible) */}
      <g fill="url(#window-glow)" opacity="0.9">
        {/* Shop 1 */}
        <rect x="170" y="235" width="14" height="20" rx="2" />
        <rect x="200" y="235" width="14" height="20" rx="2" />
        <rect x="230" y="235" width="14" height="20" rx="2" />
        <rect x="260" y="235" width="14" height="20" rx="2" />
        {/* Shop 2 */}
        <rect x="350" y="250" width="12" height="16" rx="2" />
        <rect x="375" y="250" width="12" height="16" rx="2" />
        <rect x="400" y="250" width="12" height="16" rx="2" />
        <rect x="425" y="250" width="12" height="16" rx="2" />
        {/* Church window (big) */}
        <rect x="565" y="225" width="20" height="40" rx="10" />
        {/* Middle shops */}
        <rect x="680" y="250" width="12" height="18" rx="2" />
        <rect x="705" y="250" width="12" height="18" rx="2" />
        <rect x="730" y="250" width="12" height="18" rx="2" />
        <rect x="755" y="250" width="12" height="18" rx="2" />
        <rect x="820" y="230" width="14" height="20" rx="2" />
        <rect x="850" y="230" width="14" height="20" rx="2" />
        <rect x="880" y="230" width="14" height="20" rx="2" />
        <rect x="910" y="230" width="14" height="20" rx="2" />
        {/* Clock tower high windows */}
        <rect x="983" y="255" width="12" height="18" rx="2" />
        <rect x="1025" y="255" width="12" height="18" rx="2" />
        {/* Right shops */}
        <rect x="1100" y="240" width="14" height="20" rx="2" />
        <rect x="1135" y="240" width="14" height="20" rx="2" />
        <rect x="1170" y="240" width="14" height="20" rx="2" />
        <rect x="1205" y="240" width="14" height="20" rx="2" />
        <rect x="1270" y="225" width="14" height="22" rx="2" />
        <rect x="1305" y="225" width="14" height="22" rx="2" />
        <rect x="1340" y="225" width="14" height="22" rx="2" />
        <rect x="1410" y="250" width="14" height="18" rx="2" />
        <rect x="1445" y="250" width="14" height="18" rx="2" />
        <rect x="1480" y="250" width="14" height="18" rx="2" />
      </g>

      {/* Flag on clock tower */}
      <g>
        <line x1="1010" y1="118" x2="1010" y2="98" stroke="#c9a24a" strokeWidth="1.5" />
        <polygon points="1010,98 1028,102 1010,108" fill="#c8372d" />
      </g>

      {/* ── NEAR LAYER (storefronts + awnings) ───────────────── */}
      <g fill="url(#near-bldg)">
        <rect x="0" y="260" width="280" height="60" />
        <rect x="300" y="270" width="260" height="50" />
        <rect x="580" y="265" width="220" height="55" />
        <rect x="820" y="270" width="260" height="50" />
        <rect x="1100" y="260" width="230" height="60" />
        <rect x="1350" y="265" width="250" height="55" />
      </g>

      {/* Candy-stripe awnings on near storefronts */}
      {[
        [40, 255, 180], [320, 265, 160], [600, 260, 160],
        [840, 265, 160], [1120, 255, 170], [1370, 260, 180],
      ].map(([x, y, w], i) => (
        <g key={i}>
          <rect x={x} y={y} width={w} height="10" fill="#8f241c" />
          <rect x={x} y={y} width={w} height="10" fill="url(#awning-stripe)" />
        </g>
      ))}
      <defs>
        <pattern id="awning-stripe" x="0" y="0" width="12" height="10" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="6" height="10" fill="#efe4c6" opacity="0.85" />
        </pattern>
      </defs>

      {/* Storefront lit windows */}
      <g fill="url(#window-glow)">
        {[
          [45, 278], [80, 278], [115, 278], [150, 278], [185, 278], [220, 278],
          [325, 285], [360, 285], [395, 285], [430, 285], [465, 285], [500, 285], [535, 285],
          [605, 280], [640, 280], [675, 280], [710, 280], [745, 280], [780, 280],
          [845, 285], [880, 285], [915, 285], [950, 285], [985, 285], [1020, 285], [1055, 285],
          [1125, 278], [1160, 278], [1195, 278], [1230, 278], [1265, 278], [1300, 278],
          [1375, 280], [1410, 280], [1445, 280], [1480, 280], [1515, 280], [1550, 280],
        ].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="18" height="22" rx="2" />
        ))}
      </g>

      {/* Lampposts with glow */}
      {[230, 560, 880, 1180, 1440].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy="255" r="38" fill="url(#lamp)" />
          <rect x={x - 1.5} y="255" width="3" height="65" fill="#1a0e16" />
          <circle cx={x} cy="252" r="4" fill="#ffd48a" />
          <circle cx={x} cy="252" r="6" fill="#ffd48a" opacity="0.4" />
        </g>
      ))}

      {/* Rooftop silhouettes of trees */}
      <g fill="#080509">
        <circle cx="760" cy="268" r="14" />
        <circle cx="775" cy="262" r="11" />
        <circle cx="745" cy="264" r="10" />
        <rect x="765" y="268" width="3" height="12" />
      </g>
    </svg>
  );
}
