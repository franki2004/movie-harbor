import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/authContext';
import Path from './paths';

import Header from './components/Header'
import Main from './components/Main/Main'
import Footer from './components/Footer'
import SearchModal from './components/SearchModal'
import MovieDetails from './components/MovieDetails/MovieDetails';


function App() {

    return (
        <AuthProvider>
            <Header />
            <SearchModal />

            <Routes>
                <Route path={Path.Home} element={<Main />} />
                <Route path={Path.MovieDetails} element={<MovieDetails />} />
            </Routes>

            <Footer />
        </AuthProvider>

    )
}

export default App
