import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CarouselGame from './components/Carousel/CarouselGame.jsx'
import Sidebar from './components/Sidebar/Sidebar.jsx'
import SidebarFetch from './components/Sidebar/SidebarFetch.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CarouselGame />
    <Sidebar />
  </StrictMode>,
)
