import { useUser } from '../context/UserContext';
import { ROLE_LABELS } from '../constants/demoUsers';

export default function AccountProfilePage() {
  const { currentUser } = useUser();

  return (
    <div className="container">
      <h1 className="page-title">Профіль</h1>
      <div className="card" style={{ maxWidth: 480 }}>
        <div className="animal-detail-grid" style={{ gridTemplateColumns: '1fr' }}>
          <div className="detail-field">
            <span className="label">Ім'я</span>
            {currentUser.fullName}
          </div>
          <div className="detail-field">
            <span className="label">Email</span>
            {currentUser.email}
          </div>
          <div className="detail-field">
            <span className="label">Роль</span>
            {ROLE_LABELS[currentUser.role]}
          </div>
        </div>
      </div>
    </div>
  );
}
