package com.joaoalencar.projetoimpacta.controller;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.joaoalencar.projetoimpacta.service.dto.ProductDTO;

import jakarta.validation.Valid;

import com.joaoalencar.projetoimpacta.service.ProductService;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

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

    @PostMapping("/images/{productId}")
    public ResponseEntity<?> uploadImages(@Valid @RequestBody List<MultipartFile> images, @PathVariable Integer productId) {
        productService.uploadImage(images, productId);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .build();
    }

    @DeleteMapping("/images/{productImageId}")
    public ResponseEntity<?> deleteImage(@PathVariable Integer productImageId) {
        productService.deleteImage(productImageId);

        return ResponseEntity
                .ok()
                .build();
    }

    @GetMapping("/images/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {
        Resource file = productService.loadAsResource(filename);
        if (file == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(file);
    }
}
