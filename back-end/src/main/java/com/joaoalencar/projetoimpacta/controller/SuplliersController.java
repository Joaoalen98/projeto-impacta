package com.joaoalencar.projetoimpacta.controller;

import com.joaoalencar.projetoimpacta.service.SupplierService;
import com.joaoalencar.projetoimpacta.service.dto.SupplierDTO;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/suppliers")
public class SuplliersController {

    private SupplierService supplierService;

    public SuplliersController(SupplierService supplierService) {
        this.supplierService = supplierService;
    }

    @GetMapping
    public ResponseEntity<?> findAll() {
        var suppliers = supplierService.findAll();
        return ResponseEntity.ok(suppliers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable int id) {
        var supplier = supplierService.findById(id);
        return ResponseEntity.ok(supplier);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody SupplierDTO dto) {
        var supplier = supplierService.create(dto);
        return new ResponseEntity<>(supplier, HttpStatus.CREATED);
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody SupplierDTO dto, @PathVariable int id) {
        var supplier = supplierService.update(dto, id);
        return ResponseEntity.ok().body(supplier);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {
        var supplier = supplierService.delete(id);
        return ResponseEntity.ok().body(supplier);
    }
}
