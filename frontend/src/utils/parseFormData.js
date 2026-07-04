const FIELD_LABELS = {
  reason: 'Чому хоче взяти тварину',
  livingConditions: 'Умови проживання',
  experience: 'Досвід тримання тварин',
  contactPhone: 'Контактний телефон',
};

export function parseApplicantFormData(raw) {
  try {
    const data = JSON.parse(raw);
    return Object.entries(data)
      .filter(([, value]) => value)
      .map(([key, value]) => ({ label: FIELD_LABELS[key] ?? key, value }));
  } catch {
    return [{ label: 'Дані анкети', value: raw }];
  }
}
