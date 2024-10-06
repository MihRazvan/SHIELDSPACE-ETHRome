// @ts-nocheck
// @ts-ignore
import React, { useEffect, useRef } from "react";

// import Hydra from "hydra-synth";

const HydraBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize Hydra
    // const hydra = new Hydra({
    //   canvas: canvasRef.current,
    //   detectAudio: false,
    // });

    const choice = Math.floor(Math.random() * 3);

    switch (choice) {
      case 0:
        voronoi(350, 0.15)
          .modulateScale(osc(8).rotate(Math.sin(time)), 0.5)
          .thresh(0.8)
          .modulateRotate(osc(7), 0.4)
          .thresh(0.7)
          .diff(src(o0).scale(1.8))
          .modulateScale(osc(2).modulateRotate(o0, 0.74))
          .diff(
            src(o0)
              .rotate([-0.012, 0.01, -0.002, 0])
              .scrollY(0, [-1 / 199800, 0].fast(0.7)),
          )
          .brightness([-0.02, -0.17].smooth().fast(0.5))
          .out();
        break;
      case 1:
        noise(18)
          .colorama(1)
          .posterize(2)
          .kaleid(50)
          .mask(shape(25, 0.25).modulateScale(noise(400.5, 0.5)))
          .mask(shape(400, 1, 2.125))
          .modulateScale(osc(6, 0.125, 0.05).kaleid(50))
          .mult(osc(20, 0.05, 2.4).kaleid(50), 0.25)
          .scale(1.75, 0.65, 0.5)
          .modulate(noise(0.5))
          .saturate(6)
          .posterize(4, 0.2)
          .scale(1.5)
          .out();
        break;
      case 2:
      default:
        osc(5, 0.1)
          .modulate(noise(6), 0.22)
          .diff(o0)
          .modulateScrollY(osc(5).modulate(osc().rotate(), 0.15))
          .scale(0.72)
          .color(0.05, 0.65, 0.05)
          .out();
    }
  }, []);

  return <canvas id="background_canvas" ref={canvasRef} />;
};

export default HydraBackground;
