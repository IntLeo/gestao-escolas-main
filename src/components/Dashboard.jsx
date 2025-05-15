import CardNavigation from "./CardNavigation";

function Dashboard() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Gestão da Escola</h1>
      
      <div style={styles.cardsContainer}>
        <CardNavigation 
          title="Gestão de Estudantes" 
          description="Gerencie registros e informações de estudantes." 
          link="/students" 
        />
        <CardNavigation 
          title="Gestão de Agendamentos do Estudante" 
          description="Visualize os horários de agendamento dos estudantes." 
          link="/appointments" 
        />
        <CardNavigation 
          title="Gestão de Professores" 
          description="Visualize e gerencie perfis dos professores." 
          link="/professors" 
        />
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '24px',
    textAlign: 'center',
  },
  title: {
    marginBottom: '32px',
  },
  cardsContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '20px',
  }
};

export default Dashboard;
