package com.adoption.service;

import com.adoption.entity.Animal;
import com.adoption.entity.AnimalStatus;
import com.adoption.entity.Application;
import com.adoption.entity.ApplicationHistory;
import com.adoption.entity.ApplicationStatus;
import com.adoption.entity.User;
import com.adoption.repository.AnimalRepository;
import com.adoption.repository.ApplicationHistoryRepository;
import com.adoption.repository.ApplicationRepository;
import com.adoption.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final ApplicationHistoryRepository applicationHistoryRepository;
    private final AnimalRepository animalRepository;
    private final UserRepository userRepository;

    public ApplicationService(ApplicationRepository applicationRepository,
                               ApplicationHistoryRepository applicationHistoryRepository,
                               AnimalRepository animalRepository,
                               UserRepository userRepository) {
        this.applicationRepository = applicationRepository;
        this.applicationHistoryRepository = applicationHistoryRepository;
        this.animalRepository = animalRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Application createApplication(Long userId, Long animalId, String applicantFormData) {
        Animal animal = animalRepository.findById(animalId)
                .orElseThrow(() -> new EntityNotFoundException("Тварину не знайдено: id=" + animalId));
        if (animal.getStatus() != AnimalStatus.AVAILABLE) {
            throw new IllegalStateException("Тварина недоступна для адопції: status=" + animal.getStatus());
        }
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Користувача не знайдено: id=" + userId));

        LocalDateTime now = LocalDateTime.now();

        Application application = new Application();
        application.setUser(user);
        application.setAnimal(animal);
        application.setShelter(animal.getShelter());
        application.setApplicantFormData(applicantFormData);
        application.setStatus(ApplicationStatus.NEW);
        application.setApplicationDate(now);
        application.setLastUpdateDate(now);
        applicationRepository.save(application);

        ApplicationHistory history = new ApplicationHistory();
        history.setApplication(application);
        history.setChangedByUser(user);
        history.setOldStatus(null);
        history.setNewStatus(ApplicationStatus.NEW);
        history.setChangeReason("Заявку подано");
        history.setChangeDate(now);
        applicationHistoryRepository.save(history);

        return application;
    }

    @Transactional
    public Application changeStatus(Long applicationId, ApplicationStatus newStatus,
                                     Long changedByUserId, String reason) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new EntityNotFoundException("Заявку не знайдено: id=" + applicationId));
        User changedByUser = userRepository.findById(changedByUserId)
                .orElseThrow(() -> new EntityNotFoundException("Користувача не знайдено: id=" + changedByUserId));

        ApplicationStatus oldStatus = application.getStatus();
        LocalDateTime now = LocalDateTime.now();

        application.setStatus(newStatus);
        application.setLastUpdateDate(now);
        applicationRepository.save(application);

        ApplicationHistory history = new ApplicationHistory();
        history.setApplication(application);
        history.setChangedByUser(changedByUser);
        history.setOldStatus(oldStatus);
        history.setNewStatus(newStatus);
        history.setChangeReason(reason);
        history.setChangeDate(now);
        applicationHistoryRepository.save(history);

        return application;
    }
}
