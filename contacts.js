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
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(({ id }) => id === contactId.toString());

    if (!contact) {
      throw new Error("No such contact exists.");
    }

    return contact;
  } catch (error) {
    console.error(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const contactAlreadyExists = contacts.find(
      (contact) => contact.name === name
    );

    if (contactAlreadyExists) {
      throw new Error("A contact with such name already exists.");
    }

    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };

    contacts.push(newContact);

    await writeFile(contactsPath, JSON.stringify(contacts));
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

    if (!contactToRemove.length) {
      throw new Error(
        "It is not possible to delete the contact because it does not exist."
      );
    }

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
