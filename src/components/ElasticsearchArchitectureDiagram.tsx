'use client';

import { useTheme } from '@mui/material';
import React from 'react';

function getStyles(dark: boolean) {
  const bg        = dark ? '#0d1117' : '#f6f8fa';
  const card      = dark ? '#161b22' : '#ffffff';
  const border    = dark ? '#30363d' : '#d0d7de';
  const borderIn  = dark ? '#21262d' : '#e0e5eb';
  const text      = dark ? '#e6edf3' : '#1f2328';
  const textBrt   = dark ? '#f0f6fc' : '#1f2328';
  const textSec   = dark ? '#7d8590' : '#656d76';
  const textDim   = dark ? '#484f58' : '#8c959f';
  const innerBg   = dark ? '#0d1117' : '#f6f8fa';

  return `
    .es-arch * { box-sizing: border-box; }
    .es-arch {
      background: ${bg};
      font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      color: ${text};
      padding: 24px;
      border-radius: 16px;
      margin-bottom: 32px;
    }

    /* Client */
    .es-arch .client-bar {
      border-radius: 10px; border: 1px solid ${border};
      background: ${card}; padding: 10px 16px;
      display: flex; align-items: center; gap: 14px; margin-bottom: 4px;
    }
    .es-arch .client-label { font-size: 13px; font-weight: 600; color: ${textBrt}; }
    .es-arch .client-sub { font-size: 10px; color: ${textSec}; margin-top: 2px; }

    /* Services row */
    .es-arch .svc-row {
      display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
      margin: 4px 0;
    }
    .es-arch .svc-card {
      border-radius: 8px; border: 1px solid; padding: 8px 12px;
    }
    .es-arch .svc-green { border-color: #238636; background: ${dark ? '#0a1a0a' : '#f0fdf4'}; }
    .es-arch .svc-blue  { border-color: ${dark ? '#1f6feb' : '#388bfd'}; background: ${dark ? '#080d18' : '#eef4ff'}; }
    .es-arch .svc-gray  { border-color: ${border}; background: ${innerBg}; }
    .es-arch .svc-name  { font-size: 11px; font-weight: 700; margin-bottom: 3px; }
    .es-arch .svc-green .svc-name { color: #3fb950; }
    .es-arch .svc-blue  .svc-name { color: ${dark ? '#79c0ff' : '#0969da'}; }
    .es-arch .svc-gray  .svc-name { color: ${textSec}; }
    .es-arch .svc-sub   { font-size: 10px; color: ${textSec}; line-height: 1.6; }

    /* Connector arrows */
    .es-arch .v-arrow {
      display: flex; align-items: center; justify-content: flex-start;
      gap: 6px; height: 28px; padding-left: 20px;
    }
    .es-arch .v-line {
      width: 2px; height: 18px; position: relative;
    }
    .es-arch .v-line-g { background: linear-gradient(to bottom, #23863688, #3fb950); }
    .es-arch .v-line-g::after {
      content: ''; position: absolute; bottom: 0; left: 50%;
      transform: translateX(-50%);
      border-left: 5px solid transparent; border-right: 5px solid transparent;
      border-top: 7px solid #3fb950;
    }
    .es-arch .v-arrow-label { font-size: 9px; color: ${textDim}; letter-spacing: 0.8px; }

    /* Two-column component layout */
    .es-arch .component-row {
      display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 4px;
    }
    @media (max-width: 600px) { .es-arch .component-row { grid-template-columns: 1fr; } }

    /* Component panels */
    .es-arch .comp-panel {
      border-radius: 12px; border: 1px solid; padding: 14px;
    }
    .es-arch .comp-master { border-color: #7c3aed; background: ${dark ? '#0e0a1e' : '#f5f0ff'}; }
    .es-arch .comp-dit    { border-color: ${dark ? '#1f6feb' : '#388bfd'}; background: ${dark ? '#080d18' : '#eef4ff'}; }

    .es-arch .comp-title {
      font-size: 10px; font-weight: 700; letter-spacing: 1.5px;
      text-transform: uppercase; margin-bottom: 10px;
      display: flex; align-items: center; gap: 6px;
    }
    .es-arch .comp-master .comp-title { color: #a371f7; }
    .es-arch .comp-dit    .comp-title { color: ${dark ? '#79c0ff' : '#0969da'}; }

    /* Pod cards inside components */
    .es-arch .pod-list { display: flex; flex-direction: column; gap: 6px; }
    .es-arch .pod-card {
      border-radius: 8px; border: 1px solid ${borderIn}; background: ${card}; overflow: hidden;
    }
    .es-arch .pod-hdr {
      padding: 6px 10px; display: flex; align-items: center; justify-content: space-between;
      border-bottom: 1px solid ${borderIn};
    }
    .es-arch .pod-master .pod-hdr { background: ${dark ? 'linear-gradient(135deg,#1a0a38,#2a1060)' : 'linear-gradient(135deg,#ede9fe,#f5f0ff)'}; border-bottom-color: #7c3aed55; }
    .es-arch .pod-dit    .pod-hdr { background: ${dark ? 'linear-gradient(135deg,#0d1f38,#162840)' : 'linear-gradient(135deg,#e8f0fe,#dce8fc)'}; border-bottom-color: ${dark ? '#1f6feb55' : '#388bfd55'}; }
    .es-arch .pod-name { font-size: 11px; font-weight: 700; color: ${textBrt}; }
    .es-arch .pod-badge {
      font-size: 9px; font-weight: 700; letter-spacing: 0.8px; padding: 2px 7px;
      border-radius: 10px; text-transform: uppercase;
    }
    .es-arch .badge-m { background: ${dark ? '#1e0a45' : '#ede9fe'}; color: #a371f7; border: 1px solid #7c3aed; }
    .es-arch .badge-d { background: ${dark ? '#0d2035' : '#e8f0fe'}; color: ${dark ? '#79c0ff' : '#1f6feb'}; border: 1px solid ${dark ? '#1f6feb' : '#388bfd'}; }

    .es-arch .ctr-list { padding: 6px; display: flex; flex-direction: column; gap: 3px; }
    .es-arch .ctr-row {
      display: flex; align-items: center; gap: 6px; padding: 4px 7px;
      border-radius: 5px; border: 1px solid ${borderIn}; background: ${innerBg};
      font-size: 10px;
    }
    .es-arch .ctr-row-m { border-color: #7c3aed33; background: ${dark ? '#0e0a1e' : '#f5f0ff'}; }
    .es-arch .ctr-row-d { border-color: ${dark ? '#1f6feb33' : '#388bfd44'}; background: ${dark ? '#080d18' : '#eef4ff'}; }
    .es-arch .ctr-name { font-weight: 600; color: ${text}; }
    .es-arch .ctr-port { color: ${textSec}; margin-left: auto; white-space: nowrap; }

    .es-arch .pvc-strip {
      margin: 0 6px 6px; padding: 4px 8px; border-radius: 5px;
      border: 1px dashed ${border}; font-size: 9px; color: ${textSec};
      display: flex; align-items: center; gap: 5px;
    }

    .es-arch .ellipsis-pod {
      border-radius: 8px; border: 1px dashed ${border};
      padding: 6px 10px; text-align: center;
      font-size: 10px; color: ${textDim};
    }

    /* Transport bridge */
    .es-arch .transport-bar {
      margin-top: 12px; padding: 6px 10px; border-radius: 7px;
      border: 1px solid ${dark ? '#56d4dd44' : '#56d4dd77'};
      background: ${dark ? '#0a1a1e' : '#f0fcfe'};
      display: flex; align-items: center; justify-content: center;
      gap: 8px; font-size: 10px; color: ${dark ? '#56d4dd' : '#0e7490'};
    }

    /* Legend */
    .es-arch .legend {
      display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;
      padding-top: 10px; border-top: 1px solid ${borderIn}; margin-top: 16px;
    }
    .es-arch .legend-item { display: flex; align-items: center; gap: 5px; font-size: 10px; color: ${textSec}; }
    .es-arch .legend-dot { width: 8px; height: 8px; border-radius: 50%; }
  `.replace(/\s+/g, ' ');
}

export default function ElasticsearchArchitectureDiagram() {
  const theme = useTheme();
  const dark = theme.palette.mode === 'dark';
  const dimColor = dark ? '#484f58' : '#8c959f';

  return (
    <>
      <style>{getStyles(dark)}</style>

      <div className="es-arch">

        {/* Client */}
        <div className="client-bar">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#79c0ff" strokeWidth="1.5">
            <rect x="2" y="3" width="20" height="14" rx="2"/>
            <path d="M8 21h8M12 17v4"/>
          </svg>
          <div>
            <div className="client-label">Application / Client</div>
            <div className="client-sub">
              REST <code style={{color:'#3fb950'}}>es-cluster-dit-http:9200</code>
              <span style={{color: dimColor}}> · DIT component handles all client traffic</span>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="v-arrow">
          <div className="v-line v-line-g"></div>
          <span className="v-arrow-label">REST :9200</span>
        </div>

        {/* Services */}
        <div className="svc-row">
          <div className="svc-card svc-green">
            <div className="svc-name">es-cluster-dit-http</div>
            <div className="svc-sub">ClusterIP · :9200 REST API<br/>Client traffic → DIT pods</div>
          </div>
          <div className="svc-card svc-gray">
            <div className="svc-name">*-headless (both components)</div>
            <div className="svc-sub">Headless · :9200 / :9300<br/>Inter-node transport + operator probes</div>
          </div>
        </div>

        {/* Arrow */}
        <div className="v-arrow">
          <div className="v-line v-line-g"></div>
          <span className="v-arrow-label">to DIT pods</span>
        </div>

        {/* Two-column: master + dit */}
        <div className="component-row">

          {/* Master component */}
          <div className="comp-panel comp-master">
            <div className="comp-title">
              <span style={{width:8, height:8, borderRadius:'50%', background:'#a371f7', display:'inline-block'}}></span>
              Master Component
            </div>
            <div className="pod-list">
              {['master-0 (elected)', 'master-1', 'master-2'].map((name, i) => (
                <div key={name} className="pod-card pod-master">
                  <div className="pod-hdr">
                    <span className="pod-name">{name}</span>
                    <span className="pod-badge badge-m">{i === 0 ? 'ELECTED' : 'MASTER-ELIG'}</span>
                  </div>
                  <div className="ctr-list">
                    <div className="ctr-row ctr-row-m">
                      <span>🧠</span>
                      <span className="ctr-name">elasticsearch</span>
                      <span className="ctr-port" style={{color:'#a371f7'}}>role: master</span>
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
                  <div className="pvc-strip">💾 PVC data · 10Gi</div>
                </div>
              ))}
            </div>
            <div className="transport-bar" style={{marginTop:10}}>
              <span>🗳️</span>
              <strong>Quorum election</strong>
              <span style={{color: dimColor}}>· tolerates 1 failure</span>
            </div>
          </div>

          {/* DIT component */}
          <div className="comp-panel comp-dit">
            <div className="comp-title">
              <span style={{width:8, height:8, borderRadius:'50%', background: dark ? '#79c0ff' : '#1f6feb', display:'inline-block'}}></span>
              DIT Component (data + ingest + transform)
            </div>
            <div className="pod-list">
              {['dit-0', 'dit-1'].map((name) => (
                <div key={name} className="pod-card pod-dit">
                  <div className="pod-hdr">
                    <span className="pod-name">{name}</span>
                    <span className="pod-badge badge-d">DATA</span>
                  </div>
                  <div className="ctr-list">
                    <div className="ctr-row ctr-row-d">
                      <span>🔍</span>
                      <span className="ctr-name">elasticsearch</span>
                      <span className="ctr-port" style={{color: dark ? '#79c0ff' : '#1f6feb'}}>data·ingest·transform</span>
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
              <div className="ellipsis-pod">+ scale-out via HorizontalScaling OpsRequest</div>
            </div>
            <div className="transport-bar" style={{marginTop:10}}>
              <span>↔</span>
              <strong>Shard replication</strong>
              <span style={{color: dimColor}}>· primaries + replicas distributed across dit pods</span>
            </div>
          </div>

        </div>

        {/* Transport bridge */}
        <div className="transport-bar" style={{marginTop: 16}}>
          <span>🔗</span>
          <strong>Transport :9300</strong>
          <span style={{color: dimColor}}>— master ↔ DIT inter-node communication (cluster state, shard allocation, replication)</span>
        </div>

        {/* Legend */}
        <div className="legend">
          <div className="legend-item"><span className="legend-dot" style={{background:'#a371f7'}}></span>Master — cluster state &amp; election</div>
          <div className="legend-item"><span className="legend-dot" style={{background: dark ? '#79c0ff' : '#1f6feb'}}></span>DIT — data, ingest, transform</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#3fb950'}}></span>Client REST traffic</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#56d4dd'}}></span>Inter-node transport</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#e3b341'}}></span>Persistent storage</div>
        </div>

      </div>
    </>
  );
}
