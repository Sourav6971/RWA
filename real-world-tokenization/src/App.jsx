import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Signin from "./components/Signin";
import Login from "./components/Login";
import Body from "./components/Body";
import Navbar from "./components/Navbar"; // Import Navba

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/body" element={<Body />} />
      </Routes>
    </div>
  );
};

export default App;
