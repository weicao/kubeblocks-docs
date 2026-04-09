import React from 'react';

export default function ZookeeperArchitectureDiagram() {
  return (
    <>
      <style>{`
        .zk-ha-diagram * { box-sizing: border-box; }
        .zk-ha-diagram {
          background: #0d1117;
          font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: #e6edf3;
          padding: 28px;
          border-radius: 16px;
          margin-bottom: 32px;
        }
        .zk-ha-diagram .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
        .zk-ha-diagram .dot-blue   { background: #388bfd; }
        .zk-ha-diagram .dot-green  { background: #3fb950; }
        .zk-ha-diagram .dot-purple { background: #a371f7; }
        .zk-ha-diagram .dot-red    { background: #f85149; }
        .zk-ha-diagram .card-title {
          font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; margin-bottom: 10px;
          display: flex; align-items: center; gap: 6px;
        }
        .zk-ha-diagram .main-area {
          display: flex; gap: 16px; align-items: flex-start;
        }
        .zk-ha-diagram .data-plane {
          flex: 1; display: flex; flex-direction: column; gap: 0;
        }
        .zk-ha-diagram .client-mini {
          border-radius: 12px; border: 1px solid #30363d;
          background: #161b22; padding: 12px 16px;
          display: flex; align-items: center; gap: 14px;
        }
        .zk-ha-diagram .client-label { font-size: 13px; font-weight: 600; color: #f0f6fc; }
        .zk-ha-diagram .client-routes { font-size: 10px; color: #7d8590; margin-top: 3px; line-height: 1.8; }
        .zk-ha-diagram .v-arrow {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          height: 36px;
        }
        .zk-ha-diagram .v-arrow-line { display: flex; flex-direction: column; align-items: center; }
        .zk-ha-diagram .v-line { width: 2px; height: 20px; position: relative; }
        .zk-ha-diagram .v-line-green { background: linear-gradient(to bottom, #23863688, #3fb950); }
        .zk-ha-diagram .v-line-green::after {
          content: ''; position: absolute; bottom: 0; left: 50%;
          transform: translateX(-50%);
          border-left: 5px solid transparent; border-right: 5px solid transparent;
          border-top: 7px solid #3fb950;
        }
        .zk-ha-diagram .v-line-teal { background: linear-gradient(to bottom, #1b7c8388, #56d4dd); }
        .zk-ha-diagram .v-line-teal::after {
          content: ''; position: absolute; bottom: 0; left: 50%;
          transform: translateX(-50%);
          border-left: 5px solid transparent; border-right: 5px solid transparent;
          border-top: 7px solid #56d4dd;
        }
        .zk-ha-diagram .v-line-gray { background: linear-gradient(to bottom, #30363d88, #484f58); }
        .zk-ha-diagram .v-line-gray::after {
          content: ''; position: absolute; bottom: 0; left: 50%;
          transform: translateX(-50%);
          border-left: 5px solid transparent; border-right: 5px solid transparent;
          border-top: 7px solid #484f58;
        }
        .zk-ha-diagram .v-arrow-label { font-size: 9px; color: #484f58; letter-spacing: 1px; white-space: nowrap; }
        .zk-ha-diagram .services-block {
          border-radius: 12px; border: 1px solid #238636;
          background: #0a1a0a; padding: 14px 16px;
        }
        .zk-ha-diagram .services-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 8px;
        }
        .zk-ha-diagram .svc-card { border-radius: 8px; border: 1px solid; padding: 10px 12px; }
        .zk-ha-diagram .svc-rw  { border-color: #3fb950; background: #0a1a0a; }
        .zk-ha-diagram .svc-all { border-color: #1b7c83; background: #061515; }
        .zk-ha-diagram .svc-hl  { border-color: #30363d; background: #0d1117; }
        .zk-ha-diagram .svc-name { font-size: 12px; font-weight: 700; margin-bottom: 4px; }
        .zk-ha-diagram .svc-rw  .svc-name { color: #3fb950; }
        .zk-ha-diagram .svc-all .svc-name { color: #56d4dd; }
        .zk-ha-diagram .svc-hl  .svc-name { color: #7d8590; }
        .zk-ha-diagram .svc-detail { font-size: 10px; color: #7d8590; line-height: 1.6; }
        .zk-ha-diagram .svc-tag {
          display: inline-block; font-size: 9px; font-weight: 700;
          letter-spacing: 1px; padding: 2px 6px; border-radius: 4px;
          text-transform: uppercase; margin-top: 4px;
        }
        .zk-ha-diagram .tag-green { background: #1a4a1a; color: #3fb950; }
        .zk-ha-diagram .tag-teal  { background: #061515; color: #56d4dd; }
        .zk-ha-diagram .tag-gray  { background: #21262d; color: #8b949e; }
        .zk-ha-diagram .section-label {
          font-size: 10px; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; color: #7d8590; margin-bottom: 8px;
        }
        .zk-ha-diagram .pods-section {
          border-radius: 12px; border: 1px solid #30363d;
          background: #0d1117; padding: 16px;
        }
        .zk-ha-diagram .pods-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 10px;
        }
        .zk-ha-diagram .pod-card { border-radius: 10px; border: 1px solid #30363d; background: #161b22; overflow: hidden; }
        .zk-ha-diagram .pod-header {
          padding: 9px 12px; display: flex; align-items: center; justify-content: space-between;
          border-bottom: 1px solid #21262d;
        }
        .zk-ha-diagram .pod-leader .pod-header { background: linear-gradient(135deg,#0d2510,#1a3820); border-bottom-color: #238636; }
        .zk-ha-diagram .pod-follower .pod-header { background: linear-gradient(135deg,#0d1f38,#162840); border-bottom-color: #1f6feb; }
        .zk-ha-diagram .pod-name { font-size: 11px; font-weight: 700; color: #f0f6fc; }
        .zk-ha-diagram .pod-badge {
          font-size: 9px; font-weight: 700; letter-spacing: 1px;
          text-transform: uppercase; padding: 2px 7px; border-radius: 10px;
        }
        .zk-ha-diagram .badge-leader   { background: #1a4a1a; color: #3fb950; border: 1px solid #238636; }
        .zk-ha-diagram .badge-follower { background: #0d2035; color: #79c0ff; border: 1px solid #1f6feb; }
        .zk-ha-diagram .containers { padding: 8px; display: flex; flex-direction: column; gap: 4px; }
        .zk-ha-diagram .container-row {
          display: flex; align-items: center; gap: 7px; padding: 5px 8px;
          border-radius: 6px; border: 1px solid #21262d; background: #0d1117;
        }
        .zk-ha-diagram .container-icon { font-size: 13px; }
        .zk-ha-diagram .container-info { flex: 1; }
        .zk-ha-diagram .container-name { font-size: 11px; font-weight: 600; color: #e6edf3; }
        .zk-ha-diagram .container-port { font-size: 10px; color: #7d8590; }
        .zk-ha-diagram .pvc-row {
          margin: 0 8px 8px; padding: 5px 8px; border-radius: 6px;
          border: 1px dashed #30363d; background: #0d1117;
          display: flex; align-items: center; gap: 6px; font-size: 10px; color: #7d8590;
        }
        .zk-ha-diagram .replication-bar {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 7px; border-radius: 8px; background: #0a1a14;
          border: 1px solid #238636; margin-top: 10px; font-size: 11px; color: #3fb950;
        }
                .zk-ha-diagram .legend {
          display: flex; gap: 18px; flex-wrap: wrap; justify-content: center;
          padding-top: 8px; border-top: 1px solid #21262d; margin-top: 16px;
        }
        .zk-ha-diagram .legend-item { display: flex; align-items: center; gap: 5px; font-size: 10px; color: #7d8590; }
        .zk-ha-diagram .legend-dot { width: 8px; height: 8px; border-radius: 50%; }
      `}</style>

      <div className="zk-ha-diagram">

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
                  Write/coord&nbsp; <code style={{color:'#3fb950'}}>zk-cluster-zookeeper:2181</code><br/>
                  Read (all nodes)&nbsp; <code style={{color:'#56d4dd'}}>zk-cluster-zookeeper-readable:2181</code>
                </div>
              </div>
            </div>

            {/* Arrow: Client → Service */}
            <div className="v-arrow">
              <div className="v-arrow-line">
                <div className="v-line v-line-green"></div>
              </div>
              <span className="v-arrow-label" style={{color:'#3fb95088'}}>RW → roleSelector: leader</span>
              <div className="v-arrow-line">
                <div className="v-line v-line-teal"></div>
              </div>
              <span className="v-arrow-label" style={{color:'#56d4dd88'}}>Read → all pods (no roleSelector)</span>
            </div>

            {/* Services */}
            <div className="services-block">
              <div className="card-title" style={{color:'#3fb950'}}>
                <span className="dot dot-green"></span>
                Kubernetes Services
              </div>
              <div className="services-grid">
                <div className="svc-card svc-rw">
                  <div className="svc-name">zk-cluster-zookeeper</div>
                  <div className="svc-detail">
                    ClusterIP · :2181 client · :8080 admin<br/>
                    selector: <code style={{color:'#3fb950'}}>kubeblocks.io/role=leader</code><br/>
                    Endpoints auto-switch with leader
                  </div>
                  <span className="svc-tag tag-green">Leader</span>
                </div>
                <div className="svc-card svc-all">
                  <div className="svc-name">zk-cluster-zookeeper-readable</div>
                  <div className="svc-detail">
                    ClusterIP · :2181 client<br/>
                    no roleSelector → all pods<br/>
                    Distribute reads across all nodes
                  </div>
                  <span className="svc-tag tag-teal">All Nodes</span>
                </div>
              </div>
            </div>

            {/* Arrow: Service → Pods */}
            <div className="v-arrow">
              <div className="v-arrow-line">
                <div className="v-line v-line-green"></div>
              </div>
              <span className="v-arrow-label" style={{color:'#3fb95088'}}>→ leader pod</span>
              <div className="v-arrow-line">
                <div className="v-line v-line-teal"></div>
              </div>
              <span className="v-arrow-label" style={{color:'#56d4dd88'}}>→ any pod (load balanced)</span>
            </div>

            {/* Pods */}
            <div className="pods-section">
              <div className="section-label">Pods · Worker Nodes</div>
              <div className="pods-grid">

                {/* Leader */}
                <div className="pod-card pod-leader">
                  <div className="pod-header">
                    <span className="pod-name">zookeeper-0</span>
                    <span className="pod-badge badge-leader">LEADER</span>
                  </div>
                  <div className="containers">
                    <div className="container-row" style={{borderColor:'#23863644',background:'#081208'}}>
                      <span className="container-icon">🦒</span>
                      <div className="container-info">
                        <div className="container-name">zookeeper</div>
                        <div className="container-port">:2181 client · :2888 quorum/follower · :3888 elect · :7000 metrics (pod only) · :8080 admin</div>
                      </div>
                      <div style={{color:'#3fb950',fontSize:'10px'}}>leader</div>
                    </div>
                  </div>
                  <div className="pvc-row">💾 PVC <strong style={{color:'#e3b341'}}>data-0</strong> · 10Gi</div>
                </div>

                {/* Follower-1 */}
                <div className="pod-card pod-follower">
                  <div className="pod-header">
                    <span className="pod-name">zookeeper-1</span>
                    <span className="pod-badge badge-follower">FOLLOWER</span>
                  </div>
                  <div className="containers">
                    <div className="container-row" style={{borderColor:'#1f6feb44',background:'#080d18'}}>
                      <span className="container-icon">🦒</span>
                      <div className="container-info">
                        <div className="container-name">zookeeper</div>
                        <div className="container-port">:2181 client · :2888 quorum/follower · :3888 elect · :7000 metrics (pod only) · :8080 admin</div>
                      </div>
                      <div style={{color:'#79c0ff',fontSize:'10px'}}>follower</div>
                    </div>
                  </div>
                  <div className="pvc-row">💾 PVC <strong style={{color:'#e3b341'}}>data-1</strong> · 10Gi</div>
                </div>

                {/* Follower-2 */}
                <div className="pod-card pod-follower">
                  <div className="pod-header">
                    <span className="pod-name">zookeeper-2</span>
                    <span className="pod-badge badge-follower">FOLLOWER</span>
                  </div>
                  <div className="containers">
                    <div className="container-row" style={{borderColor:'#1f6feb44',background:'#080d18'}}>
                      <span className="container-icon">🦒</span>
                      <div className="container-info">
                        <div className="container-name">zookeeper</div>
                        <div className="container-port">:2181 client · :2888 quorum/follower · :3888 elect · :7000 metrics (pod only) · :8080 admin</div>
                      </div>
                      <div style={{color:'#79c0ff',fontSize:'10px'}}>follower</div>
                    </div>
                  </div>
                  <div className="pvc-row">💾 PVC <strong style={{color:'#e3b341'}}>data-2</strong> · 10Gi</div>
                </div>

              </div>

              <div className="replication-bar">
                <span>↔</span>
                <strong>ZAB Protocol (ZooKeeper Atomic Broadcast)</strong>
                <span style={{color:'#7d8590'}}>all writes go through leader · broadcast to followers · majority ack required</span>
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
          <div className="legend-item"><span className="legend-dot" style={{background:'#3fb950'}}></span>Leader / Client Traffic</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#79c0ff'}}></span>Follower Pod</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#e3b341'}}></span>Persistent Storage</div>
        </div>

      </div>
    </>
  );
}
