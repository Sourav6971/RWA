import React, { useRef, useEffect, useState } from "react";
import ChatForm from "./ChatForm";
import ChatbotIcon from "./Icon";
import ChatMessage from "./ChatMessage";
import "./chat.css";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { companyInfo } from "./companyInfo";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const App = () => {
  const [History, setHistory] = useState([
    {
      hideInChat: true,
      role: "user",
      text: companyInfo,
    },
  ]);
  const [showChatbot, setShowChatbot] = useState(false);
  const chatBodyRef = useRef();

  const generateBotResponse = async (history) => {
    // Format history for the generative AI model
    const formattedHistory = history.map(({ role, text }) => ({
      role,
      parts: [{ text }],
    }));

    try {
      const chatSession = model.startChat({
        generationConfig,
        history: formattedHistory,
      });

      // Send a new message with the last user input
      const lastUserMessage = history[history.length - 1]?.text || "";
      const result = await chatSession.sendMessage(lastUserMessage);

      const cleanedResponse = result.response.text().replace(/\*+/g, "");

      // Update history by replacing "thinking..." with actual response
      setHistory((prevHistory) => {
        const newHistory = [...prevHistory];
        const thinkingIndex = newHistory.findIndex(
          (chat) => chat.text === "thinking..."
        );

        if (thinkingIndex !== -1) {
          newHistory[thinkingIndex] = {
            role: "model",
            text: result.response.text(),
          };
        } else {
          newHistory.push({ role: "model", text: cleanedResponse });
        }

        return newHistory;
      });
    } catch (error) {
      console.error("Error generating bot response:", error);
    }
  };

  useEffect(() => {
    chatBodyRef.current.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [History]);

  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
      <button
        onClick={() => setShowChatbot((prev) => !prev)}
        id="chatbot-toggler"
      >
        <span className="material-symbols-outlined">mode_comment</span>
        <span className="material-symbols-outlined">close</span>
      </button>
      <div className="chatbot-popup">
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button
            onClick={() => setShowChatbot((prev) => !prev)}
            className="material-symbols-outlined"
          >
            keyboard_arrow_down
          </button>
        </div>

        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              Hey there! <br />
              How Can I help you today?
            </p>
          </div>
          {History.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        <div className="chat-footer">
          <ChatForm
            History={History}
            setHistory={setHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  );
};
export default App;
