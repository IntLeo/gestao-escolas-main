import { useState, useEffect } from "react";
import axios from "axios";

function ModalEditarAgendamento({ agendamento, onClose, onSave }) {
  const [form, setForm] = useState({
    dataHora: "",
    professorCpf: "",
    estudanteCpf: "",
    conteudo: "",
    status: "",
  });
  const [professores, setProfessores] = useState([]);
  const [estudantes, setEstudantes] = useState([]);
  const [erros, setErros] = useState({});

  useEffect(() => {
    buscarProfessores();
    buscarEstudantes();
    preencherFormulario();
  }, []);

  const preencherFormulario = () => {
    setForm({
      dataHora: agendamento.dataHora ? agendamento.dataHora.substring(0, 16) : "",
      professorCpf: agendamento.professorCpf,
      estudanteCpf: agendamento.estudanteCpf,
      conteudo: agendamento.conteudo,
      status: agendamento.status || "",
    });
  };

  const buscarProfessores = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/professores");
      setProfessores(response.data);
    } catch (error) {
      console.error("Erro ao buscar professores", error);
    }
  };

  const buscarEstudantes = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/estudantes");
      setEstudantes(response.data);
    } catch (error) {
      console.error("Erro ao buscar estudantes", error);
    }
  };

  const validar = () => {
    const novosErros = {};

    if (!form.dataHora) novosErros.dataHora = "Data e hora são obrigatórios.";
    if (!form.professorCpf) novosErros.professorCpf = "Selecione um professor.";
    if (!form.estudanteCpf) novosErros.estudanteCpf = "Selecione um estudante.";
    if (!form.conteudo) novosErros.conteudo = "Conteúdo da aula é obrigatório.";
    if (!form.status) novosErros.status = "Selecione o status do agendamento.";

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validar()) {
      onSave(form);
    }
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2>Editar Agendamento</h2>
        <form onSubmit={handleSubmit}>

          <div style={styles.formGroup}>
            <label>Data e Hora*</label>
            <input 
              type="datetime-local" 
              name="dataHora" 
              value={form.dataHora} 
              onChange={handleChange}
            />
            {erros.dataHora && <p style={styles.error}>{erros.dataHora}</p>}
          </div>

          <div style={styles.formGroup}>
            <label>Professor*</label>
            <select name="professorCpf" value={form.professorCpf} onChange={handleChange}>
              <option value="">Selecione um professor</option>
              {professores.map((prof) => (
                <option key={prof.cpf} value={prof.cpf}>
                  {prof.nome}
                </option>
              ))}
            </select>
            {erros.professorCpf && <p style={styles.error}>{erros.professorCpf}</p>}
          </div>

          <div style={styles.formGroup}>
            <label>Estudante*</label>
            <select name="estudanteCpf" value={form.estudanteCpf} onChange={handleChange}>
              <option value="">Selecione um estudante</option>
              {estudantes.map((est) => (
                <option key={est.cpf} value={est.cpf}>
                  {est.nome}
                </option>
              ))}
            </select>
            {erros.estudanteCpf && <p style={styles.error}>{erros.estudanteCpf}</p>}
          </div>

          <div style={styles.formGroup}>
            <label>Conteúdo da Aula*</label>
            <textarea
              name="conteudo"
              value={form.conteudo}
              onChange={handleChange}
              rows="3"
            ></textarea>
            {erros.conteudo && <p style={styles.error}>{erros.conteudo}</p>}
          </div>

          <div style={styles.formGroup}>
            <label>Status*</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="">Selecione o status</option>
              <option value="Em andamento">Em andamento</option>
              <option value="Cancelado">Cancelado</option>
              <option value="Finalizado">Finalizado</option>
            </select>
            {erros.status && <p style={styles.error}>{erros.status}</p>}
          </div>

          <div style={styles.buttonGroup}>
            <button type="submit">Salvar Alterações</button>
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
    width: '450px',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.3)',
    overflowY: 'auto',
    maxHeight: '90vh'
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

export default ModalEditarAgendamento;
