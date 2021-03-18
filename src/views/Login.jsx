import React, { useRef, useState } from 'react';
// import useFetch from '../hooks/useFetch';
// import { FeedContext } from '../store/feedStore';
// import * as actions from '../actions/userAction';

function Login() {
  // const { user, userDispatch } = useContext(FeedContext);
  const email = useRef();
  const pass = useRef();

  // const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);

  const login = async (e) => {
    e.preventDefault();

    console.log('Login() : login() : try : ', email.current.value, pass.current.value);
    // useFetch(resultLogin, 'https://conduit.productionready.io/api/users/login', {
    const response = await fetch('https://conduit.productionready.io/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        user: {
          email: email.current.value,
          password: pass.current.value,
        },
      }),
    });

    const result = await response.json();

    if (response.status == 200) {
      console.log('gooooooood');
      // userDispatch()
    } else {
      setError(true);
    }

    console.log(response);
    console.log(result);
  };

  return (
    <div>
      <div className='auth-page'>
        <div className='container page'>
          <div className='row'>
            <div className='col-md-6 offset-md-3 col-xs-12'>
              <h1 className='text-xs-center'>Sign in</h1>
              <p className='text-xs-center'>
                <a href=''>Need an account?</a>
              </p>

              {error ? (
                <ul className='error-messages'>
                  <li>email or password is invalid</li>
                </ul>
              ) : (
                ''
              )}

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
