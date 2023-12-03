import { Link } from "react-router-dom"
import Path from "../paths"
export default function Footer() {
    return (
        <footer className="footer">
            <div className="page-up">
                <a href="#" id="scrollToTopButton"><span className="arrow_carrot-up"></span></a>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="footer__logo">
                            <Link to={Path.Home}><img src='/img/logo.png' alt="logo" /></Link>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="footer__nav">
                            <ul>
                                <li className="active"><Link to={Path.Home}>Homepage</Link></li>
                                <li><a href="./categories.html">Categories</a></li>
                                <li><a href="./blog.html">Our Blog</a></li>
                                <li><a href="#">Contacts</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <p>All rights reserved &copy;</p>

                    </div>
                </div>
            </div>
        </footer>
    )
}