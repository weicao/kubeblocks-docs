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

  return `
    .es-sn * { box-sizing: border-box; }
    .es-sn {
      background: ${bg};
      font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      color: ${text};
      padding: 24px;
      border-radius: 16px;
      margin-bottom: 32px;
    }
    .es-sn .client-bar {
      border-radius: 10px; border: 1px solid ${border};
      background: ${card}; padding: 10px 16px;
      display: flex; align-items: center; gap: 12px;
    }
    .es-sn .client-label { font-size: 13px; font-weight: 600; color: ${textBrt}; }
    .es-sn .client-sub { font-size: 10px; color: ${textSec}; margin-top: 2px; }
    .es-sn .center-col {
      max-width: 520px; margin: 0 auto;
    }
    .es-sn .v-arrow {
      display: flex; align-items: center; justify-content: center;
      gap: 6px; height: 26px;
    }
    .es-sn .v-line {
      width: 2px; height: 16px; position: relative;
      background: linear-gradient(to bottom, #7c3aed88, #a371f7);
    }
    .es-sn .v-line::after {
      content: ''; position: absolute; bottom: 0; left: 50%;
      transform: translateX(-50%);
      border-left: 5px solid transparent; border-right: 5px solid transparent;
      border-top: 7px solid #a371f7;
    }
    .es-sn .v-arrow-label { font-size: 9px; color: ${textDim}; letter-spacing: 0.8px; }
    .es-sn .svc-card {
      border-radius: 8px; border: 1px solid #7c3aed;
      background: ${dark ? '#0e0a1e' : '#f5f0ff'};
      padding: 8px 14px;
    }
    .es-sn .svc-name { font-size: 11px; font-weight: 700; color: #a371f7; margin-bottom: 2px; }
    .es-sn .svc-sub  { font-size: 10px; color: ${textSec}; }
    .es-sn .pod-panel {
      border-radius: 12px; border: 1px solid #7c3aed;
      background: ${dark ? '#0e0a1e' : '#f5f0ff'};
      overflow: hidden;
    }
    .es-sn .pod-hdr {
      padding: 9px 14px; display: flex; align-items: center; justify-content: space-between;
      background: ${dark ? 'linear-gradient(135deg,#1a0a38,#2a1060)' : 'linear-gradient(135deg,#ede9fe,#f5f0ff)'};
      border-bottom: 1px solid #7c3aed44;
    }
    .es-sn .pod-name { font-size: 12px; font-weight: 700; color: ${textBrt}; }
    .es-sn .pod-badge {
      font-size: 9px; font-weight: 700; letter-spacing: 0.8px; padding: 2px 8px;
      border-radius: 10px; background: ${dark ? '#1e0a45' : '#ede9fe'};
      color: #a371f7; border: 1px solid #7c3aed; text-transform: uppercase;
    }
    .es-sn .roles-strip {
      padding: 6px 14px 4px; display: flex; gap: 6px; flex-wrap: wrap;
    }
    .es-sn .role-tag {
      font-size: 9px; font-weight: 700; letter-spacing: 0.8px; text-transform: uppercase;
      padding: 2px 7px; border-radius: 4px; background: ${dark ? '#1e0a45' : '#ede9fe'};
      color: #a371f7; border: 1px solid #7c3aed44;
    }
    .es-sn .ctr-list { padding: 8px; display: flex; flex-direction: column; gap: 4px; }
    .es-sn .ctr-row {
      display: flex; align-items: center; gap: 7px; padding: 5px 8px;
      border-radius: 6px; border: 1px solid ${borderIn}; background: ${innerBg};
      font-size: 10px;
    }
    .es-sn .ctr-main { border-color: #7c3aed33; background: ${dark ? '#100820' : '#f9f5ff'}; }
    .es-sn .ctr-name { font-weight: 600; color: ${text}; }
    .es-sn .ctr-port { color: ${textSec}; margin-left: auto; white-space: nowrap; }
    .es-sn .pvc-strip {
      margin: 0 8px 8px; padding: 5px 9px; border-radius: 5px;
      border: 1px dashed ${border}; font-size: 9px; color: ${textSec};
      display: flex; align-items: center; gap: 5px;
    }
    .es-sn .note-bar {
      margin-top: 12px; padding: 7px 12px; border-radius: 8px;
      border: 1px solid ${dark ? '#7c3aed44' : '#7c3aed33'};
      background: ${dark ? '#0a0616' : '#faf8ff'};
      font-size: 10px; color: ${textSec}; text-align: center;
    }
    .es-sn .legend {
      display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;
      padding-top: 10px; border-top: 1px solid ${borderIn}; margin-top: 14px;
    }
    .es-sn .legend-item { display: flex; align-items: center; gap: 5px; font-size: 10px; color: ${textSec}; }
    .es-sn .legend-dot  { width: 8px; height: 8px; border-radius: 50%; }
  `.replace(/\s+/g, ' ');
}

export default function ElasticsearchSingleNodeDiagram() {
  const theme = useTheme();
  const dark = theme.palette.mode === 'dark';

  return (
    <>
      <style>{getStyles(dark)}</style>
      <div className="es-sn">

        <div className="center-col">

        {/* Client */}
        <div className="client-bar">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#a371f7" strokeWidth="1.5">
            <rect x="2" y="3" width="20" height="14" rx="2"/>
            <path d="M8 21h8M12 17v4"/>
          </svg>
          <div>
            <div className="client-label">Application / Client</div>
            <div className="client-sub">
              REST <code style={{color:'#a371f7'}}>es-cluster-mdit-http:9200</code>
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
            <div className="svc-sub">ClusterIP · :9200 · all pods</div>
          </div>

          {/* Arrow */}
          <div className="v-arrow">
            <div className="v-line"></div>
            <span className="v-arrow-label">single pod</span>
          </div>

          {/* Pod */}
          <div className="pod-panel">
            <div className="pod-hdr">
              <span className="pod-name">mdit-0</span>
              <span className="pod-badge">All Roles</span>
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
                <span className="ctr-port" style={{color:'#a371f7'}}>:9200 · :9300</span>
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
            <div className="pvc-strip">💾 PVC data · 20Gi</div>
          </div>

          <div className="note-bar">
            No HA — single pod failure means cluster unavailable · recommended for development only
          </div>

        </div>

        {/* Legend */}
        <div className="legend">
          <div className="legend-item"><span className="legend-dot" style={{background:'#a371f7'}}></span>All-Roles Node</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#3fb950'}}></span>Client Traffic</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#e3b341'}}></span>Persistent Storage</div>
        </div>

      </div>
    </>
  );
}
