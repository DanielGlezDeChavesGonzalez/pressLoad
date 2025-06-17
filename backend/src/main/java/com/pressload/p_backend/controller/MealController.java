package com.pressload.p_backend.controller;

import com.pressload.p_backend.entity.MealFood;
import com.pressload.p_backend.entity.Meal;
import com.pressload.p_backend.service.MealService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/meals")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class MealController {

  private final MealService mealService;

  /**
   * Crear una nueva comida
   */
  @PostMapping
  public ResponseEntity<?> createMeal(
      @RequestBody CreateMealRequest request,
      Authentication authentication) {
    try {
      String username = authentication.getName();
      Meal meal = mealService.createMeal(
          username,
          request.getName(),
          request.getDate(),
          request.getTime(),
          request.getNotes());
      return ResponseEntity.status(HttpStatus.CREATED).body(meal);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(new ErrorResponse("Error al crear la comida: " + e.getMessage()));
    }
  }

  /**
   * Obtener todas las comidas del usuario
   */
  @GetMapping
  public ResponseEntity<?> getUserMeals(Authentication authentication) {
    try {
      String username = authentication.getName();
      List<Meal> meals = mealService.getUserMeals(username);
      return ResponseEntity.ok(meals);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(new ErrorResponse("Error al obtener las comidas: " + e.getMessage()));
    }
  }

  /**
   * Obtener comidas por fecha específica
   */
  @GetMapping("/date/{date}")
  public ResponseEntity<?> getMealsByDate(
      @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
      Authentication authentication) {
    try {
      String username = authentication.getName();
      List<Meal> meals = mealService.getUserMealsByDate(username, date);
      return ResponseEntity.ok(meals);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(new ErrorResponse("Error al obtener las comidas por fecha: " + e.getMessage()));
    }
  }

  /**
   * Obtener comidas en un rango de fechas
   */
  @GetMapping("/range")
  public ResponseEntity<?> getMealsByDateRange(
      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
      Authentication authentication) {
    try {
      String username = authentication.getName();
      List<Meal> meals = mealService.getUserMealsByDateRange(username, startDate, endDate);
      return ResponseEntity.ok(meals);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(new ErrorResponse("Error al obtener las comidas por rango: " + e.getMessage()));
    }
  }

  /**
   * Obtener una comida específica por ID
   */
  @GetMapping("/{id}")
  public ResponseEntity<?> getMealById(
      @PathVariable Long id,
      Authentication authentication) {
    try {
      String username = authentication.getName();
      return mealService.getMealById(id, username)
          .map(meal -> ResponseEntity.ok(meal))
          .orElse(ResponseEntity.notFound().build());
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(new ErrorResponse("Error al obtener la comida: " + e.getMessage()));
    }
  }

  /**
   * Actualizar una comida
   */
  @PutMapping("/{id}")
  public ResponseEntity<?> updateMeal(
      @PathVariable Long id,
      @RequestBody UpdateMealRequest request,
      Authentication authentication) {
    try {
      String username = authentication.getName();
      Meal meal = mealService.updateMeal(
          id,
          username,
          request.getName(),
          request.getDate(),
          request.getTime(),
          request.getNotes());
      return ResponseEntity.ok(meal);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(new ErrorResponse("Error al actualizar la comida: " + e.getMessage()));
    }
  }

  /**
   * Eliminar una comida
   */
  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteMeal(
      @PathVariable Long id,
      Authentication authentication) {
    try {
      String username = authentication.getName();
      mealService.deleteMeal(id, username);
      return ResponseEntity.ok(new SuccessResponse("Comida eliminada exitosamente"));
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(new ErrorResponse("Error al eliminar la comida: " + e.getMessage()));
    }
  }

  /**
   * Agregar un alimento a una comida
   */
  @PostMapping("/{mealId}/foods")
  public ResponseEntity<?> addFoodToMeal(
      @PathVariable Long mealId,
      @RequestBody AddFoodToMealRequest request,
      Authentication authentication) {
    try {
      String username = authentication.getName();
      MealFood mealFood = mealService.addFoodToMeal(
          mealId,
          request.getFoodId(),
          request.getQuantity(),
          username,
          request.getNotes());
      return ResponseEntity.status(HttpStatus.CREATED).body(mealFood);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(new ErrorResponse("Error al agregar alimento a la comida: " + e.getMessage()));
    }
  }

  /**
   * Actualizar la cantidad de un alimento en una comida
   */
  @PutMapping("/foods/{mealFoodId}")
  public ResponseEntity<?> updateMealFood(
      @PathVariable Long mealFoodId,
      @RequestBody UpdateMealFoodRequest request,
      Authentication authentication) {
    try {
      String username = authentication.getName();
      MealFood mealFood = mealService.updateMealFood(
          mealFoodId,
          request.getQuantity(),
          username,
          request.getNotes());
      return ResponseEntity.ok(mealFood);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(new ErrorResponse("Error al actualizar el alimento: " + e.getMessage()));
    }
  }

  /**
   * Eliminar un alimento de una comida
   */
  @DeleteMapping("/foods/{mealFoodId}")
  public ResponseEntity<?> removeFoodFromMeal(
      @PathVariable Long mealFoodId,
      Authentication authentication) {
    try {
      String username = authentication.getName();
      mealService.removeFoodFromMeal(mealFoodId, username);
      return ResponseEntity.ok(new SuccessResponse("Alimento eliminado de la comida exitosamente"));
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(new ErrorResponse("Error al eliminar el alimento: " + e.getMessage()));
    }
  }

  /**
   * Obtener alimentos de una comida específica
   */
  @GetMapping("/{mealId}/foods")
  public ResponseEntity<?> getMealFoods(
      @PathVariable Long mealId,
      Authentication authentication) {
    try {
      String username = authentication.getName();
      List<MealFood> mealFoods = mealService.getMealFoods(mealId, username);
      return ResponseEntity.ok(mealFoods);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(new ErrorResponse("Error al obtener los alimentos de la comida: " + e.getMessage()));
    }
  }

  /**
   * Obtener resumen nutricional diario
   */
  @GetMapping("/nutrition/daily/{date}")
  public ResponseEntity<?> getDailyNutritionSummary(
      @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
      Authentication authentication) {
    try {
      String username = authentication.getName();
      MealService.DailyNutritionSummary summary = mealService.getDailyNutritionSummary(username, date);
      return ResponseEntity.ok(summary);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(new ErrorResponse("Error al obtener el resumen nutricional: " + e.getMessage()));
    }
  }

  // DTOs para las requests
  @lombok.Data
  public static class CreateMealRequest {
    private String name;
    private LocalDate date;
    private LocalTime time;
    private String notes;
  }

  @lombok.Data
  public static class UpdateMealRequest {
    private String name;
    private LocalDate date;
    private LocalTime time;
    private String notes;
  }

  @lombok.Data
  public static class AddFoodToMealRequest {
    private Long foodId;
    private Double quantity;
    private String notes;
  }

  @lombok.Data
  public static class UpdateMealFoodRequest {
    private Double quantity;
    private String notes;
  }

  @lombok.Data
  public static class ErrorResponse {
    private String message;
    private String timestamp;

    public ErrorResponse(String message) {
      this.message = message;
      this.timestamp = java.time.LocalDateTime.now().toString();
    }
  }

  @lombok.Data
  public static class SuccessResponse {
    private String message;
    private String timestamp;

    public SuccessResponse(String message) {
      this.message = message;
      this.timestamp = java.time.LocalDateTime.now().toString();
    }
  }
}
