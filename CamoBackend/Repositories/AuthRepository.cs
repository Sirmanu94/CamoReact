using CamoReact.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CamoReact.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly CamoContext _context;

        public AuthRepository(CamoContext context)
        {
            _context = context;
        }

        public async Task<Utenti?> AuthenticateAsync(string email, string password)
        {
            // In produzione la password dovrebbe essere hashata!
            return await _context.Utentis
                .FirstOrDefaultAsync(u => u.Email == email && u.Password == password);
        }

        public string GenerateJwtToken(Utenti utente, string jwtKey)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(jwtKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, utente.IdUtente.ToString()),
                    new Claim(ClaimTypes.Email, utente.Email ?? "")
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}