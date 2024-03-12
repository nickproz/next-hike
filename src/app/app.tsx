import { RouterComponent } from '@/app/router.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nProvider } from '@cloudscape-design/components/i18n';
import messages from '@cloudscape-design/components/i18n/messages/all.all';

const queryClient = new QueryClient();

function AppComponent() {
  return (
    <I18nProvider messages={[messages]}>
      <QueryClientProvider client={queryClient}>
        <RouterComponent />
      </QueryClientProvider>
    </I18nProvider>
  );
}

export default AppComponent;
