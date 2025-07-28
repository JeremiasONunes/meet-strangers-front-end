import { useEffect, useRef, useState } from "react";

export function useWebSocket(username) {
  const ws = useRef(null);
  const peerConnection = useRef(null);
  const localStream = useRef(null);

  const [status, setStatus] = useState("connecting"); // connecting, waiting, matched, disconnected
  const [partnerName, setPartnerName] = useState(null);
  const [messages, setMessages] = useState([]);
  const [remoteStream, setRemoteStream] = useState(null);

  const servers = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };

  useEffect(() => {
    // Inicia captura do stream local assim que o hook inicia
    async function initLocalStream() {
      try {
        localStream.current = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
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
            await startWebRTC(true); // iniciar offerer
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

    // Se localStream ainda não existir, tenta criar
    if (!localStream.current) {
      try {
        localStream.current = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
      } catch (err) {
        console.error("Erro ao acessar mídia local:", err);
      }
    }

    localStream.current.getTracks().forEach((track) => {
      peerConnection.current.addTrack(track, localStream.current);
    });

    peerConnection.current.ontrack = (event) => {
      const [stream] = event.streams;
      setRemoteStream(stream);
    };

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        ws.current.send(
          JSON.stringify({ type: "signal", candidate: event.candidate })
        );
      }
    };

    if (isOfferer) {
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);

      ws.current.send(
        JSON.stringify({ type: "signal", sdp: peerConnection.current.localDescription })
      );
    }
  }

  async function handleSignal(data) {
    if (!peerConnection.current) {
      await startWebRTC(false);
    }

    if (data.sdp) {
      await peerConnection.current.setRemoteDescription(data.sdp);

      if (data.sdp.type === "offer") {
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);

        ws.current.send(
          JSON.stringify({ type: "signal", sdp: peerConnection.current.localDescription })
        );
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
    if (localStream.current) {
      localStream.current.getTracks().forEach((t) => t.stop());
      localStream.current = null;
    }
    setRemoteStream(null);
  }

  // Função para parar o stream local (útil para desligar câmera)
  function stopLocalStream() {
    if (localStream.current) {
      localStream.current.getTracks().forEach(track => track.stop());
      localStream.current = null;
    }
  }

  return {
    status,
    partnerName,
    messages,
    sendMessage,
    localStream: localStream.current,
    remoteStream,
    isConnected: status === "matched",
    stopLocalStream,  // exporta a função para usar fora
  };
}
