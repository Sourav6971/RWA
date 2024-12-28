import React, { useRef } from "react";

const ChatForm = ({ History, setHistory, generateBotResponse }) => {
  const inputRef = useRef(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";

    setHistory((prevHistory) => [
      ...prevHistory,
      { role: "user", text: userMessage },
    ]);

    setHistory((prevHistory) => [
      ...prevHistory,
      { role: "model", text: "thinking..." },
    ]);

    setTimeout(() => {
      generateBotResponse([
        ...History,
        {
          role: "user",
          text: `using the details
                provided above, please address this query: ${userMessage}`,
        },
      ]);
    }, 600);
  };

  return (
    <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Message..."
        className="message-input"
        required
      />
      <button className="material-symbols-outlined">arrow_upward</button>
    </form>
  );
};

export default ChatForm;
