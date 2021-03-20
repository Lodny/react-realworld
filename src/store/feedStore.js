import React, { useEffect, useReducer } from 'react';
import { feedReducer } from '../reducers/feedReducer';
import { userReducer } from '../reducers/userReducer';

export const FeedContext = React.createContext();

const FeedStore = (props) => {
  // console.log(props);

  const [user, userDispatch] = useReducer(userReducer, { isLogin: false, history: null });
  const [feed, feedDispatch] = useReducer(feedReducer, { selected: 1, tag: null, currPage: 0 });

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
