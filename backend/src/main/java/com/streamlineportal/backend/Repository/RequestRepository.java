package com.streamlineportal.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.streamlineportal.backend.Entity.RequestEntity;

public interface RequestRepository extends JpaRepository <RequestEntity, Integer>{

}
