namespace api.Domain.Entities
{
    public class Product
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public long SupplierId { get; set; }

        public Product()
        {
        }

        public Product(string name, string description, decimal price, int stock, long supplierId)
        {
            Name = name;
            Description = description;
            Price = price;
            Stock = stock;
            SupplierId = supplierId;
        }

        public Supplier Supplier { get; set; } = default!;
        public ICollection<ProductImage> Images  { get; set; } = default!;
    }
}