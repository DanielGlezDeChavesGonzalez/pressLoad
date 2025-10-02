package com.pressload.p_backend.user;

import com.pressload.p_backend.auth.LoginDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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

    @GetMapping("/")
    public ResponseEntity<Optional<List<User>>> getAllUsers (){
        return ResponseEntity.ok().body(userService.getAllUsers());
    }

    // Get user by id
    @GetMapping("/profile")
    public ResponseEntity<Optional<User>> getUserById(@RequestBody LoginDto loginDto) {
        return ResponseEntity.ok().body(userService.getUserByUsername(loginDto.getUsername()));
    }

    // Update a user
    @PutMapping("/update")
    public ResponseEntity<Optional<User>> updateUser(@RequestBody User user) {
        return ResponseEntity.ok().body(userService.updateUser(user));
    }

    // Delete a user
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUserById(@PathVariable Long id) {
        userService.deleteUserById(id);
        return ResponseEntity.ok().body("Deleted user successfully");
    }
}
