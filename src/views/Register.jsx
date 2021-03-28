import * as React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { FeedContext } from '../store/feedStore';
import * as actions from '../actions/feedAction';

function Register({ history }) {
  const username = React.useRef();
  const email = React.useRef();
  const pass = React.useRef();

  const { store, dispatch } = React.useContext(FeedContext);
  const [error, setError] = React.useState(null);

  const register = (e) => {
    e.preventDefault();
    console.log('Register() : register() : try : ', username.current.value, email.current.value, pass.current.value);

    const processSuccess = (data) => {
      console.log('Register() : register() : processSuccess() : ', data);
      dispatch({ type: actions.LOGIN, payload: data.user });
      history.push('/');
    };

    const processError = (err) => {
      console.log('Register() : register() : processError() : ', err);
      if (err?.status) {
        console.log('status & errors', err.status, err.data);
        setError(err.data.errors);
      }
    };

    // home : feed : Request URL: https://conduit.productionready.io/api/articles/feed?limit=10&offset=0
    // global feed : Request URL: https://conduit.productionready.io/api/articles?limit=10&offset=0
    // Request URL: https://conduit.productionready.io/api/tags
    // Request URL: https://conduit.productionready.io/api/articles/feed?limit=10&offset=0
    // const url = 'https://conduit.productionready.io/api/users';
    const url = `${store.serverBase()}/api/users`;
    console.log('Register() : register() : url : ', url);
    const body = {
      user: {
        username: username.current.value,
        email: email.current.value,
        password: pass.current.value
      }
    };
    axios
      .post(url, body)
      .then((res) => processSuccess(res.data))
      .catch((err) => processError(err?.response || err?.request || err.message));
  };

  const errMsg = [];
  if (error) {
    console.log('>>> : ', error);
    Object.keys(error).forEach((key) => error[key].forEach((msg) => errMsg.push(key + ': ' + msg)));
  }

  return (
    <div>
      <div className='auth-page'>
        <div className='container page'>
          <div className='row'>
            <div className='col-md-6 offset-md-3 col-xs-12'>
              <h1 className='text-xs-center'>Sign up</h1>
              <p className='text-xs-center'>
                <NavLink to='/login'>Have an account?</NavLink>
              </p>

              <ul className='error-messages'>{error ? errMsg.map((msg) => <li key={msg}>{msg}</li>) : ''}</ul>

              <form onSubmit={register}>
                <fieldset className='form-group'>
                  <input ref={username} className='form-control form-control-lg' type='text' placeholder='Your Name' />
                </fieldset>
                <fieldset className='form-group'>
                  <input ref={email} className='form-control form-control-lg' type='text' placeholder='Email' />
                  {/* <input ref={email} className='form-control form-control-lg' type='email' placeholder='Email' /> */}
                </fieldset>
                <fieldset className='form-group'>
                  <input ref={pass} className='form-control form-control-lg' type='password' placeholder='Password' />
                </fieldset>
                <button type='submit' className='btn btn-lg btn-primary pull-xs-right'>
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
