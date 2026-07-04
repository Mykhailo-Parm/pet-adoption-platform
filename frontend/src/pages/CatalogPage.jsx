import { useEffect, useState } from 'react';
import { getAnimals, getCatalogFilters } from '../api/animals';
import FilterPanel from '../components/FilterPanel';
import AnimalCard from '../components/AnimalCard';

const EMPTY_FILTERS = { speciesId: '', breedId: '', city: '', gender: '', size: '' };

export default function CatalogPage() {
  const [catalogFilters, setCatalogFilters] = useState({ species: [], breeds: [], cities: [] });
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getCatalogFilters()
      .then(setCatalogFilters)
      .catch(() => setError('Не вдалося завантажити довідники фільтрів.'));
  }, []);

  useEffect(() => {
    setLoading(true);
    setError('');
    getAnimals(filters)
      .then(setAnimals)
      .catch(() => setError('Не вдалося завантажити каталог тварин.'))
      .finally(() => setLoading(false));
  }, [filters]);

  return (
    <div className="container">
      <h1 className="page-title">Каталог тварин</h1>
      <p className="page-subtitle">Тварини, які наразі шукають дім. Скористайтесь фільтрами, щоб звузити пошук.</p>

      <FilterPanel catalogFilters={catalogFilters} filters={filters} onChange={setFilters} />

      {error && <div className="error-banner">{error}</div>}

      {loading ? (
        <p className="loading-state">Завантаження…</p>
      ) : animals.length === 0 ? (
        <p className="empty-state">За обраними фільтрами тварин не знайдено.</p>
      ) : (
        <div className="animal-grid">
          {animals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>
      )}
    </div>
  );
}
