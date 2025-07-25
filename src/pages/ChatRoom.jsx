import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoChat from "../components/VideoChat";
import ChatBox from "../components/ChatBox";

export default function ChatRoom() {
  const [isMuted, setIsMuted] = useState(false);
  const [cameraOn, setCameraOn] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-900 via-black to-blue-950 text-white p-4">
      <div className="flex flex-col lg:flex-row flex-1 gap-4">
        {/* Área de vídeo */}
        <div className="relative flex-1 rounded-2xl bg-black/40 p-2 shadow-xl overflow-hidden flex flex-col items-center justify-center">
          {/* Vídeo remoto */}
          <div className="w-full h-64 sm:h-80 md:h-96 lg:h-full rounded-xl overflow-hidden relative">
            <VideoChat type="remote" />
          </div>

          {/* Miniatura do vídeo local */}
          <div className="absolute bottom-2 right-2 w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-xl overflow-hidden border-2 border-white shadow-lg">
            <VideoChat type="local" isMuted={isMuted} cameraOn={cameraOn} />
          </div>
        </div>

        {/* Área lateral: Chat + Controles */}
        <div className="w-full lg:w-[350px] flex flex-col gap-4 rounded-2xl bg-black/40 p-4 shadow-xl">
          <div className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-y-auto">
            <ChatBox />
          </div>

          {/* Controles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
            <button
              onClick={() => alert("Próximo chat (mock)")}
              className="bg-blue-600 hover:bg-blue-700 py-2 rounded-lg transition text-sm"
            >
              Next
            </button>
            <button
              onClick={() => setIsMuted((prev) => !prev)}
              className={`py-2 rounded-lg transition text-sm ${
                isMuted ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isMuted ? "Mic Off" : "Mic On"}
            </button>
            <button
              onClick={() => setCameraOn((prev) => !prev)}
              className={`py-2 rounded-lg transition text-sm ${
                !cameraOn ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {cameraOn ? "Cam On" : "Cam Off"}
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-gray-500 hover:bg-gray-600 py-2 rounded-lg transition text-sm"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
