using API_Bravi.Models;

namespace API_Bravi.Services.Interfaces
{
    public interface IPersonService
    {
        Person? GetById(Guid id);
        List<Person> GetAll();
        void AddPerson(Person person);
        void UpdatePerson(Person person);
        void DeletePerson(Guid id);
        void AddContactToPerson(Guid personId, Contact contact);
        void RemoveContactFromPerson(Guid personId, Guid contactId);
    }

}
