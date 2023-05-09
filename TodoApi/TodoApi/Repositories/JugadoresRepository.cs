using Dapper;
using Npgsql;
using TodoApi.Model;
using TodoApi.Models;

namespace TodoApi.Data.Repositories
{
    /// <summary>
    /// Clase Jugadores que contiene todos los métodos SQL querys
    /// </summary>
    public class JugadoresRepository
    {
        private PostgreSQLConfig connexionString;
        public JugadoresRepository(PostgreSQLConfig connectionString)
        {
            this.connexionString = connectionString;
        }

        // Returns the SQL connection.
        protected NpgsqlConnection dbConnection()
        {
            return new NpgsqlConnection(connexionString.ConnectionString);
        }

        // Selects everything from the table.
        public async Task<IEnumerable<Jugadores>> GetAllJugadores()
        {
            var db = dbConnection();
            var sql = @"SELECT idjugador, nombre, apellido,password,nick, juegoscompletados, racha,ciudad
                        FROM public.jugadores";

            return await db.QueryAsync<Jugadores>(sql, new { });
        }

        // Returns a specific entry from the table.
        public async Task<Jugadores> GetJugadorDetails(string nick)
        {
            var db = dbConnection();
            var sql = @"SELECT idjugador, nombre, apellido,password, nick, juegoscompletados, racha,ciudad
                        FROM public.jugadores
                        WHERE nick = @nick";

            return await db.QueryFirstOrDefaultAsync<Jugadores>(sql, new {nick = nick});
        }

        // Inserts a new record into the table.
        public async Task<bool> InsertJugador(Jugadores jugadores)
        {
            var db = dbConnection();
            var sql = @"INSERT INTO public.jugadores (nombre, apellido, nick, password)
                        VALUES (@nombre, @apellido, @nick, @password)";

            var result = await db.ExecuteAsync(sql, new { jugadores.nombre,jugadores.apellido, jugadores.nick, jugadores.password});
            return result > 0;
        }

        // Updates a record.
        public async Task<bool> UpdateJugador(Jugadores jugadores)
        {
            var db = dbConnection();
            var sql = @"UPDATE  public.jugadores
                        SET nombre = @nombre,
                            apellido  =  @apellido,
                            nick = @nick,
                            password = @password,
                            juegoscompletados = @juegoscompletados,
                            racha = @racha,
                            ciudad= @ciudad
                        WHERE idjugador = @idjugador;";

            var result = await db.ExecuteAsync(sql, new { jugadores.idjugador, jugadores.nombre, jugadores.apellido, jugadores.nick, jugadores.password,  jugadores.juegoscompletados, jugadores.racha, jugadores.ciudad });
            return result > 0;
        }

        // Deletes a record.
        public async Task<bool> DeleteJugador(Jugadores jugadores)
        {
            var db = dbConnection();
            var sql = @"DELETE FROM public.jugadores
                        WHERE idjugador = @idjugador";

            var result = await db.ExecuteAsync(sql, new { idjugador = jugadores.idjugador });
            return result > 0;
        }
    }
}
