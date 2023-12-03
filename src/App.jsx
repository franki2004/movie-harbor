import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/authContext';
import Path from './paths';

import Header from './components/Header'
import Main from './components/Main/Main'
import Footer from './components/Footer'
import SearchModal from './components/SearchModal'
import MovieDetails from './components/MovieDetails/MovieDetails';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Logout from './components/Auth/Logout';
import NotFound from './components/NotFound/Notfound'

function App() {

    return (
        <AuthProvider>
            <Header />
            <SearchModal />

            <Routes>
                <Route path={Path.Home} element={<Main />} />
                <Route path={Path.MovieDetails} element={<MovieDetails />} />
                <Route path={Path.Login} element={<Login />} />
                <Route path={Path.Register} element={<Register />} />
                <Route path={Path.Logout} element={<Logout />} />
                <Route path={Path.NotFound} element={<NotFound/>} />
            </Routes>

            <Footer />
        </AuthProvider>

    )
}

export default App
