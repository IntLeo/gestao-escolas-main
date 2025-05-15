function ConfirmDeleteModal({ pessoa, tipo = "cadastro", onCancel, onConfirm }) {
  if (!pessoa) return null; // Evita erro se pessoa for undefined

  // Usa nome ou outro identificador se não houver nome
  const nomeExibido = pessoa.nome || pessoa.email || pessoa.cpf || "registro";

  // Usa cpf, id ou outro identificador para exclusão
  const identificador = pessoa.cpf || pessoa.id;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2>Confirmação de Exclusão</h2>
        <p>
          Deseja realmente excluir o {tipo} <strong>{nomeExibido}</strong>?
        </p>
        <div style={styles.buttonGroup}>
          <button style={styles.cancelButton} onClick={onCancel}>Cancelar</button>
          <button
            style={styles.confirmButton}
            onClick={() => onConfirm(identificador)}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.95)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {

    padding: '30px',
    borderRadius: '8px',
    width: '400px',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.3)',
    textAlign: 'center',
  },
  buttonGroup: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-around',
  },
  cancelButton: {
    backgroundColor: 'gray',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  confirmButton: {
    backgroundColor: 'red',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default ConfirmDeleteModal;
