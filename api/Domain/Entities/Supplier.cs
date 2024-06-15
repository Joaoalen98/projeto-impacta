namespace api.Domain.Entities
{
    public class Supplier
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Document { get; set; }
        
        public Supplier()
        {
        }

        public Supplier(string name, string document)
        {
            Name = name;
            Document = document;
        }

        public ICollection<Product> Products { get; set; } = default!;
    }
}