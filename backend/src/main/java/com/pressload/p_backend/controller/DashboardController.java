package com.pressload.p_backend.controller;

import com.pressload.p_backend.dto.DashboardDataDTO;
import com.pressload.p_backend.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

  private final DashboardService dashboardService;

  /**
   * Obtener todos los datos del dashboard para el usuario autenticado
   */
  @GetMapping
  public ResponseEntity<DashboardDataDTO> getDashboardData(Authentication authentication) {
    String username = authentication.getName();
    DashboardDataDTO dashboardData = dashboardService.getDashboardData(username);
    return ResponseEntity.ok(dashboardData);
  }

  /**
   * Obtener datos de macros para una fecha específica
   */
  @GetMapping("/macros")
  public ResponseEntity<DashboardDataDTO.MacroDataDTO> getTodayMacros(
      @RequestParam(required = false) String date,
      Authentication authentication) {
    String username = authentication.getName();
    DashboardDataDTO.MacroDataDTO macroData = dashboardService.getMacroData(username, date);
    return ResponseEntity.ok(macroData);
  }

  /**
   * Obtener datos de entrenamientos semanales
   */
  @GetMapping("/workouts/weekly")
  public ResponseEntity<DashboardDataDTO.WeeklyWorkoutDataDTO> getWeeklyWorkouts(
      Authentication authentication) {
    String username = authentication.getName();
    DashboardDataDTO.WeeklyWorkoutDataDTO workoutData = dashboardService.getWeeklyWorkoutData(username);
    return ResponseEntity.ok(workoutData);
  }
}
