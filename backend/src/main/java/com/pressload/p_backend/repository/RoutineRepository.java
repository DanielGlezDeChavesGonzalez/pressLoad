package com.pressload.p_backend.repository;

import com.pressload.p_backend.entity.Routine;
import com.pressload.p_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface RoutineRepository extends JpaRepository<Routine, Long> {

    List<Routine> findByUserId(Long userId);

    Optional<Routine> findByIdAndUserId(Long routineId, Long userId);

    // Métodos para el dashboard
    List<Routine> findByUserAndDateBetween(User user, LocalDate startDate, LocalDate endDate);

    List<Routine> findByUserAndDate(User user, LocalDate date);

}
