package com.joaoalencar.projetoimpacta.domain.model.product;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "products")
@Getter
@Setter
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private float price;

    @Column(name = "stock")
    private int stock;

    @Column(name = "supplier_id")
    private Integer supplierId;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "product")
    private List<ProductImage> images;
}
