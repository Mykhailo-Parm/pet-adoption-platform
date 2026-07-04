package com.adoption.controller;

import com.adoption.dto.AnimalCardDto;
import com.adoption.dto.AnimalCreateRequest;
import com.adoption.dto.AnimalUpdateRequest;
import com.adoption.entity.Animal;
import com.adoption.entity.Breed;
import com.adoption.entity.Gender;
import com.adoption.entity.Shelter;
import com.adoption.entity.Size;
import com.adoption.entity.Species;
import com.adoption.repository.AnimalRepository;
import com.adoption.repository.BreedRepository;
import com.adoption.repository.ShelterRepository;
import com.adoption.repository.SpeciesRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/animals")
public class AnimalController {

    private final AnimalRepository animalRepository;
    private final ShelterRepository shelterRepository;
    private final SpeciesRepository speciesRepository;
    private final BreedRepository breedRepository;

    public AnimalController(AnimalRepository animalRepository,
                             ShelterRepository shelterRepository,
                             SpeciesRepository speciesRepository,
                             BreedRepository breedRepository) {
        this.animalRepository = animalRepository;
        this.shelterRepository = shelterRepository;
        this.speciesRepository = speciesRepository;
        this.breedRepository = breedRepository;
    }

    @GetMapping
    public List<AnimalCardDto> search(@RequestParam(required = false) Long speciesId,
                                       @RequestParam(required = false) Long breedId,
                                       @RequestParam(required = false) String city,
                                       @RequestParam(required = false) Gender gender,
                                       @RequestParam(required = false) Size size) {
        return animalRepository.searchAvailable(speciesId, breedId, city, gender, size).stream()
                .map(this::toCardDto)
                .toList();
    }

    @GetMapping("/{id}")
    public AnimalCardDto getOne(@PathVariable Long id) {
        Animal animal = animalRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Тварину не знайдено: id=" + id));
        return toCardDto(animal);
    }

    @GetMapping("/shelter/{shelterId}")
    public List<AnimalCardDto> getByShelter(@PathVariable Long shelterId) {
        return animalRepository.findByShelter_Id(shelterId).stream()
                .map(this::toCardDto)
                .toList();
    }

    @PostMapping
    public AnimalCardDto create(@RequestBody AnimalCreateRequest request) {
        Shelter shelter = shelterRepository.findById(request.shelterId())
                .orElseThrow(() -> new EntityNotFoundException("Притулок не знайдено: id=" + request.shelterId()));
        Species species = speciesRepository.findById(request.speciesId())
                .orElseThrow(() -> new EntityNotFoundException("Вид не знайдено: id=" + request.speciesId()));
        Breed breed = null;
        if (request.breedId() != null) {
            breed = breedRepository.findById(request.breedId())
                    .orElseThrow(() -> new EntityNotFoundException("Породу не знайдено: id=" + request.breedId()));
        }

        Animal animal = new Animal();
        animal.setShelter(shelter);
        animal.setSpecies(species);
        animal.setBreed(breed);
        animal.setName(request.name());
        animal.setAge(request.age());
        if (request.gender() != null) {
            animal.setGender(request.gender());
        }
        animal.setSize(request.size());
        animal.setHealthStatus(request.healthStatus());
        if (request.isSterilized() != null) {
            animal.setIsSterilized(request.isSterilized());
        }
        if (request.isVaccinated() != null) {
            animal.setIsVaccinated(request.isVaccinated());
        }
        animal.setMicrochipNumber(request.microchipNumber());
        animal.setDescription(request.description());
        animal.setAdditionDate(LocalDateTime.now());

        animalRepository.save(animal);
        return toCardDto(animal);
    }

    @PatchMapping("/{id}")
    public AnimalCardDto update(@PathVariable Long id, @RequestBody AnimalUpdateRequest request) {
        Animal animal = animalRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Тварину не знайдено: id=" + id));

        Species species = speciesRepository.findById(request.speciesId())
                .orElseThrow(() -> new EntityNotFoundException("Вид не знайдено: id=" + request.speciesId()));
        Breed breed = null;
        if (request.breedId() != null) {
            breed = breedRepository.findById(request.breedId())
                    .orElseThrow(() -> new EntityNotFoundException("Породу не знайдено: id=" + request.breedId()));
        }

        animal.setSpecies(species);
        animal.setBreed(breed);
        animal.setName(request.name());
        animal.setAge(request.age());
        if (request.gender() != null) {
            animal.setGender(request.gender());
        }
        animal.setSize(request.size());
        animal.setHealthStatus(request.healthStatus());
        if (request.isSterilized() != null) {
            animal.setIsSterilized(request.isSterilized());
        }
        if (request.isVaccinated() != null) {
            animal.setIsVaccinated(request.isVaccinated());
        }
        animal.setMicrochipNumber(request.microchipNumber());
        animal.setDescription(request.description());

        animalRepository.save(animal);
        return toCardDto(animal);
    }

    private AnimalCardDto toCardDto(Animal a) {
        String shelterCity = null;
        if (a.getShelter() != null
                && a.getShelter().getAddresses() != null
                && !a.getShelter().getAddresses().isEmpty()) {
            shelterCity = a.getShelter().getAddresses().get(0).getCity();
        }
        return new AnimalCardDto(
                a.getId(),
                a.getName(),
                a.getAge(),
                a.getGender(),
                a.getSize(),
                a.getSpecies() != null ? a.getSpecies().getId() : null,
                a.getSpecies() != null ? a.getSpecies().getName() : null,
                a.getBreed() != null ? a.getBreed().getId() : null,
                a.getBreed() != null ? a.getBreed().getName() : null,
                a.getStatus(),
                a.getShelter() != null ? a.getShelter().getName() : null,
                shelterCity,
                a.getDescription(),
                a.getHealthStatus(),
                a.getIsSterilized(),
                a.getIsVaccinated()
        );
    }
}
