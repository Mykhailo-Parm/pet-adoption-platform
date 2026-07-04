package com.adoption.dto;

import com.adoption.entity.ApplicationStatus;

import java.time.LocalDateTime;

public record ApplicationDto(
        Long id,
        Long animalId,
        String animalName,
        Long shelterId,
        String shelterName,
        Long userId,
        String userFullName,
        String applicantFormData,
        ApplicationStatus status,
        LocalDateTime applicationDate,
        LocalDateTime lastUpdateDate
) {
}
