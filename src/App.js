import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./views/Home.jsx";
import Login from "./views/Login.jsx";
import useFetch from "./useFetch";
// import store from "./store";
// import { Provider } from "react-redux";

export const RootContext = React.createContext();

function App() {
  const [globalFeeds, setGlobalFeeds] = useState([]);

  const loading = useFetch(setGlobalFeeds, "https://conduit.productionready.io/api/articles?limit=10&offset=0");

  useEffect(() => {
    console.log("App : ", globalFeeds.articlesCount);
  }, [globalFeeds]);

  return (
    <RootContext.Provider value={{ globalFeeds, loading }}>
      <div className="App">
        <Router>
          <header className="App-header">
            <Header />
          </header>

          <Route exact path="/" component={props => <Home />} />
          <Route path="/login" component={props => <Login />} />
        </Router>

        <footer>
          <Footer />
        </footer>
      </div>
    </RootContext.Provider>
  );
}

export default App;
