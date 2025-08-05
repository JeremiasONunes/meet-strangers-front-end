import { useEffect, useRef, useState, useCallback } from "react";

export function useWebSocket(username) {
  const ws = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const [status, setStatus] = useState("connecting");
  const [partnerName, setPartnerName] = useState(null);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);

  const getWebSocketUrl = () => {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'ws://localhost:3000';
    }
    return 'wss://meet-strangers-back-end.onrender.com';
  };

  const connect = useCallback(() => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      return;
    }

    const wsUrl = getWebSocketUrl();
    console.log('Conectando ao WebSocket:', wsUrl);
    
    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log("WebSocket conectado");
      setStatus("waiting");
      setError(null);
      setReconnectAttempts(0);
      ws.current.send(JSON.stringify({ type: "join", name: username }));
    };

    ws.current.onmessage = (event) => {
      try {
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
            setStatus("waiting");
            setPartnerName(null);
            break;

          case "message":
            setMessages((msgs) => [...msgs, { 
              sender: data.name, 
              text: data.text,
              timestamp: data.timestamp || new Date().toISOString()
            }]);
            break;

          case "error":
            setError(data.message);
            break;

          default:
            console.warn("Mensagem desconhecida", data);
        }
      } catch (err) {
        console.error('Erro ao processar mensagem:', err);
      }
    };

    ws.current.onclose = (event) => {
      console.log("WebSocket desconectado", event.code, event.reason);
      setStatus("disconnected");
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket erro:", error);
      setStatus("disconnected");
    };
  }, [username]);

  useEffect(() => {
    connect();
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [username]);

  const sendMessage = useCallback((text) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN && text.trim()) {
      ws.current.send(JSON.stringify({ type: "message", text: text.trim() }));
      setMessages((msgs) => [...msgs, { 
        sender: username, 
        text: text.trim(),
        timestamp: new Date().toISOString()
      }]);
    }
  }, [username]);

  const reconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    if (ws.current) {
      ws.current.close();
    }
    setMessages([]);
    setPartnerName(null);
    setStatus("connecting");
    setError(null);
    setReconnectAttempts(0);
    setTimeout(() => {
      connect();
    }, 500);
  }, [connect]);



  return {
    status,
    partnerName,
    messages,
    error,
    sendMessage,
    reconnect,
    isConnected: status === "matched",
    isWaiting: status === "waiting",
    hasError: status === "error"
  };
}