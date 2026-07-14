"use client";

import { useEffect } from "react";

export function InteractiveScripts() {
  useEffect(() => {
    // Scroll-based header elevation
    const header = document.querySelector<HTMLElement>(".site-header");
    if (header) {
      const elevateHeader = () => {
        header.dataset.elevated = String(window.scrollY > 28);
      };
      window.addEventListener("scroll", elevateHeader, { passive: true });
      elevateHeader();
    }

    // Mobile menu toggle (HomePage uses .menu-button)
    const menuBtn = document.querySelector<HTMLButtonElement>(".menu-button");
    if (menuBtn) {
      menuBtn.addEventListener("click", () => {
        const nav = document.querySelector<HTMLElement>(".nav");
        if (nav) {
          nav.classList.toggle("open");
          menuBtn.setAttribute("aria-expanded", nav.classList.contains("open") ? "true" : "false");
        }
      });
    }

    // Gallery tab switching (handled by HomePage's useState, keep section reveal)
    // Section reveal animation
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".section-reveal").forEach((section) => {
      revealObserver.observe(section);
    });

    return () => {
      revealObserver.disconnect();
    };
  }, []);

  return null;
}
