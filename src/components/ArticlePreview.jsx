import * as React from 'react';
import { FeedContext } from '../store/feedStore';
import axios from 'axios';
import * as actions from '../actions/feedAction.js';

const ArticlePreview = ({ article }) => {
  // console.log(article);
  const { store, dispatch } = React.useContext(FeedContext);

  const handleFollow = () => {
    console.log('ArticlePreview() : handleFollow() : store : ', store.isLogin);
    if (!store.isLogin) store.history?.push('/register');
    else {
      console.log('add favorite...');

      const processSuccess = (data) => {
        console.log('ArticlePreview() : handleFollow() : processSuccess() : ', data);
        dispatch({ type: actions.ADD_FAVORITE, payload: data.article });
      };

      const processError = (err) => {
        console.log('ArticlePreview() : handleFollow() : processError() : ', err);
        if (err?.status) {
          console.log('status', err.status, err.data);
        }
      };

      const url = `https://conduit.productionready.io/api/articles/${article.slug}/favorite`;

      axios
        .post(url, null, store.tokenHeader(store.user))
        .then((res) => processSuccess(res.data))
        .catch((err) => processError(err?.response || err?.request || err.message));
    }
  };

  const dateString = new Date(article.createdAt).toDateString();

  return (
    <div className='article-preview'>
      {article ? (
        <>
          <div className='article-meta'>
            <a href={`#/@${article.author.username}`}>
              <img src={article.author.image} alt={article.title} />
            </a>
            <div className='info'>
              <a href={`#/@${article.author.username}`} className='author'>
                {article.author.username}
              </a>
              <span className='date'>{dateString}</span>
            </div>
            <button
              onClick={handleFollow}
              className={'btn btn-sm pull-xs-right ' + (article.favorited ? 'btn-primary' : 'btn-outline-primary')}
            >
              <i className='ion-heart'></i> {article.favoritesCount}
            </button>
            {/*  ??????????????????  ng-class="{ 'disabled': $ctrl.isSubmitting, */}
          </div>
          <a href={`#/article/${article.slug}`} className='preview-link'>
            <h1>{article.title}</h1>
            <p>{article.description}</p>
            <span>Read more...</span>
            <ul className='tag-list'>
              {article.tagList.map((tag) => (
                <li className='tag-default tag-pill tag-outline ng-binding ng-scope' key={tag}>
                  {tag}
                </li>
              ))}
            </ul>
          </a>
        </>
      ) : (
        'loading...'
      )}
    </div>
  );
};

export default ArticlePreview;
