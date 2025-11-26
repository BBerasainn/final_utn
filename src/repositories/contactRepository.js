import Contact from "../models/Contact.js";

export async function getAllContacts() {
  return await Contact.find().sort({ createdAt: -1 });
}

export async function getContactById(id) {
  return await Contact.findById(id);
}

export async function createContact(data) {
  const contact = new Contact(data);
  return await contact.save();
}

export async function updateContact(id, data) {
  return await Contact.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteContact(id) {
  return await Contact.findByIdAndDelete(id);
}
