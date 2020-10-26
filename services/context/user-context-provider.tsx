import React, { useState, createContext, useEffect } from "react";

export const UserContext = createContext<any>({});

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        console.log('USER CHANGED', user);
    }, [user])

    const storeUser = currentUser => {
        console.log('STORE USER', user)
        setUser(currentUser)
    }

    return (
       <UserContext.Provider value={{ user, storeUser }}>
           { children }
       </UserContext.Provider>
    )
}