import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Login = () => {
    const [email, set] = useState("")
    const navigate = useNavigate()



    const handleLogin = (e) => {
        e.preventDefault();

        return fetch(`http://localhost:9000/user?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0];
                    localStorage.setItem("city_traveler_user", JSON.stringify({
                        id: user.id,

                    }));
                    console.log("Logged in user ID:", user.id);

                    navigate("/pick-city");
                } else {
                    window.alert("Invalid login");
                }
            });
    };


    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>

                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail">  </label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
        </main>
    )
}