import { apiRequest } from './client';

export function getAnimals(filters = {}) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.append(key, value);
    }
  });
  const query = params.toString();
  return apiRequest(`/animals${query ? `?${query}` : ''}`);
}

export function getAnimal(id) {
  return apiRequest(`/animals/${id}`);
}

export function getAnimalsByShelter(shelterId) {
  return apiRequest(`/animals/shelter/${shelterId}`);
}

export function createAnimal(data) {
  return apiRequest('/animals', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateAnimal(id, data) {
  return apiRequest(`/animals/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export function getCatalogFilters() {
  return apiRequest('/catalog/filters');
}
