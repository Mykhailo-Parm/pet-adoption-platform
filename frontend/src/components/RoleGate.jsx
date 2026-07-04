import { useUser } from '../context/UserContext';
import { ROLE_LABELS } from '../constants/demoUsers';

export default function RoleGate({ allow, children }) {
  const { currentUser } = useUser();

  if (currentUser.role !== allow) {
    return (
      <div className="container">
        <div className="empty-state">
          Ця сторінка доступна лише для ролі «{ROLE_LABELS[allow]}». Оберіть відповідного
          користувача на сторінці «Автентифікація».
        </div>
      </div>
    );
  }

  return children;
}
