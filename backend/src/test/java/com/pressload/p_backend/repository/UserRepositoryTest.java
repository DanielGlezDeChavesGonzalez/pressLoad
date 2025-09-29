package com.pressload.p_backend.repository;

import com.pressload.p_backend.user.User;
import com.pressload.p_backend.user.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void saveUser(){
        User userTest = User.builder().username("josu").build();
        userRepository.save(userTest);
    }

}