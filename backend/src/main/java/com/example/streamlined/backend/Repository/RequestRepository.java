package com.example.streamlined.backend.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.streamlined.backend.Entity.RequestEntity;

public interface RequestRepository extends JpaRepository<RequestEntity, Integer> {
    List<RequestEntity> findByStatus(String status);
   
    List<RequestEntity> findTop4ByOrderByDatetimeDesc();
}

