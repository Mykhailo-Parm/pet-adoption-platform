const LABELS = {
  PENDING: 'На розгляді',
  APPROVED: 'Затверджено',
  BLOCKED: 'Заблоковано',
};

export default function ShelterStatusBadge({ status }) {
  return <span className={`status-badge sstatus-${status}`}>{LABELS[status] ?? status}</span>;
}
