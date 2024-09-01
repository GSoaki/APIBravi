using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API_Bravi.Models
{
    public class Contact
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string Type { get; set; }
        [Required]
        public string Value { get; set; }
        [Required]
        [ForeignKey("Person")]
        public Guid PersonId { get; set; }

        [JsonConstructor]
        public Contact() { }

        public Contact(Guid id, string type, string value)
        {
            Id = id;
            Type = type;
            Value = value;
        }
    }
}
