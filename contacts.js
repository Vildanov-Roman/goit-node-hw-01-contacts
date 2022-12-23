const { nanoid } = require("nanoid");
const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "./db/contacts.json");

const getContacts = async () => {
  const res = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(res);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await getContacts();
  const result = contacts.find(
    (contact) => contact.id === contactId.toString()
  );
  return result || null;
};

const removeContact = async (contactId) => {
  const contacts = await getContacts();
  const result = contacts.filter((contact) => contact.id !== contactId);
  if (result === -1) {
    return null;
  }
  await fs.writeFile(contactsPath, JSON.stringify(result, null, 2), "utf8");
  return result;
};

const addContact = async (name, email, phone) => {
  const contacts = await getContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
};
