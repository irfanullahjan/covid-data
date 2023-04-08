"use client"; // Error components must be Client components

import { BaseError } from "~/common/components/BaseError";

export default function Error(props: { error: Error; reset: () => void }) {
  return (
    <BaseError {...props}>
      <p>[/app/error.tsx]</p>
    </BaseError>
  );
}
