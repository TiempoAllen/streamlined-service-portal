package com.streamlineportal.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.streamlineportal.backend.Entity.UserEntity;

public interface UserRepository extends JpaRepository <UserEntity, Integer>{
	UserEntity findByEmail(String email);
	boolean existsByEmail(String email);
}

