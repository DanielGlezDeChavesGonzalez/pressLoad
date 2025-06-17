package com.pressload.p_backend.configuration;

import com.pressload.p_backend.service.FoodService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

  private final FoodService foodService;

  @Override
  public void run(String... args) throws Exception {
    // Inicializar alimentos básicos predefinidos
    foodService.createBasicFoods();
  }
}
