namespace api.Application.Services
{
    public class FileStoreService(IConfiguration configuration)
    {
        private readonly string fileStore = configuration.GetSection("FilesStorePath").Value!;

        /// <summary>
        /// Delete file by file name
        /// </summary>
        /// <param name="fileName"></param>
        public void DeleteFile(string fileName)
        {
            var path = Path.Combine(fileStore, fileName);

            if (File.Exists(path))
            {
                File.Delete(path);
            }
        }

        /// <summary>
        /// Store a file and returns the file name
        /// </summary>
        /// <param name="image"></param>
        /// <returns></returns>
        public async Task<string> StoreFile(IFormFile image)
        {
            var fileName = $"{Guid.NewGuid()}_{image.FileName}";
            var path = Path.Combine(fileStore, fileName);

            if (!Directory.Exists(fileStore))
            {
                Directory.CreateDirectory(fileStore);
            }

            using var writer = new FileStream(path, FileMode.CreateNew);

            using var stream = new MemoryStream();
            await image.CopyToAsync(stream);

            await writer.WriteAsync(stream.ToArray());

            return fileName;
        }

        /// <summary>
        /// Get byte[] from especified file by name
        /// </summary>
        /// <param name="fileName"></param>
        /// <returns></returns>
        public async Task<byte[]> GetFile(string fileName)
        {
            return await File.ReadAllBytesAsync(Path.Combine(fileStore, fileName));
        }
    }
}
