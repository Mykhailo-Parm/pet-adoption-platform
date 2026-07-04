package com.adoption.service;

import com.adoption.entity.Animal;
import com.adoption.entity.AnimalStatus;
import com.adoption.entity.Application;
import com.adoption.entity.ApplicationHistory;
import com.adoption.entity.ApplicationStatus;
import com.adoption.entity.Shelter;
import com.adoption.entity.User;
import com.adoption.repository.AnimalRepository;
import com.adoption.repository.ApplicationHistoryRepository;
import com.adoption.repository.ApplicationRepository;
import com.adoption.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ApplicationServiceTest {

    @Mock
    private ApplicationRepository applicationRepository;
    @Mock
    private ApplicationHistoryRepository applicationHistoryRepository;
    @Mock
    private AnimalRepository animalRepository;
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ApplicationService applicationService;

    private Shelter shelter;
    private Animal animal;
    private User user;

    @BeforeEach
    void setUp() {
        shelter = new Shelter();
        shelter.setId(10L);
        shelter.setName("Притулок Тест");

        animal = new Animal();
        animal.setId(1L);
        animal.setShelter(shelter);
        animal.setStatus(AnimalStatus.AVAILABLE);

        user = new User();
        user.setId(100L);
        user.setFullName("Тестовий Опікун");
    }

    @Test
    void createApplication_savesNewApplicationWithHistory_whenAnimalAvailable() {
        when(animalRepository.findById(1L)).thenReturn(Optional.of(animal));
        when(userRepository.findById(100L)).thenReturn(Optional.of(user));

        Application result = applicationService.createApplication(100L, 1L, "{}");

        assertEquals(ApplicationStatus.NEW, result.getStatus());
        assertEquals(shelter, result.getShelter());
        assertEquals(animal, result.getAnimal());
        assertEquals(user, result.getUser());
        verify(applicationRepository).save(result);

        ArgumentCaptor<ApplicationHistory> historyCaptor = ArgumentCaptor.forClass(ApplicationHistory.class);
        verify(applicationHistoryRepository).save(historyCaptor.capture());
        ApplicationHistory savedHistory = historyCaptor.getValue();
        assertNull(savedHistory.getOldStatus());
        assertEquals(ApplicationStatus.NEW, savedHistory.getNewStatus());
    }

    @Test
    void createApplication_throwsIllegalState_whenAnimalNotAvailable() {
        animal.setStatus(AnimalStatus.ADOPTED);
        when(animalRepository.findById(1L)).thenReturn(Optional.of(animal));

        assertThrows(IllegalStateException.class,
                () -> applicationService.createApplication(100L, 1L, "{}"));

        verify(applicationRepository, never()).save(any());
        verify(applicationHistoryRepository, never()).save(any());
    }

    @Test
    void changeStatus_updatesApplicationAndRecordsOldAndNewStatusInHistory() {
        Application application = new Application();
        application.setId(5L);
        application.setStatus(ApplicationStatus.NEW);

        when(applicationRepository.findById(5L)).thenReturn(Optional.of(application));
        when(userRepository.findById(100L)).thenReturn(Optional.of(user));

        Application result = applicationService.changeStatus(
                5L, ApplicationStatus.UNDER_REVIEW, 100L, "Взято на розгляд");

        assertEquals(ApplicationStatus.UNDER_REVIEW, result.getStatus());
        verify(applicationRepository).save(application);

        ArgumentCaptor<ApplicationHistory> historyCaptor = ArgumentCaptor.forClass(ApplicationHistory.class);
        verify(applicationHistoryRepository).save(historyCaptor.capture());
        ApplicationHistory savedHistory = historyCaptor.getValue();
        assertEquals(ApplicationStatus.NEW, savedHistory.getOldStatus());
        assertEquals(ApplicationStatus.UNDER_REVIEW, savedHistory.getNewStatus());
    }
}
