import { Link } from "react-router-dom"
import Path from "../../paths"

export default function Register() {
    return (
        <section className="signup spad" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="container">

                <div className="col-lg-10" style={{ borderRight: 'none' }}>
                    <div className="login__form" style={{ width: '100%' }}>
                        <h3>Sign Up</h3>
                        <form action="#">
                            <div className="input__item">
                                <input type="text" placeholder="Email address" />
                                <span className="icon_mail"></span>
                            </div>
                            <div className="input__item">
                                <input type="text" placeholder="Your Name" />
                                <span className="icon_profile"></span>
                            </div>
                            <div className="input__item">
                                <input type="text" placeholder="Password" />
                                <span className="icon_lock"></span>
                            </div>
                            <button type="submit" className="site-btn">Login Now</button>
                        </form>
                        <Link to={Path.Login}><h5>Already have an account?</h5></Link>
                    </div>
                </div>
            </div>
        </section>
    )
}