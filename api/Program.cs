using api;
using api.Application.Exceptions;
using api.Application.Mappers;
using api.Application.Services;
using api.Data;
using api.Domain.DTOs;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddMvc(o =>
{
    o.Filters.Add(new ProducesResponseTypeAttribute(typeof(ErrorMessageDTO), 400));
});

builder.Services.AddDbContext<AppDbContext>(x =>
    x.UseNpgsql(builder.Configuration.GetConnectionString("DB"))
        .UseSnakeCaseNamingConvention());

builder.Services.AddScoped<ProductService>();
builder.Services.AddScoped<SupplierService>();
builder.Services.AddScoped<FileStoreService>();

builder.Services.AddAutoMapper(x =>
{
    x.AddProfile<DomainToDTOMapperProfile>();
});

builder.Services.AddCors(x =>
{
    var policy = new CorsPolicyBuilder()
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader()
        .Build();

    x.AddDefaultPolicy(policy);
});

var app = builder.Build();
app.UseCors();

app.UseExceptionHandler(exceptionHandlerApp =>
{
    exceptionHandlerApp.Run(async context =>
    {
        var error = context.Features.Get<IExceptionHandlerPathFeature>()?.Error;

        if (error is BadRequestException)
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
        else if (error is NotFoundException)
            context.Response.StatusCode = StatusCodes.Status404NotFound;
        else
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;

        string message = context.Response.StatusCode == StatusCodes.Status500InternalServerError
            ? "Ocorreu um erro interno"
            : error?.Message ?? "Ocorreu um erro desconhecido";

        await context.Response.WriteAsJsonAsync(new ErrorMessageDTO(message));
    });
});

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.ApplyEFCoreMigrations();

app.Run();
