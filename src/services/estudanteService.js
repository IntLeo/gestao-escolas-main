const STORAGE_KEY = "estudantes";

function getEstudantes() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function setEstudantes(estudantes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(estudantes));
}

const estudanteService = {
  listarEstudantes: async () => {
    return getEstudantes();
  },

  cadastrarEstudante: async (estudante) => {
    const estudantes = getEstudantes();
    estudantes.push(estudante);
    setEstudantes(estudantes);
  },

  editarEstudante: async (cpf, estudanteAtualizado) => {
    const estudantes = getEstudantes().map((e) =>
      e.cpf === cpf ? { ...e, ...estudanteAtualizado } : e
    );
    setEstudantes(estudantes);
  },

  excluirEstudante: async (cpf) => {
    const estudantes = getEstudantes().filter((e) => e.cpf !== cpf);
    setEstudantes(estudantes);
  },
};

export default estudanteService;
