using Dapper;
using Npgsql;
using TodoApi.Model;
using TodoApi.Models;

namespace TodoApi.Data.Repositories
{
    /// <summary>
    /// Clase Jugar que contiene todos los métodos SQL querys
    /// </summary>
    public class JugarRepository
    {
        private PostgreSQLConfig connexionString;
        public JugarRepository(PostgreSQLConfig connectionString)
        {
            this.connexionString = connectionString;
        }

        // Returns the SQL connection.
        protected NpgsqlConnection dbConnection()
        {
            return new NpgsqlConnection(connexionString.ConnectionString);
        }

        // Selects everything from the table.
        public async Task<IEnumerable<Jugar>> GetAllJugar()
        {
            var db = dbConnection();
            var sql = @"SELECT *
                        FROM public.jugar
                        ORDER BY ranking ASC";

            return await db.QueryAsync<Jugar>(sql, new { });
        }

        // Returns a specific entry from the table.
        public async Task<Jugar> GetJugarDetails(int idjugador)
        {
            var db = dbConnection();
            var sql = @"SELECT idjugador, idjuego, vecescompletado, ranking
                        FROM public.jugar
                        WHERE idjugador = @idjugador";

            return await db.QueryFirstOrDefaultAsync<Jugar>(sql, new { idjugador = idjugador});
        }

        // Inserts a new record into the table.
        public async Task<bool> InsertJugar(Jugar jugar)
        {
            var db = dbConnection();
            var sql = @"INSERT INTO public.jugar (idjugador, idjuego, vecescompletado, ranking)
                        VALUES (@idjugador,  @idjuego, @vecescompletado, @ranking)";

            var result = await db.ExecuteAsync(sql, new { jugar.idjugador, jugar.idjuego, jugar.vecescompletado,jugar.ranking});
            return result > 0;
        }

        // Updates a record.
        public async Task<bool> UpdateJugar(Jugar jugar)
        {
            var db = dbConnection();
            var sql = @"UPDATE public.jugar
                        SET vecescompletado = @vecescompletado, ranking = @ranking
                        WHERE idjugador = @idjugador AND idjuego = @idjuego;";

            var result = await db.ExecuteAsync(sql, new { jugar.vecescompletado,jugar.idjugador, jugar.idjuego,jugar.ranking });
            return result > 0;
        }

        // Deletes a record.
        public async Task<bool> DeleteJugar(Jugar jugar)
        {
            var db = dbConnection();
            var sql = @"DELETE FROM public.juego
                        WHERE idjugador = @idjugador AND idjuego = @idjuego";

            var result = await db.ExecuteAsync(sql, new { idjugador = jugar.idjugador, idjuego = jugar.idjuego });
            return result > 0;
        }
    }
}
