import React, { useEffect, useState } from 'react';
import { Transmission } from '../types';
import { Shield, Lock, Terminal, RefreshCw, EyeOff, KeyRound } from 'lucide-react';

const INITIAL_ARCHIVE: Transmission[] = [
  {
    id: 'TX-8802',
    name: 'Director of Operations',
    email: 'ops@aerospace-systems.de',
    scope: 'edge-iot',
    message: 'Requesting immediate technical consultation on integrating sub-10ms vibration sensors into our rotor turbine arrays. Need Eerbeek team to review FPGA designs.',
    timestamp: '2026-06-18 07:34 UTC',
    status: 'DECRYPTED',
    routingNode: 'NL-NODE-ROTTERDAM-AM5'
  },
  {
    id: 'TX-8511',
    name: 'Dr. Evelyn Brand',
    email: 'brand@cyber-core.nl',
    scope: 'generative-ai',
    message: 'Successful deployment of local quantized transformer models at the manufacturing plant. Latencies stabilized at 11.2ms. Decrypted handshakes verify weight integrity.',
    timestamp: '2026-06-17 14:12 UTC',
    status: 'COMPLETED',
    routingNode: 'EERBEEK-NODE-5'
  }
];

export default function ContactArchive() {
  const [transmissions, setTransmissions] = useState<Transmission[]>([]);
  const [radarSweep, setRadarSweep] = useState(true);
  const [clearance, setClearance] = useState<'LEVEL_1' | 'LEVEL_3' | 'SECURE_ROOT'>('LEVEL_3');

  useEffect(() => {
    // Load both mock base records and any messages stored in localStorage
    const loadLogs = () => {
      const stored = localStorage.getItem('ginet_transmissions');
      let parsedStored: Transmission[] = [];
      if (stored) {
        try { parsedStored = JSON.parse(stored); } catch (e) { console.error(e); }
      }
      
      const combined = [...parsedStored, ...INITIAL_ARCHIVE];
      setTransmissions(combined);
    };

    loadLogs();

    // Listen to storage events to immediately display newer messages if filled in another panel
    window.addEventListener('storage', loadLogs);
    // Custom event dispatch for local immediate updates
    window.addEventListener('new_transmission_added', loadLogs);

    return () => {
      window.removeEventListener('storage', loadLogs);
      window.removeEventListener('new_transmission_added', loadLogs);
    };
  }, []);

  const getScopeBadgeColor = (scope: string) => {
    switch (scope) {
      case 'generative-ai': return 'text-cyan-400 border-cyan-900/40 bg-cyan-950/20';
      case 'edge-iot': return 'text-teal-400 border-teal-900/40 bg-teal-950/20';
      case 'high-performance': return 'text-emerald-400 border-emerald-900/40 bg-emerald-950/20';
      default: return 'text-zinc-400 border-zinc-900 bg-zinc-950/20';
    }
  };

  const clearLocalDatabase = () => {
    localStorage.removeItem('ginet_transmissions');
    setTransmissions(INITIAL_ARCHIVE);
    window.dispatchEvent(new Event('new_transmission_added'));
  };

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-5 shadow-2xl relative select-text">
      {/* Visual cyber decorations */}
      <div className="absolute top-0 left-8 w-16 h-[1.1px] bg-emerald-500/30 animate-pulse" />
      
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-900 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Shield className="w-4.5 h-4.5 text-emerald-400 animate-pulse" />
          <h3 className="font-sans font-medium text-xs tracking-wider uppercase text-zinc-300">
            Secure Transmission Archive
          </h3>
          <span className="font-mono text-[8px] bg-emerald-950 text-emerald-400 border border-emerald-900 px-2 py-0.5 rounded ml-2">
            Z-TRUST SYNC
          </span>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-mono">
          <span className="text-zinc-600">SECURITY CLASSIFICATION:</span>
          <select
            value={clearance}
            onChange={(e) => setClearance(e.target.value as any)}
            className="bg-zinc-900 text-zinc-300 border border-zinc-800 px-2 py-1 rounded text-[9.5px] font-mono cursor-pointer"
          >
            <option value="LEVEL_1">PUBLIC LOGS (LVL_1)</option>
            <option value="LEVEL_3">TECH CORRESPONDENCE (LVL_3)</option>
            <option value="SECURE_ROOT">ROOT_DECRYPTED (SUPERIOR)</option>
          </select>
        </div>
      </div>

      <p className="text-zinc-500 font-sans text-xs leading-relaxed mb-4">
        Cryptographic signal logs synchronized with peer relays. Decrypted content is verified through industrial handshakes and stored local-cache standard protocols.
      </p>

      {/* Grid of transmissions */}
      <div className="space-y-4 max-h-80 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-800">
        {transmissions.length === 0 ? (
          <div className="text-center py-8 text-zinc-500 border border-zinc-900 border-dashed rounded font-mono text-xs">
            [Awaiting incoming transmission sequences]
          </div>
        ) : (
          transmissions.map((t) => {
            const isMaskedMessage = clearance === 'LEVEL_1';
            
            return (
              <div 
                key={t.id} 
                className="group border border-zinc-900 bg-zinc-900/10 rounded-lg p-3.5 hover:border-zinc-800 relative transition-all"
              >
                {/* Header info */}
                <div className="flex justify-between items-start gap-4 mb-2 flex-wrap">
                  <div>
                    <span className="font-mono text-[9px] text-emerald-400 font-bold bg-emerald-950/30 border border-emerald-900/30 px-1.5 py-0.5 rounded mr-2">
                      {t.status}
                    </span>
                    <span className="font-sans font-medium text-xs text-zinc-200">
                      {t.name}
                    </span>
                    <span className="text-zinc-500 font-mono text-[10px] ml-2">
                      &lt;{t.email}&gt;
                    </span>
                  </div>

                  <span className="font-mono text-[8.5px] text-zinc-600 uppercase">
                    {t.timestamp}
                  </span>
                </div>

                {/* Badges details info */}
                <div className="flex flex-wrap items-center gap-2 mb-2.5">
                  <span className={`font-mono text-[8.5px] border px-2 py-0.5 rounded capitalize ${getScopeBadgeColor(t.scope)}`}>
                    Domain: {t.scope.replace('-', ' ')}
                  </span>
                  <span className="font-mono text-[8.5px] text-zinc-500 bg-zinc-900 p-1 px-2 rounded-sm border border-zinc-850/40">
                    Relay Node: {t.routingNode}
                  </span>
                </div>

                {/* Cryptographic encrypted representation or Decrypted Message */}
                <div className="mt-2.5 text-zinc-400 text-[11px] leading-relaxed font-mono relative">
                  {isMaskedMessage ? (
                    <div className="flex items-center gap-1 text-zinc-600 bg-zinc-950 p-2 rounded">
                      <EyeOff className="w-4 h-4 text-zinc-700" />
                      <span>[RESTRICTED CLASSIFICATION - RAISE CLEARANCE LEVEL TO DECRYPT MESSAGE BODY]</span>
                    </div>
                  ) : (
                    <div className="text-zinc-300 font-sans border-l border-zinc-850 pl-2.5 py-0.5 max-w-2xl text-[11px] select-text">
                      {t.message}
                    </div>
                  )}
                </div>

                <div className="absolute right-3 bottom-3 text-zinc-650 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-[8px] font-mono">
                  CIPHER: SHA-256 SECURED
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Database control section */}
      <div className="mt-4 pt-3 border-t border-zinc-900 flex justify-between items-center text-[10px] font-mono text-zinc-500">
        <span>TRANSMISSIONS_SECURED: <span className="text-emerald-400 font-semibold">{transmissions.length} LOCATIONS</span></span>
        <button 
          onClick={clearLocalDatabase}
          className="text-zinc-600 hover:text-amber-500 transition-colors cursor-pointer"
        >
          RESET SECURE_CACHE Database
        </button>
      </div>
    </div>
  );
}
