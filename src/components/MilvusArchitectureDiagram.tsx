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

  // Layer colors
  const blueHdr   = dark ? 'linear-gradient(135deg,#0d1f38,#162840)' : 'linear-gradient(135deg,#e8f0fe,#dce8fc)';
  const blueHdrBd = dark ? '#1f6feb' : '#388bfd';
  const purpHdr   = dark ? 'linear-gradient(135deg,#1e0d38,#2d1f5e)' : 'linear-gradient(135deg,#f0e8ff,#e8daff)';
  const purpHdrBd = dark ? '#6e40c9' : '#8250df';
  const grnHdr    = dark ? 'linear-gradient(135deg,#0d2510,#1a3820)' : 'linear-gradient(135deg,#e8faf0,#d4f5e4)';
  const grnHdrBd  = dark ? '#238636' : '#2da44e';
  const orgHdr    = dark ? 'linear-gradient(135deg,#1f1409,#2e1d0a)' : 'linear-gradient(135deg,#fff3e0,#ffe8c0)';
  const orgHdrBd  = dark ? '#9e6a03' : '#bc6d09';

  const blueRowBg = dark ? '#080d18' : '#e8f0fe';
  const blueRowBd = dark ? '#1f6feb44' : '#388bfd66';
  const purpRowBg = dark ? '#100820' : '#f0e8ff';
  const purpRowBd = dark ? '#6e40c944' : '#8250df66';
  const grnRowBg  = dark ? '#0a1a0a' : '#e8faf0';
  const grnRowBd  = dark ? '#23863644' : '#2da44e66';
  const orgRowBg  = dark ? '#1a1005' : '#fff3e0';
  const orgRowBd  = dark ? '#9e6a0344' : '#bc6d0966';

  const replBg    = dark ? '#0a1a14' : '#e8f7f0';
  const tagGreen  = dark ? '#1a4a1a' : '#dafbe1';
  const svcBlueBg = dark ? '#061520' : '#e8f2fe';
  const svcBlueBd = dark ? '#1f6feb' : '#388bfd';

  return `
    .mlv-diagram * { box-sizing: border-box; }
    .mlv-diagram {
      background: ${bg};
      font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      color: ${text};
      padding: 28px;
      border-radius: 16px;
      margin-bottom: 32px;
    }
    .mlv-diagram .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
    .mlv-diagram .dot-blue   { background: #388bfd; }
    .mlv-diagram .dot-purple { background: #a371f7; }
    .mlv-diagram .dot-green  { background: #3fb950; }
    .mlv-diagram .dot-orange { background: #e3b341; }
    .mlv-diagram .card-title {
      font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
      text-transform: uppercase; margin-bottom: 10px;
      display: flex; align-items: center; gap: 6px;
    }
    .mlv-diagram .main-area { display: flex; gap: 16px; align-items: flex-start; }
    .mlv-diagram .data-plane { flex: 1; display: flex; flex-direction: column; gap: 0; }
    .mlv-diagram .client-mini {
      border-radius: 12px; border: 1px solid ${border};
      background: ${card}; padding: 12px 16px;
      display: flex; align-items: center; gap: 14px;
    }
    .mlv-diagram .client-label { font-size: 13px; font-weight: 600; color: ${textBrt}; }
    .mlv-diagram .client-routes { font-size: 10px; color: ${textSec}; margin-top: 3px; line-height: 1.8; }
    .mlv-diagram .v-arrow {
      display: flex; align-items: center; justify-content: center; gap: 8px; height: 36px;
    }
    .mlv-diagram .v-arrow-line { display: flex; flex-direction: column; align-items: center; }
    .mlv-diagram .v-line { width: 2px; height: 20px; position: relative; }
    .mlv-diagram .v-line-blue { background: linear-gradient(to bottom, #1f6feb88, #388bfd); }
    .mlv-diagram .v-line-blue::after {
      content: ''; position: absolute; bottom: 0; left: 50%;
      transform: translateX(-50%);
      border-left: 5px solid transparent; border-right: 5px solid transparent;
      border-top: 7px solid #388bfd;
    }
    .mlv-diagram .v-line-green { background: linear-gradient(to bottom, #23863688, #3fb950); }
    .mlv-diagram .v-line-green::after {
      content: ''; position: absolute; bottom: 0; left: 50%;
      transform: translateX(-50%);
      border-left: 5px solid transparent; border-right: 5px solid transparent;
      border-top: 7px solid #3fb950;
    }
    .mlv-diagram .v-arrow-label { font-size: 9px; color: ${textDim}; letter-spacing: 1px; white-space: nowrap; }
    .mlv-diagram .services-block {
      border-radius: 12px; border: 1px solid ${svcBlueBd};
      background: ${svcBlueBg}; padding: 14px 16px;
    }
    .mlv-diagram .services-grid {
      display: grid; grid-template-columns: 1fr; gap: 10px; margin-top: 8px;
    }
    .mlv-diagram .svc-card { border-radius: 8px; border: 1px solid; padding: 10px 12px; }
    .mlv-diagram .svc-blue { border-color: ${svcBlueBd}; background: ${svcBlueBg}; }
    .mlv-diagram .svc-name { font-size: 12px; font-weight: 700; margin-bottom: 4px; }
    .mlv-diagram .svc-blue .svc-name { color: ${dark ? '#388bfd' : '#1f6feb'}; }
    .mlv-diagram .svc-detail { font-size: 10px; color: ${textSec}; line-height: 1.6; }
    .mlv-diagram .svc-tag {
      display: inline-block; font-size: 9px; font-weight: 700;
      letter-spacing: 1px; padding: 2px 6px; border-radius: 4px;
      text-transform: uppercase; margin-top: 4px;
    }
    .mlv-diagram .tag-blue { background: ${dark ? '#0d2035' : '#e8f4ff'}; color: ${dark ? '#79c0ff' : '#1f6feb'}; }
    .mlv-diagram .tag-green { background: ${tagGreen}; color: #3fb950; }
    .mlv-diagram .section-label {
      font-size: 10px; font-weight: 700; letter-spacing: 2px;
      text-transform: uppercase; color: ${textSec}; margin-bottom: 8px;
    }
    .mlv-diagram .pods-section {
      border-radius: 12px; border: 1px solid ${border};
      background: ${bg}; padding: 16px;
    }
    .mlv-diagram .tier-label {
      font-size: 10px; font-weight: 700; letter-spacing: 1.5px;
      text-transform: uppercase; color: ${textDim}; margin: 10px 0 6px;
      border-bottom: 1px solid ${borderIn}; padding-bottom: 4px;
    }
    .mlv-diagram .tier1-grid { display: grid; grid-template-columns: 1fr; gap: 10px; }
    .mlv-diagram .tier2-grid { display: grid; grid-template-columns: 1fr; gap: 10px; }
    .mlv-diagram .tier3-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
    .mlv-diagram .tier4-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
    @media (max-width: 600px) {
      .mlv-diagram .tier3-grid,
      .mlv-diagram .tier4-grid { grid-template-columns: 1fr; }
    }
    .mlv-diagram .pod-card { border-radius: 10px; border: 1px solid ${border}; background: ${card}; overflow: hidden; }
    .mlv-diagram .pod-header {
      padding: 9px 12px; display: flex; align-items: center; justify-content: space-between;
      border-bottom: 1px solid ${borderIn};
    }
    .mlv-diagram .pod-proxy .pod-header  { background: ${blueHdr}; border-bottom-color: ${blueHdrBd}; }
    .mlv-diagram .pod-coord .pod-header  { background: ${purpHdr}; border-bottom-color: ${purpHdrBd}; }
    .mlv-diagram .pod-worker .pod-header { background: ${grnHdr}; border-bottom-color: ${grnHdrBd}; }
    .mlv-diagram .pod-store .pod-header  { background: ${orgHdr}; border-bottom-color: ${orgHdrBd}; }
    .mlv-diagram .pod-name { font-size: 11px; font-weight: 700; color: ${textBrt}; }
    .mlv-diagram .pod-badge {
      font-size: 9px; font-weight: 700; letter-spacing: 1px;
      text-transform: uppercase; padding: 2px 7px; border-radius: 10px;
    }
    .mlv-diagram .badge-blue   { background: ${dark ? '#0d2035' : '#e8f4ff'}; color: ${dark ? '#79c0ff' : '#1f6feb'}; border: 1px solid ${dark ? '#1f6feb' : '#388bfd'}; }
    .mlv-diagram .badge-purple { background: ${dark ? '#1e0d38' : '#f0e8ff'}; color: ${dark ? '#d2a8ff' : '#8250df'}; border: 1px solid ${dark ? '#6e40c9' : '#8250df'}; }
    .mlv-diagram .badge-green  { background: ${dark ? '#1a4a1a' : '#dafbe1'}; color: #3fb950; border: 1px solid #238636; }
    .mlv-diagram .badge-orange { background: ${dark ? '#2e1d0a' : '#fff3e0'}; color: ${dark ? '#e3b341' : '#bc6d09'}; border: 1px solid ${dark ? '#9e6a03' : '#bc6d09'}; }
    .mlv-diagram .containers { padding: 8px; display: flex; flex-direction: column; gap: 4px; }
    .mlv-diagram .container-row {
      display: flex; align-items: center; gap: 7px; padding: 5px 8px;
      border-radius: 6px; border: 1px solid ${borderIn}; background: ${innerBg};
    }
    .mlv-diagram .container-row-blue   { border-color: ${blueRowBd}; background: ${blueRowBg}; }
    .mlv-diagram .container-row-purple { border-color: ${purpRowBd}; background: ${purpRowBg}; }
    .mlv-diagram .container-row-green  { border-color: ${grnRowBd};  background: ${grnRowBg}; }
    .mlv-diagram .container-row-orange { border-color: ${orgRowBd};  background: ${orgRowBg}; }
    .mlv-diagram .container-info { flex: 1; }
    .mlv-diagram .container-name { font-size: 11px; font-weight: 600; color: ${text}; }
    .mlv-diagram .container-port { font-size: 10px; color: ${textSec}; }
    .mlv-diagram .emptydir-row {
      margin: 0 8px 8px; padding: 5px 8px; border-radius: 6px;
      border: 1px dashed ${border}; background: ${innerBg};
      display: flex; align-items: center; gap: 6px; font-size: 10px; color: ${textDim};
      font-style: italic;
    }
    .mlv-diagram .replication-bar {
      display: flex; align-items: center; justify-content: center; gap: 8px;
      padding: 7px; border-radius: 8px; background: ${replBg};
      border: 1px solid #238636; margin-top: 10px; font-size: 11px; color: #3fb950;
    }
    .mlv-diagram .headless-note {
      margin-top: 8px; padding: 5px 10px; border-radius: 6px;
      border: 1px dashed ${border}; font-size: 10px; color: ${textDim};
      display: flex; align-items: center; gap: 6px;
    }
    .mlv-diagram .headless-note strong { color: ${textSec}; }
    .mlv-diagram .legend {
      display: flex; gap: 18px; flex-wrap: wrap; justify-content: center;
      padding-top: 8px; border-top: 1px solid ${borderIn}; margin-top: 16px;
    }
    .mlv-diagram .legend-item { display: flex; align-items: center; gap: 5px; font-size: 10px; color: ${textSec}; }
    .mlv-diagram .legend-dot { width: 8px; height: 8px; border-radius: 50%; }
  `.replace(/\s+/g, ' ');
}

export default function MilvusArchitectureDiagram() {
  const theme = useTheme();
  const dark = theme.palette.mode === 'dark';
  const blueColor  = dark ? '#79c0ff' : '#1f6feb';

  return (
    <>
      <style>{getStyles(dark)}</style>

      <div className="mlv-diagram">
        <div className="main-area">
          <div className="data-plane">

            {/* Client */}
            <div className="client-mini">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={blueColor} strokeWidth="1.5">
                <rect x="2" y="3" width="20" height="14" rx="2"/>
                <path d="M8 21h8M12 17v4"/>
              </svg>
              <div>
                <div className="client-label">Application / Client</div>
                <div className="client-routes">
                  gRPC&nbsp; <code style={{color: dark ? '#79c0ff' : '#1f6feb'}}>{'{cluster}'}-proxy:19530</code><br/>
                  Metrics/health&nbsp; <code style={{color: dark ? '#3fb950' : '#238636'}}>{'{cluster}'}-proxy:9091</code>
                </div>
              </div>
            </div>

            <div className="v-arrow">
              <div className="v-arrow-line"><div className="v-line v-line-blue"></div></div>
              <span className="v-arrow-label" style={{color: dark ? '#388bfd88' : '#1f6feb88'}}>gRPC :19530</span>
            </div>

            {/* Services */}
            <div className="services-block">
              <div className="card-title" style={{color: dark ? '#388bfd' : '#1f6feb'}}>
                <span className="dot dot-blue"></span>
                Kubernetes Services
              </div>
              <div className="services-grid">
                <div className="svc-card svc-blue">
                  <div className="svc-name">{'{cluster}'}-proxy</div>
                  <div className="svc-detail">
                    ClusterIP · :19530 gRPC (client) · :9091 metrics/health<br/>
                    Routes all client requests to proxy pods · stateless load balancing
                  </div>
                  <span className="svc-tag tag-blue">ClusterIP</span>
                </div>
              </div>
            </div>

            <div className="v-arrow">
              <div className="v-arrow-line"><div className="v-line v-line-blue"></div></div>
              <span className="v-arrow-label" style={{color: dark ? '#388bfd88' : '#1f6feb88'}}>→ proxy pods</span>
            </div>

            {/* Pods */}
            <div className="pods-section">
              <div className="section-label">Milvus Pods · Worker Nodes</div>

              {/* Tier 1: Proxy */}
              <div className="tier-label">Access Layer · Proxy</div>
              <div className="tier2-grid">
                <div className="pod-card pod-proxy">
                  <div className="pod-header">
                    <span className="pod-name">milvus-proxy-0</span>
                    <span className="pod-badge badge-blue">PROXY</span>
                  </div>
                  <div className="containers">
                    <div className="container-row container-row-blue">
                      <div className="container-info">
                        <div className="container-name">proxy</div>
                        <div className="container-port">:19530 gRPC (client) · :9091 metrics/health · stateless, horizontally scalable</div>
                      </div>
                    </div>
                  </div>
                  <div className="emptydir-row">emptyDir · fully stateless — no PVC required</div>
                </div>
              </div>

              {/* Tier 2: MixCoord */}
              <div className="tier-label">Coordination Layer · MixCoord (RootCoord + QueryCoord + DataCoord + IndexCoord)</div>
              <div className="tier1-grid">
                <div className="pod-card pod-coord">
                  <div className="pod-header">
                    <span className="pod-name">milvus-mixcoord-0</span>
                    <span className="pod-badge badge-purple">MIXCOORD</span>
                  </div>
                  <div className="containers">
                    <div className="container-row container-row-purple">
                      <div className="container-info">
                        <div className="container-name">mixcoord</div>
                        <div className="container-port">:9091 metrics/health · single replica · reloads state from etcd on restart · no data on disk</div>
                      </div>
                    </div>
                  </div>
                  <div className="emptydir-row">emptyDir · stateless against etcd — no PVC required</div>
                </div>
              </div>

              {/* Tier 3: Workers */}
              <div className="tier-label">Worker Layer · DataNode · IndexNode · QueryNode</div>
              <div className="tier3-grid">

                <div className="pod-card pod-worker">
                  <div className="pod-header">
                    <span className="pod-name">milvus-datanode-0</span>
                    <span className="pod-badge badge-green">DATANODE</span>
                  </div>
                  <div className="containers">
                    <div className="container-row container-row-green">
                      <div className="container-info">
                        <div className="container-name">datanode</div>
                        <div className="container-port">:9091 metrics · receives inserts/deletes · flushes segments to MinIO</div>
                      </div>
                    </div>
                  </div>
                  <div className="emptydir-row">emptyDir · WAL buffer only</div>
                </div>

                <div className="pod-card pod-worker">
                  <div className="pod-header">
                    <span className="pod-name">milvus-indexnode-0</span>
                    <span className="pod-badge badge-green">INDEXNODE</span>
                  </div>
                  <div className="containers">
                    <div className="container-row container-row-green">
                      <div className="container-info">
                        <div className="container-name">indexnode</div>
                        <div className="container-port">:9091 metrics · builds HNSW / IVF_FLAT indexes · writes to MinIO</div>
                      </div>
                    </div>
                  </div>
                  <div className="emptydir-row">emptyDir · tmp build workspace</div>
                </div>

                <div className="pod-card pod-worker">
                  <div className="pod-header">
                    <span className="pod-name">milvus-querynode-0</span>
                    <span className="pod-badge badge-green">QUERYNODE</span>
                  </div>
                  <div className="containers">
                    <div className="container-row container-row-green">
                      <div className="container-info">
                        <div className="container-name">querynode</div>
                        <div className="container-port">:9091 metrics · loads segments from MinIO · serves ANN search</div>
                      </div>
                    </div>
                  </div>
                  <div className="emptydir-row">emptyDir · segment cache (no PVC)</div>
                </div>

              </div>

              {/* Tier 4: External storage */}
              <div className="tier-label">External Dependencies (serviceRefDeclarations)</div>
              <div className="tier4-grid">

                <div className="pod-card pod-store">
                  <div className="pod-header">
                    <span className="pod-name">MinIO / S3</span>
                    <span className="pod-badge badge-orange">OBJECT STORE</span>
                  </div>
                  <div className="containers">
                    <div className="container-row container-row-orange">
                      <div className="container-info">
                        <div className="container-name">Object Storage</div>
                        <div className="container-port">Vectors · indexes · WAL segments · all persistent data</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pod-card pod-store">
                  <div className="pod-header">
                    <span className="pod-name">etcd</span>
                    <span className="pod-badge badge-orange">METADATA</span>
                  </div>
                  <div className="containers">
                    <div className="container-row container-row-orange">
                      <div className="container-info">
                        <div className="container-name">etcd Cluster</div>
                        <div className="container-port">Collection schema · segment metadata · cluster topology state</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pod-card pod-store">
                  <div className="pod-header">
                    <span className="pod-name">Pulsar / Kafka</span>
                    <span className="pod-badge badge-orange">LOG / MQ</span>
                  </div>
                  <div className="containers">
                    <div className="container-row container-row-orange">
                      <div className="container-info">
                        <div className="container-name">Message Queue</div>
                        <div className="container-port">Write-ahead log · inter-component message bus · data consistency</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              <div className="replication-bar">
                <strong>All compute pods are stateless</strong>
                <span style={{color: dark ? '#7d8590' : '#656d76'}}>persistent state lives in MinIO (vectors) · etcd (metadata) · Pulsar (WAL)</span>
              </div>
              <div className="headless-note">
                <strong>Headless service</strong> — stable pod DNS for internal component communication; not a client endpoint
              </div>
            </div>

          </div>
        </div>

        <div className="legend">
          <div className="legend-item"><span className="legend-dot" style={{background: dark ? '#388bfd' : '#1f6feb'}}></span>Access Layer (Proxy)</div>
          <div className="legend-item"><span className="legend-dot" style={{background: dark ? '#a371f7' : '#8250df'}}></span>Coordination (MixCoord)</div>
          <div className="legend-item"><span className="legend-dot" style={{background: '#3fb950'}}></span>Worker Pods</div>
          <div className="legend-item"><span className="legend-dot" style={{background: dark ? '#e3b341' : '#bc6d09'}}></span>External Storage</div>
        </div>

      </div>
    </>
  );
}
