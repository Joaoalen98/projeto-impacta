using api.Application.Services;
using api.Domain.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("/api/v1/suppliers")]
public class SuppliersController(SupplierService supplierService) : ControllerBase
{
    [HttpPost]
    [ProducesResponseType(typeof(SupplierDTO), 201)]
    public async Task<IActionResult> Create(SupplierDTO supplierDTO)
    {
        return StatusCode(201, await supplierService.Create(supplierDTO));
    }

    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<SupplierDTO>), 200)]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await supplierService.GetAll());
    }

    [HttpGet("{supplierId}")]
    [ProducesResponseType(typeof(SupplierDTO), 200)]
    public async Task<IActionResult> GetAll(long supplierId)
    {
        return Ok(await supplierService.GetById(supplierId));
    }

    [HttpPut("{supplierId}")]
    [ProducesResponseType(typeof(SupplierDTO), 200)]
    public async Task<IActionResult> Update(SupplierDTO supplierDTO, long supplierId)
    {
        supplierDTO.Id = supplierId;
        return Ok(await supplierService.Update(supplierDTO));
    }

    [HttpDelete("{supplierId}")]
    [ProducesResponseType(typeof(SupplierDTO), 200)]
    public async Task<IActionResult> Delete(long supplierId)
    {
        return StatusCode(200, await supplierService.Delete(supplierId));
    }
}