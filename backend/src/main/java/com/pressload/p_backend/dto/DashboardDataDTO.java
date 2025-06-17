package com.pressload.p_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardDataDTO {

  private MacroDataDTO macroData;
  private WeeklyWorkoutDataDTO weeklyWorkouts;
  private UserStatsDTO userStats;

  @Data
  @Builder
  @NoArgsConstructor
  @AllArgsConstructor
  public static class MacroDataDTO {
    private double proteins; // en gramos
    private double carbohydrates; // en gramos
    private double fats; // en gramos
    private double totalCalories;
  }

  @Data
  @Builder
  @NoArgsConstructor
  @AllArgsConstructor
  public static class WeeklyWorkoutDataDTO {
    private List<WorkoutDayDTO> workoutDays;
  }

  @Data
  @Builder
  @NoArgsConstructor
  @AllArgsConstructor
  public static class WorkoutDayDTO {
    private String day;
    private int sets;
  }

  @Data
  @Builder
  @NoArgsConstructor
  @AllArgsConstructor
  public static class UserStatsDTO {
    private String name;
    private String email;
    private int contacts;
    private int activeStreak;
  }
}
