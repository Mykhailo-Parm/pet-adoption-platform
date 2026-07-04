import { NavLink } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function Navbar() {
  const { currentUser, setCurrentRole, users } = useUser();

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-brand">
          🐾 Прилаштування тварин
        </NavLink>

        <nav className="navbar-links">
          <NavLink to="/catalog">Каталог</NavLink>
          {currentUser.role === 'GUARDIAN' && <NavLink to="/account">Кабінет опікуна</NavLink>}
          {currentUser.role === 'SHELTER_REP' && <NavLink to="/shelter">Дашборд притулку</NavLink>}
          {currentUser.role === 'ADMIN' && <NavLink to="/admin">Адмін-панель</NavLink>}
        </nav>

        <div className="user-switcher">
          <span>Я:</span>
          <select value={currentUser.role} onChange={(e) => setCurrentRole(e.target.value)}>
            {users.map((u) => (
              <option key={u.role} value={u.role}>
                {u.fullName}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
}
