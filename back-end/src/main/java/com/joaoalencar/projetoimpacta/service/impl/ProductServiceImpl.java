package com.joaoalencar.projetoimpacta.service.impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.joaoalencar.projetoimpacta.domain.model.product.ProductImage;
import com.joaoalencar.projetoimpacta.repository.ProductImageRepository;
import com.joaoalencar.projetoimpacta.service.exception.FileUploadException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.joaoalencar.projetoimpacta.service.dto.ProductDTO;
import com.joaoalencar.projetoimpacta.domain.model.product.Product;
import com.joaoalencar.projetoimpacta.service.exception.ResourceNotFoundException;
import com.joaoalencar.projetoimpacta.repository.ProductRepository;
import com.joaoalencar.projetoimpacta.service.ProductService;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ProductServiceImpl implements ProductService {

    @Value("${static-files-path}")
    private String uploadDirectory;

    private ProductRepository productRepository;

    private ProductImageRepository productImageRepository;

    public ProductServiceImpl(ProductRepository productRepository, ProductImageRepository productImageRepository) {
        this.productRepository = productRepository;
        this.productImageRepository = productImageRepository;
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

    @Override
    public String uploadImage(MultipartFile imageFile, Integer productId) {
        try {
            String fileName = imageFile.getOriginalFilename()
                    .replace(" ", "")
                    .toLowerCase();

            Path uploadPath = Path.of(uploadDirectory);
            Path filePath = uploadPath.resolve(fileName);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            productImageRepository.save(new ProductImage(
                    fileName,
                    productId));

            return fileName;
        } catch (Exception e) {
            throw new FileUploadException(e.getMessage(), e);
        }
    }

    @Override
    public List<String> getImages(Integer productId) {
        return productImageRepository.findByProductId(productId)
                .stream()
                .map(pi -> "/files/" + pi.getFileName())
                .toList();
    }

    @Override
    public String deleteImage(Integer productImageId) {
        try {
            var productImage = productImageRepository.findById(productImageId);

            if (productImage.isPresent()) {
                productImageRepository.delete(productImage.get());

                Path imagePath = Path.of(uploadDirectory, productImage.get().getFileName());

                if (Files.exists(imagePath)) {
                    Files.delete(imagePath);
                }

                return "Success";
            }

            return "Error";
        } catch (Exception e) {
            throw new FileUploadException(e.getMessage(), e);
        }
    }
}
