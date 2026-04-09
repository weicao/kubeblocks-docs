import React from 'react';

export default function RedisArchitectureDiagram() {
  return (
    <>
      <style>{`
        .redis-ha-diagram * { box-sizing: border-box; }
        .redis-ha-diagram {
          background: #0d1117;
          font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: #e6edf3;
          padding: 28px;
          border-radius: 16px;
          margin-bottom: 32px;
        }
        .redis-ha-diagram .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
        .redis-ha-diagram .dot-blue   { background: #388bfd; }
        .redis-ha-diagram .dot-green  { background: #3fb950; }
        .redis-ha-diagram .dot-purple { background: #a371f7; }
        .redis-ha-diagram .dot-red    { background: #f85149; }
        .redis-ha-diagram .card-title {
          font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; margin-bottom: 10px;
          display: flex; align-items: center; gap: 6px;
        }
        .redis-ha-diagram .main-area {
          display: flex; gap: 16px; align-items: flex-start;
        }
        .redis-ha-diagram .data-plane {
          flex: 1; display: flex; flex-direction: column; gap: 0;
        }
        .redis-ha-diagram .client-mini {
          border-radius: 12px; border: 1px solid #30363d;
          background: #161b22; padding: 12px 16px;
          display: flex; align-items: center; gap: 14px;
        }
        .redis-ha-diagram .client-label { font-size: 13px; font-weight: 600; color: #f0f6fc; }
        .redis-ha-diagram .client-routes { font-size: 10px; color: #7d8590; margin-top: 3px; line-height: 1.8; }
        .redis-ha-diagram .v-arrow {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          height: 36px;
        }
        .redis-ha-diagram .v-arrow-line { display: flex; flex-direction: column; align-items: center; }
        .redis-ha-diagram .v-line { width: 2px; height: 20px; position: relative; }
        .redis-ha-diagram .v-line-green { background: linear-gradient(to bottom, #23863688, #3fb950); }
        .redis-ha-diagram .v-line-green::after {
          content: ''; position: absolute; bottom: 0; left: 50%;
          transform: translateX(-50%);
          border-left: 5px solid transparent; border-right: 5px solid transparent;
          border-top: 7px solid #3fb950;
        }
        .redis-ha-diagram .v-line-gray { background: linear-gradient(to bottom, #30363d88, #484f58); }
        .redis-ha-diagram .v-line-gray::after {
          content: ''; position: absolute; bottom: 0; left: 50%;
          transform: translateX(-50%);
          border-left: 5px solid transparent; border-right: 5px solid transparent;
          border-top: 7px solid #484f58;
        }
        .redis-ha-diagram .v-arrow-label { font-size: 9px; color: #484f58; letter-spacing: 1px; white-space: nowrap; }
        .redis-ha-diagram .services-block {
          border-radius: 12px; border: 1px solid #238636;
          background: #0a1a0a; padding: 14px 16px;
        }
        .redis-ha-diagram .services-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 8px;
        }
        .redis-ha-diagram .svc-card { border-radius: 8px; border: 1px solid; padding: 10px 12px; }
        .redis-ha-diagram .svc-rw { border-color: #3fb950; background: #0a1a0a; }
        .redis-ha-diagram .svc-hl { border-color: #30363d; background: #0d1117; }
        .redis-ha-diagram .svc-name { font-size: 12px; font-weight: 700; margin-bottom: 4px; }
        .redis-ha-diagram .svc-rw .svc-name { color: #3fb950; }
        .redis-ha-diagram .svc-hl .svc-name { color: #7d8590; }
        .redis-ha-diagram .svc-detail { font-size: 10px; color: #7d8590; line-height: 1.6; }
        .redis-ha-diagram .svc-tag {
          display: inline-block; font-size: 9px; font-weight: 700;
          letter-spacing: 1px; padding: 2px 6px; border-radius: 4px;
          text-transform: uppercase; margin-top: 4px;
        }
        .redis-ha-diagram .tag-green { background: #1a4a1a; color: #3fb950; }
        .redis-ha-diagram .tag-gray  { background: #21262d; color: #8b949e; }
        .redis-ha-diagram .section-label {
          font-size: 10px; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; color: #7d8590; margin-bottom: 8px;
        }
        .redis-ha-diagram .pods-section {
          border-radius: 12px; border: 1px solid #30363d;
          background: #0d1117; padding: 16px;
        }
        .redis-ha-diagram .pods-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 10px;
        }
        .redis-ha-diagram .pod-card { border-radius: 10px; border: 1px solid #30363d; background: #161b22; overflow: hidden; }
        .redis-ha-diagram .pod-header {
          padding: 9px 12px; display: flex; align-items: center; justify-content: space-between;
          border-bottom: 1px solid #21262d;
        }
        .redis-ha-diagram .pod-primary .pod-header { background: linear-gradient(135deg,#0d2510,#1a3820); border-bottom-color: #238636; }
        .redis-ha-diagram .pod-replica .pod-header { background: linear-gradient(135deg,#0d1f38,#162840); border-bottom-color: #1f6feb; }
        .redis-ha-diagram .pod-name { font-size: 11px; font-weight: 700; color: #f0f6fc; }
        .redis-ha-diagram .pod-badge {
          font-size: 9px; font-weight: 700; letter-spacing: 1px;
          text-transform: uppercase; padding: 2px 7px; border-radius: 10px;
        }
        .redis-ha-diagram .badge-primary { background: #1a4a1a; color: #3fb950; border: 1px solid #238636; }
        .redis-ha-diagram .badge-replica { background: #0d2035; color: #79c0ff; border: 1px solid #1f6feb; }
        .redis-ha-diagram .containers { padding: 8px; display: flex; flex-direction: column; gap: 4px; }
        .redis-ha-diagram .container-row {
          display: flex; align-items: center; gap: 7px; padding: 5px 8px;
          border-radius: 6px; border: 1px solid #21262d; background: #0d1117;
        }
        .redis-ha-diagram .container-icon { font-size: 13px; }
        .redis-ha-diagram .container-info { flex: 1; }
        .redis-ha-diagram .container-name { font-size: 11px; font-weight: 600; color: #e6edf3; }
        .redis-ha-diagram .container-port { font-size: 10px; color: #7d8590; }
        .redis-ha-diagram .pvc-row {
          margin: 0 8px 8px; padding: 5px 8px; border-radius: 6px;
          border: 1px dashed #30363d; background: #0d1117;
          display: flex; align-items: center; gap: 6px; font-size: 10px; color: #7d8590;
        }
        .redis-ha-diagram .replication-bar {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 7px; border-radius: 8px; background: #0a1a14;
          border: 1px solid #238636; margin-top: 10px; font-size: 11px; color: #3fb950;
        }
        .redis-ha-diagram .sentinel-section-label {
          font-size: 9px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; color: #1b7c83; margin-top: 14px; margin-bottom: 4px;
        }
        .redis-ha-diagram .sentinel-mini-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;
        }
        .redis-ha-diagram .sentinel-pod {
          border-radius: 8px; border: 1px solid #1b7c8333; background: #061515;
          padding: 7px 10px; font-size: 10px; color: #56d4dd; line-height: 1.6;
        }
        .redis-ha-diagram .sentinel-pod-name { font-size: 11px; font-weight: 700; color: #c9d1d9; margin-bottom: 3px; }
                .redis-ha-diagram .legend {
          display: flex; gap: 18px; flex-wrap: wrap; justify-content: center;
          padding-top: 8px; border-top: 1px solid #21262d; margin-top: 16px;
        }
        .redis-ha-diagram .legend-item { display: flex; align-items: center; gap: 5px; font-size: 10px; color: #7d8590; }
        .redis-ha-diagram .legend-dot { width: 8px; height: 8px; border-radius: 50%; }
      `}</style>

      <div className="redis-ha-diagram">

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
                  Read/Write&nbsp; <code style={{color:'#3fb950'}}>redis-cluster-redis-redis:6379</code><br/>
                  Sentinel Discovery&nbsp; <code style={{color:'#56d4dd'}}>redis-cluster-redis-sentinel-redis-sentinel:26379</code><br/>
                  <span style={{color:'#484f58',fontSize:'9px'}}>「redis-cluster」为示例 cluster 名</span>
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
                  <div className="svc-name">redis-cluster-redis-redis</div>
                  <div className="svc-detail">
                    ClusterIP · :6379<br/>
                    selector: <code style={{color:'#3fb950'}}>kubeblocks.io/role=primary</code><br/>
                    Endpoints auto-switch with primary
                  </div>
                  <span className="svc-tag tag-green">ReadWrite</span>
                </div>
                <div className="svc-card svc-hl">
                  <div className="svc-name">redis-cluster-redis-sentinel-redis-sentinel</div>
                  <div className="svc-detail">
                    ClusterIP · :26379<br/>
                    all sentinel pods<br/>
                    Sentinel quorum · master discovery
                  </div>
                  <span className="svc-tag tag-gray">Sentinel</span>
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
              <div className="section-label">Redis Data Pods · Worker Nodes</div>
              <div className="pods-grid">

                {/* Primary */}
                <div className="pod-card pod-primary">
                  <div className="pod-header">
                    <span className="pod-name">redis-0</span>
                    <span className="pod-badge badge-primary">PRIMARY</span>
                  </div>
                  <div className="containers">
                    <div className="container-row" style={{borderColor:'#23863644',background:'#081208'}}>
                      <span className="container-icon">🔴</span>
                      <div className="container-info">
                        <div className="container-name">redis <span style={{color:'#484f58',fontWeight:400,fontSize:'10px'}}>(Redis Server)</span></div>
                        <div className="container-port">:6379 redis · primary role</div>
                      </div>
                      <div style={{color:'#3fb950',fontSize:'10px'}}>primary</div>
                    </div>
                    <div className="container-row">
                      <span className="container-icon">🔍</span>
                      <div className="container-info">
                        <div className="container-name">[init] dbctl <span style={{color:'#484f58',fontWeight:400,fontSize:'10px'}}>(→ /tools/dbctl)</span></div>
                        <div className="container-port">exec dbctl redis getrole</div>
                      </div>
                    </div>
                    <div className="container-row">
                      <span className="container-icon">📊</span>
                      <div className="container-info">
                        <div className="container-name">redis-exporter</div>
                        <div className="container-port">:9121 metrics</div>
                      </div>
                    </div>
                  </div>
                  <div className="pvc-row">💾 PVC <strong style={{color:'#e3b341'}}>data-0</strong> · 20Gi</div>
                </div>

                {/* Replica-1 */}
                <div className="pod-card pod-replica">
                  <div className="pod-header">
                    <span className="pod-name">redis-1</span>
                    <span className="pod-badge badge-replica">REPLICA</span>
                  </div>
                  <div className="containers">
                    <div className="container-row" style={{borderColor:'#1f6feb44',background:'#080d18'}}>
                      <span className="container-icon">🔴</span>
                      <div className="container-info">
                        <div className="container-name">redis <span style={{color:'#484f58',fontWeight:400,fontSize:'10px'}}>(Redis Server)</span></div>
                        <div className="container-port">:6379 redis · replica role</div>
                      </div>
                      <div style={{color:'#79c0ff',fontSize:'10px'}}>replica</div>
                    </div>
                    <div className="container-row">
                      <span className="container-icon">🔍</span>
                      <div className="container-info">
                        <div className="container-name">[init] dbctl <span style={{color:'#484f58',fontWeight:400,fontSize:'10px'}}>(→ /tools/dbctl)</span></div>
                        <div className="container-port">exec dbctl redis getrole</div>
                      </div>
                    </div>
                    <div className="container-row">
                      <span className="container-icon">📊</span>
                      <div className="container-info">
                        <div className="container-name">redis-exporter</div>
                        <div className="container-port">:9121 metrics</div>
                      </div>
                    </div>
                  </div>
                  <div className="pvc-row">💾 PVC <strong style={{color:'#e3b341'}}>data-1</strong> · 20Gi</div>
                </div>

              </div>

              <div className="replication-bar">
                <span>↔</span>
                <strong>Redis Replication (PSYNC2)</strong>
                <span style={{color:'#7d8590'}}>primary-0 → replica-1 &nbsp;|&nbsp; Sentinel monitors &amp; triggers failover</span>
              </div>
              <div style={{marginTop:'8px',padding:'5px 10px',borderRadius:'6px',border:'1px dashed #30363d',fontSize:'10px',color:'#484f58',display:'flex',alignItems:'center',gap:'6px'}}>
                <span>🔗</span>
                <span><strong style={{color:'#6e7681'}}>Headless service</strong> — stable pod DNS for internal use (replication, HA heartbeat, operator probes); not a client endpoint</span>
              </div>

              {/* Sentinel Pods mini-grid */}
              <div className="sentinel-section-label">Sentinel Pods · PVC (needSnapshot: true)</div>
              <div className="sentinel-mini-grid">
                <div className="sentinel-pod">
                  <div className="sentinel-pod-name">sentinel-0</div>
                  :26379 sentinel · monitors master<br/>
                  <span style={{color:'#484f58'}}>PVC <strong style={{color:'#e3b341'}}>data</strong> · Sentinel state (volume <code style={{fontSize:'9px'}}>needSnapshot: true</code>)</span>
                </div>
                <div className="sentinel-pod">
                  <div className="sentinel-pod-name">sentinel-1</div>
                  :26379 sentinel · monitors master<br/>
                  <span style={{color:'#484f58'}}>PVC <strong style={{color:'#e3b341'}}>data</strong> · Sentinel state (volume <code style={{fontSize:'9px'}}>needSnapshot: true</code>)</span>
                </div>
                <div className="sentinel-pod">
                  <div className="sentinel-pod-name">sentinel-2</div>
                  :26379 sentinel · monitors master<br/>
                  <span style={{color:'#484f58'}}>PVC <strong style={{color:'#e3b341'}}>data</strong> · Sentinel state (volume <code style={{fontSize:'9px'}}>needSnapshot: true</code>)</span>
                </div>
              </div>

            </div>

          </div>{/* /data-plane */}

        </div>{/* /main-area */}
        {/* Legend */}
        <div className="legend">
          <div className="legend-item"><span className="legend-dot" style={{background:'#3fb950'}}></span>Primary / RW Traffic</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#79c0ff'}}></span>Replica Pod</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#e3b341'}}></span>Persistent Storage</div>
        </div>

      </div>
    </>
  );
}
