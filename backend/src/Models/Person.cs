using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace API_Bravi.Models
{
    public class Person
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }

        [JsonIgnore]
        public List<Contact>? Contacts { get; set; }

        [JsonConstructor]
        public Person() { }

        public Person(string name)
        {
            Id = Guid.NewGuid();
            Name = name;
            Contacts = new List<Contact>();
        }
    }
}
