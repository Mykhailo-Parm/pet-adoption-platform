import { apiRequest } from './client';

export function getShelters() {
  return apiRequest('/shelters');
}

export function getShelter(id) {
  return apiRequest(`/shelters/${id}`);
}

export function updateShelterStatus(id, status) {
  return apiRequest(`/shelters/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}
