using Microsoft.AspNetCore.Mvc;
using API_Bravi.Models;
using API_Bravi.Services.Interfaces;

namespace API_Bravi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PersonController : ControllerBase
    {
        private readonly IPersonService _personService;

        public PersonController(IPersonService personService)
        {
            _personService = personService;
        }

        [HttpGet("{id}")]
        public ActionResult<Person> GetById(Guid id)
        {
            var person = _personService.GetById(id);
            if (person == null)
            {
                return NotFound($"Person com ID {id} não foi encontrada.");
            }
            return Ok(person);
        }

        [HttpGet]
        public ActionResult<IEnumerable<Person>> GetAll()
        {
            var people = _personService.GetAll();
            return Ok(people);
        }

        [HttpPost]
        public IActionResult AddPerson([FromBody] Person person)
        {
            if (person == null)
            {
                return BadRequest("A entidade Person não pode ser nula.");
            }

            _personService.AddPerson(person);
            return CreatedAtAction(nameof(GetById), new { id = person.Id }, person);
        }

        [HttpPut("{id}")]
        public IActionResult UpdatePerson([FromBody] Person person)
        {
            if (person == null)
            {
                return BadRequest("Dados inválidos.");
            }

            try
            {
                _personService.UpdatePerson(person);
            }
            catch (KeyNotFoundException e)
            {
                return NotFound(e.Message);
            }

            return Accepted();
        }

        [HttpDelete("{id}")]
        public IActionResult DeletePerson(Guid id)
        {
            try
            {
                _personService.DeletePerson(id);
            }
            catch (KeyNotFoundException e)
            {
                return NotFound(e.Message);
            }

            return Accepted();
        }

        [HttpPost("{personId}/contacts")]
        public IActionResult AddContactToPerson(Guid personId, [FromBody] Contact contact)
        {
            if (contact == null)
            {
                return BadRequest("A entidade Contact não pode ser nula.");
            }

            try
            {
                _personService.AddContactToPerson(personId, contact);
            }
            catch (KeyNotFoundException e)
            {
                return NotFound(e.Message);
            }

            return Accepted();
        }

        [HttpDelete("{personId}/contacts/{contactId}")]
        public IActionResult RemoveContactFromPerson(Guid personId, Guid contactId)
        {
            try
            {
                _personService.RemoveContactFromPerson(personId, contactId);
            }
            catch (KeyNotFoundException e)
            {
                return NotFound(e.Message);
            }

            return Accepted();
        }
    }

}