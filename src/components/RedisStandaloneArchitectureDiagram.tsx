import React from 'react';

export default function RedisStandaloneArchitectureDiagram() {
  return (
    <>
      <style>{`
        .redis-standalone-diagram * { box-sizing: border-box; }
        .redis-standalone-diagram {
          background: #0d1117;
          font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: #e6edf3;
          padding: 28px;
          border-radius: 16px;
          margin-bottom: 32px;
        }
        .redis-standalone-diagram .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
        .redis-standalone-diagram .dot-blue   { background: #388bfd; }
        .redis-standalone-diagram .dot-green  { background: #3fb950; }
        .redis-standalone-diagram .dot-red    { background: #f85149; }
        .redis-standalone-diagram .card-title {
          font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; margin-bottom: 10px;
          display: flex; align-items: center; gap: 6px;
        }
        .redis-standalone-diagram .main-area {
          display: flex; gap: 16px; align-items: flex-start;
        }
        .redis-standalone-diagram .data-plane {
          flex: 1; display: flex; flex-direction: column; gap: 0;
        }
        .redis-standalone-diagram .client-mini {
          border-radius: 12px; border: 1px solid #30363d;
          background: #161b22; padding: 12px 16px;
          display: flex; align-items: center; gap: 14px;
        }
        .redis-standalone-diagram .client-label { font-size: 13px; font-weight: 600; color: #f0f6fc; }
        .redis-standalone-diagram .client-routes { font-size: 10px; color: #7d8590; margin-top: 3px; line-height: 1.8; }
        .redis-standalone-diagram .v-arrow {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          height: 36px;
        }
        .redis-standalone-diagram .v-arrow-line { display: flex; flex-direction: column; align-items: center; }
        .redis-standalone-diagram .v-line { width: 2px; height: 20px; position: relative; }
        .redis-standalone-diagram .v-line-green { background: linear-gradient(to bottom, #23863688, #3fb950); }
        .redis-standalone-diagram .v-line-green::after {
          content: ''; position: absolute; bottom: 0; left: 50%;
          transform: translateX(-50%);
          border-left: 5px solid transparent; border-right: 5px solid transparent;
          border-top: 7px solid #3fb950;
        }
        .redis-standalone-diagram .v-arrow-label { font-size: 9px; color: #484f58; letter-spacing: 1px; white-space: nowrap; }
        .redis-standalone-diagram .services-block {
          border-radius: 12px; border: 1px solid #238636;
          background: #0a1a0a; padding: 14px 16px;
        }
        .redis-standalone-diagram .svc-card {
          border-radius: 8px; border: 1px solid #3fb950;
          background: #0a1a0a; padding: 10px 12px; margin-top: 8px;
        }
        .redis-standalone-diagram .svc-name { font-size: 12px; font-weight: 700; color: #3fb950; margin-bottom: 4px; }
        .redis-standalone-diagram .svc-detail { font-size: 10px; color: #7d8590; line-height: 1.6; }
        .redis-standalone-diagram .svc-tag {
          display: inline-block; font-size: 9px; font-weight: 700;
          letter-spacing: 1px; padding: 2px 6px; border-radius: 4px;
          text-transform: uppercase; margin-top: 4px;
          background: #1a4a1a; color: #3fb950;
        }
        .redis-standalone-diagram .section-label {
          font-size: 10px; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; color: #7d8590; margin-bottom: 8px;
        }
        .redis-standalone-diagram .pods-section {
          border-radius: 12px; border: 1px solid #30363d;
          background: #0d1117; padding: 16px;
        }
        .redis-standalone-diagram .pod-card {
          border-radius: 10px; border: 1px solid #30363d;
          background: #161b22; overflow: hidden; max-width: 380px;
        }
        .redis-standalone-diagram .pod-header {
          padding: 9px 12px; display: flex; align-items: center; justify-content: space-between;
          border-bottom: 1px solid #21262d;
          background: linear-gradient(135deg,#1a120a,#2a1e0e);
          border-bottom-color: #d2992244;
        }
        .redis-standalone-diagram .pod-name { font-size: 11px; font-weight: 700; color: #f0f6fc; }
        .redis-standalone-diagram .pod-badge {
          font-size: 9px; font-weight: 700; letter-spacing: 1px;
          text-transform: uppercase; padding: 2px 7px; border-radius: 10px;
          background: #2a1e0a; color: #e3b341; border: 1px solid #d2992266;
        }
        .redis-standalone-diagram .containers { padding: 8px; display: flex; flex-direction: column; gap: 4px; }
        .redis-standalone-diagram .container-row {
          display: flex; align-items: center; gap: 7px; padding: 5px 8px;
          border-radius: 6px; border: 1px solid #21262d; background: #0d1117;
        }
        .redis-standalone-diagram .container-icon { font-size: 13px; }
        .redis-standalone-diagram .container-info { flex: 1; }
        .redis-standalone-diagram .container-name { font-size: 11px; font-weight: 600; color: #e6edf3; }
        .redis-standalone-diagram .container-port { font-size: 10px; color: #7d8590; }
        .redis-standalone-diagram .pvc-row {
          margin: 0 8px 8px; padding: 5px 8px; border-radius: 6px;
          border: 1px dashed #30363d; background: #0d1117;
          display: flex; align-items: center; gap: 6px; font-size: 10px; color: #7d8590;
        }
        .redis-standalone-diagram .legend {
          display: flex; gap: 18px; flex-wrap: wrap; justify-content: center;
          padding-top: 8px; border-top: 1px solid #21262d; margin-top: 16px;
        }
        .redis-standalone-diagram .legend-item { display: flex; align-items: center; gap: 5px; font-size: 10px; color: #7d8590; }
        .redis-standalone-diagram .legend-dot { width: 8px; height: 8px; border-radius: 50%; }
      `}</style>

      <div className="redis-standalone-diagram">

        {/* ══ MAIN AREA: data plane (left) + sidebar (right) ══ */}
        <div className="main-area">

          {/* LEFT: Client → Service → Pod */}
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
                  Read/Write&nbsp; <code style={{color:'#3fb950'}}>redis-standalone-redis-redis:6379</code><br/>
                  <span style={{color:'#484f58',fontSize:'9px'}}>「redis-standalone」为示例 cluster 名</span>
                </div>
              </div>
            </div>

            {/* Arrow: Client → Service */}
            <div className="v-arrow">
              <div className="v-arrow-line">
                <div className="v-line v-line-green"></div>
              </div>
              <span className="v-arrow-label" style={{color:'#3fb95088'}}>RW traffic → single pod</span>
            </div>

            {/* Service */}
            <div className="services-block">
              <div className="card-title" style={{color:'#3fb950'}}>
                <span className="dot dot-green"></span>
                Kubernetes Services
              </div>
              <div className="svc-card">
                <div className="svc-name">redis-standalone-redis-redis</div>
                <div className="svc-detail">
                  ClusterIP · :6379<br/>
                  selector: all redis pods (no role filter)<br/>
                  Direct connection to the single Redis instance
                </div>
                <span className="svc-tag">ReadWrite</span>
              </div>
            </div>

            {/* Arrow: Service → Pod */}
            <div className="v-arrow">
              <div className="v-arrow-line">
                <div className="v-line v-line-green"></div>
              </div>
              <span className="v-arrow-label" style={{color:'#3fb95088'}}>→ redis-0</span>
            </div>

            {/* Pods */}
            <div className="pods-section">
              <div className="section-label">Redis Pod · Worker Node</div>

              <div className="pod-card">
                <div className="pod-header">
                  <span className="pod-name">redis-0</span>
                  <span className="pod-badge">STANDALONE</span>
                </div>
                <div className="containers">
                  <div className="container-row" style={{borderColor:'#d2992244',background:'#120a04'}}>
                    <span className="container-icon">🔴</span>
                    <div className="container-info">
                      <div className="container-name">redis <span style={{color:'#484f58',fontWeight:400,fontSize:'10px'}}>(Redis Server)</span></div>
                      <div className="container-port">:6379 · standalone mode · accepts all R/W</div>
                    </div>
                  </div>
                  <div className="container-row">
                    <span className="container-icon">🔍</span>
                    <div className="container-info">
                      <div className="container-name">[init] dbctl <span style={{color:'#484f58',fontWeight:400,fontSize:'10px'}}>(→ /tools/dbctl)</span></div>
                      <div className="container-port">copies dbctl binary for roleProbe</div>
                    </div>
                  </div>
                  <div className="container-row">
                    <span className="container-icon">📊</span>
                    <div className="container-info">
                      <div className="container-name">redis-exporter</div>
                      <div className="container-port">:9121 metrics (Prometheus)</div>
                    </div>
                  </div>
                </div>
                <div className="pvc-row">💾 PVC <strong style={{color:'#e3b341'}}>data-0</strong> · 20Gi · RDB / AOF data directory</div>
              </div>

              <div style={{marginTop:'10px',padding:'5px 10px',borderRadius:'6px',border:'1px dashed #30363d',fontSize:'10px',color:'#484f58',display:'flex',alignItems:'center',gap:'6px'}}>
                <span>🔗</span>
                <span><strong style={{color:'#6e7681'}}>Headless service</strong> — stable pod DNS for operator probes and internal use; not a client endpoint</span>
              </div>
            </div>

          </div>{/* /data-plane */}

        </div>{/* /main-area */}

        {/* Legend */}
        <div className="legend">
          <div className="legend-item"><span className="legend-dot" style={{background:'#3fb950'}}></span>RW Traffic</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#e3b341'}}></span>Persistent Storage</div>
        </div>

      </div>
    </>
  );
}
