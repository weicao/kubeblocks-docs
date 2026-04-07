import React from 'react';

export default function KafkaArchitectureDiagram() {
  return (
    <>
      <style>{`
        .kafka-ha-diagram * { box-sizing: border-box; }
        .kafka-ha-diagram {
          background: #0d1117;
          font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: #e6edf3;
          padding: 28px;
          border-radius: 16px;
          margin-bottom: 32px;
        }
        .kafka-ha-diagram .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
        .kafka-ha-diagram .dot-blue   { background: #388bfd; }
        .kafka-ha-diagram .dot-green  { background: #3fb950; }
        .kafka-ha-diagram .dot-purple { background: #a371f7; }
        .kafka-ha-diagram .dot-orange { background: #e3b341; }
        .kafka-ha-diagram .dot-teal   { background: #56d4dd; }
        .kafka-ha-diagram .dot-red    { background: #f85149; }
        .kafka-ha-diagram .card-title {
          font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; margin-bottom: 10px;
          display: flex; align-items: center; gap: 6px;
        }
        .kafka-ha-diagram .main-area {
          display: flex; gap: 16px; align-items: flex-start;
        }
        .kafka-ha-diagram .data-plane {
          flex: 1; display: flex; flex-direction: column; gap: 0;
        }
        .kafka-ha-diagram .mgmt-sidebar {
          width: 260px; flex-shrink: 0;
          display: flex; flex-direction: column; gap: 12px; padding-top: 4px;
        }
        .kafka-ha-diagram .client-mini {
          border-radius: 12px; border: 1px solid #30363d;
          background: #161b22; padding: 12px 16px;
          display: flex; align-items: center; gap: 14px;
        }
        .kafka-ha-diagram .client-label { font-size: 13px; font-weight: 600; color: #f0f6fc; }
        .kafka-ha-diagram .client-routes { font-size: 10px; color: #7d8590; margin-top: 3px; line-height: 1.8; }
        .kafka-ha-diagram .v-arrow {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          height: 36px;
        }
        .kafka-ha-diagram .v-arrow-line { display: flex; flex-direction: column; align-items: center; }
        .kafka-ha-diagram .v-line { width: 2px; height: 20px; position: relative; }
        .kafka-ha-diagram .v-line-green { background: linear-gradient(to bottom, #23863688, #3fb950); }
        .kafka-ha-diagram .v-line-green::after {
          content: ''; position: absolute; bottom: 0; left: 50%;
          transform: translateX(-50%);
          border-left: 5px solid transparent; border-right: 5px solid transparent;
          border-top: 7px solid #3fb950;
        }
        .kafka-ha-diagram .v-line-gray { background: linear-gradient(to bottom, #30363d88, #484f58); }
        .kafka-ha-diagram .v-line-gray::after {
          content: ''; position: absolute; bottom: 0; left: 50%;
          transform: translateX(-50%);
          border-left: 5px solid transparent; border-right: 5px solid transparent;
          border-top: 7px solid #484f58;
        }
        .kafka-ha-diagram .v-arrow-label { font-size: 9px; color: #484f58; letter-spacing: 1px; white-space: nowrap; }
        .kafka-ha-diagram .services-block {
          border-radius: 12px; border: 1px solid #238636;
          background: #0a1a0a; padding: 14px 16px;
        }
        .kafka-ha-diagram .services-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 8px;
        }
        .kafka-ha-diagram .svc-card { border-radius: 8px; border: 1px solid; padding: 10px 12px; }
        .kafka-ha-diagram .svc-rw { border-color: #3fb950; background: #0a1a0a; }
        .kafka-ha-diagram .svc-hl { border-color: #30363d; background: #0d1117; }
        .kafka-ha-diagram .svc-name { font-size: 12px; font-weight: 700; margin-bottom: 4px; }
        .kafka-ha-diagram .svc-rw .svc-name { color: #3fb950; }
        .kafka-ha-diagram .svc-hl .svc-name { color: #7d8590; }
        .kafka-ha-diagram .svc-detail { font-size: 10px; color: #7d8590; line-height: 1.6; }
        .kafka-ha-diagram .svc-tag {
          display: inline-block; font-size: 9px; font-weight: 700;
          letter-spacing: 1px; padding: 2px 6px; border-radius: 4px;
          text-transform: uppercase; margin-top: 4px;
        }
        .kafka-ha-diagram .tag-green { background: #1a4a1a; color: #3fb950; }
        .kafka-ha-diagram .tag-gray  { background: #21262d; color: #8b949e; }
        .kafka-ha-diagram .section-label {
          font-size: 10px; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; color: #7d8590; margin-bottom: 8px;
        }
        .kafka-ha-diagram .pods-section {
          border-radius: 12px; border: 1px solid #30363d;
          background: #0d1117; padding: 16px;
        }
        .kafka-ha-diagram .pods-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 10px;
        }
        .kafka-ha-diagram .pod-card { border-radius: 10px; border: 1px solid #30363d; background: #161b22; overflow: hidden; }
        .kafka-ha-diagram .pod-header {
          padding: 9px 12px; display: flex; align-items: center; justify-content: space-between;
          border-bottom: 1px solid #21262d;
        }
        .kafka-ha-diagram .pod-controller .pod-header { background: linear-gradient(135deg,#1a0d38,#281a50); border-bottom-color: #6e40c9; }
        .kafka-ha-diagram .pod-broker .pod-header { background: linear-gradient(135deg,#0d1f38,#162840); border-bottom-color: #1f6feb; }
        .kafka-ha-diagram .pod-name { font-size: 11px; font-weight: 700; color: #f0f6fc; }
        .kafka-ha-diagram .pod-badge {
          font-size: 9px; font-weight: 700; letter-spacing: 1px;
          text-transform: uppercase; padding: 2px 7px; border-radius: 10px;
        }
        .kafka-ha-diagram .badge-controller { background: #1e0d40; color: #c084fc; border: 1px solid #6e40c9; }
        .kafka-ha-diagram .badge-broker { background: #0d2035; color: #79c0ff; border: 1px solid #1f6feb; }
        .kafka-ha-diagram .containers { padding: 8px; display: flex; flex-direction: column; gap: 4px; }
        .kafka-ha-diagram .container-row {
          display: flex; align-items: center; gap: 7px; padding: 5px 8px;
          border-radius: 6px; border: 1px solid #21262d; background: #0d1117;
        }
        .kafka-ha-diagram .container-icon { font-size: 13px; }
        .kafka-ha-diagram .container-info { flex: 1; }
        .kafka-ha-diagram .container-name { font-size: 11px; font-weight: 600; color: #e6edf3; }
        .kafka-ha-diagram .container-port { font-size: 10px; color: #7d8590; }
        .kafka-ha-diagram .pvc-row {
          margin: 0 8px 8px; padding: 5px 8px; border-radius: 6px;
          border: 1px dashed #30363d; background: #0d1117;
          display: flex; align-items: center; gap: 6px; font-size: 10px; color: #7d8590;
        }
        .kafka-ha-diagram .replication-bar {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 7px; border-radius: 8px; background: #0a1a14;
          border: 1px solid #238636; margin-top: 10px; font-size: 11px; color: #3fb950;
        }
        .kafka-ha-diagram .sidebar-card { border-radius: 10px; border: 1px solid; padding: 12px 14px; }
        .kafka-ha-diagram .dcs-card { border-color: #1b7c83; background: #0a1e20; }
        .kafka-ha-diagram .dcs-items { display: flex; flex-direction: column; gap: 5px; margin-top: 8px; }
        .kafka-ha-diagram .dcs-item {
          padding: 5px 9px; border-radius: 6px; border: 1px solid #1b7c8355;
          background: #061515; font-size: 10px; color: #56d4dd; line-height: 1.5;
        }
        .kafka-ha-diagram .dcs-item span { color: #7d8590; }
        .kafka-ha-diagram .failover-card { border-color: #da3633; background: #1c0a0a; }
        .kafka-ha-diagram .failover-steps { display: flex; flex-direction: column; gap: 4px; margin-top: 8px; }
        .kafka-ha-diagram .step { display: flex; align-items: flex-start; gap: 7px; font-size: 10px; color: #cdd9e5; line-height: 1.5; }
        .kafka-ha-diagram .step-num {
          width: 16px; height: 16px; border-radius: 50%; flex-shrink: 0;
          background: #da363322; border: 1px solid #da363388;
          display: flex; align-items: center; justify-content: center;
          font-size: 9px; font-weight: 700; color: #f85149; margin-top: 1px;
        }
        .kafka-ha-diagram .accounts-card { border-color: #d2992244; background: #1a1505; }
        .kafka-ha-diagram .accounts-grid { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 8px; }
        .kafka-ha-diagram .acc-chip {
          padding: 3px 8px; border-radius: 5px;
          border: 1px solid #d2992233; background: #0d0d00; font-size: 10px; color: #e3b341;
        }
        .kafka-ha-diagram .acc-chip span { color: #484f58; font-size: 9px; display: block; }
        .kafka-ha-diagram .operator-block {
          flex: 1; border-radius: 12px; border: 1px solid #1f6feb;
          background: #0d1f38; padding: 16px 20px;
        }
        .kafka-ha-diagram .operator-controllers { display: flex; gap: 8px; margin-top: 8px; }
        .kafka-ha-diagram .ctrl-chip {
          flex: 1; padding: 8px 10px; border-radius: 8px; border: 1px solid #1f6feb44;
          background: #0a1628; font-size: 11px; color: #79c0ff; text-align: center;
        }
        .kafka-ha-diagram .ctrl-chip .ctrl-name { font-weight: 700; font-size: 12px; display: block; margin-bottom: 2px; }
        .kafka-ha-diagram .ctrl-chip .ctrl-sub { font-size: 10px; color: #4a7ab5; }
        .kafka-ha-diagram .crd-chain { display: flex; align-items: center; gap: 6px; margin-top: 10px; flex-wrap: wrap; }
        .kafka-ha-diagram .crd-chip { padding: 4px 10px; border-radius: 20px; border: 1px solid; font-size: 11px; font-weight: 600; white-space: nowrap; }
        .kafka-ha-diagram .crd-chip.cluster     { border-color: #a371f7; color: #d2a8ff; background: #2d1f5e; }
        .kafka-ha-diagram .crd-chip.component   { border-color: #79c0ff; color: #79c0ff; background: #1a3050; }
        .kafka-ha-diagram .crd-chip.instanceset { border-color: #7ee787; color: #7ee787; background: #1a3020; }
        .kafka-ha-diagram .crd-chip.pod         { border-color: #e3b341; color: #e3b341; background: #302010; }
        .kafka-ha-diagram .crd-arrow { color: #484f58; font-size: 14px; }
        .kafka-ha-diagram .legend {
          display: flex; gap: 18px; flex-wrap: wrap; justify-content: center;
          padding-top: 8px; border-top: 1px solid #21262d; margin-top: 16px;
        }
        .kafka-ha-diagram .legend-item { display: flex; align-items: center; gap: 5px; font-size: 10px; color: #7d8590; }
        .kafka-ha-diagram .legend-dot { width: 8px; height: 8px; border-radius: 50%; }
      `}</style>

      <div className="kafka-ha-diagram">

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
                <div className="client-label">Producer / Consumer Client</div>
                <div className="client-routes">
                  Bootstrap seed list&nbsp; <code style={{color:'#3fb950'}}>kafka-cluster-kafka-broker-advertised-listener-0:9092,...</code><br/>
                  Per-broker (direct)&nbsp; <code style={{color:'#7d8590'}}>kafka-{'{n}'}.kafka-cluster-kafka-broker-headless:9092</code>
                </div>
              </div>
            </div>

            {/* Arrow: Client → Service */}
            <div className="v-arrow">
              <div className="v-arrow-line">
                <div className="v-line v-line-green"></div>
              </div>
              <span className="v-arrow-label" style={{color:'#3fb95088'}}>client traffic → brokers :9092</span>
            </div>

            {/* Services */}
            <div className="services-block">
              <div className="card-title" style={{color:'#3fb950'}}>
                <span className="dot dot-green"></span>
                Kubernetes Services
              </div>
              <div className="services-grid" style={{gridTemplateColumns:'1fr'}}>
                <div className="svc-card svc-rw">
                  <div className="svc-name">kafka-cluster-kafka-broker-advertised-listener-{'{n}'}</div>
                  <div className="svc-detail">
                    ClusterIP · :9092 (one per broker pod, podService: true)<br/>
                    bootstrap seed list for producers &amp; consumers<br/>
                    <span style={{color:'#484f58'}}>+ headless svc for direct pod DNS access</span>
                  </div>
                  <span className="svc-tag tag-green">per-pod bootstrap</span>
                </div>
              </div>
            </div>

            {/* Arrow: Service → Pods */}
            <div className="v-arrow">
              <div className="v-arrow-line">
                <div className="v-line v-line-green"></div>
              </div>
              <span className="v-arrow-label" style={{color:'#3fb95088'}}>→ broker pods</span>
            </div>

            {/* Pods */}
            <div className="pods-section">
              <div className="section-label">Pods · Worker Nodes</div>
              <div className="pods-grid">

                {/* controller-0 */}
                <div className="pod-card pod-controller">
                  <div className="pod-header">
                    <span className="pod-name">controller-0</span>
                    <span className="pod-badge badge-controller">CONTROLLER</span>
                  </div>
                  <div className="containers">
                    <div className="container-row" style={{borderColor:'#6e40c944',background:'#100820'}}>
                      <span className="container-icon">📨</span>
                      <div className="container-info">
                        <div className="container-name">kafka <span style={{color:'#484f58',fontWeight:400,fontSize:'10px'}}>(KRaft controller)</span></div>
                        <div className="container-port">:9093 ctrl quorum only</div>
                      </div>
                      <div style={{color:'#c084fc',fontSize:'10px'}}>controller</div>
                    </div>
                    <div className="container-row">
                      <span className="container-icon">📊</span>
                      <div className="container-info">
                        <div className="container-name">jmx-exporter</div>
                        <div className="container-port">:5556 metrics (JMX_PORT :5555)</div>
                      </div>
                    </div>
                  </div>
                  <div className="pvc-row">💾 PVC <strong style={{color:'#e3b341'}}>metadata</strong> · /bitnami/kafka</div>
                </div>

                {/* broker-0 */}
                <div className="pod-card pod-broker">
                  <div className="pod-header">
                    <span className="pod-name">broker-0</span>
                    <span className="pod-badge badge-broker">BROKER</span>
                  </div>
                  <div className="containers">
                    <div className="container-row" style={{borderColor:'#1f6feb44',background:'#080d18'}}>
                      <span className="container-icon">📨</span>
                      <div className="container-info">
                        <div className="container-name">kafka <span style={{color:'#484f58',fontWeight:400,fontSize:'10px'}}>(KRaft broker)</span></div>
                        <div className="container-port">:9092 client · :9094 internal</div>
                      </div>
                      <div style={{color:'#79c0ff',fontSize:'10px'}}>broker</div>
                    </div>
                    <div className="container-row">
                      <span className="container-icon">📊</span>
                      <div className="container-info">
                        <div className="container-name">jmx-exporter</div>
                        <div className="container-port">:5556 metrics</div>
                      </div>
                    </div>
                  </div>
                  <div className="pvc-row">💾 PVC <strong style={{color:'#e3b341'}}>data</strong> · /bitnami/kafka/data</div>
                </div>

                {/* broker-1 */}
                <div className="pod-card pod-broker">
                  <div className="pod-header">
                    <span className="pod-name">broker-1</span>
                    <span className="pod-badge badge-broker">BROKER</span>
                  </div>
                  <div className="containers">
                    <div className="container-row" style={{borderColor:'#1f6feb44',background:'#080d18'}}>
                      <span className="container-icon">📨</span>
                      <div className="container-info">
                        <div className="container-name">kafka <span style={{color:'#484f58',fontWeight:400,fontSize:'10px'}}>(KRaft broker)</span></div>
                        <div className="container-port">:9092 client · :9094 internal</div>
                      </div>
                      <div style={{color:'#79c0ff',fontSize:'10px'}}>broker</div>
                    </div>
                    <div className="container-row">
                      <span className="container-icon">📊</span>
                      <div className="container-info">
                        <div className="container-name">jmx-exporter</div>
                        <div className="container-port">:5556 metrics</div>
                      </div>
                    </div>
                  </div>
                  <div className="pvc-row">💾 PVC <strong style={{color:'#e3b341'}}>data</strong> · /bitnami/kafka/data</div>
                </div>

              </div>

              <div className="replication-bar">
                <span>↔</span>
                <strong>KRaft Metadata Replication + ISR Partition Replication</strong>
                <span style={{color:'#7d8590'}}>controller quorum · topic partitions replicated across brokers</span>
              </div>
              <div style={{marginTop:'8px',padding:'5px 10px',borderRadius:'6px',border:'1px dashed #30363d',fontSize:'10px',color:'#484f58',display:'flex',alignItems:'center',gap:'6px'}}>
                <span>🔗</span>
                <span><strong style={{color:'#6e7681'}}>Headless service</strong> — stable pod DNS for internal use (replication, HA heartbeat, operator probes); not a client endpoint</span>
              </div>
            </div>

          </div>{/* /data-plane */}

          {/* RIGHT SIDEBAR */}
          <div className="mgmt-sidebar">

            {/* HA Mechanism - KRaft */}
            <div className="sidebar-card dcs-card">
              <div className="card-title" style={{color:'#56d4dd',fontSize:'10px'}}>
                <span className="dot dot-teal"></span>
                HA Mechanism
                <span style={{fontSize:'9px',color:'#1b7c83',fontWeight:400}}>(KRaft — no ZooKeeper)</span>
              </div>
              <div className="dcs-items">
                <div className="dcs-item">
                  <span>KRaft metadata log</span><br/>
                  replicated across controller-eligible nodes
                </div>
                <div className="dcs-item">
                  <span>ConfigMap</span> {'{scope}'}-config<br/>
                  broker config
                </div>
                <div className="dcs-item">
                  <span>Secret</span> account-*<br/>
                  SASL credentials
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
                <div className="step"><span className="step-num">1</span>Controller/Broker Pod crashes</div>
                <div className="step"><span className="step-num">2</span>KRaft leader election (≈10s timeout)</div>
                <div className="step"><span className="step-num">3</span>New controller elected via Raft quorum</div>
                <div className="step"><span className="step-num">4</span>Partition leaders reassigned by controller</div>
                <div className="step"><span className="step-num">5</span>ISR updated for affected partitions</div>
                <div className="step"><span className="step-num">6</span>Clients reconnect to new partition leaders</div>
              </div>
            </div>

            {/* System Accounts */}
            <div className="sidebar-card accounts-card">
              <div className="card-title" style={{color:'#e3b341',fontSize:'10px'}}>
                <span className="dot dot-orange"></span>
                System Accounts
              </div>
              <div className="accounts-grid">
                <div className="acc-chip">admin<span>superuser</span></div>
                <div className="acc-chip">kbdataprotection<span>backup</span></div>
                <div className="acc-chip">kbprobe<span>monitor</span></div>
                <div className="acc-chip">kbmonitoring<span>metrics</span></div>
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
                <span className="ctrl-sub">Scale / Reconfigure</span>
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
              ⚙ Update Pod label <code style={{color:'#c084fc'}}>role=controller</code><br/>
              ⚙ Execute scale / reconfigure ops<br/>
              ⚙ Manage SystemAccount Secrets
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="legend">
          <div className="legend-item"><span className="legend-dot" style={{background:'#388bfd'}}></span>KubeBlocks Operator (control plane)</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#a371f7'}}></span>CRD Resource</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#c084fc'}}></span>Controller Pod (KRaft)</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#79c0ff'}}></span>Broker Pod</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#56d4dd'}}></span>KRaft Consensus</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#f85149'}}></span>Failover Path</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#e3b341'}}></span>Persistent Storage</div>
        </div>

      </div>
    </>
  );
}
