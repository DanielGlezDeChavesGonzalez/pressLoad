package com.pressload.p_backend.controller;

import com.pressload.p_backend.entity.Food;
import com.pressload.p_backend.service.FoodService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/foods")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class FoodController {

  private final FoodService foodService;

  /**
   * Crear un nuevo alimento personalizado
   */
  @PostMapping
  public ResponseEntity<?> createFood(
      @RequestBody CreateFoodRequest request,
      Authentication authentication) {
    try {
      Food food = foodService.createFood(
          request.getName(),
          request.getBrand(),
          request.getCalories(),
          request.getProteins(),
          request.getCarbohydrates(),
          request.getFats(),
          request.getFiber(),
          request.getSugar(),
          request.getSodium(),
          request.getDescription(),
          request.getCategory(),
          true // Es personalizado
      );
      return ResponseEntity.status(HttpStatus.CREATED).body(food);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(new ErrorResponse("Error al crear el alimento: " + e.getMessage()));
    }
  }

  /**
   * Obtener todos los alimentos
   */
  @GetMapping
  public ResponseEntity<?> getAllFoods() {
    try {
      List<Food> foods = foodService.getAllFoods();
      return ResponseEntity.ok(foods);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(new ErrorResponse("Error al obtener los alimentos: " + e.getMessage()));
    }
  }

  /**
   * Obtener alimento por ID
   */
  @GetMapping("/{id}")
  public ResponseEntity<?> getFoodById(@PathVariable Long id) {
    try {
      return foodService.getFoodById(id)
          .map(food -> ResponseEntity.ok(food))
          .orElse(ResponseEntity.notFound().build());
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(new ErrorResponse("Error al obtener el alimento: " + e.getMessage()));
    }
  }

  /**
   * Buscar alimentos por nombre
   */
  @GetMapping("/search")
  public ResponseEntity<?> searchFoods(
      @RequestParam(required = false) String name,
      @RequestParam(required = false) String brand,
      @RequestParam(required = false) Food.FoodCategory category,
      @RequestParam(required = false) Boolean isCustom) {
    try {
      List<Food> foods;

      if (name != null || brand != null || category != null || isCustom != null) {
        foods = foodService.searchFoodsWithFilters(name, brand, category, isCustom);
      } else {
        foods = foodService.getAllFoods();
      }

      return ResponseEntity.ok(foods);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(new ErrorResponse("Error al buscar alimentos: " + e.getMessage()));
    }
  }

  /**
   * Obtener alimentos por categoría
   */
  @GetMapping("/category/{category}")
  public ResponseEntity<?> getFoodsByCategory(@PathVariable Food.FoodCategory category) {
    try {
      List<Food> foods = foodService.getFoodsByCategory(category);
      return ResponseEntity.ok(foods);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(new ErrorResponse("Error al obtener alimentos por categoría: " + e.getMessage()));
    }
  }

  /**
   * Obtener alimentos predefinidos
   */
  @GetMapping("/predefined")
  public ResponseEntity<?> getPredefinedFoods() {
    try {
      List<Food> foods = foodService.getPredefinedFoods();
      return ResponseEntity.ok(foods);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(new ErrorResponse("Error al obtener alimentos predefinidos: " + e.getMessage()));
    }
  }

  /**
   * Obtener alimentos personalizados
   */
  @GetMapping("/custom")
  public ResponseEntity<?> getCustomFoods() {
    try {
      List<Food> foods = foodService.getCustomFoods();
      return ResponseEntity.ok(foods);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(new ErrorResponse("Error al obtener alimentos personalizados: " + e.getMessage()));
    }
  }

  /**
   * Obtener alimentos con alto contenido proteico
   */
  @GetMapping("/high-protein")
  public ResponseEntity<?> getHighProteinFoods(@RequestParam(defaultValue = "20.0") Double minProteins) {
    try {
      List<Food> foods = foodService.getHighProteinFoods(minProteins);
      return ResponseEntity.ok(foods);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(new ErrorResponse("Error al obtener alimentos con alta proteína: " + e.getMessage()));
    }
  }

  /**
   * Obtener alimentos bajos en carbohidratos
   */
  @GetMapping("/low-carb")
  public ResponseEntity<?> getLowCarbFoods(@RequestParam(defaultValue = "10.0") Double maxCarbs) {
    try {
      List<Food> foods = foodService.getLowCarbFoods(maxCarbs);
      return ResponseEntity.ok(foods);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(new ErrorResponse("Error al obtener alimentos bajos en carbohidratos: " + e.getMessage()));
    }
  }

  /**
   * Obtener alimentos bajos en grasas
   */
  @GetMapping("/low-fat")
  public ResponseEntity<?> getLowFatFoods(@RequestParam(defaultValue = "5.0") Double maxFats) {
    try {
      List<Food> foods = foodService.getLowFatFoods(maxFats);
      return ResponseEntity.ok(foods);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(new ErrorResponse("Error al obtener alimentos bajos en grasas: " + e.getMessage()));
    }
  }

  /**
   * Obtener alimentos en rango de calorías
   */
  @GetMapping("/calories-range")
  public ResponseEntity<?> getFoodsByCaloriesRange(
      @RequestParam Double minCalories,
      @RequestParam Double maxCalories) {
    try {
      List<Food> foods = foodService.getFoodsByCaloriesRange(minCalories, maxCalories);
      return ResponseEntity.ok(foods);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(new ErrorResponse("Error al obtener alimentos por rango de calorías: " + e.getMessage()));
    }
  }

  /**
   * Obtener alimentos más utilizados
   */
  @GetMapping("/most-used")
  public ResponseEntity<?> getMostUsedFoods() {
    try {
      List<Food> foods = foodService.getMostUsedFoods();
      return ResponseEntity.ok(foods);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(new ErrorResponse("Error al obtener alimentos más utilizados: " + e.getMessage()));
    }
  }

  /**
   * Actualizar un alimento personalizado
   */
  @PutMapping("/{id}")
  public ResponseEntity<?> updateFood(
      @PathVariable Long id,
      @RequestBody UpdateFoodRequest request,
      Authentication authentication) {
    try {
      Food food = foodService.updateFood(
          id,
          request.getName(),
          request.getBrand(),
          request.getCalories(),
          request.getProteins(),
          request.getCarbohydrates(),
          request.getFats(),
          request.getFiber(),
          request.getSugar(),
          request.getSodium(),
          request.getDescription(),
          request.getCategory());
      return ResponseEntity.ok(food);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(new ErrorResponse("Error al actualizar el alimento: " + e.getMessage()));
    }
  }

  /**
   * Eliminar un alimento personalizado
   */
  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteFood(
      @PathVariable Long id,
      Authentication authentication) {
    try {
      foodService.deleteFood(id);
      return ResponseEntity.ok(new SuccessResponse("Alimento eliminado exitosamente"));
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(new ErrorResponse("Error al eliminar el alimento: " + e.getMessage()));
    }
  }

  /**
   * Obtener todas las categorías disponibles
   */
  @GetMapping("/categories")
  public ResponseEntity<?> getAllCategories() {
    try {
      Food.FoodCategory[] categories = foodService.getAllCategories();
      return ResponseEntity.ok(categories);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(new ErrorResponse("Error al obtener las categorías: " + e.getMessage()));
    }
  }

  /**
   * Inicializar alimentos básicos predefinidos
   */
  @PostMapping("/init-basics")
  public ResponseEntity<?> initBasicFoods() {
    try {
      foodService.createBasicFoods();
      return ResponseEntity.ok(new SuccessResponse("Alimentos básicos inicializados exitosamente"));
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(new ErrorResponse("Error al inicializar alimentos básicos: " + e.getMessage()));
    }
  }

  // DTOs para las requests
  @lombok.Data
  public static class CreateFoodRequest {
    private String name;
    private String brand;
    private Double calories;
    private Double proteins;
    private Double carbohydrates;
    private Double fats;
    private Double fiber;
    private Double sugar;
    private Double sodium;
    private String description;
    private Food.FoodCategory category;
  }

  @lombok.Data
  public static class UpdateFoodRequest {
    private String name;
    private String brand;
    private Double calories;
    private Double proteins;
    private Double carbohydrates;
    private Double fats;
    private Double fiber;
    private Double sugar;
    private Double sodium;
    private String description;
    private Food.FoodCategory category;
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
