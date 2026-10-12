import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useContact } from './ContactProvider';
import ContactDetailsForm from './ContactDetailsForm';

export function ContactDetailsSheet() {
  const { selectedContactId, closeDetailsPanel, isDetailsPanelOpen, contacts } = useContact();

  const selectedContact = contacts.find((contact) => contact.id === selectedContactId);

  return (
    <Sheet
      open={isDetailsPanelOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeDetailsPanel();
        }
      }}
    >
      <SheetContent side="right">
        {selectedContact ? (
          <>
            <SheetHeader>
              <SheetTitle className="truncate">{selectedContact.name}</SheetTitle>
              <SheetDescription className="truncate">
                {selectedContact.company} | {selectedContact.role}
              </SheetDescription>
            </SheetHeader>

            <ContactDetailsForm />
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
