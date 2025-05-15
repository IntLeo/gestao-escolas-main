import { Link } from 'react-router-dom';

function CardNavigation({ title, description, link }) {
  return (
    <div style={styles.card}>
      <h2 style={{ textAlign: 'center' }}>{title}</h2>
      <p style={{ textAlign: 'center' }}>{description}</p>
      <div style={styles.buttonContainer}>
        <Link to={link}>
          <button style={styles.button}>Acessar</button>
        </Link>
      </div>
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #ccc',
    padding: '16px',
    margin: '16px',
    width: '350px',
    borderRadius: '50px',
    boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%', 
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    margin: '6px 0 15px 0' 
  },
  button: {
    padding: '8px 16px',
    fontSize: '16px',
    cursor: 'pointer',
  }
};

export default CardNavigation;
