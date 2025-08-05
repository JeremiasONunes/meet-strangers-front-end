import { useState, useRef, useEffect } from "react";

export default function ChatBox({ messages: propMessages = [], sendMessage, disabled = false }) {
  const username = localStorage.getItem("username") || "Você";

  const [messages, setMessages] = useState(propMessages);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMessages(propMessages);
  }, [propMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    sendMessage(newMessage.trim());
    setNewMessage("");
  };

  return (
  <div className="flex flex-col h-full min-h-0">
    {/* Área das mensagens */}
    <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scroll">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`max-w-[80%] flex flex-col animate-fade-in ${
            msg.sender === username ? "self-end items-end message-right" : "self-start items-start message-left"
          }`}
        >
          {/* Nome acima da mensagem */}
          <span className="text-xs text-white/70 mb-1">
            {msg.sender === username ? "Você" : msg.sender || "Desconhecido"}
          </span>

          {/* Caixa da mensagem */}
          <div
            className={`px-4 py-2 text-sm rounded-2xl shadow-lg backdrop-blur-sm border transition-all hover:scale-[1.02] ${
              msg.sender === username
                ? "bg-blue-600/90 text-white rounded-br-none border-blue-500/50"
                : "bg-white/20 text-white rounded-bl-none border-white/30"
            }`}
          >
            {msg.text}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>

    {/* Campo de envio */}
    <form onSubmit={handleSend} className="flex mt-4 gap-2">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder={disabled ? "Aguardando conexão..." : "Digite sua mensagem..."}
        disabled={disabled}
        className="flex-1 bg-white/10 text-white placeholder-white/60 rounded-l-xl px-4 py-2 text-sm outline-none backdrop-blur-md border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        type="submit"
        disabled={disabled || !newMessage.trim()}
        className="bg-blue-600 text-white px-5 py-2 rounded-r-xl hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
      >
        📤
      </button>
    </form>
  </div>
);

}
