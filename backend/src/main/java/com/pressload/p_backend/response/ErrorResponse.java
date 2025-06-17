package com.pressload.p_backend.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponse {
  private String message;
  private String error;
  private int status;

  public ErrorResponse(String message) {
    this.message = message;
  }
}
