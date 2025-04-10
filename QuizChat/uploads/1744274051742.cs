using TelephoneDirectoryAPI.Models;

namespace TelephoneDirectoryAPI.Repositories
{
    public class InMemoryContactRepository
    {
        private readonly List<Contact> _contacts = new();
        private int _nextId = 1;

        public List<Contact> GetAll() => _contacts;

        public Contact? GetById(int id) => _contacts.FirstOrDefault(c => c.Id == id);

        public Contact Add(Contact contact)
        {
            contact.Id = _nextId++;
            _contacts.Add(contact);
            return contact;
        }

        public bool Delete(int id)
        {
            var contact = GetById(id);
            if (contact == null) return false;
            _contacts.Remove(contact);
            return true;
        }

        public bool Update(int id, Contact updatedContact)
        {
            var index = _contacts.FindIndex(c => c.Id == id);
            if (index == -1)
                return false;

            _contacts[index] = updatedContact;
            return true;
        }

    }
}
