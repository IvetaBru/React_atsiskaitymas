import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import { RecipesProvider } from './components/contexts/RecipesContext.tsx';

createRoot(document.getElementById('root') as HTMLDivElement).render(
    <BrowserRouter>
        <RecipesProvider>
            <App />
        </RecipesProvider>
    </BrowserRouter>
);
