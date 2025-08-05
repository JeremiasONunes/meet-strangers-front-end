import { useNavigate } from "react-router-dom";
import ChatBox from "../components/ChatBox";
import { useWebSocket } from "../hooks/useWebSocket";
import logo from "../assets/meet-strangers.png";

export default function ChatRoom() {
  const username = localStorage.getItem("username") || "Você";
  
  const {
    status,
    partnerName,
    messages,
    error,
    sendMessage,
    reconnect,
    isConnected,
    isWaiting,
    hasError
  } = useWebSocket(username);

  const navigate = useNavigate();

  function handleExit() {
    navigate("/");
  }

  function handleNewChat() {
    reconnect();
  }

  function getStatusMessage() {
    if (hasError) return `Erro: ${error}`;
    if (isWaiting) return "🔍 Procurando parceiro...";
    if (isConnected) return `💬 Conversando com: ${partnerName}`;
    return "🔄 Conectando...";
  }

  function getStatusColor() {
    if (hasError) return "text-red-400";
    if (isWaiting) return "text-yellow-400";
    if (isConnected) return "text-green-400";
    return "text-blue-400";
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-900 via-black to-blue-950 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black/20 backdrop-blur-sm">
        <img src={logo} alt="MeetStranger" className="h-12" />
        <div className={`text-sm font-medium ${getStatusColor()}`}>
          {getStatusMessage()}
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleNewChat}
            disabled={!isConnected && !isWaiting}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-3 py-1 rounded-lg text-sm transition"
          >
            🔄 Próximo
          </button>
          <button
            onClick={handleExit}
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg text-sm transition"
          >
            ❌ Sair
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-black/40 rounded-2xl p-6 backdrop-blur-sm">
          {hasError ? (
            <div className="text-center">
              <div className="text-red-400 text-xl mb-4">⚠️ Erro de Conexão</div>
              <p className="text-gray-300 mb-6">{error}</p>
              <button
                onClick={reconnect}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition"
              >
                🔄 Tentar Novamente
              </button>
            </div>
          ) : isWaiting ? (
            <div className="text-center">
              <div className="text-yellow-400 text-xl mb-4">🔍 Procurando Parceiro</div>
              <div className="animate-spin w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-300">Aguarde enquanto encontramos alguém para conversar...</p>
            </div>
          ) : isConnected ? (
            <div className="h-96">
              <ChatBox 
                messages={messages} 
                sendMessage={sendMessage}
                disabled={!isConnected}
              />
            </div>
          ) : (
            <div className="text-center">
              <div className="text-blue-400 text-xl mb-4">🔄 Conectando</div>
              <div className="animate-pulse w-8 h-8 bg-blue-400 rounded-full mx-auto"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}