import Dashboard from "../components/Dashboard";

function Home() {
  const usuario = {
    nome: "Leonardo"
  };

  return (
    <div>
      <header>
        <h2>Bem-vindo {usuario.nome}!</h2>
      </header>
      <Dashboard />
    </div>
  );
}

export default Home;
