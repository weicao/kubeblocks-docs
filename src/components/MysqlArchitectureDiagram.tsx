import React from 'react';

export default function MysqlArchitectureDiagram() {
  return (
    <>
      <style>{`
        .mysql-ha-diagram * { box-sizing: border-box; }
        .mysql-ha-diagram {
          background: #0d1117;
          font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: #e6edf3;
          padding: 28px;
          border-radius: 16px;
          margin-bottom: 32px;
        }
        .mysql-ha-diagram .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
        .mysql-ha-diagram .dot-blue   { background: #388bfd; }
        .mysql-ha-diagram .dot-green  { background: #3fb950; }
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
          border-radius: 12px; border: 1px solid #30363d;
          background: #161b22; padding: 12px 16px;
          display: flex; align-items: center; gap: 14px;
        }
        .mysql-ha-diagram .client-label { font-size: 13px; font-weight: 600; color: #f0f6fc; }
        .mysql-ha-diagram .client-routes { font-size: 10px; color: #7d8590; margin-top: 3px; line-height: 1.8; }
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
        .mysql-ha-diagram .v-line-gray { background: linear-gradient(to bottom, #30363d88, #484f58); }
        .mysql-ha-diagram .v-line-gray::after {
          content: ''; position: absolute; bottom: 0; left: 50%;
          transform: translateX(-50%);
          border-left: 5px solid transparent; border-right: 5px solid transparent;
          border-top: 7px solid #484f58;
        }
        .mysql-ha-diagram .v-arrow-label { font-size: 9px; color: #484f58; letter-spacing: 1px; white-space: nowrap; }
        .mysql-ha-diagram .services-block {
          border-radius: 12px; border: 1px solid #238636;
          background: #0a1a0a; padding: 14px 16px;
        }
        .mysql-ha-diagram .services-grid {
          display: grid; grid-template-columns: 1fr; gap: 10px; margin-top: 8px;
        }
        .mysql-ha-diagram .svc-card { border-radius: 8px; border: 1px solid; padding: 10px 12px; }
        .mysql-ha-diagram .svc-rw { border-color: #3fb950; background: #0a1a0a; }
        .mysql-ha-diagram .svc-hl { border-color: #30363d; background: #0d1117; }
        .mysql-ha-diagram .svc-name { font-size: 12px; font-weight: 700; margin-bottom: 4px; }
        .mysql-ha-diagram .svc-rw .svc-name { color: #3fb950; }
        .mysql-ha-diagram .svc-hl .svc-name { color: #7d8590; }
        .mysql-ha-diagram .svc-detail { font-size: 10px; color: #7d8590; line-height: 1.6; }
        .mysql-ha-diagram .svc-tag {
          display: inline-block; font-size: 9px; font-weight: 700;
          letter-spacing: 1px; padding: 2px 6px; border-radius: 4px;
          text-transform: uppercase; margin-top: 4px;
        }
        .mysql-ha-diagram .tag-green { background: #1a4a1a; color: #3fb950; }
        .mysql-ha-diagram .tag-gray  { background: #21262d; color: #8b949e; }
        .mysql-ha-diagram .section-label {
          font-size: 10px; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; color: #7d8590; margin-bottom: 8px;
        }
        .mysql-ha-diagram .pods-section {
          border-radius: 12px; border: 1px solid #30363d;
          background: #0d1117; padding: 16px;
        }
        .mysql-ha-diagram .pods-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 10px;
        }
        .mysql-ha-diagram .pod-card { border-radius: 10px; border: 1px solid #30363d; background: #161b22; overflow: hidden; }
        .mysql-ha-diagram .pod-header {
          padding: 9px 12px; display: flex; align-items: center; justify-content: space-between;
          border-bottom: 1px solid #21262d;
        }
        .mysql-ha-diagram .pod-primary .pod-header { background: linear-gradient(135deg,#0d2510,#1a3820); border-bottom-color: #238636; }
        .mysql-ha-diagram .pod-replica .pod-header { background: linear-gradient(135deg,#0d1f38,#162840); border-bottom-color: #1f6feb; }
        .mysql-ha-diagram .pod-name { font-size: 11px; font-weight: 700; color: #f0f6fc; }
        .mysql-ha-diagram .pod-badge {
          font-size: 9px; font-weight: 700; letter-spacing: 1px;
          text-transform: uppercase; padding: 2px 7px; border-radius: 10px;
        }
        .mysql-ha-diagram .badge-primary { background: #1a4a1a; color: #3fb950; border: 1px solid #238636; }
        .mysql-ha-diagram .badge-replica { background: #0d2035; color: #79c0ff; border: 1px solid #1f6feb; }
        .mysql-ha-diagram .containers { padding: 8px; display: flex; flex-direction: column; gap: 4px; }
        .mysql-ha-diagram .container-row {
          display: flex; align-items: center; gap: 7px; padding: 5px 8px;
          border-radius: 6px; border: 1px solid #21262d; background: #0d1117;
        }
        .mysql-ha-diagram .container-icon { font-size: 13px; }
        .mysql-ha-diagram .container-info { flex: 1; }
        .mysql-ha-diagram .container-name { font-size: 11px; font-weight: 600; color: #e6edf3; }
        .mysql-ha-diagram .container-port { font-size: 10px; color: #7d8590; }
        .mysql-ha-diagram .pvc-row {
          margin: 0 8px 8px; padding: 5px 8px; border-radius: 6px;
          border: 1px dashed #30363d; background: #0d1117;
          display: flex; align-items: center; gap: 6px; font-size: 10px; color: #7d8590;
        }
        .mysql-ha-diagram .replication-bar {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 7px; border-radius: 8px; background: #0a1a14;
          border: 1px solid #238636; margin-top: 10px; font-size: 11px; color: #3fb950;
        }
                .mysql-ha-diagram .legend {
          display: flex; gap: 18px; flex-wrap: wrap; justify-content: center;
          padding-top: 8px; border-top: 1px solid #21262d; margin-top: 16px;
        }
        .mysql-ha-diagram .legend-item { display: flex; align-items: center; gap: 5px; font-size: 10px; color: #7d8590; }
        .mysql-ha-diagram .legend-dot { width: 8px; height: 8px; border-radius: 50%; }
      `}</style>

      <div className="mysql-ha-diagram">

        {/* ══ MAIN AREA: data plane (left) + sidebar (right) ══ */}
        <div className="main-area">

          {/* LEFT: Client → Service → Pods */}
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
                  Read/Write&nbsp; <code style={{color:'#3fb950'}}>mysql-cluster-mysql:3306</code>
                </div>
              </div>
            </div>

            {/* Arrow: Client → Service */}
            <div className="v-arrow">
              <div className="v-arrow-line">
                <div className="v-line v-line-green"></div>
              </div>
              <span className="v-arrow-label" style={{color:'#3fb95088'}}>RW traffic → roleSelector: primary</span>
            </div>

            {/* Services */}
            <div className="services-block">
              <div className="card-title" style={{color:'#3fb950'}}>
                <span className="dot dot-green"></span>
                Kubernetes Services
              </div>
              <div className="services-grid">
                <div className="svc-card svc-rw">
                  <div className="svc-name">mysql-cluster-mysql</div>
                  <div className="svc-detail">
                    ClusterIP · :3306<br/>
                    selector: <code style={{color:'#3fb950'}}>kubeblocks.io/role=primary</code><br/>
                    Endpoints auto-switch with primary
                  </div>
                  <span className="svc-tag tag-green">ReadWrite</span>
                </div>
              </div>
            </div>

            {/* Arrow: Service → Pods */}
            <div className="v-arrow">
              <div className="v-arrow-line">
                <div className="v-line v-line-green"></div>
              </div>
              <span className="v-arrow-label" style={{color:'#3fb95088'}}>→ primary pod only</span>
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
                    <div className="container-row" style={{borderColor:'#23863644',background:'#081208'}}>
                      <span className="container-icon">🐬</span>
                      <div className="container-info">
                        <div className="container-name">mysql <span style={{color:'#484f58',fontWeight:400,fontSize:'10px'}}>(MySQL Community)</span></div>
                        <div className="container-port">:3306 mysql · primary role</div>
                      </div>
                      <div style={{color:'#3fb950',fontSize:'10px'}}>primary</div>
                    </div>
                    <div className="container-row">
                      <span className="container-icon">🔍</span>
                      <div className="container-info">
                        <div className="container-name">[init] syncer <span style={{color:'#484f58',fontWeight:400,fontSize:'10px'}}>(→ /tools/syncerctl)</span></div>
                        <div className="container-port">exec syncerctl getrole</div>
                      </div>
                    </div>
                    <div className="container-row">
                      <span className="container-icon">📊</span>
                      <div className="container-info">
                        <div className="container-name">mysql-exporter</div>
                        <div className="container-port">:9104 metrics</div>
                      </div>
                    </div>
                  </div>
                  <div className="pvc-row">💾 PVC <strong style={{color:'#e3b341'}}>data-0</strong> · 20Gi</div>
                </div>

                {/* Replica-1 */}
                <div className="pod-card pod-replica">
                  <div className="pod-header">
                    <span className="pod-name">mysql-1</span>
                    <span className="pod-badge badge-replica">REPLICA</span>
                  </div>
                  <div className="containers">
                    <div className="container-row" style={{borderColor:'#1f6feb44',background:'#080d18'}}>
                      <span className="container-icon">🐬</span>
                      <div className="container-info">
                        <div className="container-name">mysql <span style={{color:'#484f58',fontWeight:400,fontSize:'10px'}}>(MySQL Community)</span></div>
                        <div className="container-port">:3306 mysql · replica role</div>
                      </div>
                      <div style={{color:'#79c0ff',fontSize:'10px'}}>replica</div>
                    </div>
                    <div className="container-row">
                      <span className="container-icon">🔍</span>
                      <div className="container-info">
                        <div className="container-name">[init] syncer <span style={{color:'#484f58',fontWeight:400,fontSize:'10px'}}>(→ /tools/syncerctl)</span></div>
                        <div className="container-port">exec syncerctl getrole</div>
                      </div>
                    </div>
                    <div className="container-row">
                      <span className="container-icon">📊</span>
                      <div className="container-info">
                        <div className="container-name">mysql-exporter</div>
                        <div className="container-port">:9104 metrics</div>
                      </div>
                    </div>
                  </div>
                  <div className="pvc-row">💾 PVC <strong style={{color:'#e3b341'}}>data-1</strong> · 20Gi</div>
                </div>

                {/* Replica-2 */}
                <div className="pod-card pod-replica">
                  <div className="pod-header">
                    <span className="pod-name">mysql-2</span>
                    <span className="pod-badge badge-replica">REPLICA</span>
                  </div>
                  <div className="containers">
                    <div className="container-row" style={{borderColor:'#1f6feb44',background:'#080d18'}}>
                      <span className="container-icon">🐬</span>
                      <div className="container-info">
                        <div className="container-name">mysql <span style={{color:'#484f58',fontWeight:400,fontSize:'10px'}}>(MySQL Community)</span></div>
                        <div className="container-port">:3306 mysql · replica role</div>
                      </div>
                      <div style={{color:'#79c0ff',fontSize:'10px'}}>replica</div>
                    </div>
                    <div className="container-row">
                      <span className="container-icon">🔍</span>
                      <div className="container-info">
                        <div className="container-name">[init] syncer <span style={{color:'#484f58',fontWeight:400,fontSize:'10px'}}>(→ /tools/syncerctl)</span></div>
                        <div className="container-port">exec syncerctl getrole</div>
                      </div>
                    </div>
                    <div className="container-row">
                      <span className="container-icon">📊</span>
                      <div className="container-info">
                        <div className="container-name">mysql-exporter</div>
                        <div className="container-port">:9104 metrics</div>
                      </div>
                    </div>
                  </div>
                  <div className="pvc-row">💾 PVC <strong style={{color:'#e3b341'}}>data-2</strong> · 20Gi</div>
                </div>

              </div>

              <div className="replication-bar">
                <span>↔</span>
                <strong>Binlog Streaming (async / semi-sync replication)</strong>
                <span style={{color:'#7d8590'}}>primary-0 → replica-1 · replica-2 &nbsp;|&nbsp; async or semi-sync configurable</span>
              </div>
            </div>

          </div>{/* /data-plane */}

        </div>{/* /main-area */}
        {/* Legend */}
        <div className="legend">
          <div className="legend-item"><span className="legend-dot" style={{background:'#388bfd'}}></span>KubeBlocks Operator (control plane)</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#a371f7'}}></span>CRD Resource</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#3fb950'}}></span>Primary / RW Traffic</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#79c0ff'}}></span>Replica Pod</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#e3b341'}}></span>Persistent Storage</div>
        </div>

      </div>
    </>
  );
}
