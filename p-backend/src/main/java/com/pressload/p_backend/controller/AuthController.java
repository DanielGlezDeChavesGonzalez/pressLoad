package com.pressload.p_backend.controller;

import com.pressload.p_backend.entity.User;
import com.pressload.p_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Validated
public class AuthController {

    private final UserService userService;

    // TODO:
    // Get user by username and password revise
    // @CrossOrigin(origins = "http://localhost:5173") // Habilita CORS solo para este endpoint
    // el post si no encuentra el usuario que devuelva error, en vez de null
    @PostMapping("/login")
    public ResponseEntity<Optional<User>> loginUser(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

//        System.out.println("Intento de login: " + username + " " + password);

        Optional<User> user = userService.getUserByUsernameAndPassword(username, password);

        if (user.isPresent()) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Optional.empty());
        }
    }

    // Post a user
    @PostMapping("/register")
    public ResponseEntity<User> saveUser(@RequestBody User user){

//      String passwordEncripted   :: Must implement encripted password
        return ResponseEntity.ok().body(userService.saveUser(user));
    }
}
