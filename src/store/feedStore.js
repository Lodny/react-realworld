import * as React from 'react';
import { rootReducer } from '../reducers/rootReducer';

export const FeedContext = React.createContext();

const getServerBase = () => {
  // return 'http://localhost:8080'; // Spring + MongoDB
  return 'http://localhost:5000'; // NodeJS + Express + MongoDB
};

const getTokenHeader = (user) => {
  return {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Headers': 'authorization',
      authorization: `Token ${user?.token}`
    }
  };
};

const initial = {
  isLogin: false,
  history: null,
  selected: 1,
  tag: null,
  currPage: 0,
  serverBase: getServerBase,
  tokenHeader: getTokenHeader
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

// const a = [
//   {
//     id: '605c95e0503c932698079162',
//     title: 'i love damhui, so much!!',
//     description: '111',
//     body: '111',
//     tagList: ['111', '222'],
//     createdAt: '2021-03-25T13:53:36.410+00:00',
//     updatedAt: '2021-03-25T13:53:36.410+00:00',
//     favorited: false,
//     favoritesCount: 0,
//     slug: 'i-love-damhui-so-much-751c5d',
//     user: { id: '605b319ec8b4026f83020137', username: '111', email: '111', password: '111', bio: null, image: null }
//   },
//   {
//     id: '605c95e0503c932698079163',
//     title: 'i love damhui, so much!!',
//     description: '111',
//     body: '111',
//     tagList: ['111', '222'],
//     createdAt: '2021-03-25T13:53:36.757+00:00',
//     updatedAt: '2021-03-25T13:53:36.757+00:00',
//     favorited: false,
//     favoritesCount: 0,
//     slug: 'i-love-damhui-so-much-44a0f2',
//     user: { id: '605b319ec8b4026f83020137', username: '111', email: '111', password: '111', bio: null, image: null }
//   },
//   {
//     id: '605c95e1503c932698079164',
//     title: 'i love damhui, so much!!',
//     description: '111',
//     body: '111',
//     tagList: ['111', '222'],
//     createdAt: '2021-03-25T13:53:37.198+00:00',
//     updatedAt: '2021-03-25T13:53:37.198+00:00',
//     favorited: false,
//     favoritesCount: 0,
//     slug: 'i-love-damhui-so-much-f6dbbf',
//     user: { id: '605b319ec8b4026f83020137', username: '111', email: '111', password: '111', bio: null, image: null }
//   },
//   {
//     id: '605c95e1503c932698079165',
//     title: 'i love damhui, so much!!',
//     description: '111',
//     body: '111',
//     tagList: ['111', '222'],
//     createdAt: '2021-03-25T13:53:37.551+00:00',
//     updatedAt: '2021-03-25T13:53:37.551+00:00',
//     favorited: false,
//     favoritesCount: 0,
//     slug: 'i-love-damhui-so-much-3d56d6',
//     user: { id: '605b319ec8b4026f83020137', username: '111', email: '111', password: '111', bio: null, image: null }
//   }
// ];
