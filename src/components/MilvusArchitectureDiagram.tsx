import React from 'react';

export default function MilvusArchitectureDiagram() {
  return (
    <>
      <style>{`
        .milvus-ha-diagram * { box-sizing: border-box; }
        .milvus-ha-diagram {
          background: #0d1117;
          font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: #e6edf3;
          padding: 28px;
          border-radius: 16px;
          margin-bottom: 32px;
        }
        .milvus-ha-diagram .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
        .milvus-ha-diagram .dot-blue   { background: #388bfd; }
        .milvus-ha-diagram .dot-green  { background: #3fb950; }
        .milvus-ha-diagram .dot-purple { background: #a371f7; }
        .milvus-ha-diagram .dot-teal   { background: #56d4dd; }
        .milvus-ha-diagram .dot-red    { background: #f85149; }
        .milvus-ha-diagram .card-title {
          font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; margin-bottom: 10px;
          display: flex; align-items: center; gap: 6px;
        }
        .milvus-ha-diagram .main-area {
          display: flex; gap: 16px; align-items: flex-start;
        }
        .milvus-ha-diagram .data-plane {
          flex: 1; display: flex; flex-direction: column; gap: 0;
        }
        .milvus-ha-diagram .client-mini {
          border-radius: 12px; border: 1px solid #30363d;
          background: #161b22; padding: 12px 16px;
          display: flex; align-items: center; gap: 14px;
        }
        .milvus-ha-diagram .client-label { font-size: 13px; font-weight: 600; color: #f0f6fc; }
        .milvus-ha-diagram .client-routes { font-size: 10px; color: #7d8590; margin-top: 3px; line-height: 1.8; }
        .milvus-ha-diagram .v-arrow {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          height: 36px;
        }
        .milvus-ha-diagram .v-arrow-line { display: flex; flex-direction: column; align-items: center; }
        .milvus-ha-diagram .v-line { width: 2px; height: 20px; position: relative; }
        .milvus-ha-diagram .v-line-green { background: linear-gradient(to bottom, #23863688, #3fb950); }
        .milvus-ha-diagram .v-line-green::after {
          content: ''; position: absolute; bottom: 0; left: 50%;
          transform: translateX(-50%);
          border-left: 5px solid transparent; border-right: 5px solid transparent;
          border-top: 7px solid #3fb950;
        }
        .milvus-ha-diagram .v-line-gray { background: linear-gradient(to bottom, #30363d88, #484f58); }
        .milvus-ha-diagram .v-line-gray::after {
          content: ''; position: absolute; bottom: 0; left: 50%;
          transform: translateX(-50%);
          border-left: 5px solid transparent; border-right: 5px solid transparent;
          border-top: 7px solid #484f58;
        }
        .milvus-ha-diagram .v-arrow-label { font-size: 9px; color: #484f58; letter-spacing: 1px; white-space: nowrap; }
        .milvus-ha-diagram .services-block {
          border-radius: 12px; border: 1px solid #238636;
          background: #0a1a0a; padding: 14px 16px;
        }
        .milvus-ha-diagram .services-grid {
          display: grid; grid-template-columns: 1fr; gap: 10px; margin-top: 8px;
        }
        .milvus-ha-diagram .svc-card { border-radius: 8px; border: 1px solid; padding: 10px 12px; }
        .milvus-ha-diagram .svc-rw { border-color: #3fb950; background: #0a1a0a; }
        .milvus-ha-diagram .svc-hl { border-color: #30363d; background: #0d1117; }
        .milvus-ha-diagram .svc-name { font-size: 12px; font-weight: 700; margin-bottom: 4px; }
        .milvus-ha-diagram .svc-rw .svc-name { color: #3fb950; }
        .milvus-ha-diagram .svc-hl .svc-name { color: #7d8590; }
        .milvus-ha-diagram .svc-detail { font-size: 10px; color: #7d8590; line-height: 1.6; }
        .milvus-ha-diagram .svc-tag {
          display: inline-block; font-size: 9px; font-weight: 700;
          letter-spacing: 1px; padding: 2px 6px; border-radius: 4px;
          text-transform: uppercase; margin-top: 4px;
        }
        .milvus-ha-diagram .tag-green  { background: #1a4a1a; color: #3fb950; }
        .milvus-ha-diagram .tag-gray   { background: #21262d; color: #8b949e; }
        .milvus-ha-diagram .section-label {
          font-size: 10px; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; color: #7d8590; margin-bottom: 8px;
        }
        .milvus-ha-diagram .pods-section {
          border-radius: 12px; border: 1px solid #30363d;
          background: #0d1117; padding: 16px;
        }
        .milvus-ha-diagram .tier-label {
          font-size: 10px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; color: #484f58; margin: 10px 0 6px;
          border-bottom: 1px solid #21262d; padding-bottom: 4px;
        }
        .milvus-ha-diagram .tier1-grid {
          display: grid; grid-template-columns: 1fr; gap: 12px;
        }
        .milvus-ha-diagram .tier2-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;
        }
        .milvus-ha-diagram .tier3-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;
        }
        .milvus-ha-diagram .pod-card { border-radius: 10px; border: 1px solid #30363d; background: #161b22; overflow: hidden; }
        .milvus-ha-diagram .pod-header {
          padding: 9px 12px; display: flex; align-items: center; justify-content: space-between;
          border-bottom: 1px solid #21262d;
        }
        .milvus-ha-diagram .pod-coord .pod-header  { background: linear-gradient(135deg,#1e0d38,#2d1f5e); border-bottom-color: #6e40c9; }
        .milvus-ha-diagram .pod-proxy .pod-header  { background: linear-gradient(135deg,#0d1f38,#162840); border-bottom-color: #1f6feb; }
        .milvus-ha-diagram .pod-query .pod-header  { background: linear-gradient(135deg,#0d1f38,#162840); border-bottom-color: #1f6feb; }
        .milvus-ha-diagram .pod-data .pod-header   { background: linear-gradient(135deg,#0d1f38,#162840); border-bottom-color: #1f6feb; }
        .milvus-ha-diagram .pod-index .pod-header  { background: linear-gradient(135deg,#0d1f38,#162840); border-bottom-color: #1f6feb; }
        .milvus-ha-diagram .pod-name { font-size: 11px; font-weight: 700; color: #f0f6fc; }
        .milvus-ha-diagram .pod-badge {
          font-size: 9px; font-weight: 700; letter-spacing: 1px;
          text-transform: uppercase; padding: 2px 7px; border-radius: 10px;
        }
        .milvus-ha-diagram .badge-coord { background: #2d1f5e; color: #d2a8ff; border: 1px solid #6e40c9; }
        .milvus-ha-diagram .badge-blue  { background: #0d2035; color: #79c0ff; border: 1px solid #1f6feb; }
        .milvus-ha-diagram .containers { padding: 8px; display: flex; flex-direction: column; gap: 4px; }
        .milvus-ha-diagram .container-row {
          display: flex; align-items: center; gap: 7px; padding: 5px 8px;
          border-radius: 6px; border: 1px solid #21262d; background: #0d1117;
        }
        .milvus-ha-diagram .container-icon { font-size: 13px; }
        .milvus-ha-diagram .container-info { flex: 1; }
        .milvus-ha-diagram .container-name { font-size: 11px; font-weight: 600; color: #e6edf3; }
        .milvus-ha-diagram .container-port { font-size: 10px; color: #7d8590; }
        .milvus-ha-diagram .pvc-row {
          margin: 0 8px 8px; padding: 5px 8px; border-radius: 6px;
          border: 1px dashed #30363d; background: #0d1117;
          display: flex; align-items: center; gap: 6px; font-size: 10px; color: #7d8590;
        }
        .milvus-ha-diagram .emptydir-row {
          margin: 0 8px 8px; padding: 5px 8px; border-radius: 6px;
          border: 1px dashed #21262d; background: #0d1117;
          display: flex; align-items: center; gap: 6px; font-size: 10px; color: #484f58;
          font-style: italic;
        }
        .milvus-ha-diagram .replication-bar {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 7px; border-radius: 8px; background: #0a1a14;
          border: 1px solid #238636; margin-top: 10px; font-size: 11px; color: #3fb950;
        }
        .milvus-ha-diagram .legend {
          display: flex; gap: 18px; flex-wrap: wrap; justify-content: center;
          padding-top: 8px; border-top: 1px solid #21262d; margin-top: 16px;
        }
        .milvus-ha-diagram .legend-item { display: flex; align-items: center; gap: 5px; font-size: 10px; color: #7d8590; }
        .milvus-ha-diagram .legend-dot { width: 8px; height: 8px; border-radius: 50%; }
      `}</style>

      <div className="milvus-ha-diagram">

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
                  gRPC&nbsp; <code style={{color:'#3fb950'}}>{'{cluster}'}-proxy:19530</code><br/>
                  Metrics/health&nbsp; <code style={{color:'#79c0ff'}}>{'{cluster}'}-proxy:9091</code> (not a client REST API)
                </div>
              </div>
            </div>

            {/* Arrow: Client → Service */}
            <div className="v-arrow">
              <div className="v-arrow-line">
                <div className="v-line v-line-green"></div>
              </div>
              <span className="v-arrow-label" style={{color:'#3fb95088'}}>gRPC :19530 → proxy component</span>
            </div>

            {/* Services */}
            <div className="services-block">
              <div className="card-title" style={{color:'#3fb950'}}>
                <span className="dot dot-green"></span>
                Kubernetes Services
              </div>
              <div className="services-grid">
                <div className="svc-card svc-rw">
                  <div className="svc-name">{'{cluster}'}-proxy</div>
                  <div className="svc-detail">
                    ClusterIP · :19530 gRPC · :9091 metrics/health<br/>
                    Proxy component pods<br/>
                    entry point for all client requests
                  </div>
                  <span className="svc-tag tag-green">ClusterIP</span>
                </div>
              </div>
            </div>

            {/* Arrow: Service → Pods */}
            <div className="v-arrow">
              <div className="v-arrow-line">
                <div className="v-line v-line-green"></div>
              </div>
              <span className="v-arrow-label" style={{color:'#3fb95088'}}>→ proxy pods</span>
            </div>

            {/* Pods */}
            <div className="pods-section">
              <div className="section-label">Pods · Worker Nodes</div>

              {/* Tier 1 - Coordinator */}
              <div className="tier-label">Tier 1 · MixCoord (RootCoord + QueryCoord + DataCoord + IndexCoord)</div>
              <div className="tier1-grid">

                <div className="pod-card pod-coord">
                  <div className="pod-header">
                    <span className="pod-name">milvus-mixcoord-0</span>
                    <span className="pod-badge badge-coord">MIXCOORD</span>
                  </div>
                  <div className="containers">
                    <div className="container-row" style={{borderColor:'#6e40c944',background:'#100820'}}>
                      <span className="container-icon">🧠</span>
                      <div className="container-info">
                        <div className="container-name">mixcoord</div>
                        <div className="container-port">:9091 metrics/health · single replica · reloads state from etcd on restart</div>
                      </div>
                    </div>
                  </div>
                  <div className="emptydir-row">emptyDir · stateless against etcd (no PVC needed)</div>
                </div>

              </div>

              {/* Tier 2 - Proxy + Query */}
              <div className="tier-label">Tier 2 · Proxy + Query Node</div>
              <div className="tier2-grid">

                <div className="pod-card pod-proxy">
                  <div className="pod-header">
                    <span className="pod-name">milvus-proxy-0</span>
                    <span className="pod-badge badge-blue">PROXY</span>
                  </div>
                  <div className="containers">
                    <div className="container-row" style={{borderColor:'#1f6feb44',background:'#080d18'}}>
                      <span className="container-icon">🧠</span>
                      <div className="container-info">
                        <div className="container-name">proxy</div>
                        <div className="container-port">:19530 gRPC (client) · :9091 metrics/health</div>
                      </div>
                    </div>
                  </div>
                  <div className="emptydir-row">emptyDir · stateless (no PVC)</div>
                </div>

                <div className="pod-card pod-query">
                  <div className="pod-header">
                    <span className="pod-name">milvus-querynode-0</span>
                    <span className="pod-badge badge-blue">QUERYNODE</span>
                  </div>
                  <div className="containers">
                    <div className="container-row" style={{borderColor:'#1f6feb44',background:'#080d18'}}>
                      <span className="container-icon">🧠</span>
                      <div className="container-info">
                        <div className="container-name">querynode</div>
                        <div className="container-port">:9091 metrics/health · loads segments from MinIO · ANN search</div>
                      </div>
                    </div>
                  </div>
                  <div className="emptydir-row">emptyDir · segment cache in memory (no PVC)</div>
                </div>

              </div>

              {/* Tier 3 - Data + Index */}
              <div className="tier-label">Tier 3 · Data Node + Index Node</div>
              <div className="tier3-grid">

                <div className="pod-card pod-data">
                  <div className="pod-header">
                    <span className="pod-name">milvus-datanode-0</span>
                    <span className="pod-badge badge-blue">DATANODE</span>
                  </div>
                  <div className="containers">
                    <div className="container-row" style={{borderColor:'#1f6feb44',background:'#080d18'}}>
                      <span className="container-icon">🧠</span>
                      <div className="container-info">
                        <div className="container-name">datanode</div>
                        <div className="container-port">:9091 metrics/health · receives inserts/deletes · flushes to MinIO</div>
                      </div>
                    </div>
                  </div>
                  <div className="emptydir-row">emptyDir · WAL buffer (no PVC)</div>
                </div>

                <div className="pod-card pod-index">
                  <div className="pod-header">
                    <span className="pod-name">milvus-indexnode-0</span>
                    <span className="pod-badge badge-blue">INDEXNODE</span>
                  </div>
                  <div className="containers">
                    <div className="container-row" style={{borderColor:'#1f6feb44',background:'#080d18'}}>
                      <span className="container-icon">🧠</span>
                      <div className="container-info">
                        <div className="container-name">indexnode</div>
                        <div className="container-port">:9091 metrics/health · builds HNSW/IVF indexes in MinIO</div>
                      </div>
                    </div>
                  </div>
                  <div className="emptydir-row">emptyDir · temporary build workspace (no PVC)</div>
                </div>

              </div>

              <div className="replication-bar">
                <span>↔</span>
                <strong>External serviceRefs: etcd (metadata) · Pulsar/Kafka (log/MQ) · MinIO/S3 (object storage)</strong>
                <span style={{color:'#7d8590'}}>All three are required external dependencies declared via serviceRefDeclarations</span>
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
          <div className="legend-item"><span className="legend-dot" style={{background:'#388bfd'}}></span>KubeBlocks Operator (control plane)</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#a371f7'}}></span>Coordinator Pod</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#3fb950'}}></span>Proxy / Entry Point</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#79c0ff'}}></span>Worker Pod</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#e3b341'}}></span>Persistent Storage</div>
        </div>

      </div>
    </>
  );
}
