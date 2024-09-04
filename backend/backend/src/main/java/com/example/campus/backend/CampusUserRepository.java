package com.example.campus.backend;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CampusUserRepository extends JpaRepository <CampusUserEntity, Integer>{
	CampusUserEntity findByEmail(String email);
}
