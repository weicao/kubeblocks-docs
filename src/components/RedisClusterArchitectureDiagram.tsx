import React from 'react';

export default function RedisClusterArchitectureDiagram() {
  return (
    <>
      <style>{`
        .redis-cluster-diagram * { box-sizing: border-box; }
        .redis-cluster-diagram {
          background: #0d1117;
          font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: #e6edf3;
          padding: 28px;
          border-radius: 16px;
          margin-bottom: 32px;
        }
        .redis-cluster-diagram .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
        .redis-cluster-diagram .dot-blue   { background: #388bfd; }
        .redis-cluster-diagram .dot-orange { background: #f0883e; }
        .redis-cluster-diagram .dot-purple { background: #a371f7; }
        .redis-cluster-diagram .dot-yellow { background: #e3b341; }
        .redis-cluster-diagram .dot-teal   { background: #56d4dd; }
        .redis-cluster-diagram .dot-red    { background: #f85149; }
        .redis-cluster-diagram .card-title {
          font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; margin-bottom: 10px;
          display: flex; align-items: center; gap: 6px;
        }
        .redis-cluster-diagram .client-box {
          border-radius: 12px; border: 1px solid #30363d;
          background: #161b22; padding: 12px 16px;
          display: flex; align-items: center; gap: 14px;
          margin-bottom: 0;
        }
        .redis-cluster-diagram .client-label { font-size: 13px; font-weight: 600; color: #f0f6fc; }
        .redis-cluster-diagram .client-note { font-size: 10px; color: #7d8590; margin-top: 3px; line-height: 1.7; }
        .redis-cluster-diagram .v-arrow {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          height: 32px;
        }
        .redis-cluster-diagram .v-arrow-line { display: flex; flex-direction: column; align-items: center; }
        .redis-cluster-diagram .v-line { width: 2px; height: 18px; position: relative; }
        .redis-cluster-diagram .v-line-orange { background: linear-gradient(to bottom, #b74c0088, #f0883e); }
        .redis-cluster-diagram .v-line-orange::after {
          content: ''; position: absolute; bottom: 0; left: 50%;
          transform: translateX(-50%);
          border-left: 5px solid transparent; border-right: 5px solid transparent;
          border-top: 7px solid #f0883e;
        }
        .redis-cluster-diagram .v-arrow-label { font-size: 9px; color: #484f58; letter-spacing: 1px; white-space: nowrap; }
        .redis-cluster-diagram .slot-routing-bar {
          padding: 8px 14px; border-radius: 8px;
          background: #1a1208; border: 1px solid #7d451433;
          font-size: 10px; color: #e3b341;
          display: flex; align-items: center; gap: 8px;
          margin-bottom: 0;
        }
        .redis-cluster-diagram .shards-section {
          border-radius: 12px; border: 1px solid #7d4514;
          background: #110b00; padding: 16px;
        }
        .redis-cluster-diagram .shards-section-title {
          font-size: 10px; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; color: #7d8590; margin-bottom: 12px;
          display: flex; align-items: center; gap: 8px;
        }
        .redis-cluster-diagram .shards-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;
        }
        .redis-cluster-diagram .shard-card {
          border-radius: 10px; border: 1px solid #7d451466;
          background: #1a1208; overflow: hidden;
        }
        .redis-cluster-diagram .shard-header {
          padding: 7px 10px; display: flex; align-items: center; justify-content: space-between;
          background: linear-gradient(135deg,#2a1800,#1a1208);
          border-bottom: 1px solid #7d451466;
        }
        .redis-cluster-diagram .shard-name { font-size: 11px; font-weight: 700; color: #f0883e; }
        .redis-cluster-diagram .shard-slots {
          font-size: 9px; color: #7d4514; letter-spacing: 0.5px;
          padding: 2px 6px; border-radius: 4px;
          background: #2a1800; border: 1px solid #7d451433;
        }
        .redis-cluster-diagram .shard-pods { padding: 8px; display: flex; flex-direction: column; gap: 5px; }
        .redis-cluster-diagram .pod-row {
          border-radius: 6px; border: 1px solid; overflow: hidden;
        }
        .redis-cluster-diagram .pod-row-primary { border-color: #f0883e44; }
        .redis-cluster-diagram .pod-row-replica  { border-color: #30363d; }
        .redis-cluster-diagram .pod-row-header {
          padding: 4px 8px; display: flex; align-items: center; justify-content: space-between;
          font-size: 10px;
        }
        .redis-cluster-diagram .pod-row-primary .pod-row-header {
          background: linear-gradient(135deg, #2a1200, #1f1000);
        }
        .redis-cluster-diagram .pod-row-replica .pod-row-header {
          background: #161b22;
        }
        .redis-cluster-diagram .pod-row-name { font-weight: 600; color: #e6edf3; font-size: 10px; }
        .redis-cluster-diagram .badge-primary { background: #2a1800; color: #f0883e; border: 1px solid #f0883e55; font-size: 8px; font-weight: 700; padding: 1px 5px; border-radius: 8px; letter-spacing: 0.8px; text-transform: uppercase; }
        .redis-cluster-diagram .badge-replica  { background: #21262d; color: #8b949e; border: 1px solid #30363d; font-size: 8px; font-weight: 700; padding: 1px 5px; border-radius: 8px; letter-spacing: 0.8px; text-transform: uppercase; }
        .redis-cluster-diagram .pod-containers { padding: 0 6px 5px; display: flex; flex-direction: column; gap: 3px; }
        .redis-cluster-diagram .container-row {
          display: flex; align-items: center; gap: 5px; padding: 3px 6px;
          border-radius: 4px; border: 1px solid #21262d; background: #0d1117;
          font-size: 10px;
        }
        .redis-cluster-diagram .container-name { color: #e6edf3; font-weight: 600; }
        .redis-cluster-diagram .container-port { color: #7d8590; font-size: 9px; margin-left: auto; }
        .redis-cluster-diagram .gossip-bar {
          margin-top: 10px; padding: 7px 12px; border-radius: 8px;
          background: #0a1e20; border: 1px solid #1b7c83;
          font-size: 10px; color: #56d4dd;
          display: flex; align-items: center; gap: 8px;
        }
        .redis-cluster-diagram .main-area {
          display: flex; gap: 16px; align-items: flex-start; margin-top: 0;
        }
        .redis-cluster-diagram .data-plane { flex: 1; display: flex; flex-direction: column; gap: 0; }
        .redis-cluster-diagram .legend {
          display: flex; gap: 18px; flex-wrap: wrap; justify-content: center;
          padding-top: 8px; border-top: 1px solid #21262d; margin-top: 16px;
        }
        .redis-cluster-diagram .legend-item { display: flex; align-items: center; gap: 5px; font-size: 10px; color: #7d8590; }
        .redis-cluster-diagram .legend-dot { width: 8px; height: 8px; border-radius: 50%; }
      `}</style>

      <div className="redis-cluster-diagram">

        <div className="main-area">

          {/* LEFT: Client → Shards */}
          <div className="data-plane">

            {/* Client */}
            <div className="client-box">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#79c0ff" strokeWidth="1.5">
                <rect x="2" y="3" width="20" height="14" rx="2"/>
                <path d="M8 21h8M12 17v4"/>
              </svg>
              <div>
                <div className="client-label">Application / Client</div>
                <div className="client-note">
                  Requires a <strong style={{color:'#f0883e'}}>cluster-aware Redis client</strong> (e.g. redis-py cluster mode, Lettuce, ioredis)<br/>
                  Client fetches slot map via <code style={{color:'#56d4dd'}}>CLUSTER SLOTS</code> · follows <code style={{color:'#56d4dd'}}>MOVED</code> redirects automatically
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="v-arrow">
              <div className="v-arrow-line">
                <div className="v-line v-line-orange"></div>
              </div>
              <span className="v-arrow-label" style={{color:'#f0883e88'}}>hash(key) → slot → correct shard primary</span>
            </div>

            {/* Slot routing hint */}
            <div className="slot-routing-bar">
              <span>🗂</span>
              <span><strong>16384 hash slots</strong> distributed evenly across shards &nbsp;·&nbsp; each key hashed via CRC16 to determine its slot &nbsp;·&nbsp; slot determines the shard</span>
            </div>

            {/* Arrow */}
            <div className="v-arrow">
              <div className="v-arrow-line">
                <div className="v-line v-line-orange"></div>
              </div>
            </div>

            {/* Shards */}
            <div className="shards-section">
              <div className="shards-section-title">
                <span className="dot dot-orange"></span>
                Redis Cluster Shards (KubeBlocks Sharding)
                <span style={{fontSize:'9px',color:'#484f58',fontWeight:400,letterSpacing:0}}>· each shard = 1 KubeBlocks Component · primary + replicas</span>
              </div>
              <div className="shards-grid">

                {/* Shard 0 */}
                <div className="shard-card">
                  <div className="shard-header">
                    <span className="shard-name">shard-0</span>
                    <span className="shard-slots">slots 0–5460</span>
                  </div>
                  <div className="shard-pods">
                    <div className="pod-row pod-row-primary">
                      <div className="pod-row-header">
                        <span className="pod-row-name">shard-0-0</span>
                        <span className="badge-primary">Primary</span>
                      </div>
                      <div className="pod-containers">
                        <div className="container-row">
                          <span>🔴</span>
                          <span className="container-name">redis-cluster</span>
                          <span className="container-port">:6379 · :16379</span>
                        </div>
                        <div className="container-row" style={{borderStyle:'dashed',borderColor:'#484f5855',background:'transparent'}}>
                          <span>⚙</span>
                          <span className="container-name" style={{color:'#484f58',fontSize:'9px'}}>init-dbctl (dbctl → /tools)</span>
                        </div>
                        <div className="container-row">
                          <span>📊</span>
                          <span className="container-name">metrics</span>
                          <span className="container-port">:9187</span>
                        </div>
                      </div>
                    </div>
                    <div className="pod-row pod-row-replica">
                      <div className="pod-row-header">
                        <span className="pod-row-name">shard-0-1</span>
                        <span className="badge-replica">Replica</span>
                      </div>
                      <div className="pod-containers">
                        <div className="container-row">
                          <span>🔴</span>
                          <span className="container-name">redis-cluster</span>
                          <span className="container-port">:6379 · :16379</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shard 1 */}
                <div className="shard-card">
                  <div className="shard-header">
                    <span className="shard-name">shard-1</span>
                    <span className="shard-slots">slots 5461–10922</span>
                  </div>
                  <div className="shard-pods">
                    <div className="pod-row pod-row-primary">
                      <div className="pod-row-header">
                        <span className="pod-row-name">shard-1-0</span>
                        <span className="badge-primary">Primary</span>
                      </div>
                      <div className="pod-containers">
                        <div className="container-row">
                          <span>🔴</span>
                          <span className="container-name">redis-cluster</span>
                          <span className="container-port">:6379 · :16379</span>
                        </div>
                        <div className="container-row" style={{borderStyle:'dashed',borderColor:'#484f5855',background:'transparent'}}>
                          <span>⚙</span>
                          <span className="container-name" style={{color:'#484f58',fontSize:'9px'}}>init-dbctl (dbctl → /tools)</span>
                        </div>
                        <div className="container-row">
                          <span>📊</span>
                          <span className="container-name">metrics</span>
                          <span className="container-port">:9187</span>
                        </div>
                      </div>
                    </div>
                    <div className="pod-row pod-row-replica">
                      <div className="pod-row-header">
                        <span className="pod-row-name">shard-1-1</span>
                        <span className="badge-replica">Replica</span>
                      </div>
                      <div className="pod-containers">
                        <div className="container-row">
                          <span>🔴</span>
                          <span className="container-name">redis-cluster</span>
                          <span className="container-port">:6379 · :16379</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shard 2 */}
                <div className="shard-card">
                  <div className="shard-header">
                    <span className="shard-name">shard-2</span>
                    <span className="shard-slots">slots 10923–16383</span>
                  </div>
                  <div className="shard-pods">
                    <div className="pod-row pod-row-primary">
                      <div className="pod-row-header">
                        <span className="pod-row-name">shard-2-0</span>
                        <span className="badge-primary">Primary</span>
                      </div>
                      <div className="pod-containers">
                        <div className="container-row">
                          <span>🔴</span>
                          <span className="container-name">redis-cluster</span>
                          <span className="container-port">:6379 · :16379</span>
                        </div>
                        <div className="container-row" style={{borderStyle:'dashed',borderColor:'#484f5855',background:'transparent'}}>
                          <span>⚙</span>
                          <span className="container-name" style={{color:'#484f58',fontSize:'9px'}}>init-dbctl (dbctl → /tools)</span>
                        </div>
                        <div className="container-row">
                          <span>📊</span>
                          <span className="container-name">metrics</span>
                          <span className="container-port">:9187</span>
                        </div>
                      </div>
                    </div>
                    <div className="pod-row pod-row-replica">
                      <div className="pod-row-header">
                        <span className="pod-row-name">shard-2-1</span>
                        <span className="badge-replica">Replica</span>
                      </div>
                      <div className="pod-containers">
                        <div className="container-row">
                          <span>🔴</span>
                          <span className="container-name">redis-cluster</span>
                          <span className="container-port">:6379 · :16379</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>{/* /shards-grid */}

              {/* Gossip bar */}
              <div className="gossip-bar">
                <span>↔</span>
                <strong>Gossip Protocol (cluster bus :16379)</strong>
                <span style={{color:'#1b7c83'}}>all nodes exchange heartbeats · detect failures · propagate slot ownership changes · no Sentinel required</span>
              </div>

              <div style={{marginTop:'8px',padding:'5px 10px',borderRadius:'6px',border:'1px dashed #30363d',fontSize:'10px',color:'#484f58',display:'flex',alignItems:'center',gap:'6px'}}>
                <span>🔗</span>
                <span><strong style={{color:'#6e7681'}}>Headless service</strong> — stable pod DNS for internal use (replication, operator probes); not a client endpoint. Client access uses per-pod NodePort/LB services when external exposure is needed.</span>
              </div>
            </div>

          </div>{/* /data-plane */}

        </div>{/* /main-area */}

        {/* Legend */}
        <div className="legend">
          <div className="legend-item"><span className="legend-dot" style={{background:'#388bfd'}}></span>KubeBlocks Operator (control plane)</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#a371f7'}}></span>CRD Resource</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#f0883e'}}></span>Shard Primary</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#8b949e'}}></span>Shard Replica</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#56d4dd'}}></span>Gossip / Cluster Bus</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#e3b341'}}></span>Hash Slots</div>
        </div>

      </div>
    </>
  );
}
