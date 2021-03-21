import * as actions from '../actions/feedAction';

export const feedReducer = (feed, { type, payload }) => {
  console.log('feedReducer() : ', type);

  switch (type) {
    // article
    case actions.SET_ARTICLES:
      return { ...feed, articles: payload };

    case actions.CHANGE_ARTICLES:
      return { ...feed, articles: null, tag: null, currPage: 0, selected: payload };

    case actions.SET_ARTICLES_TAG:
      return { ...feed, articles: null, selected: 2, currPage: 0, tag: payload };

    case actions.SET_CURR_PAGE:
      return { ...feed, articles: null, currPage: payload };

    case actions.REMOVE_ARTICLES:
      return { ...feed, viewArticle: '', articles: null, tag: null, currPage: 0, selected: payload };

    // user

    default:
      break;
  }
};
