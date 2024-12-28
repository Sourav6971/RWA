import { motion } from "framer-motion";
import { FaExchangeAlt, FaLock, FaBook, FaLightbulb } from "react-icons/fa";
import Navbar from "./Navbar";

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16 px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold">About Real Asset Tokenization</h2>
          <p className="text-lg mt-4">
            Real asset tokenization leverages blockchain technology to digitize
            physical assets, making them more accessible, secure, and tradable
            on a global scale.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-700 p-6 rounded-lg text-center"
          >
            <FaExchangeAlt className="text-4xl text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Seamless Exchange</h3>
            <p className="mt-2 text-sm">
              Tokenized assets enable seamless trading of real-world assets like
              real estate, art, and commodities with blockchain's efficiency.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-700 p-6 rounded-lg text-center"
          >
            <FaLock className="text-4xl text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Enhanced Security</h3>
            <p className="mt-2 text-sm">
              Blockchain ensures secure, transparent, and tamper-proof ownership
              records, protecting investors from fraud.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-700 p-6 rounded-lg text-center"
          >
            <FaBook className="text-4xl text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Education & Accessibility</h3>
            <p className="mt-2 text-sm">
              Learn how tokenization democratizes access to high-value assets
              and empowers a wider audience to invest.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-700 p-6 rounded-lg text-center"
          >
            <FaLightbulb className="text-4xl text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Innovative Solutions</h3>
            <p className="mt-2 text-sm">
              Discover innovative solutions in asset management, fractional
              ownership, and liquidity generation.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
