import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Students from './pages/Students';
import Appointments from './pages/Appointments';
import Professors from './pages/Professors';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<Students />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/professors" element={<Professors />} />

      </Routes>
    </Router>
  );
}

export default App;
