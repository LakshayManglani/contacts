import { createContext, useContext, useMemo, useState } from 'react';
import { contacts as initialContacts } from '@/data/contacts';
import type { Contact, View } from '@/types/contact';

type ContactProviderProps = {
  children: React.ReactNode;
};

type ContactProviderState = {
  contacts: Contact[];
  view: View;
  selectedContactId: string | null;
  isDetailsPanelOpen: boolean;

  openDetailsPanel: (contactId: string) => void;
  closeDetailsPanel: () => void;
  setView: (view: View) => void;
  updateContact: (contactId: string, updates: Partial<Contact>) => void;
};

const initialState: ContactProviderState = {
  contacts: initialContacts,
  view: 'table',
  selectedContactId: null,
  isDetailsPanelOpen: false,
  openDetailsPanel: () => {},
  closeDetailsPanel: () => {},
  setView: () => {},
  updateContact: () => {},
};

const ContactProviderContext = createContext<ContactProviderState>(initialState);

export function ContactProvider({ children, ...props }: ContactProviderProps) {
  const [contacts, setContacts] = useState<Contact[]>(initialState.contacts);
  const [view, setView] = useState<View>(initialState.view);
  const [selectedContactId, setSelectedContactId] = useState<
    ContactProviderState['selectedContactId']
  >(initialState.selectedContactId);

  const isDetailsPanelOpen = selectedContactId !== null;

  const openDetailsPanel = (contactId: string) => {
    setSelectedContactId(contactId);
  };

  const closeDetailsPanel = () => {
    setSelectedContactId(null);
  };

  const updateContact = (contactId: string, updates: Partial<Contact>) => {
    setContacts((currentContacts) =>
      currentContacts.map((contact) =>
        contact.id === contactId
          ? {
              ...contact,
              ...updates,
            }
          : contact,
      ),
    );
  };

  const value = useMemo<ContactProviderState>(() => {
    return {
      contacts,
      view,
      selectedContactId,
      isDetailsPanelOpen,
      openDetailsPanel,
      closeDetailsPanel,
      setView,
      updateContact,
    };
  }, [contacts, view, selectedContactId, isDetailsPanelOpen]);

  return (
    <ContactProviderContext.Provider value={value} {...props}>
      {children}
    </ContactProviderContext.Provider>
  );
}

export const useContact = () => {
  const context = useContext(ContactProviderContext);

  if (!context) throw new Error('useContact must be used within an ContactProvider');

  return context;
};
