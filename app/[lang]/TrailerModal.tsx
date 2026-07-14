"use client";

export function TrailerModal() {
  return (
    <dialog className="trailer-modal" aria-label="Show trailer">
      <button className="icon-button modal-close" type="button" aria-label="Close trailer">
        <i className="ri-close-line"></i>
      </button>
      <video
        src="/assets/hero-banquet-cropped.mp4"
        controls
        playsInline
        poster="/assets/hero-banquet-cropped.jpg"
      ></video>
    </dialog>
  );
}
