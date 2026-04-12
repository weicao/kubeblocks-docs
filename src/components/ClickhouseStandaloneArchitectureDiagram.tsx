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
  const podBg    = dark ? '#161b22' : '#ffffff';
  const podHeader = dark ? 'linear-gradient(135deg,#0d1f38,#162840)' : 'linear-gradient(135deg,#eef4ff,#dbeafe)';
  const podHeaderBorder = dark ? '#1f6feb' : '#93c5fd';
  const svcBg    = dark ? '#0a0f1e' : '#eef4ff';
  const pvcBg    = dark ? '#0d1117' : '#fafafa';
  const infoBar  = dark ? '#0a0f1e' : '#eef4ff';
  const infoBorder = dark ? '#1f6feb' : '#93c5fd';
  const infoColor  = dark ? '#79c0ff' : '#0969da';

  return `
    .ch-sa-diagram * { box-sizing: border-box; }
    .ch-sa-diagram {
      background: ${bg};
      font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      color: ${text};
      padding: 28px;
      border-radius: 16px;
      margin-bottom: 32px;
    }
    .ch-sa-diagram .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
    .ch-sa-diagram .dot-blue   { background: #388bfd; }
    .ch-sa-diagram .card-title {
      font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
      text-transform: uppercase; margin-bottom: 10px;
      display: flex; align-items: center; gap: 6px;
    }
    .ch-sa-diagram .main-area {
      display: flex; gap: 16px; align-items: flex-start;
    }
    .ch-sa-diagram .data-plane {
      flex: 1; display: flex; flex-direction: column; gap: 0;
    }
    .ch-sa-diagram .client-mini {
      border-radius: 12px; border: 1px solid ${border};
      background: ${card}; padding: 12px 16px;
      display: flex; align-items: center; gap: 14px;
    }
    .ch-sa-diagram .client-label { font-size: 13px; font-weight: 600; color: ${textBrt}; }
    .ch-sa-diagram .client-routes { font-size: 10px; color: ${textSec}; margin-top: 3px; line-height: 1.8; }
    .ch-sa-diagram .v-arrow {
      display: flex; align-items: center; justify-content: center; gap: 8px;
      height: 36px;
    }
    .ch-sa-diagram .v-arrow-line { display: flex; flex-direction: column; align-items: center; }
    .ch-sa-diagram .v-line { width: 2px; height: 20px; position: relative; }
    .ch-sa-diagram .v-line-blue { background: linear-gradient(to bottom, ${dark ? '#1f6feb88' : '#93c5fd88'}, ${dark ? '#79c0ff' : '#0969da'}); }
    .ch-sa-diagram .v-line-blue::after {
      content: ''; position: absolute; bottom: 0; left: 50%;
      transform: translateX(-50%);
      border-left: 5px solid transparent; border-right: 5px solid transparent;
      border-top: 7px solid ${dark ? '#79c0ff' : '#0969da'};
    }
    .ch-sa-diagram .v-arrow-label { font-size: 9px; color: ${textDim}; letter-spacing: 1px; white-space: nowrap; }
    .ch-sa-diagram .services-block {
      border-radius: 12px; border: 1px solid ${infoBorder};
      background: ${infoBar}; padding: 14px 16px;
    }
    .ch-sa-diagram .svc-card { border-radius: 8px; border: 1px solid ${infoBorder}; padding: 10px 12px; background: ${infoBar}; }
    .ch-sa-diagram .svc-name { font-size: 12px; font-weight: 700; margin-bottom: 4px; color: ${infoColor}; }
    .ch-sa-diagram .svc-detail { font-size: 10px; color: ${textSec}; line-height: 1.6; }
    .ch-sa-diagram .svc-tag {
      display: inline-block; font-size: 9px; font-weight: 700;
      letter-spacing: 1px; padding: 2px 6px; border-radius: 4px;
      text-transform: uppercase; margin-top: 4px;
      background: ${svcBg}; color: ${infoColor};
    }
    .ch-sa-diagram .section-label {
      font-size: 10px; font-weight: 700; letter-spacing: 2px;
      text-transform: uppercase; color: ${textSec}; margin-bottom: 8px;
    }
    .ch-sa-diagram .pods-section {
      border-radius: 12px; border: 1px solid ${border};
      background: ${innerBg}; padding: 16px;
    }
    .ch-sa-diagram .pod-card { border-radius: 10px; border: 1px solid ${border}; background: ${podBg}; overflow: hidden; }
    .ch-sa-diagram .pod-header {
      padding: 9px 12px; display: flex; align-items: center; justify-content: space-between;
      border-bottom: 1px solid ${borderIn};
      background: ${podHeader}; border-bottom-color: ${podHeaderBorder};
    }
    .ch-sa-diagram .pod-name { font-size: 11px; font-weight: 700; color: ${textBrt}; }
    .ch-sa-diagram .pod-badge {
      font-size: 9px; font-weight: 700; letter-spacing: 1px;
      text-transform: uppercase; padding: 2px 7px; border-radius: 10px;
      background: ${svcBg}; color: ${infoColor}; border: 1px solid ${infoBorder};
    }
    .ch-sa-diagram .containers { padding: 8px; display: flex; flex-direction: column; gap: 4px; }
    .ch-sa-diagram .container-row {
      display: flex; align-items: center; gap: 7px; padding: 5px 8px;
      border-radius: 6px; border: 1px solid ${borderIn}; background: ${innerBg};
    }
    .ch-sa-diagram .container-icon { font-size: 13px; }
    .ch-sa-diagram .container-info { flex: 1; }
    .ch-sa-diagram .container-name { font-size: 11px; font-weight: 600; color: ${text}; }
    .ch-sa-diagram .container-port { font-size: 10px; color: ${textSec}; }
    .ch-sa-diagram .pvc-row {
      margin: 0 8px 8px; padding: 5px 8px; border-radius: 6px;
      border: 1px dashed ${border}; background: ${pvcBg};
      display: flex; align-items: center; gap: 6px; font-size: 10px; color: ${textSec};
    }
    .ch-sa-diagram .info-bar {
      display: flex; align-items: center; justify-content: center; gap: 8px;
      padding: 7px; border-radius: 8px; background: ${infoBar};
      border: 1px solid ${infoBorder}; margin-top: 10px; font-size: 11px; color: ${infoColor};
    }
    .ch-sa-diagram .legend {
      display: flex; gap: 18px; flex-wrap: wrap; justify-content: center;
      padding-top: 8px; border-top: 1px solid ${borderIn}; margin-top: 16px;
    }
    .ch-sa-diagram .legend-item { display: flex; align-items: center; gap: 5px; font-size: 10px; color: ${textSec}; }
    .ch-sa-diagram .legend-dot { width: 8px; height: 8px; border-radius: 50%; }
    .ch-sa-diagram .shards-row {
      display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 10px;
    }
    .ch-sa-diagram .shard-box {
      border-radius: 10px; border: 1px solid ${border}; background: ${innerBg}; padding: 12px;
    }
    .ch-sa-diagram .shard-label {
      font-size: 10px; font-weight: 700; letter-spacing: 1.5px;
      text-transform: uppercase; color: ${textSec}; margin-bottom: 8px;
    }
    .ch-sa-diagram .headless-note {
      margin-top: 8px; padding: 5px 10px; border-radius: 6px;
      border: 1px dashed ${border}; font-size: 10px; color: ${textDim};
      display: flex; align-items: center; gap: 6px;
    }
  `;
}

export default function ClickhouseStandaloneArchitectureDiagram() {
  const theme = useTheme();
  const dark = theme.palette.mode === 'dark';
  const infoColor = dark ? '#79c0ff' : '#0969da';
  const textDim   = dark ? '#484f58' : '#8c959f';
  const textSec   = dark ? '#7d8590' : '#656d76';

  return (
    <>
      <style>{getStyles(dark)}</style>

      <div className="ch-sa-diagram">
        <div className="main-area">
          <div className="data-plane">

            {/* Client */}
            <div className="client-mini">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={infoColor} strokeWidth="1.5">
                <rect x="2" y="3" width="20" height="14" rx="2"/>
                <path d="M8 21h8M12 17v4"/>
              </svg>
              <div>
                <div className="client-label">Application / Client</div>
                <div className="client-routes">
                  HTTP&nbsp; <code style={{color: infoColor}}>{'{cluster}'}-{'{shardComponentName}'}:8123</code><br/>
                  Native&nbsp; <code style={{color: infoColor}}>{'{cluster}'}-{'{shardComponentName}'}:9000</code>
                </div>
              </div>
            </div>

            {/* Arrow: Client → Service */}
            <div className="v-arrow">
              <div className="v-arrow-line">
                <div className="v-line v-line-blue"></div>
              </div>
              <span className="v-arrow-label" style={{color: `${infoColor}88`}}>HTTP / native TCP</span>
            </div>

            {/* Services */}
            <div className="services-block">
              <div className="card-title" style={{color: infoColor}}>
                <span className="dot dot-blue"></span>
                Kubernetes Services (one per shard)
              </div>
              <div className="svc-card">
                <div className="svc-name">{'{cluster}'}-clickhouse-XXX</div>
                <div className="svc-detail">
                  ClusterIP · :8123 HTTP · :9000 native TCP · :8001 metrics<br/>
                  Selects all replicas within the shard (no roleSelector)
                </div>
                <span className="svc-tag">All Replicas</span>
              </div>
            </div>

            {/* Arrow: Service → Shards */}
            <div className="v-arrow">
              <div className="v-arrow-line">
                <div className="v-line v-line-blue"></div>
              </div>
              <span className="v-arrow-label" style={{color: `${infoColor}88`}}>→ all replicas (load balanced)</span>
            </div>

            {/* Shards */}
            <div className="pods-section">
              <div className="section-label">Independent Shards (standalone topology)</div>
              <div className="shards-row">

                {/* Shard 0 */}
                <div className="shard-box">
                  <div className="shard-label">Shard 0</div>
                  <div className="pod-card">
                    <div className="pod-header">
                      <span className="pod-name">clickhouse-abc-0</span>
                      <span className="pod-badge">POD</span>
                    </div>
                    <div className="containers">
                      <div className="container-row">
                        <span className="container-icon">🖱️</span>
                        <div className="container-info">
                          <div className="container-name">clickhouse</div>
                          <div className="container-port">:8123 · :9000 · :9004 MySQL · :9005 PG · :8001</div>
                        </div>
                      </div>
                    </div>
                    <div className="pvc-row">💾 PVC <strong style={{color:'#e3b341'}}>data</strong> · 10Gi</div>
                  </div>
                </div>

                {/* Shard 1 (optional) */}
                <div className="shard-box" style={{opacity: 0.6}}>
                  <div className="shard-label">Shard 1 (optional)</div>
                  <div className="pod-card">
                    <div className="pod-header">
                      <span className="pod-name">clickhouse-xyz-0</span>
                      <span className="pod-badge">POD</span>
                    </div>
                    <div className="containers">
                      <div className="container-row">
                        <span className="container-icon">🖱️</span>
                        <div className="container-info">
                          <div className="container-name">clickhouse</div>
                          <div className="container-port">:8123 · :9000 · :9004 MySQL · :9005 PG · :8001</div>
                        </div>
                      </div>
                    </div>
                    <div className="pvc-row">💾 PVC <strong style={{color:'#e3b341'}}>data</strong> · 10Gi</div>
                  </div>
                </div>

              </div>

              <div className="info-bar">
                <span>ℹ</span>
                <span>Each shard is independent — no replication between shards. Use <strong>MergeTree</strong> (not ReplicatedMergeTree).</span>
              </div>
              <div className="headless-note">
                <span>🔗</span>
                <span><strong style={{color: textSec}}>Headless service</strong> per shard — stable pod DNS for operator probes; not a client endpoint</span>
              </div>
            </div>

          </div>
        </div>

        {/* Legend */}
        <div className="legend">
          <div className="legend-item"><span className="legend-dot" style={{background: infoColor}}></span>Client Traffic</div>
          <div className="legend-item"><span className="legend-dot" style={{background: dark ? '#388bfd' : '#0969da'}}></span>Independent Shard Pod</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#e3b341'}}></span>Persistent Storage</div>
          <div className="legend-item"><span className="legend-dot" style={{background: textDim}}></span>Optional / additional shard</div>
        </div>

      </div>
    </>
  );
}
