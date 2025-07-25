import React from 'react';
import NameForm from '../components/NameForm';
import logo from '../assets/meet-strangers.png';


export default function Home() {
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-900 via-black to-blue-950 text-white overflow-hidden">
      <div className="flex flex-col items-center justify-center flex-1 px-4 py-4">
        {/* Logo */}
        <img
          src={logo}
          alt="MeetStranger Logo"
          className="w-48 h-48 mb-4 drop-shadow-lg animate-pulse"
        />

        {/* Formulário */}
        <NameForm />

        
      </div>
    </div>
  );
}
