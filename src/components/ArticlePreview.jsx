import * as React from 'react';
import { FeedContext } from '../store/feedStore';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

// const ArticlePreview = ({ match, article }) => {
const ArticlePreview = (props) => {
  console.log('ArticlePreview() : props : ', props);

  const { store } = React.useContext(FeedContext);
  const [article, setArticle] = React.useState(props.article);

  const handleFavorite = () => {
    // console.log('ArticlePreview() : handleFavorite() : store.user : ', store.user);
    if (!store.user) return store.history?.push('/register');

    console.log('add favorite...');

    const processSuccess = (data) => {
      console.log('ArticlePreview() : handleFavorite() : processSuccess() : ', data);
      // dispatch({ type: actions.ADD_FAVORITE, payload: data.article });
      setArticle(data.article);
    };

    const processError = (err) => {
      console.log('ArticlePreview() : handleFavorite() : processError() : ', err);
      if (err?.status) {
        console.log('status', err.status, err.data);
      }
    };

    const url = `${store.serverBase()}/api/articles/${article.slug}/favorite`;
    axios
      .post(url, null, store.tokenHeader(store.user))
      .then((res) => processSuccess(res.data))
      .catch((err) => processError(err?.response || err?.request || err.message));
  };

  return (
    <div className='article-preview'>
      {article ? (
        <>
          <div className='article-meta'>
            <NavLink to={`/@${article.author.username}`}>
              <img src={article.author.image} alt={article.title} />
            </NavLink>
            <div className='info'>
              <NavLink to={`/@${article.author.username}`} className='author'>
                {article.author.username}
              </NavLink>
              <span className='date'>{new Date(article.createdAt).toDateString()}</span>
            </div>
            <button
              onClick={handleFavorite}
              className={'btn btn-sm pull-xs-right ' + (article.favorited ? 'btn-primary' : 'btn-outline-primary')}
            >
              <i className='ion-heart'></i> {article.favoritesCount}
            </button>
            {/*  ??????????????????  ng-class="{ 'disabled': $ctrl.isSubmitting, */}
          </div>
          <NavLink to={`/article/${article.slug}`} className='preview-link'>
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
          </NavLink>
        </>
      ) : (
        'loading...'
      )}
    </div>
  );
};

export default ArticlePreview;
