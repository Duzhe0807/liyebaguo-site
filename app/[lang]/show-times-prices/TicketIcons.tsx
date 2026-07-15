"use client";

import { Check, X, Star } from "@phosphor-icons/react";

export function CheckIcon({ weight = "bold" }: { weight?: "bold" | "fill" | "light" | "thin" | "regular" | "duotone" }) {
  return <Check weight={weight} />;
}

export function XIcon({ weight = "bold" }: { weight?: "bold" | "fill" | "light" | "thin" | "regular" | "duotone" }) {
  return <X weight={weight} />;
}

export function StarIcon({ weight = "fill" }: { weight?: "bold" | "fill" | "light" | "thin" | "regular" | "duotone" }) {
  return <Star weight={weight} />;
}
