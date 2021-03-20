import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import FeedStore from './store/feedStore';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

import Home from './views/Home.jsx';
import Login from './views/Login.jsx';
import Register from './views/Register';
import Settings from './views/Settings';
import Profile from './views/Profile';
import Article from './views/Article';
import Editor from './views/Editor';

function App() {
  return (
    <FeedStore>
      <div>
        <Router>
          <header>
            <Header />
          </header>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/settings' component={Settings} />
            <Route exact path='/editor' component={Editor} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route path='/@:username' component={Profile} />
            <Route path='/article/:slug' component={Article} />
            {/* <Route path='/@:username/:favorites' component={Profile} /> */}
          </Switch>
        </Router>

        <footer>
          <Footer />
        </footer>
      </div>
    </FeedStore>
  );
}

export default App;
