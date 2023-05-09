using Dapper;
using Npgsql;
using TodoApi.Model;
using TodoApi.Models;

namespace TodoApi.Data.Repositories
{
    /// <summary>
    /// Clase Ciudad que contiene todos los métodos SQL querys
    /// </summary>
    public class CiudadRepository
    {
        private PostgreSQLConfig connexionString;
        public CiudadRepository(PostgreSQLConfig connectionString)
        {
            this.connexionString = connectionString;
        }

        // Returns the SQL connection.
        protected NpgsqlConnection dbConnection()
        {
            return new NpgsqlConnection(connexionString.ConnectionString);
        }

        // Selects everything from the table.
        public async Task<IEnumerable<Ciudad>> GetAllCiudad()
        {
            var db = dbConnection();
            var sql = @"SELECT *
                        FROM public.ciudad";

            return await db.QueryAsync<Ciudad>(sql, new { });
        }

        // Returns a specific entry from the table.
        public async Task<Ciudad> GetCiudadDetails(int idciudad)
        {
            var db = dbConnection();
            var sql = @"SELECT idciudad, ciudad, coordsx, coordsy,n_poblacion
                        FROM public.ciudad
                        WHERE idciudad = @idciudad";

            return await db.QueryFirstOrDefaultAsync<Ciudad>(sql, new { idciudad = idciudad });
        }

        // Inserts a new record into the table.
        public async Task<bool> InsertCiudad(Ciudad ciudad)
        {
            var db = dbConnection();
            var sql = @"INSERT INTO public.ciudad (ciudad, coordsx, coordsy,n_poblacion)
                        VALUES (@ciudad, @coordsy, @coordsy, @n_poblacion)";
            var result = await db.ExecuteAsync(sql, new { ciudad.ciudad, ciudad.coordsx, ciudad.coordsy, ciudad.n_poblacion });
            return result > 0;
        }

        // Updates a record.
        public async Task<bool> UpdateCiudad(Ciudad ciudad)
        {
            var db = dbConnection();
            var sql = @"UPDATE public.ciudad
                        SET ciudad = @ciudad,
                        coordsx = @coordsx,
                        coordsy = @coordsy,
                        n_poblacion = @n_poblacion,
                        WHERE idciudad = @idciudad;";

            var result = await db.ExecuteAsync(sql, new { ciudad.ciudad, ciudad.coordsx, ciudad.coordsy, ciudad.n_poblacion, ciudad.idciudad });

            return result > 0;
        }

        // Deletes a record.
        public async Task<bool> DeleteCiudad(Ciudad ciudad)
        {
            var db = dbConnection();
            var sql = @"DELETE FROM public.ciudad
                        WHERE idciudad = @idciudad";

            var result = await db.ExecuteAsync(sql, new { idciudad = ciudad.idciudad });
            return result > 0;
        }
    }
}