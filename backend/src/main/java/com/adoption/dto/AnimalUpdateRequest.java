package com.adoption.dto;

import com.adoption.entity.Gender;
import com.adoption.entity.Size;

public record AnimalUpdateRequest(
        Long speciesId,
        Long breedId,
        String name,
        Integer age,
        Gender gender,
        Size size,
        String healthStatus,
        Boolean isSterilized,
        Boolean isVaccinated,
        String microchipNumber,
        String description
) {
}
