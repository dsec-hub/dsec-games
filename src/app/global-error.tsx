"use client";

// Catches failures in the root layout itself, so it must render its own <html>
// and <body> and stay dependency-free: the failure it handles may be caused by
// one of our own imports, and global-error does not receive globals.css. Brand
// colours are inlined so it still reads as DSEC.
export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="en-AU">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          background: "#0a0a0a",
          color: "#f5efe2",
          fontFamily: "system-ui, sans-serif",
          padding: "3rem",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", margin: 0 }}>The arcade hit a wall</h1>
        <p style={{ margin: 0, opacity: 0.75 }}>
          Something broke badly enough that we could not render the page.
        </p>
        {error.digest && (
          <p style={{ margin: 0, fontSize: "0.75rem", opacity: 0.5 }}>Ref: {error.digest}</p>
        )}
        <button
          type="button"
          onClick={() => retry()}
          style={{
            marginTop: "0.5rem",
            padding: "0.6rem 1.2rem",
            border: "3px solid #f5efe2",
            background: "#e91e63",
            color: "#fff",
            fontFamily: "system-ui, sans-serif",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
