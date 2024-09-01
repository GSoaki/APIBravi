using API_Bravi.Models;

namespace API_Bravi.Repository.Interfaces
{
    public interface IContactRepository
    {
        public Contact? GetById(Guid id);
        public List<Contact> GetByPersonId(Guid personId);
        public void Add(Contact contact);
        public void Update(Contact contact);
        public void Delete(Contact contact);
        public void SaveChanges();
    }
}