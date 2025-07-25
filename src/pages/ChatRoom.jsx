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
            <div className="flex flex-1 flex-col lg:flex-row gap-4">
                {/* Área de vídeo */}
                <div className="relative flex-1 rounded-2xl bg-black/40 p-2 shadow-xl overflow-hidden flex flex-col items-center justify-center">
                    {/* Vídeo remoto (mockado) */}
                    <div className="w-full h-64 lg:h-full rounded-xl overflow-hidden relative">
                        <VideoChat type="remote" />
                    </div>

                    {/* Vídeo local (miniatura) */}
                    <div className="absolute bottom-4 right-4 w-48 h-48 rounded-xl overflow-hidden border-2 border-white shadow-lg">
                        <VideoChat type="local" isMuted={isMuted} cameraOn={cameraOn} />
                    </div>
                </div>

                {/* Área lateral: Chat + Controles */}
                <div className="w-full lg:w-[350px] flex flex-col gap-4 rounded-2xl bg-black/40 p-4 shadow-xl">
                    <div className="h-[600px]">
                        <ChatBox />
                    </div>

                    {/* Controles */}
                    <div className="grid grid-cols-4 gap-2 mt-4">
                        <button
                            onClick={() => alert("Próximo chat (mock)")}
                            className="bg-blue-600 hover:bg-blue-700 py-2 rounded-lg transition"
                        >
                            Next
                        </button>
                        <button
                            onClick={() => setIsMuted((prev) => !prev)}
                            className={`py-2 rounded-lg transition ${isMuted ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"
                                }`}
                        >
                            {isMuted ? "Mic Off" : "Mic On"}
                        </button>
                        <button
                            onClick={() => setCameraOn((prev) => !prev)}
                            className={`py-2 rounded-lg transition ${!cameraOn ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"
                                }`}
                        >
                            {cameraOn ? "Cam On" : "Cam Off"}
                        </button>
                        <button
                            onClick={() => navigate("/")}
                            className="bg-gray-500 hover:bg-gray-600 py-2 rounded-lg transition"
                        >
                            Sair
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
