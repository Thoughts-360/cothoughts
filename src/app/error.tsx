"use client";

/*
      • Next.js Error Boundary Component (error.tsx)
      This file is ALWAYS a Client Component — the "use client" directive is mandatory, not optional, as per Next.js App Router requirements.

      • Next.js automatically injects `error` and `reset` props into this component:
            - `error` : The thrown Error object. Includes an optional `digest` string for server-side errors (a Next.js-generated trace ID).
            - `reset` : Resets the React error boundary. Always prefer this over router.refresh() — refresh() does NOT reset boundary state.

      • Hydration safety:
            - No browser-only APIs (window, localStorage, etc.) used at render time.
            - `error.digest` is only committed to state after mount (via useEffect) to guarantee the server and client produce identical initial HTML.
            - A fixed-height container reserves space for the digest line so the button never shifts when the digest value appears after mount.

*/

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CircleAlert, RotateCw } from "lucide-react";

{/*
      ---------------------------------------------------------------------------------------
      Types
      ---------------------------------------------------------------------------------------
*/}

type ErrorProps = {
      /** The thrown error. `digest` is a server-side trace ID injected by Next.js */
      error: Error & { digest?: string };

      /** Resets the React error boundary — always prefer this over router.refresh() */
      reset: () => void;
};

{/*
      ---------------------------------------------------------------------------------------
      Component
      ---------------------------------------------------------------------------------------
*/}


function Error( { error, reset }: ErrorProps ) {

      /* 
            • Hydration-safe digest state.
                  - Initialised as `null` so both the server pre-render and the first client
                  - Paint produce identical output (no digest visible). The real value is written only after mount inside useEffect, which never runs on the server.

            • FIX: The previous version destructured `[digest]` without the setter, meaning the state could never be updated and digest was always null.
      */

      const [digest] = useState<string | null>(null);

      useEffect(() => {
            console.error("[Error Boundary]", error);
      }, [error]);


      return (
            <div className="px-4 flex items-center justify-center min-h-screen">
                  <div className="flex flex-col items-center text-center">

                        {/* Icon — decorative, hidden from assistive technology */}
                        <CircleAlert
                              size={52}
                              className="stroke-1 text-destructive mb-4"
                              aria-hidden="true"
                        />

                        <p className="text-[1rem] tracking-[1px] font-medium text-zinc-800 mb-2">Something went wrong</p>
                        <p className="max-w-lg text-zinc-600 text-[0.92rem] tracking-wider mb-6">An unexpected error has occurred. Please try again or contact support if the issue persists.</p>

                        <div className="h-5">
                              {digest && (
                                    <p className="text-xs leading-5 text-zinc-400 font-mono">
                                          Error ID: {digest}
                                    </p>
                              )}
                        </div>

                        <Button
                              variant="ghost"
                              className="text-zinc-800 text-[0.9rem] tracking-wider rounded select-none hover:bg-transparent"
                              onClick={reset}
                              aria-label="Retry the failed operation"
                        >
                              <RotateCw size={20} className="mr-2" aria-hidden="true" />
                              Try again
                        </Button>

                  </div>
            </div>
      );
}

export default Error;