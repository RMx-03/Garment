import { useRef, memo } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "framer-motion";
import { wrap } from "@motionone/utils";

const ParallaxText = memo(({ children, baseVelocity = 1.5 }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * (velocityFactor.get() * 0.3);
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap leading-none py-8 w-full relative">
      <motion.div
        className="inline-block whitespace-nowrap will-change-transform text-[2.5rem] md:text-[8rem] tracking-tight plaster-regular text-white"
        style={{ x }}
      >
        <span className="mx-8">{children}</span>
        <span className="mx-8">{children}</span>
        <span className="mx-8">{children}</span>
        <span className="mx-8">{children}</span>
      </motion.div>
    </div>
  );
});

ParallaxText.displayName = 'ParallaxText';

const ParallaxMarquee = memo(() => {
  return (
    <section className="bg-black">
      <ParallaxText baseVelocity={1}>
        VERSACE ✦ ZARA ✦ GUCCI → PRADA ✦ Calvin Klein ✦ CHANEL ✦ DIOR → BALENCIAGA ✦ LOUIS VUITTON ✦ FENDI →
      </ParallaxText>
    </section>
  );
});

ParallaxMarquee.displayName = 'ParallaxMarquee';

export default ParallaxMarquee;