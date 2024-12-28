import { motion } from "framer-motion";

const Mainpage = () => {
  return (
    <>
      <div>
        <motion.p
          className="px-44 pt-24 font-bold text-white text-5xl"
          initial={{ x: -200 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        >
          Advancing Businesses with <br /> Top-Tier Digital Asset
          <br /> Tokenization Services
        </motion.p>
      </div>
    </>
  );
};

export default Mainpage;
