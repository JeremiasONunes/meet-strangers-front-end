import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function NameForm() {
  const [name, setName] = useState('');
  const [interests, setInterests] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateName = (name) => {
    if (!name.trim()) return 'Nome é obrigatório';
    if (name.trim().length < 2) return 'Nome deve ter pelo menos 2 caracteres';
    if (name.trim().length > 30) return 'Nome deve ter no máximo 30 caracteres';
    if (!/^[a-zA-Z0-9\sÀ-ÿ]+$/.test(name.trim())) return 'Nome contém caracteres inválidos';
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const nameError = validateName(name);
    if (nameError) {
      setError(nameError);
      return;
    }

    setError('');
    localStorage.setItem('username', name.trim());
    localStorage.setItem('interests', interests.trim());
    navigate('/chat');
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (error) setError('');
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full space-y-6 border border-white/10"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Começar Conversa
        </h2>
        <p className="text-gray-400 text-sm">
          Digite seu nome para encontrar alguém para conversar
        </p>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={handleNameChange}
            maxLength={30}
            className="w-full p-4 bg-white/10 text-white placeholder-white/60 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          <div className="text-right text-xs text-gray-400 mt-1">
            {name.length}/30
          </div>
        </div>

        <input
          type="text"
          placeholder="Seus interesses (opcional)"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          maxLength={100}
          className="w-full p-4 bg-white/10 text-white placeholder-white/60 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      <button 
        type="submit" 
        disabled={!name.trim()}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white p-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100"
      >
        🚀 Entrar no Chat
      </button>

      <div className="text-center">
        <Link
          to="/about"
          className="text-blue-400 hover:text-blue-300 text-sm underline transition"
        >
          Sobre o MeetStranger
        </Link>
      </div>
    </form>
  );
}