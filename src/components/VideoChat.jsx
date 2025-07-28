import { useEffect, useRef } from "react";

export default function VideoChat({
  type = "local",
  localStream,
  remoteStream,
  isMuted = false,
  cameraOn = true,
  peerName = "Desconhecido",
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (type === "local" && videoRef.current) {
      videoRef.current.srcObject = localStream || null;
    }
    if (type === "remote" && videoRef.current) {
      videoRef.current.srcObject = remoteStream || null;
    }
  }, [localStream, remoteStream, type]);

  useEffect(() => {
    if (type === "local" && localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      const videoTrack = localStream.getVideoTracks()[0];

      if (audioTrack) audioTrack.enabled = !isMuted;
      if (videoTrack) videoTrack.enabled = cameraOn;
    }
  }, [isMuted, cameraOn, localStream, type]);

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-3 py-1 rounded-full z-10">
        {type === "local" ? "Você" : peerName}
      </div>

      <video
        ref={videoRef}
        autoPlay
        muted={type === "local"} // Somente muta o local para evitar eco
        className="w-full h-full object-cover bg-black rounded-lg"
      />
      {type === "remote" && !remoteStream && (
        <div className="w-full h-full flex items-center justify-center bg-black text-gray-400 text-center text-lg rounded-lg">
          Ainda não há parceiro disponível para conversar...
        </div>
      )}
    </div>
  );
}
