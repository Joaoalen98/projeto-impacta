package com.joaoalencar.projetoimpacta.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.joaoalencar.projetoimpacta.service.dto.ProductDTO;

import jakarta.validation.Valid;

import com.joaoalencar.projetoimpacta.service.ProductService;

@RestController
@RequestMapping("/api/v1/products")
public class ProductsController {

    private ProductService productService;

    public ProductsController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<?> findAll() {
        var products = productService.findAll();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable int id) {
        var product = productService.findById(id);
        return ResponseEntity.ok(product);
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody ProductDTO dto) {
        var product = productService.create(dto);
        return new ResponseEntity<>(product, HttpStatus.CREATED);
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody ProductDTO dto, @PathVariable int id) {
        var product = productService.update(dto, id);
        return ResponseEntity.ok().body(product);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {
        var product = productService.delete(id);
        return ResponseEntity.ok().body(product);
    }
}
