import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import Demo from './view/Dome/Demo'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Demo />
    </StrictMode>
)