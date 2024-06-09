package com.joaoalencar.projetoimpacta.repository;

import com.joaoalencar.projetoimpacta.domain.model.product.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductImageRepository extends JpaRepository<ProductImage, Integer> {

    List<ProductImage> findByProductId(Integer productId);
}
