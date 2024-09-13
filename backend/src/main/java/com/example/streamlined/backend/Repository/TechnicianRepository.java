package com.example.streamlined.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.streamlined.backend.Entity.RequestEntity;
import com.example.streamlined.backend.Entity.TechnicianEntity;

public interface TechnicianRepository extends JpaRepository <TechnicianEntity, Integer>{

}
