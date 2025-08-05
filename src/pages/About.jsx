import { Link } from 'react-router-dom';
import logo from '../assets/meet-strangers.png';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-blue-950 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black/20 backdrop-blur-sm">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <img src={logo} alt="MeetStranger" className="h-8" />
          <span className="font-bold text-lg">MeetStranger</span>
        </Link>
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm transition"
        >
          ← Voltar
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div className="bg-black/40 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-4xl border border-white/10 animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Sobre o MeetStranger
            </h1>
            <p className="text-gray-300 text-lg">
              Conectando pessoas ao redor do mundo
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-blue-400 mb-3">🎯 Nossa Missão</h2>
                <p className="text-gray-300 leading-relaxed">
                  Criar um espaço seguro e anônimo onde pessoas de todo o mundo podem se conectar, 
                  conversar e compartilhar experiências sem julgamentos ou barreiras.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-blue-400 mb-3">🔒 Privacidade</h2>
                <p className="text-gray-300 leading-relaxed">
                  Não armazenamos conversas, dados pessoais ou histórico. Todas as conexões são 
                  temporárias e completamente anônimas.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-blue-400 mb-3">⚡ Tecnologia</h2>
                <p className="text-gray-300 leading-relaxed">
                  Utilizamos WebRTC para conexões peer-to-peer, garantindo comunicação direta 
                  e de baixa latência entre usuários.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-blue-400 mb-3">✨ Recursos</h2>
                <ul className="text-gray-300 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    Chat de texto em tempo real
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    Conexão rápida e estável
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    Pareamento automático
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    Interface responsiva
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    Sem cadastro necessário
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-blue-400 mb-3">🛠️ Stack Técnica</h2>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-white/10 p-2 rounded text-center">React 19</div>
                  <div className="bg-white/10 p-2 rounded text-center">Node.js</div>
                  <div className="bg-white/10 p-2 rounded text-center">WebSocket</div>
                  <div className="bg-white/10 p-2 rounded text-center">TailwindCSS</div>
                  <div className="bg-white/10 p-2 rounded text-center">Express</div>
                  <div className="bg-white/10 p-2 rounded text-center">Vite</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center bg-white/5 p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-blue-400 mb-3">🚀 Como Usar</h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="text-2xl mb-2">1️⃣</div>
                <p>Digite seu nome na página inicial</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="text-2xl mb-2">2️⃣</div>
                <p>Aguarde ser pareado com alguém</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="text-2xl mb-2">3️⃣</div>
                <p>Comece a conversar!</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              to="/"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              🚀 Começar a Conversar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;