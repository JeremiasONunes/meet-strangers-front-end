import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className="relative h-screen w-full bg-gradient-to-br from-blue-900 via-black to-blue-950 text-white overflow-hidden">

            {/* Card centralizado no meio da tela */}
      <div className="h-full flex items-center justify-center px-4">
        <div className="bg-black/50 backdrop-blur-md rounded-2xl shadow-2xl p-10 max-w-2xl w-full text-center border border-blue-800">
          <h2 className="text-4xl font-bold mb-6 text-blue-400 drop-shadow">
            Sobre o MeetStranger
          </h2>

          <p className="text-gray-200 mb-6 leading-relaxed text-lg">
            O <strong className="text-blue-300">MeetStranger</strong> é uma plataforma de comunicação aleatória entre desconhecidos,
            desenvolvida com foco em <span className="font-semibold text-blue-200">privacidade, fluidez e simplicidade</span>.
            Utilizando tecnologia peer-to-peer e WebRTC, permitimos que usuários se conectem em tempo real, de forma leve e segura,
            sem a necessidade de cadastros complicados.
          </p>

          <p className="text-gray-300 mb-6 leading-relaxed">
            A proposta é proporcionar encontros digitais casuais para conversas rápidas, descontraídas ou profundas, sem histórico,
            sem julgamentos e com total anonimato. Nossa interface minimalista e intuitiva torna a experiência acessível até mesmo
            para quem nunca usou esse tipo de serviço.
          </p>

          <p className="text-gray-400 mb-8 leading-relaxed text-sm">
            O projeto está em fase de desenvolvimento contínuo, com foco em segurança, usabilidade e conexão humana.
            Acreditamos que boas conversas podem surgir dos lugares mais inesperados.
          </p>

          <Link
            to="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl transition duration-300"
          >
            Voltar para a Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default About
