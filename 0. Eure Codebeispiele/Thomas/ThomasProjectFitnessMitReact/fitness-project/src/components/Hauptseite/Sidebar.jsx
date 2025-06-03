import { useNavigate } from 'react-router-dom';
import '../../styles/Sidebar.css';

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Alles löschen, was beim Login gespeichert wurde
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    // Weiterleitung zum Login
    navigate('/login');
  };

  return (
    <nav className="sidebar">
      <ul>
        <li><button onClick={() => navigate('/hauptseite')}>Hauptseite</button></li>
        <li><button onClick={() => navigate('/videos')}>Videos</button></li>
        <li><button onClick={() => navigate('/cards')}>Lvl-Auswahl</button></li>
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
}


