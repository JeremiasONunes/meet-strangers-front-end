import { useEffect, useRef } from "react";

export default function VideoChat({ type = "remote", isMuted = false, cameraOn = true }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    if (type === "local") {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.error("Erro ao acessar câmera/microfone:", err));
    }
  }, [type]);

  useEffect(() => {
    if (type === "local" && streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      const videoTrack = streamRef.current.getVideoTracks()[0];

      if (audioTrack) audioTrack.enabled = !isMuted;
      if (videoTrack) videoTrack.enabled = cameraOn;
    }
  }, [isMuted, cameraOn, type]);

  if (type === "remote") {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black text-gray-400 text-center text-lg rounded-lg">
        Ainda não há parceiro disponível para conversar...
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      className="w-full h-full object-cover bg-black rounded-lg"
    />
  );
}
