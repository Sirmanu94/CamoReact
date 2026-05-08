using CamoReact.Models;

namespace CamoReact.Repositories
{
    public interface IAuthRepository
    {
        Task<Utenti?> AuthenticateAsync(string email, string password);
        string GenerateJwtToken(Utenti utente, string jwtKey);
    }
}