import * as actions from '../actions/feedAction';

export const rootReducer = (store, { type, payload }) => {
  console.log('rootReducer() : ', type, payload);

  switch (type) {
    // article
    case actions.SET_ARTICLES:
      return { ...store, articles: payload };

    case actions.CHANGE_ARTICLES:
      return { ...store, articles: null, tag: null, currPage: 0, selected: payload };

    case actions.SET_ARTICLES_TAG:
      return { ...store, articles: null, selected: 2, currPage: 0, tag: payload };

    case actions.SET_CURR_PAGE:
      return { ...store, articles: null, currPage: payload };

    case actions.REMOVE_ARTICLES:
      return { ...store, viewArticle: '', articles: null, tag: null, currPage: 0, selected: payload };

    case actions.ADD_FAVORITE:
      console.log('rootReducer() : payload.slug : ', payload.slug, payload.favoritesCount);
      console.log('rootReducer() : store.articles : ', store.articles);
      return {
        ...store,
        articles: store.articles.map((article) => {
          if (article.slug === payload.slug) {
            return {
              ...article,
              favorited: payload.favorited,
              favoritesCount: payload.favoritesCount
            };
          }
          return article;
        })
      };

    // user
    case actions.LOGIN:
      return { ...store, isLogin: true, selected: 0, user: payload };

    case actions.LOGOUT:
      return { ...store, isLogin: false, selected: 1, user: null };

    case actions.SET_HISTORY:
      return { ...store, history: payload };

    default:
      break;
  }
};
