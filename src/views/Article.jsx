import { useEffect, useState, useContext } from 'react';
import { FeedContext } from '../store/feedStore';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import Comment from '../components/Comment';
import { NavLink } from 'react-router-dom';

const Article = ({ match, history }) => {
  // console.log(match, history);
  const { store, dispatch } = useContext(FeedContext);
  const [article, setArticle] = useState(null);

  const deleteArticle = () => {
    const url = `${store.serverBase()}/api/articles/${article.slug}`;
    axios
      .delete(url, store.tokenHeader(store.user))
      .then((res) => {
        console.log('Article() : deleteArticle() : success ');
        return history.push('/');
      })
      .catch((err) => {
        console.log('Article() : deleteArticle() : err ', err);
      });
  };

  // ===============================================================================
  const handleFollow = () => {
    console.log('Article() : handleFollow() : store : ', store.isLogin);
    if (!store.isLogin) return store.history?.push('/register');

    const processSuccess = (data) => {
      console.log('Article() : handleFollow() : processSuccess() : ', data.profile);
      setArticle({ ...article, author: { ...article.author, following: data.profile.following } });
    };

    const processError = (err) => {
      console.log('Article() : handleFollow() : processError() : ', err);
      if (err?.status) {
        console.log('status', err.status, err.data);
      }
    };

    //Request URL: https://conduit.productionready.io/api/profiles/serenada/follow
    const url = `${store.serverBase()}/api/profiles/${article.author.username}/follow`;
    axios
      .post(url, null, store.tokenHeader(store.user))
      .then((res) => processSuccess(res.data))
      .catch((err) => processError(err?.response || err?.request || err.message));
  };

  // ===============================================================================
  const handleFavorite = () => {
    console.log('Article() : handleFavorite() : store : ', store.isLogin);
    if (!store.isLogin) return store.history?.push('/register');

    const processSuccess = (data) => {
      console.log('Article() : handleFavorite() : processSuccess() : ', data.article);
      setArticle(data.article);
    };

    const processError = (err) => {
      console.log('Article() : handleFavorite() : processError() : ', err);
      if (err?.status) {
        console.log('status', err.status, err.data);
      }
    };

    // Request URL: https://conduit.productionready.io/api/articles/lets-automate-this-5l0xqt/favorite
    const url = `${store.serverBase()}/api/articles/${match.params.slug}/favorite`;
    axios
      .post(url, null, store.tokenHeader(store.user))
      .then((res) => processSuccess(res.data))
      .catch((err) => processError(err?.response || err?.request || err.message));
  };

  // ===============================================================================
  useEffect(() => {
    const processSuccess = (data) => {
      console.log('Article() : useEffect() : processSuccess() : ', data.article);
      setArticle(data.article);
    };

    const processError = (err) => {
      console.log('Article() : useEffect() : processError() : ', err);
      if (err?.status) {
        console.log('status', err.status, err.data);
      }
    };

    // const url = `https://conduit.productionready.io/api/articles/${match.params.slug}`;
    const url = `${store.serverBase()}/api/articles/${match.params.slug}`;
    axios
      .get(url, store.tokenHeader(store.user))
      .then((res) => processSuccess(res.data))
      .catch((err) => processError(err?.response || err?.request || err.message));
  }, []);

  // ===============================================================================

  if (!article) return '';
  const dateString = new Date(article.createdAt).toDateString();

  console.log('>>>> username : ', article.author);

  return (
    <div className='article-page'>
      <div className='banner'>
        <div className='container'>
          <h1>{article.title}</h1>

          <div className='article-meta'>
            <NavLink to={`/@${article.author.username}`}>
              <img src={article.author.image} alt={article.title} />
            </NavLink>
            <div className='info'>
              <NavLink to={`/@${article.author.username}`} className='author'>
                {article.author.username}
              </NavLink>
              <span className='date'>{dateString}</span>
            </div>

            {store.user && store.user.username === article.author.username ? (
              <span className='ng-scope'>
                <NavLink to={`/editor/${article.slug}`} className='btn btn-outline-secondary btn-sm'>
                  <i className='ion-edit'></i> Edit Article
                </NavLink>{' '}
                <button className='btn btn-outline-danger btn-sm' onClick={deleteArticle}>
                  <i className='ion-trash-a'> Delete Article </i>
                </button>
              </span>
            ) : (
              <span className='ng-scope ng-hide'>
                <button
                  className={'btn btn-sm ' + (article.author.following ? 'btn-secondary' : 'btn-outline-secondary')}
                  onClick={handleFollow}
                >
                  <i className={`ion-${article.author.following ? 'minus' : 'plus'}-round`}>
                    {` ${article.author.following ? 'Unf' : 'F'}ollow ${article.author.username}`}
                  </i>
                </button>{' '}
                <button
                  className={`btn btn-sm ${article.favorited ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={handleFavorite}
                >
                  <i className='ion-heart'>{` ${article.favorited ? 'Unf' : 'F'}avorite Article`}</i>{' '}
                  <span className='counter'>({article.favoritesCount})</span>
                </button>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className='container page'>
        <div className='row article-content'>
          <div className='col-md-12'>
            <ReactMarkdown>{article.body}</ReactMarkdown>
          </div>
        </div>
        <ul className='tag-list'>
          {article.tagList.map((tag) => (
            <li className='tag-default tag-pill tag-outline ng-binding ng-scope' key={tag}>
              {tag}
            </li>
          ))}
        </ul>
        <hr />
        <div className='article-actions'>
          <div className='article-meta'>
            <NavLink to={`/@${article.author.username}`}>
              <img src={article.author.image} alt={article.title} />
            </NavLink>
            <div className='info'>
              <NavLink to={`/@${article.author.username}`} className='author'>
                {article.author.username}
              </NavLink>
              <span className='date'>{dateString}</span>
            </div>
            {store.user && store.user.username === article.author.username ? (
              <span className='ng-scope'>
                <NavLink to={`/editor/${article.slug}`} className='btn btn-outline-secondary btn-sm'>
                  <i className='ion-edit'></i> Edit Article
                </NavLink>{' '}
                <button className='btn btn-outline-danger btn-sm' onClick={deleteArticle}>
                  <i className='ion-trash-a'> Delete Article </i>
                </button>
              </span>
            ) : (
              <span className='ng-scope ng-hide'>
                <button
                  className={'btn btn-sm ' + (article.author.following ? 'btn-secondary' : 'btn-outline-secondary')}
                  onClick={handleFollow}
                >
                  <i className={`ion-${article.author.following ? 'minus' : 'plus'}-round`}>
                    {` ${article.author.following ? 'Unf' : 'F'}ollow ${article.author.username}`}
                  </i>
                </button>{' '}
                <button
                  className={`btn btn-sm ${article.favorited ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={handleFavorite}
                >
                  <i className='ion-heart'>{` ${article.favorited ? 'Unf' : 'F'}avorite Article`}</i>{' '}
                  <span className='counter'>({article.favoritesCount})</span>
                </button>
              </span>
            )}
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12 col-md-8 offset-md-2'>
            {!store.isLogin ? (
              <p>
                <NavLink to='/login'>Sign in</NavLink> or <NavLink to='/register'>Sign up</NavLink> to add comments on
                this article.
              </p>
            ) : (
              ''
            )}

            <Comment slug={article.slug} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
