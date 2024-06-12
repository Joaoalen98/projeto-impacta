package com.joaoalencar.projetoimpacta.service.impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.*;

import com.joaoalencar.projetoimpacta.domain.model.product.ProductImage;
import com.joaoalencar.projetoimpacta.repository.ProductImageRepository;
import com.joaoalencar.projetoimpacta.service.exception.BadRequestException;
import com.joaoalencar.projetoimpacta.service.exception.FileUploadException;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
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
    @Transactional
    public Optional<ProductDTO> delete(int id) {
        productImageRepository.findByProductId(id)
                .forEach(pi -> {
                    try {
                        deleteImage(pi);
                    } catch (IOException e) {
                        throw new BadRequestException("Erro ao deletar imagens do produto - " + e.getMessage(), e);
                    }
                });

        var product = getEntityById(id);
        productRepository.delete(product);
        return Optional.of(new ModelMapper().map(product, ProductDTO.class));
    }

    @Override
    @Transactional
    public void uploadImage(List<MultipartFile> images, Integer productId) {
        images.forEach(imageFile -> {
            try {
                String fileName = UUID.randomUUID() + "_" + imageFile.getOriginalFilename()
                        .replace(" ", "_")
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

            } catch (Exception e) {
                throw new FileUploadException(e.getMessage(), e);
            }
        });
    }

    @Override
    public Resource loadAsResource(String fileName) {
        try {
            Path file = Path.of(uploadDirectory, fileName);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new BadRequestException("Arquivo não encontrado, ou não pode ser lido: " + fileName);
            }
        } catch (Exception e) {
            throw new BadRequestException("Ocorreu um erro ao obter o arquivo: " + fileName, e);
        }
    }

    @Override
    public void deleteImage(Integer productImageId) {
        try {
            var productImage = productImageRepository.findById(productImageId)
                    .orElseThrow(() -> new BadRequestException("Arquivo não encontrado"));
            deleteImage(productImage);
        } catch (Exception e) {
            throw new FileUploadException(e.getMessage(), e);
        }
    }

    public void deleteImage(ProductImage productImage) throws IOException {
        productImageRepository.delete(productImage);

        Path imagePath = Path.of(uploadDirectory, productImage.getFileName());
        if (Files.exists(imagePath)) {
            Files.delete(imagePath);
        }
    }
}
