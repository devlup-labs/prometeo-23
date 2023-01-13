import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

import { backendURL } from "../backendURL";
import { toast } from "react-toastify";

const useAxios = () => {
    const { authTokens, setUser, setAuthTokens, logoutUser } = useContext(AuthContext);

    const axiosInstance = axios.create({
        backendURL,
        headers: { Authorization: `Bearer ${authTokens?.access}` }
    });

    axiosInstance.interceptors.request.use(async req => {
        const user = jwt_decode(authTokens.access);
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        if (!isExpired) return req;

        // console.log("Refreshing token")
        try {
            const response = await axios.post(`${backendURL}/auth/token/refresh/`, {
                refresh: authTokens.refresh
            });

            localStorage.setItem("authTokens", JSON.stringify(response.data));

            setAuthTokens(response.data);
            setUser(jwt_decode(response.data.access));

            req.headers.Authorization = `Bearer ${response.data.access}`;
        } catch (error) {
            console.log("Error refreshing token: ", error)
            if (error.response.status === 401) {
                toast.error("Session expired. Please login again.");
                logoutUser();
            }
        }
        return req;
    });

    return axiosInstance;
};

export default useAxios;
