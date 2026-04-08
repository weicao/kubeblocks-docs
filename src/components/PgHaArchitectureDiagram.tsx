import React from 'react';

export default function PgHaArchitectureDiagram() {
  return (
    <>
      <style>{`
        .pg-ha-diagram * { box-sizing: border-box; }
        .pg-ha-diagram {
          background: #0d1117;
          font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: #e6edf3;
          padding: 28px;
          border-radius: 16px;
          margin-bottom: 32px;
        }
        .pg-ha-diagram .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
        .pg-ha-diagram .dot-blue   { background: #388bfd; }
        .pg-ha-diagram .dot-green  { background: #3fb950; }
        .pg-ha-diagram .dot-teal   { background: #56d4dd; }
        .pg-ha-diagram .card-title {
          font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; margin-bottom: 10px;
          display: flex; align-items: center; gap: 6px;
        }
        .pg-ha-diagram .data-plane {
          display: flex; flex-direction: column; gap: 0;
        }
        .pg-ha-diagram .client-mini {
          border-radius: 12px; border: 1px solid #30363d;
          background: #161b22; padding: 12px 16px;
          display: flex; align-items: center; gap: 14px;
        }
        .pg-ha-diagram .client-label { font-size: 13px; font-weight: 600; color: #f0f6fc; }
        .pg-ha-diagram .client-routes { font-size: 10px; color: #7d8590; margin-top: 3px; line-height: 1.8; }
        .pg-ha-diagram .v-arrow {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          height: 36px;
        }
        .pg-ha-diagram .v-arrow-line { display: flex; flex-direction: column; align-items: center; }
        .pg-ha-diagram .v-line { width: 2px; height: 20px; position: relative; }
        .pg-ha-diagram .v-line-green { background: linear-gradient(to bottom, #23863688, #3fb950); }
        .pg-ha-diagram .v-line-green::after {
          content: ''; position: absolute; bottom: 0; left: 50%;
          transform: translateX(-50%);
          border-left: 5px solid transparent; border-right: 5px solid transparent;
          border-top: 7px solid #3fb950;
        }
        .pg-ha-diagram .v-arrow-label { font-size: 9px; color: #484f58; letter-spacing: 1px; white-space: nowrap; }
        .pg-ha-diagram .services-block {
          border-radius: 12px; border: 1px solid #238636;
          background: #0a1a0a; padding: 14px 16px;
        }
        .pg-ha-diagram .services-grid {
          display: grid; grid-template-columns: 1fr; gap: 10px; margin-top: 8px;
        }
        .pg-ha-diagram .svc-card { border-radius: 8px; border: 1px solid; padding: 10px 12px; }
        .pg-ha-diagram .svc-rw { border-color: #3fb950; background: #0a1a0a; }
        .pg-ha-diagram .svc-name { font-size: 12px; font-weight: 700; margin-bottom: 4px; color: #3fb950; }
        .pg-ha-diagram .svc-detail { font-size: 10px; color: #7d8590; line-height: 1.6; }
        .pg-ha-diagram .svc-tag {
          display: inline-block; font-size: 9px; font-weight: 700;
          letter-spacing: 1px; padding: 2px 6px; border-radius: 4px;
          text-transform: uppercase; margin-top: 4px;
          background: #1a4a1a; color: #3fb950;
        }
        .pg-ha-diagram .section-label {
          font-size: 10px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; color: #7d8590; margin-bottom: 12px;
        }
        .pg-ha-diagram .section-label-teal { color: #56d4dd; }

        /* DCS teal arrow */
        .pg-ha-diagram .v-line-teal { background: linear-gradient(to bottom, #1b7c8388, #56d4dd); }
        .pg-ha-diagram .v-line-teal::after {
          content: ''; position: absolute; bottom: 0; left: 50%;
          transform: translateX(-50%);
          border-left: 5px solid transparent; border-right: 5px solid transparent;
          border-top: 7px solid #56d4dd;
        }

        /* DCS bottom block */
        .pg-ha-diagram .dcs-block {
          border-radius: 12px; border: 1px solid #1b7c83;
          background: #061515; padding: 14px;
        }
        .pg-ha-diagram .dcs-resources {
          display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px;
        }
        .pg-ha-diagram .dcs-resource {
          background: #0d1117; border-radius: 8px; padding: 8px 12px;
          border: 1px solid #1b7c8344; font-size: 10px; flex: 1; min-width: 130px;
        }
        .pg-ha-diagram .dcs-res-name { font-weight: 600; color: #56d4dd; display: block; margin-bottom: 2px; }
        .pg-ha-diagram .dcs-res-note { color: #7d8590; font-size: 9px; }
        .pg-ha-diagram .dcs-feature {
          font-size: 9px; color: #7d8590;
          padding: 6px 10px; background: #0d1117;
          border-radius: 6px; border: 1px solid #21262d;
          white-space: nowrap;
        }

        /* Pods section */
        .pg-ha-diagram .pods-section {
          border-radius: 12px; border: 1px solid #30363d;
          background: #0d1117; padding: 14px;
        }
        .pg-ha-diagram .pods-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 10px;
        }
        .pg-ha-diagram .pod-card { border-radius: 10px; border: 1px solid #30363d; background: #161b22; overflow: hidden; }
        .pg-ha-diagram .pod-header {
          padding: 9px 12px; display: flex; align-items: center; justify-content: space-between;
          border-bottom: 1px solid #21262d;
        }
        .pg-ha-diagram .pod-primary .pod-header { background: linear-gradient(135deg,#0d2510,#1a3820); border-bottom-color: #238636; }
        .pg-ha-diagram .pod-replica .pod-header { background: linear-gradient(135deg,#0d1f38,#162840); border-bottom-color: #1f6feb; }
        .pg-ha-diagram .pod-name { font-size: 11px; font-weight: 700; color: #f0f6fc; }
        .pg-ha-diagram .pod-badge {
          font-size: 9px; font-weight: 700; letter-spacing: 1px;
          text-transform: uppercase; padding: 2px 7px; border-radius: 10px;
        }
        .pg-ha-diagram .badge-primary { background: #1a4a1a; color: #3fb950; border: 1px solid #238636; }
        .pg-ha-diagram .badge-replica { background: #0d2035; color: #79c0ff; border: 1px solid #1f6feb; }
        .pg-ha-diagram .containers { padding: 8px; display: flex; flex-direction: column; gap: 4px; }
        .pg-ha-diagram .container-row {
          display: flex; align-items: center; gap: 7px; padding: 5px 8px;
          border-radius: 6px; border: 1px solid #21262d; background: #0d1117;
        }
        .pg-ha-diagram .container-icon { font-size: 13px; }
        .pg-ha-diagram .container-info { flex: 1; }
        .pg-ha-diagram .container-name { font-size: 11px; font-weight: 600; color: #e6edf3; }
        .pg-ha-diagram .container-port { font-size: 10px; color: #7d8590; }
        .pg-ha-diagram .pvc-row {
          margin: 0 8px 8px; padding: 5px 8px; border-radius: 6px;
          border: 1px dashed #30363d; background: #0d1117;
          display: flex; align-items: center; gap: 6px; font-size: 10px; color: #7d8590;
        }
        .pg-ha-diagram .replication-bar {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 7px; border-radius: 8px; background: #0a1a14;
          border: 1px solid #238636; margin-top: 10px; font-size: 11px; color: #3fb950;
        }
        .pg-ha-diagram .legend {
          display: flex; gap: 18px; flex-wrap: wrap; justify-content: center;
          padding-top: 8px; border-top: 1px solid #21262d; margin-top: 16px;
        }
        .pg-ha-diagram .legend-item { display: flex; align-items: center; gap: 5px; font-size: 10px; color: #7d8590; }
        .pg-ha-diagram .legend-dot { width: 8px; height: 8px; border-radius: 50%; }
      `}</style>

      <div className="pg-ha-diagram">

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
                Read/Write&nbsp; <code style={{color:'#3fb950'}}>pg-cluster-postgresql-postgresql:5432</code><br/>
                Connection Pool&nbsp; <code style={{color:'#3fb950'}}>pg-cluster-postgresql-postgresql:6432</code> (pgbouncer)
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
                <div className="svc-name">pg-cluster-postgresql-postgresql</div>
                <div className="svc-detail">
                  ClusterIP · :5432 / :6432<br/>
                  selector: <code style={{color:'#3fb950'}}>kubeblocks.io/role=primary</code><br/>
                  Endpoints auto-switch with primary
                </div>
                <span className="svc-tag">ReadWrite</span>
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
                    <span className="pod-name">postgresql-0</span>
                    <span className="pod-badge badge-primary">PRIMARY</span>
                  </div>
                  <div className="containers">
                    <div className="container-row" style={{borderColor:'#23863644',background:'#081208'}}>
                      <span className="container-icon">🐘</span>
                      <div className="container-info">
                        <div className="container-name">postgresql <span style={{color:'#484f58',fontWeight:400,fontSize:'10px'}}>(Patroni)</span></div>
                        <div className="container-port">:5432 pg · :8008 patroni API</div>
                      </div>
                      <div style={{color:'#3fb950',fontSize:'10px'}}>leader</div>
                    </div>
                    <div className="container-row">
                      <span className="container-icon">🔀</span>
                      <div className="container-info">
                        <div className="container-name">pgbouncer</div>
                        <div className="container-port">:6432 conn pool</div>
                      </div>
                    </div>
                    <div className="container-row">
                      <span className="container-icon">🔍</span>
                      <div className="container-info">
                        <div className="container-name">dbctl <span style={{color:'#484f58',fontWeight:400,fontSize:'10px'}}>(role probe)</span></div>
                        <div className="container-port">:5001 /v1.0/getrole</div>
                      </div>
                    </div>
                    <div className="container-row">
                      <span className="container-icon">📊</span>
                      <div className="container-info">
                        <div className="container-name">pg-exporter</div>
                        <div className="container-port">:9187 metrics</div>
                      </div>
                    </div>
                  </div>
                  <div className="pvc-row">💾 PVC <strong style={{color:'#e3b341'}}>data-0</strong> · 20Gi</div>
                </div>

                {/* Replica-1 */}
                <div className="pod-card pod-replica">
                  <div className="pod-header">
                    <span className="pod-name">postgresql-1</span>
                    <span className="pod-badge badge-replica">REPLICA</span>
                  </div>
                  <div className="containers">
                    <div className="container-row" style={{borderColor:'#1f6feb44',background:'#080d18'}}>
                      <span className="container-icon">🐘</span>
                      <div className="container-info">
                        <div className="container-name">postgresql <span style={{color:'#484f58',fontWeight:400,fontSize:'10px'}}>(Patroni)</span></div>
                        <div className="container-port">:5432 pg · :8008 patroni API</div>
                      </div>
                      <div style={{color:'#79c0ff',fontSize:'10px'}}>replica</div>
                    </div>
                    <div className="container-row">
                      <span className="container-icon">🔀</span>
                      <div className="container-info">
                        <div className="container-name">pgbouncer</div>
                        <div className="container-port">:6432 conn pool</div>
                      </div>
                    </div>
                    <div className="container-row">
                      <span className="container-icon">🔍</span>
                      <div className="container-info">
                        <div className="container-name">dbctl <span style={{color:'#484f58',fontWeight:400,fontSize:'10px'}}>(role probe)</span></div>
                        <div className="container-port">:5001 /v1.0/getrole</div>
                      </div>
                    </div>
                    <div className="container-row">
                      <span className="container-icon">📊</span>
                      <div className="container-info">
                        <div className="container-name">pg-exporter</div>
                        <div className="container-port">:9187 metrics</div>
                      </div>
                    </div>
                  </div>
                  <div className="pvc-row">💾 PVC <strong style={{color:'#e3b341'}}>data-1</strong> · 20Gi</div>
                </div>

                {/* Replica-2 */}
                <div className="pod-card pod-replica">
                  <div className="pod-header">
                    <span className="pod-name">postgresql-2</span>
                    <span className="pod-badge badge-replica">REPLICA</span>
                  </div>
                  <div className="containers">
                    <div className="container-row" style={{borderColor:'#1f6feb44',background:'#080d18'}}>
                      <span className="container-icon">🐘</span>
                      <div className="container-info">
                        <div className="container-name">postgresql <span style={{color:'#484f58',fontWeight:400,fontSize:'10px'}}>(Patroni)</span></div>
                        <div className="container-port">:5432 pg · :8008 patroni API</div>
                      </div>
                      <div style={{color:'#79c0ff',fontSize:'10px'}}>replica</div>
                    </div>
                    <div className="container-row">
                      <span className="container-icon">🔀</span>
                      <div className="container-info">
                        <div className="container-name">pgbouncer</div>
                        <div className="container-port">:6432 conn pool</div>
                      </div>
                    </div>
                    <div className="container-row">
                      <span className="container-icon">🔍</span>
                      <div className="container-info">
                        <div className="container-name">dbctl <span style={{color:'#484f58',fontWeight:400,fontSize:'10px'}}>(role probe)</span></div>
                        <div className="container-port">:5001 /v1.0/getrole</div>
                      </div>
                    </div>
                    <div className="container-row">
                      <span className="container-icon">📊</span>
                      <div className="container-info">
                        <div className="container-name">pg-exporter</div>
                        <div className="container-port">:9187 metrics</div>
                      </div>
                    </div>
                  </div>
                  <div className="pvc-row">💾 PVC <strong style={{color:'#e3b341'}}>data-2</strong> · 20Gi</div>
                </div>

              </div>

              <div className="replication-bar">
                <span>↔</span>
                <strong>Streaming Replication (WAL)</strong>
                <span style={{color:'#7d8590'}}>primary-0 → replica-1 · replica-2 &nbsp;|&nbsp; sync / async configurable</span>
              </div>
              <div style={{marginTop:'8px',padding:'5px 10px',borderRadius:'6px',border:'1px dashed #30363d',fontSize:'10px',color:'#484f58',display:'flex',alignItems:'center',gap:'6px'}}>
                <span>🔗</span>
                <span><strong style={{color:'#6e7681'}}>Headless service</strong> — stable pod DNS for internal use (replication, HA heartbeat, operator probes); not a client endpoint</span>
              </div>
          </div>

          {/* Arrow: pods → DCS */}
          <div className="v-arrow">
            <div className="v-arrow-line">
              <div className="v-line v-line-teal"></div>
            </div>
            <span className="v-arrow-label" style={{color:'#56d4dd88'}}>each Patroni agent reads/writes K8s API via :8008</span>
          </div>

          {/* DCS block */}
          <div className="dcs-block">
            <div className="section-label section-label-teal">Patroni DCS · K8s API</div>
            <div className="dcs-resources">
              <div className="dcs-resource">
                <span className="dcs-res-name">ConfigMap {'{scope}'}-config</span>
                <span className="dcs-res-note">cluster config · TTL 30s</span>
              </div>
              <div className="dcs-resource">
                <span className="dcs-res-name">ConfigMap {'{scope}'}</span>
                <span className="dcs-res-note">leader lease · heartbeat</span>
              </div>
              <div className="dcs-resource">
                <span className="dcs-res-name">Secret account-*</span>
                <span className="dcs-res-note">system account passwords</span>
              </div>
              <div className="dcs-feature">Poll every 10s · TTL 30s</div>
              <div className="dcs-feature">Leader election via K8s lock</div>
              <div className="dcs-feature">Failover → service re-routes</div>
            </div>
          </div>

        </div>{/* /data-plane */}

        {/* Legend */}
        <div className="legend">
          <div className="legend-item"><span className="legend-dot" style={{background:'#3fb950'}}></span>Primary / RW Traffic</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#79c0ff'}}></span>Replica Pod</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#56d4dd'}}></span>Patroni DCS (K8s API)</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#e3b341'}}></span>Persistent Storage</div>
        </div>

      </div>
    </>
  );
}
