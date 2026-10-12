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
import { useState } from 'react';
import { Button } from '../ui/button';

interface ContactDetailsFormProps {
  contact: Contact;
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
      >
        <div>Email: {contact.email}</div>
        <div>Company: {contact.company}</div>
        <div>Role: {contact.role}</div>
        <div>Owner: {contact.owner}</div>
        <div>Labels: {contact.labels}</div>

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

        <Field>
          <FieldLabel htmlFor="notes">Notes</FieldLabel>
          <Textarea
            id="notes"
            value={notes}
            rows={6}
            placeholder="No notes yet. Add context about this contact."
            onChange={(event) => setNotes(event.target.value)}
          />
        </Field>

        <SheetFooter>
          {isDirty ? (
            <span className="mr-auto text-xs text-muted-foreground">Unsaved changes</span>
          ) : null}
          <Button type="button" variant="outline" onClick={resetState} disabled={!isDirty}>
            Cancel
          </Button>
          <Button type="submit" disabled={!isDirty}>
            Save changes
          </Button>
        </SheetFooter>
      </form>
    )
  );
}
