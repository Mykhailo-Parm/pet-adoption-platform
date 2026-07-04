package com.adoption.dto;

import com.adoption.entity.ApplicationStatus;

public record ApplicationStatusChangeRequest(
        ApplicationStatus newStatus,
        Long changedByUserId,
        String reason
) {
}
