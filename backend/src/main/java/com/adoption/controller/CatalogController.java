package com.adoption.controller;

import com.adoption.dto.CatalogFiltersDto;
import com.adoption.entity.Address;
import com.adoption.repository.AddressRepository;
import com.adoption.repository.BreedRepository;
import com.adoption.repository.SpeciesRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/catalog")
public class CatalogController {

    private final SpeciesRepository speciesRepository;
    private final BreedRepository breedRepository;
    private final AddressRepository addressRepository;

    public CatalogController(SpeciesRepository speciesRepository,
                              BreedRepository breedRepository,
                              AddressRepository addressRepository) {
        this.speciesRepository = speciesRepository;
        this.breedRepository = breedRepository;
        this.addressRepository = addressRepository;
    }

    @GetMapping("/filters")
    public CatalogFiltersDto filters() {
        List<CatalogFiltersDto.SpeciesOption> species = speciesRepository.findAll().stream()
                .map(s -> new CatalogFiltersDto.SpeciesOption(s.getId(), s.getName()))
                .toList();

        List<CatalogFiltersDto.BreedOption> breeds = breedRepository.findAll().stream()
                .map(b -> new CatalogFiltersDto.BreedOption(b.getId(), b.getName(), b.getSpecies().getId()))
                .toList();

        List<String> cities = addressRepository.findAll().stream()
                .map(Address::getCity)
                .filter(Objects::nonNull)
                .distinct()
                .sorted()
                .toList();

        return new CatalogFiltersDto(species, breeds, cities);
    }
}
