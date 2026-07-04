const LABELS = {
  NEW: 'Нова',
  UNDER_REVIEW: 'На розгляді',
  APPROVED: 'Схвалено',
  REJECTED: 'Відхилено',
  COMPLETED: 'Завершено',
};

export default function StatusBadge({ status }) {
  return <span className={`status-badge status-${status}`}>{LABELS[status] ?? status}</span>;
}
