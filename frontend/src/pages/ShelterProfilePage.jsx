import { useEffect, useState } from 'react';
import { getShelter } from '../api/shelters';
import { useUser } from '../context/UserContext';

export default function ShelterProfilePage() {
  const { currentUser } = useUser();
  const [shelter, setShelter] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getShelter(currentUser.shelterId)
      .then(setShelter)
      .catch(() => setError('Не вдалося завантажити профіль притулку.'));
  }, [currentUser.shelterId]);

  return (
    <div className="container">
      <h1 className="page-title">Профіль притулку</h1>

      {error && <div className="error-banner">{error}</div>}

      {!shelter ? (
        <p className="loading-state">Завантаження…</p>
      ) : (
        <div className="card" style={{ maxWidth: 480 }}>
          <div className="animal-detail-grid" style={{ gridTemplateColumns: '1fr' }}>
            <div className="detail-field">
              <span className="label">Назва</span>
              {shelter.name}
            </div>
            <div className="detail-field">
              <span className="label">Email</span>
              {shelter.contactEmail}
            </div>
            <div className="detail-field">
              <span className="label">Телефон</span>
              {shelter.contactPhone}
            </div>
            <div className="detail-field">
              <span className="label">Місто</span>
              {shelter.city ?? '—'}
            </div>
            <div className="detail-field">
              <span className="label">Статус притулку</span>
              {shelter.status}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
