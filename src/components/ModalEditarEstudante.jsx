import { useState, useEffect } from "react";
import axios from "axios";

function ModalEditarEstudante({ estudanteAtual, onClose, onUpdate }) {
  const [form, setForm] = useState({ ...estudanteAtual });
  const [erros, setErros] = useState({});
  const [loadingCep, setLoadingCep] = useState(false);

  const estados = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
                   "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
                   "RS", "RO", "RR", "SC", "SP", "SE", "TO"];

  useEffect(() => {
    setForm({ ...estudanteAtual });
  }, [estudanteAtual]);

  const validar = () => {
    const novosErros = {};

    if (!form.nome) novosErros.nome = "Nome e sobrenome são obrigatórios.";
    if (!form.cep) novosErros.cep = "CEP é obrigatório.";
    if (!form.logradouro) novosErros.logradouro = "Logradouro é obrigatório.";
    if (!form.numero) novosErros.numero = "Número é obrigatório.";
    if (!form.bairro) novosErros.bairro = "Bairro é obrigatório.";
    if (!form.estado) novosErros.estado = "Estado é obrigatório.";
    if (!form.cidade) novosErros.cidade = "Cidade é obrigatória.";
    if (!form.whatsapp) novosErros.whatsapp = "WhatsApp é obrigatório.";

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const buscarCep = async () => {
    if (!form.cep) return;
    try {
      setLoadingCep(true);
      const response = await axios.get(`https://viacep.com.br/ws/${form.cep}/json/`);
      if (response.data.erro) {
        alert("CEP não encontrado.");
      } else {
        setForm(prev => ({
          ...prev,
          logradouro: response.data.logradouro || "",
          bairro: response.data.bairro || "",
          estado: response.data.uf || "",
          cidade: response.data.localidade || ""
        }));
      }
    } catch (error) {
      alert("Erro ao buscar o CEP.");
    } finally {
      setLoadingCep(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validar()) {
      onUpdate(form);
    }
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2>Edição de Estudante</h2>
        <form onSubmit={handleSubmit}>

          <div style={styles.formGroup}>
            <label>CPF</label>
            <input type="text" name="cpf" value={form.cpf} disabled />
          </div>

          <div style={styles.formGroup}>
            <label>Nome e Sobrenome*</label>
            <input type="text" name="nome" value={form.nome} onChange={handleChange} />
            {erros.nome && <p style={styles.error}>{erros.nome}</p>}
          </div>

          <div style={styles.formGroup}>
            <label>Data de Nascimento</label>
            <input type="date" name="dataNascimento" value={form.dataNascimento || ""} onChange={handleChange} />
          </div>

          <div style={styles.formGroup}>
            <label>CEP*</label>
            <input type="text" name="cep" value={form.cep} onChange={handleChange} onBlur={buscarCep} />
            {loadingCep && <small>Buscando CEP...</small>}
            {erros.cep && <p style={styles.error}>{erros.cep}</p>}
          </div>

          <div style={styles.formGroup}>
            <label>Logradouro*</label>
            <input type="text" name="logradouro" value={form.logradouro} onChange={handleChange} />
            {erros.logradouro && <p style={styles.error}>{erros.logradouro}</p>}
          </div>

          <div style={styles.formGroup}>
            <label>Número*</label>
            <input type="text" name="numero" value={form.numero} onChange={handleChange} placeholder="Digite número ou 'SN'" />
            {erros.numero && <p style={styles.error}>{erros.numero}</p>}
          </div>

          <div style={styles.formGroup}>
            <label>Bairro*</label>
            <input type="text" name="bairro" value={form.bairro} onChange={handleChange} />
            {erros.bairro && <p style={styles.error}>{erros.bairro}</p>}
          </div>

          <div style={styles.formGroup}>
            <label>Estado*</label>
            <select name="estado" value={form.estado} onChange={handleChange}>
              <option value="">Selecione</option>
              {estados.map((uf) => (
                <option key={uf} value={uf}>{uf}</option>
              ))}
            </select>
            {erros.estado && <p style={styles.error}>{erros.estado}</p>}
          </div>

          <div style={styles.formGroup}>
            <label>Cidade*</label>
            <input type="text" name="cidade" value={form.cidade} onChange={handleChange} />
            {erros.cidade && <p style={styles.error}>{erros.cidade}</p>}
          </div>

          <div style={styles.formGroup}>
            <label>Telefone/Celular</label>
            <input type="text" name="telefone" value={form.telefone} onChange={handleChange} />
          </div>

          <div style={styles.formGroup}>
            <label>WhatsApp*</label>
            <input type="text" name="whatsapp" value={form.whatsapp} onChange={handleChange} />
            {erros.whatsapp && <p style={styles.error}>{erros.whatsapp}</p>}
          </div>

          <div style={styles.formGroup}>
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} />
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
    width: '400px',
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

export default ModalEditarEstudante;
