package com.pressload.p_backend.service;

import com.pressload.p_backend.entity.Food;
import com.pressload.p_backend.repository.FoodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FoodService {

  private final FoodRepository foodRepository;

  /**
   * Crear un nuevo alimento
   */
  @Transactional
  public Food createFood(String name, String brand, Double calories, Double proteins,
      Double carbohydrates, Double fats, Double fiber, Double sugar,
      Double sodium, String description, Food.FoodCategory category,
      Boolean isCustom) {
    Food food = Food.builder()
        .name(name)
        .brand(brand)
        .calories(calories)
        .proteins(proteins)
        .carbohydrates(carbohydrates)
        .fats(fats)
        .fiber(fiber)
        .sugar(sugar)
        .sodium(sodium)
        .description(description)
        .category(category)
        .isCustom(isCustom)
        .build();

    return foodRepository.save(food);
  }

  /**
   * Obtener todos los alimentos
   */
  public List<Food> getAllFoods() {
    return foodRepository.findAll();
  }

  /**
   * Obtener alimento por ID
   */
  public Optional<Food> getFoodById(Long id) {
    return foodRepository.findById(id);
  }

  /**
   * Buscar alimentos por nombre
   */
  public List<Food> searchFoodsByName(String name) {
    return foodRepository.findByNameContainingIgnoreCase(name);
  }

  /**
   * Buscar alimentos por marca
   */
  public List<Food> searchFoodsByBrand(String brand) {
    return foodRepository.findByBrandContainingIgnoreCase(brand);
  }

  /**
   * Obtener alimentos por categoría
   */
  public List<Food> getFoodsByCategory(Food.FoodCategory category) {
    return foodRepository.findByCategory(category);
  }

  /**
   * Obtener alimentos predefinidos (no personalizados)
   */
  public List<Food> getPredefinedFoods() {
    return foodRepository.findByIsCustomFalseOrderByNameAsc();
  }

  /**
   * Obtener alimentos personalizados
   */
  public List<Food> getCustomFoods() {
    return foodRepository.findByIsCustomTrueOrderByNameAsc();
  }

  /**
   * Buscar alimentos con filtros múltiples
   */
  public List<Food> searchFoodsWithFilters(String name, String brand,
      Food.FoodCategory category, Boolean isCustom) {
    return foodRepository.findByMultipleCriteria(name, brand, category, isCustom);
  }

  /**
   * Obtener alimentos con alto contenido de proteínas
   */
  public List<Food> getHighProteinFoods(Double minProteins) {
    return foodRepository.findHighProteinFoods(minProteins);
  }

  /**
   * Obtener alimentos con bajo contenido de carbohidratos
   */
  public List<Food> getLowCarbFoods(Double maxCarbs) {
    return foodRepository.findLowCarbFoods(maxCarbs);
  }

  /**
   * Obtener alimentos con bajo contenido de grasas
   */
  public List<Food> getLowFatFoods(Double maxFats) {
    return foodRepository.findLowFatFoods(maxFats);
  }

  /**
   * Obtener alimentos en un rango de calorías
   */
  public List<Food> getFoodsByCaloriesRange(Double minCalories, Double maxCalories) {
    return foodRepository.findByCaloriesRange(minCalories, maxCalories);
  }

  /**
   * Obtener alimentos más utilizados
   */
  public List<Food> getMostUsedFoods() {
    return foodRepository.findMostUsedFoods();
  }

  /**
   * Actualizar un alimento
   */
  @Transactional
  public Food updateFood(Long id, String name, String brand, Double calories, Double proteins,
      Double carbohydrates, Double fats, Double fiber, Double sugar,
      Double sodium, String description, Food.FoodCategory category) {
    Food food = foodRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Alimento no encontrado: " + id));

    food.setName(name);
    food.setBrand(brand);
    food.setCalories(calories);
    food.setProteins(proteins);
    food.setCarbohydrates(carbohydrates);
    food.setFats(fats);
    food.setFiber(fiber);
    food.setSugar(sugar);
    food.setSodium(sodium);
    food.setDescription(description);
    food.setCategory(category);

    return foodRepository.save(food);
  }

  /**
   * Eliminar un alimento
   */
  @Transactional
  public void deleteFood(Long id) {
    Food food = foodRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Alimento no encontrado: " + id));

    // Solo permitir eliminar alimentos personalizados
    if (!food.getIsCustom()) {
      throw new RuntimeException("No se pueden eliminar alimentos predefinidos");
    }

    foodRepository.delete(food);
  }

  /**
   * Verificar si un alimento ya existe (por nombre y marca)
   */
  public boolean foodExists(String name, String brand) {
    return foodRepository.findByNameIgnoreCaseAndBrandIgnoreCase(name, brand).isPresent();
  }

  /**
   * Obtener todas las categorías de alimentos disponibles
   */
  public Food.FoodCategory[] getAllCategories() {
    return Food.FoodCategory.values();
  }

  /**
   * Crear alimentos predefinidos básicos (para inicialización)
   */
  @Transactional
  public void createBasicFoods() {
    // Solo crear si no existen alimentos predefinidos
    if (foodRepository.findByIsCustomFalseOrderByNameAsc().isEmpty()) {
      createPredefinedFood("Pollo Pechuga", "Genérico", 165.0, 31.0, 0.0, 3.6, 0.0, 0.0, 74.0,
          "Pechuga de pollo sin piel", Food.FoodCategory.PROTEINS);

      createPredefinedFood("Arroz Blanco", "Genérico", 130.0, 2.7, 28.0, 0.3, 0.4, 0.1, 1.0,
          "Arroz blanco cocido", Food.FoodCategory.CARBOHYDRATES);

      createPredefinedFood("Brócoli", "Genérico", 34.0, 2.8, 7.0, 0.4, 2.6, 1.5, 33.0,
          "Brócoli fresco", Food.FoodCategory.VEGETABLES);

      createPredefinedFood("Banana", "Genérico", 89.0, 1.1, 23.0, 0.3, 2.6, 12.0, 1.0,
          "Banana fresca", Food.FoodCategory.FRUITS);

      createPredefinedFood("Huevo", "Genérico", 155.0, 13.0, 1.1, 11.0, 0.0, 1.1, 124.0,
          "Huevo de gallina completo", Food.FoodCategory.PROTEINS);
    }
  }

  private void createPredefinedFood(String name, String brand, Double calories, Double proteins,
      Double carbohydrates, Double fats, Double fiber, Double sugar,
      Double sodium, String description, Food.FoodCategory category) {
    if (!foodExists(name, brand)) {
      createFood(name, brand, calories, proteins, carbohydrates, fats, fiber, sugar,
          sodium, description, category, false);
    }
  }
}
