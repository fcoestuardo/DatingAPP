using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class DatingRepository : IDatingRepository
    {
        private readonly DataContext _contect;
        public DatingRepository(DataContext contect)
        {
            _contect = contect;

        }
        public void add<T>(T entity) where T : class
        {
            _contect.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _contect.Remove(entity);
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _contect.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Id == id);
            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await _contect.Users.Include(p => p.Photos).ToListAsync();
            return users;
        }

        public async Task<bool> SaveAll()
        {
            return await _contect.SaveChangesAsync() > 0;
        }
    }
}