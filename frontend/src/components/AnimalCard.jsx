import { Link } from 'react-router-dom';

const GENDER_LABELS = { MALE: 'самець', FEMALE: 'самка', UNKNOWN: 'стать невідома' };
const SIZE_LABELS = { SMALL: 'малий розмір', MEDIUM: 'середній розмір', LARGE: 'великий розмір' };

export default function AnimalCard({ animal }) {
  const metaParts = [
    animal.breedName ?? animal.speciesName,
    animal.age != null ? `${animal.age} р.` : null,
    GENDER_LABELS[animal.gender],
    animal.size ? SIZE_LABELS[animal.size] : null,
  ].filter(Boolean);

  return (
    <Link to={`/animals/${animal.id}`} className="animal-card">
      <p className="animal-name">{animal.name}</p>
      <p className="animal-meta">{metaParts.join(' · ')}</p>
      <p className="animal-shelter">
        {animal.shelterName}
        {animal.shelterCity ? `, ${animal.shelterCity}` : ''}
      </p>
    </Link>
  );
}
