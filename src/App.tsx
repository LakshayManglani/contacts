import { useState } from 'react';
import ContactTable from '@/components/contacts/ContactTable';
import AppContainer from '@/components/app/AppContainer';
import ContactBoard from '@/components/contacts/ContactBoard';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

function App() {
  const [view, setView] = useState<'table' | 'board'>('table');

  return (
    <div className="flex flex-col min-h-dvh">
      <header className="border-b border-border">
        <AppContainer className="flex py-4 justify-between">
          <span>Contacts</span>

          <ToggleGroup
            onValueChange={(value) => {
              if (value.length === 0) return;

              setView(value[0] as typeof view);
            }}
            defaultValue={[view]}
            variant="outline"
          >
            <ToggleGroupItem value="table">Table</ToggleGroupItem>

            <ToggleGroupItem value="board">Board</ToggleGroupItem>
          </ToggleGroup>
        </AppContainer>
      </header>
      {view === 'table' ? <ContactTable /> : <ContactBoard />}
    </div>
  );
}

export default App;
