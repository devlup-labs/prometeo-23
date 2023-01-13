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
        const response = await axios.post(`${backendURL}/auth/token/refresh/`, {
            refresh: authTokens.refresh
        });

        console.log("Refresh response: ", response)

        if (response.data.code === "token_not_valid") {
            toast.info("Your session has expired. Please login again.")
            logoutUser();
            return req;
        }

        localStorage.setItem("authTokens", JSON.stringify(response.data));

        setAuthTokens(response.data);
        setUser(jwt_decode(response.data.access));

        req.headers.Authorization = `Bearer ${response.data.access}`;
        return req;
    });

    return axiosInstance;
};

export default useAxios;
