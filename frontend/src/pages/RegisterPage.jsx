import { Link } from 'react-router-dom';

export default function RegisterPage() {
  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 480, margin: '40px auto', textAlign: 'center' }}>
        <h1 className="page-title">Реєстрація</h1>
        <p className="page-subtitle">
          У цій навчальній демо-версії реєстрація нових користувачів спрощена й не
          реалізована — замість неї скористайтесь сторінкою «Автентифікація» та оберіть
          одного з тестових користувачів.
        </p>
        <Link to="/login" className="btn btn-primary">
          До автентифікації
        </Link>
      </div>
    </div>
  );
}
