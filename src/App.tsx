import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Binary, 
  Clock, 
  Cpu, 
  Eye, 
  Globe, 
  Layers, 
  LockKeyhole, 
  Network, 
  Radio, 
  Send, 
  Server, 
  ShieldCheck, 
  Sparkles, 
  Terminal, 
  Workflow, 
  Zap,
  Info
} from 'lucide-react';

// Subcomponents import
import GinetLogo from './components/GinetLogo';
import NeuralGridBackground from './components/NeuralGridBackground';
import TelemetryLog from './components/TelemetryLog';
import NetworkStatus from './components/NetworkStatus';
import PortfolioShowcase from './components/PortfolioShowcase';
import ContactArchive from './components/ContactArchive';
import { AppTab, Transmission } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('ecosystem');
  const [currentTime, setCurrentTime] = useState<string>('');

  // Contact form input states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    scope: 'generative-ai' as any,
    message: ''
  });

  // State managers for transmission pipeline animations
  const [transmissionLogs, setTransmissionLogs] = useState<string[]>([]);
  const [transmissionPhase, setTransmissionPhase] = useState<'idle' | 'sending' | 'success'>('idle');
  const [transmissionStep, setTransmissionStep] = useState(0);

  // UTC time sync
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toUTCString().replace('GMT', 'UTC'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Safe navigation transition
  const handleNav = (tab: AppTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handles contact transmission form
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setTransmissionPhase('sending');
    setTransmissionStep(0);
    setTransmissionLogs([
      '>> Est. secure quantum handshake with Ginet Central...',
      '>> Validating TLS 1.3 Asymmetric RSA keypairs...'
    ]);

    // Animate synthetic logging steps
    const steps = [
      { log: '>> SSL Cert verification matching NL-AMS Gateway: PASS', ms: 500 },
      { log: '>> Structuring encrypted JSON signal bundle...', ms: 1000 },
      { log: '>> Emitting telemetry packet to Eerbeek R&D Node...', ms: 1500 },
      { log: '>> Securing local database persistence sequence...', ms: 1900 },
      { log: '>> Transmission confirmed securely decryptable.', ms: 2300 }
    ];

    steps.forEach((stepItem, index) => {
      setTimeout(() => {
        setTransmissionLogs((prev) => [...prev, stepItem.log]);
        setTransmissionStep(index + 1);
        if (index === steps.length - 1) {
          setTimeout(() => {
            // Write transmission to LocalStorage
            const newTx: Transmission = {
              id: 'TX-' + Math.floor(Math.random() * 9000 + 1000),
              name: formData.name,
              email: formData.email,
              scope: formData.scope,
              message: formData.message,
              timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC',
              status: 'DECRYPTED',
              routingNode: 'NL-NODE-GATEWAY-AMS'
            };

            const existing = localStorage.getItem('ginet_transmissions');
            let parsedExisting: Transmission[] = [];
            if (existing) {
              try { parsedExisting = JSON.parse(existing); } catch (e) { console.error(e); }
            }
            localStorage.setItem('ginet_transmissions', JSON.stringify([newTx, ...parsedExisting]));

            // Dispatch storage event manually for immediate sync with sibling files
            window.dispatchEvent(new Event('new_transmission_added'));

            // Clear inputs and end
            setTransmissionPhase('success');
            setFormData({ name: '', email: '', scope: 'generative-ai', message: '' });
          }, 600);
        }
      }, stepItem.ms);
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-teal-500 selection:text-zinc-950 font-sans tracking-tight relative overflow-hidden flex flex-col justify-between">
      {/* Dynamic neural backdrop background grids */}
      <NeuralGridBackground />

      {/* Decorative background horizontal and vertical scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,22,0)_97%,rgba(20,184,166,0.02)_98%,rgba(20,184,166,0.02)_100%)] bg-[size:100%_40px] pointer-events-none z-1" />

      {/* ─── HEADER / NAVIGATION BAR ─── */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-zinc-950/80 border-b border-zinc-900 px-4 py-3 xl:px-8 select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          
          <GinetLogo withText={true} size={38} className="cursor-pointer" onClick={() => handleNav('ecosystem')} />

          {/* Central Tabs navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-zinc-900/40 p-1 rounded-full border border-zinc-850 text-xs font-mono">
            <button
              onClick={() => handleNav('ecosystem')}
              className={`px-4 py-1.8 rounded-full transition-all cursor-pointer ${
                activeTab === 'ecosystem' 
                  ? 'bg-zinc-800 text-teal-300 font-semibold shadow-[0_2px_10px_rgba(20,184,166,0.1)]' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Ecosystem
            </button>
            <button
              onClick={() => handleNav('solutions')}
              className={`px-4 py-1.8 rounded-full transition-all cursor-pointer ${
                activeTab === 'solutions' 
                  ? 'bg-zinc-800 text-teal-300 font-semibold shadow-[0_2px_10px_rgba(20,184,166,0.1)]' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              AI Solutions
            </button>
            <button
              onClick={() => handleNav('portfolio')}
              className={`px-4 py-1.8 rounded-full transition-all cursor-pointer ${
                activeTab === 'portfolio' 
                  ? 'bg-zinc-800 text-teal-300 font-semibold shadow-[0_2px_10px_rgba(20,184,166,0.1)]' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Portfolio
            </button>
            <button
              onClick={() => handleNav('contact')}
              className={`px-4 py-1.8 rounded-full transition-all cursor-pointer ${
                activeTab === 'contact' 
                  ? 'bg-zinc-800 text-teal-300 font-semibold shadow-[0_2px_10px_rgba(20,184,166,0.1)]' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Transmission Hub
            </button>
          </nav>

          {/* Action Trigger Right Bar */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex flex-col text-right font-mono text-[9px] text-zinc-500 select-all">
              <span>SECURITY_GATE_OK</span>
              <span>{currentTime}</span>
            </div>
            
            <button
              onClick={() => handleNav('contact')}
              className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-zinc-950 px-4 py-2 rounded-full font-semibold text-xs transition-all shadow-[0_0_15px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.55)] cursor-pointer hover:scale-[1.01]"
            >
              Initialize Project
            </button>
          </div>
        </div>

        {/* Small Responsive Mobile Navigation Dropdown list */}
        <div className="md:hidden flex justify-around border-t border-zinc-900/60 mt-2 pt-2 text-[10px] uppercase font-mono tracking-widest font-bold">
          <button
            onClick={() => handleNav('ecosystem')}
            className={`cursor-pointer ${activeTab === 'ecosystem' ? 'text-teal-400 font-semibold' : 'text-zinc-500'}`}
          >
            ECO
          </button>
          <button
            onClick={() => handleNav('solutions')}
            className={`cursor-pointer ${activeTab === 'solutions' ? 'text-teal-400 font-semibold' : 'text-zinc-500'}`}
          >
            AI_STACK
          </button>
          <button
            onClick={() => handleNav('portfolio')}
            className={`cursor-pointer ${activeTab === 'portfolio' ? 'text-teal-400 font-semibold' : 'text-zinc-500'}`}
          >
            PORTFOLIO
          </button>
          <button
            onClick={() => handleNav('contact')}
            className={`cursor-pointer ${activeTab === 'contact' ? 'text-teal-400 font-semibold' : 'text-zinc-500'}`}
          >
            HUB
          </button>
        </div>
      </header>

      {/* ─── CENTRAL ROUTING LAYOUT CONTAINER ─── */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-6 md:py-12 relative z-10">
        
        <AnimatePresence mode="wait">
          {activeTab === 'ecosystem' && (
            <motion.div
              key="ecosystem"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="space-y-12 md:space-y-20 select-none"
            >
              {/* SECTION 1: HERO CONTAINER */}
              <section className="text-center py-8 md:py-16 relative">
                <div className="inline-flex items-center gap-1.5 bg-teal-950/40 border border-teal-900/60 px-3.5 py-1.5 rounded-full text-xs font-mono text-teal-300 font-semibold mb-6 animate-pulse select-text">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  Your Next-Gen Technological Engineering & AI Partner
                </div>

                <h1 className="font-sans font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.08] max-w-4xl mx-auto">
                  Engineering the <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-blue-400 drop-shadow-lg">
                    Digital Future
                  </span>
                </h1>

                <p className="font-sans text-sm sm:text-base md:text-md text-zinc-400 max-w-2xl mx-auto mt-6 leading-relaxed select-text">
                  Empowering global industries with neural infrastructure, edge IoT systems, and high-performance software platforms engineered for industrial scale. Grounded in Dutch engineering precision.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                  <button
                    onClick={() => handleNav('contact')}
                    className="bg-transparent text-white border border-zinc-700 hover:border-teal-400 hover:bg-teal-500/5 px-6 py-3 rounded-full font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg hover:shadow-teal-500/10"
                  >
                    Start Your Project
                    <ArrowRight className="w-4 h-4 text-teal-400" />
                  </button>
                  <button
                    onClick={() => {
                      const el = document.getElementById('core-stack-anchor');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-805 px-6 py-3 rounded-full font-medium text-xs uppercase tracking-wider transition-all cursor-pointer"
                  >
                    View Stack Ecosystem
                  </button>
                </div>
              </section>

              {/* SECTION 2: BENTO GRID - DIGITAL ECOSYSTEM */}
              <section id="core-stack-anchor" className="space-y-6">
                <div className="text-center">
                  <h2 className="font-sans font-bold text-2xl text-white tracking-tight">Our Core Stack</h2>
                  <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mt-1">
                    Technological Precision. Built from primary modules.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Bento Box 1: Neural Infrastructure */}
                  <div className="bg-zinc-950/60 border border-zinc-850 p-6 rounded-lg hover:border-zinc-700 transition-all flex flex-col justify-between group">
                    <div className="space-y-4">
                      <div className="w-10 h-10 rounded bg-cyan-950/30 border border-cyan-800/40 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-zinc-950 transition-all duration-300">
                        <Binary className="w-5 h-5" />
                      </div>
                      <h3 className="font-sans font-semibold text-white group-hover:text-cyan-300 transition-colors">
                        Neural Infrastructure &amp; AI
                      </h3>
                      <p className="text-zinc-500 font-mono text-[9px] uppercase tracking-wide">
                        NLP | Computer Vision | MLOps
                      </p>
                      <p className="text-zinc-400 text-xs leading-relaxed font-sans select-text">
                        Custom fine-tuned Transformer arrays, YOLOv8 visual classification grids, and quantization layers reducing model latencies on commodity hardware components.
                      </p>
                    </div>
                    <div className="mt-6 pt-3 border-t border-zinc-900 font-mono text-[10px] text-zinc-500">
                      R-LATENCY: <span className="text-cyan-400 font-bold">&lt;12ms</span>
                    </div>
                  </div>

                  {/* Bento Box 2: High Performance Platforms */}
                  <div className="bg-zinc-950/60 border border-zinc-850 p-6 rounded-lg hover:border-zinc-700 transition-all flex flex-col justify-between group">
                    <div className="space-y-4">
                      <div className="w-10 h-10 rounded bg-emerald-950/30 border border-emerald-800/40 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-zinc-950 transition-all duration-300">
                        <Layers className="w-5 h-5" />
                      </div>
                      <h3 className="font-sans font-semibold text-white group-hover:text-emerald-300 transition-colors">
                        High-Performance Platforms
                      </h3>
                      <p className="text-zinc-500 font-mono text-[9px] uppercase tracking-wide">
                        Ultra-Responsive | Rust | WebGPU
                      </p>
                      <p className="text-zinc-400 text-xs leading-relaxed font-sans select-text">
                        We build robust enterprise systems from scratch. Using lightweight Rust frameworks paired with Go services and WebGPU hardware acceleration pipelines.
                      </p>
                    </div>
                    <div className="mt-6 pt-3 border-t border-zinc-900 font-mono text-[10px] text-zinc-500">
                      CORE LIGHTHOUSE: <span className="text-emerald-400 font-bold">100/100</span>
                    </div>
                  </div>

                  {/* Bento Box 3: Edge IoT Systems */}
                  <div className="bg-zinc-950/60 border border-zinc-850 p-6 rounded-lg hover:border-zinc-700 transition-all flex flex-col justify-between group">
                    <div className="space-y-4">
                      <div className="w-10 h-10 rounded bg-teal-950/30 border border-teal-800/40 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-zinc-950 transition-all duration-300">
                        <Server className="w-5 h-5" />
                      </div>
                      <h3 className="font-sans font-semibold text-white group-hover:text-teal-300 transition-colors">
                        Edge IoT Systems
                      </h3>
                      <p className="text-zinc-500 font-mono text-[9px] uppercase tracking-wide">
                        Low-Power Mesh | MQTT Broker | FPGA
                      </p>
                      <p className="text-zinc-400 text-xs leading-relaxed font-sans select-text">
                        Deploying rugged smart connectivity sensor meshes. Low-latency data pipeline delivery, active vibration profiling, and telemetry routing networks.
                      </p>
                    </div>
                    <div className="mt-6 pt-3 border-t border-zinc-900 font-mono text-[10px] text-zinc-500">
                      MESH RANGE: <span className="text-teal-400 font-bold">142m nodes</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 3: WHY CHOOSE US (Built for Industrial Scale) */}
              <section className="space-y-6">
                <div className="text-center">
                  <h2 className="font-sans font-bold text-2xl text-white tracking-tight">Built for Industrial Scale</h2>
                  <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mt-1">
                    Engineering guarantees that ensure corporate peace of mind.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto select-text">
                  <div className="flex gap-4 p-4 hover:bg-zinc-900/20 rounded-md transition-all">
                    <div className="shrink-0">
                      <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-teal-400">
                        <LockKeyhole className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-sans font-semibold text-white text-xs tracking-wider uppercase">Zero-Trust Security</h4>
                      <p className="text-zinc-500 text-xs mt-1 leading-relaxed">
                        End-to-end hardware-compliant encryption. Sealed sandboxes preventing file tampering at edge gateways.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 hover:bg-zinc-900/20 rounded-md transition-all">
                    <div className="shrink-0">
                      <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-teal-400">
                        <Zap className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-sans font-semibold text-white text-xs tracking-wider uppercase">Rapid Prototyping</h4>
                      <p className="text-zinc-500 text-xs mt-1 leading-relaxed">
                        Get responsive, working systems in weeks, not years. High fidelity software directly synced to active needs.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 hover:bg-zinc-900/20 rounded-md transition-all">
                    <div className="shrink-0">
                      <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-teal-400">
                        <Globe className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-sans font-semibold text-white text-xs tracking-wider uppercase">Seamless Integration</h4>
                      <p className="text-zinc-500 text-xs mt-1 leading-relaxed">
                        Compatible with RESTful systems, gRPC streams, high speed WebSocket feeds, and legacy mainframe devices.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 4: INNOVATION LABS HIGHLIGHTS */}
              <section className="bg-zinc-950 border border-zinc-850 p-6 md:p-8 rounded-lg relative overflow-hidden select-text">
                <div className="absolute top-0 right-16 w-32 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4 my-auto">
                    <div className="font-mono text-[9px] bg-cyan-950/40 text-cyan-400 px-2.5 py-0.5 rounded border border-cyan-900/30 inline-block uppercase tracking-wider font-semibold">
                      INNOVATION LABS // NETHERLANDS
                    </div>
                    <h3 className="font-sans font-bold text-2xl text-white tracking-tight">
                      Active Case Highlights
                    </h3>
                    <p className="text-zinc-400 text-xs leading-relaxed font-sans">
                      Our scientific engineering division in Eerbeek, Netherlands processes live industrial data-streams. Discover the modular setups calibrated for telemetry precision.
                    </p>
                    <div className="space-y-3 pt-2 text-xs">
                      <div className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5" />
                        <div>
                          <strong className="text-zinc-200">Project NEXUS AI:</strong> Robust multi-vector wave classification monitoring. Optimized for industrial turbine defects.
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5" />
                        <div>
                          <strong className="text-zinc-200">Factory-01 Setup:</strong> Edge computing cluster linking accelerometers to secure cloud dashboards instantly.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded blur opacity-20" />
                    <div className="relative bg-zinc-950 border border-zinc-900 p-4 rounded-lg flex flex-col justify-between h-56 font-mono text-[10px] text-zinc-500">
                      <div>
                        <div className="flex items-center justify-between text-zinc-400 mb-2">
                          <span className="flex items-center gap-1">
                            <Terminal className="w-4 h-4 text-emerald-400 animate-pulse" />
                            SYS_FACTORY_01_FEED
                          </span>
                          <span className="text-emerald-500">[ONLINE]</span>
                        </div>
                        <p className="text-zinc-500 hover:text-zinc-400 transition-colors">
                          &gt; sync_cluster_target: 1,842 nodes active <br />
                          &gt; latency_average: 11.45 ms (calibration fine) <br />
                          &gt; tunnel_throughput: 84.2 MB/s <br />
                          &gt; security_check: SHA-256 Verified (Secure)
                        </p>
                      </div>
                      <div className="border-t border-zinc-900 pt-2 flex items-center justify-between text-zinc-500">
                        <span>STATION: EERBEEK_NL</span>
                        <span>CLUSTER_REBUILT_OK</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 5: LOWER CTA FIELD */}
              <section className="bg-gradient-to-r from-teal-950/20 via-zinc-950 to-emerald-950/20 border border-zinc-850 rounded-lg p-8 text-center relative select-text">
                <h3 className="font-sans font-bold text-xl text-white tracking-tight">
                  Ready to engineer the digital future?
                </h3>
                <p className="text-zinc-500 max-w-lg mx-auto text-xs mt-2">
                  Contact our scientific team at Eerbeek Headquarters. We build bespoke custom integrations designed for immediate deployment.
                </p>
                <button
                  onClick={() => handleNav('contact')}
                  className="bg-transparent text-teal-400 border border-teal-500/20 hover:border-teal-400 bg-teal-500/5 hover:bg-teal-500/10 px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider mt-5 transition-all cursor-pointer inline-flex items-center gap-1.5"
                >
                  Schedule Technical Consultation
                  <ArrowRight className="w-4 h-4 text-teal-400" />
                </button>
              </section>
            </motion.div>
          )}

          {activeTab === 'solutions' && (
            <motion.div
              key="solutions"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="space-y-12 select-none"
            >
              {/* solutions landing header */}
              <section className="text-center py-6">
                <div className="font-mono text-[10px] uppercase text-teal-400 tracking-widest inline-block bg-teal-950/40 px-3 py-1 rounded-full border border-teal-900/60 font-semibold mb-4 select-text animate-pulse">
                  AI &amp; Neural Hardware Capabilities
                </div>
                <h2 className="font-sans font-black text-3xl sm:text-4xl text-white tracking-tight">
                  Engineering the Neural Future of IoT
                </h2>
                <p className="text-zinc-400 text-sm max-w-2xl mx-auto mt-4 leading-relaxed select-text font-sans">
                  We design custom artificial neural networks, model optimization sequences, Edge compiler targets, and highly secure private cloud synthesis pipelines.
                </p>
              </section>

              {/* Bento grid representation of AI Capabilities */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6 select-text">
                <div className="bg-zinc-950/60 border border-zinc-850 rounded-lg p-5 flex flex-col justify-between group hover:border-zinc-700 transition-all">
                  <div className="space-y-3">
                    <div className="font-mono text-zinc-500 text-[9px]">MODULE // 101</div>
                    <h3 className="font-sans font-semibold text-white group-hover:text-teal-300 transition-colors">Neural Network Architecture</h3>
                    <p className="text-zinc-500 text-[10px]">Model Quantization | Low Latency Devices</p>
                    <p className="text-zinc-400 text-xs leading-relaxed font-sans">
                      Designing specialized algorithms for space-constrained industrial systems. Compressing networks without decreasing precision.
                    </p>
                  </div>
                  <div className="border-t border-zinc-900 pt-3 mt-4 flex justify-between items-center text-[10px] font-mono text-zinc-500">
                    <span>INFERENCE_TIME:</span>
                    <span className="text-teal-400 font-bold">&lt;12ms</span>
                  </div>
                </div>

                <div className="bg-zinc-950/60 border border-zinc-850 rounded-lg p-5 flex flex-col justify-between group hover:border-zinc-700 transition-all">
                  <div className="space-y-3">
                    <div className="font-mono text-zinc-500 text-[9px]">MODULE // 102</div>
                    <h3 className="font-sans font-semibold text-white group-hover:text-teal-300 transition-colors">Predictive Asset Maintenance</h3>
                    <p className="text-zinc-500 text-[10px]">Vibration Models | Acoustic Waves Analyzer</p>
                    <p className="text-zinc-400 text-xs leading-relaxed font-sans">
                      Constantly logging machinery frequencies. High accuracy neural models isolate defect vibrations before failure occurs internally.
                    </p>
                  </div>
                  <div className="border-t border-zinc-900 pt-3 mt-4 flex justify-between items-center text-[10px] font-mono text-zinc-500">
                    <span>ACCURACY:</span>
                    <span className="text-teal-400 font-bold">99.86% F1</span>
                  </div>
                </div>

                <div className="bg-zinc-950/60 border border-zinc-850 rounded-lg p-5 flex flex-col justify-between group hover:border-zinc-700 transition-all">
                  <div className="space-y-3">
                    <div className="font-mono text-zinc-500 text-[9px]">MODULE // 103</div>
                    <h3 className="font-sans font-semibold text-white group-hover:text-teal-300 transition-colors">Natural Language Synthesis</h3>
                    <p className="text-zinc-500 text-[10px]">Secure Private Cloud | RAG Channels</p>
                    <p className="text-zinc-400 text-xs leading-relaxed font-sans">
                      Deploying private Large Language Models on secure hardware networks. Prevents private industrial blueprints from leaking online.
                    </p>
                  </div>
                  <div className="border-t border-zinc-900 pt-3 mt-4 flex justify-between items-center text-[10px] font-mono text-zinc-500">
                    <span>HOST:</span>
                    <span className="text-teal-400 font-bold">100% Private Cloud</span>
                  </div>
                </div>
              </section>

              {/* Live telemetry diagnostic charts log */}
              <section className="space-y-4">
                <div>
                  <h3 className="font-sans font-bold text-lg text-white">Live Edge Diagnostics Hub</h3>
                  <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-wider mt-0.5">
                    Real-time network response and system logs synced to Amsterdam servers.
                  </p>
                </div>
                
                <TelemetryLog />
              </section>
            </motion.div>
          )}

          {activeTab === 'portfolio' && (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="space-y-12"
            >
              {/* Portfolio layout header */}
              <section className="text-center py-6 select-none">
                <div className="font-mono text-[10px] uppercase text-teal-400 tracking-widest inline-block bg-teal-950/40 px-3 py-1 rounded-full border border-teal-900/60 font-semibold mb-4 select-text animate-pulse">
                  Dutch Engineering Assets
                </div>
                <h2 className="font-sans font-black text-3xl sm:text-4xl text-white tracking-tight">
                  Architecting the Digital Frontier
                </h2>
                <p className="text-zinc-400 text-sm max-w-2xl mx-auto mt-4 leading-relaxed select-text font-sans">
                  Explore our live portfolio projects. Open a secure terminal connection console to interact with the simulated controls of our technologies.
                </p>
              </section>

              <PortfolioShowcase />
            </motion.div>
          )}

          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="space-y-12 select-none"
            >
              {/* contact hub layout header */}
              <section className="text-center py-4">
                <div className="font-mono text-[10px] uppercase text-teal-400 tracking-widest inline-block bg-teal-950/40 px-3 py-1 rounded-full border border-teal-900/60 font-semibold mb-4 select-text">
                  SECURE TRANSMISSION HANDSHAKE
                </div>
                <h2 className="font-sans font-black text-3xl text-white tracking-tight">
                  Let's Build the Intelligent Future Together
                </h2>
                <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto mt-3 select-text font-sans">
                  Send secure diagnostic queries to our scientific staff. Our Rotterdam gateways encrypt communications dynamically before routing payloads to our Eerbeek labs.
                </p>
              </section>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* 1. Left hand side Contact Transmission Form (Span 5 Grid Columns) */}
                <div className="lg:col-span-5 bg-zinc-950 border border-zinc-800 rounded-lg p-5 shadow-2xl relative">
                  <div className="absolute top-0 right-10 w-20 h-[1px] bg-teal-400/20" />
                  
                  <div className="flex items-center gap-1.5 text-zinc-400 font-mono text-[9px] uppercase tracking-widest mb-4 border-b border-zinc-900 pb-3">
                    <Terminal className="w-4 h-4 text-teal-400" />
                    Initialize Signal Path
                  </div>

                  {transmissionPhase === 'idle' && (
                    <form onSubmit={handleFormSubmit} className="space-y-4 text-xs font-sans select-text">
                      <div className="space-y-1">
                        <label className="text-zinc-500 font-mono text-[9.5px] uppercase tracking-wider block">
                          Sender Identification Name:
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Director of Operations"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-teal-400 focus:ring-1 focus:ring-teal-400/20 rounded px-3 py-2 text-zinc-200 text-xs placeholder:text-zinc-600 outline-none transition-all"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-zinc-500 font-mono text-[9.5px] uppercase tracking-wider block">
                          Verify Electronic Mail Address:
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. director@aerospace.de"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-teal-400 focus:ring-1 focus:ring-teal-400/20 rounded px-3 py-2 text-zinc-200 text-xs placeholder:text-zinc-600 outline-none transition-all"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-zinc-500 font-mono text-[9.5px] uppercase tracking-wider block">
                          Project Scientific Scope:
                        </label>
                        <select
                          value={formData.scope}
                          onChange={(e) => setFormData({ ...formData, scope: e.target.value as any })}
                          className="w-full bg-zinc-900 border border-zinc-800 focus:border-teal-400 focus:ring-1 focus:ring-teal-400/20 rounded px-3 py-2 text-zinc-200 text-xs outline-none transition-all cursor-pointer"
                        >
                          <option value="generative-ai">Generative AI / Quantized Models</option>
                          <option value="edge-iot">Edge IoT / Rugged Sensor Mesh</option>
                          <option value="high-performance">High-Performance Custom Platforms</option>
                          <option value="fullstack-portal">Full-Stack Corporate Portal</option>
                          <option value="custom-research">Advanced Scientific Research R&amp;D</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-zinc-500 font-mono text-[9.5px] uppercase tracking-wider block">
                          Encrypted Message Signal (Message Body):
                        </label>
                        <textarea
                          required
                          rows={4}
                          placeholder="State technical requirements, parameters, or consultation specs..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-teal-400 focus:ring-1 focus:ring-teal-400/20 rounded px-3 py-2 text-zinc-205 text-xs placeholder:text-zinc-650 outline-none transition-all resize-none custom-scrollbar"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-zinc-950 font-sans font-bold text-xs py-2.8 rounded transition-all cursor-pointer shadow-lg hover:shadow-teal-500/20 flex items-center justify-center gap-1.5 active:scale-98 uppercase"
                      >
                        Transmit Project Signal
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  )}

                  {/* Cryptographic Transmission Progress Screen */}
                  {transmissionPhase === 'sending' && (
                    <div className="h-64 flex flex-col justify-between font-mono text-[10.5px] p-2 bg-zinc-950/80 rounded border border-zinc-900 text-zinc-400">
                      <div className="space-y-2 select-text">
                        <div className="text-teal-400 font-bold border-b border-zinc-900 pb-1.5 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
                          CIPHER BROADCAST ENCRYPTING_SEQUENCE...
                        </div>
                        {transmissionLogs.map((log, idx) => (
                          <div key={idx} className={idx === transmissionLogs.length - 1 ? 'text-zinc-100 font-semibold' : 'text-zinc-550'}>
                            {log}
                          </div>
                        ))}
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[9px] text-zinc-550 mb-0.5">
                          <span>BROADCAST STACK INTEGRITY:</span>
                          <span>{Math.min(100, Math.floor(transmissionStep * 20))}%</span>
                        </div>
                        <div className="w-full bg-zinc-900 h-1.2 rounded overflow-hidden">
                          <div className="bg-teal-400 h-full transition-all duration-300" style={{ width: `${transmissionStep * 20}%` }} />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Successful broadcast confirmation screen */}
                  {transmissionPhase === 'success' && (
                    <div className="py-12 px-4 text-center space-y-4">
                      <div className="w-12 h-12 rounded-full bg-emerald-900/40 border-2 border-emerald-500/80 mx-auto flex items-center justify-center text-emerald-400 animate-bounce">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <h3 className="font-sans font-bold text-white text-base tracking-tight">
                        Transmission Decrypted &amp; Logged (AMS-01)
                      </h3>
                      <p className="text-zinc-400 text-xs leading-relaxed max-w-sm mx-auto select-text font-sans">
                        Your custom project scope payload has been securely decrypted, indexed inside local cache datasets, and relayed to Eerbeek Headquarters. Verify signal decrypts in the archive below.
                      </p>
                      
                      <button
                        onClick={() => setTransmissionPhase('idle')}
                        className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 px-5 py-2 rounded font-mono text-[10px] font-semibold border border-zinc-800 cursor-pointer transition-colors"
                      >
                        [ TRANSMIT NEW SIGNAL ]
                      </button>
                    </div>
                  )}
                </div>

                {/* 2. Right hand side Radar Status Board (Span 7 Grid Columns) */}
                <div className="lg:col-span-7 space-y-8">
                  <NetworkStatus />
                </div>
              </div>

              {/* Secure Transmission decrypts archive table below */}
              <div className="space-y-4">
                <div className="select-none">
                  <h3 className="font-sans font-bold text-lg text-white">Active Signal Feeds</h3>
                  <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-wider mt-0.5">
                    Chronological decryption feed. New signals are added immediately here.
                  </p>
                </div>

                <ContactArchive />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-zinc-900 bg-zinc-950 mt-12 py-8 xl:py-12 select-none font-sans text-xs">
        <div className="max-w-7xl mx-auto px-4 xl:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 select-text">
          
          <div className="md:col-span-4 space-y-4">
            <GinetLogo withText={true} size={30} />
            <p className="text-zinc-500 leading-relaxed font-sans max-w-xs text-[11.5px]">
              Next-generation neural infrastructure, edge IoT systems, and high performance software platforms engineered for industrial scale.
            </p>
            <div className="flex items-center gap-2 font-mono text-[9px] text-zinc-600 bg-zinc-900/60 p-1.5 rounded border border-zinc-850 inline-block">
              <Clock className="w-3.5 h-3.5 text-teal-400" />
              <span>STATION OPERATIONS: <span className="text-white">Active</span></span>
            </div>
          </div>

          <div className="md:col-span-2 space-y-3 font-mono">
            <h5 className="text-[10px] uppercase text-zinc-400 tracking-wider font-bold">Expertise</h5>
            <ul className="space-y-1.5 text-zinc-500 hover:text-zinc-300 transition-colors text-[11px]">
              <li><button onClick={() => handleNav('solutions')} className="hover:text-teal-400 transition-colors cursor-pointer text-left">Neural Hardware</button></li>
              <li><button onClick={() => handleNav('solutions')} className="hover:text-teal-400 transition-colors cursor-pointer text-left">Edge Devices</button></li>
              <li><button onClick={() => handleNav('portfolio')} className="hover:text-teal-400 transition-colors cursor-pointer text-left">IoT Mesh Systems</button></li>
              <li><button onClick={() => handleNav('solutions')} className="hover:text-teal-400 transition-colors cursor-pointer text-left">Industrial MLOps</button></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3 font-mono">
            <h5 className="text-[10px] uppercase text-zinc-400 tracking-wider font-bold">Company</h5>
            <ul className="space-y-1.5 text-zinc-500 hover:text-zinc-300 transition-colors text-[11px]">
              <li><button onClick={() => handleNav('ecosystem')} className="hover:text-teal-400 transition-colors cursor-pointer text-left">Ecosystem</button></li>
              <li><button onClick={() => handleNav('portfolio')} className="hover:text-teal-400 transition-colors cursor-pointer text-left">Innovation Labs</button></li>
              <li><button onClick={() => handleNav('contact')} className="hover:text-teal-400 transition-colors cursor-pointer text-left">Transmission Hub</button></li>
              <li><span className="text-zinc-650 line-through">Press & Media</span></li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3 font-mono">
            <h5 className="text-[10px] uppercase text-zinc-400 tracking-wider font-bold">European Headquarters</h5>
            <div className="text-zinc-500 space-y-1 text-[11px] leading-relaxed select-text">
              <p>Ginet AI Netherlands B.V.</p>
              <p>Ringlaan 15, 6961 ND Eerbeek</p>
              <p>Gelderland, Netherlands</p>
              <p className="text-teal-400 font-semibold mt-2">hello@ginet.ai</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 xl:px-8 border-t border-zinc-900/60 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-zinc-600 select-all">
          <span>&copy; {new Date().getFullYear()} Ginet AI. All rights reserved cryptographically.</span>
          <div className="flex gap-4">
            <span>DUTCH_COMPLIANCE_ID: NL4291-B08</span>
            <span>SECURE_SESSION: SHA-512_STREAM</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
