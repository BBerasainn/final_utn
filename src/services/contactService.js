import * as contactRepository from "../repositories/contactRepository.js";

export function getContacts() {
  return contactRepository.getAllContacts();
}

export function createContact(data) {
  return contactRepository.createContact(data);
}

export function updateContact(id, data) {
  return contactRepository.updateContact(id, data);
}

export function deleteContact(id) {
  return contactRepository.deleteContact(id);
}
