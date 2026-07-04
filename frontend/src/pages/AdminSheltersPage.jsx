import { useEffect, useState } from 'react';
import { getShelters, updateShelterStatus } from '../api/shelters';
import ShelterStatusBadge from '../components/ShelterStatusBadge';

export default function AdminSheltersPage() {
  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    load();
  }, []);

  function load() {
    setLoading(true);
    getShelters()
      .then(setShelters)
      .catch(() => setError('Не вдалося завантажити список притулків.'))
      .finally(() => setLoading(false));
  }

  async function handleStatusChange(id, status) {
    setUpdatingId(id);
    setError('');
    try {
      const updated = await updateShelterStatus(id, status);
      setShelters((prev) => prev.map((s) => (s.id === id ? updated : s)));
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div className="container">
      <h1 className="page-title">Модерація притулків</h1>

      {error && <div className="error-banner">{error}</div>}

      {loading ? (
        <p className="loading-state">Завантаження…</p>
      ) : (
        <div className="application-list">
          {shelters.map((s) => (
            <div key={s.id} className="application-row">
              <div className="info">
                <h3>{s.name}</h3>
                <p>{s.contactEmail} · {s.contactPhone}</p>
                <p>{s.city ?? '—'}</p>
              </div>
              <div className="application-actions">
                <ShelterStatusBadge status={s.status} />
                {s.status !== 'APPROVED' && (
                  <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    disabled={updatingId === s.id}
                    onClick={() => handleStatusChange(s.id, 'APPROVED')}
                  >
                    Затвердити
                  </button>
                )}
                {s.status !== 'BLOCKED' && (
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    disabled={updatingId === s.id}
                    onClick={() => handleStatusChange(s.id, 'BLOCKED')}
                  >
                    Заблокувати
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
