import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const myAnimation = {
    hover: { borderColor: "transparent", scale: 1.1 },
    tap: { borderColor: "transparent", scale: 0.95 },
    focus: { borderColor: "white", scale: 1.1, transition: { duration: 0.15 } },
  };
  return (
    <div className=" container  flex items-center justify-between h-24 bg-white ">
      <div className="text-7xl mx-14 font-bold text-blue-800 ">RWT</div>
      <div className="flex">
        <div className="space-x-14 mr-36 text-black text-lg mt-3 font-normal ">
          <Link className="" to="/">
            Home
          </Link>
          <Link className="" to="/about">
            About us
          </Link>
          <Link className="" to="/signin">
            Sign In
          </Link>
          <Link className="" to="/login">
            Login
          </Link>
        </div>
        <div className="bg-orange-600 w-48 h-12 mr-8 rounded-md flex justify-center  ">
          <motion.button
            className="text-white font-normal mt-1 text-lg"
            whileTap={"tap"}
            whileHover={"hover"}
            whileFocus={"focus"}
            variants={myAnimation}
          >
            Schedule A Call
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
