package com.joaoalencar.projetoimpacta.models.DTOs;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDTO {

    private int id;

    private String name;

    private String description;

    private float price;

    private int stock;
}
