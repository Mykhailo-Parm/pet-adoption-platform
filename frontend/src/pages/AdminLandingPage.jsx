import { Link } from 'react-router-dom';

export default function AdminLandingPage() {
  return (
    <div className="container">
      <h1 className="page-title">Адмін-панель</h1>
      <p className="page-subtitle">Модерація роботи платформи.</p>

      <div className="animal-grid">
        <Link to="/admin/shelters" className="animal-card">
          <p className="animal-name">Модерація притулків</p>
          <p className="animal-meta">Затвердження та блокування зареєстрованих притулків</p>
        </Link>
      </div>
    </div>
  );
}
