import React, { useEffect, useRef, useState } from 'react';
import { ShieldAlert, MapPin, Radio, Compass, Users, Disc, PhoneCall, Cpu } from 'lucide-react';
import { EngineerStatus } from '../types';

const INITIAL_ENGINEERS: EngineerStatus[] = [
  {
    name: 'Sven G.',
    role: 'Lead Full-Stack Architect',
    status: 'Compiling Rust Edge core grid with MQTT Broker',
    color: 'emerald',
    node: 'AMS-PEER-01',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop'
  },
  {
    name: 'Arjan V.',
    role: 'Neural Network Scientist',
    status: 'Compressing transformer weights via INT8 quantization',
    color: 'cyan',
    node: 'EERBEEK-NODE-5',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150&auto=format&fit=crop'
  },
  {
    name: 'Chloe D.',
    role: 'Industrial IoT Engineer',
    status: 'Mounting active accelerometer vibration sensors',
    color: 'amber',
    node: 'FACTORY-DEPLOY-H3',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop'
  }
];

export default function NetworkStatus() {
  const [engineers, setEngineers] = useState<EngineerStatus[]>(INITIAL_ENGINEERS);
  const radarCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Periodically change what the engineers are doing to make the site feel interactive
  useEffect(() => {
    const tasks = [
      'Calibrating sub-12ms neural responses',
      'Deploying secure telemetry tunnels',
      'Validating Lighthouse performance metrics',
      'Debugging WebGPU pipeline synchronization',
      'Syncing local storage payload logs',
      'Configuring dual-channel sensor mesh',
      'Optimizing FPGA hardware clock frequencies',
      'Testing WebSocket throughput for live controls'
    ];

    const timer = setInterval(() => {
      setEngineers((prev) =>
        prev.map((eng, idx) => {
          // 40% chance of task update
          if (Math.random() > 0.6) {
            const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
            return { ...eng, status: randomTask };
          }
          return eng;
        })
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Radar circular sweep simulation
  useEffect(() => {
    const canvas = radarCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let angle = 0;
    const width = (canvas.width = 180);
    const height = (canvas.height = 180);
    const cx = width / 2;
    const cy = height / 2;
    const r = width / 2 - 10;

    const draw = () => {
      // Dark slate clear
      ctx.fillStyle = '#09090b';
      ctx.fillRect(0, 0, width, height);

      // Draw concentric radar indicator grid rings
      ctx.strokeStyle = 'rgba(20, 184, 166, 0.15)';
      ctx.lineWidth = 1;

      for (let cr = 20; cr <= r; cr += 25) {
        ctx.beginPath();
        ctx.arc(cx, cy, cr, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Compass cross segments
      ctx.beginPath();
      ctx.moveTo(cx - r, cy);
      ctx.lineTo(cx + r, cy);
      ctx.moveTo(cx, cy - r);
      ctx.lineTo(cx, cy + r);
      ctx.stroke();

      // Scan trace angle sector
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);

      // Draw active gradient sweep slice
      const sweepGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, r);
      sweepGrad.addColorStop(0, 'rgba(20, 184, 166, 0.2)');
      sweepGrad.addColorStop(1, 'rgba(20, 184, 166, 0.0)');

      ctx.fillStyle = 'rgba(20, 184, 166, 0.08)';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, r, 0, Math.PI / 4);
      ctx.closePath();
      ctx.fill();

      // Draw core sweep leading razor line
      ctx.strokeStyle = 'rgba(45, 212, 191, 0.6)';
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#2dd4bf';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(r, 0);
      ctx.stroke();
      ctx.restore();

      // Static target points simulating headquarters and node telemetry
      const targets = [
        { x: cx + 18, y: cy - 23, opacity: 0.9, size: 4, name: 'HQ NL' },
        { x: cx - 35, y: cy + 18, opacity: 0.5, size: 2.5, name: 'AMS-1' },
        { x: cx - 12, y: cy - 40, opacity: 0.4, size: 2, name: 'L-01' }
      ];

      targets.forEach((t) => {
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(45, 212, 191, 0.8)';
        ctx.fillStyle = `rgba(45, 212, 191, ${t.opacity})`;
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.size, 0, Math.PI * 2);
        ctx.fill();

        // Label annotation
        ctx.shadowBlur = 0;
        ctx.fillStyle = 'rgba(113, 113, 122, 0.7)';
        ctx.font = '7.5px monospace';
        ctx.fillText(t.name, t.x + 6, t.y + 3);
      });

      angle += 0.024;
      animFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animFrame);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 1. Radar HQ Location Column */}
      <div className="lg:col-span-1 bg-zinc-950 border border-zinc-800 rounded-lg p-5 flex flex-col justify-between shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-12 w-20 h-[1.3px] bg-cyan-500/20" />
        
        <div className="mb-4">
          <div className="flex items-center gap-1.5 text-zinc-400 font-mono text-[10px] uppercase tracking-widest mb-1">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            Station Radar Mapping
          </div>
          <h4 className="font-sans font-medium text-white text-sm tracking-tight">
            Eerbeek, Gelderland, NL
          </h4>
          <p className="font-mono text-[10px] text-zinc-500 mt-1">
            Lat 52.1025° N | Long 6.0620° E
          </p>
        </div>

        {/* Central Radar Screen Container */}
        <div className="flex justify-center my-2 items-center bg-zinc-900/10 py-3 rounded border border-zinc-900">
          <div className="relative group">
            <canvas
              ref={radarCanvasRef}
              className="rounded-full border border-zinc-800 ring-4 ring-zinc-900/70"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none text-[8.5px] font-mono font-medium text-emerald-400 bg-zinc-950/90 border border-zinc-800 px-1.5 py-0.5 rounded tracking-wide animate-pulse">
              TX SYNCED
            </div>
          </div>
        </div>

        <div className="text-[11px] font-mono space-y-2 border-t border-zinc-900 pt-3 mt-2 text-zinc-400">
          <div className="flex justify-between items-center bg-zinc-900/30 p-1.5 rounded">
            <span className="text-zinc-500 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-cyan-400" /> HQ ADR:
            </span>
            <span className="text-zinc-300">Ringlaan 15, Eerbeek</span>
          </div>
          <div className="flex justify-between items-center bg-zinc-900/30 p-1.5 rounded">
            <span className="text-zinc-500 flex items-center gap-1">
              <PhoneCall className="w-3 h-3 text-cyan-400" /> SECURE_TX:
            </span>
            <span className="text-zinc-300 font-medium">hello@ginet.ai</span>
          </div>
        </div>
      </div>

      {/* 2. active team engineers status - Span 2 Columns */}
      <div className="lg:col-span-2 bg-zinc-950 border border-zinc-800 rounded-lg p-5 flex flex-col justify-between shadow-lg relative">
        <div className="absolute bottom-0 right-16 w-24 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

        <div className="flex justify-between items-center border-b border-zinc-900 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-400 animate-pulse" />
            <h4 className="font-sans font-medium text-white text-xs tracking-wider uppercase">
              Station Operational Dispatch
            </h4>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-900/30 px-2 py-0.5 rounded">
              GATEWAY: ONLINE
            </span>
          </div>
        </div>

        {/* Engineer status rows list */}
        <div className="space-y-4 my-2">
          {engineers.map((e) => (
            <div
              key={e.name}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900/20 border border-zinc-900 rounded p-3 hover:border-zinc-800 transition-all group"
            >
              <div className="flex items-center gap-3">
                {/* Profile Avatar with status pulsing circle rings */}
                <div className="relative shrink-0">
                  <div className={`absolute -inset-0.5 rounded-full bg-${e.color}-500/30 blur-xs group-hover:scale-110 transition-all`} />
                  <img
                    referrerPolicy="no-referrer"
                    src={e.avatar}
                    alt={e.name}
                    className="w-10 h-10 rounded-full object-cover relative z-10 border border-zinc-800"
                  />
                  {/* Status Indicator Dot */}
                  <span className={`absolute bottom-0 right-0 w-2.8 h-2.8 rounded-full border-2 border-zinc-950 z-20 bg-${e.color}-400 animate-pulse`} />
                </div>

                <div className="flex flex-col">
                  <div className="flex items-baseline gap-2">
                    <span className="font-sans font-semibold text-xs text-zinc-100 group-hover:text-emerald-400 transition-colors">
                      {e.name}
                    </span>
                    <span className="font-mono text-[8.5px] text-zinc-500 uppercase tracking-wider">
                      {e.role}
                    </span>
                  </div>
                  <p className="font-mono text-[10px] text-zinc-400 mt-1 flex items-start gap-1.5 line-clamp-1">
                    <Cpu className="w-3.2 h-3.2 text-zinc-600 self-center shrink-0" />
                    <span>{e.status}</span>
                  </p>
                </div>
              </div>

              {/* Status Station Tag badge */}
              <div className="flex items-center gap-1.5 sm:self-center shrink-0">
                <span className="font-mono text-[9px] text-zinc-500 bg-zinc-900/80 border border-zinc-850 px-2 py-1 rounded">
                  {e.node}
                </span>
                <Disc className="w-3.5 h-3.5 text-zinc-700 animate-spin group-hover:text-emerald-500 transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* Live operational log statistics banner */}
        <div className="flex justify-between items-center text-[10px] font-mono border-t border-zinc-900 pt-3 mt-4 text-zinc-500 select-none">
          <span>DUTY_TEAM_COUNT: <span className="text-white">3 ACTIVE</span></span>
          <span>EST_SYNC_DRIFT: <span className="text-emerald-400 font-semibold">&lt;0.003us</span></span>
        </div>
      </div>
    </div>
  );
}
