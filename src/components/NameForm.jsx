import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function NameForm() {
  const [name, setName] = useState('');
  const [interests, setInterests] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('username', name);
    localStorage.setItem('interests', interests);
    navigate('/chat');
  };

  return (
    <>
    <form 
      onSubmit={handleSubmit} 
      className="bg-[#0a0f2c] p-10 rounded-2xl shadow-2xl w-full max-w-md mx-auto space-y-6 animate-fade-in"
    >
      <h2 className="text-3xl font-semibold text-center text-white tracking-wide">
        Bem-vindo ao <span className="text-blue-400">MeetStranger</span>
      </h2>

      <input
        type="text"
        placeholder="Digite seu nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full p-3 bg-[#1c223a] text-white placeholder-gray-400 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        placeholder="Seus interesses (ex: filmes, música...)"
        value={interests}
        onChange={(e) => setInterests(e.target.value)}
        className="w-full p-3 bg-[#1c223a] text-white placeholder-gray-400 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button 
        type="submit" 
        className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white p-3 rounded-lg font-medium"
      >
        Entrar no Chat
      </button>
      <div className="text-center mt-4">
          <Link
            to="/about"
            className="text-blue-400 hover:text-blue-300 underline transition"
          >
            Sobre o MeetStranger
          </Link>
        </div>
    </form>
    {/* Link para a página Sobre */}
        
    </>
  );
}
