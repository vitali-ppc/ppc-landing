'use client';

import { ReactNode } from 'react';

/**
 * MascotQuote — inline speech-bubble citation from a B6 agent.
 *
 * Used inside blog articles to give voice to Buzz/Aegis/Echo/Vox/Mira/Sage/Maximus.
 * The quote MUST be concrete (with numbers + an action), never a self-introduction.
 *
 * Example:
 *   <MascotQuote mascot="buzz">
 *     If your historical ROAS is 320% and you set Target ROAS at 600%, the auction
 *     skips your bid. I'd run Maximize Conversion Value for 14 days, get a real
 *     baseline, then set Target ROAS at 80% of that baseline.
 *   </MascotQuote>
 */

type MascotName =
  | 'buzz'      // Bidding
  | 'aegis'     // Risk review
  | 'echo'      // Reporting
  | 'vox'       // Strategy
  | 'maximus'   // Orchestrator
  | 'mira'      // Creative
  | 'sage';     // Research

const MASCOT_META: Record<MascotName, {
  emoji: string;
  name: string;
  role: string;
  accent: string;
  bg: string;
}> = {
  buzz:    { emoji: '🐝', name: 'Buzz',    role: 'Bidding',      accent: '#f59e0b', bg: '#fffbeb' },
  aegis:   { emoji: '🛡️', name: 'Aegis',   role: 'Risk review',  accent: '#3b82f6', bg: '#eff6ff' },
  echo:    { emoji: '📊', name: 'Echo',    role: 'Reporting',    accent: '#10b981', bg: '#ecfdf5' },
  vox:     { emoji: '🦊', name: 'Vox',     role: 'Strategy',     accent: '#f97316', bg: '#fff7ed' },
  maximus: { emoji: '🐻', name: 'Maximus', role: 'Orchestrator', accent: '#78350f', bg: '#fef3c7' },
  mira:    { emoji: '🎨', name: 'Mira',    role: 'Creative',     accent: '#ec4899', bg: '#fdf2f8' },
  sage:    { emoji: '🦉', name: 'Sage',    role: 'Research',     accent: '#8b5cf6', bg: '#f5f3ff' },
};

interface MascotQuoteProps {
  mascot: MascotName;
  children: ReactNode;
}

export default function MascotQuote({ mascot, children }: MascotQuoteProps) {
  const meta = MASCOT_META[mascot];

  return (
    <div
      style={{
        background: meta.bg,
        borderLeft: `4px solid ${meta.accent}`,
        borderRadius: '8px',
        padding: '20px 24px',
        margin: '32px 0',
        fontSize: '17px',
        lineHeight: '1.7',
        color: '#1e293b',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '12px',
          fontSize: '15px',
          fontWeight: 600,
          color: meta.accent,
        }}
      >
        <span style={{ fontSize: '20px' }}>{meta.emoji}</span>
        <span>{meta.name}</span>
        <span style={{ color: '#64748b', fontWeight: 400 }}>· {meta.role}</span>
      </div>
      <div style={{ fontStyle: 'italic' }}>{children}</div>
    </div>
  );
}
