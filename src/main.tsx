import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import { Suspense } from 'react';

import App from './App';
import GlobalStyle from './style/GlobalStyle';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: true,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <GlobalStyle />
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  </QueryClientProvider>
);
