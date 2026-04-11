'use client';
import React from 'react';
import { useTheme } from '@mui/material/styles';

export default function MysqlArchitectureDiagram() {
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
        .mysql-ha-diagram * { box-sizing: border-box; }
        .mysql-ha-diagram {
          background: var(--diag-bg, #0d1117);
          font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: var(--diag-text, #e6edf3);
          padding: 28px;
          border-radius: 16px;
          margin-bottom: 32px;
        }
        .mysql-ha-diagram .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
        .mysql-ha-diagram .dot-blue   { background: #388bfd; }
        .mysql-ha-diagram .dot-green  { background: #3fb950; }
        .mysql-ha-diagram .dot-orange { background: #f0883e; }
        .mysql-ha-diagram .dot-purple { background: #a371f7; }
        .mysql-ha-diagram .dot-red    { background: #f85149; }
        .mysql-ha-diagram .card-title {
          font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; margin-bottom: 10px;
          display: flex; align-items: center; gap: 6px;
        }
        .mysql-ha-diagram .main-area {
          display: flex; gap: 16px; align-items: flex-start;
        }
        .mysql-ha-diagram .data-plane {
          flex: 1; display: flex; flex-direction: column; gap: 0;
        }
        .mysql-ha-diagram .client-mini {
          border-radius: 12px; border: 1px solid var(--diag-border, #30363d);
          background: var(--diag-card, #161b22); padding: 12px 16px;
          display: flex; align-items: center; gap: 14px;
        }
        .mysql-ha-diagram .client-label { font-size: 13px; font-weight: 600; color: var(--diag-text, #f0f6fc); }
        .mysql-ha-diagram .client-routes { font-size: 10px; color: var(--diag-muted, #7d8590); margin-top: 3px; line-height: 1.8; }
        .mysql-ha-diagram .v-arrow {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          height: 36px;
        }
        .mysql-ha-diagram .v-arrow-line { display: flex; flex-direction: column; align-items: center; }
        .mysql-ha-diagram .v-line { width: 2px; height: 20px; position: relative; }
        .mysql-ha-diagram .v-line-green { background: linear-gradient(to bottom, #23863688, #3fb950); }
        .mysql-ha-diagram .v-line-green::after {
          content: ''; position: absolute; bottom: 0; left: 50%;
          transform: translateX(-50%);
          border-left: 5px solid transparent; border-right: 5px solid transparent;
          border-top: 7px solid #3fb950;
        }
        .mysql-ha-diagram .v-line-orange { background: linear-gradient(to bottom, #f0883e88, #f0883e); }
        .mysql-ha-diagram .v-line-orange::after {
          content: ''; position: absolute; bottom: 0; left: 50%;
          transform: translateX(-50%);
          border-left: 5px solid transparent; border-right: 5px solid transparent;
          border-top: 7px solid #f0883e;
        }
        .mysql-ha-diagram .v-line-gray { background: linear-gradient(to bottom, #30363d88, var(--diag-gray-arrow, #484f58)); }
        .mysql-ha-diagram .v-line-gray::after {
          content: ''; position: absolute; bottom: 0; left: 50%;
          transform: translateX(-50%);
          border-left: 5px solid transparent; border-right: 5px solid transparent;
          border-top: 7px solid var(--diag-gray-arrow, #484f58);
        }
        .mysql-ha-diagram .v-arrow-label { font-size: 9px; color: var(--diag-gray-arrow, #484f58); letter-spacing: 1px; white-space: nowrap; }

        /* ProxySQL */
        .mysql-ha-diagram .proxysql-block {
          border-radius: 12px; border: 2px dashed #f0883e;
          background: var(--diag-orange-bg2, #1a0f06); padding: 14px 16px; position: relative;
        }
        .mysql-ha-diagram .optional-badge {
          position: absolute; top: -10px; right: 14px;
          font-size: 9px; font-weight: 700; letter-spacing: 1px;
          text-transform: uppercase; padding: 2px 8px; border-radius: 10px;
          background: var(--diag-orange-bg, #3d1a00); color: #f0883e; border: 1px solid #f0883e;
        }
        .mysql-ha-diagram .proxysql-body {
          display: flex; align-items: flex-start; gap: 14px; margin-top: 4px;
        }
        .mysql-ha-diagram .proxysql-port-col {
          display: flex; flex-direction: column; gap: 4px; min-width: 120px;
        }
        .mysql-ha-diagram .proxysql-port {
          font-size: 11px; padding: 4px 8px; border-radius: 6px;
          border: 1px solid; display: flex; align-items: center; gap: 5px;
        }
        .mysql-ha-diagram .proxysql-port-client {
          border-color: #f0883e44; background: var(--diag-orange-bg3, #2a1200); color: #f0883e;
        }
        .mysql-ha-diagram .proxysql-port-admin {
          border-color: var(--diag-border, #30363d); background: var(--diag-bg, #0d1117); color: var(--diag-muted, #7d8590);
        }
        .mysql-ha-diagram .proxysql-routes { display: flex; flex-direction: column; gap: 6px; flex: 1; }
        .mysql-ha-diagram .proxysql-route {
          display: flex; align-items: center; gap: 8px;
          font-size: 10px; padding: 5px 10px; border-radius: 6px;
          border: 1px solid;
        }
        .mysql-ha-diagram .route-write {
          border-color: #23863644; background: var(--diag-green-pod, #081208); color: var(--diag-text, #e6edf3);
        }
        .mysql-ha-diagram .route-read {
          border-color: #1f6feb44; background: var(--diag-blue-pod, #080d18); color: var(--diag-text, #e6edf3);
        }
        .mysql-ha-diagram .route-label {
          font-size: 9px; font-weight: 700; letter-spacing: 1px;
          text-transform: uppercase; padding: 1px 5px; border-radius: 4px;
          white-space: nowrap;
        }
        .mysql-ha-diagram .rl-write { background: var(--diag-green-bg, #1a4a1a); color: #3fb950; }
        .mysql-ha-diagram .rl-read  { background: var(--diag-blue-bg, #0d2035); color: #79c0ff; }

        /* K8s service (direct path, shown as alternative) */
        .mysql-ha-diagram .services-block {
          border-radius: 12px; border: 1px solid #238636;
          background: var(--diag-green-bg2, #0a1a0a); padding: 14px 16px;
        }
        .mysql-ha-diagram .services-grid {
          display: grid; grid-template-columns: 1fr; gap: 10px; margin-top: 8px;
        }
        .mysql-ha-diagram .svc-card { border-radius: 8px; border: 1px solid; padding: 10px 12px; }
        .mysql-ha-diagram .svc-rw { border-color: #3fb950; background: var(--diag-green-bg2, #0a1a0a); }
        .mysql-ha-diagram .svc-hl { border-color: var(--diag-border, #30363d); background: var(--diag-bg, #0d1117); }
        .mysql-ha-diagram .svc-name { font-size: 12px; font-weight: 700; margin-bottom: 4px; }
        .mysql-ha-diagram .svc-rw .svc-name { color: #3fb950; }
        .mysql-ha-diagram .svc-hl .svc-name { color: var(--diag-muted, #7d8590); }
        .mysql-ha-diagram .svc-detail { font-size: 10px; color: var(--diag-muted, #7d8590); line-height: 1.6; }
        .mysql-ha-diagram .svc-tag {
          display: inline-block; font-size: 9px; font-weight: 700;
          letter-spacing: 1px; padding: 2px 6px; border-radius: 4px;
          text-transform: uppercase; margin-top: 4px;
        }
        .mysql-ha-diagram .tag-green  { background: var(--diag-green-bg, #1a4a1a); color: #3fb950; }
        .mysql-ha-diagram .tag-gray   { background: var(--diag-separator, #21262d); color: var(--diag-muted, #8b949e); }
        .mysql-ha-diagram .tag-orange { background: var(--diag-orange-bg, #3d1a00); color: #f0883e; }
        .mysql-ha-diagram .section-label {
          font-size: 10px; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; color: var(--diag-muted, #7d8590); margin-bottom: 8px;
        }
        .mysql-ha-diagram .pods-section {
          border-radius: 12px; border: 1px solid var(--diag-border, #30363d);
          background: var(--diag-bg, #0d1117); padding: 16px;
        }
        .mysql-ha-diagram .pods-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 10px;
        }
        .mysql-ha-diagram .pod-card { border-radius: 10px; border: 1px solid var(--diag-border, #30363d); background: var(--diag-card, #161b22); overflow: hidden; }
        .mysql-ha-diagram .pod-header {
          padding: 9px 12px; display: flex; align-items: center; justify-content: space-between;
          border-bottom: 1px solid var(--diag-separator, #21262d);
        }
        .mysql-ha-diagram .pod-primary .pod-header { background: var(--diag-green-grad); border-bottom-color: #238636; }
        .mysql-ha-diagram .pod-replica .pod-header { background: var(--diag-blue-grad); border-bottom-color: #1f6feb; }
        .mysql-ha-diagram .pod-name { font-size: 11px; font-weight: 700; color: var(--diag-text, #f0f6fc); }
        .mysql-ha-diagram .pod-badge {
          font-size: 9px; font-weight: 700; letter-spacing: 1px;
          text-transform: uppercase; padding: 2px 7px; border-radius: 10px;
        }
        .mysql-ha-diagram .badge-primary { background: var(--diag-green-bg, #1a4a1a); color: #3fb950; border: 1px solid #238636; }
        .mysql-ha-diagram .badge-replica { background: var(--diag-blue-bg, #0d2035); color: #79c0ff; border: 1px solid #1f6feb; }
        .mysql-ha-diagram .containers { padding: 8px; display: flex; flex-direction: column; gap: 4px; }
        .mysql-ha-diagram .container-row {
          display: flex; align-items: center; gap: 7px; padding: 5px 8px;
          border-radius: 6px; border: 1px solid var(--diag-separator, #21262d); background: var(--diag-bg, #0d1117);
        }
        .mysql-ha-diagram .container-icon { font-size: 13px; }
        .mysql-ha-diagram .container-info { flex: 1; }
        .mysql-ha-diagram .container-name { font-size: 11px; font-weight: 600; color: var(--diag-text, #e6edf3); }
        .mysql-ha-diagram .container-port { font-size: 10px; color: var(--diag-muted, #7d8590); }
        .mysql-ha-diagram .pvc-row {
          margin: 0 8px 8px; padding: 5px 8px; border-radius: 6px;
          border: 1px dashed #30363d; background: var(--diag-bg, #0d1117);
          display: flex; align-items: center; gap: 6px; font-size: 10px; color: var(--diag-muted, #7d8590);
        }
        .mysql-ha-diagram .replication-bar {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 7px; border-radius: 8px; background: var(--diag-green-bg3, #0a1a14);
          border: 1px solid #238636; margin-top: 10px; font-size: 11px; color: #3fb950;
        }
        .mysql-ha-diagram .legend {
          display: flex; gap: 18px; flex-wrap: wrap; justify-content: center;
          padding-top: 8px; border-top: 1px solid var(--diag-separator, #21262d); margin-top: 16px;
        }
        .mysql-ha-diagram .legend-item { display: flex; align-items: center; gap: 5px; font-size: 10px; color: var(--diag-muted, #7d8590); }
        .mysql-ha-diagram .legend-dot { width: 8px; height: 8px; border-radius: 50%; }
      `}</style>

      <div className="mysql-ha-diagram" style={diagVars}>

        {/* ══ MAIN AREA ══ */}
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
                  via ProxySQL&nbsp;<code style={{color:'#f0883e'}}>:6033</code>
                  &nbsp;or direct&nbsp;<code style={{color:'#3fb950'}}>:3306</code>
                </div>
              </div>
            </div>

            {/* Arrow: Client → K8s Service (ProxySQL) */}
            <div className="v-arrow">
              <div className="v-arrow-line">
                <div className="v-line v-line-orange"></div>
              </div>
              <span className="v-arrow-label" style={{color:'#f0883e88'}}>K8s Service · ClusterIP</span>
            </div>

            {/* K8s Services block */}
            <div className="services-block" style={{borderColor:'#30363d',background:'var(--diag-bg, #0d1117)'}}>
              <div className="card-title" style={{color:'#8b949e'}}>
                <span className="dot dot-blue"></span>
                Kubernetes Services
              </div>
              <div className="services-grid" style={{gridTemplateColumns:'1fr 1fr',gap:10}}>
                {/* ProxySQL service */}
                <div className="svc-card" style={{borderColor:'#f0883e44',background:'var(--diag-orange-bg2, #1a0f06)',position:'relative'}}>
                  <span style={{position:'absolute',top:-9,right:8,fontSize:'9px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',padding:'1px 6px',borderRadius:10,background:'var(--diag-orange-bg, #3d1a00)',color:'#f0883e',border:'1px solid #f0883e'}}>Optional</span>
                  <div className="svc-name" style={{color:'#f0883e'}}>mysql-cluster-proxysql</div>
                  <div className="svc-detail">
                    ClusterIP · :6033<br/>
                    selector: proxysql pods
                  </div>
                  <span className="svc-tag tag-orange">ProxySQL</span>
                </div>
                {/* MySQL service */}
                <div className="svc-card svc-rw">
                  <div className="svc-name">mysql-cluster-mysql</div>
                  <div className="svc-detail">
                    ClusterIP · :3306<br/>
                    selector: <code style={{color:'#3fb950',fontSize:'9px'}}>role=primary</code>
                  </div>
                  <span className="svc-tag tag-green">MySQL Direct</span>
                </div>
              </div>
            </div>

            {/* Arrow: K8s Service → ProxySQL pod */}
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
                <span className="dot dot-orange"></span>
                ProxySQL — Read/Write Splitting
              </div>
              <div className="proxysql-body">
                <div className="proxysql-port-col">
                  <div className="proxysql-port proxysql-port-client">
                    <span>⇄</span> :6033 MySQL
                  </div>
                  <div className="proxysql-port proxysql-port-admin">
                    <span>⚙</span> :6032 Admin
                  </div>
                </div>
                <div className="proxysql-routes">
                  <div className="proxysql-route route-write">
                    <span className="route-label rl-write">WRITE</span>
                    INSERT / UPDATE / DELETE → <strong style={{color:'#3fb950',marginLeft:4}}>Primary only</strong>
                  </div>
                  <div className="proxysql-route route-read">
                    <span className="route-label rl-read">READ</span>
                    SELECT → <strong style={{color:'#79c0ff',marginLeft:4}}>Replicas (load balanced)</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow: ProxySQL → pods via pod FQDN (headless service) */}
            <div className="v-arrow">
              <div className="v-arrow-line">
                <div className="v-line v-line-orange"></div>
              </div>
              <span className="v-arrow-label" style={{color:'#f0883e88'}}>pod FQDN via headless service · :3306</span>
            </div>

            {/* Pods */}
            <div className="pods-section">
              <div className="section-label">Pods · Worker Nodes</div>
              <div className="pods-grid">

                {/* Primary */}
                <div className="pod-card pod-primary">
                  <div className="pod-header">
                    <span className="pod-name">mysql-0</span>
                    <span className="pod-badge badge-primary">PRIMARY</span>
                  </div>
                  <div className="containers">
                    <div className="container-row" style={{borderColor:'#23863644',background:'var(--diag-green-pod, #081208)'}}>
                      <span className="container-icon">🐬</span>
                      <div className="container-info">
                        <div className="container-name">mysql</div>
                        <div className="container-port">:3306 · primary role</div>
                      </div>
                      <div style={{color:'#3fb950',fontSize:'10px'}}>rw</div>
                    </div>
                    <div className="container-row">
                      
                      <div className="container-info">
                        <div className="container-name">syncer</div>
                        <div className="container-port">role probe via syncerctl</div>
                      </div>
                    </div>
                    <div className="container-row">
                      
                      <div className="container-info">
                        <div className="container-name">mysql-exporter</div>
                        <div className="container-port">:9104 metrics</div>
                      </div>
                    </div>
                  </div>
                  <div className="pvc-row">PVC <strong style={{color:'#e3b341'}}>data-0</strong> · 20Gi</div>
                </div>

                {/* Replica-1 */}
                <div className="pod-card pod-replica">
                  <div className="pod-header">
                    <span className="pod-name">mysql-1</span>
                    <span className="pod-badge badge-replica">REPLICA</span>
                  </div>
                  <div className="containers">
                    <div className="container-row" style={{borderColor:'#1f6feb44',background:'var(--diag-blue-pod, #080d18)'}}>
                      <span className="container-icon">🐬</span>
                      <div className="container-info">
                        <div className="container-name">mysql</div>
                        <div className="container-port">:3306 · replica role</div>
                      </div>
                      <div style={{color:'#79c0ff',fontSize:'10px'}}>ro</div>
                    </div>
                    <div className="container-row">
                      
                      <div className="container-info">
                        <div className="container-name">syncer</div>
                        <div className="container-port">role probe via syncerctl</div>
                      </div>
                    </div>
                    <div className="container-row">
                      
                      <div className="container-info">
                        <div className="container-name">mysql-exporter</div>
                        <div className="container-port">:9104 metrics</div>
                      </div>
                    </div>
                  </div>
                  <div className="pvc-row">PVC <strong style={{color:'#e3b341'}}>data-1</strong> · 20Gi</div>
                </div>

                {/* Replica-2 */}
                <div className="pod-card pod-replica">
                  <div className="pod-header">
                    <span className="pod-name">mysql-2</span>
                    <span className="pod-badge badge-replica">REPLICA</span>
                  </div>
                  <div className="containers">
                    <div className="container-row" style={{borderColor:'#1f6feb44',background:'var(--diag-blue-pod, #080d18)'}}>
                      <span className="container-icon">🐬</span>
                      <div className="container-info">
                        <div className="container-name">mysql</div>
                        <div className="container-port">:3306 · replica role</div>
                      </div>
                      <div style={{color:'#79c0ff',fontSize:'10px'}}>ro</div>
                    </div>
                    <div className="container-row">
                      
                      <div className="container-info">
                        <div className="container-name">syncer</div>
                        <div className="container-port">role probe via syncerctl</div>
                      </div>
                    </div>
                    <div className="container-row">
                      
                      <div className="container-info">
                        <div className="container-name">mysql-exporter</div>
                        <div className="container-port">:9104 metrics</div>
                      </div>
                    </div>
                  </div>
                  <div className="pvc-row">PVC <strong style={{color:'#e3b341'}}>data-2</strong> · 20Gi</div>
                </div>

              </div>

              <div className="replication-bar">
                <span>↔</span>
                <strong>Binlog Streaming (async / semi-sync replication)</strong>
                <span style={{color:'#7d8590'}}>primary-0 → replica-1 · replica-2</span>
              </div>
            </div>

          </div>{/* /data-plane */}
        </div>{/* /main-area */}

        {/* Legend */}
        <div className="legend">
          <div className="legend-item"><span className="legend-dot" style={{background:'#f0883e'}}></span>ProxySQL (Optional)</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#3fb950'}}></span>Primary / Write</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#79c0ff'}}></span>Replica / Read</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#e3b341'}}></span>Persistent Storage</div>
        </div>

      </div>
    </>
  );
}
