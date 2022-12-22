const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      const contactById = await getContactById(id);
      if (!contactById) {
        throw new Error(`There is no Contact with this id: ${id}`);
      }
      console.table(contactById);
      break;

    case "add":
      const addNewContact = await addContact(name, email, phone);
      console.log(addNewContact);
      break;

    case "remove":
      const removeContactById = await removeContact(id);
      if (!removeContactById) {
        throw new Error(`There is no Contact with this id: ${id}`);
      }
      console.table(removeContactById);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
