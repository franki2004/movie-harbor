//import { Routes, Route } from 'react-router-dom';//

import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Main from './components/Main/Main'
import Footer from './components/Footer/Footer'
import SearchModal from './components/SearchModal/SearchModal'

function App() {

    return (
        <>
            <Header/>
            <SearchModal/>
            
            <Hero/>
            <Main/>
            <Footer/>
        </>
    )
}

export default App
