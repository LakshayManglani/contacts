import ContactTable from '@/components/contacts/ContactTable';
import ContactBoard from '@/components/contacts/ContactBoard';
import { useContact } from '@/components/contacts/ContactProvider';

export default function ContactView() {
  const { view } = useContact();
  return view === 'table' ? <ContactTable /> : <ContactBoard />;
}
