using api.Data;
using api.Domain.DTOs;
using api.Exceptions;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace api.Services;

public class SupplierService(AppDbContext context, IMapper mapper)
{
    public async Task Create(SupplierDTO supplierDTO)
    {
        await context.AddAsync(supplierDTO);
        await context.SaveChangesAsync();
    }

    public async Task<IEnumerable<SupplierDTO>> GetAll()
    {
        return await context.Suppliers
            .AsNoTracking()
            .Select(s => mapper.Map<SupplierDTO>(s))
            .ToListAsync();
    }

    public async Task<SupplierDTO?> GetById(long id)
    {
        return await context.Suppliers
            .AsNoTracking()
            .Select(s => mapper.Map<SupplierDTO>(s))
            .FirstOrDefaultAsync(s => s.Id == id) ?? throw new NotFoundException("Fornecedor não encontrado");
    }

    public async Task Update(SupplierDTO supplierDTO)
    {
        context.Update(supplierDTO);
        await context.SaveChangesAsync();
    }

    public async Task Delete(long id)
    {
        var product = await context.Products
            .AsNoTracking()
            .Where(p => p.SupplierId == id)
            .FirstOrDefaultAsync();

        if (product is not null)
        {
            throw new BadRequestException("Existem produtos associados a esse fornecedor, delete-os primeiro");
        }

        var supplier = await context.Suppliers
            .AsNoTracking()
            .FirstOrDefaultAsync(s => s.Id == id) ?? throw new NotFoundException("Fornecedor não encontrado");

        context.Remove(supplier);
        await context.SaveChangesAsync();
    }
}
