package com.joaoalencar.projetoimpacta.service;

import com.joaoalencar.projetoimpacta.service.dto.ProductDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService extends CrudService<ProductDTO> {

    String uploadImage(MultipartFile imageFile, Integer productId);
    List<byte[]> getImages(Integer productId);
    String deleteImage(String fileName);
}
