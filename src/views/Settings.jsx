import * as React from 'react';
import { FeedContext } from '../store/feedStore';
import * as actions from '../actions/feedAction';
import axios from 'axios';
import Errors from '../components/Errors';

const Settings = ({ history }) => {
  const { store, dispatch } = React.useContext(FeedContext);
  // console.log('Settings() : store.user : ', store.user);

  const [user, setUser] = React.useState(Object.assign({}, store.user));
  const [error, setError] = React.useState(null);

  const handleInput = (input) => (e) => {
    // console.log('Settings() : handleInput() : ', input, e.target.value);
    setUser(Object.assign({}, user, { [input]: e.target.value }));
  };

  const updateSettings = () => {
    // e.preventDefault();

    // console.log('Settings() : updateSettings() : <><><>');

    const processSuccess = (data) => {
      console.log('Settings() : updateSettings() : processSuccess() : ', data);
      dispatch({ type: actions.LOGIN, payload: data.user });
      return history.push(`/@${data.user.username}`);
    };

    const processError = (err) => {
      console.log('Settings() : updateSettings() : processError() : ', err);
      if (err?.status) {
        console.log('status', err.status, err.data.errors);
        setError(err.data.errors);
      }
    };

    const body = {
      user: {
        ...user,
      },
    };
    axios
      .put(`${store.serverBase()}/api/user`, body, store.tokenHeader(store.user))
      .then((res) => processSuccess(res.data))
      .catch((err) => processError(err?.response || err?.request || err.message));
  };

  const logout = () => {
    console.log('Settings() : logout()');
    dispatch({ type: actions.LOGOUT, payload: null });
    return history.push('/');
  };

  return (
    <div className='settings-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 col-xs-12'>
            <h1 className='text-xs-center'>Your Settings</h1>

            <Errors errors={error} />

            <form>
              <fieldset>
                <fieldset className='form-group'>
                  <input
                    className='form-control'
                    type='text'
                    placeholder='URL of profile picture'
                    value={user.image}
                    onChange={handleInput('image')}
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    type='text'
                    placeholder='Your Name'
                    value={user.username}
                    onChange={handleInput('username')}
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <textarea
                    className='form-control form-control-lg'
                    rows='8'
                    placeholder='Short bio about you'
                    value={user.bio}
                    onChange={handleInput('bio')}
                  ></textarea>
                </fieldset>
                <fieldset className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    type='text'
                    placeholder='Email'
                    value={user.email}
                    onChange={handleInput('email')}
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    type='password'
                    placeholder='Password'
                    onChange={handleInput('password')}
                  />
                </fieldset>
                <button className='btn btn-lg btn-primary pull-xs-right' type='button' onClick={updateSettings}>
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
