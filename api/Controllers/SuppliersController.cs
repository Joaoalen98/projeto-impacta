using api.Domain.DTOs;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("/api/suppliers")]
public class SuppliersController(SupplierService supplierService) : ControllerBase
{
    [HttpPost]
    [ProducesResponseType(201)]
    public async Task<IActionResult> Create(SupplierDTO supplierDTO)
    {
        await supplierService.Create(supplierDTO);
        return StatusCode(201);
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

    [HttpPut]
    [ProducesResponseType(200)]
    public async Task<IActionResult> Update(SupplierDTO supplierDTO)
    {
        await supplierService.Update(supplierDTO);
        return Ok();
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(200)]
    public async Task<IActionResult> Create(long id)
    {
        await supplierService.Delete(id);
        return StatusCode(201);
    }
}