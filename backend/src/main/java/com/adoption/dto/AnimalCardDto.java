package com.adoption.dto;

import com.adoption.entity.AnimalStatus;
import com.adoption.entity.Gender;
import com.adoption.entity.Size;

public record AnimalCardDto(
        Long id,
        String name,
        Integer age,
        Gender gender,
        Size size,
        Long speciesId,
        String speciesName,
        Long breedId,
        String breedName,
        AnimalStatus status,
        String shelterName,
        String shelterCity,
        String description,
        String healthStatus,
        Boolean isSterilized,
        Boolean isVaccinated
) {
}
