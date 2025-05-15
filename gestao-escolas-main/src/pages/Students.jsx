import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModalCadastroEstudante from "../components/ModalCadastroEstudante";
import ModalEditarEstudante from "../components/ModalEditarEstudante";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import estudanteService from "../services/estudanteService";

function Students() {
  const [estudantes, setEstudantes] = useState([]);
  const [showModalCadastro, setShowModalCadastro] = useState(false);
  const [showModalEditar, setShowModalEditar] = useState(false);
  const [estudanteSelecionado, setEstudanteSelecionado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    estudanteService.listarEstudantes().then(setEstudantes);
  }, []);

  const handleCadastrarEstudante = async (novoEstudante) => {
    setLoading(true);
    try {
      await estudanteService.cadastrarEstudante(novoEstudante);
      const listaAtualizada = await estudanteService.listarEstudantes();
      setEstudantes(listaAtualizada);
      setShowModalCadastro(false);
      console.log("Lista atualizada:", listaAtualizada);
    } catch (error) {
      console.error("Erro ao cadastrar estudante:", error);
    } finally {
      setLoading(false);
    }
  };

  const abrirModalEditar = (estudante) => {
    setEstudanteSelecionado(estudante);
    setShowModalEditar(true);
  };

  const handleEditarEstudante = async (dadosEditados) => {
    setLoading(true);
    try {
      await estudanteService.editarEstudante(dadosEditados.cpf, dadosEditados);
      const listaAtualizada = await estudanteService.listarEstudantes();
      setEstudantes(listaAtualizada);
      setShowModalEditar(false);
      setEstudanteSelecionado(null);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  // Novo: função só faz a exclusão, sem window.confirm
  const excluirEstudante = async (cpf) => {
    setLoading(true);
    try {
      await estudanteService.excluirEstudante(cpf);
      const listaAtualizada = await estudanteService.listarEstudantes();
      setEstudantes(listaAtualizada);
    } catch (error) {
    } finally {
      setLoading(false);
      setShowConfirmDeleteModal(false);
      setEstudanteSelecionado(null);
    }
  };

  // Novo: abre o modal de confirmação
  const abrirModalExcluir = (estudante) => {
    setEstudanteSelecionado(estudante);
    setShowConfirmDeleteModal(true);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Gestão de Estudantes</h1>
        <button onClick={() => navigate("/")}>Início</button>
      </header>

      <div style={styles.actions}>
        <button onClick={() => setShowModalCadastro(true)}>Novo Estudante</button>
      </div>
      <table border="1" style={styles.table}>
        <thead>
          <tr>
            <th>CPF</th>
            <th>Nome</th>
            <th>Telefone</th>
            <th>WhatsApp</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>

          {estudantes.map((estudante) => (
            <tr key={estudante.cpf}>
              <td>{estudante.cpf}</td>
              <td>{estudante.nome}</td>
              <td>{estudante.telefone}</td>
              <td>
                <a
                  href={`https://api.whatsapp.com/send?phone=55${estudante.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </td>
              <td>
                <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
                  <button onClick={() => abrirModalEditar(estudante)}>Editar</button>
                  <button onClick={() => abrirModalExcluir(estudante)}>
                    Excluir
                  </button>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModalCadastro && (
        <ModalCadastroEstudante
          onClose={() => setShowModalCadastro(false)}
          onSave={handleCadastrarEstudante}
        />
      )}

      {showModalEditar && estudanteSelecionado && (
        <ModalEditarEstudante
          estudante={estudanteSelecionado}
          onClose={() => {
            setShowModalEditar(false);
            setEstudanteSelecionado(null);
          }}
          onSave={handleEditarEstudante}
        />
      )}

      {showConfirmDeleteModal && estudanteSelecionado && (
        <ConfirmDeleteModal
          pessoa={estudanteSelecionado}
          tipo="cadastro do estudante"
          onCancel={() => setShowConfirmDeleteModal(false)}
          onConfirm={(cpf) => excluirEstudante(cpf)}
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
  },
  table: {
    width: "100%",
    maxWidth: "900px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    marginBottom: "24px",
  },

};

export default Students;
