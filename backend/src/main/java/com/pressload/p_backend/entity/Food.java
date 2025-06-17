package com.pressload.p_backend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "foods")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Food {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 100)
  private String name;

  @Column(nullable = false)
  private String brand;

  @Column(nullable = false)
  private Double calories; // por 100g

  @Column(nullable = false)
  private Double proteins; // por 100g

  @Column(nullable = false)
  private Double carbohydrates; // por 100g

  @Column(nullable = false)
  private Double fats; // por 100g

  @Column(nullable = false)
  private Double fiber; // por 100g

  @Column(nullable = false)
  private Double sugar; // por 100g

  @Column(nullable = false)
  private Double sodium; // por 100g (en mg)

  @Column(columnDefinition = "TEXT")
  private String description;

  @Column(nullable = false)
  @Enumerated(EnumType.STRING)
  private FoodCategory category;

  @Column(nullable = false)
  private Boolean isCustom; // true si es creado por usuario, false si es predefinido

  @Column(updatable = false)
  @CreationTimestamp
  private LocalDateTime createdAt;

  @UpdateTimestamp
  private LocalDateTime updatedAt;

  @OneToMany(mappedBy = "food", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  @JsonManagedReference
  private List<MealFood> mealFoods;

  public enum FoodCategory {
    PROTEINS,
    CARBOHYDRATES,
    VEGETABLES,
    FRUITS,
    DAIRY,
    GRAINS,
    SNACKS,
    BEVERAGES,
    OILS_FATS,
    SUPPLEMENTS,
    OTHER
  }
}
