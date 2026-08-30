"use client";

import { useEffect } from "react";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    // Once OPS-01 lands, report to Sentry here instead.
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-16 text-center">
      <p className="eyebrow">Game over</p>
      <h1 className="text-3d-pink mt-2 font-display text-2xl sm:text-3xl">SOMETHING BROKE</h1>
      <p className="mt-4 text-paper/70">
        That one is on us, not you. Give it another go, and if it keeps happening let the committee know.
      </p>
      {error.digest && <p className="mt-3 font-mono text-xs text-paper/50">Ref: {error.digest}</p>}
      <button type="button" onClick={() => retry()} className="btn-mint mt-6 px-4 py-2 text-sm">
        Try again
      </button>
    </div>
  );
}
