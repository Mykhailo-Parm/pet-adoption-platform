package com.adoption.repository;

import com.adoption.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findByUser_Id(Long userId);

    List<Application> findByShelter_Id(Long shelterId);
}
