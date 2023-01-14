import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";

import { useNavigate } from "react-router-dom";

import { backendURL } from "../backendURL";
// import { useAxios } from  "./context_useAxios"

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
        // console.log("Normal user login data: ", data)

        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem("authTokens", JSON.stringify(data));
            // console.log("Logged in");
            navigate("/dashboard");
            return response;
        } else {
            throw(response.statusText)
        }
    };

    const loginGoogleUser = async (email, given_name) => {
        const response = await fetch(`${backendURL}/google/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                given_name
            })
        });
        const data = await response.json();
        // console.log("Google Login response data: ", data)

        if (response.status === 200) {
            const newData = {
                "access": data.access_token,
                "refresh": data.refresh_token
            }
            setAuthTokens(newData);
            setUser(jwt_decode(newData.access));
            localStorage.setItem("authTokens", JSON.stringify(newData));
            // console.log("Logged in");
            navigate("/dashboard");
            return response;
        } else {
            throw(response)
        }
    }

    const registerUser = async (first_name, last_name, city, college, contact, gender, referral_code, email, password, ambassador,  accomodation) => {
        // console.log("ambassador: ", ambassador)
        const requestData = { first_name, last_name, city, college, contact, gender, referral_code, email, password, ambassador,  accomodation }

        const response = await fetch(`${backendURL}/signup/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });
        if (response.status === 201) {
            navigate("/login");
            return response;
        } else {
            throw(response.statusText)
        }
    };

    // const completeProfileGoogleUser = async (city, college, contact, gender, referral_code, email, ambassador, accomodation) => {
    //     // const api = useAxios();
    //     const requestData = { city, college, contact, gender, referral_code, email, ambassador, accomodation }

    //     try {
    //         const response = await api.post(
    //             `${backendURL}/google/completeprofile/`,
    //             requestData
    //         );
    //         if (response.status === 201) {
    //             navigate("/dashboard");
    //             return response;
    //         } else {
    //             throw(response.statusText)
    //         }
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        // console.log("Logged out");
        navigate("/login");
        toast.success("Logged out successfully!");
    };

    const contextData = {
        user,
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        // completeProfileGoogleUser,
        loginUser,
        loginGoogleUser,
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
