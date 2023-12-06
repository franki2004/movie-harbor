import { Link } from "react-router-dom"
import Path from "../paths"
import { useContext, useState } from "react"
import AuthContext from "../contexts/authContext";
import SearchModal from "./SearchModal/SearchModal";
export default function Header() {
    const [openSearchModal, setOpenSearchModal] = useState(false)
    const { isAuthenticated, email } = useContext(AuthContext);
    
    return (
        <>
            <header className="header">
                {openSearchModal && <SearchModal closeModal={setOpenSearchModal} />}
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2">
                            <div className="header__logo">
                                <Link to={Path.Home}><img src='/img/logo.png' alt="logo" /></Link>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="header__nav">
                                <nav className="header__menu mobile-menu">
                                    <ul>
                                        <li className="active"><Link to={Path.Home}>Homepage</Link></li>
                                        <li><a href="#">Contacts</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="header__right">
                                <button style={{ background: "none", color: "white", border: "none", marginRight: "1rem" }} onClick={() => { setOpenSearchModal(true) }} className="search-switch"><span className="icon_search"></span></button>

                                {!isAuthenticated ? <Link to={Path.Login}><i className="fa fa-sign-in" aria-hidden="true"></i></Link> :
                                    <Link to={Path.Logout}><i className="fa fa-sign-out" aria-hidden="true"></i></Link>}

                                {isAuthenticated && <p style={{ display: "inline", color: "white" }}>{email}</p>}
                            </div>
                        </div>
                    </div>
                    <div id="mobile-menu-wrap"></div>
                </div>
            </header>
        </>
    )
}