package com.pressload.p_backend.controller;

import com.pressload.p_backend.entity.Routine;
import com.pressload.p_backend.entity.User;
import com.pressload.p_backend.service.RoutineService;
import com.pressload.p_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/routines")
@RequiredArgsConstructor
@Validated
public class RoutineController {

    private final RoutineService routineService;
    private final UserService userService;


    @GetMapping("/{routineId}")
    public ResponseEntity<Optional<Routine>> getRoutineById (@PathVariable Long userId, @PathVariable Long routineId) {
        Optional<Routine> routine = routineService.getRoutineById(routineId);
        return ResponseEntity.ok().body(routine);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Routine>> getRoutineByUserId(@PathVariable Long userId) {
        List<Routine> routine = routineService.getRoutinesByUserId(userId);
        return ResponseEntity.ok().body(routine);
    }
    
    @PostMapping("/")
    public ResponseEntity<Routine> postRoutine(@RequestBody Routine routine) {
        User user = userService.getUserById(routine.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User not found: " + routine.getUser().getId()));
        routine.setUser(user);
        Routine savedRoutine = routineService.saveRoutine(routine);

        return ResponseEntity.ok().body(savedRoutine);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRoutineById(@PathVariable Long id ) {
        routineService.deleteRoutineById(id);
        return ResponseEntity.ok().body("Deleted user successfully");
    }
}
