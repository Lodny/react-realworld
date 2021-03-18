import React, { useEffect, useReducer } from 'react';
// import useFetch from '../hooks/useFetch';
import { feedReducer } from '../reducers/feedReducer';
import { userReducer } from '../reducers/userReducer';
// import * as actions from '../actions/feedAction';

export const FeedContext = React.createContext();

const FeedStore = (props) => {
  const [user, userDispatch] = useReducer(userReducer, { isLogin: false });
  const [feed, feedDispatch] = useReducer(feedReducer, { showArticles: '' });

  // const setGlobalFeeds = (data) => {
  //   feedDispatch({ type: actions.SET_FEEDS, payload: data });
  // };

  // const loading = useFetch(setGlobalFeeds, 'https://conduit.productionready.io/api/articles?limit=10&offset=0');

  useEffect(() => {
    console.log('FeedStore() : upadated feed');
  }, [feed]);

  useEffect(() => {
    console.log('FeedStore() : upadated user');
  }, [user]);

  return (
    <FeedContext.Provider value={{ feed, user, userDispatch, feedDispatch }}>{props.children}</FeedContext.Provider>
  );
};

export default FeedStore;
