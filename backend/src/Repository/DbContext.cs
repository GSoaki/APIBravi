using API_Bravi.Models;
using Microsoft.EntityFrameworkCore;

namespace API_Bravi.Repository
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Contact> Contact { get; set; }

        public DbSet<Person> Person { get; set; }
    }
}