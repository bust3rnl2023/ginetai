import React, { useEffect, useRef, useState } from 'react';
import { TelemetryLogEntry } from '../types';
import { Sparkles, Terminal, Activity, Server, RefreshCw } from 'lucide-react';

const INITIAL_LOGS: TelemetryLogEntry[] = [
  { id: '1', timestamp: '08:02:14.041', level: 'INFO', message: 'Core Ginet AI node initialized on port 3000.' },
  { id: '2', timestamp: '08:02:14.288', level: 'INFO', message: 'Est. secure peer tunnel with Eerbeek Headquarters NL.' },
  { id: '3', timestamp: '08:02:15.110', level: 'DEBUG', message: 'FPGA optimization layer calibrated: [D-UNIT-01]' },
  { id: '4', timestamp: '08:02:15.932', level: 'TRACE', message: 'Thermal profile aligned: Intel Xeone Core Temp: 34C.' },
  { id: '5', timestamp: '08:02:16.421', level: 'INFO', message: 'Neural quantization initialized: INT8 model compression loaded (accuracy delta: -0.04%).' }
];

const LOG_MESSAGES = [
  { level: 'TRACE', msg: 'Vibrational telemetry from Eerbeek-Hub-42 sync: status NORMAL, amplitude 1.12mm' },
  { level: 'INFO', msg: 'Zero-Trust Secure Client Handshake validated via NL-Gate-02' },
  { level: 'DEBUG', msg: 'Decoded transmission handshake: packet integrity 100%, latency 11.4ms' },
  { level: 'INFO', msg: 'MLOps dynamic weights re-balancing active on Edge cluster' },
  { level: 'TRACE', msg: 'Pulse sensor mesh: 142 discrete nodes answering in 2.4 microseconds' },
  { level: 'WARN', msg: 'High frequency data-burst in Node-B6 (Eerbeek Lab) - throttled at 12ms gate' },
  { level: 'DEBUG', msg: 'Quantization scales optimized: throughput maximized to 94.2k tokens/sec' },
  { level: 'INFO', msg: 'Database synchronized securely. Local state hash matches production blockchain.' }
];

export default function TelemetryLog() {
  const [logs, setLogs] = useState<TelemetryLogEntry[]>(INITIAL_LOGS);
  const [waveSpeed, setWaveSpeed] = useState<number>(0.12);
  const [chartMode, setChartMode] = useState<'vibration' | 'neural' | 'latency'>('vibration');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  // Periodically append new trace logs to simulate real-time telemetry activity
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');
      const randomContent = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
      
      const newEntry: TelemetryLogEntry = {
        id: String(Date.now()),
        timestamp: timeStr,
        level: randomContent.level as any,
        message: randomContent.msg
      };

      setLogs((prev) => {
        const updated = [...prev, newEntry];
        // Keep last 40 lines
        if (updated.length > 45) {
          return updated.slice(updated.length - 40);
        }
        return updated;
      });
    }, 3800);

    return () => clearInterval(timer);
  }, []);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Handle Canvas Drawing for High Frequency Wave forms
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let width = (canvas.width = canvas.offsetWidth || 500);
    let height = (canvas.height = canvas.offsetHeight || 140);
    let phase = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw background grid lines (cybernetic layout)
      ctx.strokeStyle = 'rgba(24, 24, 27, 0.4)';
      ctx.lineWidth = 1;
      
      const gridSpacing = 20;
      for (let x = 0; x < width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw zero axis standard line
      ctx.strokeStyle = 'rgba(63, 63, 70, 0.2)';
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      // Configure waveform based on mode
      const amplitude1 = chartMode === 'vibration' ? 24 : chartMode === 'neural' ? 14 : 32;
      const frequency1 = chartMode === 'vibration' ? 0.025 : chartMode === 'neural' ? 0.045 : 0.015;
      const amplitude2 = chartMode === 'vibration' ? 12 : chartMode === 'neural' ? 22 : 8;
      const frequency2 = chartMode === 'vibration' ? 0.05 : chartMode === 'neural' ? 0.015 : 0.035;

      // Primary sine wave - Custom Teal gradient
      const tealGrad = ctx.createLinearGradient(0, 0, width, 0);
      tealGrad.addColorStop(0, '#0d9488');
      tealGrad.addColorStop(0.5, '#14b8a6');
      tealGrad.addColorStop(1, '#2dd4bf');

      ctx.strokeStyle = tealGrad;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const y = height / 2 + 
          Math.sin(x * frequency1 + phase) * amplitude1 +
          Math.cos(x * frequency2 - phase * 1.5) * amplitude2;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Secondary faint overlay wave for depth reflection (Emerald)
      const emeraldGrad = ctx.createLinearGradient(0, 0, width, 0);
      emeraldGrad.addColorStop(0, 'rgba(16, 185, 129, 0.15)');
      emeraldGrad.addColorStop(1, 'rgba(52, 211, 153, 0.4)');

      ctx.strokeStyle = emeraldGrad;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const y = height / 2 + 
          Math.sin(x * (frequency1 * 1.2) - phase * 0.8) * (amplitude1 * 0.7) +
          Math.sin(x * (frequency2 * 0.7) + phase * 1.2) * (amplitude2 * 0.9);
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Draw high points markers
      ctx.fillStyle = '#2dd4bf';
      const indicatorX = width * 0.72;
      const indicatorY = height / 2 + 
        Math.sin(indicatorX * frequency1 + phase) * amplitude1 +
        Math.cos(indicatorX * frequency2 - phase * 1.5) * amplitude2;
      
      ctx.beginPath();
      ctx.arc(indicatorX, indicatorY, 4, 0, Math.PI * 2);
      ctx.fill();

      // Small glowing radar pulse circular wave at target
      ctx.strokeStyle = 'rgba(45, 212, 191, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(indicatorX, indicatorY, 8 + Math.abs(Math.sin(phase * 4)) * 12, 0, Math.PI * 2);
      ctx.stroke();

      phase += waveSpeed;
      animFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrame);
    };
  }, [waveSpeed, chartMode]);

  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getLogLevelStyle = (level: string) => {
    switch (level) {
      case 'INFO':
        return 'text-emerald-400 font-semibold';
      case 'DEBUG':
        return 'text-cyan-400';
      case 'TRACE':
        return 'text-zinc-400';
      case 'WARN':
        return 'text-amber-500 font-bold';
      default:
        return 'text-zinc-500';
    }
  };

  return (
    <div className="flex flex-col bg-zinc-950 border border-zinc-800 rounded-lg p-5 overflow-hidden shadow-2xl relative">
      {/* Decorative Corner Tabs */}
      <div className="absolute top-0 left-12 w-24 h-[1px] bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />
      
      {/* Module Title Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-ping absolute" />
          <div className="w-2.5 h-2.5 rounded-full bg-teal-400 relative" />
          <h3 className="font-sans font-medium text-xs tracking-wider uppercase text-zinc-300 flex items-center gap-1.5">
            <Activity className="w-4.5 h-4.5 text-teal-400" />
            Active Node Telemetry
          </h3>
          <span className="font-mono text-[9px] bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded ml-2">
            STATION_EERBEEK_NL
          </span>
        </div>

        <div className="flex gap-1 bg-zinc-900/60 p-0.5 rounded border border-zinc-800 text-[10px] font-mono">
          <button
            onClick={() => { setChartMode('vibration'); setWaveSpeed(0.12); }}
            className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
              chartMode === 'vibration' ? 'bg-zinc-800 text-teal-300 font-semibold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            VIBRATION
          </button>
          <button
            onClick={() => { setChartMode('neural'); setWaveSpeed(0.06); }}
            className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
              chartMode === 'neural' ? 'bg-zinc-800 text-teal-300 font-semibold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            NEURAL FEEDS
          </button>
          <button
            onClick={() => { setChartMode('latency'); setWaveSpeed(0.24); }}
            className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
              chartMode === 'latency' ? 'bg-zinc-800 text-teal-300 font-semibold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            LATENCY_FS
          </button>
        </div>
      </div>

      {/* Embedded Live Wave Graphical Visualizer */}
      <div className="relative h-32 bg-zinc-950/80 rounded border border-zinc-900 overflow-hidden mb-4 p-2 flex flex-col justify-between">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        
        {/* Floating status metadata layer */}
        <div className="relative z-10 flex justify-between items-start pointer-events-none text-[10px] font-mono select-none">
          <div className="bg-zinc-950/70 border border-zinc-800 px-2 py-0.5 rounded text-zinc-400 backdrop-blur-xs flex items-center gap-1.2">
            <Server className="w-3.5 h-3.5 text-teal-400" />
            <span>F-GRID_ACT_SWEEP: <span className="text-white">Active</span></span>
          </div>
          <div className="bg-zinc-950/70 border border-zinc-800 px-2 py-0.5 rounded text-zinc-400 backdrop-blur-xs">
            AVG_LATENCY: <span className="text-emerald-400">11.45 ms</span>
          </div>
        </div>
        
        <div className="relative z-10 flex justify-between items-end pointer-events-none text-[10px] font-mono select-none">
          <div className="text-zinc-500">
            Hz PLOT: 140 / 480 spectrum
          </div>
          <div className="text-zinc-400 bg-zinc-950/80 px-2 py-0.5 rounded border border-zinc-900">
            Node status: <span className="text-emerald-400">99.997% Uptime</span>
          </div>
        </div>
      </div>

      {/* Console log outputs terminal */}
      <div className="border border-zinc-900 bg-zinc-950/40 rounded p-3 h-48 overflow-y-auto flex flex-col gap-1.5 font-mono text-[11px] leading-relaxed select-text custom-scrollbar">
        <div className="text-zinc-500 text-[10px] border-b border-zinc-900 pb-1 mb-1.5 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Terminal className="w-3.5 h-3.5 text-zinc-400" />
            CONSOLE SYSTEM LOGGING_OUTPUT_FRAME
          </span>
          <span className="text-[9px] text-zinc-600">DECRYPT:_LINK_SECURE</span>
        </div>

        {logs.map((log) => (
          <div key={log.id} className="flex items-start gap-2 hover:bg-zinc-900/40 px-1 py-0.5 rounded transition-all">
            <span className="text-zinc-600 shrink-0 select-none">[{log.timestamp}]</span>
            <span className={`${getLogLevelStyle(log.level)} shrink-0 select-none text-[9.5px] tracking-wider`}>
              [{log.level}]
            </span>
            <span className="text-zinc-300 break-words">{log.message}</span>
          </div>
        ))}
        
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
}
