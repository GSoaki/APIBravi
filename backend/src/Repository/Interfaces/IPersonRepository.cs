using API_Bravi.Models;

namespace API_Bravi.Repository.Interfaces
{
    public interface IPersonRepository
    {
        public List<Person> GetAll();
        public Person? GetById(Guid id);
        public void Add(Person person);
        public void Update(Person person);
        public void Delete(Person person);
        public void SaveChanges();
    }
}
