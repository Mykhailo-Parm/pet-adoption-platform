package com.adoption.repository;

import com.adoption.entity.Animal;
import com.adoption.entity.Gender;
import com.adoption.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AnimalRepository extends JpaRepository<Animal, Long> {

    @Query("""
            SELECT DISTINCT a FROM Animal a
            JOIN a.species s
            LEFT JOIN a.breed b
            JOIN a.shelter sh
            LEFT JOIN sh.addresses addr
            WHERE a.status = com.adoption.entity.AnimalStatus.AVAILABLE
              AND (:speciesId IS NULL OR s.id = :speciesId)
              AND (:breedId IS NULL OR b.id = :breedId)
              AND (:city IS NULL OR addr.city = :city)
              AND (:gender IS NULL OR a.gender = :gender)
              AND (:size IS NULL OR a.size = :size)
            """)
    List<Animal> searchAvailable(@Param("speciesId") Long speciesId,
                                  @Param("breedId") Long breedId,
                                  @Param("city") String city,
                                  @Param("gender") Gender gender,
                                  @Param("size") Size size);

    List<Animal> findByShelter_Id(Long shelterId);
}
