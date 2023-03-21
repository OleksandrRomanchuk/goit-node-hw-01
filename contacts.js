const { readFile, writeFile } = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("./db/contacts.json");
const encodingSystem = "utf-8";

async function listContacts() {
  try {
    const data = await readFile(contactsPath, encodingSystem);
    const contacts = JSON.parse(data);

    return contacts;
  } catch (error) {
    console.error(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.filter(({ id }) => id === contactId.toString());

    return contact;
  } catch (error) {
    console.error(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };

    const contacts = await listContacts();

    contacts.push(newContact);

    result = await writeFile(contactsPath, JSON.stringify(contacts));
  } catch (error) {
    console.error(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const newContacts = contacts.filter(
      ({ id }) => id !== contactId.toString()
    );

    await writeFile(contactsPath, JSON.stringify(newContacts));
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
