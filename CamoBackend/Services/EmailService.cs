using CamoReact.DTOs;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using System.Net.Mail;

namespace CamoReact.Services
{
    public interface IEmailService
    {
        Task InviaEmailRichiestaAsync(ContattoDto dto);
    }

    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        public async Task InviaEmailRichiestaAsync(ContattoDto dto)
        {
            var smtpSettings = _config.GetSection("SmtpSettings");

            var email = new MimeMessage();
            // Aggiornato con il nome CAMO
            email.From.Add(new MailboxAddress("CAMO Website", smtpSettings["Username"]));
            email.To.Add(new MailboxAddress("CAMO Studio", smtpSettings["ToEmail"]));
            email.Subject = $"Nuova Richiesta Informazioni da {dto.Nome} {dto.Cognome}";

            var builder = new BodyBuilder();

            // Layout HTML aggiornato con i colori di CAMO (Arancione #e67e22 e scuro #030508)
            builder.HtmlBody = $@"
                <h2 style='color: #e67e22;'>Nuova richiesta informazioni dal sito web</h2>
                <p><strong>Da:</strong> {dto.Nome} {dto.Cognome}</p>
                <p><strong>Email:</strong> {dto.Email}</p>
                <p><strong>Telefono:</strong> {(string.IsNullOrEmpty(dto.Telefono) ? "Non fornito" : dto.Telefono)}</p>
                <br/>
                <p><strong>Messaggio:</strong></p>
                <p style='background-color: #f8f9fa; padding: 15px; border-left: 4px solid #e67e22; color: #030508;'>{dto.Messaggio.Replace("\n", "<br/>")}</p>
            ";

            email.Body = builder.ToMessageBody();

            using var smtp = new MailKit.Net.Smtp.SmtpClient();
            // Connessione SSL sulla porta 465
            await smtp.ConnectAsync(smtpSettings["Server"], int.Parse(smtpSettings["Port"]), SecureSocketOptions.SslOnConnect);
            await smtp.AuthenticateAsync(smtpSettings["Username"], smtpSettings["Password"]);
            await smtp.SendAsync(email);
            await smtp.DisconnectAsync(true);
        }
    }
}