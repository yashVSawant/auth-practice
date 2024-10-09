import {createContext} from "react";

const AuthContext = createContext({
    token : "",
    isAuthenticated:false,
    addToken:()=>{},
    removeToken :()=>{}
})

export default AuthContext;