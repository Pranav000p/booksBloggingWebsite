"use client";

import { useEffect, useRef, useState } from "react";

export function FolioInteractions() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const revealItems = document.querySelectorAll(".reveal, .char-reveal, .page-section:not(.hero)");
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
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" }
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const hero = document.querySelector(".hero");
    if (!hero || window.matchMedia("(pointer: coarse)").matches || window.innerWidth <= 768) return;

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

    // Only apply click-and-drag scrolling on desktop (non-touch) viewports
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let down = false;
    let startX = 0;
    let scrollLeft = 0;

    const onPointerDown = (event) => {
      down = true;
      startX = event.pageX - element.offsetLeft;
      scrollLeft = element.scrollLeft;
      element.classList.add("is-dragging");
      element.setPointerCapture(event.pointerId);
    };

    const stop = (event) => {
      if (!down) return;
      down = false;
      element.classList.remove("is-dragging");
      if (element.hasPointerCapture(event.pointerId)) {
        element.releasePointerCapture(event.pointerId);
      }
    };

    const onPointerMove = (event) => {
      if (!down) return;
      event.preventDefault();
      const x = event.pageX - element.offsetLeft;
      element.scrollLeft = scrollLeft - (x - startX) * 1.5;
    };

    element.addEventListener("pointerdown", onPointerDown);
    element.addEventListener("pointercancel", stop);
    element.addEventListener("pointerup", stop);
    element.addEventListener("pointermove", onPointerMove);

    return () => {
      element.removeEventListener("pointerdown", onPointerDown);
      element.removeEventListener("pointercancel", stop);
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
    window.setTimeout(() => setState("success"), 1200);
  };

  return (
    <form className="newsletter-form" onSubmit={onSubmit}>
      <label htmlFor="email">Email address</label>
      <input id="email" type="email" placeholder="reader@folio.com" required />
      <button type="submit" data-state={state} disabled={state !== "idle"}>
        {state === "loading" ? (
          <span className="flex items-center justify-center gap-2">
            Joining...
          </span>
        ) : state === "success" ? (
          "Subscribed ✓"
        ) : (
          "Subscribe"
        )}
      </button>
    </form>
  );
}

export function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const requestRef = useRef(null);

  // Mouse coords
  const mouseX = useRef(-100);
  const mouseY = useRef(-100);

  // Ring smooth lerp coords
  const ringX = useRef(-100);
  const ringY = useRef(-100);

  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check if device supports cursor hover/fine movements
    const checkCoarse = window.matchMedia("(pointer: coarse)").matches;
    const checkWidth = window.innerWidth <= 768;
    setIsMobile(checkCoarse || checkWidth);

    if (checkCoarse || checkWidth) return;

    const onMouseMove = (e) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };

    const onMouseDown = () => {
      if (dotRef.current) dotRef.current.style.transform = "translate(-50%, -50%) scale(0.65)";
      if (ringRef.current) ringRef.current.style.transform = "translate(-50%, -50%) scale(1.3)";
    };

    const onMouseUp = () => {
      if (dotRef.current) dotRef.current.style.transform = "translate(-50%, -50%) scale(1)";
      if (ringRef.current) ringRef.current.style.transform = "translate(-50%, -50%) scale(1)";
    };

    const handleHoverStart = () => {
      if (dotRef.current) dotRef.current.style.transform = "translate(-50%, -50%) scale(2)";
      if (ringRef.current) {
        ringRef.current.style.borderColor = "var(--candle)";
        ringRef.current.style.background = "rgba(201, 125, 46, 0.08)";
        ringRef.current.style.width = "48px";
        ringRef.current.style.height = "48px";
      }
    };

    const handleHoverEnd = () => {
      if (dotRef.current) dotRef.current.style.transform = "translate(-50%, -50%) scale(1)";
      if (ringRef.current) {
        ringRef.current.style.borderColor = "rgba(201, 125, 46, 0.45)";
        ringRef.current.style.background = "transparent";
        ringRef.current.style.width = "38px";
        ringRef.current.style.height = "38px";
      }
    };

    // Attach listeners globally
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });

    // Stagger mouse lerp calculations
    const render = () => {
      // Lerp ring coordinate calculations
      ringX.current += (mouseX.current - ringX.current) * 0.14;
      ringY.current += (mouseY.current - ringY.current) * 0.14;

      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX.current}px`;
        dotRef.current.style.top = `${mouseY.current}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX.current}px`;
        ringRef.current.style.top = `${ringY.current}px`;
      }

      requestRef.current = requestAnimationFrame(render);
    };

    requestRef.current = requestAnimationFrame(render);

    // Dynamic hover bindings for interactive components
    const updateHoverBindings = () => {
      const interactives = document.querySelectorAll("a, button, select, input, textarea, [role='button'], .chip, .genre-card, .post-card, .testimonial-card");
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", handleHoverStart, { passive: true });
        el.addEventListener("mouseleave", handleHoverEnd, { passive: true });
      });
    };

    // Run first attachment
    updateHoverBindings();

    // Re-bind when subpages change or sections re-render
    const observer = new MutationObserver(updateHoverBindings);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      observer.disconnect();
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div className="custom-cursor">
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </div>
  );
}
