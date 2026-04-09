import { createRoot } from 'react-dom/client'
import Modal from 'react-modal'
import './index.css'
import App from './App.jsx'

// Set the root element for react-modal
Modal.setAppElement('#root')

createRoot(document.getElementById('root')).render(
  <App />
)
