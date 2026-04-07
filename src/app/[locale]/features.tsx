'use client';

import { Box, Container, Typography, useTheme } from '@mui/material';
import Image from 'next/image';

const modules = [
  {
    tag: 'CLI & GitOps',
    title: 'From 1 Cluster to 10,000 — the Same Command Works',
    description:
      'Use kbcli for an intuitive developer experience, or integrate seamlessly with your GitOps pipelines using declarative YAMLs. Your workflow scales with your infrastructure.',
    visual: 'terminal',
  },
  {
    tag: 'Backup',
    title: 'Never Lose a Byte of Data',
    description:
      'Execute instant backups, schedule automated policies, and perform precise Point-in-Time Recovery (PITR) to restore your database to any specific second. Enterprise-grade data protection, out of the box.',
    visual: 'yaml',
  },
  {
    tag: 'Observability',
    title: "Know What's Happening Before Your Users Do",
    description:
      'KubeBlocks provides out-of-the-box integration with Prometheus and Grafana, offering detailed metrics, slow SQL analysis, and customizable alert rules—so you catch problems before they become incidents.',
    visual: 'grafana',
  },
  {
    tag: 'Lifecycle',
    title: 'Put Your Database Operations on Autopilot',
    description:
      'From rolling upgrades and vertical scaling to automatic failure recovery and data-at-rest encryption—KubeBlocks handles the heavy lifting so your team can focus on building, not babysitting.',
    visual: 'failover',
  },
];

const terminalLines = [
  { prompt: '$', cmd: 'kbcli cluster list -A', out: false },
  { out: true, text: 'NAME              NAMESPACE  CLUSTER-DEFINITION  STATUS   ' },
  { out: true, text: 'mysql-8-4-4       demo       mysql               Running  ' },
  { out: true, text: 'pg-cluster        demo       postgresql          Running  ' },
  { out: true, text: 'clickhouse-clust  demo       clickhouse          Running  ' },
  { prompt: '$', cmd: 'kbcli cluster describe mysql-8-4-4 -n demo', out: false },
  { out: true, text: 'INSTANCE              ROLE       STATUS   AZ              ' },
  { out: true, text: 'mysql-8-4-4-mysql-0   secondary  Running  ap-southeast-1a ' },
  { out: true, text: 'mysql-8-4-4-mysql-1   primary    Running  ap-southeast-1a ', success: true },
];

const yamlLines = `apiVersion: dataprotection.kubeblocks.io/v1alpha1
kind: BackupSchedule
metadata:
  name: mysql-backup-policy
spec:
  backupPolicyName: mysql-backup-policy
  schedules:
    - backupMethod: xtrabackup
      cronExpression: "0 2 * * *"
      retentionPeriod: 7d
      enabled: true`;

function TerminalVisual({ isDark }: { isDark: boolean }) {
  const bg = isDark ? '#050507' : '#1e1e2e';
  const muted = '#6b7280';
  const prompt = '#3f4a5c';
  const cmd = '#7dd3fc';
  const success = '#34d399';
  const output = 'rgba(255,255,255,0.65)';

  return (
    <Box sx={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', bgcolor: bg, fontSize: '0.75rem', fontFamily: 'monospace' }}>
      {/* title bar */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', px: 1.5, py: 1, bgcolor: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
          <Box key={c} sx={{ width: 9, height: 9, borderRadius: '50%', bgcolor: c }} />
        ))}
        <Typography sx={{ ml: 1, fontSize: '0.65rem', color: muted, fontFamily: 'monospace' }}>~ zsh</Typography>
      </Box>
      <Box sx={{ p: '14px 16px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
        {terminalLines.map((line, i) =>
          line.out ? (
            <Typography key={i} sx={{ fontSize: '0.72rem', fontFamily: 'monospace', color: line.success ? success : output, lineHeight: 1.7 }}>
              {line.text}
            </Typography>
          ) : (
            <Box key={i} sx={{ display: 'flex', gap: 1 }}>
              <Typography sx={{ fontSize: '0.72rem', fontFamily: 'monospace', color: prompt, userSelect: 'none' }}>{line.prompt}</Typography>
              <Typography sx={{ fontSize: '0.72rem', fontFamily: 'monospace', color: cmd }}>{line.cmd}</Typography>
            </Box>
          )
        )}
      </Box>
    </Box>
  );
}

function YamlVisual({ isDark }: { isDark: boolean }) {
  const bg = isDark ? '#050507' : '#1e1e2e';
  const key = '#7dd3fc';
  const val = '#86efac';
  const str = '#fbbf24';
  const muted = '#6b7280';

  const colorLine = (line: string) => {
    if (line.trim().startsWith('#')) return muted;
    if (line.includes(':') && !line.trim().startsWith('-')) {
      const [, v] = line.split(/:(.*)/);
      if (!v?.trim()) return key;
      const vTrimmed = v.trim();
      if (vTrimmed.startsWith('"') || vTrimmed.startsWith("'")) return str;
      return undefined;
    }
    return undefined;
  };

  return (
    <Box sx={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', bgcolor: bg }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', px: 1.5, py: 1, bgcolor: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
          <Box key={c} sx={{ width: 9, height: 9, borderRadius: '50%', bgcolor: c }} />
        ))}
        <Typography sx={{ ml: 1, fontSize: '0.65rem', color: muted, fontFamily: 'monospace' }}>backup-schedule.yaml</Typography>
      </Box>
      <Box sx={{ p: '14px 16px' }}>
        {yamlLines.split('\n').map((line, i) => {
          const isKey = line.includes(':') && !line.trim().startsWith('-') && !line.split(':')[1]?.trim();
          const isVal = line.includes(':') && line.split(':')[1]?.trim();
          const color = colorLine(line);
          if (isKey) {
            return (
              <Box key={i} sx={{ display: 'flex', fontFamily: 'monospace', fontSize: '0.72rem', lineHeight: 1.8, whiteSpace: 'pre' }}>
                <Typography component="span" sx={{ fontFamily: 'monospace', fontSize: '0.72rem', color: key }}>{line}</Typography>
              </Box>
            );
          }
          if (isVal) {
            const colonIdx = line.indexOf(':');
            const k = line.slice(0, colonIdx);
            const v = line.slice(colonIdx + 1);
            const vColor = v.trim().startsWith('"') || v.trim().startsWith("'") ? str : val;
            return (
              <Box key={i} sx={{ display: 'flex', fontFamily: 'monospace', fontSize: '0.72rem', lineHeight: 1.8, whiteSpace: 'pre' }}>
                <Typography component="span" sx={{ fontFamily: 'monospace', fontSize: '0.72rem', color: key }}>{k}</Typography>
                <Typography component="span" sx={{ fontFamily: 'monospace', fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)' }}>:</Typography>
                <Typography component="span" sx={{ fontFamily: 'monospace', fontSize: '0.72rem', color: vColor }}>{v}</Typography>
              </Box>
            );
          }
          return (
            <Typography key={i} sx={{ fontFamily: 'monospace', fontSize: '0.72rem', lineHeight: 1.8, whiteSpace: 'pre', color: color ?? 'rgba(255,255,255,0.65)' }}>
              {line}
            </Typography>
          );
        })}
      </Box>
    </Box>
  );
}

function GrafanaVisual({ isDark }: { isDark: boolean }) {
  const barBg = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.04)';
  const barBorder = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)';
  const muted = isDark ? '#6b7280' : '#9ca3af';

  return (
    <Box
      sx={{
        borderRadius: '10px', overflow: 'hidden',
        border: '1px solid', borderColor: 'divider',
        boxShadow: isDark
          ? '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)'
          : '0 20px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)',
        position: 'relative',
      }}
    >
      {/* Browser chrome bar */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', px: 1.5, py: 1, bgcolor: barBg, borderBottom: `1px solid ${barBorder}` }}>
        {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
          <Box key={c} sx={{ width: 9, height: 9, borderRadius: '50%', bgcolor: c }} />
        ))}
        <Box sx={{ flex: 1, mx: 1.5, bgcolor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)', borderRadius: '4px', px: 1.5, py: '3px', display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ fontSize: '0.6rem', color: muted, fontFamily: 'monospace' }}>
            grafana · KubeBlocks Elasticsearch Dashboard
          </Typography>
        </Box>
      </Box>

      {/* Image with bottom fade */}
      <Box sx={{ position: 'relative', lineHeight: 0, maxHeight: 220, overflow: 'hidden' }}>
        <Image
          src={isDark ? '/site/grafana-dark.png' : '/site/grafana-light.png'}
          alt="Grafana dashboard"
          width={800}
          height={500}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
        {/* Bottom gradient fade */}
        <Box
          sx={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
            background: isDark
              ? 'linear-gradient(to bottom, transparent, rgba(18,18,24,0.98))'
              : 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.98))',
            pointerEvents: 'none',
          }}
        />
      </Box>
    </Box>
  );
}

function LifecycleVisual({ isDark }: { isDark: boolean }) {
  const bg = isDark ? '#0d1117' : '#f8fafc';
  const border = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)';
  const gridDot = isDark ? '#1e293b' : '#e2e8f0';
  const arrowFill = isDark ? '#334155' : '#94a3b8';
  const railStroke = isDark ? '#1e293b' : '#e2e8f0';
  const connectorLabel = isDark ? '#334155' : '#94a3b8';
  const stageLabel = isDark ? '#f1f5f9' : '#1e293b';
  const stageSub = isDark ? '#64748b' : '#94a3b8';
  const bannerBg = isDark ? '#0f172a' : '#f1f5f9';
  const bannerBorder = isDark ? '#1e293b' : '#e2e8f0';
  const bannerText = isDark ? '#94a3b8' : '#475569';
  const bannerSub = isDark ? '#475569' : '#94a3b8';
  const titleColor = isDark ? '#334155' : '#94a3b8';
  const stepFill = isDark ? '#0d1117' : '#f8fafc';
  const stepBorder = isDark ? '#334155' : '#cbd5e1';
  const stepText = isDark ? '#475569' : '#94a3b8';

  return (
    <Box sx={{ borderRadius: '10px', overflow: 'hidden', border: `1px solid ${border}`, bgcolor: bg }}>
      <Box sx={{ p: '12px 16px' }}>
        <svg viewBox="0 0 720 380" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <defs>
            <pattern id="lc-grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill={gridDot}/>
            </pattern>
            <marker id="lc-arr" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
              <path d="M2,2 L9,5 L2,8 Z" fill={arrowFill}/>
            </marker>
            <filter id="lc-glow-green" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="6" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="lc-glow-cyan" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="6" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <radialGradient id="lc-grad-green" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#166534" stopOpacity="0.9"/>
              <stop offset="100%" stopColor="#052e16" stopOpacity="0.95"/>
            </radialGradient>
            <radialGradient id="lc-grad-blue" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#1e40af" stopOpacity="0.9"/>
              <stop offset="100%" stopColor="#0c1a4e" stopOpacity="0.95"/>
            </radialGradient>
            <radialGradient id="lc-grad-purple" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#4c1d95" stopOpacity="0.9"/>
              <stop offset="100%" stopColor="#1e0a3c" stopOpacity="0.95"/>
            </radialGradient>
            <radialGradient id="lc-grad-amber" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#92400e" stopOpacity="0.9"/>
              <stop offset="100%" stopColor="#3d1a04" stopOpacity="0.95"/>
            </radialGradient>
            <radialGradient id="lc-grad-cyan" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#164e63" stopOpacity="0.9"/>
              <stop offset="100%" stopColor="#042030" stopOpacity="0.95"/>
            </radialGradient>
          </defs>

          <rect width="720" height="380" fill="none"/>
          <line x1="72" y1="155" x2="648" y2="155" stroke={railStroke} strokeWidth="2"/>

          {/* Connector arrows */}
          <line x1="122" y1="155" x2="166" y2="155" stroke={arrowFill} strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#lc-arr)"/>
          <line x1="266" y1="155" x2="310" y2="155" stroke={arrowFill} strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#lc-arr)"/>
          <line x1="410" y1="155" x2="454" y2="155" stroke={arrowFill} strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#lc-arr)"/>
          <line x1="554" y1="155" x2="598" y2="155" stroke={arrowFill} strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#lc-arr)"/>

          {/* Connector labels */}
          <text x="144" y="146" textAnchor="middle" fontSize="8" fill={connectorLabel} fontFamily="'SF Mono',monospace">kbcli</text>
          <text x="288" y="146" textAnchor="middle" fontSize="8" fill={connectorLabel} fontFamily="'SF Mono',monospace">kbcli</text>
          <text x="432" y="146" textAnchor="middle" fontSize="8" fill={connectorLabel} fontFamily="'SF Mono',monospace">kbcli</text>
          <text x="576" y="146" textAnchor="middle" fontSize="8" fill={connectorLabel} fontFamily="'SF Mono',monospace">kbcli</text>

          {/* Node 1 — CREATE */}
          <circle cx="72" cy="155" r="52" fill="#4ade8008" stroke="#4ade8030" strokeWidth="1" filter="url(#lc-glow-green)"/>
          <circle cx="72" cy="155" r="44" fill="url(#lc-grad-green)" stroke="#4ade80" strokeWidth="1.8"/>
          <circle cx="72" cy="155" r="36" fill="none" stroke="#4ade8030" strokeWidth="1"/>
          <line x1="72" y1="143" x2="72" y2="167" stroke="#4ade80" strokeWidth="3" strokeLinecap="round"/>
          <line x1="60" y1="155" x2="84" y2="155" stroke="#4ade80" strokeWidth="3" strokeLinecap="round"/>
          <text x="72" y="216" textAnchor="middle" fontSize="13" fontWeight="700" fill={stageLabel} fontFamily="sans-serif">Create</text>
          <text x="72" y="233" textAnchor="middle" fontSize="9.5" fill={stageSub} fontFamily="sans-serif">Provision in seconds</text>
          <rect x="36" y="92" width="72" height="22" rx="6" fill={isDark ? '#052e16' : '#dcfce7'} stroke="#4ade8055" strokeWidth="1.2"/>
          <text x="72" y="107" textAnchor="middle" fontSize="9" fill="#4ade80" fontFamily="'SF Mono',monospace">✓ seconds</text>
          <text x="72" y="159" textAnchor="middle" fontSize="7.5" fill="#4ade8088" fontFamily="'SF Mono',monospace">cluster create</text>

          {/* Node 2 — SCALE */}
          <circle cx="216" cy="155" r="52" fill="#60a5fa08" stroke="#60a5fa20" strokeWidth="1"/>
          <circle cx="216" cy="155" r="44" fill="url(#lc-grad-blue)" stroke="#60a5fa" strokeWidth="1.8"/>
          <circle cx="216" cy="155" r="36" fill="none" stroke="#60a5fa30" strokeWidth="1"/>
          <rect x="202" y="162" width="7" height="10" rx="2" fill="#60a5fa"/>
          <rect x="212" y="153" width="7" height="19" rx="2" fill="#60a5fa"/>
          <rect x="222" y="158" width="7" height="14" rx="2" fill="#60a5fa" opacity=".6"/>
          <text x="216" y="216" textAnchor="middle" fontSize="13" fontWeight="700" fill={stageLabel} fontFamily="sans-serif">Scale</text>
          <text x="216" y="233" textAnchor="middle" fontSize="9.5" fill={stageSub} fontFamily="sans-serif">H/V · zero downtime</text>
          <rect x="176" y="92" width="80" height="22" rx="6" fill={isDark ? '#0c1a4e' : '#dbeafe'} stroke="#60a5fa55" strokeWidth="1.2"/>
          <text x="216" y="107" textAnchor="middle" fontSize="9" fill="#60a5fa" fontFamily="'SF Mono',monospace">2 → N nodes</text>
          <text x="216" y="159" textAnchor="middle" fontSize="7.5" fill="#60a5fa88" fontFamily="'SF Mono',monospace">cluster hscale</text>

          {/* Node 3 — BACKUP & PITR */}
          <circle cx="360" cy="155" r="52" fill="#a78bfa08" stroke="#a78bfa20" strokeWidth="1"/>
          <circle cx="360" cy="155" r="44" fill="url(#lc-grad-purple)" stroke="#a78bfa" strokeWidth="1.8"/>
          <circle cx="360" cy="155" r="36" fill="none" stroke="#a78bfa30" strokeWidth="1"/>
          <path d="M360,140 L374,145 L374,156 C374,164 360,170 360,170 C360,170 346,164 346,156 L346,145 Z" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M353,155 L358,161 L368,149" stroke="#a78bfa" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          <text x="360" y="216" textAnchor="middle" fontSize="13" fontWeight="700" fill={stageLabel} fontFamily="sans-serif">Backup &amp; PITR</text>
          <text x="360" y="233" textAnchor="middle" fontSize="9.5" fill={stageSub} fontFamily="sans-serif">Scheduled · any-second restore</text>
          <rect x="310" y="92" width="100" height="22" rx="6" fill={isDark ? '#1e0a3c' : '#ede9fe'} stroke="#a78bfa55" strokeWidth="1.2"/>
          <text x="360" y="107" textAnchor="middle" fontSize="9" fill="#a78bfa" fontFamily="'SF Mono',monospace">0 data loss</text>
          <text x="360" y="159" textAnchor="middle" fontSize="7.5" fill="#a78bfa88" fontFamily="'SF Mono',monospace">cluster backup</text>

          {/* Node 4 — UPGRADE */}
          <circle cx="504" cy="155" r="52" fill="#fbbf2408" stroke="#fbbf2420" strokeWidth="1"/>
          <circle cx="504" cy="155" r="44" fill="url(#lc-grad-amber)" stroke="#fbbf24" strokeWidth="1.8"/>
          <circle cx="504" cy="155" r="36" fill="none" stroke="#fbbf2430" strokeWidth="1"/>
          <path d="M493,148 A13,13 0 1,1 517,158" stroke="#fbbf24" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <path d="M517,150 L517,159 L526,154 Z" fill="#fbbf24"/>
          <text x="504" y="216" textAnchor="middle" fontSize="13" fontWeight="700" fill={stageLabel} fontFamily="sans-serif">Upgrade</text>
          <text x="504" y="233" textAnchor="middle" fontSize="9.5" fill={stageSub} fontFamily="sans-serif">Rolling · replica by replica</text>
          <rect x="456" y="92" width="96" height="22" rx="6" fill={isDark ? '#3d1a04' : '#fef3c7'} stroke="#fbbf2455" strokeWidth="1.2"/>
          <text x="504" y="107" textAnchor="middle" fontSize="9" fill="#fbbf24" fontFamily="'SF Mono',monospace">minimal downtime</text>
          <text x="504" y="159" textAnchor="middle" fontSize="7.5" fill="#fbbf2488" fontFamily="'SF Mono',monospace">cluster upgrade</text>

          {/* Node 5 — RESTORE */}
          <circle cx="648" cy="155" r="52" fill="#22d3ee08" stroke="#22d3ee30" strokeWidth="1" filter="url(#lc-glow-cyan)"/>
          <circle cx="648" cy="155" r="44" fill="url(#lc-grad-cyan)" stroke="#22d3ee" strokeWidth="1.8"/>
          <circle cx="648" cy="155" r="36" fill="none" stroke="#22d3ee30" strokeWidth="1"/>
          <circle cx="648" cy="155" r="14" stroke="#22d3ee" strokeWidth="2" fill="none"/>
          <line x1="648" y1="145" x2="648" y2="156" stroke="#22d3ee" strokeWidth="2.2" strokeLinecap="round"/>
          <line x1="648" y1="156" x2="656" y2="161" stroke="#22d3ee" strokeWidth="2.2" strokeLinecap="round"/>
          <line x1="648" y1="142" x2="648" y2="145" stroke="#22d3ee55" strokeWidth="1.5"/>
          <line x1="648" y1="165" x2="648" y2="168" stroke="#22d3ee55" strokeWidth="1.5"/>
          <line x1="635" y1="155" x2="638" y2="155" stroke="#22d3ee55" strokeWidth="1.5"/>
          <line x1="658" y1="155" x2="661" y2="155" stroke="#22d3ee55" strokeWidth="1.5"/>
          <text x="648" y="216" textAnchor="middle" fontSize="13" fontWeight="700" fill={stageLabel} fontFamily="sans-serif">Restore</text>
          <text x="648" y="233" textAnchor="middle" fontSize="9.5" fill={stageSub} fontFamily="sans-serif">Point-in-time recovery</text>
          <rect x="596" y="92" width="104" height="22" rx="6" fill={isDark ? '#042030' : '#cffafe'} stroke="#22d3ee55" strokeWidth="1.2"/>
          <text x="648" y="107" textAnchor="middle" fontSize="9" fill="#22d3ee" fontFamily="'SF Mono',monospace">any second</text>
          <text x="648" y="159" textAnchor="middle" fontSize="7.5" fill="#22d3ee88" fontFamily="'SF Mono',monospace">cluster restore</text>

          {/* Bottom controller banner */}
          <rect x="60" y="262" width="600" height="36" rx="8" fill={bannerBg} stroke={bannerBorder} strokeWidth="1.2"/>
          <circle cx="84" cy="280" r="6" fill="#38bdf820" stroke="#38bdf8" strokeWidth="1.2"/>
          <text x="84" y="284" textAnchor="middle" fontSize="7" fill="#38bdf8" fontWeight="700" fontFamily="sans-serif">KB</text>
          <text x="100" y="277" fontSize="9.5" fill={bannerText} fontFamily="sans-serif" fontWeight="600">KubeBlocks Controller</text>
          <text x="100" y="291" fontSize="8.5" fill={bannerSub} fontFamily="'SF Mono',monospace">Watches · Reconciles · Automates — declarative YAML or single kbcli command</text>

          {/* Top title */}
          <text x="360" y="34" textAnchor="middle" fontSize="10" fill={titleColor} fontFamily="'SF Mono',monospace" letterSpacing=".1em">DATABASE LIFECYCLE</text>
          <line x1="60" y1="40" x2="240" y2="40" stroke={railStroke} strokeWidth="1"/>
          <line x1="480" y1="40" x2="660" y2="40" stroke={railStroke} strokeWidth="1"/>
          <circle cx="360" cy="40" r="3" fill={titleColor}/>

          {/* Step numbers */}
          <circle cx="72" cy="55" r="10" fill={stepFill} stroke={stepBorder} strokeWidth="1"/>
          <text x="72" y="59" textAnchor="middle" fontSize="9" fill={stepText} fontFamily="'SF Mono',monospace">01</text>
          <circle cx="216" cy="55" r="10" fill={stepFill} stroke={stepBorder} strokeWidth="1"/>
          <text x="216" y="59" textAnchor="middle" fontSize="9" fill={stepText} fontFamily="'SF Mono',monospace">02</text>
          <circle cx="360" cy="55" r="10" fill={stepFill} stroke={stepBorder} strokeWidth="1"/>
          <text x="360" y="59" textAnchor="middle" fontSize="9" fill={stepText} fontFamily="'SF Mono',monospace">03</text>
          <circle cx="504" cy="55" r="10" fill={stepFill} stroke={stepBorder} strokeWidth="1"/>
          <text x="504" y="59" textAnchor="middle" fontSize="9" fill={stepText} fontFamily="'SF Mono',monospace">04</text>
          <circle cx="648" cy="55" r="10" fill={stepFill} stroke={stepBorder} strokeWidth="1"/>
          <text x="648" y="59" textAnchor="middle" fontSize="9" fill={stepText} fontFamily="'SF Mono',monospace">05</text>
        </svg>
      </Box>
    </Box>
  );
}

export default function Features() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={8}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: '8px', mb: 1.5, fontSize: '11px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'primary.main', '&::before': { content: '""', width: '14px', height: '2px', borderRadius: '1px', bgcolor: 'primary.main', display: 'block' } }}>
            Day 2 Operations
          </Box>
          <Typography variant="h4" fontWeight={700} sx={{ letterSpacing: '-0.02em', mb: 1.5 }}>
            Everything Your Team Needs{' '}
            <Box component="span" color="primary.main">to Run Databases in Production</Box>
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 520, mx: 'auto' }}>
            From provisioning to failover, from backup to scaling—KubeBlocks handles the operational complexity so your team can focus on building.
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: '1px', bgcolor: 'divider', border: '1px solid', borderColor: 'divider', borderRadius: '14px', overflow: 'hidden' }}>
          {modules.map((mod) => (
            <Box
              key={mod.tag}
              sx={{
                bgcolor: 'background.paper', p: { xs: 3, md: 4 },
                display: 'flex', flexDirection: 'column', gap: 2.5,
                transition: 'background .2s',
                '&:hover': { bgcolor: 'action.hover' },
              }}
            >
              {/* Tag + title + desc */}
              <Box>
                <Box component="span" sx={{ fontSize: '0.65rem', fontWeight: 700, px: 1, py: 0.375, borderRadius: '4px', border: '1px solid', borderColor: 'primary.main', color: 'primary.main', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {mod.tag}
                </Box>
                <Typography fontWeight={700} sx={{ fontSize: '1.05rem', mt: 1.5, mb: 1, letterSpacing: '-0.01em' }}>
                  {mod.title}
                </Typography>
                <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary', lineHeight: 1.75 }}>
                  {mod.description}
                </Typography>
              </Box>

              {/* Visual */}
              {mod.visual === 'terminal' && <TerminalVisual isDark={isDark} />}
              {mod.visual === 'yaml' && <YamlVisual isDark={isDark} />}
              {mod.visual === 'grafana' && <GrafanaVisual isDark={isDark} />}
              {mod.visual === 'failover' && <LifecycleVisual isDark={isDark} />}
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
