"use client";

import { useEffect, useRef, useState } from "react";

export function FolioInteractions() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const revealItems = document.querySelectorAll(".reveal, .char-reveal");
    if (reduceMotion) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const hero = document.querySelector(".hero");
    if (!hero || window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (event) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      hero.style.setProperty("--mx", x.toFixed(3));
      hero.style.setProperty("--my", y.toFixed(3));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return null;
}

export function GenreStrip({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let down = false;
    let startX = 0;
    let scrollLeft = 0;

    const onPointerDown = (event) => {
      down = true;
      startX = event.pageX - element.offsetLeft;
      scrollLeft = element.scrollLeft;
      element.classList.add("is-dragging");
    };

    const stop = () => {
      down = false;
      element.classList.remove("is-dragging");
    };

    const onPointerMove = (event) => {
      if (!down) return;
      event.preventDefault();
      const x = event.pageX - element.offsetLeft;
      element.scrollLeft = scrollLeft - (x - startX) * 1.4;
    };

    element.addEventListener("pointerdown", onPointerDown);
    element.addEventListener("pointerleave", stop);
    element.addEventListener("pointerup", stop);
    element.addEventListener("pointermove", onPointerMove);

    return () => {
      element.removeEventListener("pointerdown", onPointerDown);
      element.removeEventListener("pointerleave", stop);
      element.removeEventListener("pointerup", stop);
      element.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <div className="genre-strip" ref={ref}>
      {children}
    </div>
  );
}

export function NewsletterForm() {
  const [state, setState] = useState("idle");

  const onSubmit = (event) => {
    event.preventDefault();
    setState("loading");
    window.setTimeout(() => setState("success"), 450);
  };

  return (
    <form className="newsletter-form" onSubmit={onSubmit}>
      <label htmlFor="email">Email address</label>
      <input id="email" type="email" placeholder="reader@folio.com" required />
      <button type="submit" data-state={state}>
        {state === "loading" ? "Joining" : state === "success" ? "Subscribed" : "Subscribe"}
      </button>
    </form>
  );
}
