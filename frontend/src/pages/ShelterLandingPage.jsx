import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function ShelterLandingPage() {
  const { currentUser } = useUser();

  return (
    <div className="container">
      <h1 className="page-title">Дашборд притулку</h1>
      <p className="page-subtitle">{currentUser.shelterName} · представник: {currentUser.fullName}</p>

      <div className="animal-grid">
        <Link to="/shelter/animals" className="animal-card">
          <p className="animal-name">Тварини притулку</p>
          <p className="animal-meta">Керування картками тварин: створення, редагування</p>
        </Link>
        <Link to="/shelter/applications" className="animal-card">
          <p className="animal-name">Вхідні заявки</p>
          <p className="animal-meta">Обробка заявок на адопцію від опікунів</p>
        </Link>
        <Link to="/shelter/profile" className="animal-card">
          <p className="animal-name">Профіль притулку</p>
          <p className="animal-meta">Контактні дані та адреса</p>
        </Link>
      </div>
    </div>
  );
}
