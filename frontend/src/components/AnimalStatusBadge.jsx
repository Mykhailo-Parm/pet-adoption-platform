const LABELS = {
  AVAILABLE: 'Доступна',
  IN_PROCESS: 'У процесі адопції',
  ADOPTED: 'Прилаштована',
  ARCHIVED: 'В архіві',
};

export default function AnimalStatusBadge({ status }) {
  return <span className={`status-badge astatus-${status}`}>{LABELS[status] ?? status}</span>;
}
