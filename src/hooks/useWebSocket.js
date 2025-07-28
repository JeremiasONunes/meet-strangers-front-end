import { useEffect, useRef, useState } from "react";

export function useWebSocket(username) {
  const ws = useRef(null);
  const [status, setStatus] = useState("connecting"); // connecting, waiting, matched, disconnected
  const [partnerName, setPartnerName] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let reconnectTimeout;

    function connect() {
      ws.current = new WebSocket("ws://localhost:3000");

      ws.current.onopen = () => {
        console.log("✅ WebSocket conectado");
        setStatus("waiting");
        ws.current.send(JSON.stringify({ type: "join", name: username }));
      };

      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("📩 Mensagem recebida:", data);

        switch (data.type) {
          case "waiting":
            setStatus("waiting");
            break;

          case "match":
            setStatus("matched");
            setPartnerName(data.name);
            break;

          case "partner-disconnected":
            setStatus("disconnected");
            alert("⚠️ Seu parceiro desconectou.");
            break;

          case "message":
            setMessages((msgs) => [...msgs, { sender: data.name, text: data.text }]);
            break;

          case "signal":
            // Aqui vamos lidar com WebRTC signaling depois
            console.log("📡 Sinal recebido para WebRTC:", data);
            break;

          default:
            console.warn("Mensagem desconhecida", data);
        }
      };

      ws.current.onclose = () => {
        console.log("❌ WebSocket desconectado");
        setStatus("disconnected");

        // Tenta reconectar após 3 segundos
        reconnectTimeout = setTimeout(connect, 3000);
      };

      ws.current.onerror = (error) => {
        console.error("🚨 Erro no WebSocket:", error);
      };
    }

    connect();

    return () => {
      clearTimeout(reconnectTimeout);
      if (ws.current) ws.current.close();
    };
  }, [username]);

  function sendMessage(text) {
    if (ws.current && ws.current.readyState === WebSocket.OPEN && text.trim()) {
      ws.current.send(JSON.stringify({ type: "message", text }));
      setMessages((msgs) => [...msgs, { sender: username, text }]);
    }
  }

  return { status, partnerName, messages, sendMessage };
}
