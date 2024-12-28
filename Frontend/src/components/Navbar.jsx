import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice.js";
import { useState } from "react";

const Navbar = () => {
  const token = useSelector((store) => store.user);
  console.log("redux token", token);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");

  const handleLogOut = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      return navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleFeedbackSubmit = (e) => {
    alert("submitted successfully");
    e.preventDefault();
    //console.log("Feedback submitted:", { email, feedback });
    setEmail("");
    setFeedback("");
    setShowFeedbackForm(false);
    // Close the form after submission
  };

  return (
    <div className="container flex items-center justify-between  bg-gradient-to-r from-purple-500 to-blue-600 h-24 shadow-md">
      <div className="text-5xl mx-10 font-bold text-white">PROPERTIZE</div>
      <div className="flex">
        <div className="space-x-14 mr-36 text-black text-lg mt-3 font-normal ">
          <Link className="hover:text-white" to="/about">
            About
          </Link>
          {!token && (
            <>
              <Link className="hover:text-white" to="/">
                Home
              </Link>

              <Link className="hover:text-white" to="/signup">
                Sign up
              </Link>
              <Link className="hover:text-white" to="/login">
                Login
              </Link>
            </>
          )}
          {token && (
            <Link className="hover:text-white" onClick={handleLogOut}>
              Logout
            </Link>
          )}
        </div>
        <div className="bg-orange-600 w-48 h-12 mr-8 rounded-md flex justify-center">
          <motion.button
            className="text-white font-normal mt-1 text-lg"
            whileTap={"tap"}
            whileHover={"hover"}
            whileFocus={"focus"}
            onClick={() => setShowFeedbackForm(true)}
          >
            Feedback
          </motion.button>
        </div>
      </div>

      {showFeedbackForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white justify-center align-center  p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl text-blue-700  font-bold mb-4">
              Feedback Form
            </h2>
            <form onSubmit={handleFeedbackSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-black "
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 p-2 w-full border border-purple-600 text-black rounded-md bg-white"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="feedback"
                  className="block text-sm font-medium text-black"
                >
                  Feedback:
                </label>
                <textarea
                  id="feedback"
                  className="mt-1 p-2 w-full rounded-md border border-purple-600 text-black bg-white"
                  placeholder="Enter your feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-orange-600 text-white rounded-md"
                  onClick={() => setShowFeedbackForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-600 text-white rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
