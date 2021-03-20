import React, { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const username = useRef();
  const email = useRef();
  const pass = useRef();

  const [errors, setErrors] = useState(null);

  const register = (e) => {
    e.preventDefault();
    console.log('Register() : register() : try : ', username.current.value, email.current.value, pass.current.value);

    const processSuccess = (data) => {
      console.log('Register() : register() : processSuccess() : ', data);
      // feedDispatch({ type: actions.SET_ARTICLES, payload: data });
    };

    const processError = (err) => {
      console.log('Register() : register() : processError() : ', err);
      if (err?.status) {
        console.log('status', err.status, err.data.errors);
        setErrors(err.data.errors);
      } else {
        console.log('err', err);
      }
    };

    const url = 'https://conduit.productionready.io/api/users';
    console.log('Register() : register() : url : ', url);
    const option = {
      user: {
        email: email.current.value,
        password: pass.current.value,
        username: username.current.value
      }
    };
    axios
      .post(url, option)
      .then((res) => processSuccess(res.data))
      .catch((err) => processError(err?.response || err?.request || err.message));
  };

  // home : feed : Request URL: https://conduit.productionready.io/api/articles/feed?limit=10&offset=0
  // global feed : Request URL: https://conduit.productionready.io/api/articles?limit=10&offset=0

  // registered
  // {"user":{"id":151274,"email":"drinkjuice3@naver.com","createdAt":"2021-03-20T08:29:12.641Z","updatedAt":"2021-03-20T08:29:12.649Z","username":"drinkjuice3","bio":null,"image":null,"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTUxMjc0LCJ1c2VybmFtZSI6ImRyaW5ranVpY2UzIiwiZXhwIjoxNjIxNDEyOTUyfQ.lRnX3vjfAawlwdat6dlrLVe5CEOUsBPONuyNs8-cNMc"}}

  // request.header.authorization : token
  // request.authority: conduit.productionready.io

  // Request URL: https://conduit.productionready.io/api/tags
  // Request URL: https://conduit.productionready.io/api/articles/feed?limit=10&offset=0

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

              <ul className='error-messages'>
                {errors ? Object.entries(errors).map((err) => <li key={err[0]}>{err[0] + ' ' + err[1]}</li>) : ''}
              </ul>

              <form onSubmit={register}>
                <fieldset className='form-group'>
                  <input ref={username} className='form-control form-control-lg' type='text' placeholder='Your Name' />
                </fieldset>
                <fieldset className='form-group'>
                  <input ref={email} className='form-control form-control-lg' type='text' placeholder='Email' />
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
