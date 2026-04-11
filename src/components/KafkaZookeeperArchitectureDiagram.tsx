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
  const brkrHdr  = dark ? 'linear-gradient(135deg,#0d1f38,#162840)' : 'linear-gradient(135deg,#e8f0fe,#dce8fc)';
  const brkrHdrBd= dark ? '#1f6feb' : '#388bfd';
  const badgeBkBg= dark ? '#0d2035' : '#e8f4ff';
  const badgeBkCl= dark ? '#79c0ff' : '#1f6feb';
  const badgeBkBd= dark ? '#1f6feb' : '#388bfd';
  const brkrRowBg= dark ? '#080d18' : '#e8f0fe';
  const brkrRowBd= dark ? '#1f6feb44' : '#388bfd66';
  // ZooKeeper amber theme
  const zkBg     = dark ? '#191200' : '#fffbeb';
  const zkBorder = '#d4a017';
  const zkText   = dark ? '#e3b341' : '#92600a';
  const zkCardBg = dark ? '#261a00' : '#fef3c7';
  const zkCardBd = dark ? '#e3b34133' : '#d4a01766';
  const zkTagBg  = dark ? '#3a2600' : '#fef3c7';
  // elected-controller badge
  const ctrlTagBg= dark ? '#0d2035' : '#e8f4ff';
  const ctrlTagCl= dark ? '#79c0ff' : '#1f6feb';

  return `
    .kafka-zk-diagram * { box-sizing: border-box; }
    .kafka-zk-diagram {
      background: ${bg};
      font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      color: ${text};
      padding: 28px;
      border-radius: 16px;
      margin-bottom: 32px;
    }
    .kafka-zk-diagram .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
    .kafka-zk-diagram .dot-green  { background: #3fb950; }
    .kafka-zk-diagram .dot-amber  { background: #e3b341; }
    .kafka-zk-diagram .card-title {
      font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
      text-transform: uppercase; margin-bottom: 10px;
      display: flex; align-items: center; gap: 6px;
    }
    .kafka-zk-diagram .data-plane { display: flex; flex-direction: column; gap: 0; }
    .kafka-zk-diagram .client-mini {
      border-radius: 12px; border: 1px solid ${border};
      background: ${card}; padding: 12px 16px;
      display: flex; align-items: center; gap: 14px;
    }
    .kafka-zk-diagram .client-label { font-size: 13px; font-weight: 600; color: ${textBrt}; }
    .kafka-zk-diagram .client-routes { font-size: 10px; color: ${textSec}; margin-top: 3px; line-height: 1.8; }
    .kafka-zk-diagram .v-arrow {
      display: flex; align-items: center; justify-content: center; gap: 8px; height: 36px;
    }
    .kafka-zk-diagram .v-arrow-line { display: flex; flex-direction: column; align-items: center; }
    .kafka-zk-diagram .v-line { width: 2px; height: 20px; position: relative; }
    .kafka-zk-diagram .v-line-green { background: linear-gradient(to bottom, #23863688, #3fb950); }
    .kafka-zk-diagram .v-line-green::after {
      content: ''; position: absolute; bottom: 0; left: 50%;
      transform: translateX(-50%);
      border-left: 5px solid transparent; border-right: 5px solid transparent;
      border-top: 7px solid #3fb950;
    }
    .kafka-zk-diagram .v-arrow-label { font-size: 9px; color: ${textDim}; letter-spacing: 1px; white-space: nowrap; }
    .kafka-zk-diagram .services-block {
      border-radius: 12px; border: 1px solid #238636;
      background: ${cardGreen}; padding: 14px 16px;
    }
    .kafka-zk-diagram .svc-card {
      border-radius: 7px; border: 1px solid #3fb95066; background: ${cardGreen};
      padding: 8px 10px; margin-top: 6px;
    }
    .kafka-zk-diagram .svc-name { font-size: 11px; font-weight: 700; color: #3fb950; margin-bottom: 3px; }
    .kafka-zk-diagram .svc-detail { font-size: 10px; color: ${textSec}; line-height: 1.6; }
    .kafka-zk-diagram .svc-tag {
      display: inline-block; font-size: 9px; font-weight: 700;
      letter-spacing: 1px; padding: 2px 6px; border-radius: 4px;
      text-transform: uppercase; margin-top: 4px;
      background: ${tagGreen}; color: #3fb950;
    }
    .kafka-zk-diagram .pods-section {
      border-radius: 12px; border: 1px solid ${border};
      background: ${bg}; padding: 16px;
    }
    .kafka-zk-diagram .section-label {
      font-size: 10px; font-weight: 700; letter-spacing: 2px;
      text-transform: uppercase; color: ${textSec}; margin-bottom: 8px;
    }
    .kafka-zk-diagram .pods-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 10px;
    }
    .kafka-zk-diagram .pod-card { border-radius: 10px; border: 1px solid ${border}; background: ${card}; overflow: hidden; }
    .kafka-zk-diagram .pod-header {
      padding: 9px 12px; display: flex; align-items: center; justify-content: space-between;
      background: ${brkrHdr}; border-bottom: 1px solid ${brkrHdrBd};
    }
    .kafka-zk-diagram .pod-name { font-size: 11px; font-weight: 700; color: ${textBrt}; }
    .kafka-zk-diagram .badge-broker {
      font-size: 9px; font-weight: 700; letter-spacing: 1px;
      text-transform: uppercase; padding: 2px 7px; border-radius: 10px;
      background: ${badgeBkBg}; color: ${badgeBkCl}; border: 1px solid ${badgeBkBd};
    }
    .kafka-zk-diagram .ctrl-tag {
      font-size: 9px; font-weight: 700; letter-spacing: 0.5px;
      text-transform: uppercase; padding: 1px 5px; border-radius: 4px;
      background: ${ctrlTagBg}; color: ${ctrlTagCl}; border: 1px solid ${ctrlTagCl}44;
      margin-left: 4px;
    }
    .kafka-zk-diagram .containers { padding: 8px; display: flex; flex-direction: column; gap: 4px; }
    .kafka-zk-diagram .container-row {
      display: flex; align-items: center; gap: 7px; padding: 5px 8px;
      border-radius: 6px; border: 1px solid ${borderIn}; background: ${innerBg};
    }
    .kafka-zk-diagram .container-row-broker { border-color: ${brkrRowBd}; background: ${brkrRowBg}; }
    .kafka-zk-diagram .container-info { flex: 1; }
    .kafka-zk-diagram .container-name { font-size: 11px; font-weight: 600; color: ${text}; }
    .kafka-zk-diagram .container-port { font-size: 10px; color: ${textSec}; }
    .kafka-zk-diagram .pvc-row {
      margin: 0 8px 8px; padding: 5px 8px; border-radius: 6px;
      border: 1px dashed ${border}; background: ${innerBg};
      display: flex; align-items: center; gap: 6px; font-size: 10px; color: ${textSec};
    }
    /* ZooKeeper section */
    .kafka-zk-diagram .zk-connector {
      display: flex; align-items: center; justify-content: center;
      gap: 8px; height: 36px; font-size: 9px; color: ${zkText};
      letter-spacing: 1px;
    }
    .kafka-zk-diagram .zk-connector-line {
      flex: 1; height: 1px; border-top: 1px dashed ${zkBorder}; max-width: 60px;
    }
    .kafka-zk-diagram .zk-section {
      border-radius: 12px; border: 1px solid ${zkBorder};
      background: ${zkBg}; padding: 16px;
    }
    .kafka-zk-diagram .zk-header {
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: 12px;
    }
    .kafka-zk-diagram .zk-title {
      font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
      text-transform: uppercase; color: ${zkText};
      display: flex; align-items: center; gap: 6px;
    }
    .kafka-zk-diagram .zk-badge {
      font-size: 9px; font-weight: 700; letter-spacing: 1px;
      text-transform: uppercase; padding: 2px 8px; border-radius: 8px;
      background: ${zkTagBg}; color: ${zkText}; border: 1px solid ${zkBorder};
    }
    .kafka-zk-diagram .zk-nodes-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 12px;
    }
    .kafka-zk-diagram .zk-node {
      border-radius: 8px; border: 1px solid ${zkCardBd};
      background: ${zkCardBg}; padding: 8px 10px; text-align: center;
    }
    .kafka-zk-diagram .zk-node-name {
      font-size: 11px; font-weight: 700; color: ${zkText};
      font-family: 'JetBrains Mono', monospace; margin-bottom: 4px;
    }
    .kafka-zk-diagram .zk-node-role {
      font-size: 9px; color: ${dark ? '#7d6a20' : '#92600a'}; font-weight: 600;
      text-transform: uppercase; letter-spacing: 0.5px;
    }
    .kafka-zk-diagram .zk-roles-grid {
      display: grid; grid-template-columns: 1fr 1fr; gap: 6px;
    }
    .kafka-zk-diagram .zk-role-item {
      display: flex; align-items: flex-start; gap: 6px;
      font-size: 10px; color: ${dark ? '#a08030' : '#78500a'}; line-height: 1.5;
    }
    .kafka-zk-diagram .zk-role-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: ${zkBorder}; flex-shrink: 0; margin-top: 3px;
    }
    .kafka-zk-diagram .headless-note {
      margin-top: 8px; padding: 5px 10px; border-radius: 6px;
      border: 1px dashed ${border}; font-size: 10px; color: ${textDim};
      display: flex; align-items: center; gap: 6px;
    }
    .kafka-zk-diagram .headless-note strong { color: ${textSec}; }
    .kafka-zk-diagram .legend {
      display: flex; gap: 18px; flex-wrap: wrap; justify-content: center;
      padding-top: 8px; border-top: 1px solid ${borderIn}; margin-top: 16px;
    }
    .kafka-zk-diagram .legend-item { display: flex; align-items: center; gap: 5px; font-size: 10px; color: ${textSec}; }
    .kafka-zk-diagram .legend-dot { width: 8px; height: 8px; border-radius: 50%; }
  `.replace(/\s+/g, ' ');
}

export default function KafkaZookeeperArchitectureDiagram() {
  const theme = useTheme();
  const dark = theme.palette.mode === 'dark';
  const textDim = dark ? '#484f58' : '#8c959f';
  const brkrRoleColor = dark ? '#79c0ff' : '#1f6feb';
  const zkText = dark ? '#e3b341' : '#92600a';

  return (
    <>
      <style>{getStyles(dark)}</style>

      <div className="kafka-zk-diagram">
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
              <span className="dot dot-green"></span>Kubernetes Services
            </div>
            <div className="svc-card">
              <div className="svc-name">kafka-cluster-kafka-broker-advertised-listener-{'{n}'}</div>
              <div className="svc-detail">
                ClusterIP · :9092 (one per broker pod, podService: true)<br/>
                bootstrap seed list for producers &amp; consumers<br/>
                <span style={{color: textDim}}>+ headless svc for inter-broker replication on port 9094</span>
              </div>
              <span className="svc-tag">per-pod bootstrap</span>
            </div>
          </div>

          <div className="v-arrow">
            <div className="v-arrow-line"><div className="v-line v-line-green"></div></div>
            <span className="v-arrow-label" style={{color:'#3fb95088'}}>→ broker pods</span>
          </div>

          {/* Pods */}
          <div className="pods-section">
            <div className="section-label">Kafka 2.x Broker Pods (kafka-broker) · Worker Nodes</div>
            <div className="pods-grid">

              {/* broker-0 — elected controller */}
              <div className="pod-card">
                <div className="pod-header">
                  <span className="pod-name">broker-0</span>
                  <span className="badge-broker">BROKER</span>
                </div>
                <div style={{padding: '4px 8px 0'}}>
                  <span className="ctrl-tag">elected controller</span>
                </div>
                <div className="containers">
                  <div className="container-row container-row-broker">
                    <div className="container-info">
                      <div className="container-name">kafka <span style={{color: textDim, fontWeight:400, fontSize:'10px'}}>(broker + ZK controller)</span></div>
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
              <div className="pod-card">
                <div className="pod-header">
                  <span className="pod-name">broker-1</span>
                  <span className="badge-broker">BROKER</span>
                </div>
                <div className="containers" style={{paddingTop:'12px'}}>
                  <div className="container-row container-row-broker">
                    <div className="container-info">
                      <div className="container-name">kafka <span style={{color: textDim, fontWeight:400, fontSize:'10px'}}>(broker only)</span></div>
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

              {/* broker-2 */}
              <div className="pod-card">
                <div className="pod-header">
                  <span className="pod-name">broker-2</span>
                  <span className="badge-broker">BROKER</span>
                </div>
                <div className="containers" style={{paddingTop:'12px'}}>
                  <div className="container-row container-row-broker">
                    <div className="container-info">
                      <div className="container-name">kafka <span style={{color: textDim, fontWeight:400, fontSize:'10px'}}>(broker only)</span></div>
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

            <div className="headless-note">
              <strong>Headless service</strong> — stable pod DNS for inter-broker replication (:9094) and operator access; not a client endpoint
            </div>
          </div>

          {/* ZooKeeper connector */}
          <div className="zk-connector">
            <div className="zk-connector-line"></div>
            <span style={{fontWeight:700, letterSpacing:'0.08em'}}>ZooKeeper coordination (external cluster)</span>
            <div className="zk-connector-line"></div>
          </div>

          {/* ZooKeeper ensemble */}
          <div className="zk-section">
            <div className="zk-header">
              <div className="zk-title">
                <span className="dot dot-amber"></span>External ZooKeeper Ensemble
              </div>
              <span className="zk-badge">serviceRef: kafkaZookeeper</span>
            </div>

            <div className="zk-nodes-grid">
              {[
                { name: 'zk-0', role: 'Leader' },
                { name: 'zk-1', role: 'Follower' },
                { name: 'zk-2', role: 'Follower' },
              ].map(({ name, role }) => (
                <div className="zk-node" key={name}>
                  <div className="zk-node-name">{name}</div>
                  <div className="zk-node-role">{role}</div>
                </div>
              ))}
            </div>

            <div className="zk-roles-grid">
              {[
                { label: 'Controller election — one broker elected as Kafka Controller via ZK ephemeral node' },
                { label: 'Topic metadata — partition assignments, ISR lists stored as ZK znodes' },
                { label: 'Broker registration — brokers register on startup; controller detects failures via session expiry' },
                { label: 'SASL credentials — SCRAM-SHA-256/512 provisioned via kafka-configs.sh --zookeeper' },
              ].map(({ label }) => (
                <div className="zk-role-item" key={label}>
                  <div className="zk-role-dot"></div>
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <div style={{marginTop:'10px', fontSize:'10px', color: zkText, opacity:0.7, textAlign:'center' as const}}>
              KubeBlocks references this ensemble via <code style={{color: zkText}}>serviceRefs[].cluster</code> · ZooKeeper 3.5–3.9 supported
            </div>
          </div>

        </div>{/* /data-plane */}

        <div className="legend">
          <div className="legend-item"><span className="legend-dot" style={{background:'#79c0ff'}}></span>Broker Pod</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#e3b341'}}></span>ZooKeeper Ensemble (external)</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#3fb950'}}></span>Client Traffic (:9092)</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#e3b341', opacity:0.5}}></span>Persistent Storage</div>
        </div>

      </div>
    </>
  );
}
