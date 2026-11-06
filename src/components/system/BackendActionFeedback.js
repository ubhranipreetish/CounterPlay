"use client";
import LoadingSequence from "@/components/LoadingSequence";

export default function BackendActionFeedback({ action, isArena = false }) {
  if (action.pending) return <LoadingSequence ready={action.ready} isArena={isArena} />;
  if (!action.error) return null;
  return (
    <div role="alert" className="fixed bottom-6 left-4 right-4 z-[110] mx-auto max-w-lg rounded-xl border border-[#c2475c]/50 bg-[#171018] p-5 text-sm text-white shadow-2xl">
      <p>{action.error}</p>
      <div className="mt-4 flex gap-4">
        <button onClick={action.retry} className="rounded-lg bg-[#46b485] px-4 py-2 font-bold text-black">Try again</button>
        <button onClick={action.dismiss} className="px-4 py-2 text-[#cdd3dd]">Dismiss</button>
      </div>
    </div>
  );
}
