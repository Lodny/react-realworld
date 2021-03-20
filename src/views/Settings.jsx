import * as React from 'react';
import { FeedContext } from '../store/feedStore';
import * as actions from '../actions/feedAction';

const Settings = ({ history }) => {
  const { userDispatch } = React.useContext(FeedContext);

  const logout = () => {
    console.log('Settings() : logout()');
    userDispatch({ type: actions.LOGOUT, payload: null });
    // userDispatch({ type: actions.CHANGE_ARTICLES, payload: 1 });
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
                  <input className='form-control' type='text' placeholder='URL of profile picture' />
                </fieldset>
                <fieldset className='form-group'>
                  <input className='form-control form-control-lg' type='text' placeholder='Your Name' />
                </fieldset>
                <fieldset className='form-group'>
                  <textarea
                    className='form-control form-control-lg'
                    rows='8'
                    placeholder='Short bio about you'
                  ></textarea>
                </fieldset>
                <fieldset className='form-group'>
                  <input className='form-control form-control-lg' type='text' placeholder='Email' />
                </fieldset>
                <fieldset className='form-group'>
                  <input className='form-control form-control-lg' type='password' placeholder='Password' />
                </fieldset>
                <button className='btn btn-lg btn-primary pull-xs-right'>Update Settings</button>
              </fieldset>
            </form>
            <hr />
            <button class='btn btn-outline-danger' onClick={logout}>
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
