import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { LoadingProvider } from './components/loader/LoadingProvider'
import useComponentLoaded from './hooks/useComponentLoaded'

// App wrapper to handle initial loading
const AppWrapper = () => {
  // Register the main app for initial loading
  useComponentLoaded('main-app', true, 500, 2000);
  
  return <App />;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoadingProvider>
      <AppWrapper />
    </LoadingProvider>
  </StrictMode>,
)
