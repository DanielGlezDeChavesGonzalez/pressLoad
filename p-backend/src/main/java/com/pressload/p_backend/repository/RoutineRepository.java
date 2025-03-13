package com.pressload.p_backend.repository;

import com.pressload.p_backend.entity.Routine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RoutineRepository extends JpaRepository<Routine,Long> {

    List<Routine> findByUserId(Long userId);

    Optional<Routine> findByIdAndUserId(Long routineId, Long userId);

}
