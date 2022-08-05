import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';

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
    <ToastContainer />
    <GlobalStyle />
    <App />
  </QueryClientProvider>
);
