import { useState ,useContext } from 'react';

import {useNavigate} from "react-router-dom"

import classes from './AuthForm.module.css';

import api from '../../services/api';
import AuthContext from '../../store/auth-context';

const AuthForm = () => {
  const navigate = useNavigate()
  const authContext = useContext(AuthContext);
  const userObj = {email:"", name:"yash" ,password:""}
  const [isLogin, setIsLogin] = useState(true);
  const [loading ,setLoading] = useState(false);
  const [user , setUser] = useState(userObj);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const authHandler = async()=>{
    setLoading(true);
    try {

      if(isLogin){
        const userResponse = await api.post("api/auth/login",{...user});
        console.log(userResponse)
        const token = userResponse.data.token
        authContext.addToken(token);
        navigate("/")
      }
      else {
        await api.post("/api/auth/register",{...user});
        alert("account created successfully!")
      }
      setLoading(false);
      
    } catch (err) {
      setLoading(false);
      console.log(err)
      const errorMessage = err.response.data.message
      alert(errorMessage)
    }
      
  }

  const changeHandler = (event)=>{
    const {name , value} = event.target;
    setUser({...user ,[name]:value });
  }

  let btnPlace = <div className={classes.actions}>
  <button
    type='button'
    onClick={authHandler}
  >
    {isLogin ? 'Login' : 'Create Account'}
  </button>
</div>;
  if(loading)btnPlace = <p style={{color:"white"}}>Sending Request...</p>;

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form >
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' name="email" value={user.email} onChange={changeHandler} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            name="password"
            value={user.password}
            onChange={changeHandler}
            required
          />
        </div>
        {btnPlace}
        <div className={classes.actions}>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
