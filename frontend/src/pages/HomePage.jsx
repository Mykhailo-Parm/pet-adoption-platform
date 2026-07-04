import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function HomePage() {
  const { currentUser } = useUser();

  return (
    <div className="container">
      <div className="card" style={{ textAlign: 'center', maxWidth: 640, margin: '40px auto' }}>
        <h1 className="page-title">🐾 Прилаштування тварин</h1>
        <p className="page-subtitle">
          Платформа, що координує адопцію тварин: притулки викладають картки тварин,
          а охочі прилаштувати тварину подають заявки — і весь процес проходить онлайн.
        </p>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: 24 }}>
          Ви зараз переглядаєте сайт як: <strong>{currentUser.fullName}</strong>
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/catalog" className="btn btn-primary">
            Переглянути каталог тварин
          </Link>
          <Link to="/login" className="btn btn-secondary">
            Автентифікація
          </Link>
        </div>
      </div>
    </div>
  );
}
