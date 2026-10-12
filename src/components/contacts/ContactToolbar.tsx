import AppContainer from '@/components/app/AppContainer';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useContact } from './ContactProvider';
import { VIEWS, type View } from '@/types/contact';

export default function ContactToolbar() {
  const { view, setView } = useContact();

  return (
    <div className="border-b border-border">
      <AppContainer className="flex py-4 justify-between">
        <span>Contacts</span>

        <ToggleGroup
          onValueChange={(value) => {
            if (value.length === 0) return;

            setView(value[0] as View);
          }}
          value={[view]}
          variant="outline"
        >
          {VIEWS.map((view) => {
            return (
              <ToggleGroupItem key={view} value={view}>
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </ToggleGroupItem>
            );
          })}
        </ToggleGroup>
      </AppContainer>
    </div>
  );
}
