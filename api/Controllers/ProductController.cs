using api.Domain.DTOs;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("/api/v1/products")]
public class ProductController(ProductService productService) : ControllerBase
{
    [HttpPost]
    [ProducesResponseType(201)]
    public async Task<IActionResult> Create(ProductDTO productDTO)
    {
        await productService.Create(productDTO);
        return StatusCode(201);
    }

    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<ProductDTO>), 200)]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await productService.GetAll());
    }

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(ProductDTO), 200)]
    public async Task<IActionResult> GetById(long id)
    {
        return Ok(await productService.GetById(id));
    }

    [HttpPut("{id}")]
    [ProducesResponseType(200)]
    public async Task<IActionResult> Update(ProductDTO productDTO, long id)
    {
        productDTO.Id = id;
        await productService.Update(productDTO);
        return Ok();
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(200)]
    public async Task<IActionResult> Delete(long id)
    {
        await productService.Delete(id);
        return Ok();
    }

    [HttpPost("images/{productId}")]
    [ProducesResponseType(201)]
    public async Task<IActionResult> UploadImages([FromForm] IEnumerable<IFormFile> images, long productId)
    {
        await productService.UploadImages(images, productId);
        return StatusCode(201);
    }

    [HttpDelete("images/{productImageId}")]
    [ProducesResponseType(201)]
    public async Task<IActionResult> DeleteImage(long productImageId)
    {
        await productService.DeleteImage(productImageId);
        return StatusCode(201);
    }
}