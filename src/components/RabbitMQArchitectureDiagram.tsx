'use client';
import { useTheme } from '@mui/material';

function getStyles(dark: boolean) {
  const accent   = '#F97316';
  const accentFg = dark ? '#fb923c' : '#ea580c';
  const accentBg = dark ? 'rgba(249,115,22,0.14)' : 'rgba(249,115,22,0.08)';
  const accentBd = dark ? 'rgba(249,115,22,0.35)' : 'rgba(249,115,22,0.30)';
  const surface  = dark ? '#161b22'                : '#f6f8fa';
  const card     = dark ? '#0d1117'                : '#ffffff';
  const border   = dark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)';
  const text     = dark ? '#e6edf3'                : '#1f2328';
  const muted    = dark ? '#8b949e'                : '#57606a';
  const raftBg   = dark ? 'rgba(249,115,22,0.07)'  : 'rgba(249,115,22,0.04)';
  const raftBd   = dark ? 'rgba(249,115,22,0.20)'  : 'rgba(249,115,22,0.15)';

  return `
    .rmq-arch * { box-sizing: border-box; }
    .rmq-arch {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      font-size: 13px; color: ${text};
      display: flex; flex-direction: column; gap: 10px;
    }
    .rmq-client {
      background: ${surface}; border: 1px solid ${border};
      border-radius: 10px; padding: 12px 18px;
      display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
    }
    .rmq-client-label {
      font-size: 11px; font-weight: 700; text-transform: uppercase;
      letter-spacing: .08em; color: ${muted};
    }
    .rmq-badge {
      font-size: 11px; font-weight: 600; padding: 2px 9px; border-radius: 5px;
      background: ${accentBg}; color: ${accentFg}; border: 1px solid ${accentBd};
    }
    .rmq-badge-grey {
      font-size: 11px; font-weight: 600; padding: 2px 9px; border-radius: 5px;
      background: ${surface}; color: ${muted}; border: 1px solid ${border};
    }
    .rmq-arrow { text-align: center; color: ${muted}; font-size: 16px; line-height: 1; }
    .rmq-svc {
      background: ${accentBg}; border: 1px solid ${accentBd};
      border-radius: 10px; padding: 10px 18px;
      display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
    }
    .rmq-svc-name {
      font-family: "JetBrains Mono","Fira Code",monospace;
      font-size: 12px; font-weight: 600; color: ${accentFg};
    }
    .rmq-svc-kind { font-size: 11px; color: ${muted}; margin-left: auto; }
    .rmq-quorum {
      background: ${raftBg}; border: 1px dashed ${raftBd}; border-radius: 12px; padding: 14px;
    }
    .rmq-quorum-label {
      font-size: 10px; font-weight: 700; letter-spacing: .10em;
      text-transform: uppercase; color: ${accentFg}; margin-bottom: 10px; opacity: 0.8;
    }
    .rmq-nodes { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; }
    .rmq-node {
      background: ${card}; border: 1px solid ${border};
      border-radius: 10px; padding: 10px 10px 8px;
      display: flex; flex-direction: column; gap: 5px;
    }
    .rmq-node.leader { border-color: ${accent}; box-shadow: 0 0 0 1px ${accentBd}; }
    .rmq-node-header { display: flex; align-items: center; gap: 6px; }
    .rmq-node-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
    .rmq-node-dot.leader  { background: ${accent}; box-shadow: 0 0 6px ${accent}; }
    .rmq-node-dot.follower { background: ${muted}; }
    .rmq-node-name {
      font-family: "JetBrains Mono","Fira Code",monospace;
      font-size: 11px; font-weight: 600; color: ${text};
    }
    .rmq-node-role {
      margin-left: auto; font-size: 9px; font-weight: 700;
      padding: 1px 5px; border-radius: 3px; text-transform: uppercase;
    }
    .rmq-node-role.leader   { background: ${accentBg}; color: ${accentFg}; }
    .rmq-node-role.follower { background: ${surface};   color: ${muted}; }
    .rmq-node-ports { display: flex; gap: 4px; flex-wrap: wrap; }
    .rmq-port {
      font-size: 10px; padding: 1px 5px; border-radius: 3px;
      border: 1px solid ${border}; color: ${muted};
      font-family: "JetBrains Mono","Fira Code",monospace;
    }
    .rmq-pvc {
      font-size: 10px; padding: 2px 6px; border-radius: 4px;
      background: ${surface}; border: 1px solid ${border}; color: ${muted}; text-align: center;
    }
    .rmq-footer { display: flex; gap: 8px; flex-wrap: wrap; }
    .rmq-footer-item {
      display: flex; align-items: center; gap: 6px;
      background: ${surface}; border: 1px solid ${border};
      border-radius: 8px; padding: 6px 12px; flex: 1; min-width: 110px;
    }
    .rmq-footer-dot { width: 6px; height: 6px; border-radius: 50%; }
    .rmq-footer-dot.amqp    { background: ${accent}; }
    .rmq-footer-dot.mgmt    { background: #3b82f6; }
    .rmq-footer-dot.metrics { background: #10b981; }
    .rmq-footer-label { font-size: 11px; color: ${muted}; }
    .rmq-footer-port {
      font-family: "JetBrains Mono","Fira Code",monospace;
      font-size: 11px; font-weight: 600; color: ${text}; margin-left: auto;
    }
  `;
}

export default function RabbitMQArchitectureDiagram() {
  const theme = useTheme();
  const dark  = theme.palette.mode === 'dark';
  return (
    <>
      <style>{getStyles(dark)}</style>
      <div className="rmq-arch">
        <div className="rmq-client">
          <span className="rmq-client-label">AMQP Clients</span>
          <span className="rmq-badge">AMQP 0-9-1</span>
          <span className="rmq-badge-grey">STOMP / MQTT</span>
        </div>
        <div className="rmq-arrow">↓</div>
        <div className="rmq-svc">
          <span className="rmq-svc-name">rabbitmq-cluster</span>
          <span className="rmq-badge">:5672</span>
          <span className="rmq-svc-kind">ClusterIP Service</span>
        </div>
        <div className="rmq-arrow">↓</div>
        <div className="rmq-quorum">
          <div className="rmq-quorum-label">Raft Quorum — 3-node cluster</div>
          <div className="rmq-nodes">
            <div className="rmq-node leader">
              <div className="rmq-node-header">
                <div className="rmq-node-dot leader"></div>
                <span className="rmq-node-name">rabbit-0</span>
                <span className="rmq-node-role leader">Leader</span>
              </div>
              <div className="rmq-node-ports">
                <span className="rmq-port">:5672</span>
                <span className="rmq-port">:15692</span>
              </div>
              <div className="rmq-pvc">PVC · 20 Gi</div>
            </div>
            <div className="rmq-node">
              <div className="rmq-node-header">
                <div className="rmq-node-dot follower"></div>
                <span className="rmq-node-name">rabbit-1</span>
                <span className="rmq-node-role follower">Follower</span>
              </div>
              <div className="rmq-node-ports">
                <span className="rmq-port">:5672</span>
                <span className="rmq-port">:15692</span>
              </div>
              <div className="rmq-pvc">PVC · 20 Gi</div>
            </div>
            <div className="rmq-node">
              <div className="rmq-node-header">
                <div className="rmq-node-dot follower"></div>
                <span className="rmq-node-name">rabbit-2</span>
                <span className="rmq-node-role follower">Follower</span>
              </div>
              <div className="rmq-node-ports">
                <span className="rmq-port">:5672</span>
                <span className="rmq-port">:15692</span>
              </div>
              <div className="rmq-pvc">PVC · 20 Gi</div>
            </div>
          </div>
        </div>
        <div className="rmq-footer">
          <div className="rmq-footer-item">
            <div className="rmq-footer-dot amqp"></div>
            <span className="rmq-footer-label">AMQP</span>
            <span className="rmq-footer-port">:5672</span>
          </div>
          <div className="rmq-footer-item">
            <div className="rmq-footer-dot mgmt"></div>
            <span className="rmq-footer-label">Management UI</span>
            <span className="rmq-footer-port">:15672</span>
          </div>
          <div className="rmq-footer-item">
            <div className="rmq-footer-dot metrics"></div>
            <span className="rmq-footer-label">Prometheus</span>
            <span className="rmq-footer-port">:15692</span>
          </div>
        </div>
      </div>
    </>
  );
}
