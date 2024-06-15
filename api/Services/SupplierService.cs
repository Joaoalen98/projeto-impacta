using api.Data;
using api.Domain.DTOs;
using api.Domain.Entities;
using api.Exceptions;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace api.Services;

public class SupplierService(AppDbContext context, IMapper mapper)
{
    public async Task<SupplierDTO> Create(SupplierDTO supplierDTO)
    {
        await context.AddAsync(mapper.Map<Supplier>(supplierDTO));
        await context.SaveChangesAsync();

        return supplierDTO;
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
        var supplier = await context.Suppliers
            .AsNoTracking()
            .FirstOrDefaultAsync(s => s.Id == id) ?? throw new NotFoundException("Fornecedor não encontrado");

        return mapper.Map<SupplierDTO>(supplier);
    }

    public async Task<SupplierDTO> Update(SupplierDTO supplierDTO)
    {
        context.Update(mapper.Map<Supplier>(supplierDTO));
        await context.SaveChangesAsync();

        return supplierDTO;
    }

    public async Task<SupplierDTO> Delete(long id)
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

        return mapper.Map<SupplierDTO>(supplier);
    }
}
