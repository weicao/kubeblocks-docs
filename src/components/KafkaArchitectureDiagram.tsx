'use client';

import { useTheme } from '@mui/material';
import React from 'react';

function getStyles(dark: boolean) {
  const bg       = dark ? '#0d1117' : '#f6f8fa';
  const card     = dark ? '#161b22' : '#ffffff';
  const cardGreen= dark ? '#0a1a0a' : '#f0faf2';
  const border   = dark ? '#30363d' : '#d0d7de';
  const borderIn = dark ? '#21262d' : '#e0e5eb';
  const text     = dark ? '#e6edf3' : '#1f2328';
  const textBrt  = dark ? '#f0f6fc' : '#1f2328';
  const textSec  = dark ? '#7d8590' : '#656d76';
  const textDim  = dark ? '#484f58' : '#8c959f';
  const innerBg  = dark ? '#0d1117' : '#f6f8fa';
  const tagGreen = dark ? '#1a4a1a' : '#dafbe1';
  const tagGray  = dark ? '#21262d' : '#eaeef2';
  const tagGrayC = dark ? '#8b949e' : '#57606a';
  const replBg   = dark ? '#0a1a14' : '#e8f7f0';
  const ctrlHdr  = dark ? 'linear-gradient(135deg,#1a0d38,#281a50)' : 'linear-gradient(135deg,#f0ebff,#ebe0ff)';
  const ctrlHdrBd= dark ? '#6e40c9' : '#9333ea';
  const brkrHdr  = dark ? 'linear-gradient(135deg,#0d1f38,#162840)' : 'linear-gradient(135deg,#e8f0fe,#dce8fc)';
  const brkrHdrBd= dark ? '#1f6feb' : '#388bfd';
  const badgeCtBg= dark ? '#1e0d40' : '#f5e8ff';
  const badgeCtCl= dark ? '#c084fc' : '#7c3aed';
  const badgeCtBd= dark ? '#6e40c9' : '#9333ea';
  const badgeBkBg= dark ? '#0d2035' : '#e8f4ff';
  const badgeBkCl= dark ? '#79c0ff' : '#1f6feb';
  const badgeBkBd= dark ? '#1f6feb' : '#388bfd';
  const ctrlRowBg= dark ? '#100820' : '#f5e8ff';
  const ctrlRowBd= dark ? '#6e40c944' : '#6e40c966';
  const brkrRowBg= dark ? '#080d18' : '#e8f0fe';
  const brkrRowBd= dark ? '#1f6feb44' : '#388bfd66';

  return `
    .kafka-ha-diagram * { box-sizing: border-box; }
    .kafka-ha-diagram {
      background: ${bg};
      font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      color: ${text};
      padding: 28px;
      border-radius: 16px;
      margin-bottom: 32px;
    }
    .kafka-ha-diagram .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
    .kafka-ha-diagram .dot-blue   { background: #388bfd; }
    .kafka-ha-diagram .dot-green  { background: #3fb950; }
    .kafka-ha-diagram .dot-purple { background: #a371f7; }
    .kafka-ha-diagram .dot-red    { background: #f85149; }
    .kafka-ha-diagram .card-title {
      font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
      text-transform: uppercase; margin-bottom: 10px;
      display: flex; align-items: center; gap: 6px;
    }
    .kafka-ha-diagram .main-area { display: flex; gap: 16px; align-items: flex-start; }
    .kafka-ha-diagram .data-plane { flex: 1; display: flex; flex-direction: column; gap: 0; }
    .kafka-ha-diagram .client-mini {
      border-radius: 12px; border: 1px solid ${border};
      background: ${card}; padding: 12px 16px;
      display: flex; align-items: center; gap: 14px;
    }
    .kafka-ha-diagram .client-label { font-size: 13px; font-weight: 600; color: ${textBrt}; }
    .kafka-ha-diagram .client-routes { font-size: 10px; color: ${textSec}; margin-top: 3px; line-height: 1.8; }
    .kafka-ha-diagram .v-arrow {
      display: flex; align-items: center; justify-content: center; gap: 8px; height: 36px;
    }
    .kafka-ha-diagram .v-arrow-line { display: flex; flex-direction: column; align-items: center; }
    .kafka-ha-diagram .v-line { width: 2px; height: 20px; position: relative; }
    .kafka-ha-diagram .v-line-green { background: linear-gradient(to bottom, #23863688, #3fb950); }
    .kafka-ha-diagram .v-line-green::after {
      content: ''; position: absolute; bottom: 0; left: 50%;
      transform: translateX(-50%);
      border-left: 5px solid transparent; border-right: 5px solid transparent;
      border-top: 7px solid #3fb950;
    }
    .kafka-ha-diagram .v-line-gray { background: linear-gradient(to bottom, ${border}88, ${textDim}); }
    .kafka-ha-diagram .v-line-gray::after {
      content: ''; position: absolute; bottom: 0; left: 50%;
      transform: translateX(-50%);
      border-left: 5px solid transparent; border-right: 5px solid transparent;
      border-top: 7px solid ${textDim};
    }
    .kafka-ha-diagram .v-arrow-label { font-size: 9px; color: ${textDim}; letter-spacing: 1px; white-space: nowrap; }
    .kafka-ha-diagram .services-block {
      border-radius: 12px; border: 1px solid #238636;
      background: ${cardGreen}; padding: 14px 16px;
    }
    .kafka-ha-diagram .services-grid {
      display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 8px;
    }
    .kafka-ha-diagram .svc-card { border-radius: 8px; border: 1px solid; padding: 10px 12px; }
    .kafka-ha-diagram .svc-rw { border-color: #3fb950; background: ${cardGreen}; }
    .kafka-ha-diagram .svc-hl { border-color: ${border}; background: ${bg}; }
    .kafka-ha-diagram .svc-name { font-size: 12px; font-weight: 700; margin-bottom: 4px; }
    .kafka-ha-diagram .svc-rw .svc-name { color: #3fb950; }
    .kafka-ha-diagram .svc-hl .svc-name { color: ${textSec}; }
    .kafka-ha-diagram .svc-detail { font-size: 10px; color: ${textSec}; line-height: 1.6; }
    .kafka-ha-diagram .svc-tag {
      display: inline-block; font-size: 9px; font-weight: 700;
      letter-spacing: 1px; padding: 2px 6px; border-radius: 4px;
      text-transform: uppercase; margin-top: 4px;
    }
    .kafka-ha-diagram .tag-green { background: ${tagGreen}; color: #3fb950; }
    .kafka-ha-diagram .tag-gray  { background: ${tagGray}; color: ${tagGrayC}; }
    .kafka-ha-diagram .section-label {
      font-size: 10px; font-weight: 700; letter-spacing: 2px;
      text-transform: uppercase; color: ${textSec}; margin-bottom: 8px;
    }
    .kafka-ha-diagram .pods-section {
      border-radius: 12px; border: 1px solid ${border};
      background: ${bg}; padding: 16px;
    }
    .kafka-ha-diagram .pods-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 10px;
    }
    .kafka-ha-diagram .pod-card { border-radius: 10px; border: 1px solid ${border}; background: ${card}; overflow: hidden; }
    .kafka-ha-diagram .pod-header {
      padding: 9px 12px; display: flex; align-items: center; justify-content: space-between;
      border-bottom: 1px solid ${borderIn};
    }
    .kafka-ha-diagram .pod-controller .pod-header { background: ${ctrlHdr}; border-bottom-color: ${ctrlHdrBd}; }
    .kafka-ha-diagram .pod-broker .pod-header { background: ${brkrHdr}; border-bottom-color: ${brkrHdrBd}; }
    .kafka-ha-diagram .pod-name { font-size: 11px; font-weight: 700; color: ${textBrt}; }
    .kafka-ha-diagram .pod-badge {
      font-size: 9px; font-weight: 700; letter-spacing: 1px;
      text-transform: uppercase; padding: 2px 7px; border-radius: 10px;
    }
    .kafka-ha-diagram .badge-controller { background: ${badgeCtBg}; color: ${badgeCtCl}; border: 1px solid ${badgeCtBd}; }
    .kafka-ha-diagram .badge-broker     { background: ${badgeBkBg}; color: ${badgeBkCl}; border: 1px solid ${badgeBkBd}; }
    .kafka-ha-diagram .containers { padding: 8px; display: flex; flex-direction: column; gap: 4px; }
    .kafka-ha-diagram .container-row {
      display: flex; align-items: center; gap: 7px; padding: 5px 8px;
      border-radius: 6px; border: 1px solid ${borderIn}; background: ${innerBg};
    }
    .kafka-ha-diagram .container-icon { font-size: 13px; }
    .kafka-ha-diagram .container-info { flex: 1; }
    .kafka-ha-diagram .container-name { font-size: 11px; font-weight: 600; color: ${text}; }
    .kafka-ha-diagram .container-port { font-size: 10px; color: ${textSec}; }
    .kafka-ha-diagram .container-row-ctrl { border-color: ${ctrlRowBd}; background: ${ctrlRowBg}; }
    .kafka-ha-diagram .container-row-brkr { border-color: ${brkrRowBd}; background: ${brkrRowBg}; }
    .kafka-ha-diagram .pvc-row {
      margin: 0 8px 8px; padding: 5px 8px; border-radius: 6px;
      border: 1px dashed ${border}; background: ${innerBg};
      display: flex; align-items: center; gap: 6px; font-size: 10px; color: ${textSec};
    }
    .kafka-ha-diagram .replication-bar {
      display: flex; align-items: center; justify-content: center; gap: 8px;
      padding: 7px; border-radius: 8px; background: ${replBg};
      border: 1px solid #238636; margin-top: 10px; font-size: 11px; color: #3fb950;
    }
    .kafka-ha-diagram .headless-note {
      margin-top: 8px; padding: 5px 10px; border-radius: 6px;
      border: 1px dashed ${border}; font-size: 10px; color: ${textDim};
      display: flex; align-items: center; gap: 6px;
    }
    .kafka-ha-diagram .headless-note strong { color: ${textSec}; }
    .kafka-ha-diagram .legend {
      display: flex; gap: 18px; flex-wrap: wrap; justify-content: center;
      padding-top: 8px; border-top: 1px solid ${borderIn}; margin-top: 16px;
    }
    .kafka-ha-diagram .legend-item { display: flex; align-items: center; gap: 5px; font-size: 10px; color: ${textSec}; }
    .kafka-ha-diagram .legend-dot { width: 8px; height: 8px; border-radius: 50%; }
  `.replace(/\s+/g, ' ');
}

export default function KafkaArchitectureDiagram() {
  const theme = useTheme();
  const dark = theme.palette.mode === 'dark';
  const textDim = dark ? '#484f58' : '#8c959f';
  const ctrlKraftColor = dark ? '#c084fc' : '#7c3aed';
  const brkrRoleColor  = dark ? '#79c0ff' : '#1f6feb';

  return (
    <>
      <style>{getStyles(dark)}</style>

      <div className="kafka-ha-diagram">
        <div className="main-area">
          <div className="data-plane">

            {/* Client */}
            <div className="client-mini">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#79c0ff" strokeWidth="1.5">
                <rect x="2" y="3" width="20" height="14" rx="2"/>
                <path d="M8 21h8M12 17v4"/>
              </svg>
              <div>
                <div className="client-label">Producer / Consumer Client</div>
                <div className="client-routes">
                  Bootstrap seed list&nbsp; <code style={{color:'#3fb950'}}>kafka-cluster-kafka-broker-advertised-listener-0:9092,...</code><br/>
                  Per-broker (direct)&nbsp; <code style={{color: dark ? '#7d8590' : '#656d76'}}>kafka-{'{n}'}.kafka-cluster-kafka-broker-headless:9092</code>
                </div>
              </div>
            </div>

            <div className="v-arrow">
              <div className="v-arrow-line"><div className="v-line v-line-green"></div></div>
              <span className="v-arrow-label" style={{color:'#3fb95088'}}>client traffic → brokers :9092</span>
            </div>

            {/* Services */}
            <div className="services-block">
              <div className="card-title" style={{color:'#3fb950'}}>
                <span className="dot dot-green"></span>
                Kubernetes Services
              </div>
              <div className="services-grid" style={{gridTemplateColumns:'1fr'}}>
                <div className="svc-card svc-rw">
                  <div className="svc-name">kafka-cluster-kafka-broker-advertised-listener-{'{n}'}</div>
                  <div className="svc-detail">
                    ClusterIP · :9092 (one per broker pod, podService: true)<br/>
                    bootstrap seed list for producers &amp; consumers<br/>
                    <span style={{color: textDim}}>+ headless svc for direct pod DNS access</span>
                  </div>
                  <span className="svc-tag tag-green">per-pod bootstrap</span>
                </div>
              </div>
            </div>

            <div className="v-arrow">
              <div className="v-arrow-line"><div className="v-line v-line-green"></div></div>
              <span className="v-arrow-label" style={{color:'#3fb95088'}}>→ broker pods</span>
            </div>

            {/* Pods */}
            <div className="pods-section">
              <div className="section-label">Pods · Worker Nodes</div>
              <div className="pods-grid">

                {/* controller-0 */}
                <div className="pod-card pod-controller">
                  <div className="pod-header">
                    <span className="pod-name">controller-0</span>
                    <span className="pod-badge badge-controller">CONTROLLER</span>
                  </div>
                  <div className="containers">
                    <div className="container-row container-row-ctrl">
                      <div className="container-info">
                        <div className="container-name">kafka <span style={{color: textDim, fontWeight:400, fontSize:'10px'}}>(KRaft controller)</span></div>
                        <div className="container-port">:9093 ctrl quorum only</div>
                      </div>
                      <div style={{color: ctrlKraftColor, fontSize:'10px'}}>controller</div>
                    </div>
                    <div className="container-row">
                      <div className="container-info">
                        <div className="container-name">jmx-exporter</div>
                        <div className="container-port">:5556 metrics (JMX_PORT :5555)</div>
                      </div>
                    </div>
                  </div>
                  <div className="pvc-row">PVC <strong style={{color:'#e3b341'}}>metadata</strong> · /bitnami/kafka</div>
                </div>

                {/* broker-0 */}
                <div className="pod-card pod-broker">
                  <div className="pod-header">
                    <span className="pod-name">broker-0</span>
                    <span className="pod-badge badge-broker">BROKER</span>
                  </div>
                  <div className="containers">
                    <div className="container-row container-row-brkr">
                      <div className="container-info">
                        <div className="container-name">kafka <span style={{color: textDim, fontWeight:400, fontSize:'10px'}}>(KRaft broker)</span></div>
                        <div className="container-port">:9092 client · :9094 internal</div>
                      </div>
                      <div style={{color: brkrRoleColor, fontSize:'10px'}}>broker</div>
                    </div>
                    <div className="container-row">
                      <div className="container-info">
                        <div className="container-name">jmx-exporter</div>
                        <div className="container-port">:5556 metrics</div>
                      </div>
                    </div>
                  </div>
                  <div className="pvc-row">PVC <strong style={{color:'#e3b341'}}>data</strong> · /bitnami/kafka/data</div>
                </div>

                {/* broker-1 */}
                <div className="pod-card pod-broker">
                  <div className="pod-header">
                    <span className="pod-name">broker-1</span>
                    <span className="pod-badge badge-broker">BROKER</span>
                  </div>
                  <div className="containers">
                    <div className="container-row container-row-brkr">
                      <div className="container-info">
                        <div className="container-name">kafka <span style={{color: textDim, fontWeight:400, fontSize:'10px'}}>(KRaft broker)</span></div>
                        <div className="container-port">:9092 client · :9094 internal</div>
                      </div>
                      <div style={{color: brkrRoleColor, fontSize:'10px'}}>broker</div>
                    </div>
                    <div className="container-row">
                      <div className="container-info">
                        <div className="container-name">jmx-exporter</div>
                        <div className="container-port">:5556 metrics</div>
                      </div>
                    </div>
                  </div>
                  <div className="pvc-row">PVC <strong style={{color:'#e3b341'}}>data</strong> · /bitnami/kafka/data</div>
                </div>

              </div>

              <div className="replication-bar">
                <strong>KRaft Metadata Replication + ISR Partition Replication</strong>
                <span style={{color: dark ? '#7d8590' : '#656d76'}}>controller quorum · topic partitions replicated across brokers</span>
              </div>
              <div className="headless-note">
                <strong>Headless service</strong> — stable pod DNS for internal use (replication, HA heartbeat, operator probes); not a client endpoint
              </div>
            </div>

          </div>
        </div>

        <div className="legend">
          <div className="legend-item"><span className="legend-dot" style={{background:'#c084fc'}}></span>Controller Pod (KRaft)</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#79c0ff'}}></span>Broker Pod</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#e3b341'}}></span>Persistent Storage</div>
        </div>

      </div>
    </>
  );
}
