import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { 
  Cpu, 
  ExternalLink, 
  Layers, 
  Play, 
  Code, 
  Check, 
  Eye, 
  Award, 
  Gauge, 
  Sparkles, 
  Zap, 
  ShieldAlert, 
  Workflow, 
  Coins, 
  Terminal 
} from 'lucide-react';

const PROJECTS: Project[] = [
  {
    id: 'omnisight',
    title: 'OmniSight AI Engine',
    category: 'ai',
    tags: ['PyTorch', 'Next.js 14', 'WebGPU', 'YOLOv8'],
    description: 'Sovereign computer vision suite for high-frequency industrial quality control and micro-defect classification.',
    detailedDesc: 'Utilizes custom CUDA convolution pipelines quantized down to WebGPU execution parameters. Integrates directly with high-speed manufacturing assembly lines to label, analyze, and quarantine defective assets in real-time.',
    metric: '99.86%',
    metricLabel: 'Defect Precision',
    status: 'operational',
    latency: '3.4ms'
  },
  {
    id: 'flux-wallet',
    title: 'Flux Ledger Wallet',
    category: 'fullstack',
    tags: ['React Native', 'Swift', 'Rust Core', 'gRPC'],
    description: 'Ultra-low latency cryptographically isolated digital currency client for decentralized machinery-leasing workflows.',
    detailedDesc: 'Implements zero-knowledge proof verification algorithms on-device. Connects physical hardware hours in industrial leasing structures with multi-tenant sub-second ledger authorizations directly on decentralized network rails.',
    metric: '184k',
    metricLabel: 'Tx/Sec Cluster',
    status: 'optimizing',
    latency: '8.2ms'
  },
  {
    id: 'coregrid',
    title: 'CoreGrid Node Controller',
    category: 'edge',
    tags: ['Rust', 'MQTT v5', 'Docker', 'WebAssembly'],
    description: 'Multi-threaded client agent managing tens of thousands of IoT sensor streams with sub-millisecond broadcast dispatch.',
    detailedDesc: 'Written in pure Rust with zero-allocation JSON parsers. Compiles directly into WASM runtimes to execute custom filtering logic at the absolute edge point of industrial machinery nodes in the Netherlands.',
    metric: '<12ms',
    metricLabel: 'Inference Latency',
    status: 'operational',
    latency: '0.8ms'
  },
  {
    id: 'sentinel',
    title: 'Sentinel Web Suite',
    category: 'fullstack',
    tags: ['TypeScript', 'Go', 'Redis', 'eBPF Kernel'],
    description: 'Modern cyber-defense security center with live network mapping, sandboxed access controls, and kernel-level trace logs.',
    detailedDesc: 'Combines backend eBPF probes in Linux systems with high-frequency communication protocols to display live security profiles. Blocks malicious exploits at the gateway before they pollute container filesystems.',
    metric: 'Zero-Trust',
    metricLabel: 'Security Level',
    status: 'lab-testing',
    latency: '14.1ms'
  }
];

export default function PortfolioShowcase() {
  const [filter, setFilter] = useState<'all' | 'ai' | 'edge' | 'fullstack'>('all');
  const [activeProject, setActiveProject] = useState<string | null>(null);

  // OmniSight interactive component state
  const [defectScanActive, setDefectScanActive] = useState(false);
  const [defectProgress, setDefectProgress] = useState(0);
  const [defectsFound, setDefectsFound] = useState<string[]>([]);
  
  // Flux wallet state
  const [balance, setBalance] = useState(42050.40);
  const [sendTxProgress, setSendTxProgress] = useState(false);

  // CoreGrid state
  const [edgeHz, setEdgeHz] = useState(500);

  // Sentinel state
  const [scanningNetwork, setScanningNetwork] = useState(false);
  const [blockedThreats, setBlockedThreats] = useState(148);

  const filteredProjects = PROJECTS.filter(
    (p) => filter === 'all' || p.category === filter
  );

  // Interactive Defect Scanner timer
  useEffect(() => {
    let timer: any;
    if (defectScanActive) {
      setDefectProgress(0);
      setDefectsFound([]);
      timer = setInterval(() => {
        setDefectProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setDefectScanActive(false);
            // Simulate results
            const results = Math.random() > 0.4 
              ? ['Micro-crack structure in Segment B3 [P-8]', 'Thermal aberration detected at Junction C-01'] 
              : ['100% Structural integrity match. Assembly accepted.'];
            setDefectsFound(results);
            return 100;
          }
          return prev + 10;
        });
      }, 250);
    }
    return () => clearInterval(timer);
  }, [defectScanActive]);

  // Simulate transactional ledger sync
  const handleInitiateTx = () => {
    if (sendTxProgress) return;
    setSendTxProgress(true);
    setTimeout(() => {
      setSendTxProgress(false);
      setBalance((b) => b + 250.00);
    }, 2000);
  };

  // Trigger network test
  const handleNetworkExploitScan = () => {
    if (scanningNetwork) return;
    setScanningNetwork(true);
    setTimeout(() => {
      setScanningNetwork(false);
      setBlockedThreats((t) => t + Math.floor(Math.random() * 5) + 1);
    }, 2200);
  };

  return (
    <div className="space-y-8 select-none">
      {/* 1. Category filter control menu */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-900 pb-4">
        <div>
          <h3 className="font-sans font-medium text-white text-lg tracking-tight">Our Work</h3>
          <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-wider mt-0.5">
            Architecting the digital frontier.
          </p>
        </div>

        <div className="flex bg-zinc-950 p-1 rounded-lg border border-zinc-900 gap-1 text-xs font-mono">
          {(['all', 'ai', 'edge', 'fullstack'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3.5 py-1.5 rounded-md transition-all uppercase text-[10px] tracking-wider cursor-pointer ${
                filter === cat
                  ? 'bg-gradient-to-r from-teal-500/20 to-emerald-500/20 text-teal-300 font-semibold border border-teal-500/30'
                  : 'text-zinc-400 hover:text-white border border-transparent'
              }`}
            >
              {cat === 'all' ? 'All Systems' : cat === 'ai' ? 'Neural/AI' : cat === 'edge' ? 'Edge IoT' : 'Web/Stack'}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Interactive Bento Grid Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((p) => (
          <div
            key={p.id}
            className={`border rounded-lg bg-zinc-950/60 p-5 flex flex-col justify-between transition-all duration-300 relative group overflow-hidden ${
              activeProject === p.id 
                ? 'border-teal-500 shadow-[0_10px_30px_rgba(20,184,166,0.1)]' 
                : 'border-zinc-800 hover:border-zinc-700'
            }`}
          >
            {/* Background cyber ambient lines overlay */}
            <div className="absolute top-0 right-10 w-24 h-[1.2px] bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
            
            <div>
              {/* Header stats metrics box */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[9px] bg-zinc-900 px-2.5 py-0.5 rounded text-zinc-400 border border-zinc-850 flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${p.status === 'operational' ? 'bg-emerald-500' : p.status === 'optimizing' ? 'bg-cyan-500 animate-pulse' : 'bg-amber-500'}`} />
                  {p.status.toUpperCase()}
                </span>
                
                <div className="flex flex-col items-end text-right">
                  <span className="font-sans font-bold text-teal-400 text-lg leading-none">
                    {p.metric}
                  </span>
                  <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest mt-1">
                    {p.metricLabel}
                  </span>
                </div>
              </div>

              {/* Title & tags */}
              <h4 className="font-sans font-semibold text-white group-hover:text-teal-300 transition-colors tracking-tight text-base">
                {p.title}
              </h4>
              <p className="text-zinc-400 text-xs leading-relaxed mt-2.5 font-sans">
                {p.description}
              </p>

              {/* Technologies chip lists */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[9px] text-zinc-400 bg-zinc-900 border border-zinc-850/60 px-2 py-0.5 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Expander Footer Link */}
            <div className="mt-6 border-t border-zinc-900 pt-4 flex items-center justify-between gap-4">
              <span className="font-mono text-[9.5px] text-zinc-500">
                P-TX_LATENCY: <span className="text-zinc-300">{p.latency || 'N/A'}</span>
              </span>

              <button
                onClick={() => setActiveProject(activeProject === p.id ? null : p.id)}
                className="font-mono text-[10px] text-teal-400 border border-teal-500/20 bg-teal-500/5 hover:bg-teal-500/20 hover:border-teal-400 px-3.5 py-1.5 rounded font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {activeProject === p.id ? 'CLOSE SYSTEM' : 'CONNECT CONSOLE'}
                <Cpu className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Inner Interactive Sandbox Simulator Console (Renders directly when Active) */}
            {activeProject === p.id && (
              <div className="mt-5 border-t-2 border-dashed border-zinc-800 pt-5 text-[11px] font-mono animate-fadeIn relative z-10 bg-zinc-950 p-4 rounded-md border border-zinc-900 shadow-inner">
                <div className="flex items-center justify-between text-[10px] border-b border-zinc-900 pb-2 mb-3 text-zinc-500">
                  <span className="flex items-center gap-1">
                    <Terminal className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
                    EMBEDDED SIMULATION HUB v1.0.4
                  </span>
                  <span className="text-emerald-400 font-semibold">[PEER_HANDSHAKE_OK]</span>
                </div>

                <p className="text-zinc-400 text-[10px] leading-relaxed mb-4 font-sans max-w-lg">
                  {p.detailedDesc}
                </p>

                {/* 1. OMNISIGHT CONSOLE SANDBOX */}
                {p.id === 'omnisight' && (
                  <div className="space-y-3 bg-zinc-900/30 p-3 rounded border border-zinc-900">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-zinc-400">CAMERA_FEED_SIM:</span>
                      <span className="text-zinc-500">[FRAME WORKSPACE: ON]</span>
                    </div>

                    <div className="relative h-20 bg-zinc-950 rounded border border-zinc-900 overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-0 bg-radial-gradient from-teal-500/10 to-transparent pointer-events-none" />
                      
                      {defectScanActive ? (
                        <div className="flex flex-col items-center gap-1.5 w-full px-8">
                          <div className="flex justify-between text-[9px] text-zinc-400 w-full mb-1">
                            <span>CUDA CORE COMPLIANCE SCANNING...</span>
                            <span>{defectProgress}%</span>
                          </div>
                          <div className="w-full bg-zinc-900 h-1 rounded overflow-hidden">
                            <div className="bg-teal-500 h-full transition-all duration-300" style={{ width: `${defectProgress}%` }} />
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-2">
                          {defectsFound.length > 0 ? (
                            <div className="space-y-1">
                              {defectsFound.map((def, idx) => (
                                <div key={idx} className={def.includes('aberration') || def.includes('crack') ? 'text-amber-400 font-bold' : 'text-emerald-400 font-semibold text-[10px]'}>
                                  ● {def}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <span className="text-zinc-500">Awaiting Manufacturing Feed Trigger</span>
                          )}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => setDefectScanActive(true)}
                      disabled={defectScanActive}
                      className="w-full bg-teal-500 text-zinc-950 font-sans font-bold text-xs py-2 rounded hover:bg-teal-400 transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5" /> TRIGGER DEFECT CLASSIFICATION LOOP
                    </button>
                  </div>
                )}

                {/* 2. FLUX LEDGER CONSOLE SANDBOX */}
                {p.id === 'flux-wallet' && (
                  <div className="space-y-3 bg-zinc-900/30 p-3 rounded border border-zinc-900">
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400">DEC_LOG_BALANCE:</span>
                      <span className="text-white font-bold">{balance.toFixed(2)} FLX</span>
                    </div>

                    <div className="bg-zinc-950 p-2.5 rounded border border-zinc-900 text-center text-[10px] space-y-1 text-zinc-500">
                      <div>Secure Peer Multi-Sig: <span className="text-cyan-400">0x81bce...f9d02</span></div>
                      <div>Status: <span className="text-emerald-400 font-semibold">Ledger Anchored (NL-02)</span></div>
                    </div>

                    <button
                      onClick={handleInitiateTx}
                      disabled={sendTxProgress}
                      className="w-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-sans font-bold text-xs py-2 rounded hover:bg-cyan-500 hover:text-zinc-950 transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5"
                    >
                      {sendTxProgress ? 'MUTI-SIG AUTHORIZATION PENDING...' : 'TRANSMIT 250.00 FLX SECURE SEED'}
                    </button>
                  </div>
                )}

                {/* 3. COREGRID NODE CONSOLE SANDBOX */}
                {p.id === 'coregrid' && (
                  <div className="space-y-3 bg-zinc-900/30 p-3 rounded border border-zinc-900">
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400">EDGE_Hz_RTM_FREQUENCY:</span>
                      <span className="text-teal-400 font-bold">{edgeHz} / Sec</span>
                    </div>

                    <div className="py-2">
                      <input
                        type="range"
                        min="100"
                        max="2000"
                        step="50"
                        value={edgeHz}
                        onChange={(e) => setEdgeHz(Number(e.target.value))}
                        className="w-full accent-teal-400 bg-zinc-950 h-1.5 rounded cursor-pointer"
                      />
                      <div className="flex justify-between text-[8px] text-zinc-650 mt-1">
                        <span>100 Hz (MIN)</span>
                        <span>1000 Hz (AVG)</span>
                        <span>2000 Hz (MAX LOAD)</span>
                      </div>
                    </div>

                    <div className="bg-zinc-950 p-2 rounded border border-zinc-900 text-[10px] text-zinc-400 text-center">
                      Est. Node CPU Core Load: <span className="text-emerald-400 font-bold">{(edgeHz / 20).toFixed(1)}%</span>
                    </div>
                  </div>
                )}

                {/* 4. SENTINEL SECURITY CONSOLE SANDBOX */}
                {p.id === 'sentinel' && (
                  <div className="space-y-3 bg-zinc-900/30 p-3 rounded border border-zinc-900">
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400">FIREWALL_eBPF_PROBES:</span>
                      <span className="text-amber-400 font-bold">{blockedThreats} Blocked</span>
                    </div>

                    <div className="relative h-18 bg-zinc-950 rounded border border-zinc-900 p-2 flex items-center justify-center">
                      {scanningNetwork ? (
                        <div className="text-center text-amber-500 animate-pulse text-[10px]">
                          [!] eBPF PENETRATION CHECKING NETWORK PORTS...
                        </div>
                      ) : (
                        <div className="text-zinc-500 text-center text-[10px]">
                          Zero malicious activity inside Sandbox container. Gateway Secure.
                        </div>
                      )}
                    </div>

                    <button
                      onClick={handleNetworkExploitScan}
                      disabled={scanningNetwork}
                      className="w-full bg-amber-500 text-zinc-950 font-sans font-bold text-xs py-2 rounded hover:bg-amber-400 transition-colors cursor-pointer text-center"
                    >
                      {scanningNetwork ? 'COMPILING EXP-TRACE LOGS...' : 'FORCE ACTIVE GATEWAY EXPLOIT SWEEP'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 3. Core engineering SLA statistic credentials table */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-zinc-950 border border-zinc-800 p-5 rounded-lg text-center shadow-lg relative overflow-hidden select-text">
        <div className="absolute top-0 left-0 w-full h-[1.2px] bg-gradient-to-r from-teal-500/10 via-emerald-500/20 to-cyan-500/10" />

        <div className="space-y-1.5 p-2">
          <div className="text-zinc-500 font-mono text-[9px] uppercase tracking-wider flex items-center justify-center gap-1">
            <Gauge className="w-3.5 h-3.5 text-teal-400" />
            Lighthouse Score
          </div>
          <div className="text-2xl font-sans font-black text-white tracking-tight">100/100</div>
          <p className="text-zinc-500 text-[10px] font-sans">Perf, Best Practices & SEO</p>
        </div>

        <div className="space-y-1.5 p-2 border-l md:border-l border-zinc-900">
          <div className="text-zinc-500 font-mono text-[9px] uppercase tracking-wider flex items-center justify-center gap-1">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            Core Latency TTFB
          </div>
          <div className="text-2xl font-sans font-black text-white tracking-tight">&lt;120ms</div>
          <p className="text-zinc-500 text-[10px] font-sans">Global edge delivery hubs</p>
        </div>

        <div className="space-y-1.5 p-2 border-l border-zinc-900">
          <div className="text-zinc-500 font-mono text-[9px] uppercase tracking-wider flex items-center justify-center gap-1">
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            Guaranteed SLO
          </div>
          <div className="text-2xl font-sans font-black text-white tracking-tight">99.997%</div>
          <p className="text-zinc-500 text-[10px] font-sans">Uptime cluster agreement</p>
        </div>

        <div className="space-y-1.5 p-2 border-l border-zinc-900">
          <div className="text-zinc-500 font-mono text-[9px] uppercase tracking-wider flex items-center justify-center gap-1">
            <Workflow className="w-3.5 h-3.5 text-amber-500" />
            Global Deploy
          </div>
          <div className="text-2xl font-sans font-black text-white tracking-tight">12+ Sites</div>
          <p className="text-zinc-500 text-[10px] font-sans">Live industrial partners</p>
        </div>
      </div>
    </div>
  );
}
