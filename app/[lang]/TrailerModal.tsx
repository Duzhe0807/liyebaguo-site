"use client";

import { useEffect, useRef } from "react";
import { X } from "@phosphor-icons/react";

export function TrailerModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => {
      videoRef.current?.pause();
      onClose();
    };
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  return (
    <dialog className="trailer-modal" ref={dialogRef} aria-label="Show trailer">
      <button className="icon-button modal-close" type="button" aria-label="Close trailer" onClick={onClose}>
        <X weight="bold" />
      </button>
      <video
        ref={videoRef}
        src="/videos/hero-banquet.mp4"
        controls
        playsInline
        poster="/hero-banquet-cropped.jpg"
      ></video>
    </dialog>
  );
}
