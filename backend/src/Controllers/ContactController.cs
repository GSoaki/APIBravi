using Microsoft.AspNetCore.Mvc;
using API_Bravi.Models;
using API_Bravi.Services.Interfaces;

namespace API_Bravi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly IContactService _contactService;
        private readonly IPersonService _personService;
        public ContactController(IContactService contactService, IPersonService personService)
        {
            _contactService = contactService;
            _personService = personService;
        }

        [HttpGet("{id}")]
        public ActionResult<Contact> GetById(Guid id)
        {
            var contact = _contactService.GetById(id);
            if (contact == null)
            {
                return NotFound($"Contact com ID {id} n�o foi encontrado.");
            }
            return Ok(contact);
        }

        [HttpGet]
        public ActionResult<Contact> GetByPersonId(Guid personId)
        {
            var contact = _contactService.GetByPersonId(personId);
            if (contact == null)
            {
                return NotFound($"Contato com personId {personId} n�o foi encontrado.");
            }
            return Ok(contact);
        }

        [HttpPost]
        public IActionResult AddContact([FromBody] Contact contact)
        {
            if (contact == null)
            {
                return BadRequest("A entidade Contact n�o pode ser nula.");
            }

            if(_personService.GetById(contact.PersonId) == null)
            {
                return BadRequest("A entidade Person n�o existe.");
            }

            _contactService.AddContact(contact);

            return CreatedAtAction(nameof(GetById), new { id = contact.Id }, contact);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateContact([FromBody] Contact contact)
        {
            if (contact == null)
            {
                return BadRequest("Dados inv�lidos.");
            }

            try
            {
                _contactService.UpdateContact(contact);
            }
            catch (KeyNotFoundException e)
            {
                return NotFound(e.Message);
            }

            return Accepted();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteContact(Guid id)
        {
            try
            {
                _contactService.DeleteContact(id);
            }
            catch (KeyNotFoundException e)
            {
                return NotFound(e.Message);
            }

            return Accepted();
        }
    }

}