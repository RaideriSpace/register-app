
# 🚀 Projeto de Autenticação com React e Node.js

Aplicação **Full-Stack** simples e didática que implementa um fluxo completo de autenticação de usuário: registro, login, proteção de rotas e persistência de sessão.  
O **Frontend** é desenvolvido com **React.js**, enquanto o **Backend** utiliza **Node.js (Express.js)** e **MongoDB**.

---

## 🔗 Funcionalidades

- ✅ **Cadastro de Usuário:** criação de conta com nome, e-mail e senha.
- 🔑 **Login de Usuário:** autenticação segura via e-mail e senha.
- 🛡️ **Autenticação via JWT:** sessões gerenciadas através de **JSON Web Tokens**.
- 🔒 **Rotas Protegidas:** apenas usuários autenticados podem acessar páginas restritas.
- 💾 **Persistência de Sessão:** usuário continua logado mesmo após atualizar a página (via `localStorage`).
- ♻️ **Componentes Reutilizáveis:** formulários e botões criados como componentes modulares no React.
- 🗑️ **Exclusão de Conta:** funcionalidade para usuários deletarem suas próprias contas de forma segura.
- ✨ **Validação de Formulários Avançada:** uso de React Hook Form para gerenciamento e validação de formulários.


---

## ⚙️ Tecnologias Utilizadas

### 🖼️ **Frontend (React.js)**
- [React.js](https://react.dev/) — construção da interface.
- [React Router DOM](https://reactrouter.com/) — gerenciamento de rotas SPA.
- [React Hooke Form](https://react-hook-form.com/) — gerenciamento e validação de formulários.
- [PropTypes](https://www.npmjs.com/package/prop-types) — validação de tipos de propriedades em componentes React.
- Context API — controle de estado global (autenticação).
- Fetch API — comunicação HTTP com o backend.
- [Vite](https://vitejs.dev/) — build rápido e moderno para projetos React.
- [Serve](https://www.npmjs.com/package/serve) — para servir o frontend em produção.

### 🔗 **Backend (Node.js + Express)**
- [Node.js](https://nodejs.org/) — ambiente de execução JavaScript.
- [Express.js](https://expressjs.com/) — framework minimalista para API REST.
- [MongoDB](https://www.mongodb.com/) — banco NoSQL para armazenamento de dados de usuários.
- [Mongoose](https://mongoosejs.com/) — ODM para integração com MongoDB.
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) — hash seguro de senhas.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) — geração e verificação de JWT.
- [cors](https://www.npmjs.com/package/cors) — habilitação de CORS.
- [dotenv](https://www.npmjs.com/package/dotenv) — gerenciamento de variáveis de ambiente.

---

## 🚧 Configuração e Execução Local

### 🔍 Pré-requisitos

- [Node.js](https://nodejs.org/) e npm/yarn instalados.
- Instância do **MongoDB** local ou hospedada (ex: Atlas).

---

### 📦 Backend

1. Clone o repositório e acesse a pasta `backend`:
   ```bash
   cd backend
   ```
2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```
3. Crie um arquivo `.env` na raiz de `backend`:
   ```env
   MONGO_URI=mongodb+srv://<usuario>:<senha>@cluster0.mongodb.net/seubanco
   JWT_SECRET=suaChaveUltraSecreta
   PORT=5000
   ```
   > Substitua `<usuario>`, `<senha>` e `suaChaveUltraSecreta` pelos seus dados reais.

4. Inicie o servidor:
   ```bash
   node server.js
   ```
   O backend rodará em [http://localhost:5000](http://localhost:5000).

---

### 🎨 Frontend

1. Abra outro terminal e acesse a pasta `frontend`:
   ```bash
   cd frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```
3. Crie um arquivo `.env.development` na raiz de `frontend`:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. Inicie o projeto React:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```
   O frontend abrirá automaticamente em [http://localhost:5174](http://localhost:5174).

---

## 🧭 Fluxo de Uso

1. Acesse a aplicação e será redirecionado para a tela de **Login**.
2. Clique em "**Cadastre-se**" para criar uma nova conta.
3. Após registro bem-sucedido, será autenticado automaticamente e levado à **Home**.
4. Tentativas de acessar rotas protegidas sem login redirecionarão para o Login.
5. Clique em "**Sair**" para fazer logout.
6. Na Home, você pode clicar em "**Excluir Conta**" para remover sua conta permanentemente.

---

## 🚀 Implantação (Deployment)

Para ambientes de produção (Heroku, Vercel, Netlify, AWS, etc.):

- **Backend:** 
  • URL: https://register-app-backend.onrender.com
  • Configure `MONGO_URI`, `JWT_SECRET`, `PORT` na plataforma de deploy.
- **Frontend:** 
  • URL: https://register-app-frontend.onrender.com
  • Crie `.env.production` com:
    ```env
    VITE_API_BASE_URL=https://register-app-backend.onrender.com/api/auth 
    ```
    > Substitua https://register-app-backend.onrender.com pela URL real do seu serviço de backend no Render.

---

## 🤝 Contribuição

Sinta-se à vontade para abrir issues ou pull requests. Qualquer melhoria é bem-vinda! 😄

---

## 📄 Licença

Este projeto está licenciado sob a licença MIT.
