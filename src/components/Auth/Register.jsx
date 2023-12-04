import { useState, useContext } from "react"
import { Link } from "react-router-dom"
import Path from "../../paths"
import AuthContext from "../../contexts/authContext"

export default function Register() {
    const { registerSubmitHandler } = useContext(AuthContext);
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [usernameError, setUsernameError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [registrationError, setRegistrationError] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g
        const usernameRegex = /^[a-z0-9_-]{4,15}$/
        setEmailError("")
        setUsernameError("")
        setPasswordError("")
        setRegistrationError("")

        if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid email address.");
        }

        if (!usernameRegex.test(username)) {
            setUsernameError("Username must consist of at least 4 and maximum of 15 characters.");
        }

        if (password.length > 30 || password.length < 5) {
            setPasswordError("Password must consist of 5-30 characters.");
        }

        if (!emailError && !usernameError && !passwordError) {
            registerSubmitHandler({ email, password, username })
                .catch((error) => {
                    if (error.code === 409) {
                        setRegistrationError(error.message);
                    } else {
                        setRegistrationError("Registration failed. Please try again later.");
                    }
                });
        }
    };

    return (
        <section
            className="signup spad"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "87px",
            }}
        >
            <div className="container">
                <div className="col-lg-8">
                    <div className="login__form">
                        <h3>Sign Up</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="input__item">
                                <input
                                    style={{ color: 'black' }}
                                    type="text"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                                {registrationError && <p style={{ color: 'red' }}>{registrationError}</p>}
                                <span className="icon_mail"></span>
                            </div>
                            <div className="input__item">
                                <input
                                    style={{ color: 'black' }}
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                {usernameError && <p style={{ color: 'red' }}>{usernameError}</p>}
                                <span className="icon_profile"></span>
                            </div>
                            <div className="input__item">
                                <input
                                    style={{ color: 'black' }}
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                                <span className="icon_lock"></span>
                            </div>
                            <button type="submit" className="site-btn">
                                Register Now
                            </button>
                        </form>
                        <Link to={Path.Login}>
                            <h5>Already have an account?</h5>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
