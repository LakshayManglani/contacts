import { STAGES, type Contact, type Stage } from '@/types/contact';
import { contacts } from '@/data/contacts';
import ContactBoardColumn from '@/components/contacts/ContactBoardColumn';
import AppContainer from '@/components/app/AppContainer';

export default function ContactBoard() {
  const groups = STAGES.reduce<Record<Stage, Contact[]>>(
    (acc, stage) => {
      acc[stage] = [];
      return acc;
    },
    {} as Record<Stage, Contact[]>,
  );

  const noGroup: Contact[] = [];

  contacts.forEach((contact) => {
    if (!contact.stage) {
      noGroup.push(contact);
      return;
    }

    groups[contact.stage].push(contact);
  });

  return (
    <AppContainer className="flex-1 flex">
      <div
        role="group"
        aria-label="Contacts board"
        className="flex gap-8 overflow-y-auto flex-1 py-8"
      >
        {STAGES.map((stage) => {
          return <ContactBoardColumn key={stage} stage={stage} contacts={groups[stage]} />;
        })}

        {noGroup.length > 0 && <ContactBoardColumn stage={'Unassigned'} contacts={noGroup} />}
      </div>
    </AppContainer>
  );
}
