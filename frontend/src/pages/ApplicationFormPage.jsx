import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getAnimal } from '../api/animals';
import { createApplication } from '../api/applications';
import { useUser } from '../context/UserContext';

const INITIAL_FORM = {
  reason: '',
  livingConditions: '',
  experience: '',
  contactPhone: '',
};

export default function ApplicationFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useUser();

  const [animal, setAnimal] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getAnimal(id)
      .then(setAnimal)
      .catch(() => setError('Тварину не знайдено.'));
  }, [id]);

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await createApplication({
        userId: currentUser.id,
        animalId: Number(id),
        applicantFormData: JSON.stringify(form),
      });
      navigate('/account/applications', { state: { justSubmitted: true } });
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  }

  if (error && !animal) {
    return (
      <div className="container">
        <div className="error-banner">{error}</div>
        <Link to="/catalog" className="btn btn-secondary">
          ← Назад до каталогу
        </Link>
      </div>
    );
  }

  // Захист від подання заявки на тварину, яка вже не AVAILABLE (напр. якщо
  // сторінку відкрито за старим посиланням) і від подання заявки не-опікуном.
  if (animal && animal.status !== 'AVAILABLE') {
    return (
      <div className="container">
        <div className="empty-state">Ця тварина вже недоступна для подання заявки.</div>
        <Link to="/catalog" className="btn btn-secondary" style={{ marginTop: 12 }}>
          ← Назад до каталогу
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <Link to={`/animals/${id}`} className="btn btn-secondary btn-sm" style={{ marginBottom: 16 }}>
        ← Назад до картки тварини
      </Link>

      <div className="card" style={{ maxWidth: 560 }}>
        <h1 className="page-title">Заявка на адопцію</h1>
        <p className="page-subtitle">
          {animal ? `Тварина: ${animal.name}` : 'Завантаження…'} · Заявник: {currentUser.fullName}
        </p>

        {error && <div className="error-banner">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="reason">Чому ви хочете взяти цю тварину?</label>
            <textarea
              id="reason"
              rows={3}
              required
              value={form.reason}
              onChange={(e) => updateField('reason', e.target.value)}
            />
          </div>

          <div className="form-field">
            <label htmlFor="livingConditions">Умови проживання</label>
            <textarea
              id="livingConditions"
              rows={2}
              placeholder="Квартира/будинок, чи є інші тварини тощо"
              required
              value={form.livingConditions}
              onChange={(e) => updateField('livingConditions', e.target.value)}
            />
          </div>

          <div className="form-field">
            <label htmlFor="experience">Досвід тримання тварин</label>
            <textarea
              id="experience"
              rows={2}
              value={form.experience}
              onChange={(e) => updateField('experience', e.target.value)}
            />
          </div>

          <div className="form-field">
            <label htmlFor="contactPhone">Контактний телефон</label>
            <input
              id="contactPhone"
              type="tel"
              required
              placeholder="+380..."
              value={form.contactPhone}
              onChange={(e) => updateField('contactPhone', e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={submitting || !animal}>
            {submitting ? 'Надсилання…' : 'Надіслати заявку'}
          </button>
        </form>
      </div>
    </div>
  );
}
