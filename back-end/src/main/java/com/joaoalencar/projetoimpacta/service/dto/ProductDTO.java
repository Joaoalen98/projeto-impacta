package com.joaoalencar.projetoimpacta.service.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDTO {

    private int id;

    @NotNull(message = "Nome não pode ser nulo")
    @NotBlank(message = "Nome não pode ficar em branco")
    private String name;

    @NotNull(message = "Descrição não pode ser nulo")
    @NotBlank(message = "Descrição não pode ficar em branco")
    private String description;

    @NotNull(message = "Nome não pode ser nulo")
    @DecimalMin(value = "0.01", message = "Preço não pode ser menor que 0,01")
    private float price;

    @Min(value = 1, message = "Quantidade não pode ser menor que 1")
    private int stock;

    private Integer supplierId;
}
