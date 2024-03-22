"use client";
import { useFormStatus } from "react-dom";

export default function Button() {
  const { pending } = useFormStatus();
  return (
    <button
      aria-disabled={pending}
      className="p-2 mb-3 rounded-md duration-300 active:scale-95 hover:bg-yellow-300 w-full bg-yellow-400 shadow"
    >
      Continue
    </button>
  );
}
