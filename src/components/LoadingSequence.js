"use client";
import { useEffect, useRef, useState } from "react";

export default function LoadingSequence({ ready = false, isArena = false }) {
    const [progress, setProgress] = useState(0);
    const dialog = useRef(null);

    useEffect(() => {
        const modal = dialog.current;
        modal.showModal();
        const interval = setInterval(() => {
            setProgress(previous => Math.min(90, previous + (previous < 60 ? 3 : 1)));
        }, 180);
        return () => { clearInterval(interval); modal.close(); };
    }, []);

    const displayed = ready ? 100 : progress;
    const message = ready ? "Ready. Opening your match…"
        : progress >= 90 ? "Still processing your match. Please keep this page open…"
        : isArena ? "Preparing your teams and simulating the match…"
        : "Calculating your alternate timeline…";

    return (
        <dialog ref={dialog} onCancel={event => event.preventDefault()} aria-labelledby="simulation-loading-title"
            className="fixed inset-0 z-[100] m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-[#0e1117]/95 p-6 text-white backdrop:bg-black/70 backdrop-blur-xl">
            <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="relative mb-8 flex h-24 w-24 items-center justify-center">
                    <div aria-hidden="true" className="absolute inset-0 animate-spin rounded-full border-t-2 border-[#46b485]" />
                    <span className="font-mono text-sm">{displayed}%</span>
                </div>
                <h2 id="simulation-loading-title" className="text-2xl font-black uppercase tracking-widest">
                    {isArena ? "Preparing your match" : "Rewriting reality"}
                </h2>
                <p role="status" aria-live="polite" className="mt-4 max-w-md text-sm text-[#aeb8c8]">{message}</p>
                <div role="progressbar" aria-label="Estimated simulation progress" aria-valuemin={0} aria-valuemax={100}
                    aria-valuenow={displayed} aria-valuetext={ready ? "Complete" : `${displayed} percent estimated; waiting for engine`}
                    className="mt-8 h-1 w-full max-w-md overflow-hidden rounded-full bg-white/10">
                    <div className="h-full bg-[#46b485] transition-all duration-150" style={{ width: `${displayed}%` }} />
                </div>
                {!ready && <p className="mt-4 text-xs text-[#7c8696]">Progress is estimated. You don’t need to click again.</p>}
            </div>
        </dialog>
    );
}
