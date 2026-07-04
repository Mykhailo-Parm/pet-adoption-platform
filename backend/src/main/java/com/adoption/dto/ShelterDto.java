package com.adoption.dto;

import com.adoption.entity.ShelterStatus;

public record ShelterDto(
        Long id,
        String name,
        String contactEmail,
        String contactPhone,
        String city,
        ShelterStatus status
) {
}
