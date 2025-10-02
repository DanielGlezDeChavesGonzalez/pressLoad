package com.pressload.p_backend.routines;

import com.pressload.p_backend.user.User;
import com.pressload.p_backend.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/routine")
@AllArgsConstructor
public class RoutineController {

    private final RoutineService routineService;

    @GetMapping("/mine")
    public ResponseEntity<List<Routine>> getMyRoutines(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok().body(routineService.getRoutinesByUsername(user.getUsername()));
    }

    @PostMapping("/create")
    public ResponseEntity<Routine> createRoutine(@RequestBody RoutineRequest routineRequest, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok().body(routineService.saveRoutine(routineRequest, user));

    }


}
