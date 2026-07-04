import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAnimalsByShelter } from '../api/animals';
import { useUser } from '../context/UserContext';
import AnimalStatusBadge from '../components/AnimalStatusBadge';

export default function ShelterAnimalsPage() {
  const { currentUser } = useUser();
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getAnimalsByShelter(currentUser.shelterId)
      .then(setAnimals)
      .catch(() => setError('Не вдалося завантажити тварин притулку.'))
      .finally(() => setLoading(false));
  }, [currentUser.shelterId]);

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 className="page-title">Тварини притулку</h1>
          <p className="page-subtitle" style={{ margin: 0 }}>{currentUser.shelterName}</p>
        </div>
        <Link to="/shelter/animals/new" className="btn btn-primary">
          + Додати тварину
        </Link>
      </div>

      {error && <div className="error-banner">{error}</div>}

      {loading ? (
        <p className="loading-state">Завантаження…</p>
      ) : animals.length === 0 ? (
        <p className="empty-state">У притулку ще немає доданих тварин.</p>
      ) : (
        <div className="application-list" style={{ marginTop: 20 }}>
          {animals.map((a) => (
            <Link key={a.id} to={`/shelter/animals/${a.id}/edit`} className="application-row">
              <div className="info">
                <h3>{a.name}</h3>
                <p>{a.breedName ?? a.speciesName}</p>
              </div>
              <AnimalStatusBadge status={a.status} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
