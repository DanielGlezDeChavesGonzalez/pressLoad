package com.pressload.p_backend.service;

import com.pressload.p_backend.entity.*;
import com.pressload.p_backend.repository.FoodRepository;
import com.pressload.p_backend.repository.MealFoodRepository;
import com.pressload.p_backend.repository.MealRepository;
import com.pressload.p_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MealService {

  private final MealRepository mealRepository;
  private final FoodRepository foodRepository;
  private final MealFoodRepository mealFoodRepository;
  private final UserRepository userRepository;

  /**
   * Crear una nueva comida
   */
  @Transactional
  public Meal createMeal(String username, String mealName, LocalDate date, LocalTime time, String notes) {
    User user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Usuario no encontrado: " + username));

    Meal meal = Meal.builder()
        .name(mealName)
        .date(date)
        .time(time)
        .notes(notes)
        .totalCalories(0.0)
        .totalProteins(0.0)
        .totalCarbohydrates(0.0)
        .totalFats(0.0)
        .user(user)
        .build();

    return mealRepository.save(meal);
  }

  /**
   * Obtener todas las comidas de un usuario
   */
  public List<Meal> getUserMeals(String username) {
    User user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Usuario no encontrado: " + username));
    return mealRepository.findByUserOrderByDateDescTimeDesc(user);
  }

  /**
   * Obtener comidas de un usuario por fecha específica
   */
  public List<Meal> getUserMealsByDate(String username, LocalDate date) {
    User user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Usuario no encontrado: " + username));
    return mealRepository.findByUserAndDateOrderByTime(user, date);
  }

  /**
   * Obtener comidas de un usuario en un rango de fechas
   */
  public List<Meal> getUserMealsByDateRange(String username, LocalDate startDate, LocalDate endDate) {
    User user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Usuario no encontrado: " + username));
    return mealRepository.findByUserAndDateBetweenOrderByDateDescTimeDesc(user, startDate, endDate);
  }

  /**
   * Obtener una comida por ID (verificando que pertenezca al usuario)
   */
  public Optional<Meal> getMealById(Long mealId, String username) {
    Optional<Meal> meal = mealRepository.findById(mealId);
    if (meal.isPresent() && meal.get().getUser().getUsername().equals(username)) {
      return meal;
    }
    return Optional.empty();
  }

  /**
   * Actualizar información básica de una comida
   */
  @Transactional
  public Meal updateMeal(Long mealId, String username, String mealName, LocalDate date, LocalTime time, String notes) {
    Meal meal = getMealById(mealId, username)
        .orElseThrow(() -> new RuntimeException("Comida no encontrada o no autorizada"));

    meal.setName(mealName);
    meal.setDate(date);
    meal.setTime(time);
    meal.setNotes(notes);

    return mealRepository.save(meal);
  }

  /**
   * Eliminar una comida
   */
  @Transactional
  public void deleteMeal(Long mealId, String username) {
    Meal meal = getMealById(mealId, username)
        .orElseThrow(() -> new RuntimeException("Comida no encontrada o no autorizada"));

    mealRepository.delete(meal);
  }

  /**
   * Agregar un alimento a una comida
   */
  @Transactional
  public MealFood addFoodToMeal(Long mealId, Long foodId, Double quantity, String username, String notes) {
    Meal meal = getMealById(mealId, username)
        .orElseThrow(() -> new RuntimeException("Comida no encontrada o no autorizada"));

    Food food = foodRepository.findById(foodId)
        .orElseThrow(() -> new RuntimeException("Alimento no encontrado: " + foodId));

    MealFood mealFood = MealFood.builder()
        .meal(meal)
        .food(food)
        .quantity(quantity)
        .calories(food.getCalories())
        .proteins(food.getProteins())
        .carbohydrates(food.getCarbohydrates())
        .fats(food.getFats())
        .notes(notes)
        .build();

    mealFood = mealFoodRepository.save(mealFood);

    // Recalcular totales de la comida
    meal.calculateTotals();
    mealRepository.save(meal);

    return mealFood;
  }

  /**
   * Actualizar la cantidad de un alimento en una comida
   */
  @Transactional
  public MealFood updateMealFood(Long mealFoodId, Double quantity, String username, String notes) {
    MealFood mealFood = mealFoodRepository.findById(mealFoodId)
        .orElseThrow(() -> new RuntimeException("MealFood no encontrado: " + mealFoodId));

    // Verificar que el usuario sea el propietario de la comida
    if (!mealFood.getMeal().getUser().getUsername().equals(username)) {
      throw new RuntimeException("No autorizado para modificar este alimento");
    }

    mealFood.setQuantity(quantity);
    mealFood.setNotes(notes);
    mealFood = mealFoodRepository.save(mealFood);

    // Recalcular totales de la comida
    Meal meal = mealFood.getMeal();
    meal.calculateTotals();
    mealRepository.save(meal);

    return mealFood;
  }

  /**
   * Eliminar un alimento de una comida
   */
  @Transactional
  public void removeFoodFromMeal(Long mealFoodId, String username) {
    MealFood mealFood = mealFoodRepository.findById(mealFoodId)
        .orElseThrow(() -> new RuntimeException("MealFood no encontrado: " + mealFoodId));

    // Verificar que el usuario sea el propietario de la comida
    if (!mealFood.getMeal().getUser().getUsername().equals(username)) {
      throw new RuntimeException("No autorizado para eliminar este alimento");
    }

    Meal meal = mealFood.getMeal();
    mealFoodRepository.delete(mealFood);

    // Recalcular totales de la comida
    meal.calculateTotals();
    mealRepository.save(meal);
  }

  /**
   * Obtener alimentos de una comida específica
   */
  public List<MealFood> getMealFoods(Long mealId, String username) {
    Meal meal = getMealById(mealId, username)
        .orElseThrow(() -> new RuntimeException("Comida no encontrada o no autorizada"));

    return mealFoodRepository.findByMealOrderByCreatedAtAsc(meal);
  }

  /**
   * Obtener resumen nutricional diario de un usuario
   */
  public DailyNutritionSummary getDailyNutritionSummary(String username, LocalDate date) {
    User user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Usuario no encontrado: " + username));

    Double totalCalories = mealRepository.getTotalCaloriesByUserAndDate(user, date);
    Double totalProteins = mealRepository.getTotalProteinsByUserAndDate(user, date);
    Double totalCarbohydrates = mealRepository.getTotalCarbohydratesByUserAndDate(user, date);
    Double totalFats = mealRepository.getTotalFatsByUserAndDate(user, date);
    Long mealCount = mealRepository.countByUserAndDate(user, date);

    return DailyNutritionSummary.builder()
        .date(date)
        .totalCalories(totalCalories)
        .totalProteins(totalProteins)
        .totalCarbohydrates(totalCarbohydrates)
        .totalFats(totalFats)
        .mealCount(mealCount)
        .build();
  }

  /**
   * Clase interna para el resumen nutricional diario
   */
  @lombok.Data
  @lombok.Builder
  public static class DailyNutritionSummary {
    private LocalDate date;
    private Double totalCalories;
    private Double totalProteins;
    private Double totalCarbohydrates;
    private Double totalFats;
    private Long mealCount;
  }
}
