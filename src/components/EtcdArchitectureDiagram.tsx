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

  return `
        .etcd-ha-diagram * { box-sizing: border-box; }
        .etcd-ha-diagram {
          background: ${bg};
          font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: ${text};
          padding: 28px;
          border-radius: 16px;
          margin-bottom: 32px;
        }
        .etcd-ha-diagram .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
        .etcd-ha-diagram .dot-teal   { background: #14b8a6; }
        .etcd-ha-diagram .dot-green  { background: #3fb950; }
        .etcd-ha-diagram .card-title {
          font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; margin-bottom: 10px;
          display: flex; align-items: center; gap: 6px;
        }
        .etcd-ha-diagram .main-area {
          display: flex; gap: 16px; align-items: flex-start;
        }
        .etcd-ha-diagram .data-plane {
          flex: 1; display: flex; flex-direction: column; gap: 0;
        }
        .etcd-ha-diagram .client-mini {
          border-radius: 12px; border: 1px solid ${border};
          background: ${card}; padding: 12px 16px;
          display: flex; align-items: center; gap: 14px;
        }
        .etcd-ha-diagram .client-label { font-size: 13px; font-weight: 600; color: ${textBrt}; }
        .etcd-ha-diagram .client-routes { font-size: 10px; color: ${textSec}; margin-top: 3px; line-height: 1.8; }
        .etcd-ha-diagram .v-arrow {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          height: 36px;
        }
        .etcd-ha-diagram .v-arrow-line { display: flex; flex-direction: column; align-items: center; }
        .etcd-ha-diagram .v-line { width: 2px; height: 20px; position: relative; }
        .etcd-ha-diagram .v-line-teal { background: linear-gradient(to bottom, #0d948888, #14b8a6); }
        .etcd-ha-diagram .v-line-teal::after {
          content: ''; position: absolute; bottom: 0; left: 50%;
          transform: translateX(-50%);
          border-left: 5px solid transparent; border-right: 5px solid transparent;
          border-top: 7px solid #14b8a6;
        }
        .etcd-ha-diagram .v-arrow-label { font-size: 9px; color: ${textDim}; letter-spacing: 1px; white-space: nowrap; }
        .etcd-ha-diagram .services-block {
          border-radius: 12px; border: 1px solid #0d9488;
          background: ${dark ? '#031c1a' : '#f0fdfa'}; padding: 14px 16px;
        }
        .etcd-ha-diagram .services-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 8px;
        }
        .etcd-ha-diagram .svc-card { border-radius: 8px; border: 1px solid; padding: 10px 12px; }
        .etcd-ha-diagram .svc-rw { border-color: #0d9488; background: ${dark ? '#031c1a' : '#f0fdfa'}; }
        .etcd-ha-diagram .svc-name { font-size: 12px; font-weight: 700; margin-bottom: 4px; }
        .etcd-ha-diagram .svc-rw .svc-name { color: #14b8a6; }
        .etcd-ha-diagram .svc-detail { font-size: 10px; color: ${textSec}; line-height: 1.6; }
        .etcd-ha-diagram .svc-tag {
          display: inline-block; font-size: 9px; font-weight: 700;
          letter-spacing: 1px; padding: 2px 6px; border-radius: 4px;
          text-transform: uppercase; margin-top: 4px;
        }
        .etcd-ha-diagram .tag-teal { background: ${dark ? '#0a2522' : '#ccfbf1'}; color: #0d9488; }
        .etcd-ha-diagram .section-label {
          font-size: 10px; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; color: ${textSec}; margin-bottom: 8px;
        }
        .etcd-ha-diagram .pods-section {
          border-radius: 12px; border: 1px solid ${border};
          background: ${bg}; padding: 16px;
        }
        .etcd-ha-diagram .pods-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 10px;
        }
        @media (max-width: 600px) {
          .etcd-ha-diagram .pods-grid { grid-template-columns: 1fr; }
        }
        .etcd-ha-diagram .pod-card { border-radius: 10px; border: 1px solid ${border}; background: ${card}; overflow: hidden; }
        .etcd-ha-diagram .pod-header {
          padding: 9px 12px; display: flex; align-items: center; justify-content: space-between;
          border-bottom: 1px solid ${borderIn};
        }
        .etcd-ha-diagram .pod-primary .pod-header { background: ${dark ? 'linear-gradient(135deg,#032726,#051a19)' : 'linear-gradient(135deg,#ccfbf1,#f0fdfa)'}; border-bottom-color: #0d9488; }
        .etcd-ha-diagram .pod-replica .pod-header  { background: ${dark ? 'linear-gradient(135deg,#0d1117,#161b22)' : 'linear-gradient(135deg,#f6f8fa,#ffffff)'}; }
        .etcd-ha-diagram .pod-name { font-size: 11px; font-weight: 700; color: ${textBrt}; }
        .etcd-ha-diagram .pod-badge {
          font-size: 9px; font-weight: 700; letter-spacing: 1px;
          text-transform: uppercase; padding: 2px 7px; border-radius: 10px;
        }
        .etcd-ha-diagram .badge-primary { background: ${dark ? '#0a2522' : '#ccfbf1'}; color: #14b8a6; border: 1px solid #0d9488; }
        .etcd-ha-diagram .badge-replica { background: ${dark ? '#21262d' : '#f6f8fa'}; color: ${textSec}; border: 1px solid ${border}; }
        .etcd-ha-diagram .containers { padding: 8px; display: flex; flex-direction: column; gap: 4px; }
        .etcd-ha-diagram .container-row {
          display: flex; align-items: center; gap: 7px; padding: 5px 8px;
          border-radius: 6px; border: 1px solid ${borderIn}; background: ${bg};
        }
        .etcd-ha-diagram .container-icon { font-size: 13px; }
        .etcd-ha-diagram .container-info { flex: 1; }
        .etcd-ha-diagram .container-name { font-size: 11px; font-weight: 600; color: ${text}; }
        .etcd-ha-diagram .container-port { font-size: 10px; color: ${textSec}; }
        .etcd-ha-diagram .pvc-row {
          margin: 0 8px 8px; padding: 5px 8px; border-radius: 6px;
          border: 1px dashed ${border}; background: ${bg};
          display: flex; align-items: center; gap: 6px; font-size: 10px; color: ${textSec};
        }
        .etcd-ha-diagram .replication-bar {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 7px; border-radius: 8px;
          background: ${dark ? '#031c1a' : '#f0fdfa'};
          border: 1px solid #0d9488; margin-top: 10px; font-size: 11px; color: #14b8a6;
        }
        .etcd-ha-diagram .legend {
          display: flex; gap: 18px; flex-wrap: wrap; justify-content: center;
          padding-top: 8px; border-top: 1px solid ${borderIn}; margin-top: 16px;
        }
        .etcd-ha-diagram .legend-item { display: flex; align-items: center; gap: 5px; font-size: 10px; color: ${textSec}; }
        .etcd-ha-diagram .legend-dot { width: 8px; height: 8px; border-radius: 50%; }
      `;
}

export default function EtcdArchitectureDiagram() {
  const theme = useTheme();
  const dark = theme.palette.mode === 'dark';
  const n = 3;

  return (
    <>
      <style>{getStyles(dark)}</style>
      <div className="etcd-ha-diagram">

        {/* ══ MAIN AREA: data plane (left) + sidebar (right) ══ */}
        <div className="main-area">

          {/* LEFT: Client → Service → Pods */}
          <div className="data-plane">

            {/* Client */}
            <div className="client-mini">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="1.5">
                <rect x="2" y="3" width="20" height="14" rx="2"/>
                <path d="M8 21h8M12 17v4"/>
              </svg>
              <div>
                <div className="client-label">Application / Client</div>
                <div className="client-routes">
                  Client (if enabled)&nbsp; <code style={{color:'#14b8a6'}}>{'{cluster}'}-etcd-client:2379</code><br/>
                  Default&nbsp; <code style={{color:'#14b8a6'}}>{'{cluster}'}-etcd-headless</code> (pod DNS)
                </div>
              </div>
            </div>

            {/* Arrow: Client → Service */}
            <div className="v-arrow">
              <div className="v-arrow-line">
                <div className="v-line v-line-teal"></div>
              </div>
              <span className="v-arrow-label">client API → all pods (etcd routes internally)</span>
            </div>

            {/* Services */}
            <div className="services-block">
              <div className="card-title" style={{color:'#14b8a6'}}>
                <span className="dot dot-teal"></span>
                Kubernetes Services
              </div>
              <div className="services-grid" style={{gridTemplateColumns:'1fr'}}>
                <div className="svc-card svc-rw">
                  <div className="svc-name">{'{cluster}'}-etcd-client</div>
                  <div className="svc-detail">
                    ClusterIP · :2379 client<br/>
                    all pods (no roleSelector)<br/>
                    disableAutoProvision: true — not created by default
                  </div>
                  <span className="svc-tag tag-teal">Optional</span>
                </div>
              </div>
            </div>

            {/* Arrow: Service → Pods */}
            <div className="v-arrow">
              <div className="v-arrow-line">
                <div className="v-line v-line-teal"></div>
              </div>
              <span className="v-arrow-label">→ any pod (etcd forwards to leader transparently)</span>
            </div>

            {/* Pods */}
            <div className="pods-section">
              <div className="section-label">Pods · Worker Nodes</div>
              <div className="pods-grid">

                {Array.from({ length: n }, (_, i) => {
                  const isLeader = i === 0;
                  return (
                    <div key={i} className={`pod-card ${isLeader ? 'pod-primary' : 'pod-replica'}`}>
                      <div className="pod-header">
                        <span className="pod-name">etcd-{i}</span>
                        <span className={`pod-badge ${isLeader ? 'badge-primary' : 'badge-replica'}`}>
                          {isLeader ? 'LEADER' : 'FOLLOWER'}
                        </span>
                      </div>
                      <div className="containers">
                        <div className="container-row">
                          <span className="container-icon">🔑</span>
                          <div className="container-info">
                            <div className="container-name">etcd</div>
                            <div className="container-port">:2379 client + /metrics · :2380 peer</div>
                          </div>
                          {isLeader ? (
                            <div style={{ color: '#14b8a6', fontSize: '10px' }}>leader</div>
                          ) : null}
                        </div>
                      </div>
                      <div className="pvc-row">💾 PVC data-{i} · 10Gi</div>
                    </div>
                  );
                })}

              </div>
              <div className="replication-bar">
                <span>↔</span>
                <strong>Raft Consensus</strong>
                <span>WAL replicated to followers · quorum acknowledgment required</span>
              </div>
            </div>

          </div>{/* /data-plane */}

        </div>{/* /main-area */}
        {/* Legend */}
        <div className="legend">
          <div className="legend-item"><span className="legend-dot" style={{background:'#14b8a6'}}></span>Leader Node</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#7d8590'}}></span>Follower Node</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#e3b341'}}></span>Persistent Storage</div>
        </div>

      </div>
    </>
  );
}
