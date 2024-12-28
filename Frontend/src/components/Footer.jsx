import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 w-screen">
      <div className="container mx-auto flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        {/* Logo Section */}
        <div className="flex items-center space-x-4 px-4">
          <span className="text-xl font-semibold">
            Real Estate Tokenization
          </span>
        </div>

        {/* Links Section */}
        <div className="flex space-x-6">
          <a
            href="https://github.com/your-username"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            <i className="fab fa-github text-xl"></i>
          </a>
          <a
            href="https://linkedin.com/in/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition"
          >
            <i className="fab fa-linkedin text-xl"></i>
          </a>
          <a
            href="https://instagram.com/your-username"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition"
          >
            <i className="fab fa-instagram text-xl"></i>
          </a>
          <a
            href="https://twitter.com/your-username"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            <i className="fab fa-twitter text-xl"></i>
          </a>
        </div>

        {/* Copyright Section */}
        <div className="text-center text-sm sm:text-right">
          <p>
            &copy; {new Date().getFullYear()} Your Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
