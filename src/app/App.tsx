import type { DataRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import { DocumentSettings } from '../components/layout/DocumentSettings';
import { ToastProvider } from '../components/ui/ToastProvider';
import type { AppStore } from '../state/store';
import { StoreProvider } from '../state/StoreProvider';

interface AppProps {
  store: AppStore;
  router: DataRouter;
}

export function App({ store, router }: AppProps) {
  return (
    <StoreProvider store={store}>
      <DocumentSettings />
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </StoreProvider>
  );
}
