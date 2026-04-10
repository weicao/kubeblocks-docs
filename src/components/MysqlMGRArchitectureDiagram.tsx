'use client';
import React from 'react';
import { useTheme } from '@mui/material/styles';

export default function MysqlMGRArchitectureDiagram() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const diagVars = {
    '--diag-bg':         isDark ? '#0d1117'             : '#ffffff',
    '--diag-text':       isDark ? '#e6edf3'             : '#1f2328',
    '--diag-card':       isDark ? '#161b22'             : '#f6f8fa',
    '--diag-border':     isDark ? '#30363d'             : '#d0d7de',
    '--diag-separator':  isDark ? '#21262d'                                     : '#d0d7de',
    '--diag-muted':      isDark ? '#7d8590'             : '#57606a',
    '--diag-gray-arrow': isDark ? '#484f58'                                      : '#94a3b8',
    '--diag-green-bg':   isDark ? '#1a4a1a'             : 'rgba(63,185,80,0.10)',
    '--diag-green-bg2':  isDark ? '#0a1a0a'             : 'rgba(63,185,80,0.06)',
    '--diag-green-bg3':  isDark ? '#0a1a14'             : 'rgba(63,185,80,0.06)',
    '--diag-blue-bg':    isDark ? '#0d2035'             : 'rgba(31,111,235,0.08)',
    '--diag-blue-bg2':   isDark ? '#080d18'             : 'rgba(31,111,235,0.06)',
    '--diag-orange-bg':  isDark ? '#3d1a00'             : 'rgba(240,136,62,0.10)',
    '--diag-orange-bg2': isDark ? '#1a0f06'             : 'rgba(240,136,62,0.06)',
    '--diag-orange-bg3': isDark ? '#2a1200'             : 'rgba(240,136,62,0.08)',
    '--diag-green-pod':  isDark ? '#081208'             : 'rgba(63,185,80,0.06)',
    '--diag-blue-pod':   isDark ? '#080d18'             : 'rgba(31,111,235,0.06)',
    '--diag-green-grad': isDark ? 'linear-gradient(135deg,#0d2510,#1a3820)' : 'linear-gradient(135deg,rgba(63,185,80,0.08),rgba(63,185,80,0.14))',
    '--diag-blue-grad':  isDark ? 'linear-gradient(135deg,#0d1f38,#162840)' : 'linear-gradient(135deg,rgba(31,111,235,0.08),rgba(31,111,235,0.12))',
    '--diag-green-dark': isDark ? '#0a3020'             : 'rgba(63,185,80,0.08)',
    '--diag-teal-bg':    isDark ? '#062020'             : 'rgba(86,212,221,0.08)',
    '--diag-teal-bg2':   isDark ? '#061515'             : 'rgba(86,212,221,0.06)',
    '--diag-amber-bg':   isDark ? '#160e00'             : 'rgba(240,136,62,0.06)',
    '--diag-amber-bg2':  isDark ? '#5a3a00'             : 'rgba(240,136,62,0.10)',
    '--diag-vdark-green':isDark ? '#061008'             : 'rgba(63,185,80,0.04)',
  } as React.CSSProperties;

  return (
    <>
      <style>{`
        .mysql-mgr-diagram * { box-sizing: border-box; }
        .mysql-mgr-diagram {
          background: var(--diag-bg, #0d1117);
          font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: var(--diag-text, #e6edf3);
          padding: 28px;
          border-radius: 16px;
          margin-bottom: 32px;
        }
        .mysql-mgr-diagram .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
        .mysql-mgr-diagram .dot-blue   { background: #388bfd; }
        .mysql-mgr-diagram .dot-green  { background: #3fb950; }
        .mysql-mgr-diagram .dot-teal   { background: #56d4dd; }
        .mysql-mgr-diagram .dot-orange { background: #e3b341; }
        .mysql-mgr-diagram .dot-purple { background: #a371f7; }
        .mysql-mgr-diagram .dot-red    { background: #f85149; }
        .mysql-mgr-diagram .card-title {
          font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; margin-bottom: 10px;
          display: flex; align-items: center; gap: 6px;
        }
        .mysql-mgr-diagram .main-area {
          display: flex; gap: 16px; align-items: flex-start;
        }
        .mysql-mgr-diagram .data-plane {
          flex: 1; display: flex; flex-direction: column; gap: 0;
        }
        .mysql-mgr-diagram .client-mini {
          border-radius: 12px; border: 1px solid var(--diag-border, #30363d);
          background: var(--diag-card, #161b22); padding: 12px 16px;
          display: flex; align-items: center; gap: 14px;
        }
        .mysql-mgr-diagram .client-label { font-size: 13px; font-weight: 600; color: var(--diag-text, #f0f6fc); }
        .mysql-mgr-diagram .client-routes { font-size: 10px; color: var(--diag-muted, #7d8590); margin-top: 3px; line-height: 1.8; }
        .mysql-mgr-diagram .v-arrow {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          height: 36px;
        }
        .mysql-mgr-diagram .v-arrow-line { display: flex; flex-direction: column; align-items: center; }
        .mysql-mgr-diagram .v-line { width: 2px; height: 20px; position: relative; }
        .mysql-mgr-diagram .v-line-green { background: linear-gradient(to bottom, #23863688, #3fb950); }
        .mysql-mgr-diagram .v-line-green::after {
          content: ''; position: absolute; bottom: 0; left: 50%;
          transform: translateX(-50%);
          border-left: 5px solid transparent; border-right: 5px solid transparent;
          border-top: 7px solid #3fb950;
        }
        .mysql-mgr-diagram .v-line-gray { background: linear-gradient(to bottom, #30363d88, var(--diag-gray-arrow, #484f58)); }
        .mysql-mgr-diagram .v-line-gray::after {
          content: ''; position: absolute; bottom: 0; left: 50%;
          transform: translateX(-50%);
          border-left: 5px solid transparent; border-right: 5px solid transparent;
          border-top: 7px solid var(--diag-gray-arrow, #484f58);
        }
        .mysql-mgr-diagram .v-line-orange { background: linear-gradient(to bottom, #f0883e88, #f0883e); }
        .mysql-mgr-diagram .v-line-orange::after {
          content: ''; position: absolute; bottom: 0; left: 50%;
          transform: translateX(-50%);
          border-left: 5px solid transparent; border-right: 5px solid transparent;
          border-top: 7px solid #f0883e;
        }
        .mysql-mgr-diagram .v-arrow-label { font-size: 9px; color: var(--diag-gray-arrow, #484f58); letter-spacing: 1px; white-space: nowrap; }
        .mysql-mgr-diagram .proxysql-block {
          border-radius: 12px; border: 2px dashed #f0883e;
          background: var(--diag-orange-bg2, #1a0f06); padding: 14px 16px; position: relative;
        }
        .mysql-mgr-diagram .optional-badge {
          position: absolute; top: -10px; right: 14px;
          font-size: 9px; font-weight: 700; letter-spacing: 1px;
          text-transform: uppercase; padding: 2px 8px; border-radius: 10px;
          background: var(--diag-orange-bg, #3d1a00); color: #f0883e; border: 1px solid #f0883e;
        }
        .mysql-mgr-diagram .proxysql-body { display: flex; align-items: flex-start; gap: 14px; margin-top: 4px; }
        .mysql-mgr-diagram .proxysql-port-col { display: flex; flex-direction: column; gap: 4px; min-width: 120px; }
        .mysql-mgr-diagram .proxysql-port {
          font-size: 11px; padding: 4px 8px; border-radius: 6px;
          border: 1px solid; display: flex; align-items: center; gap: 5px;
        }
        .mysql-mgr-diagram .proxysql-port-client { border-color: #f0883e44; background: var(--diag-orange-bg3, #2a1200); color: #f0883e; }
        .mysql-mgr-diagram .proxysql-port-admin  { border-color: var(--diag-border, #30363d); background: var(--diag-bg, #0d1117); color: var(--diag-muted, #7d8590); }
        .mysql-mgr-diagram .proxysql-routes { display: flex; flex-direction: column; gap: 6px; flex: 1; }
        .mysql-mgr-diagram .proxysql-route {
          display: flex; align-items: center; gap: 8px;
          font-size: 10px; padding: 5px 10px; border-radius: 6px; border: 1px solid;
        }
        .mysql-mgr-diagram .route-write { border-color: #23863644; background: var(--diag-green-pod, #081208); color: var(--diag-text, #e6edf3); }
        .mysql-mgr-diagram .route-read  { border-color: #1f6feb44; background: var(--diag-blue-pod, #080d18); color: var(--diag-text, #e6edf3); }
        .mysql-mgr-diagram .route-label {
          font-size: 9px; font-weight: 700; letter-spacing: 1px;
          text-transform: uppercase; padding: 1px 5px; border-radius: 4px; white-space: nowrap;
        }
        .mysql-mgr-diagram .rl-write { background: var(--diag-green-bg, #1a4a1a); color: #3fb950; }
        .mysql-mgr-diagram .rl-read  { background: var(--diag-blue-bg, #0d2035); color: #79c0ff; }
        .mysql-mgr-diagram .services-block {
          border-radius: 12px; border: 1px solid #238636;
          background: var(--diag-green-bg2, #0a1a0a); padding: 14px 16px;
        }
        .mysql-mgr-diagram .services-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 8px;
        }
        .mysql-mgr-diagram .svc-card { border-radius: 8px; border: 1px solid; padding: 10px 12px; }
        .mysql-mgr-diagram .svc-rw   { border-color: #3fb950; background: var(--diag-green-bg2, #0a1a0a); }
        .mysql-mgr-diagram .svc-hl   { border-color: var(--diag-border, #30363d); background: var(--diag-bg, #0d1117); }
        .mysql-mgr-diagram .svc-name { font-size: 12px; font-weight: 700; margin-bottom: 4px; }
        .mysql-mgr-diagram .svc-rw .svc-name { color: #3fb950; }
        .mysql-mgr-diagram .svc-hl .svc-name { color: var(--diag-muted, #7d8590); }
        .mysql-mgr-diagram .svc-detail { font-size: 10px; color: var(--diag-muted, #7d8590); line-height: 1.6; }
        .mysql-mgr-diagram .svc-tag {
          display: inline-block; font-size: 9px; font-weight: 700;
          padding: 1px 6px; border-radius: 4px; margin-bottom: 4px; letter-spacing: 0.5px;
        }
        .mysql-mgr-diagram .tag-green  { background: var(--diag-green-dark, #0a3020); color: #3fb950; border: 1px solid #23863655; }
        .mysql-mgr-diagram .tag-gray   { background: var(--diag-separator, #21262d); color: var(--diag-muted, #8b949e); border: 1px solid var(--diag-border, #30363d); }
        .mysql-mgr-diagram .tag-teal   { background: var(--diag-teal-bg, #062020); color: #56d4dd; border: 1px solid #1b7c8355; }
        .mysql-mgr-diagram .tag-orange   { background: #2a1a00; color: #e3b341; border: 1px solid #5a3a0055; }
        .mysql-mgr-diagram .dot-proxysql { background: #f0883e; }
        .mysql-mgr-diagram .tag-proxysql { background: var(--diag-orange-bg, #3d1a00); color: #f0883e; border: 1px solid #f0883e55; }

        /* Pods section */
        .mysql-mgr-diagram .pods-section {
          border-radius: 12px; border: 1px solid var(--diag-border, #30363d);
          background: var(--diag-card, #161b22); padding: 16px;
        }
        .mysql-mgr-diagram .section-label {
          font-size: 10px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; color: var(--diag-muted, #7d8590); margin-bottom: 12px;
        }
        .mysql-mgr-diagram .pods-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;
        }
        .mysql-mgr-diagram .pod-card {
          border-radius: 10px; border: 1px solid;
          overflow: hidden;
        }
        .mysql-mgr-diagram .pod-primary { border-color: #238636; }
        .mysql-mgr-diagram .pod-secondary { border-color: #1f6feb; }
        .mysql-mgr-diagram .pod-header {
          padding: 8px 12px;
          display: flex; align-items: center; justify-content: space-between;
          border-bottom: 1px solid;
        }
        .mysql-mgr-diagram .pod-primary .pod-header   { background: linear-gradient(135deg,#0a1f0a,#122112); border-bottom-color: #238636; }
        .mysql-mgr-diagram .pod-secondary .pod-header { background: var(--diag-blue-grad); border-bottom-color: #1f6feb; }
        .mysql-mgr-diagram .pod-name   { font-size: 11px; font-weight: 700; color: var(--diag-text, #f0f6fc); }
        .mysql-mgr-diagram .pod-badge  {
          font-size: 8px; font-weight: 800; letter-spacing: 0.8px;
          padding: 2px 6px; border-radius: 4px; text-transform: uppercase;
        }
        .mysql-mgr-diagram .badge-primary   { background: var(--diag-green-dark, #0a3020); color: #3fb950; border: 1px solid #238636; }
        .mysql-mgr-diagram .badge-secondary { background: var(--diag-blue-bg, #0d2035); color: #79c0ff; border: 1px solid #1f6feb; }
        .mysql-mgr-diagram .pod-body { padding: 8px 10px; display: flex; flex-direction: column; gap: 4px; }
        .mysql-mgr-diagram .container-row {
          display: flex; align-items: center; justify-content: space-between;
          background: var(--diag-bg, #0d1117); border-radius: 6px; padding: 5px 8px;
          border: 1px solid var(--diag-separator, #21262d);
        }
        .mysql-mgr-diagram .ct-name  { font-size: 10px; font-weight: 600; color: var(--diag-text, #f0f6fc); }
        .mysql-mgr-diagram .ct-port  { font-size: 9px; color: var(--diag-muted, #7d8590); }
        .mysql-mgr-diagram .ct-port-teal { color: #56d4dd; }
        .mysql-mgr-diagram .ct-port-muted { font-size: 9px; color: var(--diag-gray-arrow, #484f58); font-style: italic; }
        .mysql-mgr-diagram .pvc-row {
          display: flex; align-items: center; gap: 5px;
          font-size: 9px; color: var(--diag-muted, #7d8590); margin-top: 2px; padding: 0 2px;
        }

        /* Group Replication gossip bar */
        .mysql-mgr-diagram .gr-bar {
          border-radius: 8px; border: 1px dashed #1b7c83;
          background: var(--diag-teal-bg2, #061515); padding: 8px 14px;
          display: flex; align-items: center; gap: 8px;
          margin-top: 10px;
        }
        .mysql-mgr-diagram .gr-bar-label {
          font-size: 9px; font-weight: 700; letter-spacing: 1px;
          text-transform: uppercase; color: #56d4dd; white-space: nowrap;
        }
        .mysql-mgr-diagram .gr-bar-desc {
          font-size: 10px; color: var(--diag-muted, #7d8590);
        }

        /* Legend */
        .mysql-mgr-diagram .legend {
          display: flex; flex-wrap: wrap; gap: 12px;
          margin-top: 16px; padding-top: 14px;
          border-top: 1px solid var(--diag-separator, #21262d);
        }
        .mysql-mgr-diagram .legend-item { display: flex; align-items: center; gap: 6px; font-size: 10px; color: var(--diag-muted, #8b949e); }
        .mysql-mgr-diagram .legend-dot  { width: 8px; height: 8px; border-radius: 50%; }
      `}</style>

      <div className="mysql-mgr-diagram" style={diagVars}>
        {/* Header */}
        <div style={{marginBottom: '20px'}}>
          <div style={{fontSize: '13px', fontWeight: 700, color: '#f0f6fc', letterSpacing: '0.5px', marginBottom: '4px'}}>
            MySQL Group Replication (MGR) — KubeBlocks
          </div>
          <div style={{fontSize: '11px', color: '#7d8590'}}>
            Single-primary mode · Paxos-based consensus on :33061 · Automatic group failover
          </div>
        </div>

        <div className="main-area">
          {/* LEFT: data plane */}
          <div className="data-plane">
            {/* Client */}
            <div className="client-mini">
              <div>
                <div style={{fontSize: '18px'}}>💻</div>
              </div>
              <div>
                <div className="client-label">Application</div>
                <div className="client-routes">
                  via ProxySQL&nbsp;<code style={{color:'#f0883e'}}>:6033</code>
                  &nbsp;or direct&nbsp;<code style={{color:'#3fb950'}}>:3306</code>
                </div>
              </div>
            </div>

            {/* Arrow: client → K8s Services */}
            <div className="v-arrow">
              <div className="v-arrow-line">
                <div className="v-line v-line-orange"></div>
              </div>
              <span className="v-arrow-label" style={{color:'#f0883e88'}}>K8s Service · ClusterIP</span>
            </div>

            {/* K8s Services */}
            <div className="services-block" style={{borderColor:'#30363d',background:'var(--diag-bg, #0d1117)'}}>
              <div className="card-title" style={{color:'#8b949e'}}>
                <span className="dot dot-blue"></span> Kubernetes Services
              </div>
              <div className="services-grid">
                <div className="svc-card" style={{borderColor:'#f0883e44',background:'var(--diag-orange-bg2, #1a0f06)',position:'relative'}}>
                  <span style={{position:'absolute',top:-9,right:8,fontSize:'9px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',padding:'1px 6px',borderRadius:10,background:'var(--diag-orange-bg, #3d1a00)',color:'#f0883e',border:'1px solid #f0883e'}}>Optional</span>
                  <div className="svc-tag tag-proxysql">ProxySQL</div>
                  <div className="svc-name" style={{color:'#f0883e'}}>mysql-cluster-proxysql</div>
                  <div className="svc-detail">ClusterIP · :6033<br/>Read/Write splitting</div>
                </div>
                <div className="svc-card svc-rw">
                  <div className="svc-tag tag-green">ClusterIP</div>
                  <div className="svc-name">mysql-cluster-mysql</div>
                  <div className="svc-detail">Port 3306<br/><code style={{color:'#3fb950',fontSize:'9px'}}>roleSelector: primary</code></div>
                </div>
              </div>
            </div>

            {/* Arrow: K8s Services → ProxySQL pod */}
            <div className="v-arrow">
              <div className="v-arrow-line">
                <div className="v-line v-line-orange"></div>
              </div>
              <span className="v-arrow-label" style={{color:'#f0883e88'}}>→ proxysql pod</span>
            </div>

            {/* ProxySQL Block */}
            <div className="proxysql-block">
              <span className="optional-badge">Optional</span>
              <div className="card-title" style={{color:'#f0883e'}}>
                <span className="dot dot-proxysql"></span>
                ProxySQL — Read/Write Splitting
              </div>
              <div className="proxysql-body">
                <div className="proxysql-port-col">
                  <div className="proxysql-port proxysql-port-client"><span>⇄</span> :6033 MySQL</div>
                  <div className="proxysql-port proxysql-port-admin"><span>⚙</span> :6032 Admin</div>
                </div>
                <div className="proxysql-routes">
                  <div className="proxysql-route route-write">
                    <span className="route-label rl-write">WRITE</span>
                    INSERT / UPDATE / DELETE → <strong style={{color:'#3fb950',marginLeft:4}}>Primary only</strong>
                  </div>
                  <div className="proxysql-route route-read">
                    <span className="route-label rl-read">READ</span>
                    SELECT → <strong style={{color:'#79c0ff',marginLeft:4}}>Secondaries (load balanced)</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow: ProxySQL → pods via pod FQDN */}
            <div className="v-arrow">
              <div className="v-arrow-line">
                <div className="v-line v-line-orange"></div>
              </div>
              <span className="v-arrow-label" style={{color:'#f0883e88'}}>pod FQDN via headless service · :3306</span>
            </div>

            {/* Pods */}
            <div className="pods-section">
              <div className="section-label">Pods · Component (mysql) · MGR Group</div>
              <div className="pods-grid">
                {/* mysql-0 PRIMARY */}
                <div className="pod-card pod-primary">
                  <div className="pod-header">
                    <span className="pod-name">mysql-0</span>
                    <span className="pod-badge badge-primary">PRIMARY</span>
                  </div>
                  <div className="pod-body">
                    <div className="container-row">
                      <span className="ct-name">mysql</span>
                      <span className="ct-port">:3306</span>
                    </div>
                    <div className="container-row">
                      <span className="ct-name">mysql</span>
                      <span className="ct-port ct-port-teal">:33061 GR</span>
                    </div>
                    <div className="container-row">
                      <span className="ct-name">syncer</span>
                      <span className="ct-port ct-port-muted">(syncerctl)</span>
                    </div>
                    <div className="container-row">
                      <span className="ct-name">mysql-exporter</span>
                      <span className="ct-port">:9104</span>
                    </div>
                    <div className="pvc-row">
                      <span>💾</span><span>PVC: /data/mysql</span>
                    </div>
                  </div>
                </div>

                {/* mysql-1 SECONDARY */}
                <div className="pod-card pod-secondary">
                  <div className="pod-header">
                    <span className="pod-name">mysql-1</span>
                    <span className="pod-badge badge-secondary">SECONDARY</span>
                  </div>
                  <div className="pod-body">
                    <div className="container-row">
                      <span className="ct-name">mysql</span>
                      <span className="ct-port">:3306</span>
                    </div>
                    <div className="container-row">
                      <span className="ct-name">mysql</span>
                      <span className="ct-port ct-port-teal">:33061 GR</span>
                    </div>
                    <div className="container-row">
                      <span className="ct-name">syncer</span>
                      <span className="ct-port ct-port-muted">(syncerctl)</span>
                    </div>
                    <div className="container-row">
                      <span className="ct-name">mysql-exporter</span>
                      <span className="ct-port">:9104</span>
                    </div>
                    <div className="pvc-row">
                      <span>💾</span><span>PVC: /data/mysql</span>
                    </div>
                  </div>
                </div>

                {/* mysql-2 SECONDARY */}
                <div className="pod-card pod-secondary">
                  <div className="pod-header">
                    <span className="pod-name">mysql-2</span>
                    <span className="pod-badge badge-secondary">SECONDARY</span>
                  </div>
                  <div className="pod-body">
                    <div className="container-row">
                      <span className="ct-name">mysql</span>
                      <span className="ct-port">:3306</span>
                    </div>
                    <div className="container-row">
                      <span className="ct-name">mysql</span>
                      <span className="ct-port ct-port-teal">:33061 GR</span>
                    </div>
                    <div className="container-row">
                      <span className="ct-name">syncer</span>
                      <span className="ct-port ct-port-muted">(syncerctl)</span>
                    </div>
                    <div className="container-row">
                      <span className="ct-name">mysql-exporter</span>
                      <span className="ct-port">:9104</span>
                    </div>
                    <div className="pvc-row">
                      <span>💾</span><span>PVC: /data/mysql</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Group Replication communication bar */}
              <div className="gr-bar">
                <span className="gr-bar-label">GR :33061</span>
                <span className="gr-bar-desc">
                  group communication — Paxos consensus · all members exchange heartbeats and transaction certification messages
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Legend */}
        <div className="legend">
          <div className="legend-item"><span className="legend-dot" style={{background:'#f0883e'}}></span>ProxySQL (Optional)</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#3fb950'}}></span>Primary Pod (writes)</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#79c0ff'}}></span>Secondary Pod (replicated)</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#56d4dd'}}></span>Group Replication :33061</div>
        </div>
      </div>
    </>
  );
}
