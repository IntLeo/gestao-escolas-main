import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModalCadastroProfessor from "../components/ModalCadastroProfessor";
import ModalEditarProfessor from "../components/ModalEditarProfessor";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import professorService from "../services/professorService";

function Professors() {
  const [professores, setProfessores] = useState([]);
  const [search, setSearch] = useState("");
  const [showModalCadastro, setShowModalCadastro] = useState(false);
  const [showModalEditar, setShowModalEditar] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [professorSelecionado, setProfessorSelecionado] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProfessores();
  }, []);

  const fetchProfessores = async () => {
    try {
      setLoading(true);
      const professoresData = await professorService.listarProfessores();
      setProfessores(professoresData);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => setSearch(e.target.value);

  const handleCadastrarProfessor = async (novoProfessor) => {
    try {
      await professorService.cadastrarProfessor(novoProfessor);
      fetchProfessores();
      setShowModalCadastro(false);
    } catch (error) {
    }
  };

  const handleEditarProfessor = (professor) => {
    setProfessorSelecionado(professor);
    setShowModalEditar(true);
  };

  const handleAtualizarProfessor = async (professorAtualizado) => {
    try {
      await professorService.atualizarProfessor(professorAtualizado.cpf, professorAtualizado);
      fetchProfessores();
      setShowModalEditar(false);
    } catch (error) {
    }
  };

  const handleExcluirProfessor = (professor) => {
    setProfessorSelecionado(professor);
    setShowModalDelete(true);
  };

  const handleConfirmarExcluir = async (cpf) => {
    await professorService.excluirProfessor(cpf);
    fetchProfessores();
    setShowModalDelete(false);
  };

  const professoresFiltrados = professores.filter((professor) =>
    professor.nome.toLowerCase().includes(search.toLowerCase()) ||
    professor.cpf.includes(search)
  );

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Gestão de Professores</h1>
        <button onClick={() => navigate("/")}>Início</button>
      </header>

      <div style={styles.actions}>
        <input 
          type="text" 
          placeholder="Pesquisar nome de Professores..." 
          value={search}
          onChange={handleSearch}
          style={styles.input}
        />
        <button style={styles.button} onClick={() => setShowModalCadastro(true)}>Inserir Professor</button>
      </div>
        <table border="1" style={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Especialidade</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {professoresFiltrados.map((professor) => (
              <tr key={professor.cpf}>
                <td>{professor.nome}</td>
                <td>{professor.especialidade || "-"}</td>
                <td>{professor.status}</td>
                <td>
                  <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
                    <button onClick={() => handleEditarProfessor(professor)}>Editar</button>
                    <button onClick={() => handleExcluirProfessor(professor)}>Excluir</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      
      {showModalCadastro && (
        <ModalCadastroProfessor
          onClose={() => setShowModalCadastro(false)}
          onSave={handleCadastrarProfessor}
        />
      )}

      {showModalEditar && professorSelecionado && (
        <ModalEditarProfessor
          professorAtual={professorSelecionado}
          onClose={() => setShowModalEditar(false)}
          onUpdate={handleAtualizarProfessor}
        />
      )}

      {showModalDelete && professorSelecionado && (
        <ConfirmDeleteModal
          pessoa={professorSelecionado}
          tipo="cadastro do professor"
          onCancel={() => setShowModalDelete(false)}
          onConfirm={handleConfirmarExcluir}
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
  input: {
    padding: "8px",
    fontSize: "16px",
    width: "700px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginRight: "10px"
  },
  button: {
    padding: "8px 16px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "none",
    color: "#fff",
    cursor: "pointer"
  },
  table: {
    width: "100%",
    maxWidth: "900px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    marginBottom: "24px",
  }
};

export default Professors;
