import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FeedContext } from '../store/feedStore';

const Header = () => {
  const { user } = useContext(FeedContext);
  // console.log(loading, feeds.articlesCount);

  return (
    <div>
      <nav className='navbar navbar-light'>
        <div className='container'>
          <a className='navbar-brand' href='/#/'>
            conduit
          </a>
          <ul className='nav navbar-nav pull-xs-right'>
            <li className='nav-item'>
              <NavLink exact to='/#/' className='nav-link' activeClassName='nav-link active'>
                {/* activeStyle={activeStyle}> */}
                Home
              </NavLink>
            </li>

            {user.isLogin ? (
              <>
                <li className='nav-item'>
                  <a className='nav-link' href=''>
                    <i className='ion-compose'></i>&nbsp;New Post
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href=''>
                    <i className='ion-gear-a'></i>&nbsp;Settings
                  </a>
                </li>
              </>
            ) : (
              ''
            )}

            <li className='nav-item'>
              <NavLink exact to='/login' className='nav-link'>
                Sign in
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink exact to='/register' className='nav-link'>
                Sign up
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
