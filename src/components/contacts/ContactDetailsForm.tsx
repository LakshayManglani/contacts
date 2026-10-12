import { useContact } from './ContactProvider';

export default function ContactDetailsForm() {
  const { selectedContactId, contacts } = useContact();

  const contact = contacts.find((contact) => contact.id === selectedContactId);

  return (
    contact && (
      <div className="">
        <div>Email: {contact.email}</div>
        <div>Company: {contact.company}</div>
        <div>Role: {contact.role}</div>
        <div>Owner: {contact.owner}</div>
        <div>Labels: {contact.labels}</div>
        <div>Stage: {contact.stage}</div>
        <div>notes: {contact.notes}</div>
      </div>
    )
  );
}
