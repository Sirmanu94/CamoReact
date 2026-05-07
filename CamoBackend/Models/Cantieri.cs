using System;
using System.Collections.Generic;

namespace CamoReact.Models;

public partial class Cantieri
{
    public int IdCantiere { get; set; }

    public string? DescrizioneBreve { get; set; }

    public string? Descrizione { get; set; }

    public string? PathFotoCopertina { get; set; }

    public DateTime? DataInserimento { get; set; }

    public bool? Eliminato { get; set; }
}
