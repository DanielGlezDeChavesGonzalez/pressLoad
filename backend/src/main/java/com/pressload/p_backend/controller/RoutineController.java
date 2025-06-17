package com.pressload.p_backend.controller;

import com.pressload.p_backend.entity.Routine;
import com.pressload.p_backend.request.CreateRoutineRequest;
import com.pressload.p_backend.response.ErrorResponse;
import com.pressload.p_backend.service.RoutineService;
import com.pressload.p_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/routines")
@RequiredArgsConstructor
@Validated
@CrossOrigin(origins = "http://localhost:5173")
public class RoutineController {

    private final RoutineService routineService;
    private final UserService userService;

    /**
     * Obtener todas las rutinas del usuario autenticado
     */
    @GetMapping
    public ResponseEntity<List<Routine>> getUserRoutines(Authentication authentication) {
        try {
            String username = authentication.getName();
            List<Routine> routines = routineService.getRoutinesByUsername(username);
            return ResponseEntity.ok(routines);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(List.of());
        }
    }

    /**
     * Obtener rutinas por fecha específica
     */
    @GetMapping("/date/{date}")
    public ResponseEntity<List<Routine>> getRoutinesByDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            Authentication authentication) {
        try {
            String username = authentication.getName();
            List<Routine> routines = routineService.getRoutinesByUserAndDate(username, date);
            return ResponseEntity.ok(routines);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(List.of());
        }
    }

    /**
     * Crear una nueva rutina
     */
    @PostMapping
    public ResponseEntity<?> createRoutine(
            @RequestBody CreateRoutineRequest request,
            Authentication authentication) {
        try {
            String username = authentication.getName();
            Routine createdRoutine = routineService.createRoutine(
                    username,
                    request.getName(),
                    request.getDescription(),
                    LocalDate.parse(request.getDate()));
            return ResponseEntity.ok(createdRoutine);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Error al crear la rutina: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRoutineById(@PathVariable Long id) {
        routineService.deleteRoutineById(id);
        return ResponseEntity.ok().body("Deleted user successfully");
    }
}
