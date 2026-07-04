import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getAnimal } from '../api/animals';
import { useUser } from '../context/UserContext';
import AnimalStatusBadge from '../components/AnimalStatusBadge';

const GENDER_LABELS = { MALE: 'Самець', FEMALE: 'Самка', UNKNOWN: 'Невідомо' };
const SIZE_LABELS = { SMALL: 'Малий', MEDIUM: 'Середній', LARGE: 'Великий' };

export default function AnimalDetailPage() {
  const { id } = useParams();
  const { currentUser } = useUser();
  const [animal, setAnimal] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setAnimal(null);
    setError('');
    getAnimal(id)
      .then(setAnimal)
      .catch(() => setError('Тварину не знайдено.'));
  }, [id]);

  if (error) {
    return (
      <div className="container">
        <div className="error-banner">{error}</div>
        <Link to="/catalog" className="btn btn-secondary">
          ← Назад до каталогу
        </Link>
      </div>
    );
  }

  if (!animal) {
    return (
      <div className="container">
        <p className="loading-state">Завантаження…</p>
      </div>
    );
  }

  // Публічна картка показує повні дані лише для доступних тварин — тварину,
  // яку вже прилаштовують чи прилаштували, опікуни бачити не повинні.
  if (animal.status !== 'AVAILABLE') {
    return (
      <div className="container">
        <Link to="/catalog" className="btn btn-secondary btn-sm" style={{ marginBottom: 16 }}>
          ← Назад до каталогу
        </Link>
        <div className="empty-state">Ця тварина наразі недоступна для перегляду та адопції.</div>
      </div>
    );
  }

  return (
    <div className="container">
      <Link to="/catalog" className="btn btn-secondary btn-sm" style={{ marginBottom: 16 }}>
        ← Назад до каталогу
      </Link>

      <div className="card">
        <div className="animal-detail-header">
          <div>
            <h1 className="page-title">{animal.name}</h1>
            <p className="page-subtitle" style={{ margin: 0 }}>
              {animal.breedName ?? animal.speciesName} · {animal.shelterName}
              {animal.shelterCity ? `, ${animal.shelterCity}` : ''}
            </p>
          </div>
          <AnimalStatusBadge status={animal.status} />
        </div>

        <div className="animal-detail-grid">
          <div className="detail-field">
            <span className="label">Вид</span>
            {animal.speciesName ?? '—'}
          </div>
          <div className="detail-field">
            <span className="label">Порода</span>
            {animal.breedName ?? '—'}
          </div>
          <div className="detail-field">
            <span className="label">Вік</span>
            {animal.age != null ? `${animal.age} р.` : '—'}
          </div>
          <div className="detail-field">
            <span className="label">Стать</span>
            {GENDER_LABELS[animal.gender] ?? '—'}
          </div>
          <div className="detail-field">
            <span className="label">Розмір</span>
            {animal.size ? SIZE_LABELS[animal.size] : '—'}
          </div>
          <div className="detail-field">
            <span className="label">Стерилізація</span>
            {animal.isSterilized ? 'Так' : 'Ні'}
          </div>
          <div className="detail-field">
            <span className="label">Вакцинація</span>
            {animal.isVaccinated ? 'Так' : 'Ні'}
          </div>
          <div className="detail-field">
            <span className="label">Стан здоров'я</span>
            {animal.healthStatus ?? '—'}
          </div>
        </div>

        {animal.description && (
          <div style={{ marginBottom: 20 }}>
            <span className="label">Опис</span>
            <p>{animal.description}</p>
          </div>
        )}

        {currentUser.role === 'GUARDIAN' && (
          <Link to={`/animals/${animal.id}/apply`} className="btn btn-primary">
            Подати заявку на адопцію
          </Link>
        )}
      </div>
    </div>
  );
}
