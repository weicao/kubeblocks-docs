import React from 'react';

export default function EtcdArchitectureDiagram() {
  return (
    <>
      <style>{`
        .etcd-ha-diagram * { box-sizing: border-box; }
        .etcd-ha-diagram {
          background: #0d1117;
          font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: #e6edf3;
          padding: 28px;
          border-radius: 16px;
          margin-bottom: 32px;
        }
        .etcd-ha-diagram .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
        .etcd-ha-diagram .dot-blue   { background: #388bfd; }
        .etcd-ha-diagram .dot-green  { background: #3fb950; }
        .etcd-ha-diagram .dot-purple { background: #a371f7; }
        .etcd-ha-diagram .dot-orange { background: #e3b341; }
        .etcd-ha-diagram .dot-teal   { background: #56d4dd; }
        .etcd-ha-diagram .dot-red    { background: #f85149; }
        .etcd-ha-diagram .card-title {
          font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; margin-bottom: 10px;
          display: flex; align-items: center; gap: 6px;
        }
        .etcd-ha-diagram .main-area {
          display: flex; gap: 16px; align-items: flex-start;
        }
        .etcd-ha-diagram .data-plane {
          flex: 1; display: flex; flex-direction: column; gap: 0;
        }
        .etcd-ha-diagram .mgmt-sidebar {
          width: 260px; flex-shrink: 0;
          display: flex; flex-direction: column; gap: 12px; padding-top: 4px;
        }
        .etcd-ha-diagram .client-mini {
          border-radius: 12px; border: 1px solid #30363d;
          background: #161b22; padding: 12px 16px;
          display: flex; align-items: center; gap: 14px;
        }
        .etcd-ha-diagram .client-label { font-size: 13px; font-weight: 600; color: #f0f6fc; }
        .etcd-ha-diagram .client-routes { font-size: 10px; color: #7d8590; margin-top: 3px; line-height: 1.8; }
        .etcd-ha-diagram .v-arrow {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          height: 36px;
        }
        .etcd-ha-diagram .v-arrow-line { display: flex; flex-direction: column; align-items: center; }
        .etcd-ha-diagram .v-line { width: 2px; height: 20px; position: relative; }
        .etcd-ha-diagram .v-line-green { background: linear-gradient(to bottom, #23863688, #3fb950); }
        .etcd-ha-diagram .v-line-green::after {
          content: ''; position: absolute; bottom: 0; left: 50%;
          transform: translateX(-50%);
          border-left: 5px solid transparent; border-right: 5px solid transparent;
          border-top: 7px solid #3fb950;
        }
        .etcd-ha-diagram .v-line-gray { background: linear-gradient(to bottom, #30363d88, #484f58); }
        .etcd-ha-diagram .v-line-gray::after {
          content: ''; position: absolute; bottom: 0; left: 50%;
          transform: translateX(-50%);
          border-left: 5px solid transparent; border-right: 5px solid transparent;
          border-top: 7px solid #484f58;
        }
        .etcd-ha-diagram .v-arrow-label { font-size: 9px; color: #484f58; letter-spacing: 1px; white-space: nowrap; }
        .etcd-ha-diagram .services-block {
          border-radius: 12px; border: 1px solid #238636;
          background: #0a1a0a; padding: 14px 16px;
        }
        .etcd-ha-diagram .services-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 8px;
        }
        .etcd-ha-diagram .svc-card { border-radius: 8px; border: 1px solid; padding: 10px 12px; }
        .etcd-ha-diagram .svc-rw { border-color: #3fb950; background: #0a1a0a; }
        .etcd-ha-diagram .svc-hl { border-color: #30363d; background: #0d1117; }
        .etcd-ha-diagram .svc-name { font-size: 12px; font-weight: 700; margin-bottom: 4px; }
        .etcd-ha-diagram .svc-rw .svc-name { color: #3fb950; }
        .etcd-ha-diagram .svc-hl .svc-name { color: #7d8590; }
        .etcd-ha-diagram .svc-detail { font-size: 10px; color: #7d8590; line-height: 1.6; }
        .etcd-ha-diagram .svc-tag {
          display: inline-block; font-size: 9px; font-weight: 700;
          letter-spacing: 1px; padding: 2px 6px; border-radius: 4px;
          text-transform: uppercase; margin-top: 4px;
        }
        .etcd-ha-diagram .tag-green { background: #1a4a1a; color: #3fb950; }
        .etcd-ha-diagram .tag-gray  { background: #21262d; color: #8b949e; }
        .etcd-ha-diagram .section-label {
          font-size: 10px; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; color: #7d8590; margin-bottom: 8px;
        }
        .etcd-ha-diagram .pods-section {
          border-radius: 12px; border: 1px solid #30363d;
          background: #0d1117; padding: 16px;
        }
        .etcd-ha-diagram .pods-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 10px;
        }
        .etcd-ha-diagram .pod-card { border-radius: 10px; border: 1px solid #30363d; background: #161b22; overflow: hidden; }
        .etcd-ha-diagram .pod-header {
          padding: 9px 12px; display: flex; align-items: center; justify-content: space-between;
          border-bottom: 1px solid #21262d;
        }
        .etcd-ha-diagram .pod-primary .pod-header { background: linear-gradient(135deg,#0d2510,#1a3820); border-bottom-color: #238636; }
        .etcd-ha-diagram .pod-replica .pod-header { background: linear-gradient(135deg,#0d1f38,#162840); border-bottom-color: #1f6feb; }
        .etcd-ha-diagram .pod-name { font-size: 11px; font-weight: 700; color: #f0f6fc; }
        .etcd-ha-diagram .pod-badge {
          font-size: 9px; font-weight: 700; letter-spacing: 1px;
          text-transform: uppercase; padding: 2px 7px; border-radius: 10px;
        }
        .etcd-ha-diagram .badge-primary { background: #1a4a1a; color: #3fb950; border: 1px solid #238636; }
        .etcd-ha-diagram .badge-replica { background: #0d2035; color: #79c0ff; border: 1px solid #1f6feb; }
        .etcd-ha-diagram .containers { padding: 8px; display: flex; flex-direction: column; gap: 4px; }
        .etcd-ha-diagram .container-row {
          display: flex; align-items: center; gap: 7px; padding: 5px 8px;
          border-radius: 6px; border: 1px solid #21262d; background: #0d1117;
        }
        .etcd-ha-diagram .container-icon { font-size: 13px; }
        .etcd-ha-diagram .container-info { flex: 1; }
        .etcd-ha-diagram .container-name { font-size: 11px; font-weight: 600; color: #e6edf3; }
        .etcd-ha-diagram .container-port { font-size: 10px; color: #7d8590; }
        .etcd-ha-diagram .pvc-row {
          margin: 0 8px 8px; padding: 5px 8px; border-radius: 6px;
          border: 1px dashed #30363d; background: #0d1117;
          display: flex; align-items: center; gap: 6px; font-size: 10px; color: #7d8590;
        }
        .etcd-ha-diagram .replication-bar {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 7px; border-radius: 8px; background: #0a1a14;
          border: 1px solid #238636; margin-top: 10px; font-size: 11px; color: #3fb950;
        }
        .etcd-ha-diagram .sidebar-card { border-radius: 10px; border: 1px solid; padding: 12px 14px; }
        .etcd-ha-diagram .dcs-card { border-color: #1b7c83; background: #0a1e20; }
        .etcd-ha-diagram .dcs-items { display: flex; flex-direction: column; gap: 5px; margin-top: 8px; }
        .etcd-ha-diagram .dcs-item {
          padding: 5px 9px; border-radius: 6px; border: 1px solid #1b7c8355;
          background: #061515; font-size: 10px; color: #56d4dd; line-height: 1.5;
        }
        .etcd-ha-diagram .dcs-item span { color: #7d8590; }
        .etcd-ha-diagram .failover-card { border-color: #da3633; background: #1c0a0a; }
        .etcd-ha-diagram .failover-steps { display: flex; flex-direction: column; gap: 4px; margin-top: 8px; }
        .etcd-ha-diagram .step { display: flex; align-items: flex-start; gap: 7px; font-size: 10px; color: #cdd9e5; line-height: 1.5; }
        .etcd-ha-diagram .step-num {
          width: 16px; height: 16px; border-radius: 50%; flex-shrink: 0;
          background: #da363322; border: 1px solid #da363388;
          display: flex; align-items: center; justify-content: center;
          font-size: 9px; font-weight: 700; color: #f85149; margin-top: 1px;
        }
        .etcd-ha-diagram .accounts-card { border-color: #d2992244; background: #1a1505; }
        .etcd-ha-diagram .accounts-grid { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 8px; }
        .etcd-ha-diagram .acc-chip {
          padding: 3px 8px; border-radius: 5px;
          border: 1px solid #d2992233; background: #0d0d00; font-size: 10px; color: #e3b341;
        }
        .etcd-ha-diagram .acc-chip span { color: #484f58; font-size: 9px; display: block; }
        .etcd-ha-diagram .operator-block {
          flex: 1; border-radius: 12px; border: 1px solid #1f6feb;
          background: #0d1f38; padding: 16px 20px;
        }
        .etcd-ha-diagram .operator-controllers { display: flex; gap: 8px; margin-top: 8px; }
        .etcd-ha-diagram .ctrl-chip {
          flex: 1; padding: 8px 10px; border-radius: 8px; border: 1px solid #1f6feb44;
          background: #0a1628; font-size: 11px; color: #79c0ff; text-align: center;
        }
        .etcd-ha-diagram .ctrl-chip .ctrl-name { font-weight: 700; font-size: 12px; display: block; margin-bottom: 2px; }
        .etcd-ha-diagram .ctrl-chip .ctrl-sub { font-size: 10px; color: #4a7ab5; }
        .etcd-ha-diagram .crd-chain { display: flex; align-items: center; gap: 6px; margin-top: 10px; flex-wrap: wrap; }
        .etcd-ha-diagram .crd-chip { padding: 4px 10px; border-radius: 20px; border: 1px solid; font-size: 11px; font-weight: 600; white-space: nowrap; }
        .etcd-ha-diagram .crd-chip.cluster     { border-color: #a371f7; color: #d2a8ff; background: #2d1f5e; }
        .etcd-ha-diagram .crd-chip.component   { border-color: #79c0ff; color: #79c0ff; background: #1a3050; }
        .etcd-ha-diagram .crd-chip.instanceset { border-color: #7ee787; color: #7ee787; background: #1a3020; }
        .etcd-ha-diagram .crd-chip.pod         { border-color: #e3b341; color: #e3b341; background: #302010; }
        .etcd-ha-diagram .crd-arrow { color: #484f58; font-size: 14px; }
        .etcd-ha-diagram .legend {
          display: flex; gap: 18px; flex-wrap: wrap; justify-content: center;
          padding-top: 8px; border-top: 1px solid #21262d; margin-top: 16px;
        }
        .etcd-ha-diagram .legend-item { display: flex; align-items: center; gap: 5px; font-size: 10px; color: #7d8590; }
        .etcd-ha-diagram .legend-dot { width: 8px; height: 8px; border-radius: 50%; }
      `}</style>

      <div className="etcd-ha-diagram">

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
                  Client (if enabled)&nbsp; <code style={{color:'#3fb950'}}>{'{cluster}'}-etcd-client:2379</code><br/>
                  Default&nbsp; <code style={{color:'#56d4dd'}}>{'{cluster}'}-etcd-headless</code> (pod DNS)
                </div>
              </div>
            </div>

            {/* Arrow: Client → Service */}
            <div className="v-arrow">
              <div className="v-arrow-line">
                <div className="v-line v-line-green"></div>
              </div>
              <span className="v-arrow-label" style={{color:'#3fb95088'}}>client API → all pods (no roleSelector; etcd routes internally)</span>
            </div>

            {/* Services */}
            <div className="services-block">
              <div className="card-title" style={{color:'#3fb950'}}>
                <span className="dot dot-green"></span>
                Kubernetes Services
              </div>
              <div className="services-grid" style={{gridTemplateColumns:'1fr'}}>
                <div className="svc-card svc-rw">
                  <div className="svc-name">{'{cluster}'}-etcd-client</div>
                  <div className="svc-detail">
                    ClusterIP · :2379 client<br/>
                    all pods (no roleSelector)<br/>
                    <span style={{color:'#484f58'}}>disableAutoProvision: true — not created by default</span>
                  </div>
                  <span className="svc-tag tag-green">Optional</span>
                </div>
              </div>
            </div>

            {/* Arrow: Service → Pods */}
            <div className="v-arrow">
              <div className="v-arrow-line">
                <div className="v-line v-line-green"></div>
              </div>
              <span className="v-arrow-label" style={{color:'#3fb95088'}}>→ any pod (etcd forwards to leader transparently)</span>
            </div>

            {/* Pods */}
            <div className="pods-section">
              <div className="section-label">Pods · Worker Nodes</div>
              <div className="pods-grid">

                {/* Leader / Pod 0 */}
                <div className="pod-card pod-primary">
                  <div className="pod-header">
                    <span className="pod-name">etcd-0</span>
                    <span className="pod-badge badge-primary">LEADER</span>
                  </div>
                  <div className="containers">
                    <div className="container-row" style={{borderColor:'#23863644',background:'#081208'}}>
                      <span className="container-icon">🔑</span>
                      <div className="container-info">
                        <div className="container-name">etcd</div>
                        <div className="container-port">:2379 client + /metrics · :2380 peer · exec roleProbe</div>
                      </div>
                      <div style={{color:'#3fb950',fontSize:'10px'}}>leader</div>
                    </div>
                  </div>
                  <div className="pvc-row">💾 PVC <strong style={{color:'#e3b341'}}>data-0</strong> · 10Gi</div>
                </div>

                {/* Follower / Pod 1 */}
                <div className="pod-card pod-replica">
                  <div className="pod-header">
                    <span className="pod-name">etcd-1</span>
                    <span className="pod-badge badge-replica">FOLLOWER</span>
                  </div>
                  <div className="containers">
                    <div className="container-row" style={{borderColor:'#1f6feb44',background:'#080d18'}}>
                      <span className="container-icon">🔑</span>
                      <div className="container-info">
                        <div className="container-name">etcd</div>
                        <div className="container-port">:2379 client + /metrics · :2380 peer · exec roleProbe</div>
                      </div>
                      <div style={{color:'#79c0ff',fontSize:'10px'}}>follower</div>
                    </div>
                  </div>
                  <div className="pvc-row">💾 PVC <strong style={{color:'#e3b341'}}>data-1</strong> · 10Gi</div>
                </div>

                {/* Follower / Pod 2 */}
                <div className="pod-card pod-replica">
                  <div className="pod-header">
                    <span className="pod-name">etcd-2</span>
                    <span className="pod-badge badge-replica">FOLLOWER</span>
                  </div>
                  <div className="containers">
                    <div className="container-row" style={{borderColor:'#1f6feb44',background:'#080d18'}}>
                      <span className="container-icon">🔑</span>
                      <div className="container-info">
                        <div className="container-name">etcd</div>
                        <div className="container-port">:2379 client + /metrics · :2380 peer · exec roleProbe</div>
                      </div>
                      <div style={{color:'#79c0ff',fontSize:'10px'}}>follower</div>
                    </div>
                  </div>
                  <div className="pvc-row">💾 PVC <strong style={{color:'#e3b341'}}>data-2</strong> · 10Gi</div>
                </div>

              </div>

              <div className="replication-bar">
                <span>↔</span>
                <strong>Raft Consensus</strong>
                <span style={{color:'#7d8590'}}>leader-0 replicates WAL → follower-1 · follower-2 &nbsp;|&nbsp; quorum acknowledgment required</span>
              </div>
              <div style={{marginTop:'8px',padding:'5px 10px',borderRadius:'6px',border:'1px dashed #30363d',fontSize:'10px',color:'#484f58',display:'flex',alignItems:'center',gap:'6px'}}>
                <span>🔗</span>
                <span><strong style={{color:'#6e7681'}}>Headless service</strong> — stable pod DNS for internal use (replication, HA heartbeat, operator probes); not a client endpoint</span>
              </div>
            </div>

          </div>{/* /data-plane */}

          {/* RIGHT SIDEBAR */}
          <div className="mgmt-sidebar">

            {/* Raft Consensus */}
            <div className="sidebar-card dcs-card">
              <div className="card-title" style={{color:'#56d4dd',fontSize:'10px'}}>
                <span className="dot dot-teal"></span>
                Raft Consensus
              </div>
              <div className="dcs-items">
                <div className="dcs-item">
                  <span>Leader lease</span><br/>
                  TTL configurable · heartbeat interval
                </div>
                <div className="dcs-item">
                  <span>ConfigMap</span> {'{scope}'}-config<br/>
                  cluster member list
                </div>
                <div className="dcs-item">
                  <span>Secret</span> account-*<br/>
                  root credentials (if auth enabled)
                </div>
              </div>
            </div>

            {/* Failover */}
            <div className="sidebar-card failover-card">
              <div className="card-title" style={{color:'#f85149',fontSize:'10px'}}>
                <span className="dot dot-red"></span>
                Failover Process
              </div>
              <div className="failover-steps">
                <div className="step"><span className="step-num">1</span>Leader Pod crashes</div>
                <div className="step"><span className="step-num">2</span>Raft heartbeat timeout (election timeout ≈150-300ms)</div>
                <div className="step"><span className="step-num">3</span>Follower starts election, increments term</div>
                <div className="step"><span className="step-num">4</span>Majority votes → new leader elected</div>
                <div className="step"><span className="step-num">5</span>roleProbe detects new leader</div>
                <div className="step"><span className="step-num">6</span>Pod label <code style={{color:'#3fb950'}}>role=leader</code> updated</div>
                <div className="step"><span className="step-num">7</span>Service Endpoints auto-switch</div>
              </div>
            </div>

            {/* System Accounts */}
            <div className="sidebar-card accounts-card">
              <div className="card-title" style={{color:'#e3b341',fontSize:'10px'}}>
                <span className="dot dot-orange"></span>
                System Accounts
              </div>
              <div className="accounts-grid">
                <div className="acc-chip">root<span>superuser</span></div>
                <div className="acc-chip">kbadmin<span>admin</span></div>
                <div className="acc-chip">kbdataprotection<span>backup</span></div>
                <div className="acc-chip">kbprobe<span>monitor</span></div>
              </div>
            </div>

          </div>{/* /sidebar */}
        </div>{/* /main-area */}

        {/* ══ SEPARATOR ══ */}
        <div style={{display:'flex',alignItems:'center',gap:'12px',fontSize:'10px',letterSpacing:'2px',textTransform:'uppercase',marginTop:'4px'}}>
          <div style={{flex:1,height:'1px',background:'#21262d'}}></div>
          <span style={{color:'#484f58'}}>Management Plane · KubeBlocks Operator</span>
          <div style={{flex:1,height:'1px',background:'#21262d'}}></div>
        </div>

        {/* ══ BOTTOM: Operator ══ */}
        <div style={{display:'flex',gap:'16px',alignItems:'stretch',marginTop:'4px'}}>
          <div className="operator-block">
            <div className="card-title" style={{color:'#79c0ff'}}>
              <span className="dot dot-blue"></span>
              KubeBlocks Operator
              <span style={{fontSize:'10px',fontWeight:400,color:'#4a7ab5',letterSpacing:0}}>· watches &amp; reconciles CRDs, drives creation and reconciliation of all above resources</span>
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
                <span className="ctrl-name">Ops Controller</span>
                <span className="ctrl-sub">Switchover / Scale</span>
              </div>
            </div>
            <div style={{marginTop:'10px'}}>
              <div style={{fontSize:'10px',color:'#484f58',marginBottom:'6px',letterSpacing:'1px'}}>CRD RESOURCE HIERARCHY</div>
              <div className="crd-chain">
                <div className="crd-chip cluster">Cluster</div>
                <span className="crd-arrow">→</span>
                <div className="crd-chip component">Component</div>
                <span className="crd-arrow">→</span>
                <div className="crd-chip instanceset">InstanceSet</div>
                <span className="crd-arrow">→</span>
                <div className="crd-chip pod">Pod × 3</div>
              </div>
            </div>
          </div>

          <div style={{width:'220px',flexShrink:0,borderRadius:'12px',border:'1px solid #1f6feb33',background:'#0a1628',padding:'14px 16px',display:'flex',flexDirection:'column',justifyContent:'center',gap:'6px'}}>
            <div style={{fontSize:'10px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'#4a7ab5',marginBottom:'2px'}}>Operator Responsibilities</div>
            <div style={{fontSize:'10px',color:'#4a7ab5',lineHeight:1.9}}>
              ⚙ Create / reconcile Pods, Services, PVCs<br/>
              ⚙ roleProbe: probe role every 1s<br/>
              ⚙ Update Pod label <code style={{color:'#3fb950'}}>role=leader</code><br/>
              ⚙ Execute switchover / scale ops<br/>
              ⚙ Manage SystemAccount Secrets
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="legend">
          <div className="legend-item"><span className="legend-dot" style={{background:'#388bfd'}}></span>KubeBlocks Operator (control plane)</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#a371f7'}}></span>CRD Resource</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#3fb950'}}></span>Leader / Client Traffic</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#79c0ff'}}></span>Follower Pod</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#56d4dd'}}></span>Raft Consensus</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#f85149'}}></span>Failover Path</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#e3b341'}}></span>Persistent Storage</div>
        </div>

      </div>
    </>
  );
}
