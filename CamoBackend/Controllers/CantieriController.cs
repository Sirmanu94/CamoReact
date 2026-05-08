using CamoReact.DTOs;
using CamoReact.Models;
using CamoReact.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;

namespace CamoReact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CantieriController : ControllerBase
    {
        private readonly ICantieriRepository _cantieriRepository;
        private readonly IWebHostEnvironment _env;

        // Aggiunto IWebHostEnvironment nel costruttore
        public CantieriController(ICantieriRepository cantieriRepository, IWebHostEnvironment env)
        {
            _cantieriRepository = cantieriRepository;
            _env = env;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var cantieri = await _cantieriRepository.GetAllAsync();
            var result = new List<CantiereResponseDto>();

            foreach (var cantiere in cantieri)
            {
                var foto = await _cantieriRepository.GetFotoByCantiereIdAsync(cantiere.IdCantiere);

                result.Add(new CantiereResponseDto
                {
                    IdCantiere = cantiere.IdCantiere,
                    DescrizioneBreve = cantiere.DescrizioneBreve,
                    Descrizione = cantiere.Descrizione,
                    PathFotoCopertina = cantiere.PathFotoCopertina,
                    DataInserimento = cantiere.DataInserimento,
                    Galleria = foto.Select(f => f.PathFoto).ToList()
                });
            }

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var cantiere = await _cantieriRepository.GetByIdAsync(id);
            if (cantiere == null) return NotFound();

            var foto = await _cantieriRepository.GetFotoByCantiereIdAsync(id);

            var result = new CantiereResponseDto
            {
                IdCantiere = cantiere.IdCantiere,
                DescrizioneBreve = cantiere.DescrizioneBreve,
                Descrizione = cantiere.Descrizione,
                PathFotoCopertina = cantiere.PathFotoCopertina,
                DataInserimento = cantiere.DataInserimento,
                Galleria = foto.Select(f => f.PathFoto).ToList()
            };

            return Ok(result);
        }

        // ==========================================
        // NUOVO METODO POST: Riceve Form-Data
        // ==========================================
        [HttpPost]
        public async Task<IActionResult> Create([FromForm] CantiereCreateDto dto)
        {
            try
            {
                // 1. Creiamo il percorso fisico per la cartella uploads/cantieri dentro wwwroot
                string webRootPath = _env.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
                string uploadsFolder = Path.Combine(webRootPath, "uploads", "cantieri");

                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                // 2. Salvataggio fisico della Foto di Copertina (se c'è)
                string copertinaDbPath = "";
                if (dto.FotoCopertina != null && dto.FotoCopertina.Length > 0)
                {
                    string uniqueFileName = Guid.NewGuid().ToString() + "_" + dto.FotoCopertina.FileName;
                    string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await dto.FotoCopertina.CopyToAsync(fileStream);
                    }
                    copertinaDbPath = $"/uploads/cantieri/{uniqueFileName}";
                }

                // 3. Creiamo l'oggetto Cantiere e lo passiamo al Repository (Azione DB separata)
                var nuovoCantiere = new Cantieri
                {
                    DescrizioneBreve = dto.DescrizioneBreve,
                    Descrizione = dto.Descrizione,
                    PathFotoCopertina = string.IsNullOrEmpty(copertinaDbPath) ? null : copertinaDbPath
                };

                var cantiereSalvato = await _cantieriRepository.AddAsync(nuovoCantiere);

                // 4. Salvataggio fisico della Galleria (se ci sono file) e passaggio al Repository
                if (dto.GalleriaFoto != null && dto.GalleriaFoto.Any())
                {
                    var listaFotoDb = new List<FotoCantiere>();

                    foreach (var file in dto.GalleriaFoto)
                    {
                        if (file.Length > 0)
                        {
                            string uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;
                            string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                            using (var fileStream = new FileStream(filePath, FileMode.Create))
                            {
                                await file.CopyToAsync(fileStream);
                            }

                            listaFotoDb.Add(new FotoCantiere
                            {
                                IdCantiere = cantiereSalvato.IdCantiere,
                                PathFoto = $"/uploads/cantieri/{uniqueFileName}",
                                Eliminato = false
                            });
                        }
                    }

                    // Salviamo tutte le foto della galleria nel DB in un colpo solo
                    if (listaFotoDb.Any())
                    {
                        await _cantieriRepository.AddFotoAsync(listaFotoDb);
                    }
                }

                return Ok(new { message = "Cantiere e foto salvati con successo!", id = cantiereSalvato.IdCantiere });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Errore interno durante il salvataggio.", error = ex.Message });
            }
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromForm] CantiereUpdateDto dto)
        {
            try
            {
                // 1. Deleghiamo al repository il recupero del dato
                var cantiereDb = await _cantieriRepository.GetByIdAsync(id);
                if (cantiereDb == null) return NotFound(new { message = "Cantiere non trovato" });

                string webRootPath = _env.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
                string uploadsFolder = Path.Combine(webRootPath, "uploads", "cantieri");

                // 2. Aggiorniamo i campi testuali
                cantiereDb.DescrizioneBreve = dto.DescrizioneBreve;
                cantiereDb.Descrizione = dto.Descrizione;

                // 3. Logica File: Nuova Copertina
                if (dto.NuovaFotoCopertina != null && dto.NuovaFotoCopertina.Length > 0)
                {
                    string uniqueFileName = Guid.NewGuid().ToString() + "_" + dto.NuovaFotoCopertina.FileName;
                    string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await dto.NuovaFotoCopertina.CopyToAsync(fileStream);
                    }
                    // Sovrascriviamo il path
                    cantiereDb.PathFotoCopertina = $"/uploads/cantieri/{uniqueFileName}";
                }

                // 4. Deleghiamo al repository l'aggiornamento dell'entità principale
                await _cantieriRepository.UpdateAsync(cantiereDb);

                // 5. Eliminazione vecchie foto galleria
                if (!string.IsNullOrEmpty(dto.FotoDaEliminare))
                {
                    var idsToDelete = dto.FotoDaEliminare.Split(',')
                                        .Where(x => int.TryParse(x, out _))
                                        .Select(int.Parse)
                                        .ToList();

                    foreach (var idFoto in idsToDelete)
                    {
                        // Deleghiamo al repository il soft-delete della singola foto
                        await _cantieriRepository.DeleteFotoAsync(idFoto);
                    }
                }

                // 6. Logica File: Nuove foto galleria
                if (dto.NuoveFotoGalleria != null && dto.NuoveFotoGalleria.Any())
                {
                    var listaNuoveFotoDb = new List<FotoCantiere>();

                    foreach (var file in dto.NuoveFotoGalleria)
                    {
                        if (file.Length > 0)
                        {
                            string uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;
                            string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                            using (var fileStream = new FileStream(filePath, FileMode.Create))
                            {
                                await file.CopyToAsync(fileStream);
                            }

                            listaNuoveFotoDb.Add(new FotoCantiere
                            {
                                IdCantiere = cantiereDb.IdCantiere,
                                PathFoto = $"/uploads/cantieri/{uniqueFileName}",
                                Eliminato = false
                            });
                        }
                    }

                    // Deleghiamo al repository il salvataggio massivo
                    if (listaNuoveFotoDb.Any())
                    {
                        await _cantieriRepository.AddFotoAsync(listaNuoveFotoDb);
                    }
                }

                return Ok(new { message = "Cantiere aggiornato con successo!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Errore durante l'aggiornamento.", error = ex.Message });
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _cantieriRepository.DeleteAsync(id);
            return Ok(new { message = "Cantiere eliminato con successo" });
        }
    }
}