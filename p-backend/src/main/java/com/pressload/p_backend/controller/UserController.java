package com.pressload.p_backend.controller;

import com.pressload.p_backend.entity.Routine;
import com.pressload.p_backend.entity.User;
import com.pressload.p_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * Controller class is where all the user requests are handled and required/appropriate
 * responses are sent
 */

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Validated
public class UserController {

    private final UserService userService;

    // Get all users
//    @GetMapping("/")
//    public ResponseEntity<List<User>> getAllUsers(){
//        return ResponseEntity.ok().body(userService.getAllUsers());
//    }

    // Get user by id
    @GetMapping("/{id}")
    public ResponseEntity<Optional<User>> getUserById(@PathVariable Long id){
        return ResponseEntity.ok().body(userService.getUserById(id));
    }

    // TODO:
    // Get user by username and password revise
//    @CrossOrigin(origins = "http://localhost:5173") // Habilita CORS solo para este endpoint
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

    // Update a user
    @PutMapping("/update")
    public ResponseEntity<User> updateUser(@RequestBody User user){
        return ResponseEntity.ok().body(userService.updateUser(user));
    }

    // Delete a user
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUserById(@PathVariable Long id){
        userService.deleteUserById(id);
        return ResponseEntity.ok().body("Deleted user successfully");
    }
}
