package com.example.streamlined.backend.Repository;

import java.util.Optional;

import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.streamlined.backend.Entity.UserEntity;

public interface UserRepository extends JpaRepository <UserEntity, Integer>{
	Optional<UserEntity> findByUserId(Long user_id);
	UserEntity findByEmail(String email);
	boolean existsByEmail(String email);
	Optional<UserEntity> findByUsername(String username);
}
