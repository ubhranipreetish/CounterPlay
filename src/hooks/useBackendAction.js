"use client";
import { useCallback, useRef, useState } from "react";

// The ref closes the gap before React renders a disabled button.
export default function useBackendAction() {
  const locked = useRef(false);
  const [pending, setPending] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const lastAction = useRef(null);
  const run = useCallback(async (action) => {
    if (locked.current) return;
    locked.current = true;
    lastAction.current = action;
    setError("");
    setReady(false);
    setPending(true);
    try {
      await action();
      setReady(true);
      // Show completion only once the response has been validated and applied.
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (err) {
      setError(err.name === "AbortError"
        ? "The engine took too long to respond. Please try again."
        : err.message || "The engine could not be reached. Please try again.");
    } finally {
      setPending(false);
      locked.current = false;
    }
  }, []);
  const retry = useCallback(() => {
    if (lastAction.current) return run(lastAction.current);
  }, [run]);
  return { pending, ready, error, run, retry, dismiss: () => setError("") };
}
