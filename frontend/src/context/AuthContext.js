import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

import { useNavigate } from "react-router-dom";

import { backendURL } from "../backendURL";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );
    const [user, setUser] = useState(() =>
        localStorage.getItem("authTokens")
            ? jwt_decode(localStorage.getItem("authTokens"))
            : null
    );
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const loginUser = async (email, password) => {
        const response = await fetch(`${backendURL}/login/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        const data = await response.json();

        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem("authTokens", JSON.stringify(data));
            console.log("Logged in");
            navigate("/");
        } else {
            alert("Something went wrong!");
        }
    };

    const registerUser = async (first_name, last_name, city, college, contact, gender, referral_code, email, password, ambassador) => {
        console.log("Ambassador: ", ambassador)
        const response = await fetch(`${backendURL}/signup/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                first_name, last_name, city, college, contact, gender, referral_code, email, password, ambassador
            })
        });
        if (response.status === 201) {
            navigate("/login");
            return response;
        } else {
            throw("signup failed")
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        console.log("Logged out");
        navigate("/");
    };

    const contextData = {
        user,
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser
    };

    useEffect(() => {
        if (authTokens) {
            setUser(jwt_decode(authTokens.access));
        }
        setLoading(false);
    }, [authTokens, loading]);

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
