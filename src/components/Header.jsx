import { Link } from "react-router-dom"
import Path from "../paths"
import { useContext } from "react"
import AuthContext from "../contexts/authContext";
export default function Header() {
    const { isAuthenticated, email} = useContext(AuthContext);
    return (
        <>
            <header className="header">
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
                                        <li><a href="./categories.html">Categories <span className="arrow_carrot-down"></span></a>
                                            <ul className="dropdown">
                                                <li><a href="./categories.html">Categories</a></li>
                                                <li><a href="./anime-details.html">Anime Details</a></li>
                                                <li><a href="./anime-watching.html">Anime Watching</a></li>
                                                <li><a href="./blog-details.html">Blog Details</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="#">Contacts</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="header__right">
                                <a href="#" className="search-switch"><span className="icon_search"></span></a>

                                <Link to={!isAuthenticated?Path.Login:Path.Logout}><span className="icon_profile" /></Link>


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