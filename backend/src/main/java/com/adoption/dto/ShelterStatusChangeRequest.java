package com.adoption.dto;

import com.adoption.entity.ShelterStatus;

public record ShelterStatusChangeRequest(
        ShelterStatus status
) {
}
