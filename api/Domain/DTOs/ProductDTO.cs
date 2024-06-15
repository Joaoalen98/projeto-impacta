namespace api.Domain.DTOs;

public class ProductDTO
{
    public long? Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public int Stock { get; set; }
    public long? SupplierId { get; set; }
    public IEnumerable<ProductImageDTO>? Images { get; set; }
}

public class ProductImageDTO
{
    public long Id { get; set; }
    public string FileName { get; set; }
}
