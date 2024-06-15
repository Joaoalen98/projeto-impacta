using api.Domain.DTOs;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("/api/v1/products")]
public class ProductController(ProductService productService) : ControllerBase
{
    [HttpPost]
    [ProducesResponseType(typeof(ProductDTO), 201)]
    public async Task<IActionResult> Create(ProductDTO productDTO)
    {
        return StatusCode(201, await productService.Create(productDTO));
    }

    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<ProductDTO>), 200)]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await productService.GetAll());
    }

    [HttpGet("{productId}")]
    [ProducesResponseType(typeof(ProductDTO), 200)]
    public async Task<IActionResult> GetById(long productId)
    {
        return Ok(await productService.GetById(productId));
    }

    [HttpPut("{productId}")]
    [ProducesResponseType(typeof(ProductDTO), 200)]
    public async Task<IActionResult> Update(ProductDTO productDTO, long productId)
    {
        productDTO.Id = productId;
        return Ok(await productService.Update(productDTO));
    }

    [HttpDelete("{productId}")]
    [ProducesResponseType(typeof(ProductDTO), 200)]
    public async Task<IActionResult> Delete(long productId)
    {
        return Ok(await productService.Delete(productId));
    }

    [HttpPost("{productId}/images")]
    [ProducesResponseType(201)]
    public async Task<IActionResult> UploadImages([FromForm] IEnumerable<IFormFile> images, long productId)
    {
        await productService.UploadImages(images, productId);
        return StatusCode(201);
    }

    [HttpDelete("images/{productImageId}")]
    [ProducesResponseType(201)]
    public async Task<IActionResult> DeleteImage(long productId, long productImageId)
    {
        await productService.DeleteImage(productImageId);
        return StatusCode(201);
    }

    [HttpGet("images/{productImageId}")]
    [ProducesResponseType(200)]
    public async Task<IActionResult> ServeFile(long productImageId)
    {
        var image = await productService.ServeFile(productImageId);
        return File(image.File, image.ContentType);
    }
}