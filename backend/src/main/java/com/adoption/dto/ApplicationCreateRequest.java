package com.adoption.dto;

public record ApplicationCreateRequest(
        Long userId,
        Long animalId,
        String applicantFormData
) {
}
