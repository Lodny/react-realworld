import * as React from 'react';
import { FeedContext } from '../store/feedStore';
import * as actions from '../actions/feedAction';
import axios from 'axios';

const Settings = ({ history }) => {
  const { store, dispatch } = React.useContext(FeedContext);
  console.log('Settings() : store.user : ', store.user);

  const image = React.useRef();
  const username = React.useRef(store.user.username);
  const bio = React.useRef();
  const email = React.useRef();
  const password = React.useRef();

  // image.current.value = store.user.image || '';
  // username.current.value = store.user.username;
  // bio.current.value = store.user.bio || '';
  // email.current.value = store.user.email;

  const update = () => {
    console.log('Settings() : update() : ');

    const processSuccess = (data) => {
      console.log('Settings() : update() : processSuccess() : ', data);
      // dispatch({ type: actions.SET_ARTICLES, payload: data });
      // dispatch({ type: actions.SETTINGS, payload: user})
    };

    const processError = (err) => {
      console.log('Settings() : update() : processError() : ', err);
      if (err?.status) {
        console.log('status', err.status, err.data.errors);
      } else {
        console.log('err', err);
      }
    };

    const url = 'http://localhost:5000/api/user';
    console.log('Settings() : update() : url : ', url);
    const option = {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Headers': 'authorization',
        authorization: `Token ${store.user.token}`,
      },
    };
    const body = {
      user: {
        image: image.current.value,
        username: username.current.value,
        bio: bio.current.value,
        email: email.current.value,
        password: password.current.value,
      },
    };
    axios
      .put(url, body, option)
      .then((res) => processSuccess(res.data))
      .catch((err) => processError(err?.response || err?.request || err.message));
  };

  const logout = () => {
    console.log('Settings() : logout()');
    dispatch({ type: actions.LOGOUT, payload: null });
    history.push('/');
  };

  return (
    <div className='settings-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 col-xs-12'>
            <h1 className='text-xs-center'>Your Settings</h1>

            <form>
              <fieldset>
                <fieldset className='form-group'>
                  <input ref={image} className='form-control' type='text' placeholder='URL of profile picture' />
                </fieldset>
                <fieldset className='form-group'>
                  <input ref={username} className='form-control form-control-lg' type='text' placeholder='Your Name' />
                </fieldset>
                <fieldset className='form-group'>
                  <textarea
                    ref={bio}
                    className='form-control form-control-lg'
                    rows='8'
                    placeholder='Short bio about you'
                  ></textarea>
                </fieldset>
                <fieldset className='form-group'>
                  <input ref={email} className='form-control form-control-lg' type='text' placeholder='Email' />
                </fieldset>
                <fieldset className='form-group'>
                  <input
                    ref={password}
                    className='form-control form-control-lg'
                    type='password'
                    placeholder='Password'
                  />
                </fieldset>
                <button className='btn btn-lg btn-primary pull-xs-right' onClick={update}>
                  Update Settings
                </button>
              </fieldset>
            </form>
            <hr />
            <button className='btn btn-outline-danger' onClick={logout}>
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
