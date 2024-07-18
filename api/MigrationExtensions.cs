using api.Data;
using Microsoft.EntityFrameworkCore;

namespace api
{
    public static class MigrationExtensions
    {
        public static void ApplyEFCoreMigrations(this IApplicationBuilder app)
        {
            using IServiceScope scope = app.ApplicationServices.CreateScope();
            using AppDbContext context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            context.Database.Migrate();
        }
    }
}