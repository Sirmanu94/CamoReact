using Microsoft.AspNetCore.Http;

namespace CamoReact.DTOs
{
    public class CantiereUpdateDto
    {
        public string? DescrizioneBreve { get; set; }
        public string? Descrizione { get; set; }

        // Nuovi file opzionali
        public IFormFile? NuovaFotoCopertina { get; set; }
        public List<IFormFile>? NuoveFotoGalleria { get; set; }

        // Una stringa con gli ID delle foto da eliminare separati da virgola (es. "4,7,12")
        public string? FotoDaEliminare { get; set; }
    }
}