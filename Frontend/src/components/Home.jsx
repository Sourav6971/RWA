import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatBot from "./ChatBot";

const Home = () => {
  const [showContact, setShowContact] = useState(false);

  const myAnimation = {
    hover: { scale: 1.1 },
    tap: { borderColor: "transparent", scale: 0.95 },
    focus: { borderColor: "white", scale: 1.1, transition: { duration: 0.15 } },
  };

  const toggleContactPopup = () => {
    setShowContact(!showContact);
  };

  return (
    <>
      <div>
        <Navbar />
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-screen h-screen flex">
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
            <motion.p
              className="px-44 py-6 font-normal text-white text-lg tracking-wide"
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
              <br /> expanded ownership opportunities and attract a wider
              investor base
              <br /> through our Real-world Asset Tokenization solutions.
              Experience
              <br /> financial growth and flexibility with us. Contact us
            </motion.p>
            <motion.button
              className="mx-48 w-48 px-3 py-2 font-medium text-white text-xl border-2 border-white rounded-full"
              whileTap={"tap"}
              whileHover={"hover"}
              whileFocus={"focus"}
              variants={myAnimation}
              onClick={toggleContactPopup}
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
          <div>
            <ChatBot />
          </div>
        </div>
        <Footer />

        {showContact && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Contact Us
                </h2>
                <button
                  className="text-gray-500 hover:text-red-500"
                  onClick={toggleContactPopup}
                >
                  <AiOutlineClose size={24} />
                </button>
              </div>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input input-bordered w-full"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="input input-bordered w-full"
                />
                <textarea
                  placeholder="Your Message"
                  className="textarea textarea-bordered w-full"
                ></textarea>
                <button className="btn btn-primary w-full">Submit</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
