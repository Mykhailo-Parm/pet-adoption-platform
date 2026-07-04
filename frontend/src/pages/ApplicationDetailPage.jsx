import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getMyApplications } from '../api/applications';
import { useUser } from '../context/UserContext';
import StatusBadge from '../components/StatusBadge';
import { parseApplicantFormData } from '../utils/parseFormData';

export default function ApplicationDetailPage() {
  const { id } = useParams();
  const { currentUser } = useUser();
  const [application, setApplication] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getMyApplications(currentUser.id)
      .then((apps) => {
        const found = apps.find((a) => String(a.id) === id);
        if (!found) {
          setError('Заявку не знайдено.');
        } else {
          setApplication(found);
        }
      })
      .catch(() => setError('Не вдалося завантажити заявку.'));
  }, [id, currentUser.id]);

  if (error) {
    return (
      <div className="container">
        <div className="error-banner">{error}</div>
        <Link to="/account/applications" className="btn btn-secondary">
          ← Назад до моїх заявок
        </Link>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="container">
        <p className="loading-state">Завантаження…</p>
      </div>
    );
  }

  const formFields = parseApplicantFormData(application.applicantFormData);

  return (
    <div className="container">
      <Link to="/account/applications" className="btn btn-secondary btn-sm" style={{ marginBottom: 16 }}>
        ← Назад до моїх заявок
      </Link>

      <div className="card" style={{ maxWidth: 560 }}>
        <div className="animal-detail-header">
          <div>
            <h1 className="page-title">Заявка на «{application.animalName}»</h1>
            <p className="page-subtitle" style={{ margin: 0 }}>
              Притулок: {application.shelterName}
            </p>
          </div>
          <StatusBadge status={application.status} />
        </div>

        <div className="animal-detail-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div className="detail-field">
            <span className="label">Подано</span>
            {new Date(application.applicationDate).toLocaleString('uk-UA')}
          </div>
          <div className="detail-field">
            <span className="label">Останнє оновлення</span>
            {new Date(application.lastUpdateDate).toLocaleString('uk-UA')}
          </div>
        </div>

        <h3>Анкета заявника</h3>
        {formFields.map((f) => (
          <div key={f.label} className="detail-field" style={{ marginBottom: 10 }}>
            <span className="label">{f.label}</span>
            {f.value}
          </div>
        ))}
      </div>
    </div>
  );
}
