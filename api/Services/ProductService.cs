using api.Data;
using api.Domain.DTOs;
using api.Domain.Entities;
using api.Exceptions;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace api.Services;

public class ProductService(AppDbContext context, IMapper mapper, IConfiguration configuration)
{
    private readonly string fileStore = configuration.GetSection("FilesStorePath").Value!;

    private void DeleteFile(string fileName)
    {
        var path = Path.Combine(fileStore, fileName);

        if (File.Exists(path))
        {
            File.Delete(path);
        }
    }

    private async Task<string> StoreFile(IFormFile image)
    {
        var fileName = $"{Guid.NewGuid()}_{image.FileName}";
        var path = Path.Combine(fileStore, fileName);

        if (!Directory.Exists(fileStore))
        {
            Directory.CreateDirectory(fileStore);
        }

        using var writer = new FileStream(path, FileMode.CreateNew);

        using var stream = new MemoryStream();
        await image.CopyToAsync(stream);

        await writer.WriteAsync(stream.ToArray());

        return fileName;
    }

    public async Task Create(ProductDTO productDTO)
    {
        await context.AddAsync(mapper.Map<Product>(productDTO));
        await context.SaveChangesAsync();
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
        try
        {
            return await context.Products
                .AsNoTracking()
                .Where(p => p.Id == id)
                .Include(p => p.Images)
                .Select(p => mapper.Map<ProductDTO>(p))
                .FirstAsync();
        }
        catch (Exception e)
        {
            throw new BadRequestException(e.Message);
        }
    }

    public async Task Update(ProductDTO productDTO)
    {
        context.Update(productDTO);
        await context.SaveChangesAsync();
    }

    public async Task Delete(long id)
    {
        try
        {
            var product = await context.Products
                .Include(p => p.Images)
                .FirstAsync(p => p.Id == id);

            foreach (var image in product.Images)
            {
                DeleteFile(image.FileName);
            }

            context.Remove(product);

            await context.SaveChangesAsync();
        }
        catch (Exception e)
        {
            throw new BadRequestException(e.Message);
        }
    }

    public async Task UploadImages(IEnumerable<IFormFile> images, long productId)
    {
        foreach (var image in images)
        {
            var fileName = await StoreFile(image);

            await context.ProductImages.AddAsync(new ProductImage(fileName, productId));
            await context.SaveChangesAsync();
        }
    }

    public async Task DeleteImage(string fileName)
    {
        try
        {
            DeleteFile(fileName);

            var image = await context.ProductImages.FirstAsync(i => i.FileName == fileName);
            context.Remove(image);
        }
        catch (Exception e)
        {
            throw new BadRequestException(e.Message);
        }
    }
}
