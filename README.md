# 💬 MeetStranger

**MeetStranger** é uma plataforma de comunicação aleatória entre desconhecidos, desenvolvida com foco em **privacidade**, **fluidez** e **simplicidade**. Utilizando tecnologias modernas como **WebRTC** e **peer-to-peer**, conecta pessoas em tempo real para conversas rápidas, descontraídas ou profundas — tudo isso sem cadastros, sem histórico e com total anonimato.

---

## 🚀 Demonstração

> **Em desenvolvimento contínuo**. Ainda não publicado em produção.

---

## 🧠 Funcionalidades

- ✅ Comunicação anônima e segura (mockado)
- ✅ Interface minimalista e responsiva
- ✅ Formulário de entrada com nome e interesses
- ✅ Exibição de vídeo local e remoto
- ✅ Chat textual com rolagem automática
- ✅ Controles interativos:
  - Alternar câmera
  - Mutar/desmutar microfone
  - Próximo parceiro (mock)
  - Sair da conversa
- ✅ Navegação com React Router
- ✅ Página "Sobre o Projeto"

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Função |
|-----------|--------|
| [React](https://reactjs.org/) | Biblioteca principal da UI |
| [Vite](https://vitejs.dev/) | Ferramenta de build rápida para projetos React |
| [Tailwind CSS](https://tailwindcss.com/) | Framework de estilização utility-first |
| [WebRTC (mockado)](https://webrtc.org/) | Suporte a comunicação peer-to-peer |
| [React Router](https://reactrouter.com/) | Roteamento entre páginas |

---

## 📁 Estrutura do Projeto

```
meet-strangers/
│
├── public/                 # Arquivos públicos
├── src/
│   ├── assets/             # Imagens e ícones
│   ├── components/         # Componentes reutilizáveis
│   │   ├── ChatBox.tsx
│   │   ├── Controls.tsx
│   │   ├── NameForm.tsx
│   │   ├── Navbar.tsx
│   │   └── VideoChat.tsx
│   ├── pages/              # Páginas principais
│   │   ├── About.tsx
│   │   ├── ChatRoom.tsx
│   │   └── Home.tsx
│   ├── App.tsx             # Estrutura de rotas
│   └── main.tsx            # Entrada do app
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

---

## ⚙️ Instalação e Execução

### Pré-requisitos

- [Node.js](https://nodejs.org/en/) (v16+)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Passo a passo

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/meet-strangers.git
   cd meet-strangers
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Execute o projeto**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. **Abra no navegador**
   ```
   http://localhost:5173
   ```

---

## 📌 Observações Técnicas

- A comunicação **WebRTC está simulada (mockada)** nesta fase do projeto. Integrações reais com STUN/TURN e servidores de sinalização estão previstas para versões futuras.
- O armazenamento de dados é feito de forma **temporária** usando `localStorage` (apenas para nome/interesses).

---

## 🔐 Foco em Privacidade

Nenhum dado pessoal é coletado ou armazenado em servidores. Toda comunicação é projetada para ser efêmera, garantindo o anonimato do usuário.

---

## 🧪 Melhorias Futuras

- Integração real com WebRTC + servidor de sinalização
- Matchmaking com base em interesses
- Opção de conversas em áudio ou texto apenas
- Interface adaptada para mobile 100%
- Fim de sessão automático após tempo limite

---

## 👤 Autor

**Jeremias Maya**  
[GitHub](https://github.com/seu-usuario) | [LinkedIn](https://www.linkedin.com/in/jeremiasonunes/)

---

## 📄 Licença

Este projeto está licenciado sob a **MIT License**.  
Sinta-se livre para usar, modificar e contribuir.

---