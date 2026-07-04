import { apiRequest } from './client';

export function createApplication(data) {
  return apiRequest('/applications', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function getMyApplications(userId) {
  return apiRequest(`/applications/mine?userId=${userId}`);
}

export function getIncomingApplications(shelterId) {
  return apiRequest(`/applications/incoming?shelterId=${shelterId}`);
}

export function changeApplicationStatus(id, data) {
  return apiRequest(`/applications/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}
