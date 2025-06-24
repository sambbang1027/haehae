import React, { createContext, useContext, useState } from 'react';

type User = {
    userId : number,
    email : string,
    nickname : string,
    role : string,
    profileImage: string
};

const UserContext = createContext<{
    user: User | null;
    setUser : (user : User | null) => void;
}>({
    user: null,
    setUser: () => {},
});

export const UserProvider = ({children} : {children : React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);
