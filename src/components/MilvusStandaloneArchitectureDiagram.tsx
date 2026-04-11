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

  const purpBg   = dark ? '#0d0820' : '#f5f0ff';
  const purpBd   = dark ? '#6e40c9' : '#8250df';
  const purpHdr  = dark ? 'linear-gradient(135deg,#1a0d38,#120d2a)' : 'linear-gradient(135deg,#f0e8ff,#e8daff)';
  const purpHdrBd= dark ? '#a371f744' : '#8250df66';
  const purpName = dark ? '#f0f6fc' : '#1f2328';
  const purpChip = dark ? '#d2a8ff' : '#8250df';
  const purpChipBg= dark ? '#2d1f5e' : '#ede0ff';
  const purpChipBd= dark ? '#6e40c966' : '#8250df44';
  const purpRole = dark ? '#d2a8ff' : '#8250df';
  const purpRoleBg= dark ? '#0d0820' : '#f5f0ff';
  const purpRoleBd= dark ? '#a371f733' : '#8250df33';

  const tealBd   = dark ? '#1b7c83' : '#0d9fa9';
  const tealBg   = dark ? '#061515' : '#e0fafa';
  const tealHdr  = dark ? 'linear-gradient(135deg,#051515,#0a2020)' : 'linear-gradient(135deg,#e0fafa,#c8f5f5)';
  const tealHdrBd= dark ? '#1b7c8344' : '#0d9fa966';
  const tealName = dark ? '#56d4dd' : '#0d7d86';
  const tealRole = dark ? '#1b7c83' : '#0d9fa9';

  const replBg   = dark ? '#0a1a14' : '#e8f7f0';
  const tagPurp  = dark ? '#2d1f5e' : '#ede0ff';
  const tagPurpC = dark ? '#a371f7' : '#8250df';

  return `
    .msa-diagram * { box-sizing: border-box; }
    .msa-diagram {
      background: ${bg};
      font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      color: ${text};
      padding: 28px;
      border-radius: 16px;
      margin-bottom: 32px;
    }
    .msa-diagram .card-title {
      font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
      text-transform: uppercase; margin-bottom: 10px;
      display: flex; align-items: center; gap: 6px;
    }
    .msa-diagram .main-area { display: flex; gap: 20px; align-items: flex-start; }
    .msa-diagram .center-col { flex: 1; display: flex; flex-direction: column; gap: 0; }
    .msa-diagram .client-box {
      border-radius: 12px; border: 1px solid ${border};
      background: ${card}; padding: 12px 16px;
      display: flex; align-items: center; gap: 14px;
    }
    .msa-diagram .client-label { font-size: 13px; font-weight: 600; color: ${textBrt}; }
    .msa-diagram .client-note { font-size: 10px; color: ${textSec}; margin-top: 3px; line-height: 1.7; }
    .msa-diagram .v-arrow {
      display: flex; align-items: center; justify-content: center; gap: 8px; height: 30px;
    }
    .msa-diagram .v-line { width: 2px; height: 18px; position: relative; }
    .msa-diagram .v-line-purple { background: linear-gradient(to bottom, ${purpBd}88, ${dark ? '#a371f7' : '#8250df'}); }
    .msa-diagram .v-line-purple::after {
      content:''; position:absolute; bottom:0; left:50%; transform:translateX(-50%);
      border-left:5px solid transparent; border-right:5px solid transparent;
      border-top:7px solid ${dark ? '#a371f7' : '#8250df'};
    }
    .msa-diagram .v-line-teal { background: linear-gradient(to bottom, ${tealBd}88, ${dark ? '#56d4dd' : '#0d9fa9'}); }
    .msa-diagram .v-line-teal::after {
      content:''; position:absolute; bottom:0; left:50%; transform:translateX(-50%);
      border-left:5px solid transparent; border-right:5px solid transparent;
      border-top:7px solid ${dark ? '#56d4dd' : '#0d9fa9'};
    }
    .msa-diagram .v-arrow-label { font-size: 9px; color: ${textDim}; letter-spacing: 1px; white-space: nowrap; }
    .msa-diagram .svc-box {
      border-radius: 10px; border: 1px solid ${purpBd};
      background: ${purpBg}; padding: 10px 14px;
    }
    .msa-diagram .svc-name { font-size: 12px; font-weight: 700; color: ${purpRole}; }
    .msa-diagram .svc-detail { font-size: 10px; color: ${textSec}; margin-top: 3px; line-height: 1.6; }
    .msa-diagram .svc-tag {
      display: inline-block; font-size: 9px; font-weight: 700; letter-spacing: 1px;
      padding: 2px 6px; border-radius: 4px; text-transform: uppercase; margin-top: 4px;
      background: ${tagPurp}; color: ${tagPurpC};
    }
    .msa-diagram .milvus-pod {
      border-radius: 12px; border: 1px solid ${purpHdrBd};
      background: ${bg}; overflow: hidden;
    }
    .msa-diagram .milvus-pod-header {
      padding: 10px 14px; display: flex; align-items: center; justify-content: space-between;
      background: ${purpHdr}; border-bottom: 1px solid ${purpHdrBd};
    }
    .msa-diagram .milvus-pod-name { font-size: 12px; font-weight: 700; color: ${purpName}; }
    .msa-diagram .all-in-one-badge {
      font-size: 9px; font-weight: 700; padding: 2px 8px; border-radius: 10px;
      background: ${purpChipBg}; color: ${purpChip}; border: 1px solid ${purpChipBd};
      text-transform: uppercase; letter-spacing: 0.8px;
    }
    .msa-diagram .milvus-pod-body { padding: 12px; display: flex; flex-direction: column; gap: 8px; }
    .msa-diagram .container-col { display: flex; flex-direction: column; gap: 5px; }
    .msa-diagram .roles-row { display: flex; flex-wrap: wrap; gap: 4px; }
    .msa-diagram .container-row {
      display: flex; align-items: center; gap: 6px; padding: 5px 8px;
      border-radius: 6px; border: 1px solid ${borderIn}; background: ${innerBg}; font-size: 10px;
    }
    .msa-diagram .container-name { color: ${textBrt}; font-weight: 600; }
    .msa-diagram .container-port { color: ${textSec}; font-size: 9px; margin-left: auto; }
    .msa-diagram .roles-label { font-size: 9px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: ${textDim}; margin-bottom: 2px; }
    .msa-diagram .role-chip {
      padding: 3px 7px; border-radius: 5px; border: 1px solid ${purpRoleBd};
      background: ${purpRoleBg}; font-size: 9px; color: ${purpRole}; text-align: center;
    }
    .msa-diagram .container-note {
      margin-top: 4px; padding: 5px 8px; border-radius: 5px;
      border: 1px solid ${borderIn}; background: ${innerBg};
      font-size: 9px; color: ${textDim}; line-height: 1.6;
    }
    .msa-diagram .pvc-row {
      margin: 0 12px 10px; padding: 5px 8px; border-radius: 6px;
      border: 1px dashed ${border}; background: ${innerBg};
      display: flex; align-items: center; gap: 6px; font-size: 10px; color: ${textSec};
    }
    .msa-diagram .storage-row {
      display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
    }
    .msa-diagram .storage-pod {
      border-radius: 10px; border: 1px solid ${tealBd};
      background: ${tealBg}; overflow: hidden;
    }
    .msa-diagram .storage-pod-header {
      padding: 7px 10px; display: flex; align-items: center; gap: 6px;
      background: ${tealHdr}; border-bottom: 1px solid ${tealHdrBd};
    }
    .msa-diagram .storage-pod-name { font-size: 11px; font-weight: 700; color: ${tealName}; }
    .msa-diagram .storage-pod-role { font-size: 9px; color: ${tealRole}; }
    .msa-diagram .storage-containers { padding: 6px 8px; display: flex; flex-direction: column; gap: 3px; }
    .msa-diagram .storage-container-row {
      display: flex; align-items: center; gap: 5px; padding: 3px 6px;
      border-radius: 4px; border: 1px solid ${borderIn}; background: ${innerBg}; font-size: 9px;
    }
    .msa-diagram .storage-pvc {
      margin: 0 8px 6px; padding: 3px 7px; border-radius: 4px;
      border: 1px dashed ${border}; background: ${innerBg};
      font-size: 9px; color: ${textSec};
    }
    .msa-diagram .replication-bar {
      display: flex; align-items: center; justify-content: center; gap: 8px;
      padding: 7px; border-radius: 8px; background: ${replBg};
      border: 1px solid #238636; margin-top: 10px; font-size: 11px; color: #3fb950;
    }
    .msa-diagram .legend {
      display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;
      padding-top: 8px; border-top: 1px solid ${borderIn}; margin-top: 16px;
    }
    .msa-diagram .legend-item { display: flex; align-items: center; gap: 5px; font-size: 10px; color: ${textSec}; }
    .msa-diagram .legend-dot { width: 8px; height: 8px; border-radius: 50%; }
  `.replace(/\s+/g, ' ');
}

export default function MilvusStandaloneArchitectureDiagram() {
  const theme = useTheme();
  const dark = theme.palette.mode === 'dark';
  const purpColor = dark ? '#a371f7' : '#8250df';
  const tealColor = dark ? '#56d4dd' : '#0d7d86';
  const codeColor = dark ? '#d2a8ff' : '#8250df';

  return (
    <>
      <style>{getStyles(dark)}</style>

      <div className="msa-diagram">
        <div className="main-area">
          <div className="center-col">

            {/* Client */}
            <div className="client-box">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={dark ? '#79c0ff' : '#1f6feb'} strokeWidth="1.5">
                <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
              </svg>
              <div>
                <div className="client-label">Application / Client</div>
                <div className="client-note">
                  Milvus SDK (Python / Go / Java / Node) · gRPC or REST<br/>
                  Connect to <code style={{color: codeColor}}>{'{cluster}'}-milvus:19530</code>
                </div>
              </div>
            </div>

            {/* Arrow → service */}
            <div className="v-arrow">
              <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                <div className="v-line v-line-purple"></div>
              </div>
              <span className="v-arrow-label" style={{color: purpColor + '88'}}>gRPC :19530 / metrics :9091</span>
            </div>

            {/* Service */}
            <div className="svc-box">
              <div className="svc-name">{'{cluster}'}-milvus</div>
              <div className="svc-detail">
                ClusterIP · :19530 (gRPC) · :9091 (metrics/health)<br/>
                selector: all standalone pods
              </div>
              <span className="svc-tag">ClusterIP</span>
            </div>

            {/* Arrow → pod */}
            <div className="v-arrow">
              <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                <div className="v-line v-line-purple"></div>
              </div>
            </div>

            {/* Milvus all-in-one pod */}
            <div className="milvus-pod">
              <div className="milvus-pod-header">
                <span className="milvus-pod-name">milvus-standalone-0</span>
                <span className="all-in-one-badge">All-in-One</span>
              </div>
              <div className="milvus-pod-body">
                <div className="container-col">
                  <div style={{fontSize:'9px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color: dark ? '#484f58' : '#8c959f',marginBottom:'2px'}}>Container</div>
                  <div className="container-row" style={{borderColor: dark ? '#6e40c944' : '#8250df44', background: dark ? '#0d0820' : '#f5f0ff'}}>
                    <span className="container-name">milvus</span>
                    <span className="container-port">:19530 (gRPC) · :9091 (metrics)</span>
                  </div>
                  <div className="container-note">
                    All coordinator + worker roles run as goroutines within the single <code style={{color: codeColor}}>milvus</code> process
                  </div>
                </div>
                <div>
                  <div className="roles-label">Embedded Roles</div>
                  <div className="roles-row">
                    {['RootCoord','QueryCoord','DataCoord','IndexCoord','QueryNode','DataNode','IndexNode','Proxy'].map(r => (
                      <div className="role-chip" key={r}>{r}</div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="pvc-row">
                <strong style={{color:'#e3b341'}}>PVC data-0</strong> · local segment cache · 20Gi
              </div>
            </div>

            {/* Arrow → storage */}
            <div className="v-arrow">
              <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                <div className="v-line v-line-teal"></div>
              </div>
              <span className="v-arrow-label" style={{color: tealColor + '88'}}>metadata + object storage I/O</span>
            </div>

            {/* Storage row */}
            <div className="storage-row">
              <div className="storage-pod">
                <div className="storage-pod-header">
                  <div>
                    <div className="storage-pod-name">etcd-0</div>
                    <div className="storage-pod-role">metadata · collection schemas · segment info</div>
                  </div>
                </div>
                <div className="storage-containers">
                  <div className="storage-container-row">
                    <span style={{color: tealColor, fontWeight:600, fontSize:'10px'}}>etcd</span>
                    <span style={{color: dark ? '#7d8590' : '#656d76', fontSize:'9px', marginLeft:'auto'}}>:2379</span>
                  </div>
                </div>
                <div className="storage-pvc">PVC · 10Gi</div>
              </div>

              <div className="storage-pod">
                <div className="storage-pod-header">
                  <div>
                    <div className="storage-pod-name">minio-0</div>
                    <div className="storage-pod-role">object storage · vectors · indexes · WAL</div>
                  </div>
                </div>
                <div className="storage-containers">
                  <div className="storage-container-row">
                    <span style={{color: tealColor, fontWeight:600, fontSize:'10px'}}>minio</span>
                    <span style={{color: dark ? '#7d8590' : '#656d76', fontSize:'9px', marginLeft:'auto'}}>:9000</span>
                  </div>
                </div>
                <div className="storage-pvc">PVC · 20Gi</div>
              </div>
            </div>

            <div className="replication-bar">
              <strong>Standalone topology</strong>
              <span style={{color: dark ? '#7d8590' : '#656d76'}}>all roles in one process · ideal for development and single-node deployments</span>
            </div>

          </div>
        </div>

        <div className="legend">
          <div className="legend-item"><span className="legend-dot" style={{background: dark ? '#a371f7' : '#8250df'}}></span>Milvus (all-in-one)</div>
          <div className="legend-item"><span className="legend-dot" style={{background: dark ? '#56d4dd' : '#0d7d86'}}></span>Storage Components (etcd / MinIO)</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#e3b341'}}></span>Persistent Storage</div>
        </div>

      </div>
    </>
  );
}
