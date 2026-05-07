using System;
using System.Collections.Generic;

namespace CamoReact.Models;

public partial class FotoCantiere
{
    public int IdPathFotoCantiere { get; set; }

    public string PathFoto { get; set; } = null!;

    public int IdCantiere { get; set; }

    public bool? Eliminato { get; set; }
}
