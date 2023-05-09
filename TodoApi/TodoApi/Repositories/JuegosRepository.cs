using Dapper;
using Npgsql;
using TodoApi.Model;
using TodoApi.Models;

namespace TodoApi.Data.Repositories
{
    /// <summary>
    /// Clase Juegos que contiene todos los métodos SQL querys
    /// </summary>
    public class JuegosRepository
    {
        private PostgreSQLConfig connexionString;
        public JuegosRepository(PostgreSQLConfig connectionString)
        {
            this.connexionString = connectionString;
        }

        // Returns the SQL connection.
        protected NpgsqlConnection dbConnection()
        {
            return new NpgsqlConnection(connexionString.ConnectionString);
        }

        // Selects everything from the table.
        public async Task<IEnumerable<Juegos>> GetAllJuegos()
        {
            var db = dbConnection();
            var sql = @"SELECT *
                        FROM public.juegos";

            return await db.QueryAsync<Juegos>(sql, new { });
        }

        // Returns a specific entry from the table.
        public async Task<Juegos> GetJuegoDetails(int idJuego)
        {
            var db = dbConnection();
            var sql = @"SELECT idJuego, titulo, enlace, velocidad
                        FROM public.juegos
                        WHERE idJuego = @idJuego";

            return await db.QueryFirstOrDefaultAsync<Juegos>(sql, new { idJuego = idJuego });
        }

        // Inserts a new record into the table.
        public async Task<bool> InsertJuego(Juegos juego)
        {
            var db = dbConnection();
            var sql = @"INSERT INTO public.juegos (titulo, enlace, velocidad)
                        VALUES (@titulo, @enlace, @velocidad)";
            var result = await db.ExecuteAsync(sql, new { juego.titulo, juego.enlace, juego.idJuego, juego.velocidad });
            return result > 0;
        }

        // Updates a record.
        public async Task<bool> UpdateJuego(Juegos juego)
        {
            var db = dbConnection();
            var sql = @"UPDATE public.juegos
                        SET titulo = @titulo,
                        enlace = @enlace,
                        velocidad = @velocidad
                        WHERE idJuego = @idJuego;";

            var result = await db.ExecuteAsync(sql, new { juego.titulo, juego.enlace, juego.idJuego,juego.velocidad});

            return result > 0;
        }

        // Deletes a record.
        public async Task<bool> DeleteJuego(Juegos juego)
        {
            var db = dbConnection();
            var sql = @"DELETE FROM public.juegos
                        WHERE idJuego = @idJuego";

            var result = await db.ExecuteAsync(sql, new { idJuego = juego.idJuego });
            return result > 0;
        }
    }
}