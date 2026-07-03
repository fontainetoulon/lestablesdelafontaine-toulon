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
        // Stagger : les éléments qui entrent ensemble apparaissent en cascade.
        const visible = entries.filter((entry) => entry.isIntersecting);
        visible.forEach((entry, i) => {
          observer.unobserve(entry.target);
          window.setTimeout(() => {
            entry.target.classList.add("is-visible");
          }, i * 90);
        });
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
