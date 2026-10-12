import AppContainer from '@/components/app/AppContainer';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useContact } from './ContactProvider';
import { VIEWS, type View } from '@/types/contact';

export default function ContactToolbar() {
  const { view, setView } = useContact();

  return (
    <div className="border-b border-border">
      <AppContainer className="flex py-4 justify-between items-center">
        <span>Contacts</span>

        <ToggleGroup
          onValueChange={(value) => {
            if (value.length === 0) return;

            setView(value[0] as View);
          }}
          value={[view]}
          variant="outline"
          className="gap-0 border border-border"
        >
          {VIEWS.map((view) => {
            return (
              <ToggleGroupItem key={view} value={view} className="border-0 rounded-none">
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </ToggleGroupItem>
            );
          })}
        </ToggleGroup>
      </AppContainer>
    </div>
  );
}
