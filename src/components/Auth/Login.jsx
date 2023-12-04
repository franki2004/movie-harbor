import { useState, useContext } from "react";
import Path from "../../paths";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/authContext";

export default function Login() {
    const { loginSubmitHandler } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState()
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoginError()

        loginSubmitHandler({ email, password })
            .catch(setLoginError("Email or Password don't match."))

    };

    return (
        <section className="login spad" style={{ marginBottom: "198px", marginTop: "42px" }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="login__form">
                            <h3>Login</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="input__item">
                                    <input
                                        style={{ color: 'black' }}
                                        type="text"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <span className="icon_mail"></span>
                                </div>
                                <div className="input__item">
                                    <input
                                        style={{ color: 'black' }}
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
                                    <span className="icon_lock"></span>
                                </div>
                                <button type="submit" className="site-btn">
                                    Login Now
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="login__register">
                            <h3>Don&apos;t Have An Account?</h3>
                            <Link to={Path.Register} className="primary-btn">
                                Register Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}