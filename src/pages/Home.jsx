import React from 'react';
import NameForm from '../components/NameForm';
import logo from '../assets/meet-strangers.png';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-900 via-black to-blue-950 text-white">
      {/* Header */}
      <div className="text-center py-8">
        <img
          src={logo}
          alt="MeetStranger Logo"
          className="w-32 h-32 mx-auto mb-4 drop-shadow-lg"
        />
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          MeetStranger
        </h1>
        <p className="text-gray-300 text-lg">
          Conecte-se com pessoas do mundo todo
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 pb-8">
        <div className="w-full max-w-md">
          <NameForm />
          
          {/* Features */}
          <div className="mt-8 grid grid-cols-2 gap-4 text-center">
            <div className="bg-black/20 p-4 rounded-lg backdrop-blur-sm">
              <div className="text-2xl mb-2">💬</div>
              <div className="text-sm text-gray-300">Chat em Tempo Real</div>
            </div>
            <div className="bg-black/20 p-4 rounded-lg backdrop-blur-sm">
              <div className="text-2xl mb-2">⚡</div>
              <div className="text-sm text-gray-300">Rápido</div>
            </div>
            <div className="bg-black/20 p-4 rounded-lg backdrop-blur-sm">
              <div className="text-2xl mb-2">🌍</div>
              <div className="text-sm text-gray-300">Global</div>
            </div>
            <div className="bg-black/20 p-4 rounded-lg backdrop-blur-sm">
              <div className="text-2xl mb-2">🔒</div>
              <div className="text-sm text-gray-300">Seguro</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-4 text-gray-400 text-sm">
        <p>Feito com ❤️ para conectar pessoas</p>
      </div>
    </div>
  );
}