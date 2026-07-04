import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getMyApplications } from '../api/applications';
import { useUser } from '../context/UserContext';
import StatusBadge from '../components/StatusBadge';

export default function GuardianCabinetPage() {
  const { currentUser } = useUser();
  const location = useLocation();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    getMyApplications(currentUser.id)
      .then(setApplications)
      .catch(() => setError('Не вдалося завантажити заявки.'))
      .finally(() => setLoading(false));
  }, [currentUser.id]);

  return (
    <div className="container">
      <h1 className="page-title">Мої заявки</h1>
      <p className="page-subtitle">Заявник: {currentUser.fullName}</p>

      {location.state?.justSubmitted && (
        <div className="success-banner">Заявку успішно надіслано!</div>
      )}
      {error && <div className="error-banner">{error}</div>}

      {loading ? (
        <p className="loading-state">Завантаження…</p>
      ) : applications.length === 0 ? (
        <div className="empty-state">
          <p>У вас ще немає поданих заявок.</p>
          <Link to="/catalog" className="btn btn-primary" style={{ marginTop: 12 }}>
            Переглянути каталог тварин
          </Link>
        </div>
      ) : (
        <div className="application-list">
          {applications.map((app) => (
            <Link key={app.id} to={`/account/applications/${app.id}`} className="application-row">
              <div className="info">
                <h3>{app.animalName}</h3>
                <p>Притулок: {app.shelterName}</p>
                <p>Подано: {new Date(app.applicationDate).toLocaleString('uk-UA')}</p>
              </div>
              <StatusBadge status={app.status} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
