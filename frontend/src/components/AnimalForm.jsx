import { useState } from 'react';

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

const EMPTY_VALUES = {
  speciesId: '',
  breedId: '',
  name: '',
  age: '',
  gender: 'UNKNOWN',
  size: '',
  healthStatus: '',
  isSterilized: false,
  isVaccinated: false,
  microchipNumber: '',
  description: '',
};

export default function AnimalForm({ catalogFilters, initialValues, onSubmit, submitting, submitLabel }) {
  const [values, setValues] = useState({ ...EMPTY_VALUES, ...initialValues });

  const breedOptions = values.speciesId
    ? catalogFilters.breeds.filter((b) => String(b.speciesId) === String(values.speciesId))
    : catalogFilters.breeds;

  function update(key, value) {
    setValues((prev) => ({ ...prev, [key]: value, ...(key === 'speciesId' ? { breedId: '' } : {}) }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      ...values,
      speciesId: Number(values.speciesId),
      breedId: values.breedId ? Number(values.breedId) : null,
      age: values.age ? Number(values.age) : null,
      size: values.size || null,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="name">Кличка</label>
        <input id="name" required value={values.name} onChange={(e) => update('name', e.target.value)} />
      </div>

      <div className="animal-detail-grid">
        <div className="form-field">
          <label htmlFor="speciesId">Вид</label>
          <select id="speciesId" required value={values.speciesId} onChange={(e) => update('speciesId', e.target.value)}>
            <option value="">Оберіть вид</option>
            {catalogFilters.species.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="breedId">Порода</label>
          <select id="breedId" value={values.breedId} onChange={(e) => update('breedId', e.target.value)}>
            <option value="">Не вказано</option>
            {breedOptions.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="age">Вік (років)</label>
          <input id="age" type="number" min="0" value={values.age} onChange={(e) => update('age', e.target.value)} />
        </div>

        <div className="form-field">
          <label htmlFor="gender">Стать</label>
          <select id="gender" value={values.gender} onChange={(e) => update('gender', e.target.value)}>
            {GENDER_OPTIONS.map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="size">Розмір</label>
          <select id="size" value={values.size ?? ''} onChange={(e) => update('size', e.target.value)}>
            <option value="">Не вказано</option>
            {SIZE_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="microchipNumber">Номер мікрочипа</label>
          <input
            id="microchipNumber"
            value={values.microchipNumber ?? ''}
            onChange={(e) => update('microchipNumber', e.target.value)}
          />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="healthStatus">Стан здоров'я</label>
        <textarea
          id="healthStatus"
          rows={2}
          value={values.healthStatus ?? ''}
          onChange={(e) => update('healthStatus', e.target.value)}
        />
      </div>

      <div className="form-field">
        <label htmlFor="description">Опис</label>
        <textarea
          id="description"
          rows={3}
          value={values.description ?? ''}
          onChange={(e) => update('description', e.target.value)}
        />
      </div>

      <div className="form-field" style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <input
          id="isSterilized"
          type="checkbox"
          checked={values.isSterilized}
          onChange={(e) => update('isSterilized', e.target.checked)}
        />
        <label htmlFor="isSterilized" style={{ margin: 0 }}>
          Стерилізовано
        </label>
      </div>

      <div className="form-field" style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <input
          id="isVaccinated"
          type="checkbox"
          checked={values.isVaccinated}
          onChange={(e) => update('isVaccinated', e.target.checked)}
        />
        <label htmlFor="isVaccinated" style={{ margin: 0 }}>
          Вакциновано
        </label>
      </div>

      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? 'Збереження…' : submitLabel}
      </button>
    </form>
  );
}
