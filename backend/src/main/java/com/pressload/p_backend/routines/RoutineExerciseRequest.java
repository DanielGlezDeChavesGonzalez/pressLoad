package com.pressload.p_backend.routines;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class RoutineExerciseRequest {

    private String exerciseName;
    private Integer sets;
    private Integer reps;
    private Double weight;
}
