import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { ROLE_LABELS } from '../constants/demoUsers';

export default function LoginPage() {
  const { currentUser, setCurrentRole, users } = useUser();
  const [selectedRole, setSelectedRole] = useState(currentUser.role);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setCurrentRole(selectedRole);
    navigate('/');
  }

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 480, margin: '40px auto' }}>
        <h1 className="page-title">Автентифікація</h1>
        <p className="page-subtitle">
          Реальний вхід у цій демо-версії спрощено (за SPEC). Оберіть тестового користувача,
          від імені якого хочете переглядати сайт.
        </p>

        <form onSubmit={handleSubmit}>
          {users.map((u) => (
            <label
              key={u.role}
              className="card"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 12,
                padding: 14,
                cursor: 'pointer',
                borderColor: selectedRole === u.role ? 'var(--color-primary)' : 'var(--color-border)',
              }}
            >
              <input
                type="radio"
                name="role"
                value={u.role}
                checked={selectedRole === u.role}
                onChange={() => setSelectedRole(u.role)}
              />
              <span>
                <strong>{u.fullName}</strong>
                <br />
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                  {ROLE_LABELS[u.role]} · {u.email}
                </span>
              </span>
            </label>
          ))}

          <button type="submit" className="btn btn-primary">
            Увійти
          </button>
        </form>
      </div>
    </div>
  );
}
