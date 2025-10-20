package com.pressload.p_backend.user;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.pressload.p_backend.routines.Routine;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private String username;
    private String email;
    private List<Routine> routines;
    private Role role;

}
