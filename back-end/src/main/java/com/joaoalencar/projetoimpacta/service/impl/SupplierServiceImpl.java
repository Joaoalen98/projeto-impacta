package com.joaoalencar.projetoimpacta.service.impl;

import com.joaoalencar.projetoimpacta.domain.model.supplier.Supplier;
import com.joaoalencar.projetoimpacta.repository.SupplierRepository;
import com.joaoalencar.projetoimpacta.service.SupplierService;
import com.joaoalencar.projetoimpacta.service.dto.SupplierDTO;
import com.joaoalencar.projetoimpacta.service.exception.BadRequestException;
import com.joaoalencar.projetoimpacta.service.exception.ResourceNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SupplierServiceImpl implements SupplierService {

    private SupplierRepository supplierRepository;

    public SupplierServiceImpl(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    private Supplier getEntityById(int id) {
        return supplierRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Fornecedor não encontrado"));
    }

    private void validateCreateUpdate(SupplierDTO dto) {
        var supplierDocumentExists = supplierRepository.findOneByDocumentAndIdNot(dto.getDocument(), dto.getId());
        if (supplierDocumentExists.isPresent()) {
            throw new BadRequestException("Já existe um fornecedor com esse documento");
        }
    }

    @Override
    public SupplierDTO create(SupplierDTO supplierDTO) {
        validateCreateUpdate(supplierDTO);

        var supplier = new ModelMapper().map(supplierDTO, Supplier.class);
        var added = supplierRepository.save(supplier);
        supplierDTO.setId(added.getId());

        return supplierDTO;
    }

    @Override
    public List<SupplierDTO> findAll() {
        return supplierRepository.findAll()
                .stream()
                .map(s -> new ModelMapper().map(s, SupplierDTO.class))
                .toList();
    }

    @Override
    public Optional<SupplierDTO> findById(int id) {
        return Optional.of(new ModelMapper().map(getEntityById(id), SupplierDTO.class));
    }

    @Override
    public Optional<SupplierDTO> update(SupplierDTO supplierDTO, int id) {
        getEntityById(id);

        supplierDTO.setId(id);
        validateCreateUpdate(supplierDTO);

        var edited = new ModelMapper().map(supplierDTO, Supplier.class);

        var saved = supplierRepository.save(edited);

        return Optional.of(supplierDTO);
    }

    @Override
    public Optional<SupplierDTO> delete(int id) {
        var supplier = getEntityById(id);
        supplierRepository.delete(supplier);

        return Optional.of(new ModelMapper().map(supplier, SupplierDTO.class));
    }
}
