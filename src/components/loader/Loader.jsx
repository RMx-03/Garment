import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const Loader = ({ text, spinDuration = 20, className = "" }) => {
  const letters = Array.from(text);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      rotate: 360,
      transition: {
        rotate: {
          from: 0,
          to: 360,
          duration: spinDuration,
          repeat: Infinity,
          ease: "linear",
          type: "tween",
        },
      },
    });
  }, [controls, spinDuration]);

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center">
      <motion.div
        className={`relative rounded-full w-[200px] h-[200px] text-white font-black text-center origin-center ${className}`}
        animate={controls}
      >
        {letters.map((letter, i) => {
          const rotation = (360 / letters.length) * i;
          const factor = Number((Math.PI / letters.length).toFixed(0));
          const x = factor * i;
          const y = factor * i;
          const transform = `rotateZ(${rotation}deg) translate3d(${x}px, ${y}px, 0)`;

          return (
            <span
              key={i}
              className="absolute inline-block inset-0 text-2xl"
              style={{ transform, WebkitTransform: transform }}
            >
              {letter}
            </span>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Loader;
