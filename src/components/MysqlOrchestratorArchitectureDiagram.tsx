import React from 'react';

export default function MysqlOrchestratorArchitectureDiagram() {
  return (
    <>
      <style>{`
        .mysql-orc-diagram * { box-sizing: border-box; }
        .mysql-orc-diagram {
          background: #0d1117;
          font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: #e6edf3;
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
        .mysql-orc-diagram .mgmt-sidebar {
          width: 260px; flex-shrink: 0;
          display: flex; flex-direction: column; gap: 12px; padding-top: 4px;
        }

        /* Client */
        .mysql-orc-diagram .client-mini {
          border-radius: 12px; border: 1px solid #30363d;
          background: #161b22; padding: 12px 16px;
          display: flex; align-items: center; gap: 14px;
        }
        .mysql-orc-diagram .client-label { font-size: 13px; font-weight: 600; color: #f0f6fc; }
        .mysql-orc-diagram .client-routes { font-size: 10px; color: #7d8590; margin-top: 3px; line-height: 1.8; }

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
        .mysql-orc-diagram .v-arrow-label { font-size: 9px; color: #484f58; letter-spacing: 1px; white-space: nowrap; }

        /* Services */
        .mysql-orc-diagram .services-block {
          border-radius: 12px; border: 1px solid #238636;
          background: #0a1a0a; padding: 14px 16px;
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
        .mysql-orc-diagram .svc-rw  { border-color: #3fb950; background: #0a1a0a; }
        .mysql-orc-diagram .svc-hl  { border-color: #30363d; background: #0d1117; }
        .mysql-orc-diagram .svc-orc { border-color: #5a3a00; background: #160e00; }
        .mysql-orc-diagram .svc-name { font-size: 11px; font-weight: 700; margin-bottom: 4px; }
        .mysql-orc-diagram .svc-rw .svc-name  { color: #3fb950; }
        .mysql-orc-diagram .svc-hl .svc-name  { color: #7d8590; }
        .mysql-orc-diagram .svc-orc .svc-name { color: #e3b341; }
        .mysql-orc-diagram .svc-detail { font-size: 10px; color: #7d8590; line-height: 1.6; }
        .mysql-orc-diagram .svc-tag {
          display: inline-block; font-size: 9px; font-weight: 700;
          padding: 1px 6px; border-radius: 4px; margin-bottom: 4px; letter-spacing: 0.5px;
        }
        .mysql-orc-diagram .tag-green  { background: #0a3020; color: #3fb950; border: 1px solid #23863655; }
        .mysql-orc-diagram .tag-gray   { background: #21262d; color: #8b949e; border: 1px solid #30363d; }
        .mysql-orc-diagram .tag-orange { background: #2a1a00; color: #e3b341; border: 1px solid #5a3a0055; }

        /* Two-panel layout for pods */
        .mysql-orc-diagram .panels {
          display: flex; gap: 10px; align-items: stretch;
        }
        .mysql-orc-diagram .panel-mysql {
          flex: 1;
          border-radius: 12px; border: 1px solid #238636;
          background: #0a1a0a; padding: 14px;
        }
        .mysql-orc-diagram .panel-orc {
          width: 180px; flex-shrink: 0;
          border-radius: 12px; border: 1px solid #5a3a00;
          background: #160e00; padding: 14px;
          display: flex; flex-direction: column;
        }
        .mysql-orc-diagram .section-label {
          font-size: 10px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; color: #7d8590; margin-bottom: 12px;
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
        .mysql-orc-diagram .pod-primary .pod-header   { background: linear-gradient(135deg,#0a1f0a,#122112); border-bottom-color: #238636; }
        .mysql-orc-diagram .pod-replica .pod-header   { background: linear-gradient(135deg,#0d1f38,#162840); border-bottom-color: #1f6feb; }
        .mysql-orc-diagram .pod-orc-card .pod-header  { background: linear-gradient(135deg,#1f1200,#2a1800); border-bottom-color: #5a3a00; }
        .mysql-orc-diagram .pod-name  { font-size: 11px; font-weight: 700; color: #f0f6fc; }
        .mysql-orc-diagram .pod-badge {
          font-size: 8px; font-weight: 800; letter-spacing: 0.8px;
          padding: 2px 5px; border-radius: 4px; text-transform: uppercase;
        }
        .mysql-orc-diagram .badge-primary { background: #0a3020; color: #3fb950; border: 1px solid #238636; }
        .mysql-orc-diagram .badge-replica { background: #0d2035; color: #79c0ff; border: 1px solid #1f6feb; }
        .mysql-orc-diagram .badge-orc     { background: #2a1800; color: #e3b341; border: 1px solid #5a3a00; }
        .mysql-orc-diagram .pod-body { padding: 7px 8px; display: flex; flex-direction: column; gap: 3px; }
        .mysql-orc-diagram .container-row {
          display: flex; align-items: center; justify-content: space-between;
          background: #0d1117; border-radius: 5px; padding: 4px 7px;
          border: 1px solid #21262d;
        }
        .mysql-orc-diagram .ct-name { font-size: 9px; font-weight: 600; color: #f0f6fc; }
        .mysql-orc-diagram .ct-port { font-size: 9px; color: #7d8590; }
        .mysql-orc-diagram .pvc-row {
          display: flex; align-items: center; gap: 4px;
          font-size: 9px; color: #7d8590; margin-top: 2px; padding: 0 2px;
        }

        /* Binlog replication bar */
        .mysql-orc-diagram .binlog-bar {
          border-radius: 7px; border: 1px dashed #23863655;
          background: #061008; padding: 6px 12px;
          display: flex; align-items: center; gap: 8px;
          margin-top: 10px;
        }
        .mysql-orc-diagram .binlog-label {
          font-size: 9px; font-weight: 700; letter-spacing: 1px;
          text-transform: uppercase; color: #3fb950; white-space: nowrap;
        }
        .mysql-orc-diagram .binlog-desc { font-size: 10px; color: #7d8590; }

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
          background: linear-gradient(135deg,#1f1200,#2a1800);
          border-bottom: 1px solid #5a3a00;
          display: flex; align-items: center; justify-content: space-between;
        }
        .mysql-orc-diagram .orc-pod-body { padding: 8px 10px; display: flex; flex-direction: column; gap: 4px; }
        .mysql-orc-diagram .orc-feature {
          font-size: 9px; color: #7d8590; line-height: 1.6;
          padding: 4px 6px; background: #0d1117;
          border-radius: 4px; border: 1px solid #21262d;
        }

        /* Sidebar cards */
        .mysql-orc-diagram .sb-card {
          border-radius: 10px; border: 1px solid #30363d;
          background: #161b22; padding: 14px;
        }
        .mysql-orc-diagram .sb-title {
          font-size: 10px; font-weight: 700; letter-spacing: 1px;
          text-transform: uppercase; margin-bottom: 10px;
        }
        .mysql-orc-diagram .step {
          display: flex; align-items: flex-start; gap: 8px;
          font-size: 10px; color: #8b949e; line-height: 1.5; margin-bottom: 6px;
        }
        .mysql-orc-diagram .step-num {
          display: inline-flex; align-items: center; justify-content: center;
          width: 16px; height: 16px; border-radius: 50%;
          background: #21262d; color: #f0f6fc;
          font-size: 9px; font-weight: 700; flex-shrink: 0; margin-top: 1px;
        }
        .mysql-orc-diagram .info-row {
          display: flex; align-items: flex-start; gap: 6px;
          font-size: 10px; color: #8b949e; line-height: 1.5; margin-bottom: 5px;
        }
        .mysql-orc-diagram .info-key {
          color: #f0f6fc; font-weight: 600; min-width: 68px; flex-shrink: 0;
        }

        /* CRD chain */
        .mysql-orc-diagram .crd-section {
          border-radius: 10px; border: 1px solid #30363d;
          background: #161b22; padding: 14px;
        }
        .mysql-orc-diagram .crd-chain { display: flex; flex-direction: column; gap: 5px; margin-top: 8px; }
        .mysql-orc-diagram .crd-row   { display: flex; align-items: center; gap: 6px; }
        .mysql-orc-diagram .crd-chip {
          font-size: 10px; font-weight: 700; padding: 3px 8px;
          border-radius: 5px; white-space: nowrap;
        }
        .mysql-orc-diagram .crd-chip.cluster     { background: #1a2a0a; color: #7ee787; border: 1px solid #2ea04344; }
        .mysql-orc-diagram .crd-chip.component   { background: #0d1f38; color: #79c0ff; border: 1px solid #1f6feb44; }
        .mysql-orc-diagram .crd-chip.comp-orc    { background: #2a1800; color: #e3b341; border: 1px solid #5a3a0044; }
        .mysql-orc-diagram .crd-chip.instanceset { background: #1a0d2e; color: #c084fc; border: 1px solid #6e40c944; }
        .mysql-orc-diagram .crd-chip.pod         { background: #1c1400; color: #e3b341; border: 1px solid #e3b34144; }
        .mysql-orc-diagram .crd-arrow { color: #484f58; font-size: 12px; }

        /* Legend */
        .mysql-orc-diagram .legend {
          display: flex; flex-wrap: wrap; gap: 12px;
          margin-top: 16px; padding-top: 14px;
          border-top: 1px solid #21262d;
        }
        .mysql-orc-diagram .legend-item { display: flex; align-items: center; gap: 6px; font-size: 10px; color: #8b949e; }
        .mysql-orc-diagram .legend-dot  { width: 8px; height: 8px; border-radius: 50%; }
        .mysql-orc-diagram .legend-dash {
          width: 20px; height: 1px;
          background: repeating-linear-gradient(to right, #e3b341 0, #e3b341 4px, transparent 4px, transparent 8px);
        }
      `}</style>

      <div className="mysql-orc-diagram">
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
                  Write&nbsp; <code style={{color:'#3fb950'}}>mysql-cluster-mysql-server:3306</code><br/>
                  Orc UI&nbsp; <code style={{color:'#e3b341'}}>{'{orc-cluster}'}-orchestrator:80</code>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="v-arrow">
              <div className="v-arrow-line">
                <div className="v-line v-line-green"></div>
              </div>
              <span className="v-arrow-label" style={{color:'#3fb95088'}}>no roleSelector · all ready pods</span>
            </div>

            {/* Services */}
            <div className="services-block">
              <div className="card-title">
                <span className="dot dot-green"></span> Kubernetes Services
              </div>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'10px', marginTop:'8px'}}>
                <div className="svc-card svc-rw">
                  <div className="svc-tag tag-green">ClusterIP</div>
                  <div className="svc-name">mysql-cluster-mysql-server</div>
                  <div className="svc-detail">Port 3306<br/><code style={{color:'#7d8590',fontSize:'9px'}}>no roleSelector</code></div>
                </div>
                <div className="svc-card svc-hl">
                  <div className="svc-tag tag-gray">Headless</div>
                  <div className="svc-name">mysql-cluster-mysql-headless</div>
                  <div className="svc-detail">Port 3306<br/>all MySQL pods</div>
                </div>
                <div className="svc-card svc-orc">
                  <div className="svc-tag tag-orange">ClusterIP (separate cluster)</div>
                  <div className="svc-name">{'{orc-cluster}'}-orchestrator</div>
                  <div className="svc-detail">Port 80 (orc-http svc)<br/>container listens :3000</div>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="v-arrow">
              <div className="v-arrow-line">
                <div className="v-line v-line-green"></div>
              </div>
              <span className="v-arrow-label" style={{color:'#3fb95088'}}>→ all MySQL pods</span>
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
                      <div className="pvc-row">💾 PVC</div>
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
                      <div className="pvc-row">💾 PVC</div>
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
                      <div className="pvc-row">💾 PVC</div>
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

          {/* RIGHT: sidebar */}
          <div className="mgmt-sidebar">
            {/* Failover steps */}
            <div className="sb-card">
              <div className="sb-title" style={{color:'#e3b341'}}>⚡ Failover by Orchestrator</div>
              <div className="step"><span className="step-num">1</span>Orchestrator polls all MySQL pods; primary stops responding</div>
              <div className="step"><span className="step-num">2</span>Orchestrator identifies replica with most advanced relay log</div>
              <div className="step"><span className="step-num">3</span>Orchestrator promotes chosen replica and reconnects remaining replicas</div>
              <div className="step"><span className="step-num">4</span>exec roleProbe (orchestrator-client) detects new master → updates kubeblocks.io/role label</div>
              <div className="step"><span className="step-num">5</span>mysql-server has no roleSelector — load-balances to all pods; use orc-proxysql for write-only routing</div>
            </div>

            {/* Orchestrator capabilities */}
            <div className="sb-card">
              <div className="sb-title" style={{color:'#8b949e'}}>🔭 Orchestrator Features</div>
              <div className="info-row"><span className="info-key">Monitoring:</span><span>Continuous replication topology polling via SHOW SLAVE STATUS</span></div>
              <div className="info-row"><span className="info-key">Web UI:</span><span>Visual replication graph; manual promote / relocate operations</span></div>
              <div className="info-row"><span className="info-key">HTTP API:</span><span>Web UI + programmatic topology management; Service port :80 (container :3000)</span></div>
              <div className="info-row"><span className="info-key">Recovery:</span><span>Configurable hooks for pre/post failover actions</span></div>
            </div>

            {/* CRD chain */}
            <div className="crd-section">
              <div className="sb-title" style={{color:'#8b949e'}}>📦 Resource Hierarchy</div>
              <div className="crd-chain">
                <div className="crd-row">
                  <div className="crd-chip cluster">MySQL Cluster</div>
                </div>
                <div className="crd-row" style={{paddingLeft:'12px'}}>
                  <span className="crd-arrow">↓</span>
                  <div className="crd-chip component">Component (mysql)</div>
                </div>
                <div className="crd-row" style={{paddingLeft:'24px'}}>
                  <span className="crd-arrow">↓</span>
                  <div className="crd-chip instanceset">InstanceSet → Pod × N</div>
                </div>
                <div className="crd-row" style={{marginTop:'8px'}}>
                  <div className="crd-chip comp-orc">Orchestrator Cluster</div>
                </div>
                <div className="crd-row" style={{paddingLeft:'12px'}}>
                  <span className="crd-arrow">↓</span>
                  <div className="crd-chip comp-orc">Component (orchestrator)</div>
                </div>
                <div className="crd-row" style={{paddingLeft:'24px'}}>
                  <span className="crd-arrow">↓</span>
                  <div className="crd-chip pod">Pod × N</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="legend">
          <div className="legend-item"><span className="legend-dot" style={{background:'#3fb950'}}></span>Primary Pod</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#79c0ff'}}></span>Replica Pod</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#e3b341'}}></span>Orchestrator Pod</div>
          <div className="legend-item"><span className="legend-dash"></span>Orchestrator polls MySQL :3306</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#3fb950',opacity:0.5}}></span>Semi-sync Binlog Replication</div>
        </div>
      </div>
    </>
  );
}
