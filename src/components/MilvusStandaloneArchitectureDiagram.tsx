import React from 'react';

export default function MilvusStandaloneArchitectureDiagram() {
  return (
    <>
      <style>{`
        .milvus-sa-diagram * { box-sizing: border-box; }
        .milvus-sa-diagram {
          background: #0d1117;
          font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: #e6edf3;
          padding: 28px;
          border-radius: 16px;
          margin-bottom: 32px;
        }
        .milvus-sa-diagram .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
        .milvus-sa-diagram .dot-blue   { background: #388bfd; }
        .milvus-sa-diagram .dot-purple { background: #a371f7; }
        .milvus-sa-diagram .dot-teal   { background: #56d4dd; }
        .milvus-sa-diagram .card-title {
          font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; margin-bottom: 10px;
          display: flex; align-items: center; gap: 6px;
        }
        .milvus-sa-diagram .main-area { display: flex; gap: 20px; align-items: flex-start; }
        .milvus-sa-diagram .center-col { flex: 1; display: flex; flex-direction: column; gap: 0; }

        /* Client */
        .milvus-sa-diagram .client-box {
          border-radius: 12px; border: 1px solid #30363d;
          background: #161b22; padding: 12px 16px;
          display: flex; align-items: center; gap: 14px;
        }
        .milvus-sa-diagram .client-label { font-size: 13px; font-weight: 600; color: #f0f6fc; }
        .milvus-sa-diagram .client-note { font-size: 10px; color: #7d8590; margin-top: 3px; line-height: 1.7; }

        /* Arrow */
        .milvus-sa-diagram .v-arrow {
          display: flex; align-items: center; justify-content: center; gap: 8px; height: 30px;
        }
        .milvus-sa-diagram .v-line { width: 2px; height: 18px; position: relative; }
        .milvus-sa-diagram .v-line-purple { background: linear-gradient(to bottom, #6e40c988, #a371f7); }
        .milvus-sa-diagram .v-line-purple::after {
          content:''; position:absolute; bottom:0; left:50%; transform:translateX(-50%);
          border-left:5px solid transparent; border-right:5px solid transparent; border-top:7px solid #a371f7;
        }
        .milvus-sa-diagram .v-line-teal { background: linear-gradient(to bottom, #1b7c8388, #56d4dd); }
        .milvus-sa-diagram .v-line-teal::after {
          content:''; position:absolute; bottom:0; left:50%; transform:translateX(-50%);
          border-left:5px solid transparent; border-right:5px solid transparent; border-top:7px solid #56d4dd;
        }
        .milvus-sa-diagram .v-arrow-label { font-size: 9px; color: #484f58; letter-spacing: 1px; white-space: nowrap; }

        /* Service */
        .milvus-sa-diagram .svc-box {
          border-radius: 10px; border: 1px solid #6e40c9;
          background: #120d2a; padding: 10px 14px;
        }
        .milvus-sa-diagram .svc-name { font-size: 12px; font-weight: 700; color: #d2a8ff; }
        .milvus-sa-diagram .svc-detail { font-size: 10px; color: #7d8590; margin-top: 3px; line-height: 1.6; }
        .milvus-sa-diagram .svc-tag { display: inline-block; font-size: 9px; font-weight: 700; letter-spacing: 1px; padding: 2px 6px; border-radius: 4px; text-transform: uppercase; margin-top: 4px; background: #2d1f5e; color: #a371f7; }

        /* Main milvus pod */
        .milvus-sa-diagram .milvus-pod {
          border-radius: 12px; border: 1px solid #a371f766;
          background: #0d1117; overflow: hidden;
        }
        .milvus-sa-diagram .milvus-pod-header {
          padding: 10px 14px; display: flex; align-items: center; justify-content: space-between;
          background: linear-gradient(135deg, #1a0d38, #120d2a);
          border-bottom: 1px solid #a371f744;
        }
        .milvus-sa-diagram .milvus-pod-name { font-size: 12px; font-weight: 700; color: #f0f6fc; }
        .milvus-sa-diagram .all-in-one-badge {
          font-size: 9px; font-weight: 700; padding: 2px 8px; border-radius: 10px;
          background: #2d1f5e; color: #d2a8ff; border: 1px solid #6e40c966;
          text-transform: uppercase; letter-spacing: 0.8px;
        }
        .milvus-sa-diagram .milvus-pod-body { padding: 12px; display: flex; gap: 12px; }
        .milvus-sa-diagram .container-col { flex: 1; display: flex; flex-direction: column; gap: 5px; }
        .milvus-sa-diagram .roles-col { width: 130px; flex-shrink: 0; display: flex; flex-direction: column; gap: 4px; }
        .milvus-sa-diagram .container-row {
          display: flex; align-items: center; gap: 6px; padding: 5px 8px;
          border-radius: 6px; border: 1px solid #21262d; background: #0d1117; font-size: 10px;
        }
        .milvus-sa-diagram .container-name { color: #e6edf3; font-weight: 600; }
        .milvus-sa-diagram .container-port { color: #7d8590; font-size: 9px; margin-left: auto; }
        .milvus-sa-diagram .roles-label { font-size: 9px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #484f58; margin-bottom: 2px; }
        .milvus-sa-diagram .role-chip {
          padding: 3px 7px; border-radius: 5px; border: 1px solid #a371f733;
          background: #0d0820; font-size: 9px; color: #d2a8ff; text-align: center;
        }
        .milvus-sa-diagram .pvc-row {
          margin: 0 12px 10px; padding: 5px 8px; border-radius: 6px;
          border: 1px dashed #30363d; background: #0d1117;
          display: flex; align-items: center; gap: 6px; font-size: 10px; color: #7d8590;
        }

        /* Storage layer */
        .milvus-sa-diagram .storage-row {
          display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
        }
        .milvus-sa-diagram .storage-pod {
          border-radius: 10px; border: 1px solid #1b7c83;
          background: #061515; overflow: hidden;
        }
        .milvus-sa-diagram .storage-pod-header {
          padding: 7px 10px; display: flex; align-items: center; gap: 6px;
          background: linear-gradient(135deg,#051515,#0a2020);
          border-bottom: 1px solid #1b7c8344;
        }
        .milvus-sa-diagram .storage-pod-name { font-size: 11px; font-weight: 700; color: #56d4dd; }
        .milvus-sa-diagram .storage-pod-role { font-size: 9px; color: #1b7c83; }
        .milvus-sa-diagram .storage-containers { padding: 6px 8px; display: flex; flex-direction: column; gap: 3px; }
        .milvus-sa-diagram .storage-container-row {
          display: flex; align-items: center; gap: 5px; padding: 3px 6px;
          border-radius: 4px; border: 1px solid #21262d; background: #0d1117; font-size: 9px;
        }
        .milvus-sa-diagram .storage-pvc {
          margin: 0 8px 6px; padding: 3px 7px; border-radius: 4px;
          border: 1px dashed #30363d; background: #0d1117;
          font-size: 9px; color: #7d8590;
        }

        /* Operator */
        .milvus-sa-diagram .legend {
          display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;
          padding-top: 8px; border-top: 1px solid #21262d; margin-top: 16px;
        }
        .milvus-sa-diagram .legend-item { display: flex; align-items: center; gap: 5px; font-size: 10px; color: #7d8590; }
        .milvus-sa-diagram .legend-dot { width: 8px; height: 8px; border-radius: 50%; }
      `}</style>

      <div className="milvus-sa-diagram">
        <div className="main-area">

          {/* CENTER */}
          <div className="center-col">

            {/* Client */}
            <div className="client-box">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#79c0ff" strokeWidth="1.5">
                <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
              </svg>
              <div>
                <div className="client-label">Application / Client</div>
                <div className="client-note">
                  Milvus SDK (Python / Go / Java / Node) · gRPC or REST<br/>
                  Connect to <code style={{color:'#d2a8ff'}}>{'{cluster}'}-milvus:19530</code>
                </div>
              </div>
            </div>

            {/* Arrow → service */}
            <div className="v-arrow">
              <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                <div className="v-line v-line-purple"></div>
              </div>
              <span className="v-arrow-label" style={{color:'#a371f788'}}>gRPC :19530 / metrics :9091</span>
            </div>

            {/* Service */}
            <div className="svc-box">
              <div className="svc-name">{'{cluster}'}-milvus</div>
              <div className="svc-detail">
                ClusterIP · :19530 (gRPC) · :9091 (metrics/health)<br/>
                selector: all standalone pods
              </div>
              <span className="svc-tag">ClusterIP</span>
            </div>

            {/* Arrow → pod */}
            <div className="v-arrow">
              <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                <div className="v-line v-line-purple"></div>
              </div>
            </div>

            {/* Milvus all-in-one pod */}
            <div className="milvus-pod">
              <div className="milvus-pod-header">
                <span className="milvus-pod-name">milvus-standalone-0</span>
                <span className="all-in-one-badge">All-in-One</span>
              </div>
              <div className="milvus-pod-body">
                <div className="container-col">
                  <div style={{fontSize:'9px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:'#484f58',marginBottom:'2px'}}>Containers</div>
                  <div className="container-row" style={{borderColor:'#6e40c944',background:'#0d0820'}}>
                    <span>🔷</span>
                    <span className="container-name">milvus</span>
                    <span className="container-port">:19530 (gRPC) · :9091 (metrics)</span>
                  </div>
                  <div style={{marginTop:'4px',padding:'5px 8px',borderRadius:'5px',border:'1px solid #30363d',background:'#0d1117',fontSize:'9px',color:'#484f58',lineHeight:1.6}}>
                    All coordinator + worker roles run as goroutines within the single <code style={{color:'#d2a8ff'}}>milvus</code> process
                  </div>
                </div>
                <div className="roles-col">
                  <div className="roles-label">Embedded Roles</div>
                  {['RootCoord','QueryCoord','DataCoord','IndexCoord','QueryNode','DataNode','IndexNode','Proxy'].map(r => (
                    <div className="role-chip" key={r}>{r}</div>
                  ))}
                </div>
              </div>
              <div className="pvc-row">💾 PVC <strong style={{color:'#e3b341'}}>data-0</strong> · local segment cache · 20Gi</div>
            </div>

            {/* Arrow → storage */}
            <div className="v-arrow">
              <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                <div className="v-line v-line-teal"></div>
              </div>
              <span className="v-arrow-label" style={{color:'#56d4dd88'}}>metadata + object storage I/O</span>
            </div>

            {/* Storage row */}
            <div className="storage-row">
              <div className="storage-pod">
                <div className="storage-pod-header">
                  <span>🔑</span>
                  <div>
                    <div className="storage-pod-name">etcd-0</div>
                    <div className="storage-pod-role">metadata · collection schemas · segment info</div>
                  </div>
                </div>
                <div className="storage-containers">
                  <div className="storage-container-row">
                    <span>⚙</span><span style={{color:'#56d4dd',fontWeight:600,fontSize:'10px'}}>etcd</span>
                    <span style={{color:'#7d8590',fontSize:'9px',marginLeft:'auto'}}>:2379</span>
                  </div>
                </div>
                <div className="storage-pvc">💾 PVC · 10Gi</div>
              </div>

              <div className="storage-pod">
                <div className="storage-pod-header">
                  <span>🗄</span>
                  <div>
                    <div className="storage-pod-name">minio-0</div>
                    <div className="storage-pod-role">object storage · vectors · indexes · WAL</div>
                  </div>
                </div>
                <div className="storage-containers">
                  <div className="storage-container-row">
                    <span>📦</span><span style={{color:'#56d4dd',fontWeight:600,fontSize:'10px'}}>minio</span>
                    <span style={{color:'#7d8590',fontSize:'9px',marginLeft:'auto'}}>:9000</span>
                  </div>
                </div>
                <div className="storage-pvc">💾 PVC · 20Gi</div>
              </div>
            </div>

          </div>{/* /center-col */}

        </div>{/* /main-area */}

        <div className="legend">
          <div className="legend-item"><span className="legend-dot" style={{background:'#388bfd'}}></span>KubeBlocks Operator</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#a371f7'}}></span>Milvus (all-in-one)</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#56d4dd'}}></span>Storage Components (etcd / MinIO)</div>
          <div className="legend-item"><span className="legend-dot" style={{background:'#e3b341'}}></span>Persistent Storage</div>
        </div>

      </div>
    </>
  );
}
