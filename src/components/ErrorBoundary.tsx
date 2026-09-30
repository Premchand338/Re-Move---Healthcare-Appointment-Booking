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
        <div className="min-h-screen flex items-center justify-center bg-[#F7F4EE] p-6 text-center">
          <div className="max-w-md bg-white p-8 rounded-3xl border border-[#E3DED3] real-shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#1F4E45] border border-[#1F4E45] flex items-center justify-center font-editorial-serif font-bold text-xl text-white mx-auto mb-4">
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
              className="ui-btn ui-btn-primary"
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
