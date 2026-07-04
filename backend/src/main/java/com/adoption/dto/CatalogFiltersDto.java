package com.adoption.dto;

import java.util.List;

public record CatalogFiltersDto(
        List<SpeciesOption> species,
        List<BreedOption> breeds,
        List<String> cities
) {

    public record SpeciesOption(Long id, String name) {
    }

    public record BreedOption(Long id, String name, Long speciesId) {
    }
}
