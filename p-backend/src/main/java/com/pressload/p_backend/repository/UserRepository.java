package com.pressload.p_backend.repository;

import com.pressload.p_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

/**
 * Repository is an interface that provides access to data in a database
 */

public interface UserRepository extends JpaRepository<User,Long> {


    List<User> findById(Integer id);

    User findByUsernameAndPassword(String username, String password);
//
//    // Si quieres obtener solo las rutinas del usuario
//    @Query("SELECT u.routines FROM User u WHERE u.id = :userId")
//    List<Routine> findUserRoutines(@Param("userId") Integer userId);

//    @Query("select s from User s where ")
//    User getUserByRoutine(Long id);
//
//    //Native
//    @Query(
//            value = "SELECT * FROM tbl_student s where s.email_address = ?1",
//            nativeQuery = true
//    )
//    Student getStudentByEmailAddressNative(String emailId);
//
//
//    //Native Named Param
//    @Query(
//            value = "SELECT * FROM tbl_student s where s.email_address = :emailId",
//            nativeQuery = true
//    )
//    Student getStudentByEmailAddressNativeNamedParam(
//            @Param("emailId") String emailId
//    );
//
//    @Modifying
//    @Transactional
//    @Query(
//            value = "update tbl_student set first_name = ?1 where email_address = ?2",
//            nativeQuery = true
//    )
//    int updateStudentNameByEmailId(String firstName, String emailId);
    
}
