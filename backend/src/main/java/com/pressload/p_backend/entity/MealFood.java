package com.pressload.p_backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "meal_foods")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MealFood {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private Double quantity; // en gramos

  @Column(nullable = false)
  private Double calories; // calorías por 100g del alimento

  @Column(nullable = false)
  private Double proteins; // proteínas por 100g del alimento

  @Column(nullable = false)
  private Double carbohydrates; // carbohidratos por 100g del alimento

  @Column(nullable = false)
  private Double fats; // grasas por 100g del alimento

  @Column(columnDefinition = "TEXT")
  private String notes;

  @Column(updatable = false)
  @CreationTimestamp
  private LocalDateTime createdAt;

  @UpdateTimestamp
  private LocalDateTime updatedAt;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "meal_id", nullable = false)
  @JsonBackReference
  private Meal meal;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "food_id", nullable = false)
  @JsonBackReference
  private Food food;

  // Métodos helper para calcular valores nutricionales totales
  public Double getTotalCalories() {
    return (calories * quantity) / 100.0;
  }

  public Double getTotalProteins() {
    return (proteins * quantity) / 100.0;
  }

  public Double getTotalCarbohydrates() {
    return (carbohydrates * quantity) / 100.0;
  }

  public Double getTotalFats() {
    return (fats * quantity) / 100.0;
  }
}
