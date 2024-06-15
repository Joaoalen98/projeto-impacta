using api.Domain.DTOs;
using api.Services;
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

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(SupplierDTO), 200)]
    public async Task<IActionResult> GetAll(long id)
    {
        return Ok(await supplierService.GetById(id));
    }

    [HttpPost("{id}")]
    [ProducesResponseType(typeof(SupplierDTO), 200)]
    public async Task<IActionResult> Update(SupplierDTO supplierDTO, long id)
    {
        supplierDTO.Id = id;
        return Ok(await supplierService.Update(supplierDTO));
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(typeof(SupplierDTO), 200)]
    public async Task<IActionResult> Delete(long id)
    {
        return StatusCode(200, await supplierService.Delete(id));
    }
}