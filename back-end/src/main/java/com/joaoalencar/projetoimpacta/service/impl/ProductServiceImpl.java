package com.joaoalencar.projetoimpacta.service.impl;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.joaoalencar.projetoimpacta.service.dto.ProductDTO;
import com.joaoalencar.projetoimpacta.domain.model.product.Product;
import com.joaoalencar.projetoimpacta.service.exception.ResourceNotFoundException;
import com.joaoalencar.projetoimpacta.repository.ProductRepository;
import com.joaoalencar.projetoimpacta.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

    private ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    private Product getEntityById(int id) {
        var product = productRepository.findById(id);

        if (product.isEmpty()) {
            throw new ResourceNotFoundException("Produto não encontrado");
        }

        return product.get();
    }

    @Override
    public ProductDTO create(ProductDTO dto) {
        var product = productRepository.save(
            new ModelMapper().map(dto, Product.class));
        dto.setId(product.getId());
        
        return dto;
    }

    @Override
    public List<ProductDTO> findAll() {
        return productRepository.findAll()
            .stream()
            .map(p -> new ModelMapper().map(p, ProductDTO.class))
            .toList();
    }

    @Override
    public Optional<ProductDTO> findById(int id) {
        var product = getEntityById(id);
        return Optional.of(new ModelMapper().map(product, ProductDTO.class));
    }

    @Override
    public Optional<ProductDTO> update(ProductDTO dto, int id) {
        getEntityById(id);
        
        var editedProduct = new ModelMapper().map(dto, Product.class);
        editedProduct.setId(id);

        var saved = productRepository.save(editedProduct);
        dto.setId(saved.getId());

        return Optional.of(dto);
    }

    @Override
    public Optional<ProductDTO> delete(int id) {
        var product = getEntityById(id);
        productRepository.delete(product);
        return Optional.of(new ModelMapper().map(product, ProductDTO.class));
    }
    
}
