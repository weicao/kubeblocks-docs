import React from 'react';

export default function KafkaCombinedArchitectureDiagram() {
  return (
    <>
      <style>{`
        .kafka-combined-diagram * { box-sizing: border-box; }
        .kafka-combined-diagram {
          background: #0d1117;
          font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: #e6edf3;
          padding: 28px;
          border-radius: 16px;
          margin-bottom: 32px;
        }
        .kafka-combined-diagram .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
        .kafka-combined-diagram .dot-blue   { background: #388bfd; }
        .kafka-combined-diagram .dot-green  { background: #3fb950; }
        .kafka-combined-diagram .dot-orange { background: #e3b341; }
        .kafka-combined-diagram .dot-teal   { background: #56d4dd; }
        .kafka-combined-diagram .dot-red    { background: #f85149; }
        .kafka-combined-diagram .card-title {
          font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; margin-bottom: 10px;
          display: flex; align-items: center; gap: 6px;
        }
        .kafka-combined-diagram .main-area { display: flex; gap: 16px; align-items: flex-start; }
        .kafka-combined-diagram .data-plane { flex: 1; display: flex; flex-direction: column; gap: 0; }
        .kafka-combined-diagram .mgmt-sidebar {
          width: 256px; flex-shrink: 0;
          display: flex; flex-direction: column; gap: 12px; padding-top: 4px;
        }

        /* Client */
        .kafka-combined-diagram .client-mini {
          border-radius: 12px; border: 1px solid #30363d;
          background: #161b22; padding: 12px 16px;
          display: flex; align-items: center; gap: 14px;
        }
        .kafka-combined-diagram .client-label { font-size: 13px; font-weight: 600; color: #f0f6fc; }
        .kafka-combined-diagram .client-routes { font-size: 10px; color: #7d8590; margin-top: 3px; line-height: 1.8; }

        /* Arrow */
        .kafka-combined-diagram .v-arrow {
          display: flex; align-items: center; justify-content: center; gap: 8px; height: 32px;
        }
        .kafka-combined-diagram .v-arrow-line { display: flex; flex-direction: column; align-items: center; }
        .kafka-combined-diagram .v-line { width: 2px; height: 18px; position: relative; }
        .kafka-combined-diagram .v-line-green { background: linear-gradient(to bottom, #23863688, #3fb950); }
        .kafka-combined-diagram .v-line-green::after {
          content:''; position:absolute; bottom:0; left:50%; transform:translateX(-50%);
          border-left:5px solid transparent; border-right:5px solid transparent; border-top:7px solid #3fb950;
        }
        .kafka-combined-diagram .v-arrow-label { font-size: 9px; color: #484f58; letter-spacing: 1px; white-space: nowrap; }

        /* Service */
        .kafka-combined-diagram .services-block {
          border-radius: 12px; border: 1px solid #238636; background: #0a1a0a; padding: 12px 14px;
        }
        .kafka-combined-diagram .svc-card {
          border-radius: 7px; border: 1px solid #3fb95066; background: #0a1a0a;
          padding: 8px 10px; margin-top: 6px;
        }
        .kafka-combined-diagram .svc-name { font-size: 11px; font-weight: 700; color: #3fb950; margin-bottom: 3px; }
        .kafka-combined-diagram .svc-detail { font-size: 10px; color: #7d8590; line-height: 1.6; }
        .kafka-combined-diagram .svc-tag { display:inline-block; font-size:9px; font-weight:700; letter-spacing:1px; padding:2px 6px; border-radius:4px; text-transform:uppercase; margin-top:3px; background:#1a4a1a; color:#3fb950; }

        /* Pods */
        .kafka-combined-diagram .pods-section {
          border-radius: 12px; border: 1px solid #30363d; background: #0d1117; padding: 14px;
        }
        .kafka-combined-diagram .section-label {
          font-size: 10px; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; color: #7d8590; margin-bottom: 10px;
        }
        .kafka-combined-diagram .pods-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;
        }
        .kafka-combined-diagram .pod-card {
          border-radius: 10px; border: 1px solid #3fb95055; background: #161b22; overflow: hidden;
        }
        .kafka-combined-diagram .pod-header {
          padding: 8px 10px; display: flex; align-items: center; justify-content: space-between;
          background: linear-gradient(135deg,#0d2510,#0a1810); border-bottom: 1px solid #23863655;
        }
        .kafka-combined-diagram .pod-name { font-size: 11px; font-weight: 700; color: #f0f6fc; }
        .kafka-combined-diagram .badge-combined {
          font-size: 8px; font-weight: 700; padding: 2px 6px; border-radius: 8px;
          background: linear-gradient(135deg,#1e0d40,#0d2035);
          color: #c084fc; border: 1px solid #6e40c977;
          text-transform: uppercase; letter-spacing: 0.8px;
        }
        .kafka-combined-diagram .containers { padding: 7px; display: flex; flex-direction: column; gap: 3px; }
        .kafka-combined-diagram .container-row {
          display: flex; align-items: center; gap: 6px; padding: 4px 7px;
          border-radius: 5px; border: 1px solid #21262d; background: #0d1117; font-size: 10px;
        }
        .kafka-combined-diagram .container-name { color: #e6edf3; font-weight: 600; }
        .kafka-combined-diagram .container-port { color: #7d8590; font-size: 9px; margin-left: auto; }
        .kafka-combined-diagram .role-tags { display: flex; gap: 4px; padding: 4px 7px 0; flex-wrap: wrap; }
        .kafka-combined-diagram .role-tag {
          font-size: 9px; padding: 1px 5px; border-radius: 4px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
        }
        .kafka-combined-diagram .role-tag-broker     { background: #0d2035; color: #79c0ff; border: 1px solid #1f6feb44; }
        .kafka-combined-diagram .role-tag-controller { background: #1e0d40; color: #c084fc; border: 1px solid #6e40c944; }
        .kafka-combined-diagram .pvc-row {
          margin: 4px 7px 7px; padding: 4px 7px; border-radius: 5px;
          border: 1px dashed #30363d; background: #0d1117;
          display: flex; align-items: center; gap: 5px; font-size: 9px; color: #7d8590;
        }
        .kafka-combined-diagram .kraft-bar {
          margin-top: 10px; padding: 6px 10px; border-radius: 8px;
          background: #120d2a; border: 1px solid #6e40c9;
          font-size: 10px; color: #c084fc;
          display: flex; align-items: center; gap: 8px;
        }

        /* Sidebar */
        .kafka-combined-diagram .sidebar-card { border-radius: 10px; border: 1px solid; padding: 12px 14px; }
        .kafka-combined-diagram .dcs-card { border-color: #6e40c944; background: #120d2a; }
        .kafka-combined-diagram .dcs-items { display: flex; flex-direction: column; gap: 5px; margin-top: 8px; }
        .kafka-combined-diagram .dcs-item {
          padding: 5px 9px; border-radius: 6px; border: 1px solid #6e40c933;
          background: #0d0820; font-size: 10px; color: #c084fc; line-height: 1.5;
        }
        .kafka-combined-diagram .dcs-item span { color: #7d8590; }
        .kafka-combined-diagram .failover-card { border-color: #da363344; background: #1c0a0a; }
        .kafka-combined-diagram .failover-steps { display: flex; flex-direction: column; gap: 4px; margin-top: 8px; }
        .kafka-combined-diagram .step { display: flex; align-items: flex-start; gap: 6px; font-size: 10px; color: #cdd9e5; line-height: 1.5; }
        .kafka-combined-diagram .step-num {
          width: 16px; height: 16px; border-radius: 50%; flex-shrink: 0;
          background: #da363322; border: 1px solid #da363388;
          display: flex; align-items: center; justify-content: center;
          font-size: 9px; font-weight: 700; color: #f85149; margin-top: 1px;
        }

        /* Operator */
        .kafka-combined-diagram .operator-block {
          flex: 1; border-radius: 12px; border: 1px solid #1f6feb;
          background: #0d1f38; padding: 14px 18px;
        }
        .kafka-combined-diagram .operator-controllers { display: flex; gap: 8px; margin-top: 8px; }
        .kafka-combined-diagram .ctrl-chip {
          flex: 1; padding: 8px 10px; border-radius: 8px; border: 1px solid #1f6feb44;
          background: #0a1628; font-size: 11px; color: #79c0ff; text-align: center;
        }
        .kafka-combined-diagram .ctrl-chip .ctrl-name { font-weight: 700; font-size: 12px; display: block; margin-bottom: 2px; }
        .kafka-combined-diagram .ctrl-chip .ctrl-sub { font-size: 10px; color: #4a7ab5; }
        .kafka-combined-diagram .crd-chain { display: flex; align-items: center; gap: 5px; margin-top: 8px; flex-wrap: wrap; }
        .kafka-combined-diagram .crd-chip { padding: 3px 9px; border-radius: 20px; border: 1px solid; font-size: 10px; font-weight: 600; white-space: nowrap; }
        .kafka-combined-diagram .crd-chip.cluster     { border-color:#a371f7; color:#d2a8ff; background:#2d1f5e; }
        .kafka-combined-diagram .crd-chip.component   { border-color:#3fb950; color:#7ee787; background:#1a3020; }
        .kafka-combined-diagram .crd-chip.instanceset { border-color:#79c0ff; color:#79c0ff; background:#0d2035; }
        .kafka-combined-diagram .crd-chip.pod         { border-color:#e3b341; color:#e3b341; background:#302010; }
        .kafka-combined-diagram .crd-arrow { color: #484f58; font-size: 12px; }
        .kafka-combined-diagram .legend {
          display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;
          padding-top: 8px; border-top: 1px solid #21262d; margin-top: 16px;
        }
        .kafka-combined-diagram .legend-item { display: flex; align-items: center; gap: 5px; font-size: 10px; color: #7d8590; }
        .kafka-combined-diagram .legend-dot { width: 8px; height: 8px; border-radius: 50%; }
      `}</style>

      <div className="kafka-combined-diagram">
        <div className="main-area">

          <div className="data-plane">

            {/* Client */}
            <div className="client-mini">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#79c0ff" strokeWidth="1.5">
                <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
              </svg>
              <div>
                <div className="client-label">Producer / Consumer</div>
                <div className="client-routes">
                  Bootstrap seed list&nbsp; <code style={{color:'#3fb950'}}>kafka-cluster-kafka-combine-advertised-listener-0:9092,...</code><br/>
                  Per-pod (direct)&nbsp; <code style={{color:'#7d8590'}}>kafka-{'{n}'}.kafka-cluster-kafka-combine-headless:9092</code>
                </div>
              </div>
            </div>

            <div className="v-arrow">
              <div className="v-arrow-line"><div className="v-line v-line-green"></div></div>
              <span className="v-arrow-label" style={{color:'#3fb95088'}}>bootstrap → fetch metadata → connect to partition leaders</span>
            </div>

            {/* Service */}
            <div className="services-block">
              <div className="card-title" style={{color:'#3fb950'}}>
                <span className="dot dot-green"></span>Kubernetes Services
              </div>
              <div className="svc-card">
                <div className="svc-name">kafka-cluster-kafka-combine-advertised-listener-{'{n}'}</div>
                <div className="svc-detail">ClusterIP · :9092 (one per pod, podService: true)<br/>Use all per-pod addresses as bootstrap seed list</div>
                <span className="svc-tag">per-pod bootstrap</span>
              </div>
            </div>

            <div className="v-arrow">
              <div className="v-arrow-line"><div className="v-line v-line-green"></div></div>
              <span className="v-arrow-label" style={{color:'#3fb95088'}}>→ partition leader pods (direct advertised address)</span>
            </div>

            {/* Pods */}
            <div className="pods-section">
              <div className="section-label">Combined Nodes (kafka-combine) · Worker Nodes</div>
              <div className="pods-grid">
                {[0,1,2].map(i => (
                  <div className="pod-card" key={i}>
                    <div className="pod-header">
                      <span className="pod-name">kafka-{i}</span>
                      <span className="badge-combined">BROKER+CTRL</span>
                    </div>
                    <div className="role-tags">
                      <span className="role-tag role-tag-broker">Broker</span>
                      <span className="role-tag role-tag-controller">Controller</span>
                    </div>
                    <div className="containers">
                      <div className="container-row" style={{borderColor:'#23863644',background:'#081208'}}>
                        <span>⚡</span>
                        <span className="container-name">kafka</span>
                        <span className="container-port">:9092 · :9093 · :9094</span>
                      </div>
                      <div className="container-row">
                        <span>📊</span>
                        <span className="container-name">jmx-exporter</span>
                        <span className="container-port">:5556 metrics</span>
                      </div>
                    </div>
                    <div className="pvc-row">💾 PVC <strong style={{color:'#e3b341'}}>data-{i}</strong> · log dir</div>
                  </div>
                ))}
              </div>

              <div className="kraft-bar">
                <span>↔</span>
                <strong>KRaft Quorum (port :9093)</strong>
                <span style={{color:'#6e40c9'}}>all 3 nodes participate · Raft consensus for cluster metadata · active controller elected among them</span>
              </div>
              <div style={{marginTop:'8px',padding:'5px 10px',borderRadius:'6px',border:'1px dashed #30363d',fontSize:'10px',color:'#484f58',display:'flex',alignItems:'center',gap:'6px'}}>
                <span>🔗</span>
                <span><strong style={{color:'#6e7681'}}>Headless service</strong> — per-pod DNS for advertised listener addresses; Kafka clients connect to partition leaders directly</span>
              </div>
            </div>

          </div>{/* /data-plane */}

          {/* Sidebar */}
          <div className="mgmt-sidebar">

            <div className="sidebar-card dcs-card">
              <div className="card-title" style={{color:'#c084fc',fontSize:'10px'}}>
                <span className="dot" style={{background:'#c084fc'}}></span>
                KRaft Metadata
                <span style={{fontSize:'9px',color:'#6e40c9',fontWeight:400}}>(__cluster_metadata topic)</span>
              </div>
              <div className="dcs-items">
                <div className="dcs-item">
                  <span>Active controller:</span><br/>one of the 3 combined nodes<br/>all metadata writes go through it
                </div>
                <div className="dcs-item">
                  <span>Metadata log:</span><br/>internal topic replicated<br/>across all controller-eligible nodes
                </div>
                <div className="dcs-item">
                  <span>Quorum:</span><br/>3 nodes → tolerates 1 failure<br/>no external ZooKeeper needed
                </div>
              </div>
            </div>

            <div className="sidebar-card failover-card">
              <div className="card-title" style={{color:'#f85149',fontSize:'10px'}}>
                <span className="dot dot-red"></span>
                Failover Process
              </div>
              <div className="failover-steps">
                <div className="step"><span className="step-num">1</span>Node fails (broker + controller role lost)</div>
                <div className="step"><span className="step-num">2</span>KRaft quorum detects leader loss → elects new active controller</div>
                <div className="step"><span className="step-num">3</span>New controller reassigns partition leaders from ISR</div>
                <div className="step"><span className="step-num">4</span>Clients refresh metadata → reconnect to new partition leaders</div>
                <div className="step"><span className="step-num">5</span>KubeBlocks restarts failed pod; rejoins quorum on startup</div>
              </div>
            </div>

          </div>
        </div>{/* /main-area */}

        <div style={{display:'flex',alignItems:'center',gap:'12px',fontSize:'10px',letterSpacing:'2px',textTransform:'uppercase',marginTop:'4px'}}>
          <div style={{flex:1,height:'1px',background:'#21262d'}}></div>
          <span style={{color:'#484f58'}}>Management Plane · KubeBlocks Operator</span>
          <div style={{flex:1,height:'1px',background:'#21262d'}}></div>
        </div>

        <div style={{display:'flex',gap:'16px',alignItems:'stretch',marginTop:'4px'}}>
          <div className="operator-block">
            <div className="card-title" style={{color:'#79c0ff'}}>
              <span className="dot dot-blue"></span>
              KubeBlocks Operator
              <span style={{fontSize:'10px',fontWeight:400,color:'#4a7ab5',letterSpacing:0}}>· single Component for all combined nodes; uniform pod spec</span>
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
                <span className="ctrl-sub">Scale / Rolling Update</span>
              </div>
            </div>
            <div style={{marginTop:'8px',fontSize:'10px',color:'#484f58',marginBottom:'4px',letterSpacing:'1px'}}>CRD RESOURCE HIERARCHY</div>
            <div className="crd-chain">
              <div className="crd-chip cluster">Cluster</div>
              <span className="crd-arrow">→</span>
              <div className="crd-chip component">Component (kafka-combine)</div>
              <span className="crd-arrow">→</span>
              <div className="crd-chip instanceset">InstanceSet</div>
              <span className="crd-arrow">→</span>
              <div className="crd-chip pod">Pod × N</div>
            </div>
          </div>
          <div style={{width:'200px',flexShrink:0,borderRadius:'12px',border:'1px solid #1f6feb33',background:'#0a1628',padding:'14px 16px',display:'flex',flexDirection:'column',justifyContent:'center',gap:'6px'}}>
            <div style={{fontSize:'10px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'#4a7ab5',marginBottom:'2px'}}>Port Reference</div>
            <div style={{fontSize:'10px',color:'#4a7ab5',lineHeight:2}}>
              <code style={{color:'#3fb950'}}>:9092</code> — client (producer/consumer)<br/>
              <code style={{color:'#c084fc'}}>:9093</code> — controller quorum (KRaft)<br/>
              <code style={{color:'#79c0ff'}}>:9094</code> — internal broker replication<br/>
              <code style={{color:'#7d8590'}}>:5556</code> — jmx-exporter (Prometheus scrape)<br/>
              <code style={{color:'#484f58'}}>:5555</code> — JMX_PORT (internal Java JMX)
            </div>
          </div>
        </div>

        <div className="legend">
          <div className="legend-item"><span className="legend-dot" style={{background:'#388bfd'}}></span>KubeBlocks Operator</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#3fb950'}}></span>Client Traffic (:9092)</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#c084fc'}}></span>KRaft Controller Quorum (:9093)</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#79c0ff'}}></span>Internal Replication (:9094)</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#e3b341'}}></span>Persistent Storage</div>
        </div>

      </div>
    </>
  );
}
