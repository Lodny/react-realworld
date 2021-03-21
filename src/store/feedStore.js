import * as React from 'react';
import { rootReducer } from '../reducers/rootReducer';

export const FeedContext = React.createContext();

const initial = {
  isLogin: false,
  history: null,
  selected: 1,
  tag: null,
  currPage: 0
};

const FeedStore = (props) => {
  const [store, dispatch] = React.useReducer(rootReducer, initial);

  return <FeedContext.Provider value={{ store, dispatch }}>{props.children}</FeedContext.Provider>;

  // const [user, userDispatch] = useReducer(userReducer, { isLogin: false, history: null });
  // const [feed, feedDispatch] = useReducer(feedReducer, { selected: 1, tag: null, currPage: 0 });

  // useEffect(() => {
  //   console.log('FeedStore() : upadated feed');
  // }, [feed]);

  // useEffect(() => {
  //   console.log('FeedStore() : upadated user');
  // }, [user]);

  // return (
  //   <FeedContext.Provider value={{ feed, user, userDispatch, feedDispatch }}>{props.children}</FeedContext.Provider>
  // );
};

export default FeedStore;
