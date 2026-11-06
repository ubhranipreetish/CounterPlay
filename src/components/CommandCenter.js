"use client";

export default function CommandCenter({
    match,
    selectedBatter, setSelectedBatter,
    selectedBowler, setSelectedBowler,
    customEvent, setCustomEvent
}) {
    return (
        <div className="glass rounded-3xl p-8 border border-white/10 shadow-2xl mt-8">
            <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
                <div>
                    <p className="text-[#5b79ef] text-[10px] font-mono font-bold tracking-[0.2em] mb-2 uppercase">Step 03</p>
                    <h2 className="text-2xl font-black text-white tracking-tight drop-shadow-md">
                        Command Center
                    </h2>
                </div>
                <div className="text-right">
                    <span className="text-[10px] text-[#7c8696] font-mono tracking-widest uppercase block mb-1">INTERVENTION</span>
                    <div className="text-[#5b79ef] font-mono text-[10px] font-bold bg-[#5b79ef]/10 px-3 py-1 rounded inline-block border border-[#5b79ef]/30">
                        AWAITING TACTICS
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Tactical Swap: Batter */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-lg">🏏</span>
                        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#46b485]">Send Next Batter</h3>
                    </div>
                    <div className="space-y-2">
                        {match.batters.map((b) => (
                            <button
                                key={b.id}
                                onClick={() => setSelectedBatter(b.id)}
                                className={`w-full text-left p-4 rounded-xl transition-all duration-300 cursor-pointer flex justify-between items-center ${selectedBatter === b.id
                                        ? "bg-[#46b485] text-[#0e1117] shadow-[0_0_20px_rgba(70,180,133,0.2)]"
                                        : "glass-light hover:bg-white/5 border border-white/5"
                                    }`}
                            >
                                <div>
                                    <span className={`text-sm font-bold ${selectedBatter === b.id ? 'text-[#0e1117]' : 'text-white'}`}>{b.name}</span>
                                    <span className={`block text-[10px] mt-1 ${selectedBatter === b.id ? 'text-[#0e1117]/70' : 'text-[#7c8696]'}`}>
                                        {b.role} • {b.style}
                                    </span>
                                </div>
                                <div className={`text-[10px] font-mono text-right ${selectedBatter === b.id ? 'text-[#0e1117]/80' : 'text-[#9aa3b2]'}`}>
                                    SR {b.avgSR} <br /> AVG {b.avg}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tactical Swap: Bowler */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-lg">🎯</span>
                        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#e8a33d]">Change Bowler TO</h3>
                    </div>
                    <div className="space-y-2">
                        {match.bowlers.map((b) => (
                            <button
                                key={b.id}
                                onClick={() => setSelectedBowler(b.id)}
                                className={`w-full text-left p-4 rounded-xl transition-all duration-300 cursor-pointer flex justify-between items-center ${selectedBowler === b.id
                                        ? "bg-[#e8a33d] text-[#0e1117] shadow-[0_0_20px_rgba(232,163,61,0.2)]"
                                        : "glass-light hover:bg-white/5 border border-white/5"
                                    }`}
                            >
                                <div>
                                    <span className={`text-sm font-bold ${selectedBowler === b.id ? 'text-[#0e1117]' : 'text-white'}`}>{b.name}</span>
                                    <span className={`block text-[10px] mt-1 ${selectedBowler === b.id ? 'text-[#0e1117]/70' : 'text-[#7c8696]'}`}>
                                        {b.role}
                                    </span>
                                </div>
                                <div className={`text-[10px] font-mono text-right ${selectedBowler === b.id ? 'text-[#0e1117]/80' : 'text-[#9aa3b2]'}`}>
                                    ECON {b.economy} <br /> WKTS {b.wicketsPerMatch}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Micro-Event Override */}
            <div className="pt-6 border-t border-white/10">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#ffd700] mb-4 flex items-center gap-2">
                    <span className="text-lg">⚡</span> Micro-Event Override
                </h3>

                <div className="flex flex-wrap gap-4">
                    <button
                        onClick={() => setCustomEvent(customEvent === '6' ? null : '6')}
                        className={`px-5 py-3 rounded-xl border text-sm font-bold transition-all ${customEvent === '6' ? 'bg-[#ffd700] text-[#0e1117] border-[#ffd700] shadow-[0_0_15px_rgba(255,215,0,0.3)]' : 'glass-light border-white/10 text-white hover:border-[#ffd700]/50'
                            }`}
                    >
                        Force SIX on next ball
                    </button>

                    <button
                        onClick={() => setCustomEvent(customEvent === 'wicket' ? null : 'wicket')}
                        className={`px-5 py-3 rounded-xl border text-sm font-bold transition-all ${customEvent === 'wicket' ? 'bg-[#c2475c] text-white border-[#c2475c] shadow-[0_0_15px_rgba(194,71,92,0.3)]' : 'glass-light border-white/10 text-white hover:border-[#c2475c]/50'
                            }`}
                    >
                        Force WICKET on next ball
                    </button>
                </div>
            </div>

        </div>
    );
}
