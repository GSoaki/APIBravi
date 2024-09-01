using API_Bravi.Models;
using API_Bravi.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API_Bravi.Repository
{
    public class PersonRepository : IPersonRepository
    {
        private readonly ApplicationDbContext _context;

        public PersonRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Person> GetAll()
        {
            return _context.Person.Include(p => p.Contacts).ToList();
        }

        public Person? GetById(Guid id)
        {
            return _context.Person.Include(p => p.Contacts).FirstOrDefault(p => p.Id == id);
        }

        public void Add(Person person)
        {
            _context.Person.Add(person);
        }

        public void Update(Person person)
        {
            _context.Person.Update(person);
        }

        public void Delete(Person person)
        {
            _context.Person.Remove(person);
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}