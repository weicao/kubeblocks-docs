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
  const tagTeal  = dark ? '#061515' : '#e0fafa';
  const tagTealC = dark ? '#56d4dd' : '#0d7d86';
  const replBg   = dark ? '#0a1a14' : '#e8f7f0';
  const svcAllBg = dark ? '#061515' : '#e8fafa';
  const svcAllBd = dark ? '#1b7c83' : '#0d9fa9';
  const ldrHdr   = dark ? 'linear-gradient(135deg,#0d2510,#1a3820)' : 'linear-gradient(135deg,#e8faf0,#f0fdf4)';
  const ldrHdrBd = dark ? '#238636' : '#2da44e';
  const flwHdr   = dark ? 'linear-gradient(135deg,#0d1f38,#162840)' : 'linear-gradient(135deg,#e8f0fe,#dce8fc)';
  const flwHdrBd = dark ? '#1f6feb' : '#388bfd';
  const zkLeadRowBg = dark ? '#081208' : '#f0faf2';
  const zkLeadRowBd = dark ? '#23863644' : '#23863666';
  const zkFollRowBg = dark ? '#080d18' : '#e8f0fe';
  const zkFollRowBd = dark ? '#1f6feb44' : '#388bfd66';

  return `
    .zk-ha-diagram * { box-sizing: border-box; }
    .zk-ha-diagram {
      background: ${bg};
      font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      color: ${text};
      padding: 28px;
      border-radius: 16px;
      margin-bottom: 32px;
    }
    .zk-ha-diagram .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
    .zk-ha-diagram .dot-green  { background: #3fb950; }
    .zk-ha-diagram .dot-teal   { background: #56d4dd; }
    .zk-ha-diagram .card-title {
      font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
      text-transform: uppercase; margin-bottom: 10px;
      display: flex; align-items: center; gap: 6px;
    }
    .zk-ha-diagram .main-area { display: flex; gap: 16px; align-items: flex-start; }
    .zk-ha-diagram .data-plane { flex: 1; display: flex; flex-direction: column; gap: 0; }
    .zk-ha-diagram .client-mini {
      border-radius: 12px; border: 1px solid ${border};
      background: ${card}; padding: 12px 16px;
      display: flex; align-items: center; gap: 14px;
    }
    .zk-ha-diagram .client-label { font-size: 13px; font-weight: 600; color: ${textBrt}; }
    .zk-ha-diagram .client-routes { font-size: 10px; color: ${textSec}; margin-top: 3px; line-height: 1.8; }
    .zk-ha-diagram .v-arrow {
      display: flex; align-items: center; justify-content: center; gap: 8px; height: 36px;
    }
    .zk-ha-diagram .v-arrow-line { display: flex; flex-direction: column; align-items: center; }
    .zk-ha-diagram .v-line { width: 2px; height: 20px; position: relative; }
    .zk-ha-diagram .v-line-green { background: linear-gradient(to bottom, #23863688, #3fb950); }
    .zk-ha-diagram .v-line-green::after {
      content: ''; position: absolute; bottom: 0; left: 50%;
      transform: translateX(-50%);
      border-left: 5px solid transparent; border-right: 5px solid transparent;
      border-top: 7px solid #3fb950;
    }
    .zk-ha-diagram .v-line-teal { background: linear-gradient(to bottom, #1b7c8388, #56d4dd); }
    .zk-ha-diagram .v-line-teal::after {
      content: ''; position: absolute; bottom: 0; left: 50%;
      transform: translateX(-50%);
      border-left: 5px solid transparent; border-right: 5px solid transparent;
      border-top: 7px solid #56d4dd;
    }
    .zk-ha-diagram .v-arrow-label { font-size: 9px; color: ${textDim}; letter-spacing: 1px; white-space: nowrap; }
    .zk-ha-diagram .services-block {
      border-radius: 12px; border: 1px solid #238636;
      background: ${cardGreen}; padding: 14px 16px;
    }
    .zk-ha-diagram .services-grid {
      display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 8px;
    }
    .zk-ha-diagram .svc-card { border-radius: 8px; border: 1px solid; padding: 10px 12px; }
    .zk-ha-diagram .svc-rw  { border-color: #3fb950; background: ${cardGreen}; }
    .zk-ha-diagram .svc-all { border-color: ${svcAllBd}; background: ${svcAllBg}; }
    .zk-ha-diagram .svc-hl  { border-color: ${border}; background: ${bg}; }
    .zk-ha-diagram .svc-name { font-size: 12px; font-weight: 700; margin-bottom: 4px; }
    .zk-ha-diagram .svc-rw  .svc-name { color: #3fb950; }
    .zk-ha-diagram .svc-all .svc-name { color: ${dark ? '#56d4dd' : '#0d7d86'}; }
    .zk-ha-diagram .svc-hl  .svc-name { color: ${textSec}; }
    .zk-ha-diagram .svc-detail { font-size: 10px; color: ${textSec}; line-height: 1.6; }
    .zk-ha-diagram .svc-tag {
      display: inline-block; font-size: 9px; font-weight: 700;
      letter-spacing: 1px; padding: 2px 6px; border-radius: 4px;
      text-transform: uppercase; margin-top: 4px;
    }
    .zk-ha-diagram .tag-green { background: ${tagGreen}; color: #3fb950; }
    .zk-ha-diagram .tag-teal  { background: ${tagTeal}; color: ${tagTealC}; }
    .zk-ha-diagram .section-label {
      font-size: 10px; font-weight: 700; letter-spacing: 2px;
      text-transform: uppercase; color: ${textSec}; margin-bottom: 8px;
    }
    .zk-ha-diagram .pods-section {
      border-radius: 12px; border: 1px solid ${border};
      background: ${bg}; padding: 16px;
    }
    .zk-ha-diagram .pods-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 10px;
    }
    .zk-ha-diagram .pod-card { border-radius: 10px; border: 1px solid ${border}; background: ${card}; overflow: hidden; }
    .zk-ha-diagram .pod-header {
      padding: 9px 12px; display: flex; align-items: center; justify-content: space-between;
      border-bottom: 1px solid ${borderIn};
    }
    .zk-ha-diagram .pod-leader .pod-header   { background: ${ldrHdr}; border-bottom-color: ${ldrHdrBd}; }
    .zk-ha-diagram .pod-follower .pod-header { background: ${flwHdr}; border-bottom-color: ${flwHdrBd}; }
    .zk-ha-diagram .pod-name { font-size: 11px; font-weight: 700; color: ${textBrt}; }
    .zk-ha-diagram .pod-badge {
      font-size: 9px; font-weight: 700; letter-spacing: 1px;
      text-transform: uppercase; padding: 2px 7px; border-radius: 10px;
    }
    .zk-ha-diagram .badge-leader   { background: ${dark ? '#1a4a1a' : '#dafbe1'}; color: #3fb950; border: 1px solid #238636; }
    .zk-ha-diagram .badge-follower { background: ${dark ? '#0d2035' : '#e8f4ff'}; color: ${dark ? '#79c0ff' : '#1f6feb'}; border: 1px solid ${dark ? '#1f6feb' : '#388bfd'}; }
    .zk-ha-diagram .containers { padding: 8px; display: flex; flex-direction: column; gap: 4px; }
    .zk-ha-diagram .container-row {
      display: flex; align-items: center; gap: 7px; padding: 5px 8px;
      border-radius: 6px; border: 1px solid ${borderIn}; background: ${innerBg};
    }
    .zk-ha-diagram .container-row-leader   { border-color: ${zkLeadRowBd}; background: ${zkLeadRowBg}; }
    .zk-ha-diagram .container-row-follower { border-color: ${zkFollRowBd}; background: ${zkFollRowBg}; }
    .zk-ha-diagram .container-info { flex: 1; }
    .zk-ha-diagram .container-name { font-size: 11px; font-weight: 600; color: ${text}; }
    .zk-ha-diagram .container-port { font-size: 10px; color: ${textSec}; }
    .zk-ha-diagram .pvc-row {
      margin: 0 8px 8px; padding: 5px 8px; border-radius: 6px;
      border: 1px dashed ${border}; background: ${innerBg};
      display: flex; align-items: center; gap: 6px; font-size: 10px; color: ${textSec};
    }
    .zk-ha-diagram .replication-bar {
      display: flex; align-items: center; justify-content: center; gap: 8px;
      padding: 7px; border-radius: 8px; background: ${replBg};
      border: 1px solid #238636; margin-top: 10px; font-size: 11px; color: #3fb950;
    }
    .zk-ha-diagram .headless-note {
      margin-top: 8px; padding: 5px 10px; border-radius: 6px;
      border: 1px dashed ${border}; font-size: 10px; color: ${textDim};
      display: flex; align-items: center; gap: 6px;
    }
    .zk-ha-diagram .headless-note strong { color: ${textSec}; }
    .zk-ha-diagram .legend {
      display: flex; gap: 18px; flex-wrap: wrap; justify-content: center;
      padding-top: 8px; border-top: 1px solid ${borderIn}; margin-top: 16px;
    }
    .zk-ha-diagram .legend-item { display: flex; align-items: center; gap: 5px; font-size: 10px; color: ${textSec}; }
    .zk-ha-diagram .legend-dot { width: 8px; height: 8px; border-radius: 50%; }
  `.replace(/\s+/g, ' ');
}

export default function ZookeeperArchitectureDiagram() {
  const theme = useTheme();
  const dark = theme.palette.mode === 'dark';
  const leaderRoleColor  = dark ? '#3fb950' : '#238636';
  const followerRoleColor = dark ? '#79c0ff' : '#1f6feb';

  return (
    <>
      <style>{getStyles(dark)}</style>

      <div className="zk-ha-diagram">
        <div className="main-area">
          <div className="data-plane">

            {/* Client */}
            <div className="client-mini">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#79c0ff" strokeWidth="1.5">
                <rect x="2" y="3" width="20" height="14" rx="2"/>
                <path d="M8 21h8M12 17v4"/>
              </svg>
              <div>
                <div className="client-label">Application / Client</div>
                <div className="client-routes">
                  Write/coord&nbsp; <code style={{color:'#3fb950'}}>zk-cluster-zookeeper:2181</code><br/>
                  Read (all nodes)&nbsp; <code style={{color: dark ? '#56d4dd' : '#0d7d86'}}>zk-cluster-zookeeper-readable:2181</code>
                </div>
              </div>
            </div>

            <div className="v-arrow">
              <div className="v-arrow-line"><div className="v-line v-line-green"></div></div>
              <span className="v-arrow-label" style={{color:'#3fb95088'}}>RW → roleSelector: leader</span>
              <div className="v-arrow-line"><div className="v-line v-line-teal"></div></div>
              <span className="v-arrow-label" style={{color: dark ? '#56d4dd88' : '#0d7d8688'}}>Read → all pods (no roleSelector)</span>
            </div>

            {/* Services */}
            <div className="services-block">
              <div className="card-title" style={{color:'#3fb950'}}>
                <span className="dot dot-green"></span>
                Kubernetes Services
              </div>
              <div className="services-grid">
                <div className="svc-card svc-rw">
                  <div className="svc-name">zk-cluster-zookeeper</div>
                  <div className="svc-detail">
                    ClusterIP · :2181 client · :8080 admin<br/>
                    selector: <code style={{color:'#3fb950'}}>kubeblocks.io/role=leader</code><br/>
                    Endpoints auto-switch with leader
                  </div>
                  <span className="svc-tag tag-green">Leader</span>
                </div>
                <div className="svc-card svc-all">
                  <div className="svc-name">zk-cluster-zookeeper-readable</div>
                  <div className="svc-detail">
                    ClusterIP · :2181 client<br/>
                    no roleSelector — all pods<br/>
                    Distribute reads across all nodes
                  </div>
                  <span className="svc-tag tag-teal">All Nodes</span>
                </div>
              </div>
            </div>

            <div className="v-arrow">
              <div className="v-arrow-line"><div className="v-line v-line-green"></div></div>
              <span className="v-arrow-label" style={{color:'#3fb95088'}}>→ leader pod</span>
              <div className="v-arrow-line"><div className="v-line v-line-teal"></div></div>
              <span className="v-arrow-label" style={{color: dark ? '#56d4dd88' : '#0d7d8688'}}>→ any pod (load balanced)</span>
            </div>

            {/* Pods */}
            <div className="pods-section">
              <div className="section-label">ZooKeeper Pods · Worker Nodes</div>
              <div className="pods-grid">

                {/* Leader */}
                <div className="pod-card pod-leader">
                  <div className="pod-header">
                    <span className="pod-name">zookeeper-0</span>
                    <span className="pod-badge badge-leader">LEADER</span>
                  </div>
                  <div className="containers">
                    <div className="container-row container-row-leader">
                      <div className="container-info">
                        <div className="container-name">zookeeper</div>
                        <div className="container-port">:2181 client · :2888 quorum · :3888 elect · :8080 admin</div>
                      </div>
                      <div style={{color: leaderRoleColor, fontSize:'10px'}}>leader</div>
                    </div>
                  </div>
                  <div className="pvc-row">PVC <strong style={{color:'#e3b341'}}>data-0</strong> · /bitnami/zookeeper/data</div>
                </div>

                {/* Follower-1 */}
                <div className="pod-card pod-follower">
                  <div className="pod-header">
                    <span className="pod-name">zookeeper-1</span>
                    <span className="pod-badge badge-follower">FOLLOWER</span>
                  </div>
                  <div className="containers">
                    <div className="container-row container-row-follower">
                      <div className="container-info">
                        <div className="container-name">zookeeper</div>
                        <div className="container-port">:2181 client · :2888 quorum · :3888 elect · :8080 admin</div>
                      </div>
                      <div style={{color: followerRoleColor, fontSize:'10px'}}>follower</div>
                    </div>
                  </div>
                  <div className="pvc-row">PVC <strong style={{color:'#e3b341'}}>data-1</strong> · /bitnami/zookeeper/data</div>
                </div>

                {/* Follower-2 */}
                <div className="pod-card pod-follower">
                  <div className="pod-header">
                    <span className="pod-name">zookeeper-2</span>
                    <span className="pod-badge badge-follower">FOLLOWER</span>
                  </div>
                  <div className="containers">
                    <div className="container-row container-row-follower">
                      <div className="container-info">
                        <div className="container-name">zookeeper</div>
                        <div className="container-port">:2181 client · :2888 quorum · :3888 elect · :8080 admin</div>
                      </div>
                      <div style={{color: followerRoleColor, fontSize:'10px'}}>follower</div>
                    </div>
                  </div>
                  <div className="pvc-row">PVC <strong style={{color:'#e3b341'}}>data-2</strong> · /bitnami/zookeeper/data</div>
                </div>

              </div>

              <div className="replication-bar">
                <strong>ZAB Protocol (ZooKeeper Atomic Broadcast)</strong>
                <span style={{color: dark ? '#7d8590' : '#656d76'}}>all writes go through leader · broadcast to followers · majority ack required</span>
              </div>
              <div className="headless-note">
                <strong>Headless service</strong> — stable pod DNS for internal use (quorum, leader election, operator probes); not a client endpoint
              </div>
            </div>

          </div>
        </div>

        <div className="legend">
          <div className="legend-item"><span className="legend-dot" style={{background:'#3fb950'}}></span>Leader / Write Traffic</div>
          <div className="legend-item"><span className="legend-dot" style={{background: dark ? '#56d4dd' : '#0d7d86'}}></span>All-Node Read Traffic</div>
          <div className="legend-item"><span className="legend-dot" style={{background: dark ? '#79c0ff' : '#1f6feb'}}></span>Follower Pod</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#e3b341'}}></span>Persistent Storage</div>
        </div>

      </div>
    </>
  );
}
