import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useContact } from './ContactProvider';
import AppContainer from '../app/AppContainer';
import { Badge } from '../ui/badge';

export default function ContactTable() {
  const { contacts, openDetailsPanel } = useContact();

  return (
    <AppContainer className="mt-8">
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
              <TableRow key={contact.id} onClick={() => openDetailsPanel(contact.id)}>
                <TableCell className="font-medium">
                  <button>{contact.name}</button>
                </TableCell>
                <TableCell>{contact.company}</TableCell>
                <TableCell>{contact.role}</TableCell>
                <TableCell>{contact.owner}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap items-center gap-1">
                    {contact.labels.map((label) => {
                      return (
                        <Badge key={label} variant="secondary" className="rounded-full">
                          {label}
                        </Badge>
                      );
                    })}
                  </div>
                </TableCell>
                <TableCell>{contact.stage}</TableCell>
                <TableCell>{contact.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AppContainer>
  );
}
