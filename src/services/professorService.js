const STORAGE_KEY = "professores";

function getProfessores() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function setProfessores(professores) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(professores));
}

const professorService = {
  listarProfessores: async () => {
    return getProfessores();
  },

  cadastrarProfessor: async (professor) => {
    const professores = getProfessores();
    professores.push(professor);
    setProfessores(professores);
  },

  excluirProfessor: async (cpf) => {
    const professores = getProfessores().filter((p) => p.cpf !== cpf);
    setProfessores(professores);
  },

  atualizarProfessor: async (cpf, professorAtualizado) => {
    const professores = getProfessores().map((p) =>
      p.cpf === cpf ? { ...p, ...professorAtualizado } : p
    );
    setProfessores(professores);
  }
};

export default professorService;
