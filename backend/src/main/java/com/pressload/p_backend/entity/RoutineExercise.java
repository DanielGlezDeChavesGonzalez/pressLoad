package com.pressload.p_backend.entity;

import com.pressload.p_backend.routines.Routine;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "routine_exercises", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"routine_id", "exercise_id"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoutineExercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "routine_id", nullable = false)
    private Routine routine;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exercise_id", nullable = false)
    private Exercise exercise;

    @Column(name = "\"order\"")
    private Integer order;

    @ElementCollection
    @CollectionTable(
            name = "routine_exercise_reps_weights",
            joinColumns = @JoinColumn(name = "routine_exercise_id")
    )
    private List<RepsWeight> repsWeights;
}

