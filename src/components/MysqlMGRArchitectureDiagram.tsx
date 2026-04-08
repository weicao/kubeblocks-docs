import React from 'react';

export default function MysqlMGRArchitectureDiagram() {
  return (
    <>
      <style>{`
        .mysql-mgr-diagram * { box-sizing: border-box; }
        .mysql-mgr-diagram {
          background: #0d1117;
          font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: #e6edf3;
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
          border-radius: 12px; border: 1px solid #30363d;
          background: #161b22; padding: 12px 16px;
          display: flex; align-items: center; gap: 14px;
        }
        .mysql-mgr-diagram .client-label { font-size: 13px; font-weight: 600; color: #f0f6fc; }
        .mysql-mgr-diagram .client-routes { font-size: 10px; color: #7d8590; margin-top: 3px; line-height: 1.8; }
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
        .mysql-mgr-diagram .v-line-gray { background: linear-gradient(to bottom, #30363d88, #484f58); }
        .mysql-mgr-diagram .v-line-gray::after {
          content: ''; position: absolute; bottom: 0; left: 50%;
          transform: translateX(-50%);
          border-left: 5px solid transparent; border-right: 5px solid transparent;
          border-top: 7px solid #484f58;
        }
        .mysql-mgr-diagram .v-arrow-label { font-size: 9px; color: #484f58; letter-spacing: 1px; white-space: nowrap; }
        .mysql-mgr-diagram .services-block {
          border-radius: 12px; border: 1px solid #238636;
          background: #0a1a0a; padding: 14px 16px;
        }
        .mysql-mgr-diagram .services-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 8px;
        }
        .mysql-mgr-diagram .svc-card { border-radius: 8px; border: 1px solid; padding: 10px 12px; }
        .mysql-mgr-diagram .svc-rw   { border-color: #3fb950; background: #0a1a0a; }
        .mysql-mgr-diagram .svc-hl   { border-color: #30363d; background: #0d1117; }
        .mysql-mgr-diagram .svc-name { font-size: 12px; font-weight: 700; margin-bottom: 4px; }
        .mysql-mgr-diagram .svc-rw .svc-name { color: #3fb950; }
        .mysql-mgr-diagram .svc-hl .svc-name { color: #7d8590; }
        .mysql-mgr-diagram .svc-detail { font-size: 10px; color: #7d8590; line-height: 1.6; }
        .mysql-mgr-diagram .svc-tag {
          display: inline-block; font-size: 9px; font-weight: 700;
          padding: 1px 6px; border-radius: 4px; margin-bottom: 4px; letter-spacing: 0.5px;
        }
        .mysql-mgr-diagram .tag-green  { background: #0a3020; color: #3fb950; border: 1px solid #23863655; }
        .mysql-mgr-diagram .tag-gray   { background: #21262d; color: #8b949e; border: 1px solid #30363d; }
        .mysql-mgr-diagram .tag-teal   { background: #062020; color: #56d4dd; border: 1px solid #1b7c8355; }
        .mysql-mgr-diagram .tag-orange { background: #2a1a00; color: #e3b341; border: 1px solid #5a3a0055; }

        /* Pods section */
        .mysql-mgr-diagram .pods-section {
          border-radius: 12px; border: 1px solid #30363d;
          background: #161b22; padding: 16px;
        }
        .mysql-mgr-diagram .section-label {
          font-size: 10px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; color: #7d8590; margin-bottom: 12px;
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
        .mysql-mgr-diagram .pod-secondary .pod-header { background: linear-gradient(135deg,#0d1f38,#162840); border-bottom-color: #1f6feb; }
        .mysql-mgr-diagram .pod-name   { font-size: 11px; font-weight: 700; color: #f0f6fc; }
        .mysql-mgr-diagram .pod-badge  {
          font-size: 8px; font-weight: 800; letter-spacing: 0.8px;
          padding: 2px 6px; border-radius: 4px; text-transform: uppercase;
        }
        .mysql-mgr-diagram .badge-primary   { background: #0a3020; color: #3fb950; border: 1px solid #238636; }
        .mysql-mgr-diagram .badge-secondary { background: #0d2035; color: #79c0ff; border: 1px solid #1f6feb; }
        .mysql-mgr-diagram .pod-body { padding: 8px 10px; display: flex; flex-direction: column; gap: 4px; }
        .mysql-mgr-diagram .container-row {
          display: flex; align-items: center; justify-content: space-between;
          background: #0d1117; border-radius: 6px; padding: 5px 8px;
          border: 1px solid #21262d;
        }
        .mysql-mgr-diagram .ct-name  { font-size: 10px; font-weight: 600; color: #f0f6fc; }
        .mysql-mgr-diagram .ct-port  { font-size: 9px; color: #7d8590; }
        .mysql-mgr-diagram .ct-port-teal { color: #56d4dd; }
        .mysql-mgr-diagram .ct-port-muted { font-size: 9px; color: #484f58; font-style: italic; }
        .mysql-mgr-diagram .pvc-row {
          display: flex; align-items: center; gap: 5px;
          font-size: 9px; color: #7d8590; margin-top: 2px; padding: 0 2px;
        }

        /* Group Replication gossip bar */
        .mysql-mgr-diagram .gr-bar {
          border-radius: 8px; border: 1px dashed #1b7c83;
          background: #061515; padding: 8px 14px;
          display: flex; align-items: center; gap: 8px;
          margin-top: 10px;
        }
        .mysql-mgr-diagram .gr-bar-label {
          font-size: 9px; font-weight: 700; letter-spacing: 1px;
          text-transform: uppercase; color: #56d4dd; white-space: nowrap;
        }
        .mysql-mgr-diagram .gr-bar-desc {
          font-size: 10px; color: #7d8590;
        }

        /* Legend */
        .mysql-mgr-diagram .legend {
          display: flex; flex-wrap: wrap; gap: 12px;
          margin-top: 16px; padding-top: 14px;
          border-top: 1px solid #21262d;
        }
        .mysql-mgr-diagram .legend-item { display: flex; align-items: center; gap: 6px; font-size: 10px; color: #8b949e; }
        .mysql-mgr-diagram .legend-dot  { width: 8px; height: 8px; border-radius: 50%; }
      `}</style>

      <div className="mysql-mgr-diagram">
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
                  Write&nbsp; <code style={{color:'#3fb950'}}>mysql-cluster-mysql:3306</code>
                </div>
              </div>
            </div>

            {/* Arrow: client → service */}
            <div className="v-arrow">
              <div className="v-arrow-line">
                <div className="v-line v-line-green"></div>
              </div>
              <span className="v-arrow-label" style={{color:'#3fb95088'}}>write traffic → primary :3306</span>
            </div>

            {/* Services */}
            <div className="services-block">
              <div className="card-title">
                <span className="dot dot-green"></span> Kubernetes Services
              </div>
              <div className="services-grid">
                <div className="svc-card svc-rw">
                  <div className="svc-tag tag-green">ClusterIP</div>
                  <div className="svc-name">mysql-cluster-mysql</div>
                  <div className="svc-detail">
                    Port 3306<br/>
                    <code style={{color:'#3fb950',fontSize:'9px'}}>roleSelector: primary</code>
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow: service → pods */}
            <div className="v-arrow">
              <div className="v-arrow-line">
                <div className="v-line v-line-green"></div>
              </div>
              <span className="v-arrow-label" style={{color:'#3fb95088'}}>→ primary pod</span>
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
          <div className="legend-item"><span className="legend-dot" style={{background:'#3fb950'}}></span>Primary Pod (writes)</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#79c0ff'}}></span>Secondary Pod (replicated)</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#56d4dd'}}></span>Group Replication Communication :33061</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#e3b341'}}></span>Paxos Consensus / Certification</div>
        </div>
      </div>
    </>
  );
}
