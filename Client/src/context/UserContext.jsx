import axios from "axios";
import React, { useEffect } from "react";
import { createContext, useState, useContext } from "react";
export const UserContext = createContext();

const UserProvider = ({ children }) => {

    const [userId, setUserId] = useState()
    const [userName, setUserName] = useState();
    const [role, setRole] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    useEffect(() => {
        if (localStorage.token) {
            fetchUserData();
        }
    }, []);


    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                const response = await axios.get("http://localhost:8181/auth/auth", {
                    headers: {
                        Authorization: token,
                    },
                });
                setUserId(response.data.user_id);
                setUserName(response.data.user_name); // Property name should match 'user_name'
                setRole(response.data.role); // Property name should match 'role'
                setPhone(response.data.phone_number); // Property name should match 'phone_number'
                setEmail(response.data.user_email); // Property name should match 'user_email'
            }
        } catch (error) {
            return error;
        } finally {
            return false
        }
    };


    useEffect(() => {
        if (localStorage.token != null) {
            fetchUserData()
        }
    }, [])

    useEffect(() => {
    }, [userName]);

    console.log(role)
    return (
        <>
            <UserContext.Provider
                value={{
                    userId,
                    userName,
                    setUserName,
                    role,
                    setRole,
                    phone,
                    email,

                }}
            >
                {children}
            </UserContext.Provider>
        </>
    )
};
export default UserProvider;