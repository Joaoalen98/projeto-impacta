namespace api.Domain.Entities
{
    public class ProductImage
    {
        public long Id { get; set; }
        public string FileName { get; set; }
        public string ContentType { get; set; }
        public long ProductId { get; set; }

        public ProductImage()
        {
            
        }

        public ProductImage(string fileName, long productId, string contentType)
        {
            FileName = fileName;
            ProductId = productId;
            ContentType = contentType;
        }
    }
}