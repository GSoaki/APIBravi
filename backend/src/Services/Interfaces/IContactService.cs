using API_Bravi.Models;

namespace API_Bravi.Services.Interfaces
{
    public interface IContactService
    {
        Contact? GetById(Guid id);
        List<Contact> GetByPersonId(Guid personId);
        void AddContact(Contact contact);
        void UpdateContact(Contact contact);
        void DeleteContact(Guid id);
    }

}
