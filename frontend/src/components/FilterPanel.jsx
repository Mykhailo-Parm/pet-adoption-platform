const GENDER_OPTIONS = [
  { value: 'MALE', label: 'Самець' },
  { value: 'FEMALE', label: 'Самка' },
  { value: 'UNKNOWN', label: 'Невідомо' },
];

const SIZE_OPTIONS = [
  { value: 'SMALL', label: 'Малий' },
  { value: 'MEDIUM', label: 'Середній' },
  { value: 'LARGE', label: 'Великий' },
];

export default function FilterPanel({ catalogFilters, filters, onChange }) {
  const breedOptions = filters.speciesId
    ? catalogFilters.breeds.filter((b) => String(b.speciesId) === String(filters.speciesId))
    : catalogFilters.breeds;

  function handleChange(key, value) {
    if (key === 'speciesId') {
      onChange({ ...filters, speciesId: value, breedId: '' });
    } else {
      onChange({ ...filters, [key]: value });
    }
  }

  return (
    <div className="filter-panel">
      <div className="filter-field">
        <label htmlFor="filter-species">Вид тварини</label>
        <select
          id="filter-species"
          value={filters.speciesId}
          onChange={(e) => handleChange('speciesId', e.target.value)}
        >
          <option value="">Будь-який</option>
          {catalogFilters.species.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-field">
        <label htmlFor="filter-breed">Порода</label>
        <select
          id="filter-breed"
          value={filters.breedId}
          onChange={(e) => handleChange('breedId', e.target.value)}
        >
          <option value="">Будь-яка</option>
          {breedOptions.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-field">
        <label htmlFor="filter-city">Місто притулку</label>
        <select
          id="filter-city"
          value={filters.city}
          onChange={(e) => handleChange('city', e.target.value)}
        >
          <option value="">Будь-яке</option>
          {catalogFilters.cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-field">
        <label htmlFor="filter-gender">Стать</label>
        <select
          id="filter-gender"
          value={filters.gender}
          onChange={(e) => handleChange('gender', e.target.value)}
        >
          <option value="">Будь-яка</option>
          {GENDER_OPTIONS.map((g) => (
            <option key={g.value} value={g.value}>
              {g.label}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-field">
        <label htmlFor="filter-size">Розмір</label>
        <select
          id="filter-size"
          value={filters.size}
          onChange={(e) => handleChange('size', e.target.value)}
        >
          <option value="">Будь-який</option>
          {SIZE_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
