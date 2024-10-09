import React ,{useContext} from 'react';
import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import AuthContext from '../../store/auth-context';

const MainNavigation = () => {
  const authContext = useContext(AuthContext);

  const logoutClickHandler = ()=>{
    authContext.removeToken();
  }
  
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!authContext.isAuthenticated && <li>
            <Link to='/auth'>Login</Link>
          </li>}
          {authContext.isAuthenticated &&<li>
            <Link to='/profile'>Profile</Link>
          </li>}
          {authContext.isAuthenticated &&<li>
            <button onClick={logoutClickHandler}>Logout</button>
          </li>}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
