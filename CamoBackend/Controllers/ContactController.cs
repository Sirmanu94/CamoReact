using CamoReact.DTOs;
using CamoReact.Services;
using Microsoft.AspNetCore.Mvc;

namespace CamoReact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly IEmailService _emailService;

        public ContactController(IEmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpPost("invia")]
        public async Task<IActionResult> InviaRichiesta([FromBody] ContattoDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Dati del form non validi.");
            }

            try
            {
                await _emailService.InviaEmailRichiestaAsync(dto);
                return Ok(new { message = "Email inviata con successo!" });
            }
            catch (Exception ex)
            {
                // In un ambiente di produzione reale, qui inseriresti un log dell'errore (es. Serilog)
                return StatusCode(500, new { message = "Errore durante l'invio della mail.", error = ex.Message });
            }
        }
    }
}