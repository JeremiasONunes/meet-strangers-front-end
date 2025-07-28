import { useState, useRef, useEffect } from "react";

export default function ChatBox({ messages: propMessages = [], sendMessage }) {
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
          className={`max-w-[80%] flex flex-col ${
            msg.sender === username ? "self-end items-end" : "self-start items-start"
          }`}
        >
          {/* Nome acima da mensagem */}
          <span className="text-xs text-white/70 mb-1">
            {msg.sender === username ? "Você" : msg.sender || "Desconhecido"}
          </span>

          {/* Caixa da mensagem */}
          <div
            className={`px-4 py-2 text-sm rounded-2xl shadow transition-all ${
              msg.sender === username
                ? "bg-blue-600 text-white rounded-br-none"
                : "bg-white/20 text-white rounded-bl-none"
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
        placeholder="Digite sua mensagem..."
        className="flex-1 bg-white/10 text-white placeholder-white/60 rounded-l-xl px-4 py-2 text-sm outline-none backdrop-blur-md border border-white/20"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-5 py-2 rounded-r-xl hover:bg-blue-700 transition"
      >
        Enviar
      </button>
    </form>
  </div>
);

}
