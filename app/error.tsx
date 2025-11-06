"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { logger } from "@/lib/logger";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error using centralized logger
    logger.error("Application error", error, {
      component: "error-boundary",
      metadata: { digest: error.digest },
    });
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="max-w-md w-full p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Something went wrong!
          </h2>
          <p className="text-gray-600 mb-6">
            We apologize for the inconvenience. An error occurred while processing your request.
          </p>
          {process.env.NODE_ENV === "development" && (
            <details className="mb-6 text-left">
              <summary className="cursor-pointer text-sm text-gray-500 mb-2">
                Error details (development only)
              </summary>
              <pre className="text-xs bg-gray-100 p-4 rounded overflow-auto max-h-48">
                {error.message}
                {error.stack}
              </pre>
            </details>
          )}
          <div className="flex gap-4 justify-center">
            <Button onClick={() => reset()}>
              Try again
            </Button>
            <Button variant="outline" onClick={() => (window.location.href = "/")}>
              Go home
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
