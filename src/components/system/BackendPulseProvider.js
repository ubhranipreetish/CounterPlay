"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { API_BASE } from "@/lib/api";

const BackendPulseContext = createContext({
  status: "waking",
  lastReadyAt: null,
  checkNow: () => {},
});

// Mounted in the root layout, so keep-alive continues across every route.
const HEARTBEAT_MS = 25_000;
// A sleeping host can take about a minute to return even its health endpoint.
const HEALTH_TIMEOUT_MS = 75_000;

export default function BackendPulseProvider({ children }) {
  const [status, setStatus] = useState(API_BASE ? "waking" : "offline");
  const [lastReadyAt, setLastReadyAt] = useState(null);
  const inFlight = useRef(false);
  const firstCheck = useRef(true);

  const checkNow = useCallback(async () => {
    if (!API_BASE || inFlight.current || (typeof navigator !== "undefined" && !navigator.onLine)) {
      if (!API_BASE || (typeof navigator !== "undefined" && !navigator.onLine)) setStatus("offline");
      return;
    }

    inFlight.current = true;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), HEALTH_TIMEOUT_MS);

    try {
      const response = await fetch(`${API_BASE}/api/health?heartbeat=${Date.now()}`, {
        cache: "no-store",
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`Health check failed: ${response.status}`);
      const data = await response.json();
      const ready = data.status === "ok";
      setStatus(ready ? "ready" : data.status === "error" ? "offline" : "waking");
      if (ready) setLastReadyAt(Date.now());
    } catch {
      setStatus(firstCheck.current ? "waking" : "offline");
    } finally {
      firstCheck.current = false;
      inFlight.current = false;
      clearTimeout(timeout);
    }
  }, []);

  useEffect(() => {
    checkNow();
    const interval = window.setInterval(checkNow, HEARTBEAT_MS);
    const onVisible = () => {
      if (document.visibilityState === "visible") checkNow();
    };
    window.addEventListener("focus", checkNow);
    window.addEventListener("online", checkNow);
    window.addEventListener("pageshow", checkNow);
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("focus", checkNow);
      window.removeEventListener("online", checkNow);
      window.removeEventListener("pageshow", checkNow);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [checkNow]);

  return (
    <BackendPulseContext.Provider value={{ status, lastReadyAt, checkNow }}>
      {children}
    </BackendPulseContext.Provider>
  );
}

export function useBackendPulse() {
  return useContext(BackendPulseContext);
}
