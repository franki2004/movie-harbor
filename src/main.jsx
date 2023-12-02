import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

import "./assets/css/bootstrap.min.css"
import "./assets/css/elegant-icons.css"
import "./assets/css/font-awesome.min.css"
import "./assets/css/nice-select.css"
import "./assets/css/owl.carousel.min.css"
import "./assets/css/style.css"
import "./assets/css/plyr.css"
import "./assets/css/slicknav.min.css"

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
)
