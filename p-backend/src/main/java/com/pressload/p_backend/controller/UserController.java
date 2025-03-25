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
    public ResponseEntity<Optional<User>> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok().body(userService.getUserById(id));
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
