import React from 'react';

export default function RocketmqArchitectureDiagram() {
  return (
    <>
      <style>{`
        .rocketmq-ha-diagram * { box-sizing: border-box; }
        .rocketmq-ha-diagram {
          background: #0d1117;
          font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: #e6edf3;
          padding: 28px;
          border-radius: 16px;
          margin-bottom: 32px;
        }
        .rocketmq-ha-diagram .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
        .rocketmq-ha-diagram .dot-blue   { background: #388bfd; }
        .rocketmq-ha-diagram .dot-green  { background: #3fb950; }
        .rocketmq-ha-diagram .dot-purple { background: #a371f7; }
        .rocketmq-ha-diagram .dot-red    { background: #f85149; }
        .rocketmq-ha-diagram .card-title {
          font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; margin-bottom: 10px;
          display: flex; align-items: center; gap: 6px;
        }
        .rocketmq-ha-diagram .main-area {
          display: flex; gap: 16px; align-items: flex-start;
        }
        .rocketmq-ha-diagram .data-plane {
          flex: 1; display: flex; flex-direction: column; gap: 0;
        }
        .rocketmq-ha-diagram .client-mini {
          border-radius: 12px; border: 1px solid #30363d;
          background: #161b22; padding: 12px 16px;
          display: flex; align-items: center; gap: 14px;
        }
        .rocketmq-ha-diagram .client-label { font-size: 13px; font-weight: 600; color: #f0f6fc; }
        .rocketmq-ha-diagram .client-routes { font-size: 10px; color: #7d8590; margin-top: 3px; line-height: 1.8; }
        .rocketmq-ha-diagram .v-arrow {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          height: 36px;
        }
        .rocketmq-ha-diagram .v-arrow-line { display: flex; flex-direction: column; align-items: center; }
        .rocketmq-ha-diagram .v-line { width: 2px; height: 20px; position: relative; }
        .rocketmq-ha-diagram .v-line-green { background: linear-gradient(to bottom, #23863688, #3fb950); }
        .rocketmq-ha-diagram .v-line-green::after {
          content: ''; position: absolute; bottom: 0; left: 50%;
          transform: translateX(-50%);
          border-left: 5px solid transparent; border-right: 5px solid transparent;
          border-top: 7px solid #3fb950;
        }
        .rocketmq-ha-diagram .v-line-gray { background: linear-gradient(to bottom, #30363d88, #484f58); }
        .rocketmq-ha-diagram .v-line-gray::after {
          content: ''; position: absolute; bottom: 0; left: 50%;
          transform: translateX(-50%);
          border-left: 5px solid transparent; border-right: 5px solid transparent;
          border-top: 7px solid #484f58;
        }
        .rocketmq-ha-diagram .v-arrow-label { font-size: 9px; color: #484f58; letter-spacing: 1px; white-space: nowrap; }
        .rocketmq-ha-diagram .services-block {
          border-radius: 12px; border: 1px solid #238636;
          background: #0a1a0a; padding: 14px 16px;
        }
        .rocketmq-ha-diagram .services-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 8px;
        }
        .rocketmq-ha-diagram .svc-card { border-radius: 8px; border: 1px solid; padding: 10px 12px; }
        .rocketmq-ha-diagram .svc-rw { border-color: #3fb950; background: #0a1a0a; }
        .rocketmq-ha-diagram .svc-hl { border-color: #30363d; background: #0d1117; }
        .rocketmq-ha-diagram .svc-ns { border-color: #484f58; background: #111419; }
        .rocketmq-ha-diagram .svc-name { font-size: 12px; font-weight: 700; margin-bottom: 4px; }
        .rocketmq-ha-diagram .svc-rw .svc-name { color: #3fb950; }
        .rocketmq-ha-diagram .svc-hl .svc-name { color: #7d8590; }
        .rocketmq-ha-diagram .svc-ns .svc-name { color: #8b949e; }
        .rocketmq-ha-diagram .svc-detail { font-size: 10px; color: #7d8590; line-height: 1.6; }
        .rocketmq-ha-diagram .svc-tag {
          display: inline-block; font-size: 9px; font-weight: 700;
          letter-spacing: 1px; padding: 2px 6px; border-radius: 4px;
          text-transform: uppercase; margin-top: 4px;
        }
        .rocketmq-ha-diagram .tag-green  { background: #1a4a1a; color: #3fb950; }
        .rocketmq-ha-diagram .tag-gray   { background: #21262d; color: #8b949e; }
        .rocketmq-ha-diagram .tag-silver { background: #1c2128; color: #6e7681; }
        .rocketmq-ha-diagram .section-label {
          font-size: 10px; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; color: #7d8590; margin-bottom: 8px;
        }
        .rocketmq-ha-diagram .pods-section {
          border-radius: 12px; border: 1px solid #30363d;
          background: #0d1117; padding: 16px;
        }
        .rocketmq-ha-diagram .component-label {
          font-size: 10px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; color: #484f58; margin: 10px 0 6px;
          border-bottom: 1px solid #21262d; padding-bottom: 4px;
        }
        .rocketmq-ha-diagram .namesrv-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;
        }
        .rocketmq-ha-diagram .broker-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;
        }
        .rocketmq-ha-diagram .pod-card { border-radius: 10px; border: 1px solid #30363d; background: #161b22; overflow: hidden; }
        .rocketmq-ha-diagram .pod-header {
          padding: 9px 12px; display: flex; align-items: center; justify-content: space-between;
          border-bottom: 1px solid #21262d;
        }
        .rocketmq-ha-diagram .pod-master .pod-header { background: linear-gradient(135deg,#0d2510,#1a3820); border-bottom-color: #238636; }
        .rocketmq-ha-diagram .pod-slave .pod-header  { background: linear-gradient(135deg,#0d1f38,#162840); border-bottom-color: #1f6feb; }
        .rocketmq-ha-diagram .pod-namesrv .pod-header { background: linear-gradient(135deg,#161b22,#1c2128); border-bottom-color: #484f58; }
        .rocketmq-ha-diagram .pod-name { font-size: 11px; font-weight: 700; color: #f0f6fc; }
        .rocketmq-ha-diagram .pod-badge {
          font-size: 9px; font-weight: 700; letter-spacing: 1px;
          text-transform: uppercase; padding: 2px 7px; border-radius: 10px;
        }
        .rocketmq-ha-diagram .badge-master  { background: #1a4a1a; color: #3fb950; border: 1px solid #238636; }
        .rocketmq-ha-diagram .badge-slave   { background: #0d2035; color: #79c0ff; border: 1px solid #1f6feb; }
        .rocketmq-ha-diagram .badge-namesrv { background: #1c2128; color: #8b949e; border: 1px solid #484f58; }
        .rocketmq-ha-diagram .containers { padding: 8px; display: flex; flex-direction: column; gap: 4px; }
        .rocketmq-ha-diagram .container-row {
          display: flex; align-items: center; gap: 7px; padding: 5px 8px;
          border-radius: 6px; border: 1px solid #21262d; background: #0d1117;
        }
        .rocketmq-ha-diagram .container-icon { font-size: 13px; }
        .rocketmq-ha-diagram .container-info { flex: 1; }
        .rocketmq-ha-diagram .container-name { font-size: 11px; font-weight: 600; color: #e6edf3; }
        .rocketmq-ha-diagram .container-port { font-size: 10px; color: #7d8590; }
        .rocketmq-ha-diagram .pvc-row {
          margin: 0 8px 8px; padding: 5px 8px; border-radius: 6px;
          border: 1px dashed #30363d; background: #0d1117;
          display: flex; align-items: center; gap: 6px; font-size: 10px; color: #7d8590;
        }
        .rocketmq-ha-diagram .no-pvc-row {
          margin: 0 8px 8px; padding: 5px 8px; border-radius: 6px;
          border: 1px dashed #21262d; background: #0d1117;
          display: flex; align-items: center; gap: 6px; font-size: 10px; color: #484f58;
          font-style: italic;
        }
        .rocketmq-ha-diagram .replication-bar {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 7px; border-radius: 8px; background: #0a1a14;
          border: 1px solid #238636; margin-top: 10px; font-size: 11px; color: #3fb950;
        }
        .rocketmq-ha-diagram .legend {
          display: flex; gap: 18px; flex-wrap: wrap; justify-content: center;
          padding-top: 8px; border-top: 1px solid #21262d; margin-top: 16px;
        }
        .rocketmq-ha-diagram .legend-item { display: flex; align-items: center; gap: 5px; font-size: 10px; color: #7d8590; }
        .rocketmq-ha-diagram .legend-dot { width: 8px; height: 8px; border-radius: 50%; }
      `}</style>

      <div className="rocketmq-ha-diagram">

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
                  1. Lookup routing → NameServer&nbsp; <code style={{color:'#8b949e'}}>{'{cluster}'}-namesrv:9876</code><br/>
                  2. Connect directly → broker pod DNS (master address from NameServer)
                </div>
              </div>
            </div>

            {/* Arrow: Client → Service */}
            <div className="v-arrow">
              <div className="v-arrow-line">
                <div className="v-line v-line-green"></div>
              </div>
              <span className="v-arrow-label" style={{color:'#3fb95088'}}>produce / consume → master broker</span>
            </div>

            {/* Services */}
            <div className="services-block">
              <div className="card-title" style={{color:'#3fb950'}}>
                <span className="dot dot-green"></span>
                Kubernetes Services
              </div>
              <div className="services-grid">
                <div className="svc-card svc-ns">
                  <div className="svc-name">{'{cluster}'}-namesrv</div>
                  <div className="svc-detail">
                    ClusterIP · :9876<br/>
                    all NameServer pods<br/>
                    topic routing discovery
                  </div>
                  <span className="svc-tag tag-silver">NameServer</span>
                </div>
                <div className="svc-card svc-hl">
                  <div className="svc-name">{'{cluster}'}-&lt;shard&gt;-headless</div>
                  <div className="svc-detail">
                    Headless · :10911 · :10912 · :10909<br/>
                    per broker shard · all pods<br/>
                    HA replication + operator probes
                  </div>
                  <span className="svc-tag tag-gray">Broker (headless only)</span>
                </div>
              </div>
            </div>

            {/* Arrow: Service → Pods */}
            <div className="v-arrow">
              <div className="v-arrow-line">
                <div className="v-line v-line-green"></div>
              </div>
              <span className="v-arrow-label" style={{color:'#3fb95088'}}>clients connect to broker pods directly via addresses from NameServer</span>
            </div>

            {/* Pods */}
            <div className="pods-section">
              <div className="section-label">Pods · Worker Nodes</div>

              {/* NameServer pods */}
              <div className="component-label">NameServer Component (stateless discovery)</div>
              <div className="namesrv-grid">

                <div className="pod-card pod-namesrv">
                  <div className="pod-header">
                    <span className="pod-name">namesrv-0</span>
                    <span className="pod-badge badge-namesrv">NAMESRV</span>
                  </div>
                  <div className="containers">
                    <div className="container-row" style={{borderColor:'#48495844',background:'#0d1117'}}>
                      <span className="container-icon">📋</span>
                      <div className="container-info">
                        <div className="container-name">rocketmq-namesrv</div>
                        <div className="container-port">:9876 namesrv · stateless discovery service</div>
                      </div>
                    </div>
                    <div className="container-row">
                      <span className="container-icon">📊</span>
                      <div className="container-info">
                        <div className="container-name">jmx-exporter</div>
                        <div className="container-port">:5556 Prometheus JMX metrics</div>
                      </div>
                    </div>
                  </div>
                  <div className="no-pvc-row">no PVC · stateless</div>
                </div>

                <div className="pod-card pod-namesrv">
                  <div className="pod-header">
                    <span className="pod-name">namesrv-1</span>
                    <span className="pod-badge badge-namesrv">NAMESRV</span>
                  </div>
                  <div className="containers">
                    <div className="container-row" style={{borderColor:'#48495844',background:'#0d1117'}}>
                      <span className="container-icon">📋</span>
                      <div className="container-info">
                        <div className="container-name">rocketmq-namesrv</div>
                        <div className="container-port">:9876 namesrv · stateless discovery service</div>
                      </div>
                    </div>
                    <div className="container-row">
                      <span className="container-icon">📊</span>
                      <div className="container-info">
                        <div className="container-name">jmx-exporter</div>
                        <div className="container-port">:5556 Prometheus JMX metrics</div>
                      </div>
                    </div>
                  </div>
                  <div className="no-pvc-row">no PVC · stateless</div>
                </div>

              </div>

              {/* Broker pods */}
              <div className="component-label">Broker Component (ASYNC_MASTER/SLAVE)</div>
              <div className="broker-grid">

                {/* broker-0 MASTER */}
                <div className="pod-card pod-master">
                  <div className="pod-header">
                    <span className="pod-name">broker-0</span>
                    <span className="pod-badge badge-master">MASTER</span>
                  </div>
                  <div className="containers">
                    <div className="container-row" style={{borderColor:'#23863644',background:'#081208'}}>
                      <span className="container-icon">📩</span>
                      <div className="container-info">
                        <div className="container-name">rocketmq-broker</div>
                        <div className="container-port">:10911 remoting · :10909 vip · :10912 HA replication · brokerId=0 (ASYNC_MASTER)</div>
                      </div>
                    </div>
                    <div className="container-row">
                      <span className="container-icon">📊</span>
                      <div className="container-info">
                        <div className="container-name">jmx-exporter</div>
                        <div className="container-port">:5556 Prometheus JMX metrics</div>
                      </div>
                    </div>
                    <div className="container-row">
                      <span className="container-icon">🔧</span>
                      <div className="container-info">
                        <div className="container-name">agent</div>
                        <div className="container-port">:8999 topic &amp; subscription group info</div>
                      </div>
                    </div>
                  </div>
                  <div className="pvc-row">💾 PVC <strong style={{color:'#e3b341'}}>data-0</strong> · 20Gi</div>
                </div>

                {/* broker-1 SLAVE */}
                <div className="pod-card pod-slave">
                  <div className="pod-header">
                    <span className="pod-name">broker-1</span>
                    <span className="pod-badge badge-slave">SLAVE</span>
                  </div>
                  <div className="containers">
                    <div className="container-row" style={{borderColor:'#1f6feb44',background:'#080d18'}}>
                      <span className="container-icon">📩</span>
                      <div className="container-info">
                        <div className="container-name">rocketmq-broker</div>
                        <div className="container-port">:10911 remoting · :10909 vip · :10912 HA replication · brokerId=1 (SLAVE)</div>
                      </div>
                    </div>
                    <div className="container-row">
                      <span className="container-icon">📊</span>
                      <div className="container-info">
                        <div className="container-name">jmx-exporter</div>
                        <div className="container-port">:5556 Prometheus JMX metrics</div>
                      </div>
                    </div>
                    <div className="container-row">
                      <span className="container-icon">🔧</span>
                      <div className="container-info">
                        <div className="container-name">agent</div>
                        <div className="container-port">:8999 topic &amp; subscription group info</div>
                      </div>
                    </div>
                  </div>
                  <div className="pvc-row">💾 PVC <strong style={{color:'#e3b341'}}>data-1</strong> · 20Gi</div>
                </div>

                {/* broker-2 SLAVE */}
                <div className="pod-card pod-slave">
                  <div className="pod-header">
                    <span className="pod-name">broker-2</span>
                    <span className="pod-badge badge-slave">SLAVE</span>
                  </div>
                  <div className="containers">
                    <div className="container-row" style={{borderColor:'#1f6feb44',background:'#080d18'}}>
                      <span className="container-icon">📩</span>
                      <div className="container-info">
                        <div className="container-name">rocketmq-broker</div>
                        <div className="container-port">:10911 remoting · :10909 vip · :10912 HA replication · brokerId=2 (SLAVE)</div>
                      </div>
                    </div>
                    <div className="container-row">
                      <span className="container-icon">📊</span>
                      <div className="container-info">
                        <div className="container-name">jmx-exporter</div>
                        <div className="container-port">:5556 Prometheus JMX metrics</div>
                      </div>
                    </div>
                    <div className="container-row">
                      <span className="container-icon">🔧</span>
                      <div className="container-info">
                        <div className="container-name">agent</div>
                        <div className="container-port">:8999 topic &amp; subscription group info</div>
                      </div>
                    </div>
                  </div>
                  <div className="pvc-row">💾 PVC <strong style={{color:'#e3b341'}}>data-2</strong> · 20Gi</div>
                </div>

              </div>

              <div className="replication-bar">
                <span>↓</span>
                <strong>ASYNC_MASTER/SLAVE Replication (port 10912)</strong>
                <span style={{color:'#7d8590'}}>master-0 → slave-1 · slave-2 &nbsp;|&nbsp; async commit log replication</span>
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
          <div className="legend-item"><span className="legend-dot" style={{background:'#a371f7'}}></span>CRD Resource</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#3fb950'}}></span>Master Broker / Write Traffic</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#79c0ff'}}></span>Slave Pod</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#e3b341'}}></span>Persistent Storage</div>
        </div>

      </div>
    </>
  );
}
