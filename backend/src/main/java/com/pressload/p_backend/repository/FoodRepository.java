package com.pressload.p_backend.repository;

import com.pressload.p_backend.entity.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {

  // Buscar alimentos por nombre (búsqueda parcial)
  List<Food> findByNameContainingIgnoreCase(String name);

  // Buscar alimentos por marca
  List<Food> findByBrandContainingIgnoreCase(String brand);

  // Buscar alimentos por categoría
  List<Food> findByCategory(Food.FoodCategory category);

  // Buscar alimentos predefinidos (no personalizados)
  List<Food> findByIsCustomFalseOrderByNameAsc();

  // Buscar alimentos personalizados
  List<Food> findByIsCustomTrueOrderByNameAsc();

  // Buscar alimento por nombre exacto y marca
  Optional<Food> findByNameIgnoreCaseAndBrandIgnoreCase(String name, String brand);

  // Buscar alimentos por nombre y categoría
  List<Food> findByNameContainingIgnoreCaseAndCategory(String name, Food.FoodCategory category);

  // Buscar alimentos con calorías en un rango
  @Query("SELECT f FROM Food f WHERE f.calories BETWEEN :minCalories AND :maxCalories ORDER BY f.calories ASC")
  List<Food> findByCaloriesRange(@Param("minCalories") Double minCalories, @Param("maxCalories") Double maxCalories);

  // Buscar alimentos con proteínas altas (mayor a un valor específico)
  @Query("SELECT f FROM Food f WHERE f.proteins > :minProteins ORDER BY f.proteins DESC")
  List<Food> findHighProteinFoods(@Param("minProteins") Double minProteins);

  // Buscar alimentos con carbohidratos bajos (menor a un valor específico)
  @Query("SELECT f FROM Food f WHERE f.carbohydrates < :maxCarbs ORDER BY f.carbohydrates ASC")
  List<Food> findLowCarbFoods(@Param("maxCarbs") Double maxCarbs);

  // Buscar alimentos con grasas bajas (menor a un valor específico)
  @Query("SELECT f FROM Food f WHERE f.fats < :maxFats ORDER BY f.fats ASC")
  List<Food> findLowFatFoods(@Param("maxFats") Double maxFats);

  // Buscar alimentos más populares (más usados en meals)
  @Query("SELECT f FROM Food f JOIN f.mealFoods mf GROUP BY f ORDER BY COUNT(mf) DESC")
  List<Food> findMostUsedFoods();

  // Buscar alimentos por múltiples criterios
  @Query("SELECT f FROM Food f WHERE " +
      "(:name IS NULL OR LOWER(f.name) LIKE LOWER(CONCAT('%', :name, '%'))) AND " +
      "(:brand IS NULL OR LOWER(f.brand) LIKE LOWER(CONCAT('%', :brand, '%'))) AND " +
      "(:category IS NULL OR f.category = :category) AND " +
      "(:isCustom IS NULL OR f.isCustom = :isCustom)")
  List<Food> findByMultipleCriteria(@Param("name") String name,
      @Param("brand") String brand,
      @Param("category") Food.FoodCategory category,
      @Param("isCustom") Boolean isCustom);
}
