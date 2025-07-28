import { useEffect, useRef, useState } from "react";

export function useWebSocket(username) {
  const ws = useRef(null);
  const peerConnection = useRef(null);
  const localStreamRef = useRef(null); // ref interna para manipular
  const [localStream, setLocalStream] = useState(null); // reativo para UI
  const [remoteStream, setRemoteStream] = useState(null);
  const [status, setStatus] = useState("connecting");
  const [partnerName, setPartnerName] = useState(null);
  const [messages, setMessages] = useState([]);

  const servers = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };

  useEffect(() => {
    async function initLocalStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        localStreamRef.current = stream;
        setLocalStream(stream);
      } catch (err) {
        console.error("Erro ao acessar mídia local:", err);
      }
    }

    initLocalStream();

    ws.current = new WebSocket("wss://meet-strangers-back-end.onrender.com");

    ws.current.onopen = () => {
      console.log("WebSocket conectado");
      setStatus("waiting");
      ws.current.send(JSON.stringify({ type: "join", name: username }));
    };

    ws.current.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      console.log("Mensagem recebida:", data);

      switch (data.type) {
        case "waiting":
          setStatus("waiting");
          break;

        case "match":
          setStatus("matched");
          setPartnerName(data.name);
          if (!peerConnection.current) {
            await startWebRTC(true); // você é o offerer
          }
          break;

        case "partner-disconnected":
          setStatus("disconnected");
          alert("Seu parceiro desconectou.");
          closePeerConnection();
          break;

        case "message":
          setMessages((msgs) => [...msgs, { sender: data.name, text: data.text }]);
          break;

        case "signal":
          await handleSignal(data);
          break;

        default:
          console.warn("Mensagem desconhecida", data);
      }
    };

    ws.current.onclose = () => {
      console.log("WebSocket desconectado");
      setStatus("disconnected");
      closePeerConnection();
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket erro:", error);
    };

    return () => {
      ws.current?.close();
      closePeerConnection();
    };
  }, [username]);

  async function startWebRTC(isOfferer) {
    peerConnection.current = new RTCPeerConnection(servers);

    // Aguarda o localStream ficar pronto
    while (!localStreamRef.current) {
      await new Promise((res) => setTimeout(res, 100));
    }

    localStreamRef.current.getTracks().forEach((track) => {
      peerConnection.current.addTrack(track, localStreamRef.current);
    });

    peerConnection.current.ontrack = (event) => {
      const [stream] = event.streams;
      console.log("Track recebida do parceiro.");
      setRemoteStream(stream);
    };

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        ws.current.send(JSON.stringify({ type: "signal", candidate: event.candidate }));
      }
    };

    if (isOfferer) {
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      ws.current.send(JSON.stringify({ type: "signal", sdp: peerConnection.current.localDescription }));
    }
  }

  async function handleSignal(data) {
    if (!peerConnection.current) {
      await startWebRTC(false); // responder
    }

    // Aguarda o localStream ficar pronto
    while (!localStreamRef.current) {
      await new Promise((res) => setTimeout(res, 100));
    }

    if (data.sdp) {
      await peerConnection.current.setRemoteDescription(data.sdp);

      if (data.sdp.type === "offer") {
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);
        ws.current.send(JSON.stringify({ type: "signal", sdp: peerConnection.current.localDescription }));
      }
    } else if (data.candidate) {
      try {
        await peerConnection.current.addIceCandidate(data.candidate);
      } catch (err) {
        console.error("Erro ao adicionar ICE candidate:", err);
      }
    }
  }

  function sendMessage(text) {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ type: "message", text }));
      setMessages((msgs) => [...msgs, { sender: username, text }]);
    }
  }

  function closePeerConnection() {
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }
    setRemoteStream(null);
  }

  function stopLocalStream() {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
      setLocalStream(null);
    }
  }

  return {
    status,
    partnerName,
    messages,
    sendMessage,
    localStream,
    remoteStream,
    isConnected: status === "matched",
    stopLocalStream,
  };
}
