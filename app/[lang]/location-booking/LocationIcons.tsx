"use client";

import { Airplane, Train, Taxi, Car, MapPin, Phone, EnvelopeSimple, ChatCircleText } from "@phosphor-icons/react";

export function PlaneIcon({ size = 22, weight = "light" }: { size?: number; weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone" }) {
  return <Airplane size={size} weight={weight} />;
}
export function TrainIcon({ size = 22, weight = "light" }: { size?: number; weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone" }) {
  return <Train size={size} weight={weight} />;
}
export function TaxiIcon({ size = 22, weight = "light" }: { size?: number; weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone" }) {
  return <Taxi size={size} weight={weight} />;
}
export function CarIcon({ size = 22, weight = "light" }: { size?: number; weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone" }) {
  return <Car size={size} weight={weight} />;
}
export function PinIcon({ size = 20, weight = "fill" }: { size?: number; weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone" }) {
  return <MapPin size={size} weight={weight} />;
}
export function PhoneIcon({ size = 22, weight = "fill" }: { size?: number; weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone" }) {
  return <Phone size={size} weight={weight} />;
}
export function MailIcon({ size = 22, weight = "fill" }: { size?: number; weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone" }) {
  return <EnvelopeSimple size={size} weight={weight} />;
}
export function WechatIcon({ size = 22, weight = "fill" }: { size?: number; weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone" }) {
  return <ChatCircleText size={size} weight={weight} />;
}
