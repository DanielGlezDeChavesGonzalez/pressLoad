package com.pressload.p_backend.request;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class CreateMealRequest {
  private String name;
  private LocalDate date;
  private LocalTime time;
  private String notes;
}
