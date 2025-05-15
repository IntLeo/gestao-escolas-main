import { useState } from "react";

function ModalCadastroProfessor({ onClose, onSave }) {
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [status, setStatus] = useState("ativo"); // Valor padrão "ativo"
  const [erros, setErros] = useState({});

  const validar = () => {
    const novosErros = {};

    if (!cpf) novosErros.cpf = "CPF é obrigatório.";
    if (!nome) novosErros.nome = "Nome e sobrenome são obrigatórios.";
    if (!dataNascimento) novosErros.dataNascimento = "Data de nascimento é obrigatória.";

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validar()) {
      const novoProfessor = {
        cpf,
        nome,
        dataNascimento,
        especialidade,
        status
      };
      onSave(novoProfessor);
    }
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2>Inserir Professor</h2>
        <form onSubmit={handleSubmit}>

          <div style={styles.formGroup}>
            <label>CPF*</label>
            <input
              type="text"
              placeholder="Digite o CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
            {erros.cpf && <p style={styles.error}>{erros.cpf}</p>}
          </div>

          <div style={styles.formGroup}>
            <label>Nome e Sobrenome*</label>
            <input
              type="text"
              placeholder="Digite o nome e sobrenome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            {erros.nome && <p style={styles.error}>{erros.nome}</p>}
          </div>

          <div style={styles.formGroup}>
            <label>Data de Nascimento*</label>
            <input
              type="date"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
            />
            {erros.dataNascimento && <p style={styles.error}>{erros.dataNascimento}</p>}
          </div>

          <div style={styles.formGroup}>
            <label>Especialidade</label>
            <input
              type="text"
              placeholder="Inglês, espanhol..."
              value={especialidade}
              onChange={(e) => setEspecialidade(e.target.value)}
            />
          </div>

          <div style={styles.formGroup}>
            <label>
              <input
                type="checkbox"
                checked={status === "ativo"}
                onChange={(e) => setStatus(e.target.checked ? "ativo" : "inativo")}
              />
              Ativo
            </label>
          </div>

          <div style={styles.buttonGroup}>
            <button type="submit">Salvar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>

        </form>
      </div>
    </div>
  );
}

const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modalContent: {
    padding: '30px',
    borderRadius: '8px',
    width: '400px',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.3)',
  },
  formGroup: {
    marginBottom: '16px'
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px'
  },
  error: {
    color: 'red',
    fontSize: '12px',
    marginTop: '4px'
  }
};

export default ModalCadastroProfessor;
