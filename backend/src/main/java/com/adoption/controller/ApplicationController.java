package com.adoption.controller;

import com.adoption.dto.ApplicationCreateRequest;
import com.adoption.dto.ApplicationDto;
import com.adoption.dto.ApplicationStatusChangeRequest;
import com.adoption.entity.Application;
import com.adoption.repository.ApplicationRepository;
import com.adoption.service.ApplicationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;
    private final ApplicationRepository applicationRepository;

    public ApplicationController(ApplicationService applicationService,
                                  ApplicationRepository applicationRepository) {
        this.applicationService = applicationService;
        this.applicationRepository = applicationRepository;
    }

    @PostMapping
    public ApplicationDto create(@RequestBody ApplicationCreateRequest request) {
        Application application = applicationService.createApplication(
                request.userId(), request.animalId(), request.applicantFormData());
        return toDto(application);
    }

    @GetMapping("/mine")
    public List<ApplicationDto> mine(@RequestParam Long userId) {
        return applicationRepository.findByUser_Id(userId).stream()
                .map(this::toDto)
                .toList();
    }

    @GetMapping("/incoming")
    public List<ApplicationDto> incoming(@RequestParam Long shelterId) {
        return applicationRepository.findByShelter_Id(shelterId).stream()
                .map(this::toDto)
                .toList();
    }

    @PatchMapping("/{id}/status")
    public ApplicationDto changeStatus(@PathVariable Long id,
                                        @RequestBody ApplicationStatusChangeRequest request) {
        Application application = applicationService.changeStatus(
                id, request.newStatus(), request.changedByUserId(), request.reason());
        return toDto(application);
    }

    private ApplicationDto toDto(Application a) {
        return new ApplicationDto(
                a.getId(),
                a.getAnimal().getId(),
                a.getAnimal().getName(),
                a.getShelter().getId(),
                a.getShelter().getName(),
                a.getUser().getId(),
                a.getUser().getFullName(),
                a.getApplicantFormData(),
                a.getStatus(),
                a.getApplicationDate(),
                a.getLastUpdateDate()
        );
    }
}
