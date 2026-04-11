'use client';
import React from 'react';
import { useTheme } from '@mui/material/styles';

export default function MysqlOrchestratorArchitectureDiagram() {
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
    '--diag-amber-grad': isDark ? 'linear-gradient(135deg,#1f1200,#2a1800)' : 'linear-gradient(135deg,rgba(227,179,65,0.08),rgba(227,179,65,0.14))',
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
        .mysql-orc-diagram * { box-sizing: border-box; }
        .mysql-orc-diagram {
          background: var(--diag-bg, #0d1117);
          font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: var(--diag-text, #e6edf3);
          padding: 28px;
          border-radius: 16px;
          margin-bottom: 32px;
        }
        .mysql-orc-diagram .main-area {
          display: flex; gap: 16px; align-items: flex-start;
        }
        .mysql-orc-diagram .data-plane {
          flex: 1; display: flex; flex-direction: column; gap: 0;
        }

        /* Client */
        .mysql-orc-diagram .client-mini {
          border-radius: 12px; border: 1px solid var(--diag-border, #30363d);
          background: var(--diag-card, #161b22); padding: 12px 16px;
          display: flex; align-items: center; gap: 14px;
        }
        .mysql-orc-diagram .client-label { font-size: 13px; font-weight: 600; color: var(--diag-text, #f0f6fc); }
        .mysql-orc-diagram .client-routes { font-size: 10px; color: var(--diag-muted, #7d8590); margin-top: 3px; line-height: 1.8; }

        /* Arrows */
        .mysql-orc-diagram .v-arrow {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          height: 36px;
        }
        .mysql-orc-diagram .v-arrow-line { display: flex; flex-direction: column; align-items: center; }
        .mysql-orc-diagram .v-line { width: 2px; height: 20px; position: relative; }
        .mysql-orc-diagram .v-line-green { background: linear-gradient(to bottom, #23863688, #3fb950); }
        .mysql-orc-diagram .v-line-green::after {
          content: ''; position: absolute; bottom: 0; left: 50%;
          transform: translateX(-50%);
          border-left: 5px solid transparent; border-right: 5px solid transparent;
          border-top: 7px solid #3fb950;
        }
        .mysql-orc-diagram .v-arrow-label { font-size: 9px; color: var(--diag-gray-arrow, #484f58); letter-spacing: 1px; white-space: nowrap; }
        .mysql-orc-diagram .v-line-orange { background: linear-gradient(to bottom, #f0883e88, #f0883e); }
        .mysql-orc-diagram .v-line-orange::after {
          content: ''; position: absolute; bottom: 0; left: 50%;
          transform: translateX(-50%);
          border-left: 5px solid transparent; border-right: 5px solid transparent;
          border-top: 7px solid #f0883e;
        }
        .mysql-orc-diagram .proxysql-block {
          border-radius: 12px; border: 2px dashed #f0883e;
          background: var(--diag-orange-bg2, #1a0f06); padding: 14px 16px; position: relative;
        }
        .mysql-orc-diagram .optional-badge {
          position: absolute; top: -10px; right: 14px;
          font-size: 9px; font-weight: 700; letter-spacing: 1px;
          text-transform: uppercase; padding: 2px 8px; border-radius: 10px;
          background: var(--diag-orange-bg, #3d1a00); color: #f0883e; border: 1px solid #f0883e;
        }
        .mysql-orc-diagram .proxysql-body { display: flex; align-items: flex-start; gap: 14px; margin-top: 4px; }
        .mysql-orc-diagram .proxysql-port-col { display: flex; flex-direction: column; gap: 4px; min-width: 120px; }
        .mysql-orc-diagram .proxysql-port {
          font-size: 11px; padding: 4px 8px; border-radius: 6px;
          border: 1px solid; display: flex; align-items: center; gap: 5px;
        }
        .mysql-orc-diagram .proxysql-port-client { border-color: #f0883e44; background: var(--diag-orange-bg3, #2a1200); color: #f0883e; }
        .mysql-orc-diagram .proxysql-port-admin  { border-color: var(--diag-border, #30363d); background: var(--diag-bg, #0d1117); color: var(--diag-muted, #7d8590); }
        .mysql-orc-diagram .proxysql-routes { display: flex; flex-direction: column; gap: 6px; flex: 1; }
        .mysql-orc-diagram .proxysql-route {
          display: flex; align-items: center; gap: 8px;
          font-size: 10px; padding: 5px 10px; border-radius: 6px; border: 1px solid;
        }
        .mysql-orc-diagram .route-write { border-color: #23863644; background: var(--diag-green-pod, #081208); color: var(--diag-text, #e6edf3); }
        .mysql-orc-diagram .route-read  { border-color: #1f6feb44; background: var(--diag-blue-pod, #080d18); color: var(--diag-text, #e6edf3); }
        .mysql-orc-diagram .route-label {
          font-size: 9px; font-weight: 700; letter-spacing: 1px;
          text-transform: uppercase; padding: 1px 5px; border-radius: 4px; white-space: nowrap;
        }
        .mysql-orc-diagram .rl-write { background: var(--diag-green-bg, #1a4a1a); color: #3fb950; }
        .mysql-orc-diagram .rl-read  { background: var(--diag-blue-bg, #0d2035); color: #79c0ff; }

        /* Services */
        .mysql-orc-diagram .services-block {
          border-radius: 12px; border: 1px solid #238636;
          background: var(--diag-green-bg2, #0a1a0a); padding: 14px 16px;
        }
        .mysql-orc-diagram .services-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 8px;
        }
        .mysql-orc-diagram .card-title {
          font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; margin-bottom: 10px;
          display: flex; align-items: center; gap: 6px;
        }
        .mysql-orc-diagram .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
        .mysql-orc-diagram .dot-green  { background: #3fb950; }
        .mysql-orc-diagram .dot-orange { background: #e3b341; }
        .mysql-orc-diagram .svc-card { border-radius: 8px; border: 1px solid; padding: 10px 12px; }
        .mysql-orc-diagram .svc-rw  { border-color: #3fb950; background: var(--diag-green-bg2, #0a1a0a); }
        .mysql-orc-diagram .svc-hl  { border-color: var(--diag-border, #30363d); background: var(--diag-bg, #0d1117); }
        .mysql-orc-diagram .svc-orc { border-color: #5a3a00; background: var(--diag-amber-bg, #160e00); }
        .mysql-orc-diagram .svc-name { font-size: 11px; font-weight: 700; margin-bottom: 4px; }
        .mysql-orc-diagram .svc-rw .svc-name  { color: #3fb950; }
        .mysql-orc-diagram .svc-hl .svc-name  { color: var(--diag-muted, #7d8590); }
        .mysql-orc-diagram .svc-orc .svc-name { color: #e3b341; }
        .mysql-orc-diagram .svc-detail { font-size: 10px; color: var(--diag-muted, #7d8590); line-height: 1.6; }
        .mysql-orc-diagram .svc-tag {
          display: inline-block; font-size: 9px; font-weight: 700;
          padding: 1px 6px; border-radius: 4px; margin-bottom: 4px; letter-spacing: 0.5px;
        }
        .mysql-orc-diagram .tag-green  { background: var(--diag-green-dark, #0a3020); color: #3fb950; border: 1px solid #23863655; }
        .mysql-orc-diagram .tag-gray   { background: var(--diag-separator, #21262d); color: var(--diag-muted, #8b949e); border: 1px solid var(--diag-border, #30363d); }
        .mysql-orc-diagram .tag-orange   { background: var(--diag-amber-bg, #2a1a00); color: #e3b341; border: 1px solid #5a3a0055; }
        .mysql-orc-diagram .tag-proxysql { background: var(--diag-orange-bg, #3d1a00); color: #f0883e; border: 1px solid #f0883e55; }

        /* Two-panel layout for pods */
        .mysql-orc-diagram .panels {
          display: flex; gap: 10px; align-items: stretch;
        }
        .mysql-orc-diagram .panel-mysql {
          flex: 1;
          border-radius: 12px; border: 1px solid #238636;
          background: var(--diag-green-bg2, #0a1a0a); padding: 14px;
        }
        .mysql-orc-diagram .panel-orc {
          width: 180px; flex-shrink: 0;
          border-radius: 12px; border: 1px solid #5a3a00;
          background: var(--diag-amber-bg, #160e00); padding: 14px;
          display: flex; flex-direction: column;
        }
        .mysql-orc-diagram .section-label {
          font-size: 10px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; color: var(--diag-muted, #7d8590); margin-bottom: 12px;
        }
        .mysql-orc-diagram .section-label-orange { color: #e3b341; }

        /* Pod cards */
        .mysql-orc-diagram .pods-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;
        }
        .mysql-orc-diagram .pod-card {
          border-radius: 10px; border: 1px solid; overflow: hidden;
        }
        .mysql-orc-diagram .pod-primary   { border-color: #238636; }
        .mysql-orc-diagram .pod-replica   { border-color: #1f6feb; }
        .mysql-orc-diagram .pod-orc-card  { border-color: #5a3a00; }
        .mysql-orc-diagram .pod-header {
          padding: 7px 10px;
          display: flex; align-items: center; justify-content: space-between;
          border-bottom: 1px solid;
        }
        .mysql-orc-diagram .pod-primary .pod-header   { background: var(--diag-green-grad); border-bottom-color: #238636; }
        .mysql-orc-diagram .pod-replica .pod-header   { background: var(--diag-blue-grad); border-bottom-color: #1f6feb; }
        .mysql-orc-diagram .pod-orc-card .pod-header  { background: var(--diag-amber-grad, linear-gradient(135deg,#1f1200,#2a1800)); border-bottom-color: #5a3a00; }
        .mysql-orc-diagram .pod-name  { font-size: 11px; font-weight: 700; color: var(--diag-text, #f0f6fc); }
        .mysql-orc-diagram .pod-badge {
          font-size: 8px; font-weight: 800; letter-spacing: 0.8px;
          padding: 2px 5px; border-radius: 4px; text-transform: uppercase;
        }
        .mysql-orc-diagram .badge-primary { background: var(--diag-green-dark, #0a3020); color: #3fb950; border: 1px solid #238636; }
        .mysql-orc-diagram .badge-replica { background: var(--diag-blue-bg, #0d2035); color: #79c0ff; border: 1px solid #1f6feb; }
        .mysql-orc-diagram .badge-orc     { background: var(--diag-amber-bg, #2a1800); color: #e3b341; border: 1px solid #5a3a00; }
        .mysql-orc-diagram .pod-body { padding: 7px 8px; display: flex; flex-direction: column; gap: 3px; }
        .mysql-orc-diagram .container-row {
          display: flex; align-items: center; justify-content: space-between;
          background: var(--diag-bg, #0d1117); border-radius: 5px; padding: 4px 7px;
          border: 1px solid var(--diag-separator, #21262d);
        }
        .mysql-orc-diagram .ct-name { font-size: 9px; font-weight: 600; color: var(--diag-text, #f0f6fc); }
        .mysql-orc-diagram .ct-port { font-size: 9px; color: var(--diag-muted, #7d8590); }
        .mysql-orc-diagram .pvc-row {
          display: flex; align-items: center; gap: 4px;
          font-size: 9px; color: var(--diag-muted, #7d8590); margin-top: 2px; padding: 0 2px;
        }

        /* Binlog replication bar */
        .mysql-orc-diagram .binlog-bar {
          border-radius: 7px; border: 1px dashed #23863655;
          background: var(--diag-vdark-green, #061008); padding: 6px 12px;
          display: flex; align-items: center; gap: 8px;
          margin-top: 10px;
        }
        .mysql-orc-diagram .binlog-label {
          font-size: 9px; font-weight: 700; letter-spacing: 1px;
          text-transform: uppercase; color: #3fb950; white-space: nowrap;
        }
        .mysql-orc-diagram .binlog-desc { font-size: 10px; color: var(--diag-muted, #7d8590); }

        /* Orchestrator monitoring arrows */
        .mysql-orc-diagram .monitor-connector {
          display: flex; align-items: center; gap: 6px;
          margin: 12px 0 10px;
          padding: 0 8px;
        }
        .mysql-orc-diagram .monitor-line {
          flex: 1; height: 1px;
          background: repeating-linear-gradient(to right, #e3b34166 0, #e3b34166 4px, transparent 4px, transparent 8px);
          position: relative;
        }
        .mysql-orc-diagram .monitor-line::after {
          content: '▶'; position: absolute; right: -4px; top: 50%;
          transform: translateY(-50%); color: #e3b341; font-size: 8px;
        }
        .mysql-orc-diagram .monitor-label {
          font-size: 9px; color: #e3b341; letter-spacing: 0.5px; white-space: nowrap;
        }

        /* Orchestrator pod (tall, single column) */
        .mysql-orc-diagram .orc-pod-full {
          border-radius: 10px; border: 1px solid #5a3a00; overflow: hidden;
          flex: 1;
        }
        .mysql-orc-diagram .orc-pod-header {
          padding: 8px 12px;
          background: var(--diag-amber-grad, linear-gradient(135deg,#1f1200,#2a1800));
          border-bottom: 1px solid #5a3a00;
          display: flex; align-items: center; justify-content: space-between;
        }
        .mysql-orc-diagram .orc-pod-body { padding: 8px 10px; display: flex; flex-direction: column; gap: 4px; }
        .mysql-orc-diagram .orc-feature {
          font-size: 9px; color: var(--diag-muted, #7d8590); line-height: 1.6;
          padding: 4px 6px; background: var(--diag-bg, #0d1117);
          border-radius: 4px; border: 1px solid var(--diag-separator, #21262d);
        }

        /* Legend */
        .mysql-orc-diagram .legend {
          display: flex; flex-wrap: wrap; gap: 12px;
          margin-top: 16px; padding-top: 14px;
          border-top: 1px solid var(--diag-separator, #21262d);
        }
        .mysql-orc-diagram .legend-item { display: flex; align-items: center; gap: 6px; font-size: 10px; color: var(--diag-muted, #8b949e); }
        .mysql-orc-diagram .legend-dot  { width: 8px; height: 8px; border-radius: 50%; }
        .mysql-orc-diagram .legend-dash {
          width: 20px; height: 1px;
          background: repeating-linear-gradient(to right, #e3b341 0, #e3b341 4px, transparent 4px, transparent 8px);
        }
      `}</style>

      <div className="mysql-orc-diagram" style={diagVars}>
        {/* Header */}
        <div style={{marginBottom: '20px'}}>
          <div style={{fontSize: '13px', fontWeight: 700, color: '#f0f6fc', letterSpacing: '0.5px', marginBottom: '4px'}}>
            MySQL + Orchestrator — KubeBlocks
          </div>
          <div style={{fontSize: '11px', color: '#7d8590'}}>
            Semi-sync binlog replication · Orchestrator monitors topology and drives automated failover
          </div>
        </div>

        <div className="main-area">
          {/* LEFT: data plane */}
          <div className="data-plane">
            {/* Client */}
            <div className="client-mini">
              <div style={{fontSize: '18px'}}>💻</div>
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
                <span className="dot dot-green" style={{background:'#8b949e'}}></span> Kubernetes Services
              </div>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginTop:'8px'}}>
                <div className="svc-card" style={{borderColor:'#f0883e44',background:'var(--diag-orange-bg2, #1a0f06)',position:'relative'}}>
                  <span style={{position:'absolute',top:-9,right:8,fontSize:'9px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',padding:'1px 6px',borderRadius:10,background:'var(--diag-orange-bg, #3d1a00)',color:'#f0883e',border:'1px solid #f0883e'}}>Optional</span>
                  <div className="svc-tag tag-proxysql">ProxySQL</div>
                  <div className="svc-name" style={{color:'#f0883e'}}>mysql-cluster-proxysql</div>
                  <div className="svc-detail">ClusterIP · :6033<br/>Read/Write splitting</div>
                </div>
                <div className="svc-card svc-rw">
                  <div className="svc-tag tag-green">ClusterIP</div>
                  <div className="svc-name">mysql-cluster-mysql-server</div>
                  <div className="svc-detail">Port 3306<br/><code style={{color:'#7d8590',fontSize:'9px'}}>no roleSelector</code></div>
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
                <span className="dot dot-orange"></span>
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
                    SELECT → <strong style={{color:'#79c0ff',marginLeft:4}}>Replicas (load balanced)</strong>
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

            {/* Two panels: MySQL pods + Orchestrator pod */}
            <div className="panels">
              {/* MySQL pods */}
              <div className="panel-mysql">
                <div className="section-label">Component (mysql) · Pods</div>
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
                        <span className="ct-name">syncer</span>
                        <span className="ct-port">syncerctl</span>
                      </div>
                      <div className="container-row">
                        <span className="ct-name">exporter</span>
                        <span className="ct-port">:9104</span>
                      </div>
                      <div className="pvc-row">PVC</div>
                    </div>
                  </div>
                  {/* mysql-1 REPLICA */}
                  <div className="pod-card pod-replica">
                    <div className="pod-header">
                      <span className="pod-name">mysql-1</span>
                      <span className="pod-badge badge-replica">REPLICA</span>
                    </div>
                    <div className="pod-body">
                      <div className="container-row">
                        <span className="ct-name">mysql</span>
                        <span className="ct-port">:3306</span>
                      </div>
                      <div className="container-row">
                        <span className="ct-name">syncer</span>
                        <span className="ct-port">syncerctl</span>
                      </div>
                      <div className="container-row">
                        <span className="ct-name">exporter</span>
                        <span className="ct-port">:9104</span>
                      </div>
                      <div className="pvc-row">PVC</div>
                    </div>
                  </div>
                  {/* mysql-2 REPLICA */}
                  <div className="pod-card pod-replica">
                    <div className="pod-header">
                      <span className="pod-name">mysql-2</span>
                      <span className="pod-badge badge-replica">REPLICA</span>
                    </div>
                    <div className="pod-body">
                      <div className="container-row">
                        <span className="ct-name">mysql</span>
                        <span className="ct-port">:3306</span>
                      </div>
                      <div className="container-row">
                        <span className="ct-name">syncer</span>
                        <span className="ct-port">syncerctl</span>
                      </div>
                      <div className="container-row">
                        <span className="ct-name">exporter</span>
                        <span className="ct-port">:9104</span>
                      </div>
                      <div className="pvc-row">PVC</div>
                    </div>
                  </div>
                </div>
                {/* Binlog replication bar */}
                <div className="binlog-bar">
                  <span className="binlog-label">Binlog</span>
                  <span className="binlog-desc">semi-sync replication — primary → replicas</span>
                </div>
              </div>

              {/* Orchestrator pod */}
              <div className="panel-orc">
                <div className="section-label section-label-orange">Separate Orchestrator Cluster</div>

                {/* Monitoring arrow pointing left */}
                <div className="monitor-connector">
                  <span className="monitor-label">polls :3306</span>
                  <div className="monitor-line" style={{transform:'scaleX(-1)'}}></div>
                </div>

                <div className="orc-pod-full">
                  <div className="orc-pod-header">
                    <span className="pod-name">orchestrator-0</span>
                    <span className="pod-badge badge-orc">ORC</span>
                  </div>
                  <div className="orc-pod-body">
                    <div className="container-row">
                      <span className="ct-name">orchestrator</span>
                      <span className="ct-port" style={{color:'#e3b341'}}>:3000</span>
                    </div>
                    <div className="orc-feature">Topology discovery</div>
                    <div className="orc-feature">Failure detection</div>
                    <div className="orc-feature">Auto failover</div>
                    <div className="orc-feature">Web UI + API</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Legend */}
        <div className="legend">
          <div className="legend-item"><span className="legend-dot" style={{background:'#f0883e'}}></span>ProxySQL (Optional)</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#3fb950'}}></span>Primary Pod</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#79c0ff'}}></span>Replica Pod</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#e3b341'}}></span>Orchestrator Pod</div>
          <div className="legend-item"><span className="legend-dash"></span>Orchestrator polls MySQL :3306</div>
        </div>
      </div>
    </>
  );
}
