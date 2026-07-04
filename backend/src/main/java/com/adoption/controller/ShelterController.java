package com.adoption.controller;

import com.adoption.dto.ShelterDto;
import com.adoption.dto.ShelterStatusChangeRequest;
import com.adoption.entity.Shelter;
import com.adoption.repository.ShelterRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shelters")
public class ShelterController {

    private final ShelterRepository shelterRepository;

    public ShelterController(ShelterRepository shelterRepository) {
        this.shelterRepository = shelterRepository;
    }

    @GetMapping
    public List<ShelterDto> getAll() {
        return shelterRepository.findAll().stream()
                .map(this::toDto)
                .toList();
    }

    @GetMapping("/{id}")
    public ShelterDto getOne(@PathVariable Long id) {
        Shelter shelter = shelterRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Притулок не знайдено: id=" + id));
        return toDto(shelter);
    }

    @PatchMapping("/{id}/status")
    public ShelterDto changeStatus(@PathVariable Long id, @RequestBody ShelterStatusChangeRequest request) {
        Shelter shelter = shelterRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Притулок не знайдено: id=" + id));
        shelter.setStatus(request.status());
        shelterRepository.save(shelter);
        return toDto(shelter);
    }

    private ShelterDto toDto(Shelter s) {
        String city = null;
        if (s.getAddresses() != null && !s.getAddresses().isEmpty()) {
            city = s.getAddresses().get(0).getCity();
        }
        return new ShelterDto(s.getId(), s.getName(), s.getContactEmail(), s.getContactPhone(), city, s.getStatus());
    }
}
