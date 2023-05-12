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
        private readonly PostgreSQLConfig connexionString;
        public JugarRepository(PostgreSQLConfig connectionString)
        {
            this.connexionString = connectionString;
        }

        // Returns the SQL connection.
        protected NpgsqlConnection DbConnection()
        {
            return new NpgsqlConnection(connexionString.ConnectionString);
        }

        // Selects everything from the table.
        public async Task<IEnumerable<Jugar>> GetAllJugar()
        {
            var db = DbConnection();
            var sql = @"SELECT *
                        FROM public.jugar
                        GROUP BY idjuego, idjugador
                        ORDER BY ranking DESC";

            return await db.QueryAsync<Jugar>(sql, new { });
        }

        // Returns a specific entry from the table.
        public async Task<Jugar> GetJugarDetails(int idjugador)
        {
            var db = DbConnection();
            var sql = @"SELECT idjugador, idjuego, vecescompletado, ranking
                        FROM public.jugar
                        WHERE idjugador = @idjugador";

            return await db.QueryFirstOrDefaultAsync<Jugar>(sql, new { idjugador });
        }

        // Inserts a new record into the table.
        public async Task<bool> InsertJugar(Jugar jugar)
        {
            var db = DbConnection();
            var sql = @"INSERT INTO public.jugar (idjugador, idjuego, vecescompletado, ranking)
                        VALUES (@idjugador,  @idjuego, @vecescompletado, @ranking)";

            var result = await db.ExecuteAsync(sql, new { jugar.idjugador, jugar.idjuego, jugar.vecescompletado,jugar.ranking});
            return result > 0;
        }

        // Updates a record.
        public async Task<bool> UpdateJugar(Jugar jugar)
        {
            var db = DbConnection();
            var sql = @"UPDATE public.jugar
                        SET vecescompletado += 1, ranking += @ranking
                        WHERE idjugador = @idjugador AND idjuego = @idjuego;";

            var result = await db.ExecuteAsync(sql, new { jugar.idjugador, jugar.idjuego, jugar.ranking });
            return result > 0;
        }

        // Deletes a record.
        public async Task<bool> DeleteJugar(Jugar jugar)
        {
            var db = DbConnection();
            var sql = @"DELETE FROM public.juego
                        WHERE idjugador = @idjugador AND idjuego = @idjuego";

            var result = await db.ExecuteAsync(sql, new { jugar.idjugador, jugar.idjuego });
            return result > 0;
        }
    }
}
