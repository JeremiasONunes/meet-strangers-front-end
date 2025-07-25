import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-blue-900 via-black to-blue-950 text-white overflow-hidden p-4">
      
      {/* Card centralizado */}
      <div className="flex items-center justify-center h-full">
        <div className="bg-black/50 backdrop-blur-md rounded-xl shadow-2xl p-6 sm:p-8 md:p-10 w-full max-w-md sm:max-w-lg md:max-w-2xl text-center border border-blue-800">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-blue-400 drop-shadow">
            Sobre o MeetStranger
          </h2>

          <p className="text-gray-200 mb-4 sm:mb-6 leading-relaxed text-base sm:text-lg">
            O <strong className="text-blue-300">MeetStranger</strong> é uma plataforma de comunicação aleatória entre desconhecidos,
            desenvolvida com foco em <span className="font-semibold text-blue-200">privacidade, fluidez e simplicidade</span>.
            Utilizando tecnologia peer-to-peer e WebRTC, permitimos que usuários se conectem em tempo real, de forma leve e segura,
            sem a necessidade de cadastros complicados.
          </p>

          <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
            A proposta é proporcionar encontros digitais casuais para conversas rápidas, descontraídas ou profundas, sem histórico,
            sem julgamentos e com total anonimato. Nossa interface minimalista e intuitiva torna a experiência acessível até mesmo
            para quem nunca usou esse tipo de serviço.
          </p>

          <p className="text-gray-400 mb-6 sm:mb-8 leading-relaxed text-xs sm:text-sm">
            O projeto está em fase de desenvolvimento contínuo, com foco em segurança, usabilidade e conexão humana.
            Acreditamos que boas conversas podem surgir dos lugares mais inesperados.
          </p>

          <Link
            to="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 sm:px-6 sm:py-2.5 rounded-lg transition duration-300 text-sm sm:text-base"
          >
            Voltar para a Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
