import React, { useRef } from 'react';

function Register() {
  const username = useRef();
  const email = useRef();
  const pass = useRef();

  const register = async (e) => {
    e.preventDefault();

    console.log('Register() : register() : try : ', username.current.value, email.current.value, pass.current.value);
    //Request URL: https://conduit.productionready.io/api/users
    //{"errors":{"email":["has already been taken"],"username":["has already been taken"]}}

    // useFetch(resultLogin, 'https://conduit.productionready.io/api/users/login', {
    // const response = await fetch('https://conduit.productionready.io/api/users/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json;charset=utf-8',
    //   },
    //   body: JSON.stringify({
    //     user: {
    //       email: email.current.value,
    //       password: pass.current.value,
    //     },
    //   }),
    // });

    // const result = await response.json();

    // if (response.status === 200) {
    //   console.log('gooooooood');
    //   // userDispatch()
    // } else {
    //   setError(true);
    // }

    // console.log(response);
    // console.log(result);
  };

  return (
    <div>
      <div className='auth-page'>
        <div className='container page'>
          <div className='row'>
            <div className='col-md-6 offset-md-3 col-xs-12'>
              <h1 className='text-xs-center'>Sign up</h1>
              <p className='text-xs-center'>
                <a href='/#/login'>Have an account?</a>
              </p>

              <ul className='error-messages'>
                <li>That email is already taken</li>
                <li>username has already been taken</li>
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
