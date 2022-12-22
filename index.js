const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const argv = require("yargs").argv;

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      console.table(allContacts);
      break;

    case "get":
      const contactById = await getContactById(id);
      if (!contactById) {
        throw new Error(`Product with id=${id} not found`);
      }
      console.table(contactById);
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const removeContactById = await removeContact(id);
      if (!removeContactById) {
        throw new Error(`Product with id=${id} not found`);
      }
      console.table(removeContactById);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
