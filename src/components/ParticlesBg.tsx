import { useEffect, useCallback } from "react";

export default function ParticlesBg() {
  const initParticles = useCallback((isDark: boolean) => {
    const oldCanvas = document.querySelector("#particles-js canvas");
    if (oldCanvas) oldCanvas.remove();

    // @ts-ignore
    if (window.pJSDom?.length > 0) {
      // @ts-ignore
      window.pJSDom.forEach((p: any) => p.pJS.fn.vendors.destroypJS());
      // @ts-ignore
      window.pJSDom = [];
    }

    const colors = isDark
      ? { particles: "#00f5ff", lines: "#00d9ff", accent: "#0096c7" }
      : { particles: "#0277bd", lines: "#0288d1", accent: "#039be5" };

    // @ts-ignore
    window.particlesJS("particles-js", {
      particles: {
        number: { value: 140, density: { enable: true, value_area: 800 } },
        color: { value: colors.particles },
        shape: { type: "circle", stroke: { width: 0.5, color: colors.accent } },
        opacity: {
          value: 0.7,
          random: true,
          anim: { enable: true, speed: 1, opacity_min: 0.3 },
        },
        size: {
          value: 3,
          random: true,
          anim: { enable: true, speed: 2, size_min: 1 },
        },
        line_linked: {
          enable: true,
          distance: 160,
          color: colors.lines,
          opacity: 0.4,
          width: 1.2,
        },
        move: { enable: true, speed: 2, random: true, out_mode: "bounce" },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" },
          resize: true,
        },
        modes: {
          grab: { distance: 220, line_linked: { opacity: 0.8 } },
          push: { particles_nb: 4 },
          repulse: { distance: 180, duration: 0.4 },
        },
      },
      retina_detect: true,
    });
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const detectDark = () =>
      html.getAttribute("data-theme") === "dark" ||
      !html.getAttribute("data-theme"); // default is dark

    let script: HTMLScriptElement | null = null;
    let observer: MutationObserver | null = null;

    // If particles.js already loaded (e.g. hot reload), init immediately
    // @ts-ignore
    if (window.particlesJS) {
      initParticles(detectDark());
      observer = new MutationObserver(() => initParticles(detectDark()));
      observer.observe(html, { attributes: true, attributeFilter: ["class", "data-theme"] });
    } else {
      script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        initParticles(detectDark());
        observer = new MutationObserver(() => initParticles(detectDark()));
        observer.observe(html, { attributes: true, attributeFilter: ["class", "data-theme"] });
      };
    }

    return () => {
      observer?.disconnect();
      if (script && document.body.contains(script)) document.body.removeChild(script);
      const canvas = document.querySelector("#particles-js canvas");
      if (canvas) canvas.remove();
      // @ts-ignore
      if (window.pJSDom?.length > 0) {
        // @ts-ignore
        window.pJSDom.forEach((p: any) => p.pJS.fn.vendors.destroypJS());
        // @ts-ignore
        window.pJSDom = [];
      }
    };
  }, [initParticles]);

  return <div id="particles-js" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />;
}
