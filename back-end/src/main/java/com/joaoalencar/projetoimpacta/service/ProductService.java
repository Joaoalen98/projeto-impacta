package com.joaoalencar.projetoimpacta.service;

import com.joaoalencar.projetoimpacta.service.dto.ProductDTO;
import com.joaoalencar.projetoimpacta.service.dto.ProductImageDTO;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService extends CrudService<ProductDTO> {

    void uploadImage(List<MultipartFile> images, Integer productId);
    Resource loadAsResource(String fileName);
    void deleteImage(Integer productImageId);
}
