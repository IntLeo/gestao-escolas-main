const STORAGE_KEY = "agendamentos";

function getAgendamentos() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function setAgendamentos(agendamentos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(agendamentos));
}

const agendamentoService = {
  listarAgendamentos: async () => {
    return getAgendamentos();
  },

  cadastrarAgendamento: async (agendamento) => {
    const agendamentos = getAgendamentos();
    // Gera um id simples
    agendamento.id = Date.now();
    agendamento.status = "Ativo";
    agendamentos.push(agendamento);
    setAgendamentos(agendamentos);
  },

  editarAgendamento: async (id, agendamentoAtualizado) => {
    const agendamentos = getAgendamentos().map((a) =>
      a.id === id ? { ...a, ...agendamentoAtualizado } : a
    );
    setAgendamentos(agendamentos);
  },

  cancelarAgendamento: async (id) => {
    const agendamentos = getAgendamentos().map((a) =>
      a.id === id ? { ...a, status: "Cancelado" } : a
    );
    setAgendamentos(agendamentos);
  },

  excluirAgendamento: async (id) => {
    const agendamentos = getAgendamentos().filter((a) => a.id !== id);
    setAgendamentos(agendamentos);
  },
};

export default agendamentoService;