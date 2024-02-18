package com.joaoalencar.projetoimpacta.services;

import java.util.List;
import java.util.Optional;

public interface CrudService<DTO> {

    DTO create(DTO dto);

    List<DTO> findAll();

    Optional<DTO> findById(int id);

    Optional<DTO> update(DTO dto, int id);

    Optional<DTO> delete(int id);
}
