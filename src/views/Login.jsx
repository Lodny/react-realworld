import React, { useRef, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import { FeedContext } from '../store/feedStore';
import * as actions from '../actions/feedAction';
import Errors from '../components/Errors';

function Login({ history, location }) {
  console.log('Login() : location : ', location);
  const email = useRef();
  const pass = useRef();

  const { store, dispatch } = useContext(FeedContext);
  const [error, setError] = useState(null);

  const login = (e) => {
    e.preventDefault();

    console.log('Login() : login() : try : ', email.current.value, pass.current.value);

    const processSuccess = (data) => {
      console.log('Login() : login() : processSuccess() : ', data);
      dispatch({ type: actions.LOGIN, payload: data.user });
      return history.push('/');
    };

    const processError = (err) => {
      console.log('Login() : login() : processError() : ', err);
      if (err?.status) {
        console.log('status', err.status, err.data);
        setError(err.data.errors);
      }
    };

    // const url = 'https://conduit.productionready.io/api/users/login';
    const url = `${store.serverBase()}/api/users/login`;
    console.log('Login() : login() : url : ', url);
    const body = {
      user: {
        email: email.current.value,
        password: pass.current.value,
      },
    };

    axios
      .post(url, body) //, store.tokenHeader(store.user))
      .then((res) => processSuccess(res.data))
      .catch((err) => processError(err?.response || err?.request || err.message));
  };

  return (
    <div>
      <div className='auth-page'>
        <div className='container page'>
          <div className='row'>
            <div className='col-md-6 offset-md-3 col-xs-12'>
              <h1 className='text-xs-center'>Sign in</h1>
              <p className='text-xs-center'>
                <NavLink to='/register'>Need an account?</NavLink>
              </p>

              <Errors errors={error} />

              <form onSubmit={login}>
                <fieldset className='form-group'>
                  <input ref={email} className='form-control form-control-lg' type='text' placeholder='Email' />
                </fieldset>
                <fieldset className='form-group'>
                  <input ref={pass} className='form-control form-control-lg' type='password' placeholder='Password' />
                </fieldset>
                <button type='submit' className='btn btn-lg btn-primary pull-xs-right'>
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
