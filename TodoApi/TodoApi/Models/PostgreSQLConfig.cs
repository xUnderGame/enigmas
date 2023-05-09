﻿using Microsoft.EntityFrameworkCore;
using TodoApi.Model;

namespace TodoApi.Models;

public class PostgreSQLConfig : DbContext
{

    protected readonly IConfiguration Configuration;
    public string ConnectionString;

    /// <summary>
    /// Método que lee la configuracion de coneccion a nuestra bd del fichero appsettings
    /// </summary>
    /// <param name="configuration"></param>
    public PostgreSQLConfig(IConfiguration configuration)
    {
        Configuration = configuration;
        ConnectionString = configuration.GetConnectionString("WebApiDatabase");
    }



    //public DbSet<Car> car { get; set; } //NO NECESARIO
}
