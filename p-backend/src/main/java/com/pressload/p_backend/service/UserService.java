package com.pressload.p_backend.service;

import com.pressload.p_backend.entity.User;
import com.pressload.p_backend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id){
        return userRepository.findById(id);
    }

    public Optional<User> getUserByUsernameAndPassword(String username, String password){
        return Optional.ofNullable(userRepository.findByUsernameAndPassword(username, password));
    }

    public User saveUser(User user){
        return userRepository.save(user);
    }

    public Optional<User> updateUser(User updatedUser) {
        return userRepository.findById(updatedUser.getId())
                .map(existingUser -> {
                    existingUser.setUsername(updatedUser.getUsername());
                    existingUser.setEmail(updatedUser.getEmail());
                    existingUser.setPassword(updatedUser.getPassword()); // Considera encriptar antes de guardar
                    existingUser.setRole(updatedUser.getRole()); // Si maneja roles
                    return userRepository.save(existingUser);
                });
    }


    public void deleteUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));
        userRepository.delete(user);
    }

}
