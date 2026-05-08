using Microsoft.AspNetCore.Http;

namespace CamoReact.DTOs
{
    public class CantiereCreateDto
    {
        public string? DescrizioneBreve { get; set; }
        public string? Descrizione { get; set; }

        // IFormFile serve per ricevere l'immagine singola
        public IFormFile? FotoCopertina { get; set; }

        // List<IFormFile> serve per ricevere la galleria multipla
        public List<IFormFile>? GalleriaFoto { get; set; }
    }
}