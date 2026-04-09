import React from 'react';

export default function MinioArchitectureDiagram() {
  return (
    <>
      <style>{`
        .minio-ha-diagram * { box-sizing: border-box; }
        .minio-ha-diagram {
          background: #0d1117;
          font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: #e6edf3;
          padding: 28px;
          border-radius: 16px;
          margin-bottom: 32px;
        }
        .minio-ha-diagram .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
        .minio-ha-diagram .dot-blue   { background: #388bfd; }
        .minio-ha-diagram .dot-green  { background: #3fb950; }
        .minio-ha-diagram .dot-purple { background: #a371f7; }
        .minio-ha-diagram .dot-red    { background: #f85149; }
        .minio-ha-diagram .card-title {
          font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; margin-bottom: 10px;
          display: flex; align-items: center; gap: 6px;
        }
        .minio-ha-diagram .main-area {
          display: flex; gap: 16px; align-items: flex-start;
        }
        .minio-ha-diagram .data-plane {
          flex: 1; display: flex; flex-direction: column; gap: 0;
        }
        .minio-ha-diagram .client-mini {
          border-radius: 12px; border: 1px solid #30363d;
          background: #161b22; padding: 12px 16px;
          display: flex; align-items: center; gap: 14px;
        }
        .minio-ha-diagram .client-label { font-size: 13px; font-weight: 600; color: #f0f6fc; }
        .minio-ha-diagram .client-routes { font-size: 10px; color: #7d8590; margin-top: 3px; line-height: 1.8; }
        .minio-ha-diagram .v-arrow {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          height: 36px;
        }
        .minio-ha-diagram .v-arrow-line { display: flex; flex-direction: column; align-items: center; }
        .minio-ha-diagram .v-line { width: 2px; height: 20px; position: relative; }
        .minio-ha-diagram .v-line-green { background: linear-gradient(to bottom, #23863688, #3fb950); }
        .minio-ha-diagram .v-line-green::after {
          content: ''; position: absolute; bottom: 0; left: 50%;
          transform: translateX(-50%);
          border-left: 5px solid transparent; border-right: 5px solid transparent;
          border-top: 7px solid #3fb950;
        }
        .minio-ha-diagram .v-line-gray { background: linear-gradient(to bottom, #30363d88, #484f58); }
        .minio-ha-diagram .v-line-gray::after {
          content: ''; position: absolute; bottom: 0; left: 50%;
          transform: translateX(-50%);
          border-left: 5px solid transparent; border-right: 5px solid transparent;
          border-top: 7px solid #484f58;
        }
        .minio-ha-diagram .v-arrow-label { font-size: 9px; color: #484f58; letter-spacing: 1px; white-space: nowrap; }
        .minio-ha-diagram .services-block {
          border-radius: 12px; border: 1px solid #238636;
          background: #0a1a0a; padding: 14px 16px;
        }
        .minio-ha-diagram .services-grid {
          display: grid; grid-template-columns: 1fr; gap: 10px; margin-top: 8px;
        }
        .minio-ha-diagram .svc-card { border-radius: 8px; border: 1px solid; padding: 10px 12px; }
        .minio-ha-diagram .svc-rw { border-color: #3fb950; background: #0a1a0a; }
        .minio-ha-diagram .svc-hl { border-color: #30363d; background: #0d1117; }
        .minio-ha-diagram .svc-name { font-size: 12px; font-weight: 700; margin-bottom: 4px; }
        .minio-ha-diagram .svc-rw .svc-name { color: #3fb950; }
        .minio-ha-diagram .svc-hl .svc-name { color: #7d8590; }
        .minio-ha-diagram .svc-detail { font-size: 10px; color: #7d8590; line-height: 1.6; }
        .minio-ha-diagram .svc-tag {
          display: inline-block; font-size: 9px; font-weight: 700;
          letter-spacing: 1px; padding: 2px 6px; border-radius: 4px;
          text-transform: uppercase; margin-top: 4px;
        }
        .minio-ha-diagram .tag-green { background: #1a4a1a; color: #3fb950; }
        .minio-ha-diagram .tag-gray  { background: #21262d; color: #8b949e; }
        .minio-ha-diagram .section-label {
          font-size: 10px; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; color: #7d8590; margin-bottom: 8px;
        }
        .minio-ha-diagram .pods-section {
          border-radius: 12px; border: 1px solid #30363d;
          background: #0d1117; padding: 16px;
        }
        .minio-ha-diagram .pods-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 10px;
        }
        .minio-ha-diagram .pod-card { border-radius: 10px; border: 1px solid #30363d; background: #161b22; overflow: hidden; }
        .minio-ha-diagram .pod-header {
          padding: 9px 12px; display: flex; align-items: center; justify-content: space-between;
          border-bottom: 1px solid #21262d;
        }
        .minio-ha-diagram .pod-node .pod-header { background: linear-gradient(135deg,#0a1e20,#0e2428); border-bottom-color: #1b7c83; }
        .minio-ha-diagram .pod-name { font-size: 11px; font-weight: 700; color: #f0f6fc; }
        .minio-ha-diagram .pod-badge {
          font-size: 9px; font-weight: 700; letter-spacing: 1px;
          text-transform: uppercase; padding: 2px 7px; border-radius: 10px;
        }
        .minio-ha-diagram .badge-node { background: #0a1e20; color: #56d4dd; border: 1px solid #1b7c83; }
        .minio-ha-diagram .containers { padding: 8px; display: flex; flex-direction: column; gap: 4px; }
        .minio-ha-diagram .container-row {
          display: flex; align-items: center; gap: 7px; padding: 5px 8px;
          border-radius: 6px; border: 1px solid #21262d; background: #0d1117;
        }
        .minio-ha-diagram .container-icon { font-size: 13px; }
        .minio-ha-diagram .container-info { flex: 1; }
        .minio-ha-diagram .container-name { font-size: 11px; font-weight: 600; color: #e6edf3; }
        .minio-ha-diagram .container-port { font-size: 10px; color: #7d8590; }
        .minio-ha-diagram .pvc-row {
          margin: 0 8px 8px; padding: 5px 8px; border-radius: 6px;
          border: 1px dashed #30363d; background: #0d1117;
          display: flex; align-items: center; gap: 6px; font-size: 10px; color: #7d8590;
        }
        .minio-ha-diagram .more-pods-note {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 7px; border-radius: 8px; background: #0d1117;
          border: 1px dashed #30363d; margin-top: 8px; font-size: 11px; color: #484f58;
          font-style: italic;
        }
        .minio-ha-diagram .replication-bar {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 7px; border-radius: 8px; background: #0a1a14;
          border: 1px solid #238636; margin-top: 10px; font-size: 11px; color: #3fb950;
          flex-wrap: wrap; text-align: center;
        }
        .minio-ha-diagram .legend {
          display: flex; gap: 18px; flex-wrap: wrap; justify-content: center;
          padding-top: 8px; border-top: 1px solid #21262d; margin-top: 16px;
        }
        .minio-ha-diagram .legend-item { display: flex; align-items: center; gap: 5px; font-size: 10px; color: #7d8590; }
        .minio-ha-diagram .legend-dot { width: 8px; height: 8px; border-radius: 50%; }
      `}</style>

      <div className="minio-ha-diagram">

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
                  S3 API&nbsp; <code style={{color:'#3fb950'}}>minio-cluster-minio:9000</code><br/>
                  Console&nbsp; <code style={{color:'#3fb950'}}>minio-cluster-minio:9001</code>
                </div>
              </div>
            </div>

            {/* Arrow: Client → Service */}
            <div className="v-arrow">
              <div className="v-arrow-line">
                <div className="v-line v-line-green"></div>
              </div>
              <span className="v-arrow-label" style={{color:'#3fb95088'}}>S3 API + console traffic → all pods (round-robin)</span>
            </div>

            {/* Services */}
            <div className="services-block">
              <div className="card-title" style={{color:'#3fb950'}}>
                <span className="dot dot-green"></span>
                Kubernetes Services
              </div>
              <div className="services-grid">
                <div className="svc-card svc-rw">
                  <div className="svc-name">minio-cluster-minio</div>
                  <div className="svc-detail">
                    ClusterIP · :9000 S3 API · :9001 console<br/>
                    all pods (round-robin)<br/>
                    no primary — symmetric cluster
                  </div>
                  <span className="svc-tag tag-green">S3 API + Console</span>
                </div>
              </div>
            </div>

            {/* Arrow: Service → Pods */}
            <div className="v-arrow">
              <div className="v-arrow-line">
                <div className="v-line v-line-green"></div>
              </div>
              <span className="v-arrow-label" style={{color:'#3fb95088'}}>→ any pod (symmetric, no primary)</span>
            </div>

            {/* Pods */}
            <div className="pods-section">
              <div className="section-label">Pods · Worker Nodes (4 total — showing 3 · e.g. cluster name: minio-cluster → minio-cluster-minio-0)</div>
              <div className="pods-grid">

                {/* minio-0 */}
                <div className="pod-card pod-node">
                  <div className="pod-header">
                    <span className="pod-name">minio-0</span>
                    <span className="pod-badge badge-node">NODE</span>
                  </div>
                  <div className="containers">
                    <div className="container-row" style={{borderColor:'#1b7c8344',background:'#06141a'}}>
                      <span className="container-icon">🗄️</span>
                      <div className="container-info">
                        <div className="container-name">minio</div>
                        <div className="container-port">:9000 S3 API + metrics (/minio/v2/metrics/cluster) · :9001 console</div>
                      </div>
                    </div>
                  </div>
                  <div className="pvc-row">💾 PVC <strong style={{color:'#e3b341'}}>data-0</strong> · 100Gi (object storage)</div>
                </div>

                {/* minio-1 */}
                <div className="pod-card pod-node">
                  <div className="pod-header">
                    <span className="pod-name">minio-1</span>
                    <span className="pod-badge badge-node">NODE</span>
                  </div>
                  <div className="containers">
                    <div className="container-row" style={{borderColor:'#1b7c8344',background:'#06141a'}}>
                      <span className="container-icon">🗄️</span>
                      <div className="container-info">
                        <div className="container-name">minio</div>
                        <div className="container-port">:9000 S3 API + metrics (/minio/v2/metrics/cluster) · :9001 console</div>
                      </div>
                    </div>
                  </div>
                  <div className="pvc-row">💾 PVC <strong style={{color:'#e3b341'}}>data-1</strong> · 100Gi (object storage)</div>
                </div>

                {/* minio-2 */}
                <div className="pod-card pod-node">
                  <div className="pod-header">
                    <span className="pod-name">minio-2</span>
                    <span className="pod-badge badge-node">NODE</span>
                  </div>
                  <div className="containers">
                    <div className="container-row" style={{borderColor:'#1b7c8344',background:'#06141a'}}>
                      <span className="container-icon">🗄️</span>
                      <div className="container-info">
                        <div className="container-name">minio</div>
                        <div className="container-port">:9000 S3 API + metrics (/minio/v2/metrics/cluster) · :9001 console</div>
                      </div>
                    </div>
                  </div>
                  <div className="pvc-row">💾 PVC <strong style={{color:'#e3b341'}}>data-2</strong> · 100Gi (object storage)</div>
                </div>

              </div>

              <div className="more-pods-note">
                <span>+</span>
                <span>minio-3 &nbsp;—&nbsp; identical configuration · 100Gi PVC · same NODE role</span>
              </div>

              <div className="replication-bar">
                <span>⬡</span>
                <strong>Reed-Solomon Erasure Coding</strong>
                <span style={{color:'#7d8590'}}>EC ratio determined by MinIO based on drive count · e.g. EC:4+4 in a symmetric 8-node layout · actual params vary with topology</span>
              </div>
              <div style={{marginTop:'8px',padding:'5px 10px',borderRadius:'6px',border:'1px dashed #30363d',fontSize:'10px',color:'#484f58',display:'flex',alignItems:'center',gap:'6px'}}>
                <span>🔗</span>
                <span><strong style={{color:'#6e7681'}}>Headless service</strong> — stable pod DNS for internal use (replication, HA heartbeat, operator probes); not a client endpoint</span>
              </div>
            </div>

          </div>{/* /data-plane */}

        </div>{/* /main-area */}


        {/* Legend */}
        <div className="legend">
          <div className="legend-item"><span className="legend-dot" style={{background:'#3fb950'}}></span>S3 API Traffic</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#56d4dd'}}></span>Distributed Node (symmetric)</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#e3b341'}}></span>Persistent Storage</div>
        </div>

      </div>
    </>
  );
}
