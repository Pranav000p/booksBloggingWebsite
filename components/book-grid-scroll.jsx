"use client";

import { useEffect, useRef } from "react";
import { animate, scroll, cubicBezier } from "framer-motion";

export function BookGridScroll() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const scalerImgRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    const scalerImg = scalerImgRef.current;
    const overlay = overlayRef.current;
    const grid = gridRef.current;

    if (!section || !scalerImg || !overlay || !grid) return;

    // We need to measure the natural (grid-defined) size of the scaler image.
    // Since Next.js and layout loads might take a frame, we measure inside a double requestAnimationFrame
    // to ensure the browser has calculated the CSS layout of the grid correctly.
    let cleanup = null;

    const initAnimation = () => {
      // Clear any prior inline styles to measure correctly
      scalerImg.style.width = "";
      scalerImg.style.height = "";

      const naturalWidth = scalerImg.offsetWidth || 240;
      const naturalHeight = scalerImg.offsetHeight || 336;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Animate the main center book cover on scroll:
      // It shrinks from filling the entire screen to its natural size in the grid
      const scalerCleanup = scroll(
        animate(
          scalerImg,
          {
            width: [viewportWidth, naturalWidth],
            height: [viewportHeight, naturalHeight],
          },
          {
            width: { easing: cubicBezier(0.65, 0, 0.35, 1) }, // GSAP power2.inOut equivalent
            height: { easing: cubicBezier(0.42, 0, 0.58, 1) }, // GSAP power1.inOut equivalent
          }
        ),
        {
          target: section,
          offset: ["start start", "80% end"],
        }
      );

      // Animate the grid layers with staggered timing and varying curves:
      const layers = grid.querySelectorAll(".layer");
      const scaleEasings = [
        cubicBezier(0.42, 0, 0.58, 1), // Layer 1: GSAP power1.inOut
        cubicBezier(0.76, 0, 0.24, 1), // Layer 2: GSAP power3.inOut
        cubicBezier(0.87, 0, 0.13, 1), // Layer 3: GSAP power4.inOut
      ];

      const layerCleanups = [];
      layers.forEach((layer, index) => {
        const endOffset = `${1 - index * 0.05} end`;

        // Fade in: opacity holds at 0 until 55% of scroll progress, then fades to 1
        const fadeAnim = scroll(
          animate(
            layer,
            { opacity: [0, 0, 1] },
            {
              offset: [0, 0.55, 1],
              easing: cubicBezier(0.61, 1, 0.88, 1), // GSAP sine.out equivalent
            }
          ),
          {
            target: section,
            offset: ["start start", endOffset],
          }
        );

        // Scale up: scale holds at 0 until 30% of scroll progress, then scales to 1
        const scaleAnim = scroll(
          animate(
            layer,
            { scale: [0, 0, 1] },
            {
              offset: [0, 0.3, 1],
              easing: scaleEasings[index],
            }
          ),
          {
            target: section,
            offset: ["start start", endOffset],
          }
        );

        layerCleanups.push(fadeAnim, scaleAnim);
      });

      // Animate editorial text overlay:
      // Fades in starting at 65% scroll progress
      const overlayCleanup = scroll(
        animate(
          overlay,
          { opacity: [0, 0, 1] },
          {
            offset: [0, 0.65, 1],
            easing: cubicBezier(0.25, 1, 0.5, 1),
          }
        ),
        {
          target: section,
          offset: ["start start", "90% end"],
        }
      );

      cleanup = () => {
        scalerCleanup();
        layerCleanups.forEach((c) => c());
        overlayCleanup();
      };
    };

    // Delay measurement slightly to ensure CSS layouts are fully computed
    const frameId1 = requestAnimationFrame(() => {
      const frameId2 = requestAnimationFrame(initAnimation);
      cleanup = () => cancelAnimationFrame(frameId2);
    });

    // Resize handler to adjust calculations
    const handleResize = () => {
      if (cleanup) cleanup();
      initAnimation();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId1);
      if (cleanup) cleanup();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="scroll-grid-section" ref={sectionRef}>
      <div className="scroll-grid-container" ref={containerRef}>
        <div className="scroll-grid" ref={gridRef}>
          {/* Layer 1: Left Column (2 book covers: top-left, bottom-left) */}
          <div className="layer">
            <div>
              <img src="/images/factotum.jpg" alt="Factotum by Charles Bukowski" />
            </div>
            <div>
              <img src="/images/crime-and-punishment.jpg" alt="Crime and Punishment by Fyodor Dostoevsky" />
            </div>
          </div>

          {/* Layer 2: Right Column (2 book covers: top-right, bottom-right) */}
          <div className="layer">
            <div>
              <img src="/images/metamorphosis.jpg" alt="Metamorphosis by Franz Kafka" />
            </div>
            <div>
              <img src="/images/secret-history.jpg" alt="The Secret History by Donna Tartt" />
            </div>
          </div>

          {/* Center scaler image (Book of the Month - Collage) */}
          <div className="scaler">
            <img
              src="/images/books-collage.jpg"
              alt="Featured: Stacks and Covers"
              ref={scalerImgRef}
            />
          </div>
        </div>

        {/* Editorial scroll overlay text */}
        <div className="scroll-grid-overlay is-visible" ref={overlayRef} style={{ opacity: 0 }}>
          <div className="scroll-grid-title">
            <span>The Stacks</span>
            Discover the Archive
          </div>
          <div className="scroll-grid-caption">
            A thousand voices. An ocean of ink. Explore reading lists, deep essays, and precise summaries written with candlelit patience.
          </div>
        </div>
      </div>
    </section>
  );
}
