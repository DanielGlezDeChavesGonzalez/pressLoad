package com.pressload.p_backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Entity
@Table(name = "meals")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Meal {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 100)
  private String name;

  @Column(nullable = false)
  private LocalTime time;

  @Column(nullable = false)
  private LocalDate date;

  @Column(nullable = false)
  private Double totalCalories;

  @Column(nullable = false)
  private Double totalProteins;

  @Column(nullable = false)
  private Double totalCarbohydrates;

  @Column(nullable = false)
  private Double totalFats;

  @Column(columnDefinition = "TEXT")
  private String notes;

  @Column(updatable = false)
  @CreationTimestamp
  private LocalDateTime createdAt;

  @UpdateTimestamp
  private LocalDateTime updatedAt;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false)
  @JsonBackReference
  private User user;

  @OneToMany(mappedBy = "meal", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
  @JsonManagedReference
  private List<MealFood> mealFoods;

  // Método helper para calcular totales automáticamente
  public void calculateTotals() {
    if (mealFoods != null && !mealFoods.isEmpty()) {
      this.totalCalories = mealFoods.stream()
          .mapToDouble(mf -> mf.getCalories() * mf.getQuantity() / 100.0)
          .sum();

      this.totalProteins = mealFoods.stream()
          .mapToDouble(mf -> mf.getProteins() * mf.getQuantity() / 100.0)
          .sum();

      this.totalCarbohydrates = mealFoods.stream()
          .mapToDouble(mf -> mf.getCarbohydrates() * mf.getQuantity() / 100.0)
          .sum();

      this.totalFats = mealFoods.stream()
          .mapToDouble(mf -> mf.getFats() * mf.getQuantity() / 100.0)
          .sum();
    } else {
      this.totalCalories = 0.0;
      this.totalProteins = 0.0;
      this.totalCarbohydrates = 0.0;
      this.totalFats = 0.0;
    }
  }
}
