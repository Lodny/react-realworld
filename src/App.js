import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import FeedStore from './store/feedStore';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

import Home from './views/Home.jsx';
import Login from './views/Login.jsx';
import Register from './views/Register';

function App() {
  return (
    <FeedStore>
      <div>
        <Router>
          <header>
            <Header />
          </header>

          <Route exact path='/' component={() => <Home />} />
          <Route path='/login' component={() => <Login />} />
          <Route path='/register' component={() => <Register />} />
        </Router>

        <footer>
          <Footer />
        </footer>
      </div>
    </FeedStore>
  );
}

export default App;
