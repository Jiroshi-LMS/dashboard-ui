"use client";

import { useEffect, useState, useRef } from "react";
import { Turtle } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const HEALTH_URL = `${API_BASE_URL}/instructor/me/`;
const POLL_INTERVAL_MS = 4000;
const SESSION_KEY = "jiroshi_server_alive";

export default function ServerStatusProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [serverAlive, setServerAlive] = useState<boolean>(() => {
    if (typeof globalThis.window !== "undefined") {
      return sessionStorage.getItem(SESSION_KEY) === "true";
    }
    return false;
  });
  const [elapsed, setElapsed] = useState(0);
  const [dots, setDots] = useState(".");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const elapsedRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dotsRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [visible, setVisible] = useState(!serverAlive);

  const checkServer = async () => {
    try {
      const res = await fetch(HEALTH_URL, {
        method: "GET",
        signal: AbortSignal.timeout(8000),
      });
      // Any response (even 401/403) means the server is up
      if (res.status < 500) {
        sessionStorage.setItem(SESSION_KEY, "true");
        setServerAlive(true);
        setVisible(false);
      }
    } catch {
      // Server still cold — keep polling
    }
  };

  useEffect(() => {
    if (serverAlive) return;

    checkServer();
    intervalRef.current = setInterval(checkServer, POLL_INTERVAL_MS);

    elapsedRef.current = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);

    dotsRef.current = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."));
    }, 500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (elapsedRef.current) clearInterval(elapsedRef.current);
      if (dotsRef.current) clearInterval(dotsRef.current);
    };
  }, [serverAlive]);

  // Stop all polling once alive
  useEffect(() => {
    if (serverAlive) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (elapsedRef.current) clearInterval(elapsedRef.current);
      if (dotsRef.current) clearInterval(dotsRef.current);
    }
  }, [serverAlive]);

  const formatElapsed = (s: number) => {
    if (s < 60) return `${s}s`;
    return `${Math.floor(s / 60)}m ${s % 60}s`;
  };

  return (
    <>
      {visible && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background text-foreground px-6"
          style={{ backdropFilter: "blur(2px)" }}
        >
          {/* Background glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-teal-500/5 blur-[120px]" />
          </div>

          <div className="relative z-10 flex flex-col items-center max-w-sm w-full text-center gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
                <Turtle size={20} />
              </div>
              <span className="text-xl font-black tracking-tight">Jiroshi</span>
            </div>

            {/* Animated spinner ring */}
            <div className="relative w-20 h-20">
              <svg className="animate-spin w-full h-full" viewBox="0 0 80 80" fill="none">
                <circle
                  cx="40" cy="40" r="34"
                  stroke="currentColor"
                  strokeOpacity="0.08"
                  strokeWidth="6"
                />
                <circle
                  cx="40" cy="40" r="34"
                  stroke="#00bba7"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray="60 160"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-teal-500 shadow-[0_0_10px_#00bba7]" />
              </div>
            </div>

            {/* Title */}
            <div>
              <h2 className="text-xl font-bold tracking-tight mb-1">
                Waking up the server{dots}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The API server is on Render&apos;s free tier and needs a{" "}
                <span className="text-teal-500 font-semibold">cold start</span>. This
                typically takes <span className="font-semibold text-foreground">30–60 seconds</span>.
              </p>
            </div>

            {/* Elapsed time */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border text-sm font-mono text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
              Waiting{" "}
              <span className="text-foreground font-bold">{formatElapsed(elapsed)}</span>
            </div>

            {/* Info strip */}
            <div className="w-full rounded-xl bg-teal-500/5 border border-teal-500/15 px-4 py-3 flex items-start gap-3 text-left">
              <span className="mt-0.5 text-teal-500 shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
                </svg>
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Free-tier instances spin down after inactivity. Once the server wakes up,
                you won&apos;t see this screen again for this session.
              </p>
            </div>
          </div>
        </div>
      )}
      {children}
    </>
  );
}
