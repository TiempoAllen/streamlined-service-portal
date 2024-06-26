package com.example.streamlined.backend.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.streamlined.backend.Entity.UserEntity;

public interface UserRepository extends JpaRepository <UserEntity, Integer>{
	UserEntity findByEmail(String email);
}
