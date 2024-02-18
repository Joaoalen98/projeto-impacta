package com.joaoalencar.projetoimpacta.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.joaoalencar.projetoimpacta.models.entities.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    
}
