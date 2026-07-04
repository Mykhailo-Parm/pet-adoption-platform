import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function AccountLandingPage() {
  const { currentUser } = useUser();

  return (
    <div className="container">
      <h1 className="page-title">Кабінет опікуна</h1>
      <p className="page-subtitle">Вітаємо, {currentUser.fullName}!</p>

      <div className="animal-grid">
        <Link to="/account/applications" className="animal-card">
          <p className="animal-name">Мої заявки</p>
          <p className="animal-meta">Перегляд поданих заявок на адопцію та їх статусів</p>
        </Link>
        <Link to="/account/profile" className="animal-card">
          <p className="animal-name">Профіль</p>
          <p className="animal-meta">Особисті дані</p>
        </Link>
      </div>
    </div>
  );
}
