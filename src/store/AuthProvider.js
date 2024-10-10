import React ,{useState} from "react";

import AuthContext from "./auth-context";

const AuthProvider = (props)=>{
    const [token ,setToken] = useState("");
    const [isAuthenticated ,setIsAuthenticated] = useState(false);
    const addTokenHandler = (tokenValue)=>{
        setToken("Bearer "+tokenValue);
        setIsAuthenticated(true)
    }


    const removeTokenHandler = ()=>{
        setToken("");
        setIsAuthenticated(false)
    }

    const authContext = {
        token:token,
        isAuthenticated:isAuthenticated,
        addToken:addTokenHandler,
        removeToken:removeTokenHandler
    }

    return (
        <AuthContext.Provider value={authContext}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;