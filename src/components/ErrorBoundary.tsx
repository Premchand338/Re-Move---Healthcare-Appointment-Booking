import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Kinetic Application Error Boundary caught:', error, errorInfo);
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#FAFAF8] p-6 text-center">
          <div className="max-w-md bg-white p-8 rounded-3xl border border-[#E5E1D8] real-shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#181816] border border-[#C59E5F] flex items-center justify-center font-editorial-serif font-bold text-xl text-[#DFBA73] mx-auto mb-4">
              K
            </div>
            <h2 className="font-editorial-serif text-2xl font-bold text-neutral-950 mb-2">
              Kinetic Clinical Engine
            </h2>
            <p className="text-sm text-neutral-600 font-editorial-sans mb-6">
              A session refresh is required to initialize 3D biomechanical motion nodes.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="bg-[#181816] hover:bg-[#2A2A26] text-[#F9F8F5] font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl border border-[#C59E5F] hover:border-[#DFBA73] cursor-pointer"
            >
              Reload Interface
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
