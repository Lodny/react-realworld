import * as actions from '../actions/feedAction';

export const feedReducer = (feed, { type, payload }) => {
  console.log('feedReducer() : ', type);

  switch (type) {
    case actions.SET_GLOBAL_ARTICLES:
      return { ...feed, showArticles: type, global: payload };

    case actions.SET_TAG_ARTICLES:
      return { ...feed, showArticles: type, tag: payload };

    case actions.SET_YOUR_ARTICLES:
      return { ...feed, showArticles: type, your: payload };

    case actions.REMOVE_ALL_ARTICLES:
      return { ...feed, showArticles: '', global: null, tag: null, your: null };

    default:
      break;
  }
};
