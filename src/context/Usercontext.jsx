import { createContext, useContext, useState } from "react";

const UserContext = createContext()

export const useUserContext = ()=> {
    return useContext(UserContext)
}


export const UserContextProvider = ({children})=>{
    const [user, setUser] = useState(null)

    return (
        <UserContext.Provider value={{setUser, user}}>
            {children}
        </UserContext.Provider>
    )
}