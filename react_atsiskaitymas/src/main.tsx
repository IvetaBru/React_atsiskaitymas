import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import { RecipesProvider } from './components/contexts/RecipesContext.tsx';
import { UsersProvider } from './components/contexts/UsersContext.tsx';

createRoot(document.getElementById('root') as HTMLDivElement).render(
    <BrowserRouter>
        <UsersProvider>
            <RecipesProvider>
                <App />
            </RecipesProvider>
        </UsersProvider>
    </BrowserRouter>
);
