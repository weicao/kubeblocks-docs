'use client';

import { useTheme } from '@mui/material';
import React from 'react';

function getStyles(dark: boolean) {
  const bg       = dark ? '#0d1117' : '#f6f8fa';
  const card     = dark ? '#161b22' : '#ffffff';
  const border   = dark ? '#30363d' : '#d0d7de';
  const borderIn = dark ? '#21262d' : '#e0e5eb';
  const text     = dark ? '#e6edf3' : '#1f2328';
  const textBrt  = dark ? '#f0f6fc' : '#1f2328';
  const textSec  = dark ? '#7d8590' : '#656d76';
  const textDim  = dark ? '#484f58' : '#8c959f';
  const innerBg  = dark ? '#0d1117' : '#f6f8fa';
  const amber    = '#D97706';
  const amberBg  = dark ? '#1a0f00' : '#fffbf0';
  const amberBd  = dark ? '#92400e' : '#fbbf24';

  return `
    .es-mdit-d * { box-sizing: border-box; }
    .es-mdit-d {
      background: ${bg};
      font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      color: ${text};
      padding: 24px;
      border-radius: 16px;
      margin-bottom: 32px;
    }
    .es-mdit-d .client-bar {
      border-radius: 10px; border: 1px solid ${border};
      background: ${card}; padding: 10px 16px;
      display: flex; align-items: center; gap: 12px;
    }
    .es-mdit-d .client-label { font-size: 13px; font-weight: 600; color: ${textBrt}; }
    .es-mdit-d .client-sub { font-size: 10px; color: ${textSec}; margin-top: 2px; }
    .es-mdit-d .v-arrow {
      display: flex; align-items: center; justify-content: center; gap: 6px; height: 26px;
    }
    .es-mdit-d .v-line {
      width: 2px; height: 16px; position: relative;
      background: linear-gradient(to bottom, ${amber}88, ${amber});
    }
    .es-mdit-d .v-line::after {
      content: ''; position: absolute; bottom: 0; left: 50%;
      transform: translateX(-50%);
      border-left: 5px solid transparent; border-right: 5px solid transparent;
      border-top: 7px solid ${amber};
    }
    .es-mdit-d .v-arrow-label { font-size: 9px; color: ${textDim}; letter-spacing: 0.8px; }
    .es-mdit-d .svc-card {
      border-radius: 8px; border: 1px solid ${amberBd};
      background: ${amberBg}; padding: 8px 14px;
    }
    .es-mdit-d .svc-name { font-size: 11px; font-weight: 700; color: ${amber}; margin-bottom: 2px; }
    .es-mdit-d .svc-sub  { font-size: 10px; color: ${textSec}; }
    .es-mdit-d .pods-section {
      border-radius: 12px; border: 1px solid ${amberBd};
      background: ${amberBg}; padding: 14px;
    }
    .es-mdit-d .comp-title {
      font-size: 10px; font-weight: 700; letter-spacing: 1.5px;
      text-transform: uppercase; color: ${amber}; margin-bottom: 10px;
      display: flex; align-items: center; gap: 6px;
    }
    .es-mdit-d .pods-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;
    }
    @media (max-width: 640px) { .es-mdit-d .pods-grid { grid-template-columns: 1fr 1fr; } }
    .es-mdit-d .pod-card {
      border-radius: 9px; border: 1px solid ${border}; background: ${card}; overflow: hidden;
    }
    .es-mdit-d .pod-card.elected { border-color: ${amber}; }
    .es-mdit-d .pod-hdr {
      padding: 6px 10px; display: flex; align-items: center; justify-content: space-between;
      border-bottom: 1px solid ${borderIn};
    }
    .es-mdit-d .pod-card.elected .pod-hdr {
      background: ${dark ? 'linear-gradient(135deg,#1a1000,#2a1a00)' : 'linear-gradient(135deg,#fffdf0,#fff8dc)'};
      border-bottom-color: ${amberBd}44;
    }
    .es-mdit-d .pod-card:not(.elected) .pod-hdr {
      background: ${dark ? 'linear-gradient(135deg,#0e0d00,#1a1800)' : 'linear-gradient(135deg,#fffef5,#fafaf0)'};
    }
    .es-mdit-d .pod-name { font-size: 11px; font-weight: 700; color: ${textBrt}; }
    .es-mdit-d .pod-badge {
      font-size: 9px; font-weight: 700; letter-spacing: 0.7px; padding: 2px 6px;
      border-radius: 8px; text-transform: uppercase;
    }
    .es-mdit-d .badge-elected { background: ${dark ? '#2a1a00' : '#fef3c7'}; color: ${amber}; border: 1px solid ${amberBd}; }
    .es-mdit-d .badge-all { background: ${dark ? '#1a1800' : '#fafaf0'}; color: ${textSec}; border: 1px solid ${border}; }
    .es-mdit-d .roles-strip {
      padding: 4px 8px 3px; display: flex; gap: 4px; flex-wrap: wrap;
    }
    .es-mdit-d .role-tag {
      font-size: 8px; font-weight: 700; text-transform: uppercase;
      padding: 1px 5px; border-radius: 3px;
      background: ${dark ? '#1a1000' : '#fef9e7'}; color: ${amber};
      border: 1px solid ${amberBd}44;
    }
    .es-mdit-d .ctr-list { padding: 5px; display: flex; flex-direction: column; gap: 3px; }
    .es-mdit-d .ctr-row {
      display: flex; align-items: center; gap: 5px; padding: 3px 7px;
      border-radius: 5px; border: 1px solid ${borderIn}; background: ${innerBg};
      font-size: 10px;
    }
    .es-mdit-d .ctr-main { border-color: ${amberBd}33; background: ${dark ? '#120e00' : '#fffef5'}; }
    .es-mdit-d .ctr-name { font-weight: 600; color: ${text}; flex: 1; }
    .es-mdit-d .ctr-port { color: ${textSec}; white-space: nowrap; font-size: 9px; }
    .es-mdit-d .pvc-strip {
      margin: 0 5px 5px; padding: 3px 8px; border-radius: 4px;
      border: 1px dashed ${border}; font-size: 9px; color: ${textSec};
      display: flex; align-items: center; gap: 4px;
    }
    .es-mdit-d .election-bar {
      margin-top: 10px; padding: 6px 10px; border-radius: 7px;
      border: 1px solid ${amberBd}; background: ${dark ? '#100c00' : '#fffdf5'};
      display: flex; align-items: center; justify-content: center;
      gap: 8px; font-size: 10px; color: ${amber};
    }
    .es-mdit-d .scale-note {
      margin-top: 10px; padding: 6px 10px; border-radius: 7px;
      border: 1px dashed ${border}; font-size: 10px; color: ${textDim};
      text-align: center;
    }
    .es-mdit-d .legend {
      display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;
      padding-top: 10px; border-top: 1px solid ${borderIn}; margin-top: 14px;
    }
    .es-mdit-d .legend-item { display: flex; align-items: center; gap: 5px; font-size: 10px; color: ${textSec}; }
    .es-mdit-d .legend-dot  { width: 8px; height: 8px; border-radius: 50%; }
  `.replace(/\s+/g, ' ');
}

export default function ElasticsearchMditDiagram() {
  const theme = useTheme();
  const dark = theme.palette.mode === 'dark';
  const amber = '#D97706';

  return (
    <>
      <style>{getStyles(dark)}</style>
      <div className="es-mdit-d">

        {/* Client */}
        <div className="client-bar">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={amber} strokeWidth="1.5">
            <rect x="2" y="3" width="20" height="14" rx="2"/>
            <path d="M8 21h8M12 17v4"/>
          </svg>
          <div>
            <div className="client-label">Application / Client</div>
            <div className="client-sub">
              REST <code style={{color: amber}}>es-cluster-mdit-http:9200</code>
              <span style={{color: dark ? '#484f58' : '#8c959f'}}> · any pod can serve requests</span>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="v-arrow">
          <div className="v-line"></div>
          <span className="v-arrow-label">REST :9200</span>
        </div>

        {/* Service */}
        <div className="svc-card">
          <div className="svc-name">es-cluster-mdit-http</div>
          <div className="svc-sub">ClusterIP · :9200 · all pods (no roleSelector)</div>
        </div>

        {/* Arrow */}
        <div className="v-arrow">
          <div className="v-line"></div>
          <span className="v-arrow-label">→ all pods</span>
        </div>

        {/* Pods */}
        <div className="pods-section">
          <div className="comp-title">
            <span style={{width:8, height:8, borderRadius:'50%', background: amber, display:'inline-block'}}></span>
            mdit Component — N replicas, all roles
          </div>
          <div className="pods-grid">
            {[
              { name: 'mdit-0', elected: true },
              { name: 'mdit-1', elected: false },
              { name: 'mdit-2', elected: false },
            ].map(({ name, elected }) => (
              <div key={name} className={`pod-card${elected ? ' elected' : ''}`}>
                <div className="pod-hdr">
                  <span className="pod-name">{name}</span>
                  <span className={`pod-badge ${elected ? 'badge-elected' : 'badge-all'}`}>
                    {elected ? 'MASTER' : 'ALL ROLES'}
                  </span>
                </div>
                <div className="roles-strip">
                  {['master', 'data', 'ingest', 'transform'].map(r => (
                    <span key={r} className="role-tag">{r}</span>
                  ))}
                </div>
                <div className="ctr-list">
                  <div className="ctr-row ctr-main">
                    <span>🔍</span>
                    <span className="ctr-name">elasticsearch</span>
                    <span className="ctr-port">:9200/:9300</span>
                  </div>
                  <div className="ctr-row">
                    <span>⚙️</span>
                    <span className="ctr-name">es-agent</span>
                    <span className="ctr-port">:8080</span>
                  </div>
                  <div className="ctr-row">
                    <span>📊</span>
                    <span className="ctr-name">exporter</span>
                    <span className="ctr-port">:9114</span>
                  </div>
                </div>
                <div className="pvc-strip">💾 PVC data · 30Gi</div>
              </div>
            ))}
          </div>

          <div className="election-bar">
            <span>🗳️</span>
            <strong>Master election across all pods</strong>
            <span style={{color: dark ? '#484f58' : '#8c959f'}}>· :9300 transport · quorum required</span>
          </div>
          <div className="scale-note">
            + scale out via HorizontalScaling OpsRequest · each new pod joins the election quorum
          </div>
        </div>

        {/* Legend */}
        <div className="legend">
          <div className="legend-item"><span className="legend-dot" style={{background: amber}}></span>Elected Master</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#3fb950'}}></span>Client Traffic :9200</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#56d4dd'}}></span>Transport :9300</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#e3b341'}}></span>Persistent Storage</div>
        </div>

      </div>
    </>
  );
}
