package com.pressload.p_backend.routines;

import com.pressload.p_backend.user.User;
import com.pressload.p_backend.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class RoutineService {

    private final RoutineRepository routineRepository;
    private final UserRepository userRepository;


    public List<Routine> getRoutinesByUsername(String username) {
        return routineRepository.findByCreatedBy(username);

    }

    public Routine saveRoutine(RoutineRequest routineRequest, User user) {
        Routine routine = Routine.builder()
                .name(routineRequest.getName())
                .description(routineRequest.getDescription())
                .user(user)
                .createdAt(LocalDateTime.now())
                .createdBy(user.getUsername())
                .build();

        List<RoutineExercise> exercises = routineRequest.getRoutineExercise().stream()
                .map(exRequest -> RoutineExercise.builder()
                        .exerciseName(exRequest.getExerciseName())
                        .sets(exRequest.getSets())
                        .reps(exRequest.getReps())
                        .weight(exRequest.getWeight())
                        .routine(routine)
                        .build())
                .toList();

        routine.setRoutineExercises(exercises);

        System.out.println(routine);

        return routineRepository.save(routine);
    }


    public void deleteRoutineById(Long id) {
        Routine routine = routineRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Routine not found with id: " + id));
        routineRepository.delete(routine);
    }
}
