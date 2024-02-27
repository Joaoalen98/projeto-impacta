package com.joaoalencar.projetoimpacta.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.joaoalencar.projetoimpacta.domain.model.product.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    
}
