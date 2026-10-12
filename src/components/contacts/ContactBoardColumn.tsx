import type { Contact } from '@/types/contact';
import { useContact } from './ContactProvider';
import { Badge } from '../ui/badge';

interface ContactBoardColumnProps {
  stage?: string;
  contacts: Contact[];
}

export default function ContactBoardColumn({ stage, contacts }: ContactBoardColumnProps) {
  const { openDetailsPanel } = useContact();

  return (
    <section
      key={stage}
      aria-labelledby={`stage-${stage}`}
      className="min-h-96 w-3xs shrink-0 h-min flex flex-col rounded-lg border border-border bg-muted/30"
    >
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h2 id={`stage-${stage}`} className="text-sm font-semibold">
          {stage}
        </h2>

        {/* <span className="text-xs text-muted-foreground">{contacts.length}</span> */}
        <Badge>{contacts.length}</Badge>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => openDetailsPanel(contact.id)}
              className="rounded-md border bg-background p-3"
            >
              <article>
                <p className="text-sm font-medium line-clamp-1">{contact.name}</p>

                {contact.company && (
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
                    {contact.company}
                  </p>
                )}
              </article>
            </button>
          ))
        ) : (
          <div className="flex flex-1 items-center justify-center rounded-md border border-dashed p-4">
            <p className="text-xs text-muted-foreground">No contacts</p>
          </div>
        )}
      </div>
    </section>
  );
}
