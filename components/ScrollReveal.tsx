"use client";

import { useEffect } from "react";

// Révélation au scroll : ajoute .is-visible aux éléments .reveal.
// L'anti-clignotement (classe reveal-on posée avant le 1er paint) vit dans
// app/layout.tsx — voir SITEFORGE-GEN-DIRECTIVES §8.
export function ScrollReveal() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      document.documentElement.classList.add("reveal-go");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    const observeAll = () => {
      document
        .querySelectorAll(".reveal:not(.is-visible)")
        .forEach((el) => observer.observe(el));
    };
    observeAll();

    // Les éditions live Tina peuvent monter de nouvelles sections.
    const mutations = new MutationObserver(observeAll);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
}
