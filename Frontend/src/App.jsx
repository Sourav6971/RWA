import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Body from "./components/Body";
import Mainpage from "./components/Mainpage";
import Wallet from "./components/Wallet";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Property from "./components/Property";
import ChatBot from "./components/ChatBot";
import Model from "./components/Model";
import Getdetails from "./components/Getdetails";
import Transfer from "./components/Transfer";

const App = () => {
  return (
    <div>
      <Provider store={appStore}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/body" element={<Body />} />
          <Route path="/mainpage" element={<Mainpage />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/property" element={<Property />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/model" element={<Model />} />
          <Route path="/userDetails" element={<Getdetails />} />
          <Route path="/transfer" element={<Transfer />} />
        </Routes>
      </Provider>
    </div>
  );
};

export default App;
