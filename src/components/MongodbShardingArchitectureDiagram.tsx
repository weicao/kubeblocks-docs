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
        .mdb-shard-diagram .mgmt-sidebar {
          width: 256px; flex-shrink: 0;
          display: flex; flex-direction: column; gap: 12px; padding-top: 4px;
        }

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

        /* Sidebar */
        .mdb-shard-diagram .sidebar-card { border-radius: 10px; border: 1px solid; padding: 12px 14px; }
        .mdb-shard-diagram .routing-card { border-color: #a371f744; background: #120d2a; }
        .mdb-shard-diagram .failover-card { border-color: #da363344; background: #1c0a0a; }
        .mdb-shard-diagram .failover-steps { display: flex; flex-direction: column; gap: 4px; margin-top: 8px; }
        .mdb-shard-diagram .step { display: flex; align-items: flex-start; gap: 6px; font-size: 10px; color: #cdd9e5; line-height: 1.5; }
        .mdb-shard-diagram .step-num {
          width: 16px; height: 16px; border-radius: 50%; flex-shrink: 0;
          background: #da363322; border: 1px solid #da363388;
          display: flex; align-items: center; justify-content: center;
          font-size: 9px; font-weight: 700; color: #f85149; margin-top: 1px;
        }
        .mdb-shard-diagram .routing-items { display: flex; flex-direction: column; gap: 5px; margin-top: 8px; }
        .mdb-shard-diagram .routing-item {
          padding: 5px 8px; border-radius: 6px; border: 1px solid #a371f733;
          background: #0d0820; font-size: 10px; color: #d2a8ff; line-height: 1.5;
        }
        .mdb-shard-diagram .routing-item span { color: #7d8590; }

        /* Operator */
        .mdb-shard-diagram .operator-block {
          flex: 1; border-radius: 12px; border: 1px solid #1f6feb;
          background: #0d1f38; padding: 16px 20px;
        }
        .mdb-shard-diagram .operator-controllers { display: flex; gap: 8px; margin-top: 8px; }
        .mdb-shard-diagram .ctrl-chip {
          flex: 1; padding: 8px 10px; border-radius: 8px; border: 1px solid #1f6feb44;
          background: #0a1628; font-size: 11px; color: #79c0ff; text-align: center;
        }
        .mdb-shard-diagram .ctrl-chip .ctrl-name { font-weight: 700; font-size: 12px; display: block; margin-bottom: 2px; }
        .mdb-shard-diagram .ctrl-chip .ctrl-sub { font-size: 10px; color: #4a7ab5; }
        .mdb-shard-diagram .crd-chain { display: flex; align-items: center; gap: 5px; margin-top: 10px; flex-wrap: wrap; }
        .mdb-shard-diagram .crd-chip { padding: 3px 9px; border-radius: 20px; border: 1px solid; font-size: 10px; font-weight: 600; white-space: nowrap; }
        .mdb-shard-diagram .crd-chip.cluster     { border-color:#a371f7; color:#d2a8ff; background:#2d1f5e; }
        .mdb-shard-diagram .crd-chip.component   { border-color:#56d4dd; color:#56d4dd; background:#061515; }
        .mdb-shard-diagram .crd-chip.sharding    { border-color:#3fb950; color:#7ee787; background:#1a3020; }
        .mdb-shard-diagram .crd-chip.shard       { border-color:#e3b341; color:#e3b341; background:#302010; }
        .mdb-shard-diagram .crd-chip.instanceset { border-color:#79c0ff; color:#79c0ff; background:#0d2035; }
        .mdb-shard-diagram .crd-arrow { color: #484f58; font-size: 12px; }

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

          {/* RIGHT SIDEBAR */}
          <div className="mgmt-sidebar">

            {/* Routing */}
            <div className="sidebar-card routing-card">
              <div className="card-title" style={{color:'#d2a8ff',fontSize:'10px'}}>
                <span className="dot dot-purple"></span>
                How Mongos Routes Queries
              </div>
              <div className="routing-items">
                <div className="routing-item">
                  <span>1. Client sends query</span><br/>to any mongos instance on :27017
                </div>
                <div className="routing-item">
                  <span>2. Mongos reads chunk map</span><br/>from config server CSRS
                </div>
                <div className="routing-item">
                  <span>3. Shard key hashed</span><br/>→ determines target shard
                </div>
                <div className="routing-item">
                  <span>4. Mongos forwards</span><br/>to that shard&apos;s primary
                </div>
                <div className="routing-item">
                  <span>5. Result merged</span><br/>(for scatter-gather queries, all shards queried)
                </div>
              </div>
            </div>

            {/* Failover */}
            <div className="sidebar-card failover-card">
              <div className="card-title" style={{color:'#f85149',fontSize:'10px'}}>
                <span className="dot dot-red"></span>
                Failover (per shard)
              </div>
              <div className="failover-steps">
                <div className="step"><span className="step-num">1</span>Shard primary pod fails</div>
                <div className="step"><span className="step-num">2</span>Shard replica set election (≈10 s)</div>
                <div className="step"><span className="step-num">3</span>Secondary with latest oplog elected</div>
                <div className="step"><span className="step-num">4</span><code style={{color:'#3fb950'}}>role=primary</code> label updated</div>
                <div className="step"><span className="step-num">5</span>Mongos retries on new primary</div>
              </div>
              <div style={{marginTop:'8px',padding:'5px 8px',borderRadius:'5px',background:'#0d0820',border:'1px solid #a371f733',fontSize:'10px',color:'#7d8590',lineHeight:1.6}}>
                Config server failover follows the same replica set election process independently.
              </div>
            </div>

          </div>
        </div>{/* /main-area */}

        {/* Separator */}
        <div style={{display:'flex',alignItems:'center',gap:'12px',fontSize:'10px',letterSpacing:'2px',textTransform:'uppercase',marginTop:'4px'}}>
          <div style={{flex:1,height:'1px',background:'#21262d'}}></div>
          <span style={{color:'#484f58'}}>Management Plane · KubeBlocks Operator</span>
          <div style={{flex:1,height:'1px',background:'#21262d'}}></div>
        </div>

        {/* Operator */}
        <div style={{display:'flex',gap:'16px',alignItems:'stretch',marginTop:'4px'}}>
          <div className="operator-block">
            <div className="card-title" style={{color:'#79c0ff'}}>
              <span className="dot dot-blue"></span>
              KubeBlocks Operator
              <span style={{fontSize:'10px',fontWeight:400,color:'#4a7ab5',letterSpacing:0}}>· manages Sharding + Component resources independently; orchestrates provisioning order</span>
            </div>
            <div className="operator-controllers">
              <div className="ctrl-chip">
                <span className="ctrl-name">Apps Controller</span>
                <span className="ctrl-sub">Cluster / Component</span>
              </div>
              <div className="ctrl-chip">
                <span className="ctrl-name">Workloads Controller</span>
                <span className="ctrl-sub">InstanceSet → Pods</span>
              </div>
              <div className="ctrl-chip">
                <span className="ctrl-name">Sharding Controller</span>
                <span className="ctrl-sub">Shard scale in/out</span>
              </div>
            </div>
            <div style={{marginTop:'10px'}}>
              <div style={{fontSize:'10px',color:'#484f58',marginBottom:'6px',letterSpacing:'1px'}}>CRD RESOURCE HIERARCHY</div>
              <div className="crd-chain">
                <div className="crd-chip cluster">Cluster</div>
                <span className="crd-arrow">→</span>
                <div className="crd-chip component">Component (mongos)</div>
                <span className="crd-arrow">+</span>
                <div className="crd-chip component">Component (config-server)</div>
                <span className="crd-arrow">+</span>
                <div className="crd-chip sharding">Sharding (shard)</div>
                <span className="crd-arrow">→</span>
                <div className="crd-chip shard">Shard × N</div>
                <span className="crd-arrow">→</span>
                <div className="crd-chip instanceset">InstanceSet</div>
                <span className="crd-arrow">→</span>
                <div className="crd-chip pod">Pod × replicas</div>
              </div>
            </div>
          </div>
          <div style={{width:'220px',flexShrink:0,borderRadius:'12px',border:'1px solid #1f6feb33',background:'#0a1628',padding:'14px 16px',display:'flex',flexDirection:'column',justifyContent:'center',gap:'6px'}}>
            <div style={{fontSize:'10px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'#4a7ab5',marginBottom:'2px'}}>Startup Dependencies</div>
            <div style={{fontSize:'10px',color:'#4a7ab5',lineHeight:1.9}}>
              ① config-server (CSRS) must be ready<br/>
              ② shards register with CSRS<br/>
              ③ mongos requires reachable CSRS<br/>
              &nbsp;&nbsp;&nbsp;before routing queries<br/>
              ⚙ Scale shards: add/remove shard,<br/>
              &nbsp;&nbsp;&nbsp;KubeBlocks migrates chunks
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="legend">
          <div className="legend-item"><span className="legend-dot" style={{background:'#388bfd'}}></span>KubeBlocks Operator</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#a371f7'}}></span>Mongos (query router)</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#56d4dd'}}></span>Config Server (CSRS)</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#3fb950'}}></span>Shard Primary</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#8b949e'}}></span>Shard Secondary</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#f85149'}}></span>Failover Path</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#e3b341'}}></span>Persistent Storage</div>
        </div>

      </div>
    </>
  );
}
