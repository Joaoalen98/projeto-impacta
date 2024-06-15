using api.Application.Exceptions;
using api.Data;
using api.Domain.DTOs;
using api.Domain.Entities;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace api.Application.Services;

public class ProductService(
    AppDbContext context,
    IMapper mapper,
    FileStoreService fileStoreService)
{
    public async Task<ProductDTO> Create(ProductDTO productDTO)
    {
        var add = await context.AddAsync(mapper.Map<Product>(productDTO));
        await context.SaveChangesAsync();

        productDTO.Id = add.Entity.Id;
        return productDTO;
    }

    public async Task<IEnumerable<ProductDTO>> GetAll()
    {
        return await context.Products
            .AsNoTracking()
            .Include(p => p.Images)
            .Select(p => mapper.Map<ProductDTO>(p))
            .ToListAsync();
    }

    public async Task<ProductDTO?> GetById(long id)
    {
        var product = await context.Products
            .AsNoTracking()
            .Where(p => p.Id == id)
            .Include(p => p.Images)
            .FirstOrDefaultAsync() ?? throw new NotFoundException("Produto não encontrado");

        return mapper.Map<ProductDTO>(product);
    }

    public async Task<ProductDTO> Update(ProductDTO productDTO)
    {
        context.Update(mapper.Map<Product>(productDTO));
        await context.SaveChangesAsync();

        return productDTO;
    }

    public async Task<ProductDTO> Delete(long id)
    {
        var product = await context.Products
            .Include(p => p.Images)
            .FirstOrDefaultAsync(p => p.Id == id) ?? throw new NotFoundException("Produto não encontrado");

        foreach (var image in product.Images)
        {
            fileStoreService.DeleteFile(image.FileName);
        }

        context.Remove(product);

        await context.SaveChangesAsync();

        return mapper.Map<ProductDTO>(product);
    }

    public async Task UploadImages(IEnumerable<IFormFile> images, long productId)
    {
        foreach (var image in images)
        {
            if (!image.ContentType.Contains("image/"))
            {
                throw new BadRequestException("Envie uma imagem valida");
            }

            var fileName = await fileStoreService.StoreFile(image);

            await context.ProductImages.AddAsync(new ProductImage(fileName, productId, image.ContentType));
            await context.SaveChangesAsync();
        }
    }

    public async Task<ProductImageDTO> DeleteImage(long productImageId)
    {
        var image = await context.ProductImages
            .AsNoTracking()
            .FirstOrDefaultAsync(i => i.Id == productImageId) ?? throw new NotFoundException("Imagem não encontrada");

        fileStoreService.DeleteFile(image.FileName);

        context.Remove(image);
        await context.SaveChangesAsync();

        return mapper.Map<ProductImageDTO>(image);
    }

    public async Task<ProductImageBytesDTO> ServeFile(long productImageId)
    {
        var image = await context.ProductImages
            .AsNoTracking()
            .FirstOrDefaultAsync(i => i.Id == productImageId) ?? throw new BadRequestException($"Imagem {productImageId} não encontrada");

        var bytes = await fileStoreService.GetFile(image.FileName);

        return new ProductImageBytesDTO(bytes, image.ContentType);
    }

    public record ProductImageBytesDTO(byte[] File, string ContentType);
}
