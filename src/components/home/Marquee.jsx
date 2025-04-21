import { motion } from "framer-motion";

const Marquee = () => {
  return (
    <div className="w-full h-[200px] overflow-hidden py-2 flex items-center">
      <motion.div
        className="londrina-outline-regular whitespace-nowrap text-8xl font-bold text-black tracking-tight"
        animate={{ x: ["0%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
      >
        Sustainable Fashion ✦ Statement Pieces ✦ Luxe Fabrics → Streetwear Culture ✦ Comfort Meets Style ✦ Made to Measure | Capsule Wardrobe ✦ Curated Collections ✦ Slow Fashion → On-Demand Fashion ✦ Trend Forecasting ✦ Edgy Silhouettes | Elevated Basics ✦ Wear Your Story ✦ Seasonal Drops →
        &nbsp; Sustainable Fashion ✦ Statement Pieces ✦ Luxe Fabrics → Streetwear Culture ✦ Comfort Meets Style ✦ Made to Measure | Capsule Wardrobe ✦ Curated Collections ✦ Slow Fashion → On-Demand Fashion ✦ Trend Forecasting ✦ Edgy Silhouettes | Elevated Basics ✦ Wear Your Story ✦ Seasonal Drops →
      </motion.div>
    </div>
  );
};

export default Marquee;
