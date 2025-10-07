package com.pressload.p_backend.routines;

import com.pressload.p_backend.user.User;
import com.pressload.p_backend.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class RoutineService {

    private final RoutineRepository routineRepository;
    private final UserRepository userRepository;


    public List<Routine> getUserRoutines(User user) {
        return userRepository.findByUsername(user.getUsername()).orElseThrow().getRoutines();
    }

    public Routine saveRoutine(RoutineRequest routineRequest, User user) {
        Routine routine = Routine.builder()
                .name(routineRequest.getName())
                .description(routineRequest.getDescription())
                .user(userRepository.findByUsername(user.getUsername()).orElseThrow())
                .createdAt(LocalDateTime.now())
                .createdBy(user.getUsername())
//                .routineExercises(routineRequest.getRoutineExercise())
                .build();

        System.out.println(routine);
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

    public void deleteRoutine(Long id) {
        Routine routine = routineRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Routine not found with id: " + id));
        routineRepository.delete(routine);
    }

    public Routine updateRoutine(Long id, RoutineRequest routineRequest, User user) {

        Routine oldRoutine = routineRepository.findById(id).orElseThrow();

        oldRoutine.setRoutineExercises(routineRequest.getRoutineExercise());
        oldRoutine.setUpdatedAt(LocalDateTime.now());
        oldRoutine.setName(routineRequest.getName());
        oldRoutine.setDescription(routineRequest.getDescription());

        return routineRepository.save(oldRoutine);
    }
}
