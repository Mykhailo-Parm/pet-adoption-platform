import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getIncomingApplications } from '../api/applications';
import { useUser } from '../context/UserContext';
import StatusBadge from '../components/StatusBadge';

export default function ShelterApplicationsPage() {
  const { currentUser } = useUser();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getIncomingApplications(currentUser.shelterId)
      .then(setApplications)
      .catch(() => setError('Не вдалося завантажити заявки притулку.'))
      .finally(() => setLoading(false));
  }, [currentUser.shelterId]);

  return (
    <div className="container">
      <h1 className="page-title">Вхідні заявки</h1>
      <p className="page-subtitle">{currentUser.shelterName}</p>

      {error && <div className="error-banner">{error}</div>}

      {loading ? (
        <p className="loading-state">Завантаження…</p>
      ) : applications.length === 0 ? (
        <p className="empty-state">Вхідних заявок поки немає.</p>
      ) : (
        <div className="application-list">
          {applications.map((app) => (
            <Link key={app.id} to={`/shelter/applications/${app.id}`} className="application-row">
              <div className="info">
                <h3>{app.animalName}</h3>
                <p>Заявник: {app.userFullName}</p>
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
