import { useEffect, useState, useContext } from 'react';
import { FeedContext } from '../store/feedStore';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import Comment from '../components/Comment';
import { NavLink } from 'react-router-dom';

const Article = ({ match, history }) => {
  // console.log(match, history);
  const { store } = useContext(FeedContext);
  const [article, setArticle] = useState(null);

  const deleteArticle = () => {};

  const handleFollow = () => {
    console.log('Article() : handleFollow() : store : ', store.isLogin);
    if (!store.isLogin) store.history?.push('/register');
  };

  useEffect(() => {
    const processSuccess = (data) => {
      console.log('Article() : useEffect() : processSuccess() : ', data.article);
      setArticle(data.article);
    };

    const processError = (err) => {
      console.log('Article() : useEffect() : processError() : ', err);
      if (err?.status) {
        console.log('status', err.status, err.data.errors);
      } else {
        console.log('err', err);
      }
    };

    // const url = `https://conduit.productionready.io/api/articles/${match.params.slug}`;
    const url = `http://localhost:5000/api/articles/${match.params.slug}`;
    axios
      .get(url)
      .then((res) => processSuccess(res.data))
      .catch((err) => processError(err?.response || err?.request || err.message));
  }, []);

  if (!article) return '';
  const dateString = new Date(article.createdAt).toDateString();

  console.log('>>>> username : ', article.author);

  return (
    <div className='article-page'>
      <div className='banner'>
        <div className='container'>
          <h1>{article.title}</h1>

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

            {store.user.username === article.author.username ? (
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
                <button className='btn btn-sm btn-outline-secondary' onClick={handleFollow}>
                  <i className='ion-plus-round'> &nbsp; Follow {article.author.username} </i>{' '}
                  <span className='counter'>(10)</span>
                </button>
                &nbsp;&nbsp;
                <button className='btn btn-sm btn-outline-primary' onClick={handleFollow}>
                  <i className='ion-heart'>&nbsp; Favorite Post</i>{' '}
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
            <a href={`#/@${article.author.username}`}>
              <img src={article.author.image} alt={article.title} />
            </a>
            <div className='info'>
              <a href={`#/@${article.author.username}`} className='author'>
                {article.author.username}
              </a>
              <span className='date'>{dateString}</span>
            </div>
            {store.user.username === article.author.username ? (
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
                <button className='btn btn-sm btn-outline-secondary' onClick={handleFollow}>
                  <i className='ion-plus-round'> &nbsp; Follow {article.author.username} </i>{' '}
                  <span className='counter'>(10)</span>
                </button>
                &nbsp;&nbsp;
                <button className='btn btn-sm btn-outline-primary' onClick={handleFollow}>
                  <i className='ion-heart'>&nbsp; Favorite Post</i>{' '}
                  <span className='counter'>({article.favoritesCount})</span>
                </button>
              </span>
            )}
          </div>
        </div>

        {!store.isLogin ? (
          <div className='text-xs-center'>
            <a href='/#/login'>Sign in</a> or <a href='/#/register'>Sign up</a> to add comments on this article.
          </div>
        ) : (
          ''
        )}

        {/* <Comment slug={article.slug} /> */}
      </div>
    </div>
  );
};

export default Article;
