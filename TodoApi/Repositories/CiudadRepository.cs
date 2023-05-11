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
        public async Task<Ciudad> GetCiudadDetails(string ciudad)
        {
            var db = dbConnection();
            var sql = @"SELECT ciudad, coordsx, coordsy
                        FROM public.ciudad
                        WHERE ciudad = @ciudad";

            return await db.QueryFirstOrDefaultAsync<Ciudad>(sql, new { ciudad = ciudad });
        }

        // Inserts a new record into the table.
        public async Task<bool> InsertCiudad(Ciudad ciudad)
        {
            var db = dbConnection();
            var sql = @"INSERT INTO public.ciudad (ciudad, coordsx, coordsy)
                        VALUES (@ciudad, @coordsy, @coordsy)";
            var result = await db.ExecuteAsync(sql, new { ciudad.ciudad, ciudad.coordsx, ciudad.coordsy });
            return result > 0;
        }

        // Updates a record.
        public async Task<bool> UpdateCiudad(Ciudad ciudad)
        {
            var db = dbConnection();
            var sql = @"UPDATE public.ciudad
                        SET coordsx = @coordsx,
                        coordsy = @coordsy
                        WHERE ciudad = @ciudad;";

            var result = await db.ExecuteAsync(sql, new { ciudad.coordsx, ciudad.coordsy });

            return result > 0;
        }

        // Deletes a record.
        public async Task<bool> DeleteCiudad(Ciudad ciudad)
        {
            var db = dbConnection();
            var sql = @"DELETE FROM public.ciudad
                        WHERE ciudad = @ciudad";

            var result = await db.ExecuteAsync(sql, new { ciudad = ciudad.ciudad });
            return result > 0;
        }
    }
}