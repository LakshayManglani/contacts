import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { contacts } from '@/data/contacts';

export default function ContactTable() {
  return (
    <div className="rounded-lg border border-border bg-card shadow-xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Labels</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell className="font-medium">{contact.name}</TableCell>
              <TableCell>{contact.company}</TableCell>
              <TableCell>{contact.role}</TableCell>
              <TableCell>{contact.owner}</TableCell>
              <TableCell>{contact.labels}</TableCell>
              <TableCell>{contact.stage}</TableCell>
              <TableCell>{contact.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
