using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Configuration;
using TodoApi.Data;
using TodoApi.Data.Repositories;
using TodoApi.Models;

var builder = WebApplication.CreateBuilder(args);

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("Nueva Politica", app =>
    {
        app.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});
//--------------------------------------------
//builder.Services.AddDbContext<PostgreSQLConfig>(opt =>
//    opt.UseSqlServer(builder.Configuration.GetConnectionString("WebApiDatabase")));
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSingleton(builder.Services.AddDbContext<PostgreSQLConfig>(options =>
    options.UseSqlServer("WebApiDatabase")));

// Adds repos and misc to the web-api.
builder.Services.AddScoped<JugadoresRepository>();
builder.Services.AddScoped<JuegosRepository>();
builder.Services.AddScoped<JugarRepository>();
builder.Services.AddScoped<CiudadRepository>();
builder.Services.AddControllers();
builder.Services.AddMemoryCache();
builder.Services.AddSwaggerGen();
var app = builder.Build();


// Only triggers if debugging
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
//CORS
app.UseCors("Nueva Politica");
//------------------------------------------------

app.UseAuthorization();
app.MapControllers();
app.Run();