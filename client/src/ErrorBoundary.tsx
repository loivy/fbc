import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
  componentStack: string | null;
}

/**
 * Without this, an uncaught render error anywhere below unmounts the whole
 * tree to a blank screen with nothing in the UI explaining why, and nothing
 * short of a hard reload recovers it. This at least surfaces the error.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null, componentStack: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error("Uncaught render error:", error, info.componentStack);
    this.setState({ componentStack: info.componentStack });
  }

  render() {
    const { error, componentStack } = this.state;
    if (!error) return this.props.children;

    return (
      <div className="mx-auto max-w-lg px-5 py-24">
        <h1 className="text-2xl font-semibold text-paper-50">Something broke</h1>
        <p className="mt-4 leading-relaxed text-paper-400">{error.message}</p>
        <pre className="mt-4 max-h-64 overflow-auto rounded bg-ink-900 p-4 text-xs text-paper-500">
          {error.stack}
        </pre>
        {componentStack && (
          <>
            <p className="mt-4 text-sm font-medium text-paper-50">Component stack</p>
            <pre className="mt-2 max-h-64 overflow-auto rounded bg-ink-900 p-4 text-xs text-paper-500">
              {componentStack}
            </pre>
          </>
        )}
        <button
          type="button"
          className="mt-6 rounded-full bg-accent-500 px-5 py-2.5 text-sm font-medium text-ink-950"
          onClick={() => window.location.reload()}
        >
          Reload
        </button>
      </div>
    );
  }
}
