import { useNavigate } from "react-router-dom";
import ChatBox from "../components/ChatBox";
import { useWebSocket } from "../hooks/useWebSocket";
import logo from "../assets/meet-strangers.png";

export default function ChatRoom() {
  const {
    status,
    partnerName,
    messages,
    sendMessage,
    reconnect,
    isConnected,
  } = useWebSocket(localStorage.getItem("username") || "Você");

  const navigate = useNavigate();

  function handleExit() {
    navigate("/");
  }

  function handleNewChat() {
    reconnect();
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-black to-blue-950 text-white p-2">
      <img src={logo} alt="Logo do Projeto" className="h-64 mb-4 drop-shadow-lg" />

      <div className="flex flex-col w-full max-w-3xl rounded-2xl bg-black/40 p-6 shadow-xl flex-1 max-h-full">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Conversando com: {partnerName || "Buscando parceiro..."}
        </h2>

        <div className="flex-1 overflow-hidden rounded-lg border border-white/20 bg-black/30 p-1">
          <ChatBox messages={messages} sendMessage={sendMessage} />
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={handleNewChat}
            className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg transition text-sm"
          >
            Novo Chat
          </button>

          <button
            onClick={handleExit}
            className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-lg transition text-sm"
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
