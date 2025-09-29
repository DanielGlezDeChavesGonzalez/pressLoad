package com.pressload.p_backend.service;

import com.pressload.p_backend.entity.Routine;
import com.pressload.p_backend.entity.User;
import com.pressload.p_backend.repository.RoutineRepository;
import com.pressload.p_backend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class RoutineService {

    private final RoutineRepository routineRepository;
    private final UserRepository userRepository;

    public Optional<Routine> getRoutineById(Long id) {
        return routineRepository.findById(id);
    }

    public List<Routine> getRoutinesByUserId(Long id) {
        return routineRepository.findByUserId(id);
    }

    public List<Routine> getRoutinesByUsername(String username) {
        Optional<User> user = userRepository.findByUsername(username);

        return routineRepository.findByUserId(user.getId());
    }

    public List<Routine> getRoutinesByUserAndDate(String username, LocalDate date) {
        Optional<User> user = userRepository.findByUsername(username);
        return routineRepository.findByUserAndDate(user, date);
    }

    public Routine saveRoutine(Routine routine) {
        return routineRepository.save(routine);
    }

    public Routine createRoutine(String username, String name, String description, LocalDate date) {
        Optional<User> user = userRepository.findByUsername(username);

        Routine routine = Routine.builder()
                .name(name)
                .description(description)
                .date(date)
//                .user(user)
//                .createdBy(user)
                .build();




        return routineRepository.save(routine);
    }

    public void deleteRoutineById(Long id) {
        Routine routine = routineRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Routine not found with id: " + id));
        routineRepository.delete(routine);
    }
}
