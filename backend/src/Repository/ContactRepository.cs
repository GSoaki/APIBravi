using API_Bravi.Models;
using API_Bravi.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API_Bravi.Repository
{
    public class ContactRepository : IContactRepository
    {
        private readonly ApplicationDbContext _context;

        public ContactRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Contact? GetById(Guid id)
        {
            return _context.Contact.Find(id);
        }

        public List<Contact> GetByPersonId(Guid personId)
        {
            return _context.Contact.Where(x => x.PersonId == personId).ToList();
        }

        public void Add(Contact contact)
        {
            _context.Contact.Add(contact);
        }

        public void Update(Contact contact)
        {
            _context.Contact.Update(contact);
        }

        public void Delete(Contact contact)
        {
            _context.Contact.Remove(contact);
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}