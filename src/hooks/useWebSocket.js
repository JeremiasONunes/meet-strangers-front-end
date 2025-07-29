import { useEffect, useRef, useState } from "react";

export function useWebSocket(username) {
  const ws = useRef(null);
  const [status, setStatus] = useState("connecting");
  const [partnerName, setPartnerName] = useState(null);
  const [messages, setMessages] = useState([]);

  function connect() {
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const wsUrl = `${protocol}://meet-strangers-back-end.onrender.com`;
    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log("WebSocket conectado");
      setStatus("waiting");
      ws.current.send(JSON.stringify({ type: "join", name: username }));
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Mensagem recebida:", data);

      switch (data.type) {
        case "waiting":
          setStatus("waiting");
          setPartnerName(null);
          break;

        case "match":
          setStatus("matched");
          setPartnerName(data.name);
          break;

        case "partner-disconnected":
          setStatus("disconnected");
          alert("Seu parceiro desconectou.");
          break;

        case "message":
          setMessages((msgs) => [...msgs, { sender: data.name, text: data.text }]);
          break;

        default:
          console.warn("Mensagem desconhecida", data);
      }
    };

    ws.current.onclose = () => {
      console.log("WebSocket desconectado");
      setStatus("disconnected");
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket erro:", error);
    };
  }

  useEffect(() => {
    connect();
    return () => {
      ws.current?.close();
    };
  }, [username]);

  function sendMessage(text) {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ type: "message", text }));
      setMessages((msgs) => [...msgs, { sender: username, text }]);
    }
  }

  // Função para trocar de parceiro e reiniciar a conexão
  function reconnect() {
    ws.current?.close();
    setMessages([]);
    setPartnerName(null);
    setStatus("waiting");
    connect();
  }

  return {
    status,
    partnerName,
    messages,
    sendMessage,
    reconnect,
    isConnected: status === "matched",
  };
}
