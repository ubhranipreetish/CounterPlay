export default function Loading() {
  return (
    <div role="status" aria-live="polite" aria-busy="true" className="flex min-h-[65dvh] flex-col items-center justify-center gap-5 bg-[#0e1117] text-[#aeb8c8]">
      <span aria-hidden="true" className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-[#46b485]" />
      <p className="font-mono text-sm">Opening your match…</p>
    </div>
  );
}
