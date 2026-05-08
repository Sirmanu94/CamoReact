using CamoReact.DTOs;
using CamoReact.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace CamoReact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepository;
        private readonly IConfiguration _configuration;

        public AuthController(IAuthRepository authRepository, IConfiguration configuration)
        {
            _authRepository = authRepository;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var user = await _authRepository.AuthenticateAsync(loginDto.Email, loginDto.Password);

            if (user == null)
            {
                return Unauthorized(new { message = "Email o password non validi" });
            }

            var jwtKey = _configuration["Jwt:Key"];
            var token = _authRepository.GenerateJwtToken(user, jwtKey!);

            return Ok(new { Token = token, Nome = user.Nome, Cognome = user.Cognome });
        }
    }
}