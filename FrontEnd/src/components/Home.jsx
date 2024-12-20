// import { Outlet } from "react-router-dom";
// import Footer from "./Footer";
import { motion } from "framer-motion";

const Home = () => {
  const myAnimation = {
    hover: { scale: 1.1 },
    tap: { borderColor: "transparent", scale: 0.95 },
    focus: { borderColor: "white", scale: 1.1, transition: { duration: 0.15 } },
  };
  return (
    <>
      <div className="bg-orange-600 w-screen h-screen flex ">
        <div>
          <motion.p
            className="px-44 pt-24 font-bold text-white text-5xl "
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            transition={{ duration: 1 }}
          >
            Advancing Businesses with <br /> Top-Tier Digital Asset
            <br /> Tokenization Services
          </motion.p>
          <motion.p
            className="px-44 py-6 font-normal text-white  text-lg tracking-wide"
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            transition={{ duration: 1 }}
          >
            Turn your real-world digital or physical assets into tokens
            effortlessly
            <br /> with Netset Software, a trusted asset tokenization leader.
            Our services
            <br /> open up diverse financial avenues and bolster asset
            liquidity. Explore
            <br /> expanded ownership opportunities and attract a wider investor
            base
            <br /> through our Real-world Asset Tokenization solutions.
            Experience
            <br /> financial growth and flexibility with us. contact us
          </motion.p>
          <motion.button
            className="mx-48 w-48 px-3 py-2 font-medium text-white  text-xl border-2 border-white rounded-full"
            whileTap={"tap"}
            whileHover={"hover"}
            whileFocus={"focus"}
            variants={myAnimation}
          >
            Contact Us
          </motion.button>
        </div>
        <motion.div
          className="px-40 mt-24 bg-cover bg-center h-96 w-80"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
          style={{
            backgroundImage:
              "url('https://www.netsetsoftware.com/images/Tokenization%20Services.svg')",
          }}
        ></motion.div>
      </div>
      <div className="bg-white w-screen h-screen"></div>
    </>
  );
};

export default Home;
