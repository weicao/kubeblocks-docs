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
    .es-fs * { box-sizing: border-box; }
    .es-fs {
      background: ${bg};
      font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      color: ${text};
      padding: 24px;
      border-radius: 16px;
      margin-bottom: 32px;
    }
    .es-fs .client-bar {
      border-radius: 10px; border: 1px solid ${border};
      background: ${card}; padding: 10px 16px;
      display: flex; align-items: center; gap: 12px;
    }
    .es-fs .client-label { font-size: 13px; font-weight: 600; color: ${textBrt}; }
    .es-fs .client-sub { font-size: 10px; color: ${textSec}; margin-top: 2px; }
    .es-fs .traffic-row {
      display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 8px 0 4px;
    }
    .es-fs .svc-card {
      border-radius: 8px; border: 1px solid; padding: 7px 12px;
    }
    .es-fs .svc-green { border-color: #238636; background: ${dark ? '#0a1a0a' : '#f0fdf4'}; }
    .es-fs .svc-teal  { border-color: #0e9488; background: ${dark ? '#041414' : '#f0fdfa'}; }
    .es-fs .svc-name  { font-size: 11px; font-weight: 700; margin-bottom: 2px; }
    .es-fs .svc-green .svc-name { color: #3fb950; }
    .es-fs .svc-teal  .svc-name { color: ${dark ? '#2dd4bf' : '#0d9488'}; }
    .es-fs .svc-sub   { font-size: 10px; color: ${textSec}; }
    .es-fs .arr-row {
      display: flex; gap: 10px; margin-bottom: 4px;
    }
    .es-fs .arr-col {
      flex: 1; display: flex; align-items: center; gap: 6px;
      padding-left: 16px; height: 22px;
    }
    .es-fs .v-line-g {
      width: 2px; height: 14px; position: relative;
      background: linear-gradient(to bottom, #23863688, #3fb950);
    }
    .es-fs .v-line-g::after {
      content: ''; position: absolute; bottom: 0; left: 50%;
      transform: translateX(-50%);
      border-left: 4px solid transparent; border-right: 4px solid transparent;
      border-top: 6px solid #3fb950;
    }
    .es-fs .v-line-t {
      width: 2px; height: 14px; position: relative;
      background: linear-gradient(to bottom, #0e948888, #0d9488);
    }
    .es-fs .v-line-t::after {
      content: ''; position: absolute; bottom: 0; left: 50%;
      transform: translateX(-50%);
      border-left: 4px solid transparent; border-right: 4px solid transparent;
      border-top: 6px solid #0d9488;
    }
    .es-fs .arr-label { font-size: 9px; color: ${textDim}; letter-spacing: 0.7px; }
    .es-fs .comp-top {
      display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px;
    }
    .es-fs .comp-bottom {
      display: grid; grid-template-columns: 1fr 2fr; gap: 12px; margin-top: 12px;
    }
    @media (max-width: 640px) {
      .es-fs .comp-top    { grid-template-columns: 1fr; }
      .es-fs .comp-bottom { grid-template-columns: 1fr; }
    }
    .es-fs .comp-panel {
      border-radius: 10px; border: 1px solid; padding: 12px;
    }
    .es-fs .comp-purple { border-color: #7c3aed; background: ${dark ? '#0e0a1e' : '#f5f0ff'}; }
    .es-fs .comp-blue   { border-color: ${dark ? '#1f6feb' : '#388bfd'}; background: ${dark ? '#080d18' : '#eef4ff'}; }
    .es-fs .comp-green  { border-color: #238636; background: ${dark ? '#0a1a0a' : '#f0fdf4'}; }
    .es-fs .comp-orange { border-color: #D97706; background: ${dark ? '#1a0f00' : '#fffbf0'}; }
    .es-fs .comp-title {
      font-size: 10px; font-weight: 700; letter-spacing: 1.2px;
      text-transform: uppercase; margin-bottom: 8px;
      display: flex; align-items: center; gap: 5px;
    }
    .es-fs .comp-purple .comp-title { color: #a371f7; }
    .es-fs .comp-blue   .comp-title { color: ${dark ? '#79c0ff' : '#0969da'}; }
    .es-fs .comp-green  .comp-title { color: #3fb950; }
    .es-fs .comp-orange .comp-title { color: #D97706; }
    .es-fs .pod-list { display: flex; flex-direction: column; gap: 5px; }
    .es-fs .pod-card {
      border-radius: 7px; border: 1px solid ${borderIn}; background: ${card}; overflow: hidden;
    }
    .es-fs .pod-hdr {
      padding: 5px 9px; display: flex; align-items: center; justify-content: space-between;
      border-bottom: 1px solid ${borderIn};
    }
    .es-fs .hdr-purple { background: ${dark ? 'linear-gradient(135deg,#1a0a38,#250f50)' : 'linear-gradient(135deg,#ede9fe,#f5f0ff)'}; border-bottom-color: #7c3aed33; }
    .es-fs .hdr-blue   { background: ${dark ? 'linear-gradient(135deg,#0d1f38,#162840)' : 'linear-gradient(135deg,#e8f0fe,#dce8fc)'}; border-bottom-color: ${dark ? '#1f6feb33' : '#388bfd33'}; }
    .es-fs .hdr-green  { background: ${dark ? 'linear-gradient(135deg,#0d2510,#1a3820)' : 'linear-gradient(135deg,#e8faf0,#f0fdf4)'}; border-bottom-color: #23863633; }
    .es-fs .hdr-orange { background: ${dark ? 'linear-gradient(135deg,#1a0f00,#2a1a00)' : 'linear-gradient(135deg,#fffdf0,#fff8dc)'}; border-bottom-color: #D9770633; }
    .es-fs .pod-name  { font-size: 11px; font-weight: 700; color: ${textBrt}; }
    .es-fs .pod-badge {
      font-size: 9px; font-weight: 700; padding: 2px 6px; border-radius: 8px;
      text-transform: uppercase; letter-spacing: 0.7px;
    }
    .es-fs .badge-purple { background: ${dark ? '#1e0a45' : '#ede9fe'}; color: #a371f7; border: 1px solid #7c3aed; }
    .es-fs .badge-blue   { background: ${dark ? '#0d2035' : '#e8f0fe'}; color: ${dark ? '#79c0ff' : '#0969da'}; border: 1px solid ${dark ? '#1f6feb' : '#388bfd'}; }
    .es-fs .badge-green  { background: ${dark ? '#1a4a1a' : '#dafbe1'}; color: #3fb950; border: 1px solid #238636; }
    .es-fs .badge-orange { background: ${dark ? '#2a1a00' : '#fef3c7'}; color: #D97706; border: 1px solid #D97706; }
    .es-fs .ctr-list { padding: 5px; display: flex; flex-direction: column; gap: 3px; }
    .es-fs .ctr-row {
      display: flex; align-items: center; gap: 5px; padding: 3px 7px;
      border-radius: 5px; border: 1px solid ${borderIn}; background: ${innerBg};
      font-size: 10px;
    }
    .es-fs .ctr-name { font-weight: 600; color: ${text}; flex: 1; }
    .es-fs .ctr-port { color: ${textSec}; white-space: nowrap; font-size: 9px; }
    .es-fs .pvc-strip {
      margin: 0 5px 5px; padding: 3px 8px; border-radius: 4px;
      border: 1px dashed ${border}; font-size: 9px; color: ${textSec};
      display: flex; align-items: center; gap: 4px;
    }
    .es-fs .pod-count {
      border-radius: 6px; border: 1px dashed ${border};
      padding: 4px 8px; text-align: center;
      font-size: 9px; color: ${textDim};
    }
    .es-fs .quorum-bar {
      margin-top: 8px; padding: 5px 8px; border-radius: 6px;
      border: 1px solid #7c3aed44; background: ${dark ? '#0a0616' : '#faf8ff'};
      font-size: 9px; color: #a371f7; text-align: center;
    }
    .es-fs .side-note {
      border-radius: 10px; border: 1px dashed ${border};
      padding: 12px 14px; font-size: 11px; color: ${textSec};
      display: flex; flex-direction: column; gap: 7px; justify-content: center;
    }
    .es-fs .transport-bar {
      margin-top: 14px; padding: 7px 12px; border-radius: 8px;
      border: 1px solid ${dark ? '#56d4dd33' : '#56d4dd77'};
      background: ${dark ? '#041418' : '#f0fffe'};
      display: flex; align-items: center; justify-content: center;
      gap: 8px; font-size: 10px; color: ${dark ? '#56d4dd' : '#0e7490'};
    }
    .es-fs .legend {
      display: flex; gap: 14px; flex-wrap: wrap; justify-content: center;
      padding-top: 10px; border-top: 1px solid ${borderIn}; margin-top: 14px;
    }
    .es-fs .legend-item { display: flex; align-items: center; gap: 5px; font-size: 10px; color: ${textSec}; }
    .es-fs .legend-dot  { width: 8px; height: 8px; border-radius: 50%; }
  `.replace(/\s+/g, ' ');
}

export default function ElasticsearchFullSeparationDiagram() {
  const theme = useTheme();
  const dark = theme.palette.mode === 'dark';
  const dimColor = dark ? '#484f58' : '#8c959f';

  return (
    <>
      <style>{getStyles(dark)}</style>
      <div className="es-fs">

        {/* Client */}
        <div className="client-bar">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#3fb950" strokeWidth="1.5">
            <rect x="2" y="3" width="20" height="14" rx="2"/>
            <path d="M8 21h8M12 17v4"/>
          </svg>
          <div>
            <div className="client-label">Application / Client</div>
            <div className="client-sub">
              Search → <code style={{color:'#3fb950'}}>es-cluster-d-http:9200</code>
              &nbsp;·&nbsp;Ingest → <code style={{color: dark ? '#2dd4bf' : '#0d9488'}}>es-cluster-i-http:9200</code>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="traffic-row">
          <div className="svc-card svc-green">
            <div className="svc-name">es-cluster-d-http</div>
            <div className="svc-sub">ClusterIP · :9200<br/>Search &amp; query → data nodes</div>
          </div>
          <div className="svc-card svc-teal">
            <div className="svc-name">es-cluster-i-http</div>
            <div className="svc-sub">ClusterIP · :9200<br/>Bulk pipelines → ingest nodes</div>
          </div>
        </div>

        {/* Arrows */}
        <div className="arr-row">
          <div className="arr-col">
            <div className="v-line-g"></div>
            <span className="arr-label">search :9200</span>
          </div>
          <div className="arr-col">
            <div className="v-line-t"></div>
            <span className="arr-label">ingest :9200</span>
          </div>
        </div>

        {/* Top row: master + data + ingest */}
        <div className="comp-top">

          {/* Master (m) */}
          <div className="comp-panel comp-purple">
            <div className="comp-title">
              <span style={{width:7, height:7, borderRadius:'50%', background:'#a371f7', display:'inline-block'}}></span>
              Master (m)
            </div>
            <div className="pod-list">
              {['m-0 (elected)', 'm-1', 'm-2'].map((name, i) => (
                <div key={name} className="pod-card">
                  <div className="pod-hdr hdr-purple">
                    <span className="pod-name">{name}</span>
                    <span className="pod-badge badge-purple">{i === 0 ? 'ELECTED' : 'ELIG'}</span>
                  </div>
                  <div className="ctr-list">
                    <div className="ctr-row" style={{borderColor: dark ? '#7c3aed22' : '#ede9fe'}}>
                      <span>🧠</span>
                      <span className="ctr-name">master only</span>
                      <span className="ctr-port">:9300</span>
                    </div>
                    <div className="ctr-row">
                      <span>⚙️</span>
                      <span className="ctr-name">es-agent</span>
                      <span className="ctr-port">:8080</span>
                    </div>
                  </div>
                  <div className="pvc-strip">💾 10Gi</div>
                </div>
              ))}
              <div className="quorum-bar">🗳️ Quorum · tolerates 1 failure</div>
            </div>
          </div>

          {/* Data (d) */}
          <div className="comp-panel comp-blue">
            <div className="comp-title">
              <span style={{width:7, height:7, borderRadius:'50%', background: dark ? '#79c0ff' : '#1f6feb', display:'inline-block'}}></span>
              Data (d)
            </div>
            <div className="pod-list">
              {['d-0', 'd-1'].map((name) => (
                <div key={name} className="pod-card">
                  <div className="pod-hdr hdr-blue">
                    <span className="pod-name">{name}</span>
                    <span className="pod-badge badge-blue">DATA</span>
                  </div>
                  <div className="ctr-list">
                    <div className="ctr-row" style={{borderColor: dark ? '#1f6feb22' : '#dce8fc'}}>
                      <span>🔍</span>
                      <span className="ctr-name">data role</span>
                      <span className="ctr-port">:9200/:9300</span>
                    </div>
                    <div className="ctr-row">
                      <span>⚙️</span><span className="ctr-name">es-agent</span><span className="ctr-port">:8080</span>
                    </div>
                    <div className="ctr-row">
                      <span>📊</span><span className="ctr-name">exporter</span><span className="ctr-port">:9114</span>
                    </div>
                  </div>
                  <div className="pvc-strip">💾 PVC · 100Gi+</div>
                </div>
              ))}
              <div className="pod-count">+ scale-out for search throughput</div>
            </div>
          </div>

          {/* Ingest (i) */}
          <div className="comp-panel comp-green">
            <div className="comp-title">
              <span style={{width:7, height:7, borderRadius:'50%', background:'#3fb950', display:'inline-block'}}></span>
              Ingest (i)
            </div>
            <div className="pod-list">
              {['i-0', 'i-1'].map((name) => (
                <div key={name} className="pod-card">
                  <div className="pod-hdr hdr-green">
                    <span className="pod-name">{name}</span>
                    <span className="pod-badge badge-green">INGEST</span>
                  </div>
                  <div className="ctr-list">
                    <div className="ctr-row" style={{borderColor: dark ? '#23863622' : '#dafbe1'}}>
                      <span>⚡</span>
                      <span className="ctr-name">ingest role</span>
                      <span className="ctr-port">:9200/:9300</span>
                    </div>
                    <div className="ctr-row">
                      <span>⚙️</span><span className="ctr-name">es-agent</span><span className="ctr-port">:8080</span>
                    </div>
                    <div className="ctr-row">
                      <span>📊</span><span className="ctr-name">exporter</span><span className="ctr-port">:9114</span>
                    </div>
                  </div>
                  <div className="pvc-strip">💾 PVC · 20Gi</div>
                </div>
              ))}
              <div className="pod-count">+ scale-out for pipeline throughput</div>
            </div>
          </div>

        </div>

        {/* Bottom row: transform + side note */}
        <div className="comp-bottom">

          <div className="comp-panel comp-orange">
            <div className="comp-title">
              <span style={{width:7, height:7, borderRadius:'50%', background:'#D97706', display:'inline-block'}}></span>
              Transform (t)
            </div>
            <div className="pod-list">
              <div className="pod-card">
                <div className="pod-hdr hdr-orange">
                  <span className="pod-name">t-0</span>
                  <span className="pod-badge badge-orange">TRANSFORM</span>
                </div>
                <div className="ctr-list">
                  <div className="ctr-row" style={{borderColor: dark ? '#D9770622' : '#fef3c7'}}>
                    <span>🔄</span>
                    <span className="ctr-name">transform role</span>
                    <span className="ctr-port">:9200/:9300</span>
                  </div>
                  <div className="ctr-row">
                    <span>⚙️</span><span className="ctr-name">es-agent</span><span className="ctr-port">:8080</span>
                  </div>
                </div>
                <div className="pvc-strip">💾 PVC · 20Gi</div>
              </div>
              <div className="pod-count">+ scale-out for transform jobs</div>
            </div>
          </div>

          <div className="side-note">
            <div style={{fontWeight:700, fontSize:12, color: dark ? '#e6edf3' : '#1f2328'}}>Independent scaling per component</div>
            <div>📦 <strong>Master</strong> — 3 fixed (quorum safety)</div>
            <div>🔍 <strong>Data</strong> — scale out for more search throughput &amp; storage</div>
            <div>⚡ <strong>Ingest</strong> — scale out for higher pipeline ingestion rate</div>
            <div>🔄 <strong>Transform</strong> — scale out for more concurrent transform jobs</div>
            <div style={{marginTop:4, paddingTop:8, borderTop:`1px solid ${dark ? '#21262d' : '#e0e5eb'}`, color: dimColor}}>
              Each component uses its own resource limits (CPU/memory) and PVC size
            </div>
          </div>

        </div>

        {/* Transport bar */}
        <div className="transport-bar">
          <span>🔗</span>
          <strong>Transport :9300</strong>
          <span style={{color: dimColor}}>— all components communicate via inter-node transport (cluster state, shard allocation, replication, transform coordination)</span>
        </div>

        {/* Legend */}
        <div className="legend">
          <div className="legend-item"><span className="legend-dot" style={{background:'#a371f7'}}></span>Master</div>
          <div className="legend-item"><span className="legend-dot" style={{background: dark ? '#79c0ff' : '#1f6feb'}}></span>Data</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#3fb950'}}></span>Ingest</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#D97706'}}></span>Transform</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#56d4dd'}}></span>Transport :9300</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#e3b341'}}></span>Persistent Storage</div>
        </div>

      </div>
    </>
  );
}
