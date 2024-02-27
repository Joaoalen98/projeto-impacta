package com.joaoalencar.projetoimpacta.repository;

import com.joaoalencar.projetoimpacta.domain.model.supplier.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface SupplierRepository extends JpaRepository<Supplier, Integer> {

    @Query("select s from Supplier s where s.document = :document and s.id <> :id")
    Optional<Supplier> findOneByDocumentAndIdNot(String document, Integer id);
}
