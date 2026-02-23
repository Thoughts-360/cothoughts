"use client";

import Lottie from "lottie-react";
import loader from "@/assets/json-animations/thoughts-loader.json";

interface LoadingProps {
      /** Override the size of the animation (default: 150) */
      size?: number;

      /** Override the accessible label (default: "Loading, please wait") */
      label?: string;
}

/*
      • Full-page loading screen.
      Used as Next.js route-level loading UI (app/loading.tsx) and can also be composed directly anywhere a blocking loader is needed.
*/

function Loading({ size = 150, label = "Loading, please wait", }: LoadingProps) {
      return (
            <div
                  role="status"
                  aria-label={label}
                  aria-live="polite"
                  className="flex min-h-screen items-center justify-center bg-background"
            >
                  <Lottie
                        animationData={loader}
                        loop
                        autoplay
                        style={{ width: size, height: size }}
                        aria-hidden="true"

                        rendererSettings={{
                              preserveAspectRatio: "xMidYMid slice",
                              progressiveLoad: true,
                        }}
                  />

                  <span className="sr-only">{label}</span>
            </div>
      );
}

export default Loading;