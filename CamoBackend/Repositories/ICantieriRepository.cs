using CamoReact.Models;

namespace CamoReact.Repositories
{
    public interface ICantieriRepository
    {
        Task<IEnumerable<Cantieri>> GetAllAsync();
        Task<Cantieri?> GetByIdAsync(int id);
        Task<Cantieri> AddAsync(Cantieri cantiere);
        Task UpdateAsync(Cantieri cantiere);
        Task DeleteAsync(int id);

        Task<IEnumerable<FotoCantiere>> GetFotoByCantiereIdAsync(int idCantiere);
        Task AddFotoAsync(List<FotoCantiere> fotoList);
        Task DeleteFotoAsync(int idFoto);
    }
}