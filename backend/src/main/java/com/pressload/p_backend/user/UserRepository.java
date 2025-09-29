package com.pressload.p_backend.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Repository is an interface that provides access to data in a database
 */

public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByUsername(String username);

}
