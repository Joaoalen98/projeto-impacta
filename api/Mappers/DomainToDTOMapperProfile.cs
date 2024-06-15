using api.Domain.DTOs;
using api.Domain.Entities;
using AutoMapper;

namespace api.Mappers;

public class DomainToDTOMapperProfile : Profile
{
    public DomainToDTOMapperProfile()
    {
        CreateMap<Product, ProductDTO>().ReverseMap();
        CreateMap<ProductImage, ProductImageDTO>().ReverseMap();
        CreateMap<Supplier, SupplierDTO>().ReverseMap();
    }
}
