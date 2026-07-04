package com.adoption.config;

import com.adoption.entity.Address;
import com.adoption.entity.Animal;
import com.adoption.entity.AnimalStatus;
import com.adoption.entity.Breed;
import com.adoption.entity.Gender;
import com.adoption.entity.Shelter;
import com.adoption.entity.ShelterStatus;
import com.adoption.entity.Size;
import com.adoption.entity.Species;
import com.adoption.entity.User;
import com.adoption.entity.UserRole;
import com.adoption.repository.AddressRepository;
import com.adoption.repository.AnimalRepository;
import com.adoption.repository.BreedRepository;
import com.adoption.repository.ShelterRepository;
import com.adoption.repository.SpeciesRepository;
import com.adoption.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

/** Наповнює порожню базу демонстраційними даними при першому запуску. */
@Component
public class DataSeeder implements CommandLineRunner {

    private final SpeciesRepository speciesRepository;
    private final BreedRepository breedRepository;
    private final ShelterRepository shelterRepository;
    private final AddressRepository addressRepository;
    private final AnimalRepository animalRepository;
    private final UserRepository userRepository;

    public DataSeeder(SpeciesRepository speciesRepository,
                       BreedRepository breedRepository,
                       ShelterRepository shelterRepository,
                       AddressRepository addressRepository,
                       AnimalRepository animalRepository,
                       UserRepository userRepository) {
        this.speciesRepository = speciesRepository;
        this.breedRepository = breedRepository;
        this.shelterRepository = shelterRepository;
        this.addressRepository = addressRepository;
        this.animalRepository = animalRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public void run(String... args) {
        if (speciesRepository.count() > 0) {
            return;
        }

        Species dog = createSpecies("Собака");
        Species cat = createSpecies("Кіт");
        Species rabbit = createSpecies("Кролик");

        Breed labrador = createBreed(dog, "Лабрадор-ретривер");
        Breed shepherd = createBreed(dog, "Німецька вівчарка");
        Breed mongrelDog = createBreed(dog, "Дворняга");
        Breed husky = createBreed(dog, "Хаскі");
        Breed britishCat = createBreed(cat, "Британська короткошерста");
        Breed maineCoon = createBreed(cat, "Мейн-кун");
        Breed siberianCat = createBreed(cat, "Сибірська кішка");
        Breed houseRabbit = createBreed(rabbit, "Домашній кріль");

        Shelter shelter1 = createShelter("Притулок \"Промінь\"", "prytulok.promin@example.com",
                "+380501234567", "Харківська область", "Харків", "вул. Сумська", "10");
        Shelter shelter2 = createShelter("Притулок \"Друга домівка\"", "druha.domivka@example.com",
                "+380671234567", "Київська область", "Київ", "вул. Хрещатик", "22");

        createAnimal(shelter1, dog, labrador, "Рекс", 3, Gender.MALE, Size.LARGE,
                "Здоровий", true, true, "Дружелюбний і активний пес, любить довгі прогулянки.");
        createAnimal(shelter1, cat, britishCat, "Барсик", 2, Gender.MALE, Size.MEDIUM,
                "Здоровий", true, true, "Спокійний домашній кіт.");
        createAnimal(shelter1, dog, mongrelDog, "Люся", 1, Gender.FEMALE, Size.MEDIUM,
                "Здорова", false, true, "Грайлива молода собака.");
        createAnimal(shelter1, rabbit, houseRabbit, "Кроля", 1, Gender.FEMALE, Size.SMALL,
                "Здорова", false, false, "Маленька та боязка кролиця.");

        createAnimal(shelter2, cat, maineCoon, "Мурка", 4, Gender.FEMALE, Size.LARGE,
                "Здорова", true, true, "Велика пухнаста кішка, дуже лагідна.");
        createAnimal(shelter2, dog, shepherd, "Бім", 5, Gender.MALE, Size.LARGE,
                "Здоровий", true, true, "Дресирований, підходить для охорони.");
        createAnimal(shelter2, dog, mongrelDog, "Тайсон", 2, Gender.MALE, Size.MEDIUM,
                "Здоровий", false, false, "Активний пес, шукає люблячу родину.");
        createAnimal(shelter2, cat, britishCat, "Соня", 1, Gender.FEMALE, Size.SMALL,
                "Здорова", false, true, "Тиха та ласкава кішечка.");

        createAnimal(shelter1, dog, shepherd, "Джессі", 4, Gender.FEMALE, Size.LARGE,
                "Здорова", true, true, "Спокійна досвідчена собака, підходить для сім'ї з дітьми.");
        createAnimal(shelter1, cat, maineCoon, "Мурзик", 3, Gender.MALE, Size.LARGE,
                "Здоровий", true, true, "Великий лагідний кіт, любить обійматися.");
        createAnimal(shelter1, rabbit, houseRabbit, "Пухнастик", 2, Gender.MALE, Size.SMALL,
                "Здоровий", false, false, "Активний кролик, любить овочі.");

        createAnimal(shelter2, dog, husky, "Граф", 2, Gender.MALE, Size.LARGE,
                "Здоровий", false, true, "Енергійний молодий пес, любить довгі прогулянки.");
        createAnimal(shelter2, cat, siberianCat, "Дуся", 1, Gender.FEMALE, Size.MEDIUM,
                "Здорова", false, true, "Пухнаста грайлива кішечка.");
        createAnimal(shelter2, dog, mongrelDog, "Річард", 6, Gender.MALE, Size.MEDIUM,
                "Здоровий", true, true, "Спокійний пес поважного віку, ідеальний компаньйон.");

        createUser(null, "Олена Коваль", "olena.guardian@example.com", "+380631112233",
                "demo123", "Харків", UserRole.GUARDIAN);
        createUser(shelter1, "Іван Бондар", "ivan.shelter@example.com", "+380442223344",
                "demo123", "Харків", UserRole.SHELTER_REP);
    }

    private Species createSpecies(String name) {
        Species species = new Species();
        species.setName(name);
        return speciesRepository.save(species);
    }

    private Breed createBreed(Species species, String name) {
        Breed breed = new Breed();
        breed.setSpecies(species);
        breed.setName(name);
        return breedRepository.save(breed);
    }

    private Shelter createShelter(String name, String email, String phone,
                                   String region, String city, String street, String houseNumber) {
        Shelter shelter = new Shelter();
        shelter.setName(name);
        shelter.setContactEmail(email);
        shelter.setContactPhone(phone);
        shelter.setStatus(ShelterStatus.APPROVED);
        shelter.setRegistrationDate(LocalDateTime.now());
        shelterRepository.save(shelter);

        Address address = new Address();
        address.setShelter(shelter);
        address.setRegion(region);
        address.setCity(city);
        address.setStreet(street);
        address.setHouseNumber(houseNumber);
        addressRepository.save(address);

        return shelter;
    }

    private void createAnimal(Shelter shelter, Species species, Breed breed, String name, Integer age,
                               Gender gender, Size size, String healthStatus,
                               boolean sterilized, boolean vaccinated, String description) {
        Animal animal = new Animal();
        animal.setShelter(shelter);
        animal.setSpecies(species);
        animal.setBreed(breed);
        animal.setName(name);
        animal.setAge(age);
        animal.setGender(gender);
        animal.setSize(size);
        animal.setHealthStatus(healthStatus);
        animal.setIsSterilized(sterilized);
        animal.setIsVaccinated(vaccinated);
        animal.setDescription(description);
        animal.setStatus(AnimalStatus.AVAILABLE);
        animal.setAdditionDate(LocalDateTime.now());
        animalRepository.save(animal);
    }

    private void createUser(Shelter shelter, String fullName, String email, String phone,
                             String passwordHash, String location, UserRole role) {
        User user = new User();
        user.setShelter(shelter);
        user.setFullName(fullName);
        user.setEmail(email);
        user.setPhoneNumber(phone);
        user.setPasswordHash(passwordHash);
        user.setLocation(location);
        user.setRole(role);
        user.setRegistrationDate(LocalDateTime.now());
        userRepository.save(user);
    }
}
