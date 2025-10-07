package com.pressload.p_backend.routines;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoutineRequest {
    private String name;
    private String description;
    private String date;
    private List<RoutineExercise> routineExercise;
}
