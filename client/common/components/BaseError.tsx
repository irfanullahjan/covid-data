"use client"; // Error components must be Client components

import { useEffect } from "react";

export function BaseError({
  error,
  reset,
  children,
}: {
  error: Error;
  reset: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div style={{ backgroundColor: "light-red" }}>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
      {children}
    </div>
  );
}
