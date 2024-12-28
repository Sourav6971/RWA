import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { MetaMaskUIProvider } from "@metamask/sdk-react-ui";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <MetaMaskUIProvider
        sdkOptions={{
          dappMetadata: {
            name: "Example React UI Dapp",
            url: window.location.href,
          },
          infuraAPIKey: process.env.INFURA_API_KEY,
        }}
      >
        <App />
      </MetaMaskUIProvider>
    </BrowserRouter>
  </React.StrictMode>
);
