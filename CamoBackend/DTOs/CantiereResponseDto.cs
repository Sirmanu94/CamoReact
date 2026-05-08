namespace CamoReact.DTOs
{
    public class CantiereResponseDto
    {
        public int IdCantiere { get; set; }
        public string? DescrizioneBreve { get; set; }
        public string? Descrizione { get; set; }
        public string? PathFotoCopertina { get; set; }
        public DateTime? DataInserimento { get; set; }
        public List<string> Galleria { get; set; } = new List<string>();
    }
}
