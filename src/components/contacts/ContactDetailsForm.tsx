import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Field, FieldLabel } from '../ui/field';
import { useContact } from './ContactProvider';
import { STAGES, type Contact, type Stage } from '@/types/contact';
import { Textarea } from '../ui/textarea';
import { SheetFooter } from '../ui/sheet';
import { useState, type PropsWithChildren } from 'react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator.tsx';
import { Badge } from '../ui/badge.tsx';

interface ContactDetailsFormProps {
  contact: Contact;
}

function DetailRow({ label, children }: { label: string } & PropsWithChildren) {
  return (
    <div className="grid grid-cols-[6.5rem_1fr] items-start gap-3">
      <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</dt>
      <dd className="min-w-0 text-sm text-foreground">{children}</dd>
    </div>
  );
}

function MissingText({ children }: PropsWithChildren) {
  return <span className="text-sm text-muted-foreground/70 italic">{children}</span>;
}

export default function ContactDetailsForm({ contact }: ContactDetailsFormProps) {
  const [stage, setStage] = useState<Stage | undefined>(contact.stage);
  const [notes, setNotes] = useState<string>(contact.notes ?? '');
  const { updateContact } = useContact();

  const normalizedNotes = notes.trim().length > 0 ? notes.trim() : undefined;

  const isDirty = stage !== contact.stage || normalizedNotes !== contact.notes;

  const stageItems = STAGES.map((stage) => ({
    label: stage,
    value: stage,
  }));

  function resetState() {
    if (!contact) return;

    setStage(contact.stage);
    setNotes(contact.notes ?? '');
  }

  return (
    contact && (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (!isDirty) return;
          updateContact(contact.id, { stage, notes: normalizedNotes });
        }}
        className="flex flex-1 flex-col min-h-0"
      >
        <div className="px-4 flex-1 overflow-y-auto gap-4 flex flex-col pb-4">
          <DetailRow label="Email">
            {contact.email ? (
              <a
                href={`mailto:${contact.email}`}
                className="text-blue-500 hover:underline hover:underline-offset-2"
              >
                {contact.email}
              </a>
            ) : (
              <MissingText>No email</MissingText>
            )}
          </DetailRow>

          <DetailRow label="Company">{contact.company}</DetailRow>

          <DetailRow label="Role">{contact.role}</DetailRow>

          <DetailRow label="Owner">
            {contact.owner ?? <MissingText>No owner</MissingText>}
          </DetailRow>

          <DetailRow label="Labels">
            {contact.labels.length > 0 ? (
              <div className="flex flex-wrap items-center gap-1">
                {contact.labels.map((label) => {
                  return (
                    <Badge key={label} variant="secondary" className="rounded-full">
                      {label}
                    </Badge>
                  );
                })}
              </div>
            ) : (
              <MissingText>No labels</MissingText>
            )}
          </DetailRow>

          <Separator className="my-3" />

          <Field>
            <FieldLabel htmlFor="stage">Stage</FieldLabel>
            <Select
              items={stageItems}
              value={stage}
              onValueChange={(value) => {
                setStage(value ?? undefined);
              }}
            >
              <SelectTrigger id="stage">
                <SelectValue placeholder="Select a stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {stageItems.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field className="flex-1">
            <FieldLabel htmlFor="notes">Notes</FieldLabel>
            <Textarea
              id="notes"
              value={notes}
              rows={2}
              placeholder="No notes yet. Add context about this contact."
              onChange={(event) => setNotes(event.target.value)}
            />
          </Field>
        </div>

        <SheetFooter className="border-t border-border">
          {isDirty ? (
            <span className="mr-auto text-xs text-muted-foreground">Unsaved changes</span>
          ) : null}
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={resetState} disabled={!isDirty}>
              Cancel
            </Button>
            <Button type="submit" disabled={!isDirty}>
              Save changes
            </Button>
          </div>
        </SheetFooter>
      </form>
    )
  );
}
