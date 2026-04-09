import React from 'react';

export default function MongodbShardingArchitectureDiagram() {
  return (
    <>
      <style>{`
        .mdb-shard-diagram * { box-sizing: border-box; }
        .mdb-shard-diagram {
          background: #0d1117;
          font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: #e6edf3;
          padding: 28px;
          border-radius: 16px;
          margin-bottom: 32px;
        }
        .mdb-shard-diagram .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
        .mdb-shard-diagram .dot-blue   { background: #388bfd; }
        .mdb-shard-diagram .dot-purple { background: #a371f7; }
        .mdb-shard-diagram .dot-teal   { background: #56d4dd; }
        .mdb-shard-diagram .dot-orange { background: #e3b341; }
        .mdb-shard-diagram .dot-green  { background: #3fb950; }
        .mdb-shard-diagram .dot-red    { background: #f85149; }
        .mdb-shard-diagram .card-title {
          font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; margin-bottom: 10px;
          display: flex; align-items: center; gap: 6px;
        }

        /* Layout */
        .mdb-shard-diagram .main-area { display: flex; gap: 16px; align-items: flex-start; }
        .mdb-shard-diagram .data-plane { flex: 1; display: flex; flex-direction: column; gap: 0; }

        /* Client */
        .mdb-shard-diagram .client-box {
          border-radius: 12px; border: 1px solid #30363d;
          background: #161b22; padding: 12px 16px;
          display: flex; align-items: center; gap: 14px;
        }
        .mdb-shard-diagram .client-label { font-size: 13px; font-weight: 600; color: #f0f6fc; }
        .mdb-shard-diagram .client-note { font-size: 10px; color: #7d8590; margin-top: 3px; line-height: 1.7; }

        /* Arrows */
        .mdb-shard-diagram .v-arrow {
          display: flex; align-items: center; justify-content: center; gap: 8px; height: 30px;
        }
        .mdb-shard-diagram .v-arrow-line { display: flex; flex-direction: column; align-items: center; }
        .mdb-shard-diagram .v-line { width: 2px; height: 18px; position: relative; }
        .mdb-shard-diagram .v-line-purple { background: linear-gradient(to bottom, #6e40c988, #a371f7); }
        .mdb-shard-diagram .v-line-purple::after {
          content:''; position:absolute; bottom:0; left:50%; transform:translateX(-50%);
          border-left:5px solid transparent; border-right:5px solid transparent; border-top:7px solid #a371f7;
        }
        .mdb-shard-diagram .v-line-teal { background: linear-gradient(to bottom, #1b7c8388, #56d4dd); }
        .mdb-shard-diagram .v-line-teal::after {
          content:''; position:absolute; bottom:0; left:50%; transform:translateX(-50%);
          border-left:5px solid transparent; border-right:5px solid transparent; border-top:7px solid #56d4dd;
        }
        .mdb-shard-diagram .v-line-green { background: linear-gradient(to bottom, #23863688, #3fb950); }
        .mdb-shard-diagram .v-line-green::after {
          content:''; position:absolute; bottom:0; left:50%; transform:translateX(-50%);
          border-left:5px solid transparent; border-right:5px solid transparent; border-top:7px solid #3fb950;
        }
        .mdb-shard-diagram .v-arrow-label { font-size: 9px; color: #484f58; letter-spacing: 1px; white-space: nowrap; }

        /* Layer blocks */
        .mdb-shard-diagram .layer-block {
          border-radius: 12px; border: 1px solid; padding: 14px 16px;
        }
        .mdb-shard-diagram .layer-mongos   { border-color: #6e40c9; background: #120d2a; }
        .mdb-shard-diagram .layer-config   { border-color: #1b7c83; background: #061515; }
        .mdb-shard-diagram .layer-shards   { border-color: #238636; background: #0a1a0a; }

        /* Mongos pods grid */
        .mdb-shard-diagram .mongos-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 8px;
        }
        .mdb-shard-diagram .mongos-pod {
          border-radius: 8px; border: 1px solid #6e40c944; background: #1a1030;
          padding: 8px; display: flex; flex-direction: column; gap: 3px;
        }
        .mdb-shard-diagram .mongos-pod-name { font-size: 10px; font-weight: 700; color: #d2a8ff; margin-bottom: 2px; }
        .mdb-shard-diagram .stateless-badge {
          font-size: 8px; font-weight: 700; padding: 1px 5px; border-radius: 4px;
          background: #2d1f5e; color: #a371f7; border: 1px solid #6e40c955;
          text-transform: uppercase; letter-spacing: 0.8px; display: inline-block; margin-bottom: 4px;
        }

        /* Config server pods */
        .mdb-shard-diagram .config-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 8px;
        }
        .mdb-shard-diagram .config-pod {
          border-radius: 8px; border: 1px solid; overflow: hidden;
        }
        .mdb-shard-diagram .config-pod-primary { border-color: #56d4dd55; }
        .mdb-shard-diagram .config-pod-secondary { border-color: #30363d; }
        .mdb-shard-diagram .config-pod-header {
          padding: 5px 8px; display: flex; align-items: center; justify-content: space-between; font-size: 10px;
        }
        .mdb-shard-diagram .config-pod-primary .config-pod-header { background: linear-gradient(135deg,#051515,#0a2020); }
        .mdb-shard-diagram .config-pod-secondary .config-pod-header { background: #161b22; }
        .mdb-shard-diagram .config-pod-name { font-weight: 600; color: #e6edf3; }
        .mdb-shard-diagram .badge-cfg-primary   { font-size:8px; font-weight:700; padding:1px 5px; border-radius:8px; background:#061515; color:#56d4dd; border:1px solid #1b7c8355; text-transform:uppercase; letter-spacing:0.8px; }
        .mdb-shard-diagram .badge-cfg-secondary { font-size:8px; font-weight:700; padding:1px 5px; border-radius:8px; background:#21262d; color:#8b949e; border:1px solid #30363d; text-transform:uppercase; letter-spacing:0.8px; }
        .mdb-shard-diagram .config-containers { padding: 4px 6px 6px; display: flex; flex-direction: column; gap: 2px; }
        .mdb-shard-diagram .config-csrs-bar {
          margin-top: 8px; padding: 6px 10px; border-radius: 6px;
          background: #0a1e20; border: 1px solid #1b7c83;
          font-size: 10px; color: #56d4dd; display: flex; align-items: center; gap: 6px;
        }

        /* Shards */
        .mdb-shard-diagram .shards-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 8px;
        }
        .mdb-shard-diagram .shard-card {
          border-radius: 8px; border: 1px solid #23863644; background: #0a1a0a; overflow: hidden;
        }
        .mdb-shard-diagram .shard-header {
          padding: 6px 10px; display: flex; align-items: center; justify-content: space-between;
          background: linear-gradient(135deg,#0d2510,#081208); border-bottom: 1px solid #23863644;
        }
        .mdb-shard-diagram .shard-name { font-size: 11px; font-weight: 700; color: #3fb950; }
        .mdb-shard-diagram .shard-badge { font-size:8px; padding:1px 5px; border-radius:3px; background:#1a4a1a; color:#7ee787; border:1px solid #23863655; font-weight:700; }
        .mdb-shard-diagram .shard-pods { padding: 6px; display: flex; flex-direction: column; gap: 4px; }
        .mdb-shard-diagram .shard-pod-row {
          border-radius: 5px; border: 1px solid; overflow: hidden;
        }
        .mdb-shard-diagram .shard-pod-primary { border-color: #3fb95044; }
        .mdb-shard-diagram .shard-pod-secondary { border-color: #30363d; }
        .mdb-shard-diagram .shard-pod-header {
          padding: 3px 7px; display: flex; align-items: center; justify-content: space-between; font-size: 9px;
        }
        .mdb-shard-diagram .shard-pod-primary .shard-pod-header { background: linear-gradient(135deg,#0d2510,#081208); }
        .mdb-shard-diagram .shard-pod-secondary .shard-pod-header { background: #161b22; }
        .mdb-shard-diagram .shard-pod-name { font-weight: 600; color: #e6edf3; }
        .mdb-shard-diagram .badge-shard-primary   { font-size:8px; font-weight:700; padding:1px 4px; border-radius:8px; background:#1a4a1a; color:#3fb950; border:1px solid #23863655; text-transform:uppercase; }
        .mdb-shard-diagram .badge-shard-secondary { font-size:8px; font-weight:700; padding:1px 4px; border-radius:8px; background:#21262d; color:#8b949e; border:1px solid #30363d; text-transform:uppercase; }
        .mdb-shard-diagram .shard-containers { padding: 3px 5px 5px; display: flex; flex-direction: column; gap: 2px; }
        .mdb-shard-diagram .shard-pvc { margin:0 5px 5px; padding:3px 7px; border-radius:4px; border:1px dashed #30363d; background:#0d1117; font-size:9px; color:#7d8590; }

        /* Shared container-row */
        .mdb-shard-diagram .container-row {
          display: flex; align-items: center; gap: 5px; padding: 3px 5px;
          border-radius: 4px; border: 1px solid #21262d; background: #0d1117; font-size: 9px;
        }
        .mdb-shard-diagram .container-name { color: #e6edf3; font-weight: 600; }
        .mdb-shard-diagram .container-port { color: #7d8590; margin-left: auto; }

        /* Legend */
        .mdb-shard-diagram .legend {
          display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;
          padding-top: 8px; border-top: 1px solid #21262d; margin-top: 16px;
        }
        .mdb-shard-diagram .legend-item { display: flex; align-items: center; gap: 5px; font-size: 10px; color: #7d8590; }
        .mdb-shard-diagram .legend-dot { width: 8px; height: 8px; border-radius: 50%; }
      `}</style>

      <div className="mdb-shard-diagram">
        <div className="main-area">

          {/* LEFT: data plane */}
          <div className="data-plane">

            {/* Client */}
            <div className="client-box">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#79c0ff" strokeWidth="1.5">
                <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
              </svg>
              <div>
                <div className="client-label">Application / Client</div>
                <div className="client-note">
                  Connect via per-pod services <code style={{color:'#a371f7'}}>{'{cluster}'}-mongos-mongos-0:27017</code>, <code style={{color:'#a371f7'}}>{'{cluster}'}-mongos-mongos-1:27017</code> … (one ClusterIP per pod, <code style={{color:'#484f58'}}>podService: true</code>)<br/>
                  Or use <code style={{color:'#a371f7'}}>{'{cluster}'}-mongos-headless</code> for DNS-based discovery · Mongos routes each query to the correct shard
                </div>
              </div>
            </div>

            {/* Arrow: client → mongos */}
            <div className="v-arrow">
              <div className="v-arrow-line"><div className="v-line v-line-purple"></div></div>
              <span className="v-arrow-label" style={{color:'#a371f788'}}>standard MongoDB connection → mongos router</span>
            </div>

            {/* Mongos layer */}
            <div className="layer-block layer-mongos">
              <div className="card-title" style={{color:'#d2a8ff'}}>
                <span className="dot dot-purple"></span>
                Mongos · Query Routers
                <span style={{fontSize:'9px',color:'#6e40c9',fontWeight:400,letterSpacing:0}}>· stateless · no PVC · reads chunk map from config servers</span>
              </div>
              <div className="mongos-grid">
                {['mongos-0','mongos-1','mongos-2'].map(name => (
                  <div className="mongos-pod" key={name}>
                    <div className="mongos-pod-name">{name}</div>
                    <span className="stateless-badge">Stateless</span>
                    <div className="container-row">
                      <span>🍃</span>
                      <span className="container-name">mongos</span>
                      <span className="container-port">:27017</span>
                    </div>
                    <div className="container-row">
                      <span>📊</span>
                      <span className="container-name">exporter</span>
                      <span className="container-port">:9216</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Arrow: mongos → config + shards */}
            <div className="v-arrow" style={{gap:'20px'}}>
              <div className="v-arrow-line"><div className="v-line v-line-teal"></div></div>
              <span className="v-arrow-label" style={{color:'#56d4dd88'}}>reads chunk routing metadata</span>
              <div className="v-arrow-line" style={{marginLeft:'16px'}}><div className="v-line v-line-green"></div></div>
              <span className="v-arrow-label" style={{color:'#3fb95088'}}>forwards query to shard primary</span>
            </div>

            {/* Config Server layer */}
            <div className="layer-block layer-config">
              <div className="card-title" style={{color:'#56d4dd'}}>
                <span className="dot dot-teal"></span>
                Config Servers · CSRS Replica Set
                <span style={{fontSize:'9px',color:'#1b7c83',fontWeight:400,letterSpacing:0}}>· stores chunk map, shard membership, cluster metadata</span>
              </div>
              <div className="config-grid">
                {[
                  {name:'config-0', role:'PRIMARY', cls:'config-pod-primary', badge:'badge-cfg-primary'},
                  {name:'config-1', role:'SECONDARY', cls:'config-pod-secondary', badge:'badge-cfg-secondary'},
                  {name:'config-2', role:'SECONDARY', cls:'config-pod-secondary', badge:'badge-cfg-secondary'},
                ].map(p => (
                  <div className={`config-pod ${p.cls}`} key={p.name}>
                    <div className="config-pod-header">
                      <span className="config-pod-name">{p.name}</span>
                      <span className={p.badge}>{p.role}</span>
                    </div>
                    <div className="config-containers">
                      <div className="container-row">
                        <span>🍃</span><span className="container-name">mongodb</span><span className="container-port">:27017</span>
                      </div>
                      <div className="container-row">
                        <span>📊</span><span className="container-name">exporter</span><span className="container-port">:9216</span>
                      </div>
                      <div className="container-row" style={{borderStyle:'dashed',borderColor:'#484f5855',background:'transparent'}}>
                        <span>⚙</span><span className="container-name" style={{color:'#484f58',fontSize:'9px'}}>init-syncer (syncerctl → /tools)</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="config-csrs-bar">
                <span>↔</span>
                <strong>CSRS Oplog Replication</strong>
                <span style={{color:'#1b7c83'}}>config-0 → config-1, config-2 · w:majority writes</span>
              </div>
            </div>

            {/* Arrow: mongos → shards */}
            <div className="v-arrow">
              <div className="v-arrow-line"><div className="v-line v-line-green"></div></div>
              <span className="v-arrow-label" style={{color:'#3fb95088'}}>routed writes/reads → shard primary</span>
            </div>

            {/* Shards layer */}
            <div className="layer-block layer-shards">
              <div className="card-title" style={{color:'#7ee787'}}>
                <span className="dot dot-green"></span>
                Data Shards · Independent Replica Sets
                <span style={{fontSize:'9px',color:'#238636',fontWeight:400,letterSpacing:0}}>· each shard = 1 KubeBlocks Sharding Component · owns a range of chunk space</span>
              </div>
              <div className="shards-grid">
                {[
                  {id:'shard-0', range:'chunk range A'},
                  {id:'shard-1', range:'chunk range B'},
                  {id:'shard-2', range:'chunk range C'},
                ].map(s => (
                  <div className="shard-card" key={s.id}>
                    <div className="shard-header">
                      <span className="shard-name">{s.id}</span>
                      <span className="shard-badge">{s.range}</span>
                    </div>
                    <div className="shard-pods">
                      {[
                        {name:`${s.id}-0`, role:'PRIMARY', cls:'shard-pod-primary', badge:'badge-shard-primary'},
                        {name:`${s.id}-1`, role:'SECONDARY', cls:'shard-pod-secondary', badge:'badge-shard-secondary'},
                        {name:`${s.id}-2`, role:'SECONDARY', cls:'shard-pod-secondary', badge:'badge-shard-secondary'},
                      ].map(p => (
                        <div className={`shard-pod-row ${p.cls}`} key={p.name}>
                          <div className="shard-pod-header">
                            <span className="shard-pod-name">{p.name}</span>
                            <span className={p.badge}>{p.role}</span>
                          </div>
                          {p.role === 'PRIMARY' && (
                            <div className="shard-containers">
                              <div className="container-row">
                                <span>🍃</span><span className="container-name">mongodb</span><span className="container-port">:27017</span>
                              </div>
                              <div className="container-row">
                                <span>📊</span><span className="container-name">exporter</span><span className="container-port">:9216</span>
                              </div>
                              <div className="container-row" style={{borderStyle:'dashed',borderColor:'#484f5855',background:'transparent'}}>
                                <span>⚙</span><span className="container-name" style={{color:'#484f58',fontSize:'9px'}}>init-syncer (syncerctl → /tools)</span>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                      <div className="shard-pvc">💾 PVC per pod · 20Gi</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{marginTop:'8px',padding:'5px 10px',borderRadius:'6px',border:'1px dashed #30363d',fontSize:'10px',color:'#484f58',display:'flex',alignItems:'center',gap:'6px'}}>
                <span>↔</span>
                <span>Each shard replica set replicates independently via oplog · inter-shard failover is independent</span>
              </div>
            </div>

          </div>{/* /data-plane */}

        </div>{/* /main-area */}

        {/* Legend */}
        <div className="legend">
          <div className="legend-item"><span className="legend-dot" style={{background:'#a371f7'}}></span>Mongos (query router)</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#56d4dd'}}></span>Config Server (CSRS)</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#3fb950'}}></span>Shard Primary</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#8b949e'}}></span>Shard Secondary</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#e3b341'}}></span>Persistent Storage</div>
        </div>

      </div>
    </>
  );
}
