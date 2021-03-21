import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FeedContext } from '../store/feedStore';

const Header = () => {
  const { store } = useContext(FeedContext);
  console.log('Header() : store : ', store);

  return (
    <div>
      <nav className='navbar navbar-light'>
        <div className='container'>
          <NavLink to='/' className='navbar-brand'>
            conduit
          </NavLink>
          <ul className='nav navbar-nav pull-xs-right'>
            <li className='nav-item'>
              <NavLink to='/' className='nav-link'>
                Home
              </NavLink>
            </li>

            {store.isLogin ? (
              <>
                <li className='nav-item'>
                  <NavLink to='/editor' className='nav-link'>
                    <i className='ion-compose'></i>&nbsp;New Post
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink to='/settings' className='nav-link'>
                    <i className='ion-gear-a'></i>&nbsp;Settings
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink to={`/@${store.user.username}`} className='nav-link'>
                    {store.user.username}
                  </NavLink>
                </li>
              </>
            ) : (
              ''
            )}

            {!store.isLogin ? (
              <>
                <li className='nav-item'>
                  <NavLink to='/login' className='nav-link'>
                    Sign in
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink to='/register' className='nav-link'>
                    Sign up
                  </NavLink>
                </li>
              </>
            ) : (
              ''
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
