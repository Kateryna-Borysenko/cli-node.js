const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "./db/contacts.json"); //__dirname – абсолютный путь до исполняемого скрипта
const { nanoid } = require("nanoid") //ф-ция которая экспортирует модуль nanoid в переменную nanoid

//fs - Модуль FileSystem отвечает за работу с файлами в Node.js
function listContacts() {
    fs.readFile(contactsPath)
        .then((data) => JSON.parse(data))
        .then((data) => {
            console.table(data);
        })
        .catch((err) => console.log(err));
}

function getContactById(contactId) {
    fs.readFile(contactsPath)
        .then((data) => JSON.parse(data))
        .then((data) => {
            const contact = data.filter((elem) => +elem.id === contactId);
            console.table(contact);
        })
        .catch((err) => console.log(err));
}

function removeContact(contactId) {
    fs.readFile(contactsPath)
        .then((data) => JSON.parse(data))
        .then((data) => {
            const contact = data.filter((elem) => +elem.id !== contactId);
            fs.writeFile(contactsPath, JSON.stringify(contact));
        })
        .catch((err) => console.log(err));
    listContacts();
}

function addContact(name, email, phone) {
    fs.readFile(contactsPath)
        .then((data) => {
            return JSON.parse(data);
        })
        .then((data) => {
            const newContacts = [...data, { id: nanoid(), name, email, phone }];
            fs.writeFile(contactsPath, JSON.stringify(newContacts));
        })
        .catch((err) => console.log(err));
    listContacts();
}

//module.export – объект, отвечающий за то, что именно будет экспортировать модуль при использовании require
module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}

