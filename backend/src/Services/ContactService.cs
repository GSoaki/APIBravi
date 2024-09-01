using API_Bravi.Models;
using API_Bravi.Repository;
using API_Bravi.Repository.Interfaces;
using API_Bravi.Services.Interfaces;

public class ContactService : IContactService
{
    private readonly IContactRepository _contactRepository;

    public ContactService(IContactRepository contactRepository)
    {
        _contactRepository = contactRepository;
    }

    public Contact? GetById(Guid id)
    {
        return _contactRepository.GetById(id);
    }

    public List<Contact> GetByPersonId(Guid personId)
    {
        return _contactRepository.GetByPersonId(personId);
    }

    public void AddContact(Contact contact)
    {
        if (contact == null)
        {
            throw new ArgumentNullException(nameof(contact), "A entidade Contact não pode ser nula.");
        }

        _contactRepository.Add(contact);
        _contactRepository.SaveChanges();
    }

    public void UpdateContact(Contact contact)
    {
        if (contact == null)
        {
            throw new ArgumentNullException(nameof(contact), "A entidade Contact não pode ser nula.");
        }

        _contactRepository.Update(contact);
        _contactRepository.SaveChanges();
    }

    public void DeleteContact(Guid id)
    {
        var contact = _contactRepository.GetById(id);
        if (contact == null)
        {
            throw new KeyNotFoundException($"Contact com ID {id} não foi encontrado.");
        }

        _contactRepository.Delete(contact);
        _contactRepository.SaveChanges();
    }
}
