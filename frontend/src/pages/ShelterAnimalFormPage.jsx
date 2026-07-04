import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createAnimal, getAnimal, getCatalogFilters, updateAnimal } from '../api/animals';
import { useUser } from '../context/UserContext';
import AnimalForm from '../components/AnimalForm';

export default function ShelterAnimalFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { currentUser } = useUser();
  const navigate = useNavigate();

  const [catalogFilters, setCatalogFilters] = useState({ species: [], breeds: [], cities: [] });
  const [initialValues, setInitialValues] = useState(isEdit ? null : {});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getCatalogFilters().then(setCatalogFilters);
  }, []);

  useEffect(() => {
    if (!isEdit) return;
    getAnimal(id)
      .then((a) =>
        setInitialValues({
          speciesId: a.speciesId ?? '',
          breedId: a.breedId ?? '',
          name: a.name,
          age: a.age ?? '',
          gender: a.gender,
          size: a.size ?? '',
          healthStatus: a.healthStatus ?? '',
          isSterilized: Boolean(a.isSterilized),
          isVaccinated: Boolean(a.isVaccinated),
          description: a.description ?? '',
        })
      )
      .catch(() => setError('Тварину не знайдено.'));
  }, [id, isEdit]);

  async function handleSubmit(values) {
    setSubmitting(true);
    setError('');
    try {
      if (isEdit) {
        await updateAnimal(id, values);
      } else {
        await createAnimal({ ...values, shelterId: currentUser.shelterId });
      }
      navigate('/shelter/animals');
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  }

  const ready = catalogFilters.species.length > 0 && (!isEdit || initialValues);

  return (
    <div className="container">
      <Link to="/shelter/animals" className="btn btn-secondary btn-sm" style={{ marginBottom: 16 }}>
        ← Назад до тварин притулку
      </Link>

      <div className="card" style={{ maxWidth: 560 }}>
        <h1 className="page-title">{isEdit ? 'Редагування картки тварини' : 'Створення картки тварини'}</h1>

        {error && <div className="error-banner">{error}</div>}

        {ready ? (
          <AnimalForm
            catalogFilters={catalogFilters}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            submitting={submitting}
            submitLabel={isEdit ? 'Зберегти зміни' : 'Створити картку'}
          />
        ) : (
          <p className="loading-state">Завантаження…</p>
        )}
      </div>
    </div>
  );
}
