package com.pressload.p_backend.repository;

import com.pressload.p_backend.entity.Meal;
import com.pressload.p_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface MealRepository extends JpaRepository<Meal, Long> {

  // Buscar comidas por usuario
  List<Meal> findByUserOrderByDateDescTimeDesc(User user);

  // Buscar comidas por usuario y fecha específica
  List<Meal> findByUserAndDateOrderByTime(User user, LocalDate date);

  // Alias para compatibilidad con DashboardService
  default List<Meal> findByUserAndDate(User user, LocalDate date) {
    return findByUserAndDateOrderByTime(user, date);
  }

  // Buscar comidas por usuario en un rango de fechas
  List<Meal> findByUserAndDateBetweenOrderByDateDescTimeDesc(User user, LocalDate startDate, LocalDate endDate);

  // Buscar comida específica por usuario, fecha y nombre
  Optional<Meal> findByUserAndDateAndName(User user, LocalDate date, String name);

  // Contar comidas por usuario y fecha
  long countByUserAndDate(User user, LocalDate date);

  // Buscar comidas por usuario con calorías totales mayores a un valor
  @Query("SELECT m FROM Meal m WHERE m.user = :user AND m.totalCalories > :calories ORDER BY m.date DESC, m.time DESC")
  List<Meal> findByUserAndTotalCaloriesGreaterThan(@Param("user") User user, @Param("calories") Double calories);

  // Obtener suma de calorías por usuario y fecha
  @Query("SELECT COALESCE(SUM(m.totalCalories), 0) FROM Meal m WHERE m.user = :user AND m.date = :date")
  Double getTotalCaloriesByUserAndDate(@Param("user") User user, @Param("date") LocalDate date);

  // Obtener suma de proteínas por usuario y fecha
  @Query("SELECT COALESCE(SUM(m.totalProteins), 0) FROM Meal m WHERE m.user = :user AND m.date = :date")
  Double getTotalProteinsByUserAndDate(@Param("user") User user, @Param("date") LocalDate date);

  // Obtener suma de carbohidratos por usuario y fecha
  @Query("SELECT COALESCE(SUM(m.totalCarbohydrates), 0) FROM Meal m WHERE m.user = :user AND m.date = :date")
  Double getTotalCarbohydratesByUserAndDate(@Param("user") User user, @Param("date") LocalDate date);

  // Obtener suma de grasas por usuario y fecha
  @Query("SELECT COALESCE(SUM(m.totalFats), 0) FROM Meal m WHERE m.user = :user AND m.date = :date")
  Double getTotalFatsByUserAndDate(@Param("user") User user, @Param("date") LocalDate date);

  // Eliminar todas las comidas de un usuario
  void deleteByUser(User user);
}
