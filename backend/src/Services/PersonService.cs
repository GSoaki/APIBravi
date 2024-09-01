using API_Bravi.Models;
using API_Bravi.Repository.Interfaces;
using API_Bravi.Services;
using API_Bravi.Services.Interfaces;

public class PersonService : IPersonService
{
    private readonly IPersonRepository _personRepository;
    private readonly IContactService _contactService;

    public PersonService(IPersonRepository personRepository, IContactService contactService)
    {
        _personRepository = personRepository;
        _contactService = contactService;
    }

    public Person? GetById(Guid id)
    {
        return _personRepository.GetById(id);
    }

    public List<Person> GetAll()
    {
        return _personRepository.GetAll();
    }

    public void AddPerson(Person person)
    {
        if (person == null)
        {
            throw new ArgumentNullException(nameof(person), "A entidade Person não pode ser nula.");
        }

        _personRepository.Add(person);
        _personRepository.SaveChanges();
    }

    public void UpdatePerson(Person person)
    {
        if (person == null)
        {
            throw new ArgumentNullException(nameof(person), "A entidade Person não pode ser nula.");
        }

        var existingPerson = _personRepository.GetById(person.Id);
        if (existingPerson == null)
        {
            throw new KeyNotFoundException($"Person com Id {person.Id} não foi encontrada.");
        }

        _personRepository.Update(person);
        _personRepository.SaveChanges();
    }

    public void DeletePerson(Guid id)
    {
        var person = _personRepository.GetById(id);
        if (person == null)
        {
            throw new KeyNotFoundException($"Person com Id {id} não foi encontrada.");
        }

        foreach (var contact in person.Contacts.ToList())
        {
            _contactService.DeleteContact(contact.Id);
        }

        _personRepository.Delete(person);
        _personRepository.SaveChanges();
    }

    public void AddContactToPerson(Guid personId, Contact contact)
    {
        var person = _personRepository.GetById(personId);
        if (person == null)
        {
            throw new KeyNotFoundException($"Person com Id {personId} não foi encontrada.");
        }

        person.Contacts.Add(contact);
        _personRepository.Update(person);
        _personRepository.SaveChanges();
    }

    public void RemoveContactFromPerson(Guid personId, Guid contactId)
    {
        var person = _personRepository.GetById(personId);
        if (person == null)
        {
            throw new KeyNotFoundException($"Person com Id {personId} não foi encontrada.");
        }

        var contact = person.Contacts.FirstOrDefault(c => c.Id == contactId);
        if (contact == null)
        {
            throw new KeyNotFoundException($"Contact com Id {contactId} não foi encontrado para a Person com ID {personId}.");
        }

        person.Contacts.Remove(contact);
        _personRepository.Update(person);
        _contactService.DeleteContact(contactId);
        _personRepository.SaveChanges();
    }
}
