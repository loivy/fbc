import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { ErrorBoundary } from "./ErrorBoundary";
import "./styles.css";

// Chrome's default stack trace limit (10 frames) was cutting off the
// application-level frame that actually caused a crash, leaving only
// react-dom's own internals visible in the ErrorBoundary's captured stack.
if ("stackTraceLimit" in Error) {
  (Error as unknown as { stackTraceLimit: number }).stackTraceLimit = 50;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* useTransitions defaults to true, which wraps every navigation in
        React.startTransition and commits it through the concurrent scheduler.
        That path was crashing in production ("X is not a function" deep in
        react-dom's scheduler internals) on every route change; forcing
        synchronous updates avoids it. */}
    <BrowserRouter useTransitions={false}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
);
