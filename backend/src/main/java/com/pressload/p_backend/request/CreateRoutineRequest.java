package com.pressload.p_backend.request;

public class CreateRoutineRequest {
  private String name;
  private String description;
  private String date;
  private String notes;

  public CreateRoutineRequest() {
  }

  public CreateRoutineRequest(String name, String description, String date, String notes) {
    this.name = name;
    this.description = description;
    this.date = date;
    this.notes = notes;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getDate() {
    return date;
  }

  public void setDate(String date) {
    this.date = date;
  }

  public String getNotes() {
    return notes;
  }

  public void setNotes(String notes) {
    this.notes = notes;
  }
}
