import { ContactProvider } from '@/components/contacts/ContactProvider';
import ContactToolbar from '@/components/contacts/ContactToolbar';
import ContactView from '@/components/contacts/ContactView';
import { ContactDetailsSheet } from './components/contacts/ContactDetailsSheet';

function App() {
  return (
    <ContactProvider>
      <div className="flex flex-col min-h-dvh">
        <ContactToolbar />
        <ContactView />
        <ContactDetailsSheet />
      </div>
    </ContactProvider>
  );
}

export default App;
