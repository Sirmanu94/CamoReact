using CamoReact.Models;
using Microsoft.EntityFrameworkCore;

namespace CamoReact.Repositories
{
    public class CantieriRepository : ICantieriRepository
    {
        private readonly CamoContext _context;

        public CantieriRepository(CamoContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Cantieri>> GetAllAsync()
        {
            return await _context.Cantieris
                .Where(c => c.Eliminato == false || c.Eliminato == null)
                .OrderByDescending(c => c.DataInserimento)
                .ToListAsync();
        }

        public async Task<Cantieri?> GetByIdAsync(int id)
        {
            return await _context.Cantieris
                .FirstOrDefaultAsync(c => c.IdCantiere == id && (c.Eliminato == false || c.Eliminato == null));
        }

        public async Task<Cantieri> AddAsync(Cantieri cantiere)
        {
            cantiere.DataInserimento = DateTime.Now;
            cantiere.Eliminato = false;
            await _context.Cantieris.AddAsync(cantiere);
            await _context.SaveChangesAsync();
            return cantiere;
        }

        public async Task UpdateAsync(Cantieri cantiere)
        {
            _context.Cantieris.Update(cantiere);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var cantiere = await _context.Cantieris.FindAsync(id);
            if (cantiere != null)
            {
                cantiere.Eliminato = true; // Soft delete
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<FotoCantiere>> GetFotoByCantiereIdAsync(int idCantiere)
        {
            return await _context.FotoCantieres
                .Where(f => f.IdCantiere == idCantiere && (f.Eliminato == false || f.Eliminato == null))
                .ToListAsync();
        }

        public async Task AddFotoAsync(List<FotoCantiere> fotoList)
        {
            await _context.FotoCantieres.AddRangeAsync(fotoList);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteFotoAsync(int idFoto)
        {
            var foto = await _context.FotoCantieres.FindAsync(idFoto);
            if (foto != null)
            {
                foto.Eliminato = true;
                await _context.SaveChangesAsync();
            }
        }
    }
}