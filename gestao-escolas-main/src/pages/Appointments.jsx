import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModalCadastroAgendamento from "../components/ModalCadastroAgendamento";
import ModalEditarAgendamento from "../components/ModalEditarAgendamento";
import appointmentsSevice from "../services/appointmentsSevice";

function Appointments() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [showModalCadastro, setShowModalCadastro] = useState(false);
  const [showModalEditar, setShowModalEditar] = useState(false);
  const [agendamentoSelecionado, setAgendamentoSelecionado] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAgendamentos();
  }, []);

  const fetchAgendamentos = async () => {
    setLoading(true);
    const lista = await appointmentsSevice.listarAgendamentos();
    setAgendamentos(lista);
    setLoading(false);
  };

  const handleCadastrarAgendamento = async (novoAgendamento) => {
    await appointmentsSevice.cadastrarAgendamento(novoAgendamento);
    fetchAgendamentos();
    setShowModalCadastro(false);
    alert("Agendamento realizado com sucesso!");
  };

  const abrirModalEditar = (agendamento) => {
    setAgendamentoSelecionado(agendamento);
    setShowModalEditar(true);
  };

  const handleEditarAgendamento = async (dadosEditados) => {
    await appointmentsSevice.editarAgendamento(agendamentoSelecionado.id, dadosEditados);
    fetchAgendamentos();
    setShowModalEditar(false);
    setAgendamentoSelecionado(null);
    alert("Agendamento atualizado com sucesso!");
  };

  const cancelarAgendamento = async (agendamento) => {
    // Remova o window.confirm se usar modal de confirmação!
    await appointmentsSevice.cancelarAgendamento(agendamento.id);
    fetchAgendamentos();
    alert("Agendamento cancelado com sucesso!");
  };

  const excluirAgendamento = async (agendamento) => {
    console.log("Excluindo agendamento:", agendamento);

    await appointmentsSevice.excluirAgendamento(agendamento.id);
    fetchAgendamentos();
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Gestão de Agendamentos</h1>
        <button onClick={() => navigate("/")}>Início</button>
      </header>

      <div style={styles.actions}>
        <button onClick={() => setShowModalCadastro(true)}>Novo Agendamento</button>
      </div>

        <table border="1" style={styles.table}>
          <thead>
            <tr>
              <th>Data e Hora</th>
              <th>Professor</th>
              <th>Estudante</th>
              <th>Conteúdo</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {agendamentos.map((agendamento) => (
              <tr key={agendamento.id}>
                <td>{new Date(agendamento.dataHora).toLocaleString()}</td>
                <td>{agendamento.professorNome}</td> {/* Nome do professor */}
                <td>{agendamento.estudanteNome}</td> {/* Nome do estudante */}
                <td>{agendamento.conteudo}</td>
                <td>{agendamento.status}</td>
                <td>
                  <button onClick={() => abrirModalEditar(agendamento)}>Editar</button>
                  <button onClick={() => cancelarAgendamento(agendamento)} style={{ marginLeft: "8px" }}>
                    Cancelar
                  </button>
                  <button onClick={() => excluirAgendamento(agendamento)} style={{ marginLeft: "8px", color: "red" }}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      

      {showModalCadastro && (
        <ModalCadastroAgendamento
          onClose={() => setShowModalCadastro(false)}
          onSave={handleCadastrarAgendamento}
        />
      )}

      {showModalEditar && agendamentoSelecionado && (
        <ModalEditarAgendamento
          agendamento={agendamentoSelecionado}
          onClose={() => {
            setShowModalEditar(false);
            setAgendamentoSelecionado(null);
          }}
          onSave={handleEditarAgendamento}
        />
      )}


    </div>
  );
}

const styles = {
    container: {
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "0",
    boxSizing: "border-box"
  },
  header: {
    width: "100%",
    maxWidth: "900px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "end",
    marginTop: "32px",
    marginBottom: "24px",
  },
  actions: {
    marginBottom: "16px",
    width: "100%",
    maxWidth: "900px",
    display: "flex",
    justifyContent: "end",
    gap: "12px"
  },
    table: {
    width: "100%",
    maxWidth: "900px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    marginBottom: "24px",
  }

};

export default Appointments;
