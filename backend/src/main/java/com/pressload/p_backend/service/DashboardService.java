package com.pressload.p_backend.service;

import com.pressload.p_backend.dto.DashboardDataDTO;
import com.pressload.p_backend.entity.Meal;
import com.pressload.p_backend.entity.User;
import com.pressload.p_backend.repository.MealRepository;
import com.pressload.p_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
public class DashboardService {

  private final UserRepository userRepository;
  private final MealRepository mealRepository;

  public DashboardDataDTO getDashboardData(String username) {
    User user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

    // Obtener datos de macros del día actual
    DashboardDataDTO.MacroDataDTO macroData = getMacroData(username, null);

    // Obtener datos de entrenamientos semanales (datos de ejemplo por ahora)
    DashboardDataDTO.WeeklyWorkoutDataDTO weeklyWorkouts = getWeeklyWorkoutData(username);

    // Obtener estadísticas del usuario
    DashboardDataDTO.UserStatsDTO userStats = DashboardDataDTO.UserStatsDTO.builder()
        .name(user.getUsername())
        .email(user.getEmail() != null ? user.getEmail() : "")
        .contacts(24) // Por defecto
        .activeStreak(calculateActiveStreak(user))
        .build();

    return DashboardDataDTO.builder()
        .macroData(macroData)
        .weeklyWorkouts(weeklyWorkouts)
        .userStats(userStats)
        .build();
  }

  public DashboardDataDTO.MacroDataDTO getMacroData(String username, String dateStr) {
    User user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

    LocalDate targetDate = dateStr != null ? LocalDate.parse(dateStr) : LocalDate.now();

    // Obtener todas las comidas del día especificado
    List<Meal> meals = mealRepository.findByUserAndDate(user, targetDate);

    double totalProteins = 0;
    double totalCarbohydrates = 0;
    double totalFats = 0;
    double totalCalories = 0;

    // Calcular totales de macronutrientes desde las comidas
    for (Meal meal : meals) {
      totalProteins += meal.getTotalProteins() != null ? meal.getTotalProteins() : 0;
      totalCarbohydrates += meal.getTotalCarbohydrates() != null ? meal.getTotalCarbohydrates() : 0;
      totalFats += meal.getTotalFats() != null ? meal.getTotalFats() : 0;
      totalCalories += meal.getTotalCalories() != null ? meal.getTotalCalories() : 0;
    }

    return DashboardDataDTO.MacroDataDTO.builder()
        .proteins(Math.round(totalProteins * 100.0) / 100.0)
        .carbohydrates(Math.round(totalCarbohydrates * 100.0) / 100.0)
        .fats(Math.round(totalFats * 100.0) / 100.0)
        .totalCalories(Math.round(totalCalories * 100.0) / 100.0)
        .build();
  }

  public DashboardDataDTO.WeeklyWorkoutDataDTO getWeeklyWorkoutData(String username) {
    // Por ahora devolvemos datos de ejemplo
    // Se puede implementar la lógica real cuando la entidad Routine esté
    // completamente configurada
    List<DashboardDataDTO.WorkoutDayDTO> workoutDays = Arrays.asList(
        DashboardDataDTO.WorkoutDayDTO.builder().day("Lun").sets(12).build(),
        DashboardDataDTO.WorkoutDayDTO.builder().day("Mar").sets(0).build(),
        DashboardDataDTO.WorkoutDayDTO.builder().day("Mié").sets(15).build(),
        DashboardDataDTO.WorkoutDayDTO.builder().day("Jue").sets(8).build(),
        DashboardDataDTO.WorkoutDayDTO.builder().day("Vie").sets(18).build(),
        DashboardDataDTO.WorkoutDayDTO.builder().day("Sáb").sets(0).build(),
        DashboardDataDTO.WorkoutDayDTO.builder().day("Dom").sets(10).build());

    return DashboardDataDTO.WeeklyWorkoutDataDTO.builder()
        .workoutDays(workoutDays)
        .build();
  }

  private int calculateActiveStreak(User user) {
    // Lógica simple para calcular racha activa basada en comidas registradas
    LocalDate today = LocalDate.now();
    int streak = 0;
    LocalDate checkDate = today;

    // Verificar hasta 30 días hacia atrás
    for (int i = 0; i < 30; i++) {
      boolean hasActivity = mealRepository.findByUserAndDate(user, checkDate).size() > 0;

      if (hasActivity) {
        streak++;
        checkDate = checkDate.minusDays(1);
      } else {
        break;
      }
    }

    return streak;
  }
}
