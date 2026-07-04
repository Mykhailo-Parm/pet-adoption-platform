import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { changeApplicationStatus, getIncomingApplications } from '../api/applications';
import { useUser } from '../context/UserContext';
import StatusBadge from '../components/StatusBadge';
import { parseApplicantFormData } from '../utils/parseFormData';

const ACTIONS = {
  NEW: [
    { newStatus: 'UNDER_REVIEW', label: 'Взяти на розгляд', variant: 'btn-primary', reason: 'Заявку взято на розгляд' },
    { newStatus: 'REJECTED', label: 'Відхилити', variant: 'btn-danger', reason: 'Заявку відхилено' },
  ],
  UNDER_REVIEW: [
    { newStatus: 'APPROVED', label: 'Схвалити', variant: 'btn-primary', reason: 'Заявку схвалено' },
    { newStatus: 'REJECTED', label: 'Відхилити', variant: 'btn-danger', reason: 'Заявку відхилено' },
  ],
  APPROVED: [
    { newStatus: 'COMPLETED', label: 'Завершити адопцію', variant: 'btn-primary', reason: 'Адопцію завершено' },
  ],
  REJECTED: [],
  COMPLETED: [],
};

export default function ShelterApplicationDetailPage() {
  const { id } = useParams();
  const { currentUser } = useUser();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function load() {
    getIncomingApplications(currentUser.shelterId)
      .then((apps) => {
        const found = apps.find((a) => String(a.id) === id);
        if (!found) {
          setError('Заявку не знайдено.');
        } else {
          setApplication(found);
        }
      })
      .catch(() => setError('Не вдалося завантажити заявку.'));
  }

  async function handleAction(action) {
    setUpdating(true);
    setError('');
    try {
      const updated = await changeApplicationStatus(application.id, {
        newStatus: action.newStatus,
        changedByUserId: currentUser.id,
        reason: action.reason,
      });
      setApplication(updated);
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  }

  if (error && !application) {
    return (
      <div className="container">
        <div className="error-banner">{error}</div>
        <Link to="/shelter/applications" className="btn btn-secondary">
          ← Назад до вхідних заявок
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
      <Link to="/shelter/applications" className="btn btn-secondary btn-sm" style={{ marginBottom: 16 }}>
        ← Назад до вхідних заявок
      </Link>

      <div className="card" style={{ maxWidth: 560 }}>
        <div className="animal-detail-header">
          <div>
            <h1 className="page-title">Заявка на «{application.animalName}»</h1>
            <p className="page-subtitle" style={{ margin: 0 }}>Заявник: {application.userFullName}</p>
          </div>
          <StatusBadge status={application.status} />
        </div>

        {error && <div className="error-banner">{error}</div>}

        <div className="detail-field" style={{ marginBottom: 16 }}>
          <span className="label">Подано</span>
          {new Date(application.applicationDate).toLocaleString('uk-UA')}
        </div>

        <h3>Анкета заявника</h3>
        {formFields.map((f) => (
          <div key={f.label} className="detail-field" style={{ marginBottom: 10 }}>
            <span className="label">{f.label}</span>
            {f.value}
          </div>
        ))}

        {ACTIONS[application.status]?.length > 0 && (
          <div className="application-actions" style={{ marginTop: 20 }}>
            {ACTIONS[application.status].map((action) => (
              <button
                key={action.newStatus}
                type="button"
                className={`btn ${action.variant}`}
                disabled={updating}
                onClick={() => handleAction(action)}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
