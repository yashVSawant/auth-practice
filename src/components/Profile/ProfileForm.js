import React ,{useState ,useContext} from 'react';
import classes from './ProfileForm.module.css';
import api from '../../services/api';
import AuthContext from '../../store/auth-context';
import { useNavigate } from 'react-router-dom';

const ProfileForm = () => {
  const navigate = useNavigate();
  const AuthCtx = useContext(AuthContext);
  const [password ,setPassword] = useState("");

  const onChangeHandler = (event)=>{
    const value = event.target.value;
    setPassword(value);
  }

  const onChangePasswordClickHandler = async(event)=>{
    event.preventDefault();
    try {
      const response =  await api.put("/api/auth/password/reset",{password : password},{headers:{"Authorization":AuthCtx.token}})
      const token = response.data.token;
      AuthCtx.addToken(token);
      setPassword("");
      navigate("/");
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' value={password} onChange={onChangeHandler} id='new-password' />
      </div>
      <div className={classes.action}>
        <button onClick={onChangePasswordClickHandler}>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
