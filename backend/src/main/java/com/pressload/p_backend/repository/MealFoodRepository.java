package com.pressload.p_backend.repository;

import com.pressload.p_backend.entity.Food;
import com.pressload.p_backend.entity.Meal;
import com.pressload.p_backend.entity.MealFood;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MealFoodRepository extends JpaRepository<MealFood, Long> {

  // Buscar todos los alimentos de una comida específica
  List<MealFood> findByMealOrderByCreatedAtAsc(Meal meal);

  // Buscar todas las comidas que contienen un alimento específico
  List<MealFood> findByFoodOrderByCreatedAtDesc(Food food);

  // Buscar por comida y alimento específicos
  List<MealFood> findByMealAndFood(Meal meal, Food food);

  // Eliminar todos los alimentos de una comida
  void deleteByMeal(Meal meal);

  // Eliminar todas las referencias de un alimento
  void deleteByFood(Food food);

  // Contar cuántos alimentos diferentes tiene una comida
  long countByMeal(Meal meal);

  // Obtener la cantidad total de un alimento en una comida específica
  @Query("SELECT COALESCE(SUM(mf.quantity), 0) FROM MealFood mf WHERE mf.meal = :meal AND mf.food = :food")
  Double getTotalQuantityByMealAndFood(@Param("meal") Meal meal, @Param("food") Food food);

  // Obtener las calorías totales de todos los alimentos en una comida
  @Query("SELECT COALESCE(SUM(mf.calories * mf.quantity / 100.0), 0) FROM MealFood mf WHERE mf.meal = :meal")
  Double getTotalCaloriesByMeal(@Param("meal") Meal meal);

  // Obtener las proteínas totales de todos los alimentos en una comida
  @Query("SELECT COALESCE(SUM(mf.proteins * mf.quantity / 100.0), 0) FROM MealFood mf WHERE mf.meal = :meal")
  Double getTotalProteinsByMeal(@Param("meal") Meal meal);

  // Obtener los carbohidratos totales de todos los alimentos en una comida
  @Query("SELECT COALESCE(SUM(mf.carbohydrates * mf.quantity / 100.0), 0) FROM MealFood mf WHERE mf.meal = :meal")
  Double getTotalCarbohydratesByMeal(@Param("meal") Meal meal);

  // Obtener las grasas totales de todos los alimentos en una comida
  @Query("SELECT COALESCE(SUM(mf.fats * mf.quantity / 100.0), 0) FROM MealFood mf WHERE mf.meal = :meal")
  Double getTotalFatsByMeal(@Param("meal") Meal meal);

  // Buscar los alimentos más utilizados globalmente
  @Query("SELECT mf.food, COUNT(mf) as usage_count FROM MealFood mf GROUP BY mf.food ORDER BY usage_count DESC")
  List<Object[]> findMostUsedFoods();

  // Buscar los alimentos más utilizados por un usuario específico
  @Query("SELECT mf.food, COUNT(mf) as usage_count FROM MealFood mf WHERE mf.meal.user.id = :userId GROUP BY mf.food ORDER BY usage_count DESC")
  List<Object[]> findMostUsedFoodsByUser(@Param("userId") Long userId);

  // Obtener estadísticas nutricionales promedio por alimento
  @Query("SELECT mf.food, AVG(mf.quantity), AVG(mf.calories * mf.quantity / 100.0) FROM MealFood mf GROUP BY mf.food")
  List<Object[]> getFoodNutritionalStats();
}
