package com.pressload.p_backend.service;

import com.pressload.p_backend.entity.Routine;
import com.pressload.p_backend.repository.RoutineRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class RoutineService {

    private final RoutineRepository routineRepository;

    public Optional<Routine> getRoutineById(Long id){
        return routineRepository.findById(id);
    }

    public List<Routine> getRoutinesByUserId(Long id){
        return routineRepository.findByUserId(id);
    }

    public Routine saveRoutine(Routine routine){
        return routineRepository.save(routine);
    }

    public void deleteRoutineById(Long id) {
        Routine routine = routineRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Routine not found with id: " + id));
        routineRepository.delete(routine);
    }


}
